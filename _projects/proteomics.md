---
title: "Proteomics Analysis Pipeline"
excerpt: "Modular R pipeline for label-free quantitative proteomics: from MaxQuant output to functional enrichment."
date: 2024-01-01
collection: projects
tags:
  - Proteomics
  - R
  - Bioinformatics
  - Bioconductor
  - limma
  - Gene Ontology
---

# Proteomics Analysis Pipeline

**Tech stack**: R · Bioconductor · DEP · limma · clusterProfiler · ComplexHeatmap · rbioapi  
**Repository**: [github.com/SLopezBegines/Proteomics](https://github.com/SLopezBegines/Proteomics)

## Overview

A modular and reproducible R pipeline for analyzing label-free quantitative (LFQ) proteomics data from Orbitrap and Q-Exactive mass spectrometers. The pipeline processes MaxQuant output through a complete analytical workflow: data cleaning, mixed imputation, differential expression analysis, and multi-layered functional enrichment.

Each analysis is configured through a single RMarkdown file that defines organism parameters and experimental design, then calls reusable modular scripts. This architecture allows rapid deployment on new datasets without code modification.

## Problem & Approach

Proteomics experiments generate complex datasets with systematic missing values, batch effects, and thousands of protein measurements across conditions. Standard tools handle individual steps but lack integration. This pipeline addresses:

- **Missing value heterogeneity** — Implements a mixed imputation strategy that distinguishes MNAR (below detection limit) from MAR (randomly absent) proteins, applying appropriate methods for each type.
- **Reproducibility** — Modular scripts with centralized parameter control ensure consistent processing across datasets.
- **Multi-organism support** — Configurable for human, mouse, and zebrafish without pipeline modification.

## Analytical Workflow

The pipeline follows six main stages:

**Data preparation**: Loading MaxQuant protein groups, contaminant removal, and standardized column mapping across different MaxQuant versions.

**Quality control & imputation**: Missing value filtering by condition, VSN normalization, and mixed imputation combining zero/MinProb/QRILC (for MNAR) with kNN (for MAR).

**Differential expression**: Protein-wise linear models with empirical Bayes moderation via limma, supporting manual contrast definitions across multiple experimental comparisons.

**Visualization**: Publication-ready volcano plots, heatmaps (ComplexHeatmap), PCA biplots, protein overlap plots, and UpSet/Venn diagrams — exported in both TIFF and vector PDF formats.

**Functional enrichment**: Over-Representation Analysis (enrichGO) and Gene Set Enrichment Analysis (gseGO, gseKEGG) for Gene Ontology and KEGG pathways, complemented by STRING protein interaction networks (via rbioapi), PANTHER classification, and EnrichR.

**Reporting**: All results exported as Excel tables and organized figures for direct integration into manuscripts.

## Key Technical Details

- Differential expression via `DEP::analyze_dep()` wrapping limma with flexible manual contrasts
- Configurable imputation: `fraction_NA`, `factor_SD_impute`, and MNAR method selection
- Automated directory structure and sequential figure numbering for reproducible outputs
- Dual export (TIFF raster + PDF vector) for all figures
- Gene identifier mapping through biomaRt and AnnotationDbi (UNIPROT → ENSEMBL/ENTREZ)

## Example Application — CLN3 Lysosomal Interactome

The repository includes a complete analysis of the **CLN3 lysosomal interactome** in human cell lines (ProteomeXchange [PXD031582](https://www.ebi.ac.uk/pride/archive/projects/PXD031582)), comparing CTRL vs WT vs KO conditions across 12 samples and 3 pairwise contrasts.

> Calcagni' et al. *Loss of the batten disease protein CLN3 leads to mis-trafficking of M6PR and defective autophagic-lysosomal reformation.* Nat Commun 14, 3911 (2023). [doi:10.1038/s41467-023-39643-7](https://doi.org/10.1038/s41467-023-39643-7)

---

## Output Gallery

### Quality Control & Normalisation

<div class="figure-grid">
  <figure>
    <img src="https://raw.githubusercontent.com/SLopezBegines/Proteomics/main/docs/images/05_QC_data_overview_prot_data.png" alt="QC overview">
    <figcaption>QC overview — protein identification and coverage</figcaption>
  </figure>
  <figure>
    <img src="https://raw.githubusercontent.com/SLopezBegines/Proteomics/main/docs/images/06_Normalization_diagnosis.png" alt="VSN normalisation">
    <figcaption>VSN normalisation diagnostics</figcaption>
  </figure>
  <figure>
    <img src="https://raw.githubusercontent.com/SLopezBegines/Proteomics/main/docs/images/09_SD_before_after_scatter.png" alt="SD before vs after imputation">
    <figcaption>SD before vs after imputation — 6 methods compared</figcaption>
  </figure>
  <figure>
    <img src="https://raw.githubusercontent.com/SLopezBegines/Proteomics/main/docs/images/10_protein_imputation_distribution.png" alt="Imputation distribution">
    <figcaption>Intensity distribution — imputation method comparison</figcaption>
  </figure>
</div>

### Dimensionality Reduction & Differential Expression

<div class="figure-grid">
  <figure>
    <img src="https://raw.githubusercontent.com/SLopezBegines/Proteomics/main/docs/images/14_PCA_Splited_Mixed.png" alt="PCA mixed imputation">
    <figcaption>PCA — mixed imputation</figcaption>
  </figure>
  <figure>
    <img src="https://raw.githubusercontent.com/SLopezBegines/Proteomics/main/docs/images/26_vulcano_DEP_KO_vs_WT.png" alt="Volcano KO vs WT">
    <figcaption>Volcano plot — KO vs WT</figcaption>
  </figure>
</div>

### Clustering & Functional Enrichment

<div class="figure-grid">
  <figure>
    <img src="https://raw.githubusercontent.com/SLopezBegines/Proteomics/main/docs/images/23_Heatmap_significant.png" alt="Heatmap significant proteins">
    <figcaption>Heatmap — significant proteins across all comparisons</figcaption>
  </figure>
  <figure>
    <img src="https://raw.githubusercontent.com/SLopezBegines/Proteomics/main/docs/images/76_Lolliplot_KO_vs_WT_UP.png" alt="GO lolliplot">
    <figcaption>GO lolliplot — KO vs WT upregulated terms</figcaption>
  </figure>
</div>