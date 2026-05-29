# Brand Integration Log

**Project:** SLopezBegines.github.io  
**Brand version:** v2.0 (May 2026) — logo_v5, brand_guidelines v2  
**Source files:** `/home/santi/Documentos/Claude/Projects/Startup/output/brand/`

---

## Option A — Dark Mode + Brand Colors + Logo (2026-05-29)

Aligned the existing dark-mode portfolio to the brand identity without switching to a light background. Changes preserved the dark aesthetic while replacing all generic/placeholder colors with the official brand palette.

---

### 1. SVG Assets Copied

**`assets/brand/`** (new directory)

| File | Source |
|---|---|
| `logo_full_v5.svg` | brand output — full logo (mark + wordmark, 580×120 viewBox) |
| `logo_icon_v5.svg` | brand output — icon only (mark, 75×74 viewBox) |

These are available for future use (favicons, PDFs, emails). The header uses the icon embedded inline (see §4).

---

### 2. CSS Color Variables — `assets/css/main.css`

All 12 color variables in `:root` replaced with brand equivalents.

| Variable | Old value | New value | Brand token |
|---|---|---|---|
| `--color-bg` | `#0a0a0a` | `#0f1f18` | dark green-black (derived) |
| `--color-bg-secondary` | `#1a1a1a` | `#162820` | `--text-main` used as mid-dark surface |
| `--color-bg-tertiary` | `#2a2a2a` | `#1B3A2D` | `--green-deep` |
| `--color-text` | `#e8e8e8` | `#f0f5f2` | near-white with green tint |
| `--color-text-secondary` | `#a0a0a0` | `#7FBA9E` | `--green-light` (on dark bg) |
| `--color-primary` | `#1a7a7a` | `#2E7D52` | `--green-mid` |
| `--color-primary-hover` | `#156666` | `#3a9163` | lighter mid-green for hover |
| `--color-primary-light` | `#e8f5f5` | `#F2F7F4` | `--green-pale` |
| `--color-primary-mid` | `#c2e0e0` | `#C5DDD0` | `--green-border` |
| `--color-accent` | `#8b5cf6` (purple) | `#E07050` | `--coral` |
| `--color-success` | `#10b981` | `#2E7D52` | `--green-mid` |
| `--color-border` | `#333` | `#1B3A2D` | `--green-deep` |

**Side-effects from variable change (automatic — no extra edits needed):**
- Section title underline gradient → now green-to-coral (brand-correct)
- Card top accent bar gradient → now green-to-coral
- Project card hover top bar → now green-to-coral
- Hero h1 text gradient → now white-to-sage (readable on dark bg)

---

### 3. Hardcoded RGBA Values — `assets/css/main.css`

Six inline rgba values that hardcoded the old teal color were updated:

| Location | Old | New |
|---|---|---|
| `.site-header` background | `rgba(10,10,10,0.9)` | `rgba(15,31,24,0.92)` |
| `.hero-avatar` box-shadow | `rgba(26,122,122,0.3)` | `rgba(46,125,82,0.3)` |
| `.btn-primary:hover` box-shadow | `rgba(26,122,122,0.3)` | `rgba(46,125,82,0.3)` |
| `.service-card:hover` box-shadow | `rgba(26,122,122,0.2)` | `rgba(46,125,82,0.2)` |
| `.badge-wip` background | `rgba(26,122,122,0.15)` | `rgba(46,125,82,0.15)` |
| Contact form `button:hover` box-shadow | `rgba(26,122,122,0.3)` | `rgba(46,125,82,0.3)` |
| Mobile nav background | `rgba(10,10,10,0.98)` | `rgba(15,31,24,0.98)` |

---

### 4. Logo in Header — `_includes/header.html`

Replaced plain text `{{ site.author.name }}` with inline SVG icon + styled text.

**Structure:**
```
.logo (flex row, gap 0.6rem)
├── .logo-svg  (40×40 px, inline SVG — icon adapted for dark bg)
└── .logo-text ("López Begines" — matching wordmark hierarchy)
```

**SVG color adaptation for dark background** (original logo uses dark green on white):

| Element | Original color | Dark-mode adaptation |
|---|---|---|
| Soma + nodes (`.g`) | `#1B3A2D` (invisible on dark) | `#7FBA9E` (light sage) |
| AP trace | stroke `#2E7D52` | stroke `#7FBA9E`, opacity 0.6 |
| Dendritic stub | stroke `#1B3A2D` | stroke `#7FBA9E`, opacity 0.55 |
| Peak node (coral) | `#E07050` | unchanged — already visible |

Logo sizing: `width: 40px; height: 40px` — fits within the 70px header height with 15px vertical padding each side.

**New CSS rules added** (in `.site-header` section of `main.css`):
- `.logo { display: flex; align-items: center; gap: 0.6rem; }`
- `.logo-svg { width: 40px; height: 40px; flex-shrink: 0; }`
- `.logo-text` updated: `font-weight: 700`, added `letter-spacing: -0.3px`
- `.logo:hover .logo-text` hover color changed to `--color-text-secondary` (sage) instead of `--color-primary`

---

### 5. Google Fonts — `_layouts/default.html`

Replaced JetBrains Mono with Roboto Mono (brand-specified monospace font).

| Before | After |
|---|---|
| `JetBrains+Mono:wght@400;500` | `Roboto+Mono:wght@400;500` |

JetBrains Mono kept in CSS `--font-mono` fallback chain: `'Roboto Mono', 'JetBrains Mono', 'Fira Code', monospace`.

---

## Option B — Full Brand Alignment (not yet done)

Planned next phase. Would include:

- Switch body/content backgrounds to light (`#F2F7F4`) with dark text (`#162820`)
- Add Lato as body font (currently Inter everywhere)
- Blog post layout background and typography adjustments
- Post content link color → coral (`#E07050`)
- Code blocks → `#F2F7F4` background (brand-specified)

---

## Brand Source Reference

| Token | Hex |
|---|---|
| `--green-deep` | `#1B3A2D` |
| `--green-mid` | `#2E7D52` |
| `--green-light` | `#7FBA9E` |
| `--green-pale` | `#F2F7F4` |
| `--green-border` | `#C5DDD0` |
| `--coral` | `#E07050` |
| `--coral-dark` | `#A84030` |
| `--text-main` | `#162820` |
| `--text-muted` | `#4A6A55` |
