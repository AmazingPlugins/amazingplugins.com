# AmazingPlugins — pSEO Page Taxonomy

**Date:** 2026-04-12
**Purpose:** Document the programmatic SEO (pSEO) strategy — auto-generated pages targeting keyword clusters

---

## What is pSEO

pSEO means generating hundreds of landing pages programmatically, each targeting a specific long-tail keyword or cluster. Unlike blog posts (dated, narrative), pSEO pages are structured landing pages optimized for search intent.

**pSEO vs Blog:**
- Blog: narrative, date-stamped, author voice, evergreen over months
- pSEO page: structured, keyword-targeted, no date, conversion-focused

For AmazingPlugins, pSEO pages serve the "comparison/alternative" intent — users searching for "best X for Y" or "X vs Y" or "top X alternatives."

---

## Page Taxonomy (Phase 1)

### Cluster A: WooCommerce Bulk Editing

| URL | Primary Keyword | Intent |
|---|---|---|
| `/pseo/best-woocommerce-bulk-edit-plugins` | best woocommerce bulk edit plugins | Commercial — comparing options |
| `/pseo/woocommerce-bulk-edit-variations` | woocommerce bulk edit variations | Informational + product |
| `/pseo/woocommerce-product-bulk-edit` | woocommerce product bulk edit | Informational |
| `/pseo/bulk-edit-woocommerce-prices` | woocommerce bulk edit prices | Informational/transactional |
| `/pseo/woocommerce-bulk-edit-free` | woocommerce bulk edit free | Commercial — free tool intent |
| `/pseo/woocommerce-bulk-edit-plugin-free` | woocommerce bulk edit plugin free | Commercial — free tool intent |
| `/pseo/woocommerce-product-editor` | woocommerce product editor | Informational/commercial |

### Cluster B: Accessibility

| URL | Primary Keyword | Intent |
|---|---|---|
| `/pseo/best-woocommerce-accessibility-plugins` | best woocommerce accessibility plugins | Commercial — comparing |
| `/pseo/woocommerce-accessibility-checker` | woocommerce accessibility checker | Informational |
| `/pseo/woocommerce-wcag-compliance` | woocommerce wcag compliance | Informational/transactional |
| `/pseo/woocommerce-ada-compliance` | woocommerce ada compliance | Informational/transactional |
| `/pseo/accessibility-overlay-alternative` | accessibility overlay alternative | Commercial — switching intent |

### Cluster C: Shopify

| URL | Primary Keyword | Intent |
|---|---|---|
| `/pseo/best-shopify-accessibility-apps` | best shopify accessibility apps | Commercial — comparing |
| `/pseo/shopify-wcag-compliance` | shopify wcag compliance | Informational |
| `/pseo/shopify-ada-compliance` | shopify ada compliance | Informational |

### Cluster D: Competitor Alternatives

| URL | Primary Keyword | Intent |
|---|---|---|
| `/pseo/smart-manager-alternative` | smart manager woocommerce alternative | Commercial — switching |
| `/pseo/bear-plugin-alternative` | bear bulk edit alternative | Commercial — switching |
| `/pseo/wp-sheet-editor-alternative` | wp sheet editor alternative | Commercial — switching |
| `/pseo/elex-woocommerce-bulk-edit-alternative` | elex bulk edit alternative | Commercial — switching |
| `/pseo/accessibe-alternative` | accessibe alternative | Commercial — switching |

---

## Page Structure Template

Each pSEO page follows this template:

```markdown
# [Primary Keyword]

[2-3 sentence intro — what is this, who is it for]

## [Problem Statement]
[1-2 paragraphs — the pain point this keyword represents]

## [What to Look For in a Solution]
[Bulleted criteria — what separates good from bad tools]

## [Top Alternatives Compared]
[Comparison table or structured list — 3-5 alternatives]

## [How to Get Started]
[1-2 paragraphs — actionable next steps, mention AmazingPlugins naturally]

## [FAQ]
[5-6 common questions about this topic]

---
*Last updated: [month year]*
*Explore more at [amazingplugins.com](/)*
```

**Key rules:**
- Never keyword-stuff. Use the primary keyword 3-5 times naturally.
- No fabricated statistics. Only cite what you know to be true.
- Internal link to the relevant plugin page AND at least one blog post.
- End with a soft CTA, not a hard sell.

---

## Implementation Notes

**ISR (Incremental Static Regeneration):** Each page revalidates every 3600 seconds (1 hour). This keeps content fresh without sacrificing performance. Set `revalidate: 3600` in the page's config.

**Generation approach:** These pages can be generated from a shared component + data file:

```
app/pseo/[term]/page.tsx
  → uses a shared pSEO layout component
  → pulls content from data/pseo/[term].json
  → renders with SEO metadata
```

No need to manually create each page. A single dynamic route catches all `/pseo/[term]` URLs.

** sitemap.xml:** All pSEO pages must be in the sitemap so Google discovers them.

** robots.txt:** Allow all pSEO pages.

---

## Out of Scope for pSEO

- Pages for individual blog posts (blog handles those)
- Pages targeting singular product names (plugin landing pages handle those)
- Pages for every long-tail variant (prioritize clusters with search volume evidence first)
- Non-English pages (add after English market traction)

---

## Success Metrics

| Metric | Target |
|---|---|
| pSEO pages indexed | 50%+ within 30 days of launch |
| Organic clicks from pSEO pages (GSC) | 200+ within 90 days |
| pSEO page CTR | 3%+ (measure in GSC) |
| Conversions from pSEO pages | Track via UTM, target 1%+ |
