---
layout: project
title: "IBEX35 Directional Forecasting — ML & Sentiment Analysis"
excerpt: "Master's thesis: end-to-end pipeline combining technical indicators and GDELT news sentiment to predict daily IBEX35 direction across 20 years of data."
date: 2025-12-01
tags:
  - Machine Learning
  - Financial Markets
  - Sentiment Analysis
  - Time Series
  - Python
  - R
  - LightGBM
  - Deep Learning
---

# IBEX35 Directional Forecasting — ML & Sentiment Analysis

**Tech stack**: Python · R · Quarto · LightGBM · XGBoost · TensorFlow/Keras · scikit-learn · GDELT · quantmod · reticulate
**Repository**: [github.com/SLopezBegines/series_temporales_IBEX](https://github.com/SLopezBegines/series_temporales_IBEX)
**Thesis**: [TFM_Santiago_Lopez_Begines.pdf](https://github.com/SLopezBegines/series_temporales_IBEX/raw/main/TFM_Santiago_Lopez_Begines.pdf)

## Overview

End-to-end pipeline for predicting the **daily directional movement** (up/down) of the Spanish IBEX35 index over a 20-year horizon (2004–2024). The project assesses whether integrating **news sentiment extracted from >2,000 GDELT batches** (~150 GB raw data) improves directional forecasting beyond models trained on price-based technical indicators alone.

**Key result**: LightGBM achieves **55–62% directional accuracy** — significantly above the 50% random baseline. Sentiment adds marginal, inconsistent improvement; technical indicators dominate feature importance. Deep learning (LSTM, GRU) offers no clear advantage over traditional gradient boosting.

## Problem & Approach

Predicting stock market direction is a canonical hard problem: markets are noisy, non-stationary, and approximately efficient. Two specific challenges drove the design of this pipeline:

- **Lookahead contamination** — Strict temporal train/test splits and rolling-window validation prevent any future information from leaking into training, which is a common flaw in published ML-finance studies.
- **Sentiment quantification at scale** — GDELT provides tone scores for millions of daily news events, but requires heavy filtering, aggregation, and lag engineering to extract a usable signal for a single index. The R pipeline handles >2,000 ZIP archives via parallel download and Parquet-based batch processing.

## Analytical Workflow

```mermaid
flowchart TD
    subgraph Data ["📥 Data Collection"]
        A1["IBEX35 + components\nYahoo Finance · 2004–2024"]
        A2["External markets\nS&P500 · EuroStoxx · Oil · Gold"]
        A3["GDELT news\n>2,000 ZIP files · ~150 GB"]
    end

    subgraph EDA ["🔬 EDA & Features (R · Quarto)"]
        B1["Fase 1–2\nTechnical indicators\nRSI · MACD · Bollinger\nVolatility · MAs"]
        B2["Fase 3–4\nGDELT download\nParquet conversion\nSentiment scoring + lags"]
        B3["Fase 5\nFeature integration\n~50 features selected\nScaling & consistency checks"]
    end

    subgraph ML ["🤖 ML Pipeline (Python · Colab)"]
        C1["Baselines\nARIMA · Prophet · Naïve"]
        C2["Gradient boosting\nLightGBM · XGBoost · RF"]
        C3["Deep learning\nLSTM · GRU · MLP"]
    end

    subgraph Eval ["📊 Evaluation (Fase 6)"]
        D1["Accuracy · F1 · AUC\nMcNemar · Diebold–Mariano\nBootstrap CI (n=1000)"]
    end

    Data --> EDA --> ML --> Eval

    style Data fill:#1e3a5f,color:#fff,stroke:#3b82f6
    style EDA fill:#1e3a1e,color:#fff,stroke:#22c55e
    style ML fill:#3a1e1e,color:#fff,stroke:#ef4444
    style Eval fill:#3a2a1e,color:#fff,stroke:#f59e0b
```

## Key Results

| Model | Directional Accuracy | ROC-AUC | Note |
|---|---|---|---|
| **LightGBM** | **55–62%** | **0.58–0.64** | Best overall |
| XGBoost | 53–59% | 0.55–0.61 | |
| Random Forest | 52–57% | 0.54–0.60 | |
| LSTM / GRU | 51–56% | 0.52–0.58 | No DL advantage |
| ARIMA / Prophet | 50–52% | 0.50–0.53 | |
| Naïve baseline | ~50% | ~0.50 | Random walk |

- **Sentiment impact**: GDELT tone improved accuracy by <2 pp in most conditions. McNemar tests (p > 0.05) confirm the improvement is not statistically significant.
- **Top features**: RSI, short-term moving averages, lagged daily returns, intraday range.
- **Efficient market alignment**: results are consistent with the semi-strong form of the EMH — public news sentiment is already priced in within the same trading session.

## Pipeline Structure

The project is split into two complementary stages executed sequentially:

**EDA & Feature Engineering (R, 6 Quarto phases)**
Fase 1–2 build the financial feature matrix: technical indicators (RSI, MACD, Bollinger Bands, 10+ moving averages), external market variables, and lagged returns. Fase 3–4 download, filter, and aggregate the GDELT corpus — the most computationally intensive step (~12–24 h, parallelised over >2,000 ZIP archives). Fase 5 merges both feature sets, applies temporal scaling, and verifies consistency before handoff to Python.

**ML Pipeline (Python, Google Colab)**
A single notebook (`pipeline_ML_ibex35.ipynb`) runs the complete training, hyperparameter optimisation, and evaluation loop. All modules are factored into reusable scripts under `ML_Colab/scripts/` so individual components (feature import, model training, evaluation) can be run independently. The pipeline auto-detects whether it runs locally, on Colab, or on Kaggle and adjusts paths accordingly.

## Key Technical Details

- 25 modular R scripts organised by pipeline stage (00–25), each with a single functional responsibility
- Parallel GDELT download via `parallel::mclapply` over >2,000 ZIP files; Parquet format for efficient batch I/O
- Python–R bridge via `reticulate` for seamless object transfer between stages
- Time-series cross-validation with strict temporal splits to prevent lookahead bias
- Statistical comparison: McNemar test (classification) and Diebold-Mariano test (forecasts), bootstrap confidence intervals (n = 1 000)
- Google Colab integration with auto-path configuration for GPU-accelerated training

> Santiago López Begines, PhD. *Predicción de valores y tendencias de cierre del IBEX35 mediante machine learning y webscraping.* Master's Thesis, Data Science, UNED (2025).
