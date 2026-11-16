---
blog_post: 2026-05-28-lfq-proteomics-pipeline-raw-to-report.md
title: "From MaxQuant to Results: How I Structure an LFQ Proteomics Pipeline in R"
date_posted:
status: draft  # draft | posted
---

MaxQuant finished overnight. You open proteinGroups.txt. 220+ columns stare back at you.

I built a modular R pipeline to stop making the same decisions on every new dataset — normalisation, mixed imputation, limma/eBayes, volcano plots — with the experiment design as the only block you edit per experiment. The post also covers the p-value trap that most DEP users fall into: fdrtool is pathologically conservative on eBayes-moderated statistics. You lose real hits, not because the biology isn't there, but because of how the two methods interact.

[Read the post](https://SLopezBegines.github.io/blog/lfq-proteomics-pipeline-raw-to-report/)

#Proteomics #Bioinformatics #RStats #LFQ #MaxQuant #limma
