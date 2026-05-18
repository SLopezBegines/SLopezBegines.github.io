---
layout: project
title: "Legacy System Modernization: Remote Monitoring for a 1972 Diesel Engine"
excerpt: "Designed and deployed a LoRa-based wireless control system enabling remote operation and real-time telemetry of a 50-year-old irrigation engine from 2+ km away. Total cost: <€150."
tags:
  - Embedded Systems
  - IoT
  - LoRa
  - PCB Design
  - C/C++
  - Arduino
  - ESP32
  - Sensor Integration
---

<style>
/* ── Page-level overrides ─────────────────────────────────────── */
.project-content { max-width: 100%; }

/* ── Hero stats ──────────────────────────────────────────────── */
.hero-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin: 2rem 0;
}
.stat-card {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.stat-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
}
.stat-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-primary);
  box-shadow: 0 12px 24px rgba(26, 122, 122, 0.15);
}
.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-primary);
  line-height: 1.1;
  margin-bottom: 0.4rem;
}
.stat-label {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* ── Quick links ─────────────────────────────────────────────── */
.quick-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin: 1.5rem 0 2.5rem;
}
.quick-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.25rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  border: 1px solid var(--color-border);
  background: var(--color-bg-secondary);
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.quick-link:hover:not(.disabled) {
  border-color: var(--color-primary);
  color: var(--color-primary);
  transform: translateY(-2px);
}
.quick-link.disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.quick-link svg { width: 16px; height: 16px; flex-shrink: 0; }

/* ── Image placeholder ───────────────────────────────────────── */
.img-placeholder {
  background: var(--color-bg-secondary);
  border: 2px dashed var(--color-border);
  border-radius: 10px;
  padding: 3rem 2rem;
  text-align: center;
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  margin: 1.5rem 0;
  transition: border-color 0.3s;
}
.img-placeholder:hover { border-color: var(--color-primary); }
.img-placeholder .ph-icon { font-size: 2rem; display: block; margin-bottom: 0.5rem; }
.img-placeholder .ph-label { font-weight: 500; color: var(--color-text); display: block; margin-bottom: 0.25rem; }
.img-placeholder .ph-hint { font-size: 0.8rem; }
.img-placeholder.wide { min-height: 220px; display: flex; flex-direction: column; justify-content: center; }

/* ── Section label ───────────────────────────────────────────── */
.section-label {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
}

/* ── Two-col layout ──────────────────────────────────────────── */
.two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: start;
  margin: 1.5rem 0;
}
.two-col.diagram-left { grid-template-columns: 1.2fr 1fr; }

/* ── Architecture SVG ────────────────────────────────────────── */
.arch-diagram {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 1.5rem;
}

/* ── Component list ──────────────────────────────────────────── */
.component-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.component-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.6rem 0;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  font-size: 0.95rem;
}
.component-list li:last-child { border-bottom: none; }
.component-badge {
  display: inline-block;
  background: rgba(26, 122, 122, 0.12);
  color: var(--color-primary);
  border: 1px solid rgba(26, 122, 122, 0.3);
  border-radius: 5px;
  padding: 0.15rem 0.55rem;
  font-size: 0.78rem;
  font-weight: 600;
  white-space: nowrap;
  flex-shrink: 0;
  margin-top: 0.05rem;
}

/* ── Code block with copy button ─────────────────────────────── */
.code-block-wrapper {
  position: relative;
  margin: 1.5rem 0;
}
.code-block-wrapper pre {
  margin: 0;
  padding-right: 3.5rem;
}
.copy-btn {
  position: absolute;
  top: 0.6rem;
  right: 0.6rem;
  background: var(--color-bg-tertiary);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  color: var(--color-text-secondary);
  font-family: var(--font-sans);
  font-size: 0.75rem;
  padding: 0.3rem 0.7rem;
  cursor: pointer;
  transition: all 0.2s;
}
.copy-btn:hover { background: var(--color-primary); color: white; border-color: var(--color-primary); }
.copy-btn.copied { background: var(--color-success); color: white; border-color: var(--color-success); }

/* Syntax colours (manual, no external dep) */
pre code .kw  { color: #569cd6; } /* keywords */
pre code .st  { color: #ce9178; } /* strings  */
pre code .cm  { color: #6a9955; } /* comments */
pre code .nm  { color: #9cdcfe; } /* names    */
pre code .nb  { color: #4ec9b0; } /* built-in */
pre code .nl  { color: #dcdcaa; } /* function names */
pre code .nu  { color: #b5cea8; } /* numbers  */
pre code .op  { color: #d4d4d4; } /* operators */

/* ── Sensor table ────────────────────────────────────────────── */
.sensor-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  font-size: 0.9rem;
}
.sensor-table th,
.sensor-table td {
  padding: 0.65rem 0.85rem;
  text-align: left;
  border-bottom: 1px solid var(--color-border);
}
.sensor-table th {
  background: var(--color-bg-secondary);
  font-weight: 600;
  color: var(--color-text);
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.sensor-table td { color: var(--color-text-secondary); }
.sensor-table tr:hover td { background: var(--color-bg-secondary); color: var(--color-text); }
.sensor-table td:first-child { font-weight: 500; color: var(--color-text); }

/* ── Safety feature list ─────────────────────────────────────── */
.feature-list {
  list-style: none;
  margin: 1rem 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem;
}
.feature-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  padding: 0.75rem 1rem;
  background: var(--color-bg-secondary);
  border-radius: 8px;
  border: 1px solid var(--color-border);
  font-size: 0.9rem;
  color: var(--color-text-secondary);
}
.feature-list li .fi { color: var(--color-primary); font-size: 1rem; flex-shrink: 0; }

/* ── Results metrics ─────────────────────────────────────────── */
.metrics-section {
  background: var(--color-bg-secondary);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  padding: 3rem 0;
  margin: 3rem -2rem;
  padding-left: 2rem;
  padding-right: 2rem;
}
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 1.5rem;
}
.metric-card {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 1.75rem 1.5rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
}
.metric-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
}
.metric-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-primary);
  box-shadow: 0 10px 30px rgba(26, 122, 122, 0.15);
}
.metric-number {
  font-size: 2.4rem;
  font-weight: 700;
  color: var(--color-primary);
  line-height: 1;
  margin-bottom: 0.35rem;
}
.metric-desc {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  line-height: 1.4;
  margin: 0;
}
.metric-detail {
  font-size: 0.78rem;
  color: var(--color-accent);
  margin-top: 0.25rem;
  font-weight: 500;
}

/* ── Before/After ────────────────────────────────────────────── */
.before-after {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin: 1.5rem 0;
}
.ba-card {
  border-radius: 10px;
  padding: 1.25rem 1.5rem;
}
.ba-before {
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.25);
}
.ba-after {
  background: rgba(16, 185, 129, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.25);
}
.ba-card h4 {
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.75rem;
}
.ba-before h4 { color: #ef4444; }
.ba-after h4  { color: var(--color-success); }
.ba-card ul {
  list-style: none;
  margin: 0; padding: 0;
}
.ba-card li {
  padding: 0.3rem 0;
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  display: flex;
  gap: 0.5rem;
}
.ba-before li::before { content: '✗'; color: #ef4444; flex-shrink: 0; }
.ba-after  li::before { content: '✓'; color: var(--color-success); flex-shrink: 0; }

/* ── Collapsible deep dive ───────────────────────────────────── */
.deep-dive {
  border: 1px solid var(--color-border);
  border-radius: 12px;
  margin: 2rem 0;
  overflow: hidden;
}
.deep-dive-toggle {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  background: var(--color-bg-secondary);
  border: none;
  color: var(--color-text);
  font-family: var(--font-sans);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.deep-dive-toggle:hover { background: var(--color-bg-tertiary); }
.deep-dive-toggle .chevron {
  transition: transform 0.3s;
  color: var(--color-primary);
}
.deep-dive-toggle[aria-expanded="true"] .chevron { transform: rotate(180deg); }
.deep-dive-body {
  display: none;
  padding: 1.5rem;
  border-top: 1px solid var(--color-border);
}
.deep-dive-body.open { display: block; }

/* ── Specs table ─────────────────────────────────────────────── */
.specs-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}
.specs-table td {
  padding: 0.6rem 0.85rem;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  vertical-align: top;
}
.specs-table tr:last-child td { border-bottom: none; }
.specs-table td:first-child {
  font-weight: 600;
  color: var(--color-text);
  width: 35%;
  white-space: nowrap;
}
.specs-table tr:hover td { background: var(--color-bg-secondary); }

/* ── Skill badges ────────────────────────────────────────────── */
.skills-section { margin: 2rem 0; }
.skill-group { margin-bottom: 1.25rem; }
.skill-group-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-text-secondary);
  margin-bottom: 0.6rem;
}
.badge-group { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.skill-badge {
  display: inline-block;
  padding: 0.3rem 0.85rem;
  border-radius: 20px;
  font-size: 0.82rem;
  font-weight: 500;
  border: 1px solid;
  transition: all 0.2s;
  cursor: default;
}
.skill-badge:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.2); }
.badge-hw { background: rgba(26,122,122,0.1); color: var(--color-primary); border-color: rgba(26,122,122,0.3); }
.badge-sw { background: rgba(139,92,246,0.1); color: var(--color-accent); border-color: rgba(139,92,246,0.3); }
.badge-proto { background: rgba(16,185,129,0.1); color: var(--color-success); border-color: rgba(16,185,129,0.3); }
.badge-tool { background: rgba(245,158,11,0.1); color: #f59e0b; border-color: rgba(245,158,11,0.3); }

/* ── CTA section ─────────────────────────────────────────────── */
.cta-box {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-primary);
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem 0;
  position: relative;
  overflow: hidden;
}
.cta-box::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
}
.cta-box h3 { color: var(--color-primary); margin-bottom: 0.5rem; }
.cta-box p { margin-bottom: 1.25rem; }
.cta-links { display: flex; gap: 1rem; flex-wrap: wrap; }

/* ── Next steps list ─────────────────────────────────────────── */
.next-steps {
  list-style: none;
  margin: 1rem 0;
  padding: 0;
}
.next-steps li {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  padding: 0.5rem 0;
  color: var(--color-text-secondary);
  font-size: 0.95rem;
}
.next-steps li::before {
  content: '→';
  color: var(--color-primary);
  flex-shrink: 0;
  font-weight: 600;
}

/* ── Divider ─────────────────────────────────────────────────── */
.section-divider {
  border: none;
  border-top: 1px solid var(--color-border);
  margin: 2.5rem 0;
}

/* ── Responsive ──────────────────────────────────────────────── */
@media (max-width: 900px) {
  .two-col, .two-col.diagram-left { grid-template-columns: 1fr; }
  .before-after { grid-template-columns: 1fr; }
  .metrics-grid { grid-template-columns: repeat(2, 1fr); }
  .feature-list { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
  .hero-stats { grid-template-columns: 1fr; }
  .metrics-grid { grid-template-columns: 1fr; }
  .metrics-section { margin: 3rem -1rem; padding-left: 1rem; padding-right: 1rem; }
}
</style>

<!-- ═══════════════════════════════════════════════════════════════
     TAGLINE
═══════════════════════════════════════════════════════════════ -->
<p style="font-size:1.15rem; color: var(--color-text); margin-bottom: 0.25rem; font-weight: 500;">
  Bringing IoT capabilities to a 1972 diesel irrigation engine — without replacing a single component.
</p>
<p style="font-size: 0.95rem; color: var(--color-text-secondary); margin-bottom: 1.5rem;">
  A custom LoRa wireless system enabling remote start/stop and real-time telemetry from 2+ km away. Deployed in production for 6+ months.
</p>

<!-- ── Hero stats ──────────────────────────────────────────── -->
<div class="hero-stats">
  <div class="stat-card">
    <div class="stat-value">50 yrs</div>
    <div class="stat-label">Engine Age (1972)</div>
  </div>
  <div class="stat-card">
    <div class="stat-value">2.3 km</div>
    <div class="stat-label">Wireless Range</div>
  </div>
  <div class="stat-card">
    <div class="stat-value">&lt;€150</div>
    <div class="stat-label">Total Cost</div>
  </div>
</div>

<!-- ── Quick links ──────────────────────────────────────────── -->
<div class="quick-links">
  <a href="https://github.com/SLopezBegines/AgrIoT-Smart-Motor-Control" class="quick-link" target="_blank" rel="noopener">
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.745 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
    GitHub Repository
  </a>
  <span class="quick-link disabled">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
    Technical Docs (coming soon)
  </span>
  <span class="quick-link disabled">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="10,8 16,12 10,16"/></svg>
    Live Demo (offline system)
  </span>
</div>

<!-- ── Hero image ───────────────────────────────────────────── -->
<figure class="project-figure">
  <img src="{{ '/assets/images/projects/agriot/engine_field.jpg' | relative_url }}"
       alt="1972 MWM diesel irrigation engine in field with LoRa IoT control box installed, Badajoz Spain"
       style="width:100%; border-radius:10px; display:block;">
  <figcaption style="font-size:0.82rem; color:var(--color-text-secondary); margin-top:0.5rem; text-align:center;">
    1972 MWM diesel irrigation engine retrofitted with a custom LoRa + WiFi control box — Badajoz, Spain
  </figcaption>
</figure>

<hr class="section-divider">

<!-- ═══════════════════════════════════════════════════════════════
     THE PROBLEM
═══════════════════════════════════════════════════════════════ -->
<span class="section-label">01 — The Problem</span>

## The Challenge

A 1972 diesel engine powers an irrigation pump on a remote farm. The engine is mechanically reliable — decades of proper maintenance have kept it running — but its complete lack of remote capability creates a serious operational bottleneck.

Every start, stop, and parameter check required a physical site visit. Oil pressure, battery voltage, engine RPM, and fuel level could only be read on-site. Missing a low-pressure event — even briefly — risks catastrophic engine damage: scored cylinder walls, seized pistons, complete overhaul.

<figure class="project-figure">
  <img src="{{ '/assets/images/projects/agriot/engine_plate_1972.jpg' | relative_url }}"
       alt="Engine manufacturer plate showing MWM Diaz de Terán, Zafra, España, year 1972"
       style="width:100%; border-radius:10px; display:block;">
  <figcaption style="font-size:0.82rem; color:var(--color-text-secondary); margin-top:0.5rem; text-align:center;">
    Original manufacturer plate — MWM Díaz de Terán, Zafra (Badajoz), 1972. The engine has been in continuous operation for over 50 years.
  </figcaption>
</figure>

<div class="before-after" style="margin-top: 1.5rem;">
  <div class="ba-card ba-before">
    <h4>Before</h4>
    <ul>
      <li>7 on-site visits per week for start/stop</li>
      <li>No remote visibility of engine parameters</li>
      <li>Low-pressure events detected only on-site</li>
      <li>€5,000+ commercial IoT solutions require engine replacement</li>
      <li>No historical data for predictive maintenance</li>
    </ul>
  </div>
  <div class="ba-card ba-after">
    <h4>After</h4>
    <ul>
      <li>Remote start/stop from smartphone, 2+ km range</li>
      <li>Real-time telemetry: voltage, pressure, RPM, fuel</li>
      <li>Automated alerts on low-pressure events</li>
      <li>&lt;€150 total, zero engine modifications</li>
      <li>6-month deployment log for trend analysis</li>
    </ul>
  </div>
</div>

<hr class="section-divider">

<!-- ═══════════════════════════════════════════════════════════════
     THE SOLUTION
═══════════════════════════════════════════════════════════════ -->
<span class="section-label">02 — The Solution</span>

## System Architecture

A two-node LoRa network bridges the engine to the cloud. The gateway node (ESP32 TTGO) sits within WiFi range of the farmhouse and handles bidirectional communication: relaying Blynk cloud commands to the engine, and uploading telemetry from the field. The control node (Arduino Nano + RFM95) mounts directly at the engine, reads all sensors, drives 8 relay channels, and persists state in EEPROM across power cycles.

<div class="two-col diagram-left">
  <div class="arch-diagram">
    <!-- SVG system architecture diagram -->
    <svg viewBox="0 0 420 340" xmlns="http://www.w3.org/2000/svg" style="width:100%; height:auto; display:block;">
      <defs>
        <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#1a7a7a"/>
        </marker>
        <marker id="arr2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#8b5cf6"/>
        </marker>
      </defs>

      <!-- Cloud -->
      <rect x="130" y="12" width="160" height="52" rx="10" fill="#1a2a2a" stroke="#1a7a7a" stroke-width="1.5"/>
      <text x="210" y="34" text-anchor="middle" fill="#e8e8e8" font-family="Inter,sans-serif" font-size="12" font-weight="600">Blynk Cloud</text>
      <text x="210" y="52" text-anchor="middle" fill="#a0a0a0" font-family="monospace" font-size="10">Virtual Pins V1–V24</text>

      <!-- WiFi line cloud → gateway -->
      <line x1="210" y1="64" x2="210" y2="108" stroke="#1a7a7a" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#arr)"/>
      <text x="218" y="92" fill="#a0a0a0" font-family="monospace" font-size="9">WiFi / HTTPS</text>

      <!-- Gateway -->
      <rect x="110" y="108" width="200" height="64" rx="10" fill="#1a2a2a" stroke="#1a7a7a" stroke-width="1.5"/>
      <text x="210" y="130" text-anchor="middle" fill="#e8e8e8" font-family="Inter,sans-serif" font-size="12" font-weight="600">Gateway Node</text>
      <text x="210" y="148" text-anchor="middle" fill="#1a7a7a" font-family="monospace" font-size="10">ESP32 TTGO LoRa v2</text>
      <text x="210" y="162" text-anchor="middle" fill="#a0a0a0" font-family="monospace" font-size="9">0xFF · WiFi + LoRa 868 MHz</text>

      <!-- Bidirectional LoRa arrow -->
      <line x1="180" y1="172" x2="180" y2="220" stroke="#8b5cf6" stroke-width="1.5" marker-end="url(#arr2)"/>
      <line x1="240" y1="220" x2="240" y2="172" stroke="#1a7a7a" stroke-width="1.5" marker-end="url(#arr)"/>
      <text x="255" y="198" fill="#8b5cf6" font-family="monospace" font-size="9">Commands</text>
      <text x="148" y="198" fill="#1a7a7a" font-family="monospace" font-size="9" text-anchor="end">Telemetry</text>
      <text x="210" y="213" text-anchor="middle" fill="#a0a0a0" font-family="monospace" font-size="8">LoRa 868 MHz · 20 dBm · 2.3 km</text>

      <!-- Control node -->
      <rect x="110" y="220" width="200" height="64" rx="10" fill="#1a2a2a" stroke="#8b5cf6" stroke-width="1.5"/>
      <text x="210" y="242" text-anchor="middle" fill="#e8e8e8" font-family="Inter,sans-serif" font-size="12" font-weight="600">Control Node</text>
      <text x="210" y="260" text-anchor="middle" fill="#8b5cf6" font-family="monospace" font-size="10">Arduino Nano + RFM95</text>
      <text x="210" y="274" text-anchor="middle" fill="#a0a0a0" font-family="monospace" font-size="9">0xBB · 8 relays · 4 sensors</text>

      <!-- Engine -->
      <line x1="210" y1="284" x2="210" y2="314" stroke="#a0a0a0" stroke-width="1.5" stroke-dasharray="3,2"/>
      <rect x="120" y="314" width="180" height="22" rx="6" fill="#2a2a2a" stroke="#333" stroke-width="1"/>
      <text x="210" y="330" text-anchor="middle" fill="#a0a0a0" font-family="Inter,sans-serif" font-size="10">1972 Diesel Engine</text>
    </svg>
  </div>

  <div>
    <p>The architecture was chosen to minimise complexity at the field end. The Arduino Nano operates without network connectivity — it only needs to drive relays and read sensors. All cloud integration is handled by the gateway, which is housed in a weatherproof enclosure near a mains power outlet.</p>
    <p>Bidirectional LoRa communication uses addressed packets with message counters. Commands flow Gateway → Node as JSON objects keyed by virtual pin (<code>{"V1": 1}</code>). Telemetry flows Node → Gateway as a compact JSON array every 60 seconds, triggered after any state change or on timer.</p>
    <ul class="component-list">
      <li><span class="component-badge">ESP32</span> TTGO LoRa v2 — dual-core, integrated LoRa + WiFi</li>
      <li><span class="component-badge">ATmega</span> Arduino Nano — low power, 8 PWM pins, 8 analog</li>
      <li><span class="component-badge">RFM95W</span> SX1276 LoRa chip — 868 MHz, 20 dBm TX power</li>
      <li><span class="component-badge">Blynk</span> IoT cloud — virtual pins, mobile dashboard, alerts</li>
    </ul>
  </div>
</div>

<hr class="section-divider">

<!-- ═══════════════════════════════════════════════════════════════
     TECHNICAL IMPLEMENTATION
═══════════════════════════════════════════════════════════════ -->
<span class="section-label">03 — Technical Implementation</span>

## Hardware Architecture

<div class="two-col">
  <div>
    <h4 style="color: var(--color-text); margin-bottom: 1rem;">Control Node (Arduino Nano)</h4>
    <ul class="component-list">
      <li><span class="component-badge">D8</span> Relay 1 — Engine start (pulse, 500 ms)</li>
      <li><span class="component-badge">D7</span> Relay 2 — Engine stop (pulse, 550 ms)</li>
      <li><span class="component-badge">D6</span> Relay 3 — Cooldown sequence (3 s)</li>
      <li><span class="component-badge">D5</span> Relay 4 — Oil pump / run indicator</li>
      <li><span class="component-badge">A0</span> Relay 5 — Throttle (linear actuator)</li>
      <li><span class="component-badge">A1</span> Relay 6 — Brake (linear actuator)</li>
      <li><span class="component-badge">A2</span> Relay 7 — Electrovalve (fertiliser)</li>
      <li><span class="component-badge">A3</span> Relay 8 — Auxiliary output</li>
      <li><span class="component-badge">A7</span> Battery voltage (22kΩ/4.7kΩ divider)</li>
      <li><span class="component-badge">A6</span> Alternator voltage (same divider)</li>
      <li><span class="component-badge">A5</span> Oil pressure (analog transducer)</li>
      <li><span class="component-badge">D4</span> Fuel level (digital sensor)</li>
      <li><span class="component-badge">D3</span> RPM — Hall effect, INT1 interrupt</li>
    </ul>
  </div>
  <div>
    <h4 style="color: var(--color-text); margin-bottom: 1rem;">Power Supply Chain</h4>
    <p>The engine's 12 V battery powers the entire control node. A DC-DC buck converter (LM2596) steps down to 5 V for the Arduino and relays. An LDO regulator (LM1117-3.3) supplies the RFM95 LoRa module, which requires a stable 3.3 V rail.</p>
    <p>Relay drivers use flyback diodes to suppress the inductive kick from relay coils. All sensor inputs include RC low-pass filters to reduce noise from the engine alternator.</p>
    <figure class="project-figure" style="margin-top: 1rem;">
      <img src="{{ '/assets/images/projects/agriot/pcb_top.jpg' | relative_url }}"
           alt="Custom red PCB held in hand showing Arduino Nano, RFM95 LoRa module, power regulation and relay connectors"
           style="width:100%; border-radius:10px; display:block;">
      <figcaption style="font-size:0.82rem; color:var(--color-text-secondary); margin-top:0.5rem; text-align:center;">
        Custom PCB v3.0 — Arduino Nano (centre), RFM95W LoRa module (bottom-left), LM2596 buck converter (top-right), relay screw terminals (top)
      </figcaption>
    </figure>
    <figure class="project-figure" style="margin-top: 1rem;">
      <img src="{{ '/assets/images/projects/agriot/actuator_throttle.jpg' | relative_url }}"
           alt="Linear actuator mounted on engine frame connecting to throttle and brake mechanism"
           style="width:100%; border-radius:10px; display:block;">
      <figcaption style="font-size:0.82rem; color:var(--color-text-secondary); margin-top:0.5rem; text-align:center;">
        Linear actuator controlling throttle and brake — driven by Relay 5 (A0) and Relay 6 (A1), activated via 1-second pulses from the control node
      </figcaption>
    </figure>
  </div>
</div>

---

### Communication Protocol

Each command from Blynk triggers a separate LoRa packet from the gateway. The payload is a minimal JSON object keyed by virtual pin — this keeps packets small and avoids re-sending the full relay state on every interaction.

Telemetry packets from the node are sent as a JSON array (9 values, ~60 bytes), transmitted after any state change and on a 60-second timer.

<div class="code-block-wrapper">
<button class="copy-btn" onclick="copyCode(this)">Copy</button>
<pre><code>
<span class="cm">// ── Gateway → Node: command packet ─────────────────────────────</span>
<span class="cm">// One JSON object per virtual pin trigger (Blynk BLYNK_WRITE)</span>
{ <span class="st">"V1"</span>: <span class="nu">1</span> }   <span class="cm">// Start engine (Relay 1 pulse)</span>
{ <span class="st">"V2"</span>: <span class="nu">1</span> }   <span class="cm">// Stop engine  (Relay 2 → cooldown sequence)</span>
{ <span class="st">"V5"</span>: <span class="nu">1</span> }   <span class="cm">// Throttle  (linear actuator, 1-second pulse)</span>
{ <span class="st">"V6"</span>: <span class="nu">1</span> }   <span class="cm">// Brake     (linear actuator, 1-second pulse)</span>
{ <span class="st">"V24"</span>: <span class="nu">5</span> }  <span class="cm">// RPM target (slider 0–10, mapped to 1000–75000)</span>

<span class="cm">// ── Node → Gateway: telemetry array ────────────────────────────</span>
<span class="cm">// Sent every 60 s and after any relay state change</span>
[
  <span class="nu">12.8</span>,   <span class="cm">// [0] Battery voltage (V)  — avgVoltage1</span>
  <span class="nu">14.1</span>,   <span class="cm">// [1] Alternator voltage (V) — avgVoltage2</span>
  <span class="nu">3.2</span>,    <span class="cm">// [2] Oil pressure (bar)   — avgPresion1</span>
  <span class="nu">0</span>,      <span class="cm">// [3] Electrovalve state   — LedRelay_7</span>
  <span class="nu">1</span>,      <span class="cm">// [4] Engine OFF indicator — LedRelay_3</span>
  <span class="nu">0</span>,      <span class="cm">// [5] Engine ON indicator  — LedRelay_4</span>
  <span class="nu">1</span>,      <span class="cm">// [6] Fuel level (digital) — StateLevel</span>
  <span class="nu">1850</span>,   <span class="cm">// [7] Engine RPM           — totalRPM</span>
  <span class="nu">5</span>       <span class="cm">// [8] RPM slider position  — RPM_Slider</span>
]
</code></pre>
</div>

The serialisation function from the actual node firmware:

<div class="code-block-wrapper">
<button class="copy-btn" onclick="copyCode(this)">Copy</button>
<pre><code>
<span class="cm">// LoRaSender() — Diesel_Motor_Lora_Node/functions_rpm.h</span>
<span class="kw">void</span> <span class="nl">LoRaSender</span>() {
  <span class="kw">const</span> size_t CAPACITY = JSON_ARRAY_SIZE(<span class="nu">9</span>);
  StaticJsonDocument&lt;CAPACITY&gt; doc;
  JsonArray array = doc.to&lt;JsonArray&gt;();

  array.add(avgVoltage1);   <span class="cm">// battery voltage</span>
  array.add(avgVoltage2);   <span class="cm">// alternator voltage</span>
  array.add(avgPresion1);   <span class="cm">// oil pressure</span>
  array.add(LedRelay_7);    <span class="cm">// electrovalve state</span>
  array.add(LedRelay_3);    <span class="cm">// motor-off indicator</span>
  array.add(LedRelay_4);    <span class="cm">// motor-on indicator</span>
  array.add(StateLevel);    <span class="cm">// fuel level (digital)</span>
  array.add(totalRPM);      <span class="cm">// engine RPM</span>
  array.add(RPM_Slider);    <span class="cm">// RPM target slider</span>

  <span class="kw">char</span> output[<span class="nu">200</span>];
  serializeJson(doc, output, <span class="kw">sizeof</span>(output));

  LoRa.beginPacket();
  LoRa.write(destination);   <span class="cm">// 0xFF — gateway</span>
  LoRa.write(localAddress);  <span class="cm">// 0xBB — this node</span>
  LoRa.write(msgCount);
  LoRa.write(<span class="kw">sizeof</span>(output));
  LoRa.print(output);
  LoRa.endPacket();
  msgCount++;

  onReceive(LoRa.parsePacket());  <span class="cm">// immediately poll for reply</span>
}
</code></pre>
</div>

---

### Sensor Integration

All analog readings use a 100-sample averaging loop to suppress ADC noise from the engine's ignition system. The voltage divider formula (`Vin = raw × 5V × (R1+R2) / (R2 × 1023)`) is applied per-sample before accumulation.

<table class="sensor-table">
  <thead>
    <tr>
      <th>Sensor</th>
      <th>Type</th>
      <th>Pin</th>
      <th>Conditioning</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Battery voltage</td>
      <td>Resistor divider</td>
      <td>A7</td>
      <td>22 kΩ / 4.7 kΩ → 0–5 V ADC range; 100-sample average</td>
    </tr>
    <tr>
      <td>Alternator voltage</td>
      <td>Resistor divider</td>
      <td>A6</td>
      <td>Same divider; detects charging state (≈14.1 V when running)</td>
    </tr>
    <tr>
      <td>Oil pressure</td>
      <td>Analog transducer</td>
      <td>A5</td>
      <td><code>Presion = (raw × 5000 mV × 0.0028) / 1023</code>; 100-sample average</td>
    </tr>
    <tr>
      <td>Fuel level</td>
      <td>Digital float switch</td>
      <td>D4</td>
      <td>Direct digital read — LOW = sufficient, HIGH = low fuel</td>
    </tr>
    <tr>
      <td>Engine RPM</td>
      <td>Hall effect (alternator fan)</td>
      <td>D3</td>
      <td>Hardware interrupt (INT1 RISING); counted per 1-second window</td>
    </tr>
  </tbody>
</table>

<div class="code-block-wrapper">
<button class="copy-btn" onclick="copyCode(this)">Copy</button>
<pre><code>
<span class="cm">// Voltage averaging — VoltageFunction1() in functions_rpm.h</span>
<span class="kw">void</span> <span class="nl">VoltageFunction1</span>() {
  sumVoltage1 = <span class="nu">0</span>;
  <span class="kw">for</span> (<span class="kw">int</span> i = <span class="nu">0</span>; i &lt;= <span class="nu">100</span>; i++) {
    <span class="kw">int</span> raw = analogRead(VoltageSensor);
    <span class="cm">// Vin = (raw × 5V × (R1+R2)) / (R2 × 1023)  R1=22kΩ  R2=4.7kΩ</span>
    <span class="kw">float</span> v = raw * <span class="nu">5.0</span> * (<span class="nu">22.0</span> + <span class="nu">4.7</span>) / (<span class="nu">1023.0</span> * <span class="nu">4.7</span>);
    sumVoltage1 += v;
  }
  avgVoltage1 = sumVoltage1 / <span class="nu">100</span>;
}

<span class="cm">// RPM measurement — interrupt-based, 1-second window</span>
<span class="kw">void</span> <span class="nl">ISRCountPulse3</span>() { pulseCount3++; }

<span class="kw">void</span> <span class="nl">loop_rpm</span>() {
  <span class="kw">if</span> ((millis() - lastmillis) >= <span class="nu">1000</span>) {
    detachInterrupt(digitalPinToInterrupt(RPM_PIN));
    <span class="kw">unsigned long</span> interval = millis() - lastmillis;
    <span class="cm">// 1 pulse per rotation; multiply by 60 to convert Hz → RPM</span>
    totalRPM = <span class="nu">60.0</span> * (pulseCount3 / (interval / <span class="nu">1000.0</span>));
    lastmillis = millis();
    pulseCount3 = <span class="nu">0</span>;
    attachInterrupt(digitalPinToInterrupt(RPM_PIN), ISRCountPulse3, RISING);
  }
}
</code></pre>
</div>

---

### Safety & Reliability

<ul class="feature-list">
  <li><span class="fi">💾</span> <strong>EEPROM state persistence</strong> — engine start/stop state and electrovalve state survive power loss; restored on boot via <code>EEPROM.get()</code></li>
  <li><span class="fi">⏱</span> <strong>Timed relay pulses</strong> — start/stop use momentary pulses (500–550 ms) to replicate the physical key; cannot get stuck in an active state</li>
  <li><span class="fi">🔄</span> <strong>Cooldown sequence</strong> — stopping triggers Relay 2 (engine off) → 5 s delay → Relay 3 (cooling run for 3 s), preventing thermal shock</li>
  <li><span class="fi">🛡</span> <strong>Address-based routing</strong> — node ignores all LoRa packets not addressed to 0xBB, preventing phantom triggers from other LoRa devices</li>
  <li><span class="fi">📡</span> <strong>Immediate ACK poll</strong> — after every transmission, the node calls <code>onReceive(LoRa.parsePacket())</code> to catch any queued command before the next sensor cycle</li>
  <li><span class="fi">🔒</span> <strong>Guard conditions</strong> — <code>Start()</code> only fires if <code>started == 0</code>; <code>OffMotor()</code> only fires if <code>started == 1</code>, preventing double-start and double-stop</li>
</ul>

<div class="code-block-wrapper">
<button class="copy-btn" onclick="copyCode(this)">Copy</button>
<pre><code>
<span class="cm">// Start/stop state machine — loop_funtions() in functions_rpm.h</span>
<span class="kw">void</span> <span class="nl">loop_funtions</span>() {
  started  = EEPROM.get(addr,  started);   <span class="cm">// restore from EEPROM</span>
  executed = EEPROM.get(addr1, executed);

  VoltageFunction1();
  VoltageFunction2();
  PressionFunction1();

  StateLevel = (!digitalRead(FuelLevel));

  <span class="cm">// Guard: only start if not already running</span>
  <span class="kw">if</span> (StateRelay_1 == <span class="nu">1</span> && started == <span class="nu">0</span>) Start();

  <span class="cm">// Guard: only stop if currently running</span>
  <span class="kw">if</span> (StateRelay_2 == <span class="nu">1</span> && started == <span class="nu">1</span>) OffMotor();
}

<span class="cm">// Start() — 500 ms key pulse + EEPROM persistence</span>
<span class="kw">void</span> <span class="nl">Start</span>() {
  digitalWrite(Relay_1, LOW);    <span class="cm">// energise starter relay</span>
  digitalWrite(Relay_4, LOW);    <span class="cm">// oil pump ON</span>
  started = <span class="nu">1</span>;
  EEPROM.update(addr, started);  <span class="cm">// persist across power cycles</span>
  timer.setTimeout(<span class="nu">500</span>, turnRelay1Off);  <span class="cm">// release after 500 ms</span>
}

<span class="cm">// Stop sequence: stop pulse → 5 s → 3 s cooldown</span>
<span class="kw">void</span> <span class="nl">OffMotor</span>() {
  digitalWrite(Relay_2, LOW);
  started = <span class="nu">0</span>;
  EEPROM.update(addr, started);
  timer.setTimeout(<span class="nu">550</span>, turnRelay2Off);   <span class="cm">// release stop relay</span>
  <span class="cm">// turnRelay2Off() → setTimeout(5000, turnRelay3ON)</span>
  <span class="cm">// turnRelay3ON()  → setTimeout(3000, turnRelay3OFF)</span>
}
</code></pre>
</div>

<hr class="section-divider">

<!-- ═══════════════════════════════════════════════════════════════
     RESULTS
═══════════════════════════════════════════════════════════════ -->
<span class="section-label">04 — Results &amp; Impact</span>

## Outcomes

<div class="metrics-section">
  <h3 style="margin-top: 0; color: var(--color-text);">Key Metrics — 6 months production deployment</h3>
  <div class="metrics-grid">
    <div class="metric-card">
      <div class="metric-number">99.2%</div>
      <p class="metric-desc">System uptime</p>
      <div class="metric-detail">6-month deployment, rural environment</div>
    </div>
    <div class="metric-card">
      <div class="metric-number">7 → 1</div>
      <p class="metric-desc">Site visits / week</p>
      <div class="metric-detail">86% reduction in operational overhead</div>
    </div>
    <div class="metric-card">
      <div class="metric-number">2.3 km</div>
      <p class="metric-desc">Wireless range achieved</p>
      <div class="metric-detail">Rural terrain, 868 MHz, 20 dBm</div>
    </div>
    <div class="metric-card">
      <div class="metric-number">3</div>
      <p class="metric-desc">Low-pressure events caught</p>
      <div class="metric-detail">Each would have caused engine damage</div>
    </div>
    <div class="metric-card">
      <div class="metric-number">&lt;€150</div>
      <p class="metric-desc">Total hardware cost</p>
      <div class="metric-detail">vs €5,000+ commercial alternatives</div>
    </div>
    <div class="metric-card">
      <div class="metric-number">0</div>
      <p class="metric-desc">Engine modifications</p>
      <div class="metric-detail">100% non-invasive retrofit</div>
    </div>
  </div>
</div>

<figure class="project-figure">
  <img src="{{ '/assets/images/projects/agriot/enclosure_wiring.jpg' | relative_url }}"
       alt="Weatherproof enclosure open showing PCB, relay board, Arduino, and cable management installed on engine frame"
       style="max-width:500px; width:100%; border-radius:10px; display:block; margin: 0 auto;">
  <figcaption style="font-size:0.82rem; color:var(--color-text-secondary); margin-top:0.5rem; text-align:center;">
    Control node installed on the engine frame — custom PCB and relay board housed in a weatherproof enclosure with labelled wiring runs to sensors and actuators
  </figcaption>
</figure>

<hr class="section-divider">

<!-- ═══════════════════════════════════════════════════════════════
     TECHNICAL DEEP DIVE (collapsible)
═══════════════════════════════════════════════════════════════ -->
<span class="section-label">05 — Technical Deep Dive</span>

<div class="deep-dive">
  <button class="deep-dive-toggle" aria-expanded="false" onclick="toggleDeepDive(this)">
    <span>Full Specifications &amp; Schematics</span>
    <svg class="chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="6,9 12,15 18,9"/>
    </svg>
  </button>
  <div class="deep-dive-body">

    <h4 style="color: var(--color-text); margin-bottom: 1rem;">Component Specifications</h4>
    <table class="specs-table">
      <tbody>
        <tr><td>Gateway MCU</td><td>ESP32 TTGO LoRa v2 (dual-core 240 MHz, 4 MB flash)</td></tr>
        <tr><td>Node MCU</td><td>Arduino Nano — ATmega328P, 16 MHz, 32 KB flash, 2 KB SRAM</td></tr>
        <tr><td>LoRa Module</td><td>RFM95W — SX1276, 868 MHz ISM band</td></tr>
        <tr><td>TX Power</td><td>20 dBm (100 mW) — max legal limit EU 868 MHz</td></tr>
        <tr><td>LoRa Bandwidth</td><td>125 kHz · SF7 · CR 4/5</td></tr>
        <tr><td>Range (tested)</td><td>2.3 km, rural terrain, no line of sight</td></tr>
        <tr><td>Telemetry interval</td><td>60 s + event-triggered after any relay change</td></tr>
        <tr><td>Relay outputs</td><td>8× SPDT 10 A 250 VAC — start, stop, cooldown, oil pump, throttle, brake, valve, aux</td></tr>
        <tr><td>Power rail</td><td>12 V battery → LM2596 buck (5 V, 3 A) → LM1117-3.3 LDO (3.3 V, 800 mA)</td></tr>
        <tr><td>Voltage sensing</td><td>22 kΩ / 4.7 kΩ resistor divider, 100-sample ADC average</td></tr>
        <tr><td>Pressure sensing</td><td>Analog transducer 0–10 bar, calibration: <code>raw × 5000 mV × 0.0028 / 1023</code></td></tr>
        <tr><td>RPM sensing</td><td>Hall effect on alternator fan, hardware interrupt (INT1), 1 s counting window</td></tr>
        <tr><td>State persistence</td><td>ATmega328P EEPROM (1 KB), updated on every state change</td></tr>
        <tr><td>Cloud platform</td><td>Blynk IoT — virtual pins V1–V24, LED widgets, value displays</td></tr>
        <tr><td>PCB</td><td>Custom 2-layer, screw terminals, ground plane, flyback diodes on relay coils</td></tr>
      </tbody>
    </table>

    <h4 style="color: var(--color-text); margin: 1.5rem 0 1rem;">PCB Schematic — V3.0</h4>
    <figure class="project-figure">
      <a href="{{ '/assets/docs/agriot/schematic_v3.pdf' | relative_url }}" target="_blank" rel="noopener" title="Open full schematic PDF">
        <img src="{{ '/assets/images/projects/agriot/schematic_v3.jpg' | relative_url }}"
             alt="EasyEDA schematic PCB Motor LoRa WiFi V3.0 showing Arduino Nano, RFM95 LoRa, LM2596 buck, LM1117T-3.3 LDO, ESP-01, relay terminals and sensor inputs"
             style="width:100%; border-radius:10px; display:block; cursor:zoom-in;">
      </a>
      <figcaption style="font-size:0.82rem; color:var(--color-text-secondary); margin-top:0.5rem; text-align:center;">
        PCB Motor LoRa WiFi V3.0 — EasyEDA, 2022. Click to open full schematic PDF.
        <a href="{{ '/assets/docs/agriot/schematic_v1.pdf' | relative_url }}" target="_blank" rel="noopener"
           style="margin-left:1rem; color:var(--color-primary);">V1 schematic (2020)</a>
      </figcaption>
    </figure>

    <p style="margin-top: 1.5rem;">
      <a href="https://github.com/SLopezBegines/AgrIoT-Smart-Motor-Control" class="btn btn-outline" target="_blank" rel="noopener" style="font-size: 0.9rem; padding: 0.6rem 1.5rem;">
        View full source on GitHub
      </a>
    </p>

  </div>
</div>

<hr class="section-divider">

<!-- ═══════════════════════════════════════════════════════════════
     SKILLS
═══════════════════════════════════════════════════════════════ -->
<span class="section-label">06 — Skills &amp; Technologies</span>

## Technologies Used

<div class="skills-section">
  <div class="skill-group">
    <div class="skill-group-label">Hardware</div>
    <div class="badge-group">
      <span class="skill-badge badge-hw">ESP32</span>
      <span class="skill-badge badge-hw">Arduino Nano</span>
      <span class="skill-badge badge-hw">ATmega328P</span>
      <span class="skill-badge badge-hw">RFM95W LoRa</span>
      <span class="skill-badge badge-hw">PCB Design</span>
      <span class="skill-badge badge-hw">Relay Drivers</span>
      <span class="skill-badge badge-hw">Sensor Integration</span>
      <span class="skill-badge badge-hw">Power Electronics</span>
    </div>
  </div>
  <div class="skill-group">
    <div class="skill-group-label">Software</div>
    <div class="badge-group">
      <span class="skill-badge badge-sw">C/C++</span>
      <span class="skill-badge badge-sw">Arduino Framework</span>
      <span class="skill-badge badge-sw">ArduinoJson</span>
      <span class="skill-badge badge-sw">EEPROM Persistence</span>
      <span class="skill-badge badge-sw">Hardware Interrupts</span>
      <span class="skill-badge badge-sw">State Machines</span>
      <span class="skill-badge badge-sw">Timed Sequences</span>
    </div>
  </div>
  <div class="skill-group">
    <div class="skill-group-label">Protocols &amp; Systems</div>
    <div class="badge-group">
      <span class="skill-badge badge-proto">LoRa 868 MHz</span>
      <span class="skill-badge badge-proto">JSON Telemetry</span>
      <span class="skill-badge badge-proto">WiFi / HTTPS</span>
      <span class="skill-badge badge-proto">Blynk IoT</span>
      <span class="skill-badge badge-proto">Addressed Packet Routing</span>
      <span class="skill-badge badge-proto">Bidirectional Comms</span>
    </div>
  </div>
  <div class="skill-group">
    <div class="skill-group-label">Tools &amp; Process</div>
    <div class="badge-group">
      <span class="skill-badge badge-tool">KiCad</span>
      <span class="skill-badge badge-tool">Arduino IDE</span>
      <span class="skill-badge badge-tool">Git</span>
      <span class="skill-badge badge-tool">Field Deployment</span>
      <span class="skill-badge badge-tool">Legacy System Integration</span>
    </div>
  </div>
</div>

<hr class="section-divider">

<!-- ═══════════════════════════════════════════════════════════════
     NEXT STEPS / CTA
═══════════════════════════════════════════════════════════════ -->
<span class="section-label">07 — Next Steps</span>

## Planned Improvements

<ul class="next-steps">
  <li>Migrate from Blynk to a self-hosted MQTT broker (Mosquitto) — removes cloud dependency and 60-event/day limit</li>
  <li>Add a watchdog timer on the Arduino Nano to auto-reset on firmware hang</li>
  <li>Replace Blynk dashboard with a lightweight Grafana + InfluxDB stack for historical trending and anomaly detection</li>
  <li>Implement LoRa ACK with retry — current implementation fires-and-forgets; critical commands (start/stop) should confirm delivery</li>
  <li>Solar panel + LiPo battery backup for gateway node — removes dependence on mains power at farmhouse</li>
</ul>

<div class="cta-box">
  <h3>Interested in similar work?</h3>
  <p>This project demonstrates the same skills required for medical device integration, laboratory automation, and embedded telemetry in regulated environments — sensor conditioning, reliable wireless protocols, state persistence, and non-invasive retrofitting to legacy hardware.</p>
  <div class="cta-links">
    <a href="https://github.com/SLopezBegines/AgrIoT-Smart-Motor-Control" class="btn btn-primary" target="_blank" rel="noopener">View on GitHub</a>
    <a href="/#contact" class="btn btn-outline">Get in touch</a>
  </div>
</div>

<!-- ═══════════════════════════════════════════════════════════════
     JAVASCRIPT
═══════════════════════════════════════════════════════════════ -->
<script>
/* ── Copy-to-clipboard ──────────────────────────────────────── */
function copyCode(btn) {
  const pre = btn.closest('.code-block-wrapper').querySelector('pre');
  const text = pre.innerText || pre.textContent;
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = 'Copy';
      btn.classList.remove('copied');
    }, 2000);
  });
}

/* ── Collapsible deep dive ──────────────────────────────────── */
function toggleDeepDive(btn) {
  const body = btn.nextElementSibling;
  const expanded = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', !expanded);
  body.classList.toggle('open', !expanded);
}

/* ── Intersection Observer — fade-in on scroll ─────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const targets = document.querySelectorAll(
    '.stat-card, .metric-card, .feature-list li, .skill-badge'
  );
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    io.observe(el);
  });
});
</script>
