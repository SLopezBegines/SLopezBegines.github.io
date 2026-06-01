---
layout: post
title: "Bulk RNA-seq in R with DESeq2: From Raw Counts to Differential Expression in Alzheimer's Disease"
date: 2026-06-01
categories: [bioinformatics, transcriptomics]
tags: [bulk RNA-seq, DESeq2, R, bioinformatics, Alzheimer, transcriptomics, differential expression]
reading_time: 12
service: A3
excerpt: "A walkthrough of differential expression analysis with DESeq2 on 192 5xFAD Alzheimer mouse samples — from raw counts to a 418-gene neuroinflammatory signature confirmed independently by DESeq2 and edgeR (r = 0.952)."
---

You have a count matrix. Rows are genes, columns are samples, and each cell is a read count from RNA-seq. You want to know what changed between conditions. But before you call anything "significantly different", you will face a series of choices — about the statistical model, about normalisation, about how to handle low-abundance genes, about how to shrink log-fold-change estimates. Each one compounds downstream. Get them wrong and you will either miss real signal or drown in false positives.

This post walks through the pipeline I ran on GSE168137, a 192-sample 5xFAD Alzheimer mouse dataset (Forner et al., *Scientific Data* 2021) spanning four timepoints (4, 8, 12, and 18 months), two brain regions (cortex and hippocampus), and both sexes. I cover the methodology, the code, and the reasoning behind each decision — and then show what the data actually said. If you work with bulk RNA-seq in neuroscience or biomedical research, the design problems here are ones you will recognise.

## Why the negative binomial model matters

Most biologists reach for DESeq2 because "everyone uses it". That misses the point. The statistical model is the real reason.

RNA-seq count data are not normal. They are not even close. You have genes with 100 reads, genes with 100,000 reads, genes with two reads in one sample and zero in another. The variance changes with the mean — wildly. A standard t-test assumes homogeneous variance across all expression levels and will either inflate false positives (if you underestimate variance) or lose power (if you overestimate it).

The negative binomial distribution is built for this: each count follows a Poisson distribution conditional on an unobserved rate parameter, and the rate parameters themselves vary across samples and genes. This gives you two parameters: the mean (expression level) and the dispersion (how much the variance exceeds the mean). DESeq2 borrows information across genes to estimate dispersion — a technique called empirical Bayes moderation — which gives you better power on small n without inflating false positives.

What does "better power" mean in practice? It means when you have a handful of biological replicates per condition — GSE168137 provides approximately six per fully-specified condition cell (2 genotypes × 2 regions × 4 timepoints × 2 sexes = 32 cells across 192 samples) — you can detect true changes that a t-test would miss, because the shrinkage estimators pull noisy variance estimates toward a common value.

## Loading and building the DESeq2 object

The raw data comes as `GSE168137_countList.txt.gz`: a matrix of integer counts, with gene names as rows and samples as columns. GEO did not provide a separate sample sheet — all metadata is encoded in the column names using a consistent convention: `5xFAD;BL6_cortex_4mon_Female_430` encodes genotype, tissue, age, sex, and animal ID.

Here is how I load it:

```r
# Load raw counts from GEO
counts <- read.table(
  gzfile("rawdata/GSE168137_countList.txt.gz"),
  header = TRUE, row.names = 1, sep = "\t"
)

# Parse metadata from column names
# Format: "5xFAD;BL6_cortex_4mon_Female_430"
parse_metadata <- function(colnames) {
  parsed <- data.frame(
    full_name = colnames,
    stringsAsFactors = FALSE
  )
  
  # Split on underscore
  parts <- strsplit(colnames, "_")
  
  parsed$genotype <- sapply(parts, function(x) {
    if (grepl("5xFAD", x[1])) "5xFAD" else "BL6"
  })
  
  parsed$tissue <- sapply(parts, function(x) x[2])
  
  parsed$age_months <- as.numeric(
    sapply(parts, function(x) {
      sub("mon", "", x[3])
    })
  )
  
  parsed$sex <- sapply(parts, function(x) x[4])
  parsed$animal_id <- sapply(parts, function(x) x[5])
  
  return(parsed)
}

metadata <- parse_metadata(colnames(counts))
```

A first sanity check is to look at library sizes across all samples, faceted by age and tissue. All 192 samples in GSE168137 passed QC — no sample fell below a minimum depth threshold, and the distributions are well-behaved across timepoints:

![Library size distribution across timepoints and tissue types](/assets/images/bulkrnaseq_003_library_distribution.png)
*Library size distribution (log₁₀ total counts) by age, tissue (solid = cortex, dashed = hippocampus), and genotype (red = 5xFAD, blue = BL6). The dashed red line marks the minimum acceptable depth. All 192 samples pass.*

One note: GEO originally had a fractional count (39.42) for one gene in one sample. **Always check for non-integer counts when importing from supplementary files.** Round to integers before building the DESeqDataSet:

```r
# Convert to integer storage
storage.mode(counts) <- "integer"

# Build the DESeqDataSet
dds <- DESeq2::DESeqDataSetFromMatrix(
  countData = counts,
  colData = metadata,
  design = ~ sex + age_months + genotype
)
```

This creates an object that holds the counts plus sample metadata (colData). The `design` formula specifies the linear model we will fit. **This is critical:** it is not just about the contrast you want; it is about accounting for variables that explain variance so your genotype effect estimates are clean.

## The design formula problem: why "genotype only" fails

Here is a common mistake. You have samples from two genotypes and want to test 5xFAD vs BL6. So you write:

```r
design = ~ genotype
```

This works if all your samples are from the same age, same region, and same sex. But GSE168137 has 4 ages, 2 regions, and 2 sexes. If you ignore those, you are treating a 4-month-old cortex female as interchangeable with an 18-month-old hippocampus male. You are not accounting for the variance that age and region introduce. Your genotype effect estimates will be noisy, and your p-values will be anti-conservative (you will report false positives).

The correct formula accounts for everything except the contrast you want to test. For a first-pass analysis across all samples:

```r
design = ~ sex + age_months + genotype
```

This tells DESeq2: "Fit a linear model where each gene has an intercept, a slope for sex (Female vs Male), a slope for age, and a slope for genotype. Test the genotype slope." The other slopes are nuisance parameters — you care about them only insofar as they absorb variance.

Note that `tissue` (brain region) is a confounder too — arguably a stronger one than sex, given that cortex and hippocampus have very different transcriptional profiles. The formula above is a starting point for an exploratory combined analysis; handling region properly requires stratification or an explicit interaction term. This is addressed in detail in the section on handling complexity below.

Why age_months as a continuous variable and not a factor? Because you have four timepoints (4, 8, 12, 18 months) and want to test whether expression changes monotonically with age. If the relationship is actually step-like (4 and 8 mo look the same, then jump at 12 mo), a continuous age will miss it. For maximum clarity, factor it:

```r
metadata$age_factor <- factor(metadata$age_months, 
                               levels = c(4, 8, 12, 18))
design = ~ sex + age_factor + genotype
```

Now each age has its own intercept, and you are testing whether 5xFAD differs from BL6 *within each age*, pooling across ages.

## Running the analysis: three functions, one workflow

DESeq2 follows three steps:

1. `DESeq()` — Estimate size factors (library depth correction), estimate dispersions, fit the negative binomial GLM.
2. `results()` — Extract test statistics for your contrast.
3. `lfcShrink()` — Apply shrinkage to log-fold-change estimates.

```r
# Step 1: Fit the model
dds <- DESeq2::DESeq(dds, parallel = FALSE)

# Step 2: Extract raw results
res_raw <- DESeq2::results(
  dds,
  contrast = c("genotype", "5xFAD", "BL6"),
  alpha = 0.05  # FDR threshold for calling significance
)

# Step 3: Shrink LFC estimates
res <- DESeq2::lfcShrink(
  dds,
  contrast = c("genotype", "5xFAD", "BL6"),
  type = "apeglm"  # Adaptive t prior — best MSE across expression ranges
)
```

Each step returns a matrix with one row per gene. The columns are:

- **baseMean**: average expression across all samples (in counts per million, approximately)
- **log2FoldChange**: log₂(5xFAD / BL6) before shrinkage; updated by lfcShrink
- **lfcSE**: standard error of the LFC estimate
- **stat**: Wald test statistic
- **pvalue**: raw p-value from the Wald test
- **padj**: Benjamini-Hochberg-adjusted p-value (FDR)

## The critical point: why shrink the log-fold changes?

This is where most tutorials and many published pipelines go wrong.

Raw LFC estimates from `results()` are noisy for low-abundance genes. Consider a gene with 5 reads in all BL6 samples and 10 reads in all 5xFAD samples. The LFC is log₂(10/5) = 1. But these are small numbers — sampling noise is huge. The same gene with counts (3, 2, 4, 5) and (7, 12, 8, 11) has an LFC around 1.3, but the credible interval spans more than ±2 log₂ units.

When you sort genes by raw LFC to make a volcano plot or pick candidates, the ranking is distorted: low-abundance genes with lucky random variation rank high, while truly changing mid-abundance genes rank lower.

`lfcShrink(type = "apeglm")` solves this using an adaptive t prior. For each gene, it asks: "How much does this LFC estimate vary given its expression level and dispersion?" Then it pulls the estimate toward the shrinkage target (zero, for genes with no evidence of change) proportionally to the uncertainty. High-abundance genes with tight estimates barely shrink. Low-abundance genes with wide estimates shrink more.

The result: more honest rankings. Volcano plots are cleaner. Gene set enrichment analysis works better (because rankings are more signal, less noise).

Here is a conceptual comparison. Without shrinkage, a volcano plot often looks like a cloud with outliers at low p-value and extreme LFCs. With shrinkage, you get a cleaner horn-shape because low-abundance genes (which contribute most of the extreme LFCs) now have their estimates pulled back toward zero, which in most cases reflects the actual uncertainty.

## Multiple testing: what the p-value histogram tells you

After fitting the model and shrinking LFCs, you have ~20,000 p-values (one per gene). Only a handful will be less than 0.05, but to know whether they are real or just noise, you need to correct for multiple testing.

DESeq2 reports both raw p-values and FDR-adjusted p-values (Benjamini-Hochberg). The raw p-values follow a specific distribution under the null: mostly uniform between 0 and 1, with an enrichment near zero for truly differentially expressed genes.

Plot the p-value histogram:

```r
hist(res$pvalue[!is.na(res$pvalue)],
     breaks = 100, xlab = "p-value", main = "Raw p-value distribution")
```

A healthy histogram shows:
- Enrichment of small p-values (near 0) — these are the true positives.
- A roughly uniform tail from 0.1 to 1.0 — these are the null genes.

A bad histogram has:
- **A spike at p = 1**: suggests the model is severely misspecified or there is a major batch effect. Revisit the design formula and the filtering steps.
- **Uniform with no enrichment**: no detectable signal. Either the contrast is truly subtle or there is a technical issue.
- **Enrichment at intermediate p-values (0.3–0.7)**: hints at unmodeled variation. Check the dispersion estimates and consider adding more covariates.

The BH-adjusted p-value (padj) is conservative by design: it assumes all genes tested are null, which they are not. In reality, perhaps 5–20% of genes are differentially expressed, so padj under-reports discoveries. This is why it is the field standard for publication — it is explicitly designed to keep false discovery rates low.

For prioritising candidate genes during exploration, the Storey q-value (`qvalue` package) is more honest. It estimates the proportion of null genes from the data, not assuming they are all null. But for publication, use padj.

## Building the analysis table

Here is how to convert the results object to a usable data frame:

```r
res_df <- as.data.frame(res)
res_df$gene <- rownames(res_df)

# Call significance based on padj and LFC threshold
res_df$significant <- !is.na(res_df$padj) &
  res_df$padj < 0.05 & abs(res_df$log2FoldChange) >= 1.0

# Direction: up, down, or not significant
res_df$direction <- ifelse(
  res_df$significant & res_df$log2FoldChange > 0, "UP",
  ifelse(res_df$significant & res_df$log2FoldChange < 0, "DOWN", "NS")
)

# Sort by adjusted p-value
res_df <- res_df[order(res_df$padj, na.last = TRUE), ]

# Write to table
write.table(res_df, "results_DESeq2_5xFAD_vs_BL6.tsv",
            sep = "\t", quote = FALSE, row.names = FALSE)
```

The LFC threshold (|log₂FC| ≥ 1) is arbitrary. Some prefer 0.5 for exploratory analysis, others 2.0 for high-confidence calls. The key is to report what you chose and to justify it based on your downstream use case. For functional validation, you want high confidence — use 1.0 or higher. For gene set enrichment analysis, you can be more liberal.

## Exploring variance structure before running the test

Before calling a single DE gene, it is worth asking: what is actually driving the variance in this dataset? The answer shapes every design decision that follows.

I ran PCA on the VST-normalised counts. PC1 explains 30.8% of variance, PC2 17.7%. Coloured by genotype, the picture is not a clean separation:

![PCA coloured by genotype](/assets/images/bulkrnaseq_008_PCA_genotype.png)
*PCA of 192 samples (PC1 = 30.8%, PC2 = 17.7%), coloured by genotype. Distinct subclusters are visible but genotype alone does not explain them — tissue is the dominant driver of variance.*

The subclusters visible here correspond primarily to tissue type, not genotype. This matters for the design formula. Running `~ sex + age_months + genotype` on all samples combined treats a cortex sample and a hippocampus sample as interchangeable except for their genotype — they are not. Cortex and hippocampus have substantially different transcriptional profiles, and that difference dwarfs the 5xFAD effect in this combined analysis.

UMAP makes the structure even clearer when tissue is explicitly encoded:

![UMAP coloured by genotype and tissue](/assets/images/bulkrnaseq_011_UMAP_genotype.png)
*UMAP of 192 samples. Circles = cortex, triangles = hippocampus. Tissue drives the primary separation into distinct clusters. Within each tissue cluster, some genotype-specific structure is visible.*

This is precisely why the "Handling complexity" section below recommends running separate analyses per tissue rather than modelling all samples together. The combined-sample analysis I ran here is useful as an exploratory step — it tells you which genes change across the full dataset regardless of region — but it is not the right frame for asking region-specific biological questions.

## Visualisation

### MA plot

The MA plot (M = log ratio, A = average log intensity) shows the relationship between expression level and fold-change:

```r
# Plot log2FC vs. baseMean
ggplot(res_df, aes(x = log10(baseMean), y = log2FoldChange)) +
  geom_point(aes(color = direction), alpha = 0.6, size = 1) +
  geom_hline(yintercept = 0, linetype = "dashed", color = "gray50") +
  geom_hline(yintercept = c(-1, 1), linetype = "dashed", color = "gray70") +
  scale_color_manual(values = c("UP" = "#E07050", "DOWN" = "#1B3A2D", "NS" = "lightgray")) +
  labs(x = "log10(mean counts)", y = "log2(5xFAD / BL6)", title = "MA Plot") +
  theme_minimal()
```

The MA plot should show little trend: LFC should be centered around zero across all expression levels. If you see a trend (e.g., high-abundance genes preferentially up-regulated), it suggests an unmodeled batch effect or normalisation issue.

Here is the MA plot from the GSE168137 run after apeglm shrinkage:

![MA plot — DESeq2 with apeglm shrinkage](/assets/images/bulkrnaseq_014_DESeq2_MA.png)
*MA plot after apeglm LFC shrinkage. Significant genes (padj < 0.05, |log₂FC| ≥ 1) shown in red. The pattern is clean: no trend at high expression, and the shrinkage is visible in the compression of LFC estimates toward zero at low expression levels.*

### Volcano plot

The volcano plot (LFC vs. −log10(padj)) is what most people look at first:

```r
ggplot(res_df, aes(x = log2FoldChange, y = -log10(padj))) +
  geom_point(aes(color = direction), alpha = 0.7, size = 2) +
  geom_vline(xintercept = c(-1, 1), linetype = "dashed", color = "gray70") +
  geom_hline(yintercept = -log10(0.05), linetype = "dashed", color = "gray70") +
  scale_color_manual(values = c("UP" = "#E07050", "DOWN" = "#1B3A2D", "NS" = "lightgray")) +
  ggrepel::geom_text_repel(
    data = subset(res_df, direction != "NS"),
    aes(label = gene),
    size = 3, max.overlaps = 20
  ) +
  labs(x = "log2(5xFAD / BL6)", y = "−log10(padj)", 
       title = "Volcano: 5xFAD vs BL6") +
  theme_minimal()
```

This gives you a quick visual of the effect sizes and significances. A clean volcano has a tight horn pointing up and down — significant genes with large effect sizes — and a cloud of gray points in the middle (non-significant).

Here is the actual volcano for GSE168137 (5xFAD vs BL6, all samples combined):

![Volcano plot — 5xFAD vs BL6, DESeq2](/assets/images/bulkrnaseq_013_DESeq2_volcano.png)
*Volcano plot. Significant genes at padj < 0.05 and |log₂FC| ≥ 1 shown in red (418 genes, all upregulated). Top genes by combined significance and effect size: Clec7a, Cst7, Ccl6, Ccl8, Trem2, Cd68, Tyrobp — a strongly microglial signature. The notable asymmetry (no downregulated genes at this stringent threshold) is discussed in the results section below.*

### Heatmap of top DE genes

To see whether top DE genes actually separate your conditions:

```r
# Get top 50 up and down
top_up <- res_df %>% filter(direction == "UP") %>% head(25) %>% pull(gene)
top_down <- res_df %>% filter(direction == "DOWN") %>% head(25) %>% pull(gene)
top_genes <- c(top_up, top_down)

# Extract VST-normalized counts for those genes
vst_matrix <- assay(vst(dds))  # VST normalisation
heatmap_data <- vst_matrix[rownames(vst_matrix) %in% top_genes, ]

# Annotate columns with genotype and age
col_anno <- HeatmapAnnotation(
  genotype = colData(dds)$genotype,
  age = colData(dds)$age_factor,
  col = list(
    genotype = c("5xFAD" = "#E07050", "BL6" = "#1B3A2D"),
    age = c("4" = "white", "8" = "#F2F7F4", "12" = "#1B3A2D", "18" = "black")
  )
)

# Draw heatmap
Heatmap(
  heatmap_data,
  name = "VST count",
  top_annotation = col_anno,
  cluster_rows = TRUE,
  cluster_columns = FALSE,
  show_row_names = FALSE
)
```

This heatmap should show clear separation between genotypes — if it does not, your DE call is worth questioning. Similarly, if the heatmap clusters by batch or technical variable rather than biology, you have a problem in the upstream processing.

## What the analysis found

Running the pipeline on all 192 samples with design `~ sex + age_months + genotype` produced the following results:

| | DESeq2 | edgeR |
|---|---|---|
| Genes tested | 18,357 | 18,357 |
| Significant (padj/FDR < 0.05) | 6,046 | 6,826 |
| Upregulated (LFC > 0, padj < 0.05) | 2,791 | — |
| Downregulated (LFC < 0, padj < 0.05) | 3,255 | — |
| Stringent (padj < 0.05 AND \|LFC\| ≥ 1) | 418 (all UP) | — |
| Concordant DESeq2 ∩ edgeR (stringent) | 417 | |

The two methods agreed closely on effect size estimates: Pearson r = 0.952 between DESeq2 and edgeR log₂FC values across all tested genes.

![DESeq2 vs edgeR LFC comparison](/assets/images/bulkrnaseq_017_comparison_LFC.png)
*Log₂FC comparison between DESeq2 (x-axis) and edgeR (y-axis). Green = concordant significant genes, orange = method-specific calls, gray = non-significant. Pearson r = 0.952. The fitted line (solid) nearly overlaps the identity (dashed), indicating no systematic bias between methods.*

The high correlation gives confidence that the signal is real, not an artefact of any single statistical model. Method-specific calls (orange) tend to cluster near zero on the DESeq2 axis, suggesting that edgeR is somewhat less conservative for low-effect-size genes in this dataset.

**The dominant signal is microglial activation.** All 418 genes significant at the stringent threshold are upregulated in 5xFAD relative to BL6. The top genes — Clec7a (LFC = 4.4), Cst7 (LFC = 6.2), Ccl6 (LFC = 3.1), Trem2 (LFC = 2.4), Cd68 (LFC = 2.2), Tyrobp (LFC = 2.3), Lyz2 (LFC = 2.4) — are established markers of disease-associated microglia (DAM), the microglial phenotype first described in 5xFAD brain by Keren-Shaul et al. (2017).

The asymmetry between up and down at the stringent threshold is biologically informative. The 3,255 downregulated genes at padj < 0.05 do not clear the |LFC| ≥ 1 bar — their effect sizes are smaller. This is consistent with the 5xFAD biology: microglia are dramatically activated (large effect sizes), while neuronal and synaptic gene downregulation is more diffuse and modest in magnitude. That contrast is easy to miss if you only look at the volcano and interpret "no significant DOWN" as "nothing is downregulated."

## Handling complexity: regions, timepoints, and interaction

GSE168137 is a full factorial design: 2 genotypes × 2 regions × 4 timepoints × 2 sexes. The question "what changed in 5xFAD?" has multiple answers depending on which region and age you ask.

The simplest approach is to subset the data before analysis:

```r
# Subset to cortex only
subset_samples <- colData(dds)$tissue == "cortex"
dds_cortex <- dds[, subset_samples]

# Then run the standard DESeq2 workflow
dds_cortex <- DESeq(dds_cortex)
res_cortex <- results(dds_cortex, contrast = c("genotype", "5xFAD", "BL6"))
```

A more sophisticated approach uses an interaction term:

```r
design = ~ sex + age_factor + tissue + genotype + genotype:tissue
```

This allows the 5xFAD effect to differ between cortex and hippocampus. Extracting the interaction term and testing whether it is significant tells you whether the genotype effect is region-specific. But be warned: interaction models require more power. With only 192 samples across multiple conditions, you have limited per-group n, and detecting interactions reliably is hard.

For this dataset, I recommend the subset-and-compare approach: run separate analyses for cortex and hippocampus, then compare the results tables to identify region-specific changes.

## Full pipeline overview

Here is a complete, runnable example:

```r
library(DESeq2)
library(ggplot2)

# 1. Load counts and metadata
counts <- read.table(
  gzfile("rawdata/GSE168137_countList.txt.gz"),
  header = TRUE, row.names = 1, sep = "\t"
)
metadata <- parse_metadata(colnames(counts))  # Function from above
storage.mode(counts) <- "integer"

# 2. Filter genes with low abundance
# Keep genes with ≥1 CPM in at least 3 samples
keep <- rowSums(edgeR::cpm(counts) >= 1) >= 3
counts_filt <- counts[keep, ]

# 3. Build DESeqDataSet
dds <- DESeq2::DESeqDataSetFromMatrix(
  countData = counts_filt,
  colData = metadata,
  design = ~ sex + age_factor + genotype
)

# 4. Run DESeq2
dds <- DESeq2::DESeq(dds)

# 5. Extract and shrink results
res_raw <- DESeq2::results(dds, contrast = c("genotype", "5xFAD", "BL6"))
res <- DESeq2::lfcShrink(dds, contrast = c("genotype", "5xFAD", "BL6"), 
                          type = "apeglm")

# 6. Convert to data frame and save
res_df <- as.data.frame(res)
res_df$gene <- rownames(res_df)
res_df$significant <- !is.na(res_df$padj) & 
                      res_df$padj < 0.05 & 
                      abs(res_df$log2FoldChange) >= 1.0
write.table(res_df, "results_DESeq2.tsv", sep = "\t", quote = FALSE, row.names = FALSE)

# 7. Plot
pdf("volcano.pdf", width = 8, height = 6)
ggplot(res_df, aes(x = log2FoldChange, y = -log10(padj))) +
  geom_point(color = ifelse(res_df$padj < 0.05, "#E07050", "lightgray")) +
  theme_minimal()
dev.off()
```

The full pipeline with all code, configuration, and outputs is available at [github.com/SLopezBegines/bulkRNAseq](https://github.com/SLopezBegines/bulkRNAseq). The dataset is publicly available on GEO: [GSE168137](https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE168137).

## A note on the 5xFAD model

This analysis uses GSE168137, the same 5xFAD Alzheimer mouse model as the single-nucleus RNA-seq dataset in the snRNA-seq pipeline (GSE262881). Bulk transcriptomics captures aggregate gene expression across all cell types, including rare populations that snRNA-seq may miss due to low capture efficiency. snRNA-seq, by contrast, resolves cell-type-specific changes. These approaches are complementary: use bulk RNA-seq to identify which genes and pathways are dysregulated, then use snRNA-seq (or computational deconvolution of bulk data using cell-type signatures) to understand which cell types are driving the changes.

## Conclusion

Running DESeq2 and edgeR in parallel on GSE168137 identified 418 high-confidence upregulated genes in 5xFAD vs BL6 (padj < 0.05, |LFC| ≥ 1), concordant between both methods (r = 0.952). The signal is dominated by disease-associated microglial markers — Clec7a, Cst7, Trem2, Tyrobp, Cd68 — consistent with the established 5xFAD DAM phenotype. The 3,255 downregulated genes at padj < 0.05 show smaller effect sizes, reflecting a more diffuse transcriptional suppression of neuronal/synaptic programmes.

These results are from a combined analysis across all tissues and ages. The UMAP makes clear that tissue drives the primary variance structure in this dataset. Region-stratified analyses (cortex-only, hippocampus-only) and timepoint-resolved contrasts are the natural next steps, and they are where the methodological choices discussed above — design formula, LFC shrinkage, interaction terms — will matter most.

DESeq2 is powerful, but only if you respect the assumptions it makes and the design decisions it requires. Account for your covariates in the design formula. Shrink your log-fold-change estimates. Check your MA plots and p-value histograms before drawing conclusions. The methodological details are not window dressing — they are the reason the results are trustworthy.

------------------------------------------------------------------------

**About the author**: Santiago López Begines is a PhD-trained neuroscientist and data scientist specialising in omics data pipelines, biomarker discovery, and quantitative proteomics. For scientific collaborations or methodological exchanges, [get in touch](/#contact).

## References

Love, M. I., Huber, W., & Anders, S. (2014). Moderated estimation of fold change and dispersion for RNA-seq data with DESeq2. *Genome Biology*, 15(12), 550. https://doi.org/10.1186/s13059-014-0550-8

Forner, S., Kawauchi, S., Balderrama-Gutierrez, G., et al. (2021). Systematic phenotyping and characterization of the 5xFAD mouse model of Alzheimer's disease. *Scientific Data*, 8(1), 270. https://doi.org/10.1038/s41597-021-01054-y

Zhu, A., Ibrahim, J. G., & Love, M. I. (2019). Heavy-tailed prior distributions for sequence count data: removing the noise and preserving large differences. *Bioinformatics*, 35(12), 2084–2092. https://doi.org/10.1093/bioinformatics/bty895

Keren-Shaul, H., Spinrad, A., Weiner, A., et al. (2017). A unique microglia type associated with restricting development of Alzheimer's disease. *Cell*, 169(7), 1276–1290. https://doi.org/10.1016/j.cell.2017.05.018
