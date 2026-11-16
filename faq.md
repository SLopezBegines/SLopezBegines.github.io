---
layout: default
title: FAQ
permalink: /faq/
excerpt: "Answers about services, deliverables, data formats, tools and reproducibility for biomedical data science consulting."
---

<section class="faq-page">
    <div class="container">
        <h1 class="section-title">Frequently asked questions</h1>
        <p class="faq-intro">
            What I do, who I work with and what you get at the end of a project.
        </p>

        <div class="faq-list">
            {% for item in site.data.faq %}
            <details class="faq-item">
                <summary>{{ item.question }}</summary>
                <p>{{ item.answer }}</p>
                {% if item.link %}<a class="faq-link" href="{{ item.link.url }}">{{ item.link.text }} <i class="fas fa-arrow-right"></i></a>{% endif %}
            </details>
            {% endfor %}
        </div>
    </div>
</section>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{% for item in site.data.faq %}
    {
      "@type": "Question",
      "name": {{ item.question | jsonify }},
      "acceptedAnswer": { "@type": "Answer", "text": {{ item.answer | jsonify }} }
    }{% unless forloop.last %},{% endunless %}{% endfor %}
  ]
}
</script>
