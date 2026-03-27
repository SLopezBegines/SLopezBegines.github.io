---
layout: default
title: Blog
permalink: /blog/
---

<section style="padding: 4rem 0;">
    <div class="container">
        <h1 class="section-title">Blog</h1>
        <p style="text-align: center; max-width: 600px; margin: 0 auto 3rem; color: var(--color-text-secondary);">
            Technical articles on biomedical data science, machine learning pipelines, and reproducible research.
        </p>

        <div style="max-width: 900px; margin: 0 auto;">
            {% for post in site.posts %}
            <div class="project-card" style="margin-bottom: 2rem;">
                <h2><a href="{{ post.url }}" style="color: var(--color-text);">{{ post.title }}</a></h2>
                <p style="color: var(--color-text-secondary); font-size: 0.9rem; margin-bottom: 1rem;">
                    {{ post.date | date: "%B %d, %Y" }}
                    {% if post.reading_time %} · {{ post.reading_time }} min read{% endif %}
                </p>
                <p>{{ post.excerpt }}</p>
                <div class="project-tags" style="margin-top: 1rem;">
                    {% for tag in post.tags %}
                    <span class="tag">{{ tag }}</span>
                    {% endfor %}
                </div>
                <a href="{{ post.url }}" class="project-link" style="margin-top: 1rem; display: inline-block;">
                    Read more <i class="fas fa-arrow-right"></i>
                </a>
            </div>
            {% endfor %}
        </div>
    </div>
</section>
---
layout: default
title: Blog
permalink: /blog/
---

<section style="padding: 4rem 0;">
    <div class="container">
        <h1 class="section-title">Blog</h1>
        <p style="text-align: center; max-width: 600px; margin: 0 auto 3rem; color: var(--color-text-secondary);">
            Technical articles on biomedical data science, machine learning pipelines, and reproducible research.
        </p>

        <div style="max-width: 900px; margin: 0 auto;">
            {% if site.posts.size > 0 %}
                {% for post in site.posts %}
                <div class="project-card" style="margin-bottom: 2rem;">
                    <h2><a href="{{ post.url }}" style="color: var(--color-text);">{{ post.title }}</a></h2>
                    <p style="color: var(--color-text-secondary); font-size: 0.9rem; margin-bottom: 1rem;">
                        {{ post.date | date: "%B %d, %Y" }}
                        {% if post.reading_time %} · {{ post.reading_time }} min read{% endif %}
                    </p>
                    <p>{{ post.excerpt }}</p>
                    <div class="project-tags" style="margin-top: 1rem;">
                        {% for tag in post.tags %}
                        <span class="tag">{{ tag }}</span>
                        {% endfor %}
                    </div>
                    <a href="{{ post.url }}" class="project-link" style="margin-top: 1rem; display: inline-block;">
                        Read more <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
                {% endfor %}
            {% else %}
                <!-- Coming Soon Message -->
                <div class="project-card" style="text-align: center; padding: 4rem 2rem;">
                    <h2 style="color: var(--color-primary); margin-bottom: 1rem;">Coming Soon</h2>
                    <p style="color: var(--color-text-secondary); font-size: 1.1rem; max-width: 500px; margin: 0 auto;">
                        Technical articles on proteomics pipelines, electrophysiology analysis, 
                        and machine learning for biomedical data science.
                    </p>
                    <p style="margin-top: 2rem;">
                        <a href="/#contact" class="btn btn-primary">Get notified when we publish</a>
                    </p>
                </div>
            {% endif %}
        </div>
    </div>
</section>
