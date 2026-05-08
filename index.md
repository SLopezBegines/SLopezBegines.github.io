---
layout: home
title: "Biomedical Data Science Consulting"
excerpt: "Neuroscientist and Data Scientist offering consulting in electrophysiology pipelines, omics data analysis, and biomarker discovery for neurotech and biomedical teams."
---

<!-- Hero Section -->
<section class="hero">
    <div class="container">
        <div class="hero-content fade-in-up">
            <img src="{{ site.author.avatar }}" alt="{{ site.author.name }}" class="hero-avatar">
            <h1>Biomedical Data Science Consulting</h1>
            <p class="hero-description">
                I help neurotech and biomedical teams build reliable, reproducible analysis pipelines.
            </p>
            <p class="hero-tagline">
                15+ years experimental neuroscience &nbsp;·&nbsp; Production-grade R &amp; Python
            </p>
            <div class="hero-cta">
                <a href="mailto:santiago.lopez.begines@gmail.com" class="btn btn-primary">
                    Let's talk &rarr; santiago.lopez.begines@gmail.com
                </a>
                <a href="/assets/cv/CV_Santiago_Lopez_Begines.pdf" class="btn btn-outline" download>
                    <i class="fas fa-download"></i> Download CV
                </a>
            </div>
        </div>
    </div>
</section>

<!-- About Section -->
<section id="about">
    <div class="container">
        <h2 class="section-title">About</h2>
        <div class="about-content">
            <div class="about-text">
                <p>
                    Neuroscientist and Data Scientist with 15+ years in biomedical research and 4–5 years
                    specializing in machine learning, multi-omics analysis, and production data pipelines.
                </p>
                <p>
                    First author in <strong>Science Advances</strong> (2025); co-authored 8+ publications in
                    EMBO Journal, eLife, and Cell Death &amp; Disease.
                </p>
                <p>
                    Unique hybrid profile: deep experimental background in whole-cell patch-clamp
                    electrophysiology, proteomics, and transgenic mouse models — combined with
                    production-level data science in Python and R.
                </p>

                <h3>Key Results</h3>
                <ul>
                    <li>90% reduction in electrophysiology processing time via automated pipeline (IBiS, Seville)</li>
                    <li>70% reduction in omics data cleaning time via automated R scripts (LCSB, University of Luxembourg)</li>
                    <li>ML-based biomarker discovery in neurodegeneration (Batten disease / CLN4)</li>
                    <p style="margin-top: 1.5rem;">
                    <a href="/publications" style="color: var(--color-primary);">→ View full publication list</a>
                </p>
                </ul>

                <p style="margin-top: 1.5rem;">
                    Proficient in <strong>Python</strong> (scikit-learn, XGBoost, LightGBM, TensorFlow) and
                    <strong>R</strong> (tidyverse, tidymodels, Seurat, Shiny) for automated pipelines,
                    statistical modeling, and data visualization on large-scale proteomics, transcriptomics,
                    and electrophysiological datasets.
                </p>
            </div>
        </div>
    </div>
</section>

<!-- Services Section -->
<section id="services">
    <div class="container">
        <h2 class="section-title">Services</h2>

        <div class="services-grid">

            <!-- Card A -->
            <div class="service-card">
                <h3>Electrophysiology &amp; Signal Analysis Pipelines</h3>
                <p class="service-intro">
                    For neurotech teams working with patch-clamp, EEG, or multi-electrode array data who need
                    to move from raw recordings to reproducible, documented outputs.
                </p>
                <ul>
                  <p style="margin-top: 1rem; font-size: 0.95rem;">
                    <a href="/projects/ephys-pipeline" style="color: var(--color-primary);">→ See our automated electrophysiology pipeline</a>
                    </p>
                    <li>Automated/Semi-automated data processing pipelines (HEKA / pCLAMP / Python / R)</li>
                    <li>Quality control and artifact rejection frameworks</li>
                    <li>Statistical analysis: FI curves, input resistance, E/I balance, resting membrane potential</li>
                    <li>Full documentation and reproducibility standards</li>
                </ul>
                <p class="service-deliverable">Deliverable: functional pipeline + technical documentation</p>
            </div>

            <!-- Card B -->
            <div class="service-card">
                <h3>Biomedical Data Pipeline Design &amp; Audit</h3>
                <p class="service-intro">
                    For MedTech and Pharma SMEs that need to validate or audit existing analysis pipelines
                    for regulatory submissions or internal quality standards.
                </p>
                <ul>
                    <li>Pipeline code review and statistical validation</li>
                    <li>Reproducibility assessment and gap analysis</li>
                    <li>SOP documentation for reproducible analytical workflows</li>
                    <li>Recommendations report with prioritized action items</li>
                </ul>
                <p class="service-deliverable">Deliverable: written audit report + remediation roadmap</p>
            </div>

            <!-- Card C -->
            <div class="service-card">
                <h3>Omics Data Analysis</h3>
                <p class="service-intro">
                    For biomedical research teams and CROs working with proteomics, transcriptomics,
                    or multi-omics datasets.
                </p>
                <ul>
                <p style="margin-top: 1rem; font-size: 0.95rem;">
                    <a href="/projects/proteomics" style="color: var(--color-primary);">→ Proteomics pipeline</a> | 
                    <a href="/projects/single-cell" style="color: var(--color-primary);">→ scRNA-seq pipeline</a>
                </p>
                    <li>Label-free proteomics: MaxQuant &rarr; differential expression &rarr; biological interpretation</li>
                    <li>scRNA-seq analysis (Seurat): clustering, cell type annotation, trajectory analysis</li>
                    <li>ML-based biomarker discovery: feature selection, cross-validation, model validation</li>
                </ul>
                <p class="service-deliverable">Deliverable: analysis report + reproducible R/Python scripts</p>
            </div>

        </div>
    </div>
</section>

<!-- Projects Section -->
<section id="projects">
    <div class="container">
        <h2 class="section-title">Projects</h2>

        <div class="projects-grid">

            <!-- Proteomics -->
            <div class="project-card">
                <h3>Automated Proteomics Pipeline for Neurodegeneration Biomarker Discovery</h3>
                <p>
                    Built an automated R pipeline for MaxQuant LFQ output covering data cleaning,
                    normalization, differential expression, and ML-based biomarker discovery.
                    <strong>70% reduction in data cleaning time</strong> — deployed at LCSB, University of Luxembourg.
                </p>
                <div class="project-tags">
                    <span class="tag">Proteomics</span>
                    <span class="tag">R</span>
                    <span class="tag">MaxQuant</span>
                    <span class="tag">Biomarker Discovery</span>
                    <span class="tag">Neurodegeneration</span>
                </div>
                <a href="/projects/proteomics" class="project-link">
                    View Project <i class="fas fa-arrow-right"></i>
                </a>
            </div>

            <!-- Electrophysiology Pipeline -->
            <div class="project-card">
                <span class="badge-wip">Work in Progress</span>
                <h3>Automated Electrophysiology Analysis Pipeline for Synaptic Data</h3>
                <p>
                    Developing an automated pipeline for whole-cell patch-clamp data
                    (mIPSCs, mEPSCs, FI curves) integrating miniML deep learning event detection.
                    R modules complete — Python/miniML integration in development.
                </p>
                <div class="project-tags">
                    <span class="tag">Electrophysiology</span>
                    <span class="tag">Python</span>
                    <span class="tag">R</span>
                    <span class="tag">Patch-Clamp</span>
                    <span class="tag">Neurotech</span>
                </div>
                <a href="/projects/ephys-pipeline" class="project-link">
                    View Project <i class="fas fa-arrow-right"></i>
                </a>
            </div>

            <!-- snRNA-seq -->
            <div class="project-card">
                <h3>snRNA-seq Analysis Pipeline</h3>
                <p>
                    Modular R pipeline for single-nucleus RNA-seq: from 10X CellRanger output to
                    SCTransform normalisation, Louvain clustering, differential expression,
                    and multi-layered functional enrichment (GO, KEGG, STRING, PANTHER).
                </p>
                <div class="project-tags">
                    <span class="tag">scRNA-seq</span>
                    <span class="tag">Seurat</span>
                    <span class="tag">R</span>
                    <span class="tag">Bioinformatics</span>
                </div>
                <a href="/projects/single-cell" class="project-link">
                    View Project <i class="fas fa-arrow-right"></i>
                </a>
            </div>

            <!-- IBEX35 -->
            <div class="project-card">
                <h3>ML Pipeline for Financial Time-Series: Rigorous Validation Framework</h3>
                <p>
                    A case study in avoiding false discovery in predictive modeling. Only 27% of models
                    showed genuine predictive value across 336 model/horizon combinations
                    (McNemar, Diebold-Mariano, bootstrap CIs). Documented negative result — reproducible pipeline.
                </p>
                <div class="project-tags">
                    <span class="tag">Machine Learning</span>
                    <span class="tag">Time Series</span>
                    <span class="tag">Python</span>
                    <span class="tag">R</span>
                    <span class="tag">Validation</span>
                </div>
                <a href="/projects/ibex35-prediction" class="project-link">
                    View Project <i class="fas fa-arrow-right"></i>
                </a>
            </div>

        </div>

        <div style="text-align: center; margin-top: 3rem;">
            <a href="{{ site.social.github }}" class="btn btn-outline" target="_blank">
                <i class="fab fa-github"></i> View All on GitHub
            </a>
        </div>
    </div>
</section>

<!-- Other Projects -->
<section class="other-projects">
    <div class="container">
        <h2>Other Projects</h2>
        <div class="projects-grid">
            <div class="project-card">
                <h3>Legacy System Modernization: Remote Monitoring for a 1972 Diesel Engine</h3>
                <p>
                    Custom LoRa wireless system enabling remote start/stop and real-time telemetry
                    (voltage, oil pressure, RPM, fuel) of a 50-year-old irrigation engine from 2+ km away.
                    <strong>86% reduction in site visits</strong> — 99.2% uptime over 6 months. Total cost: &lt;€150.
                </p>
                <div class="project-tags">
                    <span class="tag">Embedded Systems</span>
                    <span class="tag">IoT</span>
                    <span class="tag">LoRa</span>
                    <span class="tag">PCB Design</span>
                    <span class="tag">C/C++</span>
                </div>
                <a href="/projects/agriot" class="project-link">
                    View Project <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </div>
    </div>
</section>

<!-- Contact Section -->
<section id="contact">
    <div class="container">
        <h2 class="section-title">Let's build together</h2>
        <div class="contact-content">
            <p class="contact-subtitle">
                Available for colaborating projects in neurotech, MedTech, and biomedical data science.
            </p>

            <form action="https://formspree.io/f/xnjgpjov" method="POST" class="contact-form">
                <input type="text" name="name" placeholder="Name" required>
                <input type="email" name="email" placeholder="Email" required>
                <textarea name="message" placeholder="Message" required></textarea>
                <button type="submit">Send message</button>
            </form>

            <div class="contact-info">
                <a href="mailto:santiago.lopez.begines@gmail.com">
                    <i class="fas fa-envelope"></i> santiago.lopez.begines@gmail.com
                </a>
                <a href="https://linkedin.com/in/santibegines" target="_blank" rel="noopener">
                    <i class="fab fa-linkedin"></i> linkedin.com/in/santibegines
                </a>
                <a href="https://github.com/SLopezBegines" target="_blank" rel="noopener">
                    <i class="fab fa-github"></i> github.com/SLopezBegines
                </a>
                <a href="https://orcid.org/0000-0001-8809-8919" target="_blank" rel="noopener">
                    <i class="fab fa-orcid"></i> orcid.org/0000-0001-8809-8919
                </a>
            </div>
        </div>
    </div>
</section>
