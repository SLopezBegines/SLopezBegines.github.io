---
blog_post: 2026-05-07-missing-data-imputation-lfq-proteomics.md
title: "Missing Data Imputation in LFQ Proteomics: A Mixed Strategy Approach"
date_posted:
status: posted
---

Most people impute missing values in LFQ proteomics with a single method. That's wrong — and it inflates your false positive rate downstream.

The fix is to classify each protein per condition as MNAR or MAR and apply a left-censored truncated normal vs. k-NN accordingly. I wrote up the full mixed-strategy implementation in R, including the QC diagnostic that tells you whether your chosen method is distorting variance.

[Read the post](https://SLopezBegines.github.io/blog/missing-data-imputation-lfq-proteomics/)

#Proteomics #Bioinformatics #RStats #MissingData
