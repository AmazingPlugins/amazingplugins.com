# Astro Site Scaffold Plan

**For:** `npm create astro@latest` — Harun runs this when back at Mac
**Stack:** Astro.js + Vercel + Cloudflare DNS/CDN
**Date:** 2026-04-14

---

## What to Run

```bash
# 1. Create the Astro project (in amazingplugins repo)
cd ~/Work/amazingplugins
npm create astro@latest marketing-site \
  -- --template minimal \
  --no-install \
  --no-git

# 2. Move files to project root
mv marketing-site/* .
mv marketing-site/.* . 2>/dev/null || true
rmdir marketing-site

# 3. Install dependencies
npm install

# 4. Install additional packages we need
npm install \
  @astrojs/sitemap \
  @astrojs/check \
  typescript

# 5. Dev server
npm run dev
```

---

## Project Structure

```
amazingplugins/
├── public/
│   ├── fonts/
│   ├── images/
│   │   ├── products/
│   │   │   ├── woo-accessibility-fixer/
│   │   │   │   ├── icon-128.png      (WordPress.org icon)
│   │   │   │   ├── banner-772.png    (WordPress.org banner)
│   │   │   │   └── screenshots/       (plugin screenshots)
│   │   │   └── order-fixer/
│   │   └── blog/                      (blog featured images)
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── FeatureCard.astro
│   │   ├── PricingTable.astro
│   │   ├── BlogCard.astro
│   │   ├── ComparisonTable.astro
│   │   ├── Accordion.astro
│   │   ├── AccordionItem.astro
│   │   ├── SignupForm.astro
│   │   ├── SkipLink.astro
│   │   └── Head.astro
│   ├── layouts/
│   │   ├── BaseLayout.astro           (HTML shell, Head, Header, Footer)
│   │   └── BlogLayout.astro           (blog post layout)
│   ├── pages/
│   │   ├── index.astro                (homepage)
│   │   ├── plugins/
│   │   │   ├── index.astro            (plugins overview)
│   │   │   ├── woocommerce-accessibility-fixer.astro
│   │   │   ├── order-fixer-for-woocommerce.astro
│   │   │   └── woocommerce-bulk-editor.astro
│   │   ├── blog/
│   │   │   ├── index.astro            (blog list)
│   │   │   └── [...slug].astro        (blog post)
│   │   ├── pseo/
│   │   │   └── [term].astro           (pSEO pages)
│   │   ├── privacy.astro
│   │   ├── terms.astro
│   │   └── 404.astro
│   ├── content/
│   │   ├── config.ts                 (Content Collections schema)
│   │   └── blog/                      (markdown blog posts)
│   │       ├── woocommerce-bulk-edit-plugins-compared.md
│   │       ├── bulk-edit-woocommerce-product-prices.md
│   │       ├── bulk-edit-woocommerce-variations.md
│   │       ├── woocommerce-bulk-edit-not-working.md
│   │       ├── woocommerce-ada-compliance.md
│   │       └── shopify-store-accessibility.md
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── tsconfig.json
├── package.json
└── .env                               (gitignored, set locally)
```

---

## astro.config.mjs

```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://amazingplugins.com',
  output: 'static',
  integrations: [
    sitemap(),
  ],
  // Cloudflare adapter if needed for SSR, but static is simpler
  // For now: pure static output, deploy to Vercel as-is
});
```

---

## Key Pages (Priority Order)

### 1. Homepage (`index.astro`)
Sections: Hero → Pain statement → Features (3 products) → Social proof → CTA → Footer

### 2. WooCommerce Accessibility Fixer (`/plugins/woocommerce-accessibility-fixer.astro`)
Sections: Hero → What it fixes (10 fixers) → Free vs Pro pricing → FAQ → CTA

### 3. Blog Index (`/blog/index.astro`)
Simple list of all blog posts with featured image, title, excerpt, date

### 4. Blog Post (`/blog/[...slug].astro`)
Layout: BlogLayout with full-width content, table of contents sidebar, related posts

### 5. Privacy + Terms
Standard legal pages

---

## Content Collections Schema

```ts
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),       // meta description
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    author: z.string().default('Harun Ray'),
    image: z.string().optional(),  // featured image
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { blog };
```

---

## Markdown Frontmatter (Blog Posts)

```yaml
---
title: "The 6 Best WooCommerce Bulk Edit Plugins Compared (2026)"
description: "Stop wasting hours editing WooCommerce products one by one. We tested the 6 best bulk edit plugins — here's what works, what doesn't, and which one fits your store."
pubDate: 2026-05-01
author: "Harun Ray"
image: "/images/blog/woocommerce-bulk-edit-plugins-compared.jpg"
tags: ["woocommerce", "bulk-edit", "plugins"]
---
```

---

## Env Vars (`.env`)

```
PUBLIC_API_URL=https://api.amazingplugins.com
PUBLIC_SITE_URL=https://amazingplugins.com
PUBLIC_PLAUSIBLE_SCRIPT=https://plausible.io/js/script.js
```

---

## Deployment Steps (After Scaffold)

1. Push to GitHub: `amazingplugins/amazingplugins.com`
2. Connect repo to Vercel (vercel.com → New Project → Import GitHub repo)
3. Add env vars in Vercel dashboard
4. Deploy — Vercel auto-detects Astro
5. Cloudflare DNS: add CNAME for `amazingplugins.com` → `cname.vercel-dns.com`
6. Cloudflare SSL/TLS: Full (encrypts all traffic)

---

## Responsive Breakpoints (Mobile-First)

```css
/* Base (mobile): 375px */
/* Tablet: 768px */
/* Desktop: 1024px */
/* Wide: 1280px */

@media (min-width: 768px) { /* tablet */ }
@media (min-width: 1024px) { /* desktop */ }
@media (min-width: 1280px) { /* wide */ }
```

---

## Accessibility Requirements (Built Into Every Component)

- Skip-to-content link on every page (first focusable element)
- All images: meaningful `alt` or `alt=""` for decorative
- Every form input: visible `<label>`, never placeholder-only
- Focus indicators: visible on every interactive element
- Heading hierarchy: H1 → H2 → H3, no levels skipped
- Touch targets: minimum 44×44px
- Color contrast: 4.5:1 minimum for body text
- `prefers-reduced-motion`: disable all animations
- ARIA landmarks: one `<main>`, one `<header>`, one `<footer>`, nav with `aria-label`
