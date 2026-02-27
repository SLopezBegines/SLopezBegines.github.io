---
layout: project
title: "snRNA-seq Analysis Pipeline"
excerpt: "Modular R pipeline for single-nucleus RNA-seq: from 10X CellRanger output to SCTransform normalisation, Louvain clustering, differential expression, and multi-layered functional enrichment."
date: 2024-12-01
tags:
  - Single-cell RNA-seq
  - Seurat
  - R
  - Bioinformatics
  - Neuroscience
  - Bioconductor
  - clusterProfiler
---

# snRNA-seq Analysis Pipeline

**Tech stack**: R · Seurat v5 · sctransform · scDblFinder · clusterProfiler · ComplexHeatmap · STRINGdb · rbioapi
**Repository**: [github.com/SLopezBegines/snRNAsep_mouse](https://github.com/SLopezBegines/snRNAsep_mouse)

## Overview

End-to-end modular R pipeline for single-nucleus RNA-seq analysis, built on Seurat v5 and designed for multi-sample WT vs KO experiments in mouse neural tissue. The pipeline processes 10X CellRanger output through every analytical stage — quality control, SCTransform normalisation, dimensionality reduction, clustering, differential expression, and six parallel enrichment methods — producing publication-ready figures and pathway reports.

Each stage is implemented as an independent script called via `source()` from RMarkdown notebooks. This architecture decouples analysis logic from execution, enabling rapid adaptation to new datasets and organisms without modifying the core pipeline.

## Problem & Approach

Single-nucleus RNA-seq datasets present three compounding analytical challenges addressed by this pipeline:

- **Doublet contamination** — scDblFinder independently scores each sample before integration, preventing artificial cluster formation from cell multiplets.
- **Multi-sample batch effects** — SCTransform (regularised negative binomial regression) normalises each sample separately; Seurat's integration workflow aligns latent spaces across replicates without removing biological variation.
- **Cluster-level interpretation** — differential expression runs per cluster (Wilcoxon), and results feed six parallel enrichment methods (GO ORA, GO GSEA, KEGG, STRING, PANTHER, EnrichR) to obtain convergent pathway evidence rather than relying on any single database.

## Analytical Workflow

```mermaid
flowchart TD
    A["📥 10X CellRanger output · filtered_feature_bc_matrix"] --> B

    subgraph QC ["1 · Quality Control & Doublet Detection"]
        B["Load with Seurat::Read10X · multiple samples"]
        B --> C["QC metrics · nCount_RNA · nFeature_RNA · %MT · Complexity"]
        C --> D["Doublet detection · scDblFinder · per-sample scoring"]
        D --> E["Cell filtering · UMI · gene count · MT thresholds"]
    end

    subgraph NORM ["2 · Normalisation & Integration"]
        E --> F["SCTransform · regularised negative binomial regression"]
        F --> G["Multi-sample integration · batch correction · HVG selection"]
    end

    subgraph DIM ["3 · Dimensionality Reduction & Clustering"]
        G --> H["PCA · elbow selection"]
        H --> I["UMAP · 2D projection"]
        I --> J["Louvain clustering · FindNeighbors · resolution sweep"]
    end

    subgraph DE ["4 · Differential Expression"]
        J --> K["FindAllMarkers · Wilcoxon · min.pct · log2FC threshold"]
        K --> L["Volcano plots per cluster · UP / DOWN gene lists"]
    end

    subgraph ENRICH ["5 · Functional Enrichment"]
        L --> M["GO · enrichGO · gseGO · BP · CC · MF"]
        L --> N["KEGG · enrichKEGG · gseKEGG · pathview"]
        L --> O["STRING PPI networks · PANTHER · EnrichR"]
    end

    style QC fill:#1e3a5f,color:#fff,stroke:#3b82f6
    style NORM fill:#1e3a1e,color:#fff,stroke:#22c55e
    style DIM fill:#2a1e3a,color:#fff,stroke:#8b5cf6
    style DE fill:#3a1e1e,color:#fff,stroke:#ef4444
    style ENRICH fill:#3a2a1e,color:#fff,stroke:#f59e0b
```

## Key Technical Details

- 14 modular R scripts with single functional responsibility; sourced from RMarkdown notebooks
- SCTransform normalisation followed by Seurat CCA integration for multi-sample batch correction
- scDblFinder doublet detection run independently per sample before integration
- Louvain clustering explored across multiple PC levels and resolutions; optimal parameters selected by elbow plot and cluster stability
- Wilcoxon rank-sum test for differential expression per cluster; gene lists split UP/DOWN for directional enrichment
- Six parallel enrichment approaches: GO ORA, GO GSEA, KEGG ORA, KEGG GSEA, STRING PPI, PANTHER, EnrichR
- Allen Brain Atlas (`SingleR`, `Azimuth`) for reference-based cell type annotation
- Reproducible environment via `renv` lockfile (R 4.5.2)
- All figures exported in TIFF (publication raster) + PDF (vector) formats
