---
layout: project
title: "ML-Based Biomarker Discovery in Neurodegeneration (Batten Disease / CLN4)"
excerpt: "ML classification pipeline combining feature selection, cross-validation, and differential expression analysis to identify biomarkers in CLN4 (Batten disease) transgenic mouse models. Contributed to first-author publication in Science Advances (2025)."
date: 2025-01-01
tags:
  - Machine Learning
  - Biomarker Discovery
  - Proteomics
  - Python
  - R
  - Neurodegeneration
  - CLN4
---

# ML-Based Biomarker Discovery in Neurodegeneration (Batten Disease / CLN4)

**Stack**: Python (scikit-learn, XGBoost, Pandas) · R (tidymodels, limma, ggplot2) · Git
**Repository**: [github.com/SLopezBegines/AD_ML_A4_study](https://github.com/SLopezBegines/AD_ML_A4_study)

---

## Problem

Identifying robust protein biomarkers in CLN4 (Batten disease / Kufs disease) models required integrating high-dimensional proteomics data with rigorous statistical validation to avoid false discovery. Standard differential expression analysis alone is insufficient for biomarker discovery in small-n, high-p proteomics datasets.

## Solution

Developed an ML classification pipeline combining:
- **Feature selection**: LASSO regularization and random forest importance ranking to reduce dimensionality
- **Cross-validation frameworks**: Stratified k-fold CV with nested hyperparameter tuning to prevent overfitting
- **Differential expression integration**: limma outputs used as prior knowledge to constrain the candidate feature space
- **Model validation**: Bootstrap confidence intervals and permutation tests to quantify uncertainty

Applied to transgenic mouse proteomics data from CLN4 (DNAJC5 mutation) models, integrating mass spectrometry readouts with electrophysiological phenotypes.

## Result

Validated biomarker candidates contributed to **first-author publication in Science Advances (2025)**. Pipeline is reproducible and documented for reuse on new neurodegeneration datasets.

> López Begines, S. et al. Mutations in DNAJC5 causing Kufs disease in humans induce lipofuscinosis in mice by a dominant-negative mechanism. *Science Advances* 2025. [doi:10.1126/sciadv.ads3393](https://doi.org/10.1126/sciadv.ads3393)

---

## Methodology

### Part 1: Feature Engineering & Differential Expression (R)

- MaxQuant LFQ output processed through the automated proteomics pipeline (VSN normalization, mixed imputation, limma DE analysis)
- Candidate feature lists generated per pairwise comparison (WT vs KO, CTRL vs mutant)
- Composite scores integrating electrophysiology readouts (mIPSC frequency, resting membrane potential) with proteomic features

### Part 2: ML Classification Pipeline (Python)

```python
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LassoCV
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import StratifiedKFold, cross_val_score

# Feature selection stage
lasso_selector = LassoCV(cv=5, max_iter=5000)

# Classification pipeline
clf_pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('classifier', RandomForestClassifier(
        n_estimators=500,
        max_features='sqrt',
        random_state=42
    ))
])

# Nested cross-validation
outer_cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
scores = cross_val_score(clf_pipeline, X_selected, y,
                         cv=outer_cv, scoring='roc_auc')
```

### Part 3: Model Validation & Reporting

- Permutation test to confirm models outperform random baseline
- Bootstrap confidence intervals (n=1000) for AUC estimates
- SHAP values for interpretable feature importance
- Results exported as reproducible RMarkdown/Quarto reports

---

## Technical Stack

**R Environment**:
- tidyverse, tidymodels for structured workflow
- limma, DEP for differential expression
- ggplot2 for visualization

**Python Environment**:
- scikit-learn for ML pipelines and cross-validation
- XGBoost for gradient boosting
- pandas, numpy for data manipulation
- SHAP for model interpretability

---

## Related Publications

- **López Begines, S.** et al. (2025). Mutations in DNAJC5 causing Kufs disease. *Science Advances*. [doi:10.1126/sciadv.ads3393](https://doi.org/10.1126/sciadv.ads3393)

---

[← Back to Projects](/#projects)
