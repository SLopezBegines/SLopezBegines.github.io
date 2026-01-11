---
layout: home
---

<!-- Hero Section -->
<section class="hero">
    <div class="container">
        <div class="hero-content fade-in-up">
            <img src="{{ site.author.avatar }}" alt="{{ site.author.name }}" class="hero-avatar">
            <p class="hero-subtitle">{{ site.author.bio }}</p>
            <h1>{{ site.author.name }}</h1>
            <p class="hero-description">
                {{ site.author.tagline }}
            </p>
            <div class="hero-cta">
                <a href="#projects" class="btn btn-primary">View Projects</a>
                <a href="assets/cv/CV_Santiago_Lopez_Begines.pdf" class="btn btn-outline" download>
                    <i class="fas fa-download"></i> Download CV </a>
                <a href="#contact" class="btn btn-outline">Get in Touch</a>
            </div>
        </div>
    </div>
</section>

<!-- About Section -->
<section id="about">
    <div class="container">
        <h2 class="section-title">About Me</h2>
        <div class="about-content">
            <div class="about-text">
                <h3>Background</h3>
                <p>
                    Neuroscientist with over 15 years of expertise in neurodegeneration research, biomarker discovery, and advanced data analysis. Currently working as <strong>Postdoctoral Researcher at University of Cádiz</strong>.
                </p>
                <p>
                  I am now a Data Scientist after completing an MSc in Big Data and Data Science in 2025, which helped me transition into data science and omics data analysis. I have proven proficiency in Python and R for curating, validating, and analyzing large scientific datasets (proteomics, clinical, and transcriptomics). I am skilled in developing automated pipelines and reproducible analytical workflows, collaborating across multidisciplinary teams, and communicating technical insights effectively. I am experienced in managing research projects and mentoring researchers.
                </p>
                
                <h3>Key Achievements</h3>
                <ul>
                    <li>Successfully deployed ML models to identify differentially expressed proteins in Batten disease models</li>
                    <li>Engineered custom omics data analysis pipelines for neurodegenerative research</li>
                    <li>Developed comprehensive ML pipeline for IBEX35 stock market prediction</li>
                    <li>Co-authored publications in Science Advances, EMBO Journal, and eLife</li>
                    <li>Supervised PhD students and taught 100+ hours at University of Seville</li>
                </ul>
            </div>
            
            <div class="skills-grid">
                {% for skill in site.skills %}
                <div class="skill-item">
                    <div class="skill-name">
                        <span>{{ skill.name }}</span>
                        <span>{{ skill.level }}%</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-progress" data-level="{{ skill.level }}" style="width: 0%"></div>
                    </div>
                </div>
                {% endfor %}
            </div>
        </div>
    </div>
</section>

<!-- Projects Section -->
<section id="projects">
    <div class="container">
        <h2 class="section-title">Featured Projects</h2>
        
        <div class="projects-grid">
            <!-- IBEX35 Project -->
            <div class="project-card">
                <h3>IBEX35 Stock Market Prediction</h3>
                <p>
                    Machine learning models for predicting Spanish stock market movements using financial indicators and sentiment analysis from GDELT news data. Master's thesis with rigorous statistical validation.
                </p>
                <div class="project-tags">
                    <span class="tag">Machine Learning</span>
                    <span class="tag">Python</span>
                    <span class="tag">R</span>
                    <span class="tag">Financial Markets</span>
                </div>
                <a href="/projects/ibex35-prediction" class="project-link">
                    View Project <i class="fas fa-arrow-right"></i>
                </a>
            </div>
            
            <!-- Alzheimer Project -->
            <div class="project-card">
                <h3>Alzheimer's Disease Prediction</h3>
                <p>
                    Multimodal machine learning approach combining clinical data and PET imaging for early AD detection using the A4 Study dataset.
                </p>
                <div class="project-tags">
                    <span class="tag">Deep Learning</span>
                    <span class="tag">Medical Imaging</span>
                    <span class="tag">Python</span>
                    <span class="tag">R</span>
                </div>
                <a href="/projects/alzheimer-ml" class="project-link">
                    View Project <i class="fas fa-arrow-right"></i>
                </a>
            </div>
            
            <!-- Proteomics Project -->
            <div class="project-card">
                <h3>Proteomics Analysis Pipeline</h3>
                <p>
                    High-throughput proteomic data analysis from mass spectrometry for neurodegenerative disease research. Automated workflow for biomarker discovery.
                </p>
                <div class="project-tags">
                    <span class="tag">Bioinformatics</span>
                    <span class="tag">R</span>
                    <span class="tag">Proteomics</span>
                </div>
                <a href="/projects/proteomics" class="project-link">
                    View Project <i class="fas fa-arrow-right"></i>
                </a>
            </div>
            
            <!-- AgrIoT Project -->
            <div class="project-card">
                <h3>AgrIoT Smart Control</h3>
                <p>
                    ESP32-based IoT system for agricultural automation with web interface, sensor monitoring, and remote control capabilities.
                </p>
                <div class="project-tags">
                    <span class="tag">IoT</span>
                    <span class="tag">ESP32</span>
                    <span class="tag">Web Development</span>
                </div>
                <a href="/projects/agriot" class="project-link">
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

<!-- Contact Section -->
<section id="contact">
    <div class="container">
        <h2 class="section-title">Get In Touch</h2>
        <div class="contact-content">
            <p style="font-size: 1.15rem;">
                Interested in collaboration or want to learn more about my work?<br>
                Feel free to reach out through any of these channels.
            </p>
            
            <div class="contact-links">
                <a href="mailto:{{ site.email }}" class="contact-link">
                    <i class="fas fa-envelope"></i>
                    <span>Email</span>
                </a>
                <a href="{{ site.social.github }}" class="contact-link" target="_blank">
                    <i class="fab fa-github"></i>
                    <span>GitHub</span>
                </a>
                <a href="{{ site.social.linkedin }}" class="contact-link" target="_blank">
                    <i class="fab fa-linkedin"></i>
                    <span>LinkedIn</span>
                </a>
                <a href="{{ site.social.orcid }}" class="contact-link" target="_blank">
                    <i class="fab fa-orcid"></i>
                    <span>ORCID</span>
                </a>
            </div>
        </div>
    </div>
</section>
