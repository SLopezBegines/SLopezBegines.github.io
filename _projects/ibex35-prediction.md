---
layout: project
title: "IBEX35 Stock Market Prediction using Machine Learning and Sentiment Analysis"
excerpt: "Master's thesis: Predicting Spanish stock market movements using financial indicators and news sentiment analysis"
tags:
  - Machine Learning
  - Financial Markets
  - Sentiment Analysis
  - Time Series
  - Python
  - R
---

# Project Overview

**Master's Thesis - Data Science Program, UNED (2025)**

This project represents a comprehensive analysis of IBEX35 stock market prediction using state-of-the-art machine learning techniques combined with sentiment analysis from global news data. The goal was to determine whether incorporating news sentiment provides additional predictive power beyond traditional financial indicators.

## Research Question

*Can sentiment analysis from news articles improve machine learning models' ability to predict IBEX35 stock market movements compared to models using only financial indicators?*

## Key Findings

The rigorous statistical analysis revealed that:
- **Sentiment data provides minimal improvement** over financial-only models
- Results align with the **efficient market hypothesis**
- Financial indicators alone achieve strong predictive performance
- Model comparison using McNemar and Diebold-Mariano tests showed no significant advantage

---

# Methodology

## Data Collection & Processing

### Financial Data (2004-2025)
- **Source**: Yahoo Finance, Spanish stock market databases
- **Features**: 
  - Technical indicators (RSI, MACD, Bollinger Bands)
  - Trading volume and volatility measures
  - Lagged returns and moving averages
  - Market breadth indicators
- **Preprocessing**: R scripts for data cleaning, feature engineering, outlier detection

### Sentiment Data
- **Source**: GDELT (Global Database of Events, Language, and Tone)
- **Coverage**: 2015-2025 news articles mentioning IBEX35 companies
- **Processing**: 
  - Text extraction and cleaning
  - Sentiment scoring (tone, polarity)
  - Aggregation by company and time period
  - Feature engineering for ML integration

## Machine Learning Pipeline

### Models Implemented
1. **XGBoost** - Gradient boosting with tree-based learning
2. **LightGBM** - Efficient gradient boosting framework
3. **Random Forest** - Ensemble decision trees
4. **Neural Networks** - Deep learning architectures

### Model Configurations
- **Financial-Only Models**: Using technical indicators and market data
- **Sentiment-Enhanced Models**: Adding GDELT sentiment features
- **Hyperparameter Optimization**: Grid search and cross-validation

### Validation Strategy
- **Out-of-sample testing**: Strict temporal split to prevent lookahead bias
- **Rolling window validation**: Simulating real-world trading scenarios
- **Statistical comparison**: McNemar tests for classification, Diebold-Mariano for forecasts

---

# Technical Implementation

## R Code (Exploratory Data Analysis & Feature Engineering)

```r
# Example: Financial feature engineering pipeline
library(tidyverse)
library(TTR)
library(quantmod)

# Load and preprocess data
create_technical_features <- function(data) {
  data %>%
    mutate(
      # Momentum indicators
      rsi_14 = RSI(close, n = 14),
      macd = MACD(close)$macd,
      
      # Volatility
      volatility_20 = runSD(returns, n = 20),
      
      # Moving averages
      sma_50 = SMA(close, n = 50),
      sma_200 = SMA(close, n = 200),
      
      # Lagged features
      return_lag1 = lag(returns, 1),
      return_lag5 = lag(returns, 5)
    ) %>%
    na.omit()
}

# Feature selection and correlation analysis
feature_selection <- function(features, target, threshold = 0.7) {
  cor_matrix <- cor(features)
  high_cor <- findCorrelation(cor_matrix, cutoff = threshold)
  features[, -high_cor]
}
```

## Python Code (Machine Learning Implementation)

```python
# Example: Model training and validation pipeline
import pandas as pd
import numpy as np
from sklearn.model_selection import TimeSeriesSplit
from xgboost import XGBClassifier
from lightgbm import LGBMClassifier
import matplotlib.pyplot as plt

class StockPredictionPipeline:
    def __init__(self, model_type='xgboost'):
        self.model = self._initialize_model(model_type)
        self.metrics = {}
    
    def _initialize_model(self, model_type):
        if model_type == 'xgboost':
            return XGBClassifier(
                n_estimators=200,
                max_depth=6,
                learning_rate=0.01,
                random_state=42
            )
        elif model_type == 'lightgbm':
            return LGBMClassifier(
                n_estimators=200,
                max_depth=6,
                learning_rate=0.01,
                random_state=42
            )
    
    def train_validate(self, X, y, n_splits=5):
        """Time series cross-validation"""
        tscv = TimeSeriesSplit(n_splits=n_splits)
        
        scores = []
        for train_idx, val_idx in tscv.split(X):
            X_train, X_val = X.iloc[train_idx], X.iloc[val_idx]
            y_train, y_val = y.iloc[train_idx], y.iloc[val_idx]
            
            self.model.fit(X_train, y_train)
            score = self.model.score(X_val, y_val)
            scores.append(score)
        
        return np.mean(scores), np.std(scores)
    
    def feature_importance_plot(self):
        """Visualize feature importance"""
        importance = pd.DataFrame({
            'feature': X.columns,
            'importance': self.model.feature_importances_
        }).sort_values('importance', ascending=False)
        
        plt.figure(figsize=(10, 6))
        plt.barh(importance.feature[:20], importance.importance[:20])
        plt.xlabel('Importance')
        plt.title('Top 20 Feature Importances')
        plt.tight_layout()
        plt.show()
```

## Statistical Comparison

```python
# McNemar's test for model comparison
from statsmodels.stats.contingency_tables import mcnemar

def compare_models_mcnemar(y_true, pred_model1, pred_model2):
    """
    Compare two models using McNemar's test
    """
    # Contingency table
    contingency = pd.crosstab(
        pred_model1 == y_true, 
        pred_model2 == y_true
    )
    
    result = mcnemar(contingency, exact=False, correction=True)
    
    return {
        'statistic': result.statistic,
        'p_value': result.pvalue,
        'significant': result.pvalue < 0.05
    }

# Diebold-Mariano test for forecast comparison
def diebold_mariano_test(errors1, errors2):
    """
    Test if forecast errors differ significantly
    """
    from scipy import stats
    
    d = errors1**2 - errors2**2
    mean_d = np.mean(d)
    var_d = np.var(d, ddof=1)
    
    dm_stat = mean_d / np.sqrt(var_d / len(d))
    p_value = 2 * (1 - stats.norm.cdf(np.abs(dm_stat)))
    
    return {
        'statistic': dm_stat,
        'p_value': p_value,
        'significant': p_value < 0.05
    }
```

---

# Results & Analysis

## Model Performance

| Model | Financial Only | With Sentiment | Improvement |
|-------|---------------|----------------|-------------|
| XGBoost | 54.2% | 54.5% | +0.3% |
| LightGBM | 53.8% | 54.1% | +0.3% |
| Random Forest | 52.9% | 53.0% | +0.1% |
| Neural Network | 53.5% | 53.7% | +0.2% |

## Statistical Tests

- **McNemar Test**: No significant difference (p > 0.05) between financial-only and sentiment-enhanced models
- **Diebold-Mariano Test**: Forecast errors not significantly different (p > 0.05)

## Key Insights

1. **Efficient Market Hypothesis**: Results support the notion that publicly available information (news sentiment) is already reflected in prices

2. **Feature Importance**: Technical indicators (RSI, MACD) and volatility measures were the most important predictors

3. **Model Selection**: XGBoost slightly outperformed other algorithms, but differences were minimal

4. **Practical Implications**: For IBEX35 prediction, complex sentiment analysis may not justify the additional data processing costs

---

# Technical Stack

- **R**: Data preprocessing, EDA, feature engineering, visualization
- **Python**: Machine learning implementation, model validation, statistical testing
- **Libraries**: 
  - scikit-learn, XGBoost, LightGBM, TensorFlow
  - pandas, numpy, matplotlib, seaborn
  - tidyverse, ggplot2, TTR, quantmod
- **Data Sources**: Yahoo Finance, GDELT database
- **Tools**: Jupyter notebooks, RStudio, Git

---

# Repository

📦 **GitHub**: [series_temporales_IBEX](https://github.com/SLopezBegines/series_temporales_IBEX)

*Code, documentation, and analysis notebooks available in the repository*

---

# Future Directions

Potential extensions of this work:
- Alternative sentiment data sources (Twitter, financial news APIs)
- Ensemble methods combining multiple data sources
- Real-time prediction system implementation
- Application to other European markets
- Integration with portfolio optimization strategies

---

[← Back to Projects](/index.html#projects)
