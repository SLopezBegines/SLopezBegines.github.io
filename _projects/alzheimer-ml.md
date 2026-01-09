---
layout: project
title: "Alzheimer's Disease Prediction using A4 Study Data"
excerpt: "Multimodal machine learning approach combining clinical data and PET imaging for early AD detection"
tags:
  - Machine Learning
  - Medical Imaging
  - Deep Learning
  - Alzheimer's Disease
  - Multimodal Analysis
  - R
  - Python
---

# Project Overview

This project applies machine learning to the **A4 Study** (Anti-Amyloid Treatment in Asymptomatic Alzheimer's Disease) dataset to develop predictive models for Alzheimer's disease progression. The analysis combines tabular clinical data with PET neuroimaging in a multimodal approach.

## Research Goals

1. **Tabular Data Analysis**: Predict AD probability from clinical and cognitive assessments
2. **PET Image Analysis**: Classify amyloid and tau deposits using deep learning
3. **Multimodal Integration**: Combine both data sources for improved prediction accuracy

## Dataset Information

**Source**: [A4 Study Data Repository](https://discover.a4studydata.org/)

**Reference**: Sperling, R.A., et al. (2020). *The A4 Study: Anti-Amyloid Treatment in Asymptomatic Alzheimer's Disease*. JAMA Neurology. DOI: 10.1001/jamaneurol.2020.0387

**Data Types**:
- Clinical assessments and cognitive tests
- Demographics and medical history  
- PET imaging (amyloid and tau)
- Longitudinal follow-up data

---

# Methodology

## Part 1: Tabular Data Analysis (R)

### Exploratory Data Analysis
- Data quality assessment and missing value analysis
- Outlier detection using statistical methods
- Feature distribution analysis and transformations
- Correlation analysis between clinical variables

### Feature Engineering
- Creation of composite cognitive scores
- Temporal features from longitudinal data
- Interaction terms between key biomarkers
- Age-normalized cognitive measures

### Machine Learning Models
- **tidymodels**: Workflow-based model development
- **H2O.ai**: Automated machine learning for comparison
- Models: Logistic Regression, Random Forest, XGBoost, Neural Networks

```r
# Example: tidymodels workflow
library(tidymodels)
library(themis)

# Data preprocessing recipe
ad_recipe <- recipe(AD_status ~ ., data = train_data) %>%
  # Handle missing values
  step_impute_knn(all_predictors(), neighbors = 5) %>%
  # Remove near-zero variance features
  step_nzv(all_predictors()) %>%
  # Normalize numeric features
  step_normalize(all_numeric_predictors()) %>%
  # Handle class imbalance
  step_smote(AD_status)

# Model specification
rf_spec <- rand_forest(
  mtry = tune(),
  trees = tune(),
  min_n = tune()
) %>%
  set_engine("ranger", importance = "impurity") %>%
  set_mode("classification")

# Create workflow
ad_workflow <- workflow() %>%
  add_recipe(ad_recipe) %>%
  add_model(rf_spec)

# Hyperparameter tuning
rf_tuned <- tune_grid(
  ad_workflow,
  resamples = vfold_cv(train_data, v = 5),
  grid = 20,
  metrics = metric_set(roc_auc, accuracy, sensitivity, specificity)
)
```

## Part 2: PET Image Analysis (Python)

### Image Preprocessing
- DICOM file handling and standardization
- Skull stripping and brain extraction
- Registration to standard space (MNI)
- Intensity normalization

### Deep Learning Architecture
- **Convolutional Neural Networks** for image classification
- Transfer learning from pre-trained models
- 3D convolutions for volumetric data
- Attention mechanisms for region importance

```python
# Example: CNN for PET image classification
import tensorflow as tf
from tensorflow.keras import layers, models

def create_3d_cnn(input_shape=(128, 128, 128, 1), num_classes=2):
    """
    3D CNN for PET image classification
    """
    inputs = layers.Input(shape=input_shape)
    
    # Convolutional blocks
    x = layers.Conv3D(32, (3, 3, 3), activation='relu', padding='same')(inputs)
    x = layers.MaxPooling3D((2, 2, 2))(x)
    x = layers.BatchNormalization()(x)
    
    x = layers.Conv3D(64, (3, 3, 3), activation='relu', padding='same')(x)
    x = layers.MaxPooling3D((2, 2, 2))(x)
    x = layers.BatchNormalization()(x)
    
    x = layers.Conv3D(128, (3, 3, 3), activation='relu', padding='same')(x)
    x = layers.MaxPooling3D((2, 2, 2))(x)
    x = layers.BatchNormalization()(x)
    
    # Attention mechanism
    attention = layers.GlobalAveragePooling3D()(x)
    attention = layers.Dense(128, activation='relu')(attention)
    attention = layers.Dense(128, activation='sigmoid')(attention)
    attention = layers.Reshape((1, 1, 1, 128))(attention)
    x = layers.multiply([x, attention])
    
    # Classification head
    x = layers.GlobalAveragePooling3D()(x)
    x = layers.Dropout(0.5)(x)
    x = layers.Dense(256, activation='relu')(x)
    x = layers.Dropout(0.3)(x)
    outputs = layers.Dense(num_classes, activation='softmax')(x)
    
    model = models.Model(inputs=inputs, outputs=outputs)
    return model

# Compile model
model = create_3d_cnn()
model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=0.001),
    loss='categorical_crossentropy',
    metrics=['accuracy', tf.keras.metrics.AUC(name='auc')]
)
```

### Image-Specific Features
- Regional amyloid burden quantification
- Tau distribution patterns
- Volumetric measurements
- SUVr (Standardized Uptake Value ratio) calculations

## Part 3: Multimodal Integration

### Fusion Strategies
1. **Early Fusion**: Concatenate features before final classification
2. **Late Fusion**: Combine predictions from separate models
3. **Intermediate Fusion**: Merge at hidden layer level

```python
# Example: Multimodal CNN architecture
class MultimodalADModel(tf.keras.Model):
    def __init__(self, image_shape, tabular_features):
        super().__init__()
        
        # Image processing branch
        self.cnn_branch = create_3d_cnn(image_shape, num_classes=128)
        self.cnn_branch.trainable = True
        
        # Tabular data branch
        self.tabular_branch = tf.keras.Sequential([
            layers.Dense(128, activation='relu'),
            layers.Dropout(0.3),
            layers.Dense(64, activation='relu'),
            layers.Dropout(0.2)
        ])
        
        # Fusion layers
        self.fusion = tf.keras.Sequential([
            layers.Dense(128, activation='relu'),
            layers.Dropout(0.3),
            layers.Dense(64, activation='relu'),
            layers.Dense(2, activation='softmax')
        ])
    
    def call(self, inputs):
        image_input, tabular_input = inputs
        
        # Process each modality
        image_features = self.cnn_branch(image_input)
        tabular_features = self.tabular_branch(tabular_input)
        
        # Concatenate features
        combined = tf.concat([image_features, tabular_features], axis=1)
        
        # Final prediction
        output = self.fusion(combined)
        return output
```

---

# Expected Outcomes

## Clinical Implications
- **Early Detection**: Identify at-risk individuals before symptom onset
- **Personalized Risk Assessment**: Combine multiple biomarkers for individual predictions
- **Treatment Planning**: Support clinical decision-making for intervention timing

## Technical Contributions
- Reproducible pipeline for multimodal AD analysis
- Benchmarking of different fusion strategies
- Feature importance analysis across modalities
- Validation of model interpretability for clinical use

---

# Technical Stack

**R Environment**:
- tidyverse, tidymodels for structured workflow
- Seurat for single-cell analysis (if applicable)
- ggplot2, plotly for interactive visualizations
- H2O.ai for automated ML comparison

**Python Environment**:
- TensorFlow/Keras for deep learning
- scikit-learn for classical ML
- nibabel for neuroimaging data
- numpy, pandas for data manipulation
- matplotlib, seaborn for visualization

**Neuroimaging Tools**:
- FSL (FMRIB Software Library)
- ANTs (Advanced Normalization Tools)
- SPM (Statistical Parametric Mapping)

---

# Current Status

🚧 **Project Status**: In Development

- ✅ Data acquisition and preprocessing
- ✅ EDA and feature engineering (tabular data)
- 🔄 Model development (tabular + imaging)
- ⏳ Multimodal fusion implementation
- ⏳ Validation and testing

---

# Repository

📦 **GitHub**: [AD_ML_A4_study](https://github.com/SLopezBegines/AD_ML_A4_study)

---

# Related Publications

This work builds on extensive research experience in neurodegenerative diseases:

- **López Begines, S.** et al. (2025). Mutations in DNAJC5 causing Kufs disease in humans induce lipofuscinosis in mice. *Science Advances*. DOI: 10.1126/sciadv.ads3393

- **López-Begines, S.** et al. (2024). Handshaking for ultrafast endocytosis. *EMBO Journal*.

---

# References

Sperling, R.A., et al. (2020). The A4 Study: Stopping AD before symptoms begin? *Science Translational Medicine*, 8(362), 362fs13.

---

[← Back to Projects](/index.html#projects)
