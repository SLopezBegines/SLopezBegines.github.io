---
blog_post: 2026-07-01-ebayes-vs-anova-proteomics.md
title: "Why a Plain ANOVA Isn't Enough for Proteomics"
date_posted:
status: draft  # draft | posted
---

"ANOVA vs. limma" is the wrong framing — they're the same linear model. The real difference is how the residual variance is estimated: from 4 replicates alone, or moderated with information borrowed across every other protein tested in the same run.

I ran both, protein by protein, on the same CTRL/KO/WT dataset used throughout this series: 199 vs. 305 significant proteins at BH < 0.05, and the shift isn't just "more hits" — it's specifically the proteins whose own variance estimate was too noisy to trust in isolation.

[Read the post](https://SLopezBegines.github.io/blog/ebayes-vs-anova-proteomics/)

#Proteomics #Bioinformatics #RStats #limma #EmpiricalBayes
