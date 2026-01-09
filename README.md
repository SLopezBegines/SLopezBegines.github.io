# Santiago López Begines - Portfolio

Personal portfolio website showcasing data science and neuroscience research projects.

**Live Site**: https://SLopezBegines.github.io

## About

This portfolio website is built with Jekyll and the Minimal Mistakes theme, hosted on GitHub Pages. It features:

- Professional project showcases with technical details
- Complete publication list
- Interactive project pages with code examples
- Responsive design for mobile and desktop
- Dark theme optimized for technical content

## Projects Featured

1. **IBEX35 Stock Market Prediction** - Machine learning and sentiment analysis for financial markets
2. **Alzheimer's Disease Prediction** - Multimodal ML using A4 study data
3. **Proteomics Analysis Pipeline** - High-throughput omics data processing
4. **AgrIoT Smart Control** - ESP32-based IoT automation system

## Local Development

### Prerequisites

- Ruby 2.7+
- Bundler
- Jekyll

### Setup

```bash
# Clone the repository
git clone https://github.com/SLopezBegines/SLopezBegines.github.io.git
cd SLopezBegines.github.io

# Install dependencies
bundle install

# Run local server
bundle exec jekyll serve

# View at http://localhost:4000
```

## Deployment

The site is automatically built and deployed by GitHub Pages when changes are pushed to the `main` branch.

## Project Structure

```
.
├── _config.yml           # Site configuration
├── _data/
│   └── navigation.yml    # Navigation menu
├── _pages/
│   └── publications.md   # Publications page
├── _projects/            # Individual project pages
│   ├── ibex35-prediction.md
│   ├── alzheimer-ml.md
│   ├── proteomics.md
│   └── agriot.md
├── assets/
│   ├── images/          # Project images
│   └── cv/              # CV PDF files
└── index.md             # Home page
```

## Technologies Used

- **Jekyll**: Static site generator
- **Minimal Mistakes**: Professional Jekyll theme
- **GitHub Pages**: Free hosting
- **Markdown**: Content writing
- **Liquid**: Templating
- **YAML**: Configuration

## Customization

### Changing Theme Color

Edit `_config.yml`:

```yaml
minimal_mistakes_skin: "dark"  # Options: "air", "aqua", "contrast", "dark", "dirt", "neon", "mint", "plum", "sunrise"
```

### Adding a New Project

1. Create a new file in `_projects/` (e.g., `new-project.md`)
2. Add front matter:

```yaml
---
title: "Project Title"
excerpt: "Short description"
header:
  teaser: /assets/images/projects/thumb.jpg
tags:
  - Tag1
  - Tag2
---
```

3. Write project content in Markdown
4. Add project card to `index.md`

### Updating CV

Replace the PDF file in `assets/cv/` with your updated CV, keeping the same filename.

## Contact

- **Email**: santiago.lopez.begines@gmail.com
- **GitHub**: [@SLopezBegines](https://github.com/SLopezBegines)
- **ORCID**: [0000-0001-8809-8919](https://orcid.org/0000-0001-8809-8919)

## License

This portfolio is © 2025 Santiago López Begines. Content is available for reference but please ask before reusing substantial portions.

Code snippets in projects are provided as examples and can be adapted for your own use with attribution.

## Acknowledgments

- Theme: [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/) by Michael Rose
- Icons: Font Awesome
- Hosting: GitHub Pages
