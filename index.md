---
layout: home
lang: es
ref: home
title: "Santiago López Begines - Data Scientist & Neurocientífico"
excerpt: "Neurocientífico con 15+ años de experiencia especializado en Machine Learning e Investigación Biomédica. PhD en Biomedicina."
---

<!-- Hero Section -->
<section class="hero">
    <div class="container">
        <div class="hero-content fade-in-up">
            <img src="{{ site.author.avatar }}" alt="{{ site.author.name }}" class="hero-avatar">
            <p class="hero-subtitle">{{ site.t.es.hero_subtitle }}</p>
            <h1>{{ site.t.es.hero_title }}</h1>
            <p class="hero-description">
                {{ site.t.es.hero_tagline }}
            </p>
            <div class="hero-cta">
                <a href="#projects" class="btn btn-primary">{{ site.t.es.hero_cta_projects }}</a>
                <a href="/assets/cv/CV_Santiago_Lopez_Begines.pdf" class="btn btn-outline" download>
                    <i class="fas fa-download"></i> Descargar CV
                </a>
            </div>
        </div>
    </div>
</section>

<!-- About Section -->
<section id="about">
    <div class="container">
        <h2 class="section-title">{{ site.t.es.about_title }}</h2>
        <div class="about-content">
            <div class="about-text">
                <h3>{{ site.t.es.about_background }}</h3>
                <p>
                    Neurocientífico con más de 15 años de experiencia en investigación de neurodegeneración, descubrimiento de biomarcadores y análisis avanzado de datos. Actualmente trabajo como <strong>Investigador Postdoctoral en la Universidad de Cádiz</strong>.
                </p>
                <p>
                    Reconvertido en científico de datos tras completar un <strong>Máster en Big Data y Ciencia de Datos (UNED, 2025)</strong>.
                    Aprovecho el machine learning junto con Python y R para interrogar conjuntos de datos complejos—desde proteómica y transcriptómica hasta datos clínicos y financieros—para generar insights accionables.
                    Competencia demostrada en Python y R para la curación, validación y análisis de grandes conjuntos de datos científicos (proteómica, clínica, transcriptómica). Experto en el desarrollo de procesos automatizados y
                    flujos de trabajo analíticos reproducibles, la colaboración entre equipos multidisciplinares y la
                    comunicación eficaz de conocimientos técnicos. Experiencia en la gestión de proyectos de investigación
                    y la tutoría de investigadores.
                </p>
                
                <h3>{{ site.t.es.about_achievements }}</h3>
                <ul>
                    <li>Implementación exitosa de modelos de ML para identificar proteínas expresadas diferencialmente en modelos de enfermedad de Batten</li>
                    <li>Desarrollo de pipelines personalizados para análisis de datos ómicos en investigación neurodegenerativa</li>
                    <li>Desarrollo de pipeline integral de ML para predicción del mercado bursátil IBEX35</li>
                    <li>Coautor de publicaciones en Science Advances, EMBO Journal y eLife</li>
                    <li>Supervisión de estudiantes de doctorado y 100+ horas de docencia en la Universidad de Sevilla</li>
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
        <h2 class="section-title">{{ site.t.es.projects_title }}</h2>
        
        <div class="projects-grid">
            <!-- IBEX35 Project -->
            <div class="project-card">
                <h3>Predicción del Mercado IBEX35</h3>
                <p>
                    Modelos de machine learning para predecir movimientos del mercado bursátil español usando indicadores financieros y análisis de sentimiento de noticias GDELT. Tesis de Máster con validación estadística rigurosa.
                </p>
                <div class="project-tags">
                    <span class="tag">Machine Learning</span>
                    <span class="tag">Python</span>
                    <span class="tag">R</span>
                    <span class="tag">Mercados Financieros</span>
                </div>
                <a href="/projects/ibex35-prediction" class="project-link">
                    Ver Proyecto <i class="fas fa-arrow-right"></i>
                </a>
            </div>
            
            <!-- Alzheimer Project -->
            <div class="project-card">
                <h3>Predicción de Enfermedad de Alzheimer</h3>
                <p>
                    Enfoque multimodal de machine learning combinando datos clínicos e imágenes PET para detección temprana de EA usando el dataset del estudio A4.
                </p>
                <div class="project-tags">
                    <span class="tag">Deep Learning</span>
                    <span class="tag">Imagen Médica</span>
                    <span class="tag">Python</span>
                    <span class="tag">R</span>
                </div>
                <a href="/projects/alzheimer-ml" class="project-link">
                    Ver Proyecto <i class="fas fa-arrow-right"></i>
                </a>
            </div>
            
            <!-- Proteomics Project -->
            <div class="project-card">
                <h3>Pipeline de Análisis Proteómico</h3>
                <p>
                    Análisis de datos proteómicos de alto rendimiento mediante espectrometría de masas para investigación en enfermedades neurodegenerativas. Workflow automatizado para descubrimiento de biomarcadores.
                </p>
                <div class="project-tags">
                    <span class="tag">Bioinformática</span>
                    <span class="tag">R</span>
                    <span class="tag">Proteómica</span>
                </div>
                <a href="/projects/proteomics" class="project-link">
                    Ver Proyecto <i class="fas fa-arrow-right"></i>
                </a>
            </div>
            
            <!-- AgrIoT Project -->
            <div class="project-card">
                <h3>AgrIoT Control Inteligente</h3>
                <p>
                    Sistema IoT basado en ESP32 para automatización agrícola con interfaz web, monitorización de sensores y capacidades de control remoto.
                </p>
                <div class="project-tags">
                    <span class="tag">IoT</span>
                    <span class="tag">ESP32</span>
                    <span class="tag">Desarrollo Web</span>
                </div>
                <a href="/projects/agriot" class="project-link">
                    Ver Proyecto <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </div>
        
        <div style="text-align: center; margin-top: 3rem;">
            <a href="{{ site.social.github }}" class="btn btn-outline" target="_blank">
                <i class="fab fa-github"></i> {{ site.t.es.projects_view_all }}
            </a>
        </div>
    </div>
</section>

<!-- Contact Section -->
<section id="contact">
    <div class="container">
        <h2 class="section-title">{{ site.t.es.contact_title }}</h2>
        <div class="contact-content">
            <p style="font-size: 1.15rem;">
                {{ site.t.es.contact_description }}
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
