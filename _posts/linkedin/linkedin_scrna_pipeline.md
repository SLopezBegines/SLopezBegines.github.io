---
blog_post: "2026-06-01-scrna-seq-pipeline-cellranger-to-annotation"
title: "LinkedIn — snRNA-seq pipeline post"
status: draft
date_posted: 
---

CellRanger done. 50k cells. 24 samples. 4 brain regions. Now what?

I built a production pipeline for exactly this: from CellBender .h5 files → doublet detection per-sample (not post-integration—that's the gotcha most tutorials skip) → integration → clustering → annotated cell types.

Open-source at https://github.com/SLopezBegines/snRNAseq_mouse

Code runs on 16 GB RAM. Details in the new blog post: https://slopezbegines.github.io/blog/2026-06-01-scrna-seq-pipeline-cellranger-to-annotation

#snRNAseq #Seurat #bioinformatics #singlecell #R #reproduciblescience
