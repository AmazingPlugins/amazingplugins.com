# Sitemap Plan — amazingplugins.com

**For:** Astro.js build, GSC submission
**Date:** 2026-04-13
**Status:** Ready for dev handoff

**Subdomains:**
- `cloud.amazingplugins.com` — API dashboard / server management (VPS)
- `api.amazingplugins.com` — REST API backend (VPS)

---

## Pages to Build

### Priority 1 (Day 1 Launch)

| URL | Type | Title | Target Keyword | Priority |
|---|---|---|---|---|
| `/` | SSG | AmazingPlugins — WooCommerce & Shopify Accessibility Tools | — | High |
| `/plugins/woocommerce-accessibility-fixer` | SSG | WooCommerce Accessibility Fixer — Auto-fix WCAG 2.1 AA | woocommerce accessibility plugin | High |
| `/blog` | SSG | AmazingPlugins Blog — WooCommerce & Shopify Accessibility | — | Medium |
| `/privacy` | SSG | Privacy Policy | — | Low |
| `/terms` | SSG | Terms of Service | — | Low |

### Priority 2 (Week 1)

| URL | Type | Title | Target Keyword | Priority |
|---|---|---|---|---|
| `/plugins/woocommerce-bulk-editor` | SSG | WooCommerce Smart Bulk Editor — Bulk Edit Everything | woocommerce bulk edit plugin | High |
| `/blog/woocommerce-bulk-edit-plugins-compared` | SSG | The 6 Best WooCommerce Bulk Edit Plugins Compared (2026) | woocommerce bulk edit plugin | High |
| `/pseo/best-woocommerce-bulk-edit-plugins` | SSG (static) | Best WooCommerce Bulk Edit Plugins — pSEO | best woocommerce bulk edit plugins | High |
| `/pseo/woocommerce-bulk-edit-variations` | SSG (static) | WooCommerce Bulk Edit Variations — pSEO | woocommerce bulk edit variations | Medium |
| `/pseo/woocommerce-product-management` | SSG (static) | WooCommerce Product Management — pSEO | woocommerce product management | Medium |

### Priority 3 (Week 2-3)

| URL | Type | Title | Target Keyword | Priority |
|---|---|---|---|---|
| `/blog/bulk-edit-woocommerce-product-prices` | SSG | How to Bulk Edit WooCommerce Product Prices | bulk edit woocommerce product prices | Medium |
| `/blog/bulk-edit-woocommerce-variations` | SSG | How to Bulk Edit WooCommerce Variations | bulk edit woocommerce variations | Medium |
| `/blog/woocommerce-bulk-edit-not-working` | SSG | WooCommerce Bulk Edit Not Working? Here's Why | woocommerce bulk edit not working | Medium |
| `/blog/woocommerce-ada-compliance` | SSG | How to Make Your WooCommerce Store ADA Compliant (2026) | woocommerce ada compliance | Medium |
| `/pseo/shopify-accessibility-apps` | SSG (static) | Best Shopify Accessibility Apps — pSEO | shopify accessibility apps | Medium |
| `/pseo/woocommerce-accessibility-plugins` | SSG (static) | WooCommerce Accessibility Plugins — pSEO | woocommerce accessibility plugins | Medium |

### Priority 4 (Month 2+)

| URL | Type | Title | Target Keyword | Priority |
|---|---|---|---|---|
| `/blog/shopify-store-accessibility` | SSG | How to Make Your Shopify Store Accessible | shopify accessibility | Low |
| `/blog/ecommerce-accessibility-issues` | SSG | 10 Common Accessibility Issues on E-commerce Sites | ecommerce accessibility issues | Low |
| `/blog/accessibility-quick-wins` | SSG | Alt Text, Keyboard Navigation, and Other Quick Wins | woocommerce accessibility quick fixes | Low |
| `/pseo/woocommerce-seo-tools` | SSG (static) | WooCommerce SEO Tools — pSEO | woocommerce seo tools | Low |
| `/pseo/shopify-seo-apps` | SSG (static) | Best Shopify SEO Apps — pSEO | shopify seo apps | Low |

---

## Sitemap XML Structure

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>https://amazingplugins.com/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Plugin Pages -->
  <url>
    <loc>https://amazingplugins.com/plugins/woocommerce-accessibility-fixer</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://amazingplugins.com/plugins/woocommerce-bulk-editor</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Blog Index -->
  <url>
    <loc>https://amazingplugins.com/blog</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Blog Posts -->
  <url>
    <loc>https://amazingplugins.com/blog/woocommerce-bulk-edit-plugins-compared</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://amazingplugins.com/blog/bulk-edit-woocommerce-product-prices</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://amazingplugins.com/blog/bulk-edit-woocommerce-variations</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://amazingplugins.com/blog/woocommerce-bulk-edit-not-working</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://amazingplugins.com/blog/woocommerce-ada-compliance</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- pSEO Pages (SSG (static) -->
  <url>
    <loc>https://amazingplugins.com/pseo/best-woocommerce-bulk-edit-plugins</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://amazingplugins.com/pseo/woocommerce-bulk-edit-variations</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://amazingplugins.com/pseo/woocommerce-product-management</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://amazingplugins.com/pseo/shopify-accessibility-apps</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://amazingplugins.com/pseo/woocommerce-accessibility-plugins</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>

  <!-- Legal -->
  <url>
    <loc>https://amazingplugins.com/privacy</loc>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://amazingplugins.com/terms</loc>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>
```

---

## robots.txt

```txt
User-agent: *
Allow: /

# Block crawling of low-value pages
Disallow: /api/
Disallow: /_next/

# Sitemap
Sitemap: https://amazingplugins.com/sitemap.xml
```

---

## GSC Submission Checklist

Once the site is live:

1. Go to https://search.google.com/search-console
2. Add property: `https://amazingplugins.com`
3. Verify ownership (HTML file upload or DNS record)
4. Submit sitemap: `https://amazingplugins.com/sitemap.xml`
5. Check Coverage report for errors
6. Submit individual URLs for posts/pages if not auto-crawled
7. Check Core Web Vitals in GSC → Performance → Web Vitals
8. Set up email alerts for coverage errors

---

## Internal Linking Strategy

Every page should link to:
- Homepage
- Relevant plugin page
- Relevant blog posts
- Blog index

Each blog post should link to:
- The plugin it relates to
- 2-3 other related blog posts
- Blog index

Each pSEO page should link to:
- The plugin page it relates to
- 1-2 related blog posts
- Blog index

---

## Schema to Add Per Page Type

| Page Type | Schema |
|---|---|
| Homepage | Organization |
| Plugin pages | FAQPage + SoftwareApplication |
| Blog posts | Article + BreadcrumbList |
| pSEO pages | FAQPage + BreadcrumbList |
| Blog index | BreadcrumbList |
