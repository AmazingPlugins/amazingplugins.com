# Asset Design Brief — AmazingPlugins

**For:** Logo, icon, banner, plugin screenshots
**Date:** 2026-04-13
**Designer:** External designer or Harun

---

## Brand Overview

**Name:** AmazingPlugins
**Tagline:** Accessibility tools for WooCommerce and Shopify
**Tone:** Direct, competent, indie developer — not corporate, not startup-y. Think: a well-crafted tool made by someone who knows what they're doing.
**Audience:** WooCommerce and Shopify merchants, store managers, developers
**Color direction:** Clean, professional, trustworthy. Blue is safe but overused. Consider a distinctive accent color that conveys accessibility without being cliché (no blue-and-white "accessibility" tropes).

---

## Required Assets

### 1. App Icon (WordPress.org + Shopify App Store)

**Use:** Plugin icon in WordPress.org directory, Shopify App Store listing, favicon
**Required sizes:**
- WordPress.org: 128×128px (`icon-128x128.png`) + 256×256px retina (`icon-256x256.png`)
- Shopify: 1200×1200px (App Store listing)
- General: SVG version for scalability

**Style direction:**
- Simple, bold, recognizable at small sizes
- Consider: a stylized "A" with an accessibility element (like a checkmark, eye, or accessibility symbol abstracted)
- No text in the icon
- No gradients (hard to see at small sizes)
- Solid background (not transparent for WordPress)
- Colors: 2-3 max. Match or complement brand accent color.

**What to avoid:**
- Clip art, stock imagery
- Generic "tool" icon (wrench, gear)
- Text (icon needs to work without a name)
- Multiple concepts (one idea, executed well)

---

### 2. WordPress Plugin Banner

**Use:** Top of WordPress.org plugin page
**Required sizes:**
- `banner-772x250.png` (standard, 772px × 250px)
- `banner-1544x500.png` (2x retina)
- Optional RTL: `banner-772x250-rtl.png`

**Style direction:**
- Clean product screenshot mockup style
- Show the plugin's admin interface or the accessibility features in action
- Keep text minimal — the plugin page copy does the selling
- Light background (WordPress admin is light)
- Include the AmazingPlugins wordmark or "AmazingPlugins" text somewhere subtle

**Layout ideas:**
- Before/after accessibility scan result
- Plugin dashboard showing fixed issues
- Side-by-side: inaccessible store vs accessible store
- Clean product UI screenshot

**Note for RTL:** Design elements should work in both directions. Keep central focus.

---

### 3. Shopify App Store Feature Media

**Use:** Shopify App Store listing (appears in app card and listing page)
**Required sizes:**
- App icon: 1200×1200px (same as above)
- Feature images: 1600×900px (16:9 ratio), up to 6 images
- Video: 2-3 minutes (optional but recommended for Shopify)

**Feature image style:**
- One focal point per image
- Solid backgrounds with good contrast (4.5:1 ratio minimum — ironic but true)
- App functionality shown, not lifestyle
- Keep text minimal
- No Shopify logos or trademarks

---

### 4. WordPress Plugin Screenshots

**Use:** WordPress.org plugin page (shown in the screenshot carousel)
**Required:**
- 1600×900px or similar 16:9 ratio
- Numbered sequentially: `screenshot-1.png`, `screenshot-2.png`, etc.
- Each screenshot must correspond to a line in `readme.txt`

**Suggested screenshots (WooCommerce Accessibility Fixer):**
1. Dashboard showing accessibility score + issues found
2. Fixer settings (which fixers to enable/disable)
3. Scan results with issues listed
4. Individual fixer in action (e.g., alt text being added)
5. Usage stats / usage meter

**Style:**
- Real screenshots from the plugin admin
- Clean up any sensitive test data first
- Add annotations or arrows sparingly if needed to highlight features
- Keep consistent aspect ratio and sizing

---

### 5. Blog Post Featured Images

**Use:** Featured image for each blog post (Open Graph + social sharing)
**Size:** 1200×630px (Open Graph recommended)
**Style:**
- Simple, bold, text-readable at small sizes
- Match brand color palette
- Include blog post title or key concept
- No generic stock photos
- Consistent style across all posts (recognizable as AmazingPlugins content)

---

### 6. Homepage Hero Visual

**Use:** Main landing page hero section
**Style:**
- Can be a simple graphic or illustration
- Should communicate "accessibility made simple"
- Consider: a storefront with accessibility indicators overlaid
- Or: abstract representation of code becoming accessible

---

## Color Palette Direction (For Designer)

**Preference:** Let the designer propose, but here's what to avoid:
- ✅ Good: A distinctive teal/cyan accent, or a warm orange
- ❌ Avoid: Pure blue (#0055ff type) — too corporate, too overused in accessibility tools
- ❌ Avoid: Green-only (looks like "safe/passed" rather than brand)
- ❌ Avoid: Purple-gradient startup aesthetic

**Suggestion:** 
- Base: Clean white/light gray (#FAFAFA or similar)
- Text: Dark gray (near-black, #1A1A2E or similar)
- Accent: A distinctive color — perhaps a warm amber (#F59E0B) or teal (#0D9488)
- Secondary: A muted complementary tone

---

## Typography Direction

- Clean sans-serif for headings (Inter, system-ui stack, or similar — not a Google Font that adds tracking)
- Body text: System font stack (best performance, no external requests)
- Hero headline: Bold, large, possibly all-caps or semibold
- Avoid: Playful scripts, serif fonts (not appropriate for developer tools)

---

## WordPress Plugin Readme.txt Notes

**Key copy points for readme.txt:**
- Short description (150 chars): "Automatically fixes WCAG 2.1 AA accessibility issues on your WooCommerce store."
- Installation: Standard (upload to plugins folder, activate)
- FAQ: Based on the FAQ schema in docs/marketing/structured-data.md
- Changelog: Standard format
- Screenshots: Match the descriptions in readme.txt line-by-line

The readme.txt should be written to WordPress.org standards and validated at:
https://wordpress.org/plugins/developers/readme-validator/

---

## Deliverables Summary

| Asset | Format | Size | Quantity |
|---|---|---|---|
| Plugin icon | PNG + SVG | 128×128, 256×256, 1200×1200 | 3 + SVG |
| WordPress banner | PNG | 772×250, 1544×500 (+ RTL) | 2-3 |
| Shopify feature images | PNG/JPEG | 1600×900 | 3-6 |
| Plugin screenshots | PNG | 1600×900 | 5-6 |
| Blog featured images | PNG/JPEG | 1200×630 | 1 per post |
| Homepage hero visual | SVG or PNG | TBD | 1 |
