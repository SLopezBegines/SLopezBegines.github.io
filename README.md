# Santiago López Begines - Portfolio

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-success)](https://slopezbegines.github.io)
[![Jekyll](https://img.shields.io/badge/Jekyll-4.3-red)](https://jekyllrb.com/)
[![License](https://img.shields.io/badge/License-All%20Rights%20Reserved-blue)](LICENSE)

Personal portfolio website showcasing my transition from neuroscience research to data science, featuring technical projects, publications, and professional experience.

**🌐 Live Site**: [slopezbegines.github.io](https://slopezbegines.github.io)

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Local Development](#local-development)
- [Bilingual Support](#bilingual-support)
- [Customization](#customization)
- [SEO & Performance](#seo--performance)
- [Projects Showcased](#projects-showcased)
- [Contact](#contact)

---

## 🎯 About

This portfolio website serves as a comprehensive showcase of my professional journey from neuroscience research to data science. It features:

- **15+ years** of neuroscience research experience
- Transition to **data science and machine learning**
- Published research in top-tier journals (Science Advances, EMBO Journal, eLife)
- Technical projects in financial forecasting, biomedical data analysis, and IoT systems

---

## ✨ Features

### Design & UX
- ⚡ **Fast & Lightweight**: Minimal dependencies for optimal performance
- 🎨 **Custom Dark Theme**: Modern, professional aesthetic
- 📱 **Fully Responsive**: Optimized for mobile, tablet, and desktop
- 🚀 **Smooth Animations**: Professional transitions and interactions
- ♿ **Accessible**: WCAG compliant with semantic HTML

### Content
- 🌍 **Bilingual Support**: Complete Spanish (ES) and English (EN) versions
- 📊 **Project Showcases**: Detailed technical documentation for each project
- 📚 **Publication List**: Complete academic publication history with DOI links
- 🔗 **Social Integration**: GitHub, ORCID, LinkedIn, Google Scholar
- 📧 **Contact Form**: Direct communication channel

### Technical
- 🔍 **SEO Optimized**: Meta tags, Open Graph, structured data
- 🗺️ **Sitemap**: Automatic sitemap generation for search engines
- 🤖 **robots.txt**: Proper search engine directives
- 🌐 **Custom Domain Ready**: Easy configuration for custom domains

---

## 🛠️ Technology Stack

- **Jekyll 4.3**: Static site generator
- **Liquid**: Templating engine
- **Custom CSS**: Pure CSS, no frameworks (reduces overhead)
- **Vanilla JavaScript**: No dependencies (lightweight and fast)
- **GitHub Pages**: Free hosting and automatic deployment
- **Google Fonts**: Inter (UI) & JetBrains Mono (code)
- **Font Awesome**: Icon library (CDN)

---

## 📁 Project Structure

```
SLopezBegines.github.io/
│
├── _config.yml              # Jekyll configuration
├── Gemfile                  # Ruby dependencies
├── robots.txt              # Search engine directives
├── sitemap.xml             # Site map for SEO
│
├── _layouts/               # HTML templates
│   ├── default.html        # Base layout with header/footer
│   ├── home.html           # Homepage layout
│   └── project.html        # Individual project layout
│
├── _includes/              # Reusable components
│   ├── header.html         # Navigation bar (bilingual)
│   └── footer.html         # Footer with social links
│
├── _projects/              # Project markdown files
│   ├── ibex35-prediction.md
│   ├── alzheimer-ml.md
│   ├── proteomics.md
│   └── agriot.md
│
├── assets/
│   ├── css/
│   │   └── main.css        # Custom styles (CSS variables)
│   ├── js/
│   │   └── main.js         # Interactions (nav, scroll)
│   └── images/             # Project images and icons
│
├── en/                     # English versions
│   ├── index.md            # English homepage
│   └── publications.md     # English publications
│
├── index.md                # Spanish homepage
└── publications.md         # Spanish publications
```

---

## 🚀 Local Development

### Prerequisites

- Ruby (>= 2.7)
- RubyGems
- GCC and Make

### Installation

```bash
# Clone the repository
git clone https://github.com/SLopezBegines/SLopezBegines.github.io.git
cd SLopezBegines.github.io

# Install dependencies
bundle install

# Run local development server
bundle exec jekyll serve

# View at http://localhost:4000
```

### Development Tips

```bash
# Run with live reload
bundle exec jekyll serve --livereload

# Run with drafts
bundle exec jekyll serve --drafts

# Build production version
bundle exec jekyll build
```

---

## 🌍 Bilingual Support

The site supports both Spanish (default) and English versions:

### URL Structure
- **Spanish**: `/` (homepage), `/publications/`
- **English**: `/en/` (homepage), `/en/publications/`

### Language Switching
- Automatic language detection based on URL path
- Language switcher in header (ES | EN)
- Maintains current page when switching languages

### Adding New Content

1. **Create Spanish version** in root directory
2. **Create English version** in `/en/` directory
3. **Use same `ref` value** in front matter for linking

Example:
```yaml
# Spanish version (root)
---
layout: default
title: Título
lang: es
ref: page-name
permalink: /page-name/
---

# English version (/en/)
---
layout: default
title: Title
lang: en
ref: page-name
permalink: /en/page-name/
---
```

---

## 🎨 Customization

### Colors

Edit CSS variables in `assets/css/main.css`:

```css
:root {
  --color-primary: #3b82f6;      /* Blue - Primary accent */
  --color-accent: #8b5cf6;       /* Purple - Secondary accent */
  --color-bg: #0a0a0a;           /* Dark background */
  --color-bg-secondary: #1a1a1a; /* Card backgrounds */
  --color-text: #e8e8e8;         /* Primary text */
  --color-text-secondary: #a0a0a0; /* Secondary text */
  --color-border: #2a2a2a;       /* Borders */
}
```

### Adding Projects

1. Create new markdown file in `_projects/`:

```markdown
---
layout: project
title: "Project Title"
excerpt: "Brief description for cards"
tags:
  - Python
  - Machine Learning
  - Data Science
---

# Your detailed content here
```

2. Add project card to homepage (`index.md` and `en/index.md`):

```html
<a href="/en/projects/your-project" class="project-card">
    <h3>Project Title</h3>
    <p>Brief description</p>
    <div class="tags">
        <span class="tag">Tag1</span>
    </div>
</a>
```

### Navigation Menu

Edit `_config.yml`:

```yaml
navigation:
  - title_es: Inicio
    title_en: Home
    url: /
  - title_es: Sobre mí
    title_en: About
    url: /#about
  # Add more items...
```

### Social Links

Edit footer in `_includes/footer.html`:

```html
<a href="https://github.com/YourUsername" target="_blank">
    <i class="fab fa-github"></i>
</a>
```

---

## 📈 SEO & Performance

### Performance Optimizations
- ✅ No CSS frameworks (Bootstrap, Tailwind, etc.)
- ✅ Minimal JavaScript (< 5KB)
- ✅ Optimized web fonts (only used weights)
- ✅ Lazy loading for images
- ✅ Minified production builds
- ✅ Fast page loads (< 1s)

### SEO Features
- ✅ Semantic HTML5
- ✅ Meta descriptions
- ✅ Open Graph tags
- ✅ Twitter Card tags
- ✅ Structured data (JSON-LD)
- ✅ XML sitemap
- ✅ robots.txt
- ✅ Canonical URLs

### Testing Performance

```bash
# Check Lighthouse scores
npx lighthouse https://slopezbegines.github.io --view

# Test mobile responsiveness
# Use Chrome DevTools > Toggle device toolbar
```

---

## 🔬 Projects Showcased

### 1. IBEX35 Stock Market Prediction
**Master's Thesis Project**
- Machine learning models for financial forecasting
- Sentiment analysis using GDELT news data
- Comparison of time series vs ML approaches
- **Tech**: Python, TensorFlow, scikit-learn, GDELT API

### 2. Alzheimer's Disease Classification
- Multi-omics data integration
- Machine learning for disease prediction
- Biomarker discovery
- **Tech**: R, Python, Random Forest, SVM

### 3. Proteomics Analysis Pipeline
- High-throughput data processing
- Statistical analysis workflows
- Automated reporting
- **Tech**: R, Bioconductor, ggplot2

### 4. AgriOT System
- IoT system for agricultural monitoring
- ESP32/ESP8266 microcontrollers
- Real-time data visualization
- **Tech**: Arduino, MySQL, WebSockets, 3D printing

---

## 📫 Contact

- **Email**: [santiago.lopez.begines@gmail.com](mailto:santiago.lopez.begines@gmail.com)
- **GitHub**: [@SLopezBegines](https://github.com/SLopezBegines)
- **LinkedIn**: [Santiago López Begines](https://www.linkedin.com/in/santiago-lopez-begines)
- **ORCID**: [0000-0001-8809-8919](https://orcid.org/0000-0001-8809-8919)
- **Google Scholar**: [Profile](https://scholar.google.com/citations?user=YOUR_ID)

---

## 📄 License

© 2026 Santiago López Begines. All rights reserved.

### Usage Rights
- **Website Design & Code**: Proprietary - not for reuse without permission
- **Content & Projects**: All rights reserved
- **Code Examples**: Educational use only with attribution

For collaboration or usage inquiries, please contact via email.

---

## 🙏 Acknowledgments

- Built with [Jekyll](https://jekyllrb.com/)
- Hosted on [GitHub Pages](https://pages.github.com/)
- Fonts from [Google Fonts](https://fonts.google.com/)
- Icons from [Font Awesome](https://fontawesome.com/)

---

## 📊 Repository Stats

![GitHub last commit](https://img.shields.io/github/last-commit/SLopezBegines/SLopezBegines.github.io)
![GitHub repo size](https://img.shields.io/github/repo-size/SLopezBegines/SLopezBegines.github.io)
![GitHub language count](https://img.shields.io/github/languages/count/SLopezBegines/SLopezBegines.github.io)

---

**⭐ If you found this portfolio helpful, consider giving it a star!**
