---
layout: post
title: "From CellRanger to Cell Types: How I Structure a Single-Nucleus RNA-seq Pipeline in R"
date: 2026-06-01
categories: [bioinformatics, single-cell]
tags: [single-cell, snRNA-seq, Seurat, R, bioinformatics, clustering, Alzheimer]
reading_time: 14
service: A2
excerpt: "A step-by-step walkthrough of the snRNA-seq analysis pipeline I use in practice — from loading CellBender-processed 10X output to annotated cell type clusters."
---

You finished CellRanger. Your `/filtered_feature_bc_matrix/` directories are in place—or better, CellBender has already denoised your 10X output and left you with `.h5` files on disk. Now what? You have a count matrix with 20,000 genes and 50,000 cells across four brain regions from Alzheimer transgenic mice, and your collaborator needs cluster-level cell types and condition-specific differential expression.

This post walks through the pipeline I built for exactly this problem: from loading CellBender-filtered 10X output through quality control, normalisation, integration, clustering, and cell type annotation. It's based on production code analysing GSE262881 (Wang et al., *BMC Biology* 2025), a large snRNA-seq dataset of mouse forebrain under two dietary conditions. Real code, real thresholds, and—critically—the per-sample doublet detection step that most tutorials get wrong.

## Loading 10X Data with Seurat v5

CellBender removes ambient RNA (background reads that bleed across GEM partitions), so your `.h5` files are already noise-reduced. The first step is straightforward: load each sample's count matrix and create a Seurat object per sample. This keeps memory low initially—you don't want to concatenate 24 regional samples into a single matrix before QC filtering.

```r
# Load CellBender-filtered h5 files as a named list
# File naming: GSM{ID}_{Ctrl|Inulin}_{region}_{replicate}_CellBender_feature_bc_matrix_filtered.h5

seurat_list <- load_h5_samples_bpcells(
  data_path = DATA_DIR,                    # raw CellBender h5 files
  regions = c("forebrain"),                # restrict to one region for this example
  checkpoint = "01_raw_data_bp",           # crash recovery
  specie = "mouse"
)

# Result: named list
# seurat_list$Ctrl_forebrain_1
# seurat_list$Ctrl_forebrain_2
# ... (one Seurat object per sample)
```

The function `load_h5_samples_bpcells()` reads each `.h5` file and backs it with BPCells, a memory-efficient on-disk matrix format. This is crucial for 16 GB machines. Without it, a 50k-cell dataset consumes ~10 GB in RAM alone; BPCells keeps only the active subset in memory and streams the rest from disk.

Each Seurat object gets sample-level metadata columns:
- `condition` — Control or Inulin
- `region` — Forebrain, Cerebellum, etc.
- `sample_id` — Ctrl_forebrain_1, Inulin_cerebellum_2
- `orig_file` — GSM ID for traceability

**Why per-sample loading?** It lets you inspect each library's quality independently before merging. A single bad sample won't skew your global QC thresholds.

## Quality Control That Actually Works

Default Seurat QC thresholds are built for PBMCs, not brain tissue. Specifically:
- PBMCs tolerate 10–20% mitochondrial reads (cytoplasm-rich)
- Brain snRNA-seq nuclei should be 1–5% MT (nucleus-only)
- Neurons fire fewer distinct genes than immune cells

The second critical constraint: **QC filtering must happen per-sample before integration.** Merging first then filtering introduces cross-sample biases—a low-quality cell in one condition can shift the global distribution and cause you to keep low-quality cells in other conditions.

```r
# Add QC metrics to each sample (per-sample, before merging)
seurat_qc <- lapply(seurat_list, function(obj) {
  # Mitochondrial percentage (mouse genes start with mt-)
  obj[["percent_mt"]] <- PercentageFeatureSet(obj, pattern = "^mt-")
  
  # Ribosomal percentage (Rps*, Rpl* in mouse)
  obj[["percent_ribo"]] <- PercentageFeatureSet(obj, pattern = "^Rp[ls]")
  
  # Complexity: log10(genes/UMI) = log10(nFeature / nCount)
  obj[["complexity"]] <- log10(obj@meta.data$nFeature_RNA) / 
                         log10(obj@meta.data$nCount_RNA)
  
  return(obj)
})

# Define per-dataset thresholds (from global_variables.R)
QC_MIN_FEATURES  <- 500      # Low: empty droplets, debris
QC_MAX_FEATURES  <- 3000     # High: likely doublets (brain nuclei capture ~2k genes)
QC_MIN_COUNTS    <- 1000     # Low library complexity
QC_MAX_COUNTS    <- 20000    # High: doublets (sequencing depth)
QC_MAX_MT        <- 0.03     # 3% mitochondrial (snRNA from brain)
QC_MIN_COMPLEXITY <- 0.80    # Low: stressed / low-complexity cells

# Filter per sample
seurat_filtered <- lapply(seurat_qc, function(obj) {
  subset(obj, 
    nFeature_RNA  >= QC_MIN_FEATURES  &
    nFeature_RNA  <= QC_MAX_FEATURES  &
    nCount_RNA    >= QC_MIN_COUNTS    &
    nCount_RNA    <= QC_MAX_COUNTS    &
    percent_mt    <= QC_MAX_MT        &
    complexity    >= QC_MIN_COMPLEXITY
  )
})

cat("Cell counts per sample before/after filtering:\n")
invisible(mapply(function(obj_before, obj_after, nm) {
  cat(sprintf("  %s: %d → %d cells\n", nm, ncol(obj_before), ncol(obj_after)))
}, seurat_qc, seurat_filtered, names(seurat_qc)))
```

**The critical point:** These thresholds are **starting suggestions, not dogma**. Visualise your data first—generate violin plots of nCount, nFeature, %MT per sample—then adjust. A brain nuclei sample with 40% MT probably has contamination; one with 0.5% might be actual biology (metabolically active neurons). You decide based on what you see, not a generic rule.

## Doublet Detection Per-Sample, Before Integration

This is where most tutorials fail. Doublets (two cells captured in a single GEM partition) can only be reliably detected within a sample, using that sample's background density distribution. Post-integration, a doublet from Control sample 1 becomes indistinguishable from a genuine Control cell from sample 2—you've lost all power to find it.

Run DoubletFinder on each sample immediately after QC filtering, while cells are still per-sample:

```r
# Doublet detection per library (using scDblFinder under the hood)
seurat_singlets <- lapply(names(seurat_filtered), function(nm) {
  obj <- seurat_filtered[[nm]]
  
  # Quick normalisation + PCA (temporary, just for doublet detection)
  obj <- NormalizeData(obj, normalization.method = "LogNormalize", 
                       scale.factor = 10000)
  obj <- FindVariableFeatures(obj, selection.method = "vst", 
                              nfeatures = 2000)
  obj <- ScaleData(obj)
  obj <- RunPCA(obj, npcs = 30)
  
  # DoubletFinder: training on synthetic doublets
  # dbr = expected doublet rate (10X typically ~5% per 10k cells)
  obj <- doubletfinder_v3(
    object = obj,
    PCs = 1:30,
    pN = 0.25,
    pK = 9,
    nExp = 0.05,
    reuse.pAnn = FALSE,
    sct = FALSE  # We're using LogNormalize, not SCTransform
  )
  
  # Extract singlet classification
  doublet_col <- colnames(obj@meta.data)[grep("DF.classifications", 
                                               colnames(obj@meta.data))]
  obj$is_singlet <- obj@meta.data[[doublet_col]] == "Singlet"
  
  # Subset to singlets
  obj <- subset(obj, subset = is_singlet == TRUE)
  
  cat(sprintf("  %s: %s doublets removed\n", nm, 
              sum(obj@meta.data[[doublet_col]] == "Doublet")))
  
  return(obj)
})

names(seurat_singlets) <- names(seurat_filtered)
```

**Why this matters:** Doublets are the third-largest source of false cell type annotations (after poor QC and poor integration). They consist of mixed transcriptomes—a neuron + oligodendrocyte doublet will appear as an intermediate type. Removing them at the per-sample stage, when you have per-library background statistics, is the only reliable way.

## Normalisation: SCTransform vs LogNormalize

The choice between **SCTransform** (Seurat v3+, regularised negative binomial) and **LogNormalize** (traditional log2 scale.factor approach) affects everything downstream. Both work; the difference is principled variance stabilisation.

**LogNormalize (used in this pipeline for 5xFAD):**
```r
# Merge all singlets into one object (now safe, post-doublet detection)
seurat_merged <- merge(
  seurat_singlets[[1]],
  y = seurat_singlets[-1],
  add.cell.ids = names(seurat_singlets),
  project = "GSE262881"
)

# Normalisation: classic approach
# Divides each cell by its total count, multiplies by 10,000, then log2 + 1
seurat_merged <- NormalizeData(
  seurat_merged,
  normalization.method = "LogNormalize",
  scale.factor = 10000
)

# Find highly variable genes (HVGs)
seurat_merged <- FindVariableFeatures(
  seurat_merged,
  selection.method = "vst",
  nfeatures = 2000,
  verbose = FALSE
)

# Scale (centering + unit variance)
seurat_merged <- ScaleData(seurat_merged)

# Linear dimensionality reduction
seurat_merged <- RunPCA(
  seurat_merged,
  npcs = 50,
  verbose = FALSE
)
```

**Why LogNormalize here?** It's simpler to debug if something goes wrong (sequencing depth effects are transparent), and with brain snRNA-seq, the depth variation is moderate (CellBender already controls it). SCTransform is more powerful for data with extreme depth variation (multi-modal libraries, batch SORT-seq) but adds computational overhead.

**The critical nuance:** SCTransform treats **sample as a covariate** internally. If you don't fit SCT per-sample then integrate, you can introduce sample-specific artefacts into your HVG selection. If you do fit per-sample, you must use `IntegrateLayers(integration.method = "SCTIntegration")` downstream, which is more memory-intensive. For this dataset, LogNormalize + RPCA integration is the safer, faster choice.

## Integration: RPCA or Harmony?

After normalisation and PCA, you have batch effects—sample-to-sample variation that's technical, not biological. Integration methods correct for this. Two mainstream approaches:

**RPCA (Reciprocal PCA, default in Seurat v5):**
```r
# Split by sample layer (one per sample)
seurat_merged[["RNA"]] <- split(seurat_merged[["RNA"]], 
                               f = seurat_merged$sample_id)

# RPCA integration
seurat_integrated <- IntegrateLayers(
  object = seurat_merged,
  method = "RPCAIntegration",
  orig.reduction = "pca",
  new.reduction = "integrated.rpca",
  verbose = FALSE
)
```

**Harmony (explicit integration in latent space):**
```r
seurat_integrated <- IntegrateLayers(
  object = seurat_merged,
  method = "HarmonyIntegration",
  orig.reduction = "pca",
  new.reduction = "integrated.harmony",
  group.by.vars = "sample_id",
  verbose = FALSE
)
```

**Which to choose?**
- **RPCA:** Faster, more conservative (corrects fewer batch effects). Use when batch effects are mild or when you're cautious about over-correction.
- **Harmony:** Slower, more aggressive. Use when you have strong sample-specific effects (e.g., different dissociation protocols or extended storage times).

For GSE262881 (consistent 5xFAD background, all samples treated identically, CellBender-denoised), RPCA is sufficient and faster. If your samples span different protocols, labs, or collection dates, try both and compare with `clustree` (below).

## Dimensionality Reduction and Clustering Without Arbitrariness

Most tutorials pick a PCA dimension (`dims = 1:30`) and a clustering resolution (`resolution = 0.8`) based on intuition. Don't do this. Use systematic parameter sweeps:

```r
# Sweep across PCA dimensions × resolutions
# Builds a dendrogram of cluster stability (clustree plot)

CLUSTERING_DIMS <- c(10, 20, 30)          # Test 3 PCA dimension choices
CLUSTERING_RESOLUTIONS <- c(0.1, 0.2, 0.4, 0.8)  # Test 4 resolutions

seurat_umap <- RunUMAP(
  seurat_integrated,
  reduction = "integrated.rpca",
  dims = 1:30,  # Use largest dims set for UMAP (all sweep dimensions fit inside)
  verbose = FALSE
)

# Run clustering at each dims × resolution combination
for (dims in CLUSTERING_DIMS) {
  seurat_umap <- FindNeighbors(
    seurat_umap,
    reduction = "integrated.rpca",
    dims = 1:dims,
    verbose = FALSE
  )
  
  for (res in CLUSTERING_RESOLUTIONS) {
    seurat_umap <- FindClusters(
      seurat_umap,
      resolution = res,
      cluster.name = paste0("integrated_snn_res.", res),
      verbose = FALSE
    )
  }
}

# Plot cluster stability: clustree shows which clusters persist across resolutions
# Stable clusters = robust; splitting clusters = resolution-dependent artefacts
library(clustree)
png("clustree_dims30_sweep.png", width = 1200, height = 800)
clustree(seurat_umap, prefix = "integrated_snn_res.")
dev.off()
```

**The critical decision:** Choose the resolution where the UMAP shows clear separation of biologically distinct cell types, **not** where cluster count is maximised. A sweep typically yields:
- res 0.1–0.2: broad cell type populations (neurons vs. glia)
- res 0.4–0.8: cell type subtypes (excitatory layer 2/3 vs. layer 5 neurons)

For brain tissue with known cell types, res 0.4–0.6 usually balances sensitivity and interpretability. **Set your final choice in code**, don't re-cluster by hand later.

## Cell Type Annotation Is Not a Button

Once you have clusters, the temptation is strong to run SingleR or scType and call it done. Those tools are useful for getting a quick label, but they are **not sufficient** for rigorous annotation. They miss subtype-level distinctions and can misclassify based on the reference dataset used.

The correct approach:
1. **Automated annotation** (SingleR) for a first pass
2. **Manual validation** using canonical markers for your tissue
3. **Cluster-specific DE analysis** to find distinguishing genes if automated labels conflict

```r
# Step 1: SingleR reference-based labelling (Allen Brain Atlas)
library(SingleR)
library(MouseRNAseqData)

# Get reference (Allen Brain Atlas medians + trimmed means)
ref <- MouseRNAseqData(
  ensembl = TRUE
)

# Extract raw counts (SingleR needs raw, not log)
counts_raw <- GetAssayData(
  seurat_umap,
  layer = "counts",
  assay = "RNA"
)

# Run SingleR
pred <- SingleR(
  test = counts_raw,
  ref = ref,
  labels = ref$cell_type
)

seurat_umap$singleR_label <- pred$labels

# Step 2: Manual marker validation
# Load canonical brain cell markers
brain_markers <- list(
  ExcNeuron = c("Slc17a7", "RBFOX3"),        # Glutamatergic neurons
  InhNeuron = c("Gad1", "Gad2"),              # GABAergic neurons
  Oligo = c("Mbp", "Plp1", "Olig2"),          # Oligodendrocytes
  OPC = c("Pdgfra", "Cspg4"),                 # Oligodendrocyte precursors
  Astro = c("Aqp4", "Gfap", "Aldoc"),         # Astrocytes
  Microglia = c("Cx3cr1", "Siglech", "Aif1"), # Microglia
  Vascular = c("Cldn5", "Flt1")               # Endothelial
)

# Plot marker expression across clusters
for (cell_type in names(brain_markers)) {
  features <- brain_markers[[cell_type]]
  p <- FeaturePlot(seurat_umap, features = features[1:min(3, length(features))],
                   label = TRUE, repel = TRUE)
  print(p)
}

# Step 3: If markers disagree with SingleR, run FindAllMarkers
# to characterise discordant clusters
seurat_umap <- SetIdent(seurat_umap, value = "integrated_snn_res.0.5")
all_markers <- FindAllMarkers(
  seurat_umap,
  only.pos = TRUE,
  min.pct = 0.1,
  logfc.threshold = 0.25
)

# Top genes per cluster
all_markers %>%
  group_by(cluster) %>%
  top_n(n = 10, wt = avg_log2FC) %>%
  pull(gene) %>%
  unique() %>%
  print()
```

Visualising the top markers as a heatmap across all clusters gives you an instant read on how well-separated the populations are. Clusters with crisp, cluster-specific yellow bands are well-defined; clusters with diffuse or shared expression warrant closer inspection before labelling.

![Heatmap of top marker genes per cluster](/assets/images/snrnaseq_067_HeatMap_cluster_plot.png)
*DoHeatmap of the top differentially expressed genes across 17 clusters (0–16). Each column group is a cluster; each row is a marker gene. Yellow = high expression, purple = low. The diagonal banding pattern confirms that most clusters have a distinct transcriptional signature with little bleed-through to adjacent clusters.*

Here is what the canonical marker validation looks like in practice across the 17 clusters of GSE262881, split by condition (Control vs Inulin) to check for condition-specific marker shifts:

![DotPlot of canonical markers per cluster, split by condition](/assets/images/snrnaseq_127_DotPlot_features.png)
*Split DotPlot: canonical marker genes (x-axis) across 17 clusters split by condition (Ctrl / Inulin). Dot size = percent of cells expressing the gene; colour = mean normalised expression (red = high, blue = low). Cluster 0 lights up for Calb1/Gabra6 (cerebellar interneurons); Cluster 2 for Gfap/Aqp4 (astrocytes); Cluster 6 for Mbp/Plp1 (oligodendrocytes); Cluster 14 for Cx3cr1/Aif1 (microglia).*

**Why manual validation matters:** A cluster of 500 cells with mean expression of RBFOX3 = 2.1 and Gad1 = 0.3 is primarily excitatory but has GABAergic contamination or real excitatory-inhibitory interaction. The numbers reveal biology; SingleR gives you a label but not the confidence to defend it.

The result of combining automated labels, manual marker validation, and cluster-specific DE is a fully annotated UMAP. For GSE262881 at resolution 0.5, the pipeline identifies 11 cell type populations across mouse brain regions:

![UMAP with manual cell type annotations](/assets/images/snrnaseq_128_UMAP_manual_annotation.png)
*Annotated UMAP of GSE262881 (forebrain + cerebellum, 5xFAD mouse, ~50k nuclei). Populations identified: excitatory neurons (ExN L2/3, ExN_L6, ExN, ExN_DG), inhibitory neurons (InN, InN Sst/Pv, InN SSt+), oligodendrocytes, OPC, astrocytes, microglia, SMC-Pericytes, and one unresolved cluster (16). Cell types are consistent with the expected brain cell type composition.*

Note cluster 16 on the lower-left: unlabeled because no canonical marker set assigned it a confident identity. Don't rename ambiguous clusters — keep them in the object, document them, and investigate them separately.

## Cluster-level GO enrichment

After annotation and per-cluster DE analysis (FindMarkers with 5xFAD vs control contrast, per cluster), the pipeline runs Gene Ontology enrichment with `clusterProfiler::gseGO()` on the ranked gene list from each cluster. This gives you a functional interpretation of what each cell population is doing differently between conditions.

Here is the gseGO result for Cluster 0 (cerebellar interneurons, upregulated genes in 5xFAD):

![gseGO dotplot — Cluster 0, upregulated genes](/assets/images/snrnaseq_282_gseGO_cluster0_UP.png)
*GSE dotplot for Cluster 0 upregulated genes (5xFAD vs control). Activated GO terms are predominantly mitochondrial (organelle inner membrane, mitochondrial membrane, mitochondrion), suggesting increased energy demand or mitochondrial stress. Suppressed terms include broad developmental processes (cell differentiation, tissue development). p.adjust < 0.05 for shown terms.*

This kind of result illustrates why you need per-cluster enrichment, not a global DE followed by one GO analysis. The functional signature of mitochondrial activation in interneurons is biologically distinct from the microglial activation signature (DAM genes) in the microglia cluster — lumping them together would bury both signals.

## Practical Notes for Production Pipelines

**Memory management on consumer hardware:** Seurat v5 is lazy-load friendly. Run `options(Seurat.object.assay.version = "v3")` if you hit errors like `"cannot coerce Assay5 to matrix"`. BPCells matrices bypass RAM for count storage, but peak memory still spikes during integration. If you hit limits:
- Reduce `n_integration_features` from 2000 to 1500
- Set `plan("sequential")` (slower but safe)
- Process samples in batches and integrate batch-by-batch

**R version:** This pipeline uses R 4.5.2 (renv.lock specifies exact versions). Seurat v5 has occasional compatibility issues with R 4.6.0+. If you're on a newer R, use `rig` or conda to maintain a 4.5.x environment.

**Seurat v5 layer confusion:** Seurat v5 stores normalisation separately from raw counts in "layers". After `NormalizeData()`, counts move to the "data" layer; ScaleData goes to "scale.data". If you need raw counts for SingleR, use `GetAssayData(assay = "RNA", layer = "counts")`. Mixing them up is a common error.

---

## Conclusion

End-to-end snRNA-seq analysis is not mysterious. The pipeline shown here follows a simple logic:
1. Load per-sample, QC per-sample, detect doublets per-sample
2. Merge only the singlets
3. Normalise, find variable features, reduce dimensions
4. Integrate across samples (RPCA or Harmony)
5. Cluster and validate with markers

The code is modular and reproducible. Use it as a template for your own datasets—just swap in your .h5 files, adjust the QC thresholds to match your tissue type (brain nuclei: 1–5% MT, neurons: 500–3000 genes), and rebuild.

The full pipeline and GSE262881 analysis are available at [github.com/SLopezBegines/snRNAseq_mouse](https://github.com/SLopezBegines/snRNAseq_mouse).

---

## References

- **Seurat v5:** Hao Y. et al. (2024). Dictionary learning for integrative, multimodal and scalable single-cell analysis. *Nature Biotechnology* **42**, 293–304. doi:[10.1038/s41587-023-01767-y](https://doi.org/10.1038/s41587-023-01767-y)

- **RPCA integration:** Hao Y. et al. (2021). Integrated analysis of multimodal single-cell data. *Cell* **184**(13), 3573–3587. doi:[10.1016/j.cell.2021.04.048](https://doi.org/10.1016/j.cell.2021.04.048)

- **Harmony integration:** Korsunsky I. et al. (2019). Fast, sensitive and accurate integration of single-cell data with Harmony. *Nature Methods* **16**, 1289–1296. doi:[10.1038/s41592-019-0619-0](https://doi.org/10.1038/s41592-019-0619-0)

- **CellBender:** Fleming S.J. et al. (2023). Unsupervised removal of systematic background noise from droplet-based single-cell experiments using CellBender. *Nature Methods* **20**, 1323–1335. doi:[10.1038/s41592-023-01943-7](https://doi.org/10.1038/s41592-023-01943-7)

- **DoubletFinder:** McGinnis C.S. et al. (2019). DoubletFinder: Doublet detection in single-cell RNA sequencing data using artificial nearest neighbors. *Cell Systems* **8**(4), 329–337. doi:[10.1016/j.cels.2019.03.003](https://doi.org/10.1016/j.cels.2019.03.003)

- **SingleR:** Aran D. et al. (2019). Reference-based analysis of lung single-cell sequencing reveals a transitional profibrotic macrophage. *Nature Immunology* **20**, 163–172. doi:[10.1038/s41590-018-0276-y](https://doi.org/10.1038/s41590-018-0276-y)

- **clusterProfiler:** Wu T. et al. (2021). clusterProfiler 4.0: A universal enrichment tool for interpreting omics data. *Innovation* **2**(3), 100141. doi:[10.1016/j.xinn.2021.100141](https://doi.org/10.1016/j.xinn.2021.100141)

- **Dataset:** Wang X. et al. (2025). A single-cell transcriptomic atlas of all cell types in the brain of 5xFAD Alzheimer mice in response to dietary inulin supplementation. *BMC Biology* **23**, 124. doi:[10.1186/s12915-025-02230-x](https://doi.org/10.1186/s12915-025-02230-x) · GEO: [GSE262881](https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE262881)

---

**About the author**: Santiago López Begines is a PhD-trained neuroscientist and data scientist specialising in omics data pipelines, biomarker discovery, and quantitative proteomics. For scientific collaborations or methodological exchanges, [get in touch](/#contact).
