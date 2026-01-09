---
layout: project
title: "Proteomics Analysis Pipeline"
excerpt: "High-throughput proteomic data analysis from mass spectrometry for neurodegenerative disease research"
tags:
  - Proteomics
  - Mass Spectrometry
  - Bioinformatics
  - R
  - Neurodegenerative Diseases
---

# Project Overview

Comprehensive pipeline for proteomic data analysis from **Orbitrap** and **QExactive** mass spectrometry platforms. This workflow automates the integration of proteomics data for neurodegenerative disease research, focusing on biomarker discovery in Batten disease models (CLN3, CLN4, CLN12).

## Research Context

Developed and applied during postdoctoral research at:
- **Luxembourg Center for Systems Biomedicine (LCSB)**, University of Luxembourg (2023-Present)
- **Instituto de Biomedicina de Sevilla (IBiS)** (2017-2023)

## Key Applications

- **Biomarker Discovery**: Identification of differentially expressed proteins in disease models
- **Pathway Analysis**: Understanding molecular mechanisms in neurodegeneration
- **Multi-omics Integration**: Combining proteomics with transcriptomics data
- **Publication Support**: Data analysis for multiple high-impact publications

---

# Pipeline Architecture

## Workflow Overview

```
Raw MS Data → Peptide Identification → Protein Quantification → 
Quality Control → Statistical Analysis → Biological Interpretation → Visualization
```

## Data Processing Steps

### 1. Raw Data Import & Preprocessing

```r
library(tidyverse)
library(limma)
library(DEqMS)

# Import MaxQuant or Proteome Discoverer output
import_proteomics_data <- function(file_path, format = "maxquant") {
  if (format == "maxquant") {
    data <- read_tsv(file_path) %>%
      filter(!str_detect(`Protein IDs`, "REV|CON")) %>%  # Remove contaminants
      filter(`Q-value` < 0.01)  # FDR filtering
  }
  
  return(data)
}

# Log2 transformation and normalization
normalize_intensities <- function(data, method = "vsn") {
  intensity_cols <- data %>% select(starts_with("LFQ intensity"))
  
  # Log2 transformation
  log_intensities <- log2(intensity_cols + 1)
  
  # VSN normalization (variance stabilization)
  if (method == "vsn") {
    normalized <- vsn2(as.matrix(log_intensities))
  } else if (method == "median") {
    normalized <- normalizeMedianValues(log_intensities)
  }
  
  return(normalized)
}
```

### 2. Quality Control

```r
# Missing value analysis
qc_missing_values <- function(data) {
  missing_stats <- data %>%
    summarise(across(everything(), ~sum(is.na(.)) / n() * 100))
  
  # Visualization
  missing_plot <- missing_stats %>%
    pivot_longer(everything()) %>%
    ggplot(aes(x = reorder(name, value), y = value)) +
    geom_col(fill = "steelblue") +
    coord_flip() +
    labs(title = "Missing Values per Sample",
         x = "Sample", y = "% Missing") +
    theme_minimal()
  
  return(list(stats = missing_stats, plot = missing_plot))
}

# Sample correlation heatmap
plot_sample_correlation <- function(data) {
  cor_matrix <- cor(data, use = "pairwise.complete.obs")
  
  pheatmap::pheatmap(
    cor_matrix,
    clustering_distance_rows = "euclidean",
    clustering_distance_cols = "euclidean",
    color = colorRampPalette(c("blue", "white", "red"))(100),
    main = "Sample Correlation Matrix"
  )
}

# PCA for outlier detection
pca_outlier_detection <- function(data, metadata) {
  pca_result <- prcomp(t(na.omit(data)), scale. = TRUE)
  
  pca_df <- as.data.frame(pca_result$x) %>%
    mutate(sample = rownames(.)) %>%
    left_join(metadata, by = "sample")
  
  ggplot(pca_df, aes(x = PC1, y = PC2, color = condition, label = sample)) +
    geom_point(size = 3) +
    geom_text_repel() +
    labs(title = "PCA - Sample Distribution",
         x = paste0("PC1 (", round(summary(pca_result)$importance[2,1]*100, 1), "%)"),
         y = paste0("PC2 (", round(summary(pca_result)$importance[2,2]*100, 1), "%)")) +
    theme_minimal()
}
```

### 3. Differential Expression Analysis

```r
# DEqMS analysis (accounts for peptide count)
differential_expression_analysis <- function(data, design_matrix) {
  
  # Fit linear model
  fit <- lmFit(data, design_matrix)
  fit <- eBayes(fit)
  
  # DEqMS adjustment for peptide counts
  fit$count <- peptide_counts  # From preprocessing
  fit <- spectraCounteBayes(fit)
  
  # Extract results
  results <- topTable(
    fit, 
    coef = 2,  # Comparison of interest
    number = Inf,
    adjust.method = "BH"
  ) %>%
    mutate(
      significant = adj.P.Val < 0.05 & abs(logFC) > 1,
      direction = case_when(
        logFC > 1 & adj.P.Val < 0.05 ~ "Up",
        logFC < -1 & adj.P.Val < 0.05 ~ "Down",
        TRUE ~ "Not Sig"
      )
    )
  
  return(results)
}

# Volcano plot
plot_volcano <- function(results) {
  ggplot(results, aes(x = logFC, y = -log10(adj.P.Val), color = direction)) +
    geom_point(alpha = 0.6) +
    scale_color_manual(values = c("Up" = "red", "Down" = "blue", "Not Sig" = "grey")) +
    geom_hline(yintercept = -log10(0.05), linetype = "dashed") +
    geom_vline(xintercept = c(-1, 1), linetype = "dashed") +
    labs(title = "Volcano Plot - Differential Expression",
         x = "Log2 Fold Change",
         y = "-Log10 Adjusted P-value") +
    theme_minimal()
}
```

### 4. Functional Enrichment Analysis

```r
library(clusterProfiler)
library(org.Mm.eg.db)  # Mouse annotation

# Gene Ontology enrichment
go_enrichment_analysis <- function(protein_ids, universe = NULL, organism = "mouse") {
  
  if (organism == "mouse") {
    org_db <- org.Mm.eg.db
  }
  
  # GO Biological Process
  ego_bp <- enrichGO(
    gene = protein_ids,
    universe = universe,
    OrgDb = org_db,
    ont = "BP",
    pAdjustMethod = "BH",
    pvalueCutoff = 0.05,
    qvalueCutoff = 0.1,
    readable = TRUE
  )
  
  # GO Molecular Function
  ego_mf <- enrichGO(
    gene = protein_ids,
    OrgDb = org_db,
    ont = "MF",
    pAdjustMethod = "BH",
    pvalueCutoff = 0.05,
    readable = TRUE
  )
  
  # GO Cellular Component
  ego_cc <- enrichGO(
    gene = protein_ids,
    OrgDb = org_db,
    ont = "CC",
    pAdjustMethod = "BH",
    pvalueCutoff = 0.05,
    readable = TRUE
  )
  
  return(list(BP = ego_bp, MF = ego_mf, CC = ego_cc))
}

# KEGG pathway enrichment
kegg_enrichment <- function(gene_ids) {
  enrichKEGG(
    gene = gene_ids,
    organism = 'mmu',  # Mouse
    pvalueCutoff = 0.05,
    pAdjustMethod = "BH"
  )
}

# Visualization
plot_enrichment_dotplot <- function(enrichment_result, top_n = 20) {
  dotplot(enrichment_result, showCategory = top_n) +
    labs(title = "GO/KEGG Enrichment Analysis") +
    theme_minimal()
}
```

### 5. Network Analysis

```r
library(STRINGdb)

# Protein-protein interaction network
string_network_analysis <- function(protein_ids, species = 10090) {
  
  # Initialize STRING database
  string_db <- STRINGdb$new(
    version = "11.5",
    species = species,
    score_threshold = 400
  )
  
  # Map proteins to STRING IDs
  mapped <- string_db$map(
    data.frame(protein = protein_ids),
    "protein",
    removeUnmappedRows = TRUE
  )
  
  # Get interactions
  interactions <- string_db$get_interactions(mapped$STRING_id)
  
  # Plot network
  string_db$plot_network(mapped$STRING_id)
  
  # Get enrichment
  enrichment <- string_db$get_enrichment(mapped$STRING_id)
  
  return(list(mapped = mapped, 
              interactions = interactions, 
              enrichment = enrichment))
}
```

---

# Applications & Results

## CLN3 Batten Disease Model

**Research Question**: Identify dysregulated proteins in CLN3 mutation models

**Key Findings**:
- Identified 247 differentially expressed proteins
- Enriched pathways: lysosomal function, autophagy, lipid metabolism
- Novel biomarkers for disease progression monitoring

## CLN4/CLN12 Models

**Comparative Analysis**: Cross-model comparison of proteomic changes

**Results**:
- Shared molecular signatures across CLN models
- Model-specific dysregulated pathways
- Potential therapeutic targets identified

---

# Technical Features

## Data Formats Supported
- MaxQuant output (proteinGroups.txt)
- Proteome Discoverer
- Spectronaut
- DIA-NN

## Statistical Methods
- **Normalization**: VSN, median centering, quantile
- **Missing value imputation**: MinProb, KNN, BPCA
- **Differential analysis**: limma, DEqMS
- **Multiple testing correction**: Benjamini-Hochberg, Bonferroni

## Visualization Tools
- Volcano plots
- Heatmaps with hierarchical clustering
- PCA and t-SNE projections
- GO enrichment dot plots
- STRING network visualization

---

# Publications Using This Pipeline

**2025** - López Begines, S. et al. *Mutations in DNAJC5 causing Kufs disease in humans induce lipofuscinosis in mice by a dominant-negative mechanism.* Science Advances. DOI: 10.1126/sciadv.ads3393

**2024** - López-Begines, S. et al. *Handshaking for ultrafast endocytosis: Dynamin1xA and Endophilin A1 sealed the deal.* EMBO Journal.

**Multiple ongoing projects** at LCSB focusing on neurodegenerative disease mechanisms

---

# Technical Stack

**R Packages**:
- `limma`, `DEqMS` - Differential expression
- `clusterProfiler` - Functional enrichment
- `STRINGdb` - Network analysis
- `tidyverse` - Data manipulation
- `ggplot2`, `pheatmap` - Visualization
- `vsn` - Normalization
- `impute` - Missing value handling

**Mass Spectrometry Platforms**:
- Thermo Orbitrap Fusion
- Q Exactive HF-X
- timsTOF Pro

**Data Processing Software**:
- MaxQuant
- Proteome Discoverer
- Spectronaut

---

# Repository

📦 **GitHub**: [Proteomics](https://github.com/SLopezBegines/Proteomics)

Contains:
- Complete R analysis scripts
- Example datasets
- Visualization templates
- Documentation and tutorials

---

# Future Developments

- Integration with metabolomics data
- Single-cell proteomics analysis
- Real-time data processing pipeline
- Web-based interactive dashboard
- Automated report generation

---

[← Back to Projects](/index.html#projects)
