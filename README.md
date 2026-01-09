# Santiago López Begines - Portfolio

Personal portfolio website showcasing data science and neuroscience research projects.

**Live Site**: https://SLopezBegines.github.io

## About

Minimalist portfolio built with Jekyll, featuring a custom dark theme optimized for technical content and project showcases.

## Features

- ⚡ Fast, lightweight design
- 🎨 Custom dark theme with modern aesthetics
- 📱 Fully responsive (mobile, tablet, desktop)
- 🚀 Smooth animations and transitions
- 📊 Project showcases with detailed technical documentation
- 📚 Complete publication list
- 🔗 Social links (GitHub, ORCID, LinkedIn)

## Local Development

```bash
# Clone repository
git clone https://github.com/SLopezBegines/SLopezBegines.github.io.git
cd SLopezBegines.github.io

# Install dependencies
bundle install

# Run local server
bundle exec jekyll serve

# View at http://localhost:4000
```

## Project Structure

```
.
├── _config.yml           # Site configuration
├── _layouts/            # HTML templates
│   ├── default.html     # Base layout
│   ├── home.html        # Homepage layout
│   └── project.html     # Project pages layout
├── _includes/           # Reusable components
│   ├── header.html      # Navigation
│   └── footer.html      # Footer
├── _projects/           # Project pages
│   ├── ibex35-prediction.md
│   ├── alzheimer-ml.md
│   ├── proteomics.md
│   └── agriot.md
├── assets/
│   ├── css/main.css     # Custom styles
│   ├── js/main.js       # JavaScript
│   └── images/          # Images
├── index.md             # Homepage
└── publications.md      # Publications page
```

## Technologies

- **Jekyll 4.3**: Static site generator
- **Custom CSS**: No external frameworks
- **Vanilla JavaScript**: No jQuery or libraries
- **GitHub Pages**: Hosting

## Customization

### Colors

Edit CSS variables in `assets/css/main.css`:

```css
:root {
  --color-primary: #3b82f6;      /* Primary accent color */
  --color-accent: #8b5cf6;       /* Secondary accent */
  --color-bg: #0a0a0a;           /* Background */
  --color-text: #e8e8e8;         /* Text color */
}
```

### Adding Projects

1. Create `.md` file in `_projects/`
2. Add front matter:

```yaml
---
layout: project
title: "Project Title"
excerpt: "Short description"
tags:
  - Tag1
  - Tag2
---

# Your content here
```

3. Add project card to `index.md`

### Navigation

Edit `_config.yml`:

```yaml
navigation:
  - title: About
    url: /#about
  - title: Projects
    url: /#projects
```

## Performance

- ✅ No external CSS frameworks
- ✅ Minimal JavaScript
- ✅ Optimized fonts (Inter, JetBrains Mono)
- ✅ Fast page loads
- ✅ SEO optimized

## Contact

- **Email**: santiago.lopez.begines@gmail.com
- **GitHub**: [@SLopezBegines](https://github.com/SLopezBegines)
- **ORCID**: [0000-0001-8809-8919](https://orcid.org/0000-0001-8809-8919)

## License

© 2025 Santiago López Begines. All rights reserved.

Code examples in projects are provided as educational material and can be adapted with attribution.
