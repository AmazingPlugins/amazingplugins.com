# AmazingPlugins Marketing Site — SPEC.md

**Project:** amazingplugins.com (marketing site)
**Stack:** Astro.js + Vercel (free tier) + Cloudflare DNS/CDN + VPS (backend)
**Date:** 2026-04-14
**Status:** Pre-launch — blog posts 1-6 written, site not yet built

## Products

1. **WooCommerce Accessibility Fixer** — WordPress plugin + Shopify App (accessibility auto-fixer)
2. **Order Fixer for WooCommerce** — edit placed orders without cancelling (v0.1.0 scaffold, v1.0.0 pending)
3. **WooCommerce Bulk Editor** — bulk edit products, prices, variations (not yet scaffolded)

---

## 1. Concept & Vision

AmazingPlugins is an umbrella brand for WooCommerce and Shopify tools built by a solo developer who uses them. The site must communicate: this is a real person shipping quality tools, not a faceless agency. The tone is founder-voice — direct, specific, no fluff. Visitors should feel they are dealing with someone competent who ships things that work.

The site serves two jobs: (1) establish brand trust and authority, (2) convert visitors into email signups or product installs. Everything else is secondary.

---

## 2. Technical Architecture

### Hosting Stack

| Layer | Choice | Reason |
|---|---|---|
| Frontend | **Vercel** (Astro.js, free tier) | Static output, minimal JS, excellent performance, Vercel has native Astro support |
| DNS + CDN | **Cloudflare** (DNS only, no Workers/Pages) | Separation of concerns; move frontends freely |
| Backend API | **Own VPS** (nginx/Docker) | Freemius webhooks, license validation, email, cron |
| Analytics | **Plausible** | Privacy-first, no cookie banner, no Vercel lock-in |

### Portability Strategy

### Portability Strategy

Astro outputs 100% static HTML by default — no Node.js server needed at runtime, no Docker required. Deploy anywhere:
- Vercel (native Astro support, free tier)
- Cloudflare Pages (free, global CDN)
- Netlify (free tier)
- GitHub Pages (free)
- Any static host or VPS (rsync the `dist/` folder)

```bash
npm create astro@latest
npm run build  # outputs to dist/
```

No Vercel-specific packages. No Next.js. Portable.

### Vercel Lock-in Avoidance

| Avoid | Use Instead |
|---|---|
| `@vercel/analytics` | Plausible script snippet |
| Vercel Image Optimization | Standard `<img>` tags + Cloudflare Images |
| Vercel KV / Blob | VPS-hosted Postgres + file storage |
| Vercel-specific env vars | Standard env vars set in Vercel dashboard too |

### Environment Variables (Astro)

```
PUBLIC_API_URL=https://api.amazingplugins.com  # VPS backend (Astro PUBLIC_ prefix)
PUBLIC_SITE_URL=https://amazingplugins.com
PUBLIC_PLAUSIBLE_SCRIPT=https://plausible.io/js/script.js
```

### Architecture Diagram

```
                    cloud.amazingplugins.com
                    (VPS: admin/API, port 9222)
                                ↑
Cloudflare (DNS + CDN)          |
    ↓                    ━━━━━━┛
Vercel (Astro static site, free tier)
    ↓  (calls)
Your VPS (backend: APIs, webhooks, email)
```

**cloud.amazingplugins.com** — management interface for cloud infrastructure, API dashboard, and server admin. Hosted on the VPS.Protected by Cloudflare (DNS CAA records for the API certs).

**Subdomains:**
- `cloud.amazingplugins.com` — API dashboard / server management
- `api.amazingplugins.com` — REST API (VPS backend)

---

## 3. Pages

### Pages List

| Route | Type | Description |
|---|---|---|
| `/` | SSG | Homepage with hero, pain statement, features, CTA |
| `/plugins/woocommerce-accessibility-fixer` | SSG | Plugin landing page (product 1: accessibility fixer) |
| `/plugins/order-fixer-for-woocommerce` | SSG | Plugin landing page (product 2: order fixer) |
| `/plugins/woocommerce-bulk-editor` | SSG | Plugin landing page (product 3: bulk editor) |
| `/blog` | SSG | Blog index |
| `/blog/[slug]` | SSG | Individual blog post |
| `/pseo/[term]` | SSG (static) | pSEO comparison pages (auto-generated at build time) |
| `/privacy` | SSG | Privacy policy |
| `/terms` | SSG | Terms of service |

### Path Aliases (nice-to-have, low priority)

```
/bulk-edit-woocommerce-products       → /plugins/woocommerce-bulk-editor
/accessibility-fix-woocommerce-store  → /plugins/woocommerce-accessibility-fixer
```

---

## 4. SEO & Content

### Keyword Priorities (Phase 1)

**Primary (launch):**
- `woocommerce bulk edit plugin`
- `woocommerce bulk edit variations`
- `best woocommerce bulk edit plugin`

**Secondary (month 1-3):**
- `woocommerce accessibility checker`
- `woocommerce wcag compliance plugin`
- `shopify accessibility app`
- `EU EAA compliance website`

### Blog Post Plan

| # | Topic | Status | Notes |
|---|---|---|---|
| 1 | The 6 Best WooCommerce Bulk Edit Plugins Compared (2026) | ✅ Full draft (1800 words) | Highest-leverage SEO post |
| 2 | How to Bulk Edit WooCommerce Product Prices | ✅ Full draft (1800 words) | Informational, high volume |
| 3 | How to Bulk Edit WooCommerce Variations | ✅ Full draft (1600 words) | Differentiation post |
| 4 | WooCommerce Bulk Edit Not Working? Here's Why | ✅ Full draft (1500 words) | Pain-driven, high intent |
| 5 | How to Make Your WooCommerce Store ADA Compliant (2026) | ✅ Full draft (2200 words) | EAA anxiety-driven |
| 6 | How to Make Your Shopify Store Accessible (Step-by-Step) | 📋 Outline in blog-outlines.md | Shopify-specific |
| 7 | 10 Common Accessibility Issues on E-commerce Sites | 📋 Outline in blog-outlines.md | Broad e-commerce |
| 8 | Alt Text, Keyboard Navigation, and Other Quick Wins | 📋 Outline in blog-outlines.md | Quick wins |

> All drafts at `docs/marketing/blog-0X-*.md`. Meta descriptions at `docs/marketing/meta-descriptions.md`.

### pSEO Page Taxonomy

Each pSEO page targets one keyword cluster. Pages are ISR (revalidate hourly).

Full taxonomy at `docs/marketing/pseo-taxonomy.md` — 15+ pages planned. Pages to build first:

```
/pseo/best-woocommerce-bulk-edit-plugins
/pseo/woocommerce-bulk-edit-variations
/pseo/woocommerce-product-management
/pseo/shopify-accessibility-apps
/pseo/woocommerce-accessibility-plugins
```

Each page:
- H1 targeting primary keyword
- 800-1200 word honest comparison
- CTA to signup or plugin page
- Internal links to blog + plugin page
- FAQ schema (structured data)

---

## 5. Design Language

**Aesthetic:** Developer-tool-clean. Not corporate, not startup-y. Think: a well-crafted indie dev tool. Light background, one strong accent color, generous whitespace.

### Mobile-First (PRIMARY CONSTRAINT — 60-80% of traffic is mobile/iPad)

Every layout decision starts with the smallest screen, then scales up. "Works on mobile" is not a checkbox — it is the design foundation.

**Test breakpoints:**
- iPhone SE (375px) — baseline, most constrained
- iPhone 14/15 (390px) — common modern phone
- iPad Mini (768px) — frequently overlooked, large tablet in phone layout
- iPad (1024px) — desktop territory but still tablet
- Desktop (1280px+) — enhanced layout, not the primary target

**Responsive rules (mandatory):**
- Single-column stacking on mobile
- Touch targets: minimum 44×44px (Apple) / 48×48dp (Material) — non-negotiable
- No horizontal scrolling at any breakpoint
- Body text: minimum 16px on mobile (prevents iOS auto-zoom on form fields)
- Hero headline: scales with `clamp()` — readable on mobile, large on desktop
- Feature grid: 1 col mobile → 2 cols tablet → 3 cols desktop
- Comparison table: horizontal scroll container on mobile, full table on desktop — columns must never squish or wrap incorrectly
- Pricing table: stacked cards on mobile (each plan full-width), row on desktop
- Images: `max-width: 100%; height: auto;` — full-width on mobile, constrained on desktop
- Navigation: hamburger on mobile (<768px), inline links on desktop
- CTA buttons: full-width on mobile, auto-width on desktop
- Spacing: generous on desktop, tighter but breathable on mobile
- Forms: full-width inputs on mobile, constrained max-width on desktop
- FAQ accordion: single column everywhere
- Footer: single column mobile, multi-column desktop

**Typography:**
- Headings: system font stack or Google Font (avoid services that add tracking)
- Body: system font stack
- No Google Fonts that load external scripts (privacy + performance)
- Minimum 16px body text on mobile

**Motion:** Minimal. One fade-in on hero load. No scroll jank. No parallax.

**Images:**
- All product mockups: self-hosted or Cloudflare Images
- No Unsplash lifestyle photos (they signal "generic startup")
- Screenshots and diagrams only
- All images: `loading="lazy"`, explicit `width` and `height` attributes

**Color palette:** Not finalized — defer to initial design phase. Start with neutral grays + one brand accent.

---

## 5b. Accessibility (WCAG 2.1 AA — Non-Negotiable)

Accessibility is not a later add-on. It is built into every component from the start. This is where we shine — a site that is genuinely accessible, not superficially compliant.

**Standard:** WCAG 2.1 Level AA. Everything works without a mouse. Everything is readable by screen readers. Everything has sufficient contrast.

### Accessibility Rules (Mandatory)

**Keyboard:**
- Every interactive element reachable via Tab — nav, buttons, form fields, accordions
- Focus order follows visual order (dom order matches tab order)
- Visible focus indicator on every focusable element — no removing `outline` without replacing it
- Skip-to-content link as the first focusable element on every page
- No keyboard traps anywhere — modals have clear escape paths

**Screen readers:**
- All images have meaningful `alt` text (or `alt=""` for decorative images)
- Icons that are interactive (buttons, links) have `aria-label`
- Form fields: every `<input>` has an associated `<label>` — never rely on `placeholder` alone
- Error messages: `aria-describedby` links error text to the field, `aria-invalid="true"` on error
- Live regions: `aria-live="polite"` on dynamic content updates (form success, error states)
- Page titles: descriptive, unique per page (`<title>` — not "AmazingPlugins")
- Headings: logical H1→H2→H3 hierarchy per page, no skipped levels
- Landmarks: one `<main>`, one `<header>`, one `<footer>`, nav with `<nav aria-label>`

**Visual:**
- Color contrast: minimum 4.5:1 for normal text, 3:1 for large text (WCAG AA)
- Never use color alone to convey information (error states need text or icon too)
- Text resizable to 200% without breaking layout
- No content that flashes more than 3 times per second (epilepsy risk)
- Focus indicators: high-contrast, visible against all backgrounds

**Forms:**
- Every input has a visible label (not just placeholder)
- Submit button: `type="submit"`, descriptive text ("Save My Spot" not "Submit")
- Error handling: inline error messages linked via `aria-describedby`
- Success state: announced via `aria-live`

**Navigation:**
- Hamburger menu: `aria-expanded`, `aria-controls`, `aria-label` on the button
- Mobile nav: focus-trap inside open menu, close on Escape
- Current page: `aria-current="page"` on active nav link

**Media:**
- All images: `alt` text (descriptive for content images, empty for decorative)
- No auto-playing video or audio
- If video content: captions or transcript available

**Motion:**
- `prefers-reduced-motion`: if set, disable all animations (including the hero fade-in)
- No scroll jank, no parallax — these affect people with vestibular disorders

**Specific component requirements:**

| Component | Accessibility Requirements |
|---|---|
| `<Header>` / Nav | `role="navigation"`, `aria-label="Main navigation"`, hamburger: `aria-expanded` + `aria-controls` |
| `<Button>` | Descriptive text, `aria-disabled` if needed, visible focus ring |
| `<SignupForm>` | Labels on all inputs, `aria-describedby` for errors, `aria-live` for success/error |
| `<Accordion>` | `aria-expanded`, `aria-controls`, one `aria-labelledby` per panel |
| `<ComparisonTable>` | `<caption>`, `th scope="col/row"`, proper table markup |
| `<PricingTable>` | Same as table — caption + th scope |
| `<FeatureCard>` | Icon has `aria-hidden="true"` if purely decorative |
| `<BlogCard>` | Link wraps entire card (`<a>` around the card), or all content is accessible individually |
| `<Footer>` | `<footer role="contentinfo">`, nav with `aria-label="Footer navigation"` |
| Modal (if any) | Focus trap inside, close on Escape, `aria-modal="true"`, `aria-labelledby` |
| Skip link | First focusable element, goes to `<main>` |

### Accessibility Testing Requirements

**Before launch, every page must pass:**
- [ ] Keyboard-only navigation (Tab, Shift+Tab, Enter, Escape) — no traps, all works
- [ ] Screen reader test (VoiceOver on macOS/iOS, NVDA on Windows — at least one)
- [ ] `axe-core` browser extension: 0 violations
- [ ] Color contrast check: 4.5:1 minimum for body text
- [ ] Resize text to 200%: nothing breaks
- [ ] No content loss at 375px width

**Ongoing:**
- New components: accessibility is part of the component review, not an afterthought
- Accessibility regression: caught in code review, not in production

---

## 6. Component Inventory

| Component | States | Mobile Notes | Accessibility |
|---|---|---|---|
| `<Hero>` | Default, mobile (stacked) | Single column, headline scales with clamp() | Heading level correct, alt on hero image |
| `<SignupForm>` | Default, loading, success, error | Full-width inputs, full-width button | Labels, aria-describedby on errors, aria-live |
| `<FeatureCard>` | Default | 1 col mobile → 2 col tablet → 3 col desktop | Icon aria-hidden if decorative |
| `<PricingTable>` | Free tier highlighted, Pro, Agency | Stacked cards mobile, row desktop | Table markup with caption + th scope |
| `<BlogCard>` | With image, without image | Full-width image, stacked text | Entire card is a link or content is accessible |
| `<ComparisonTable>` | Header row, data rows, highlight column | Horizontal scroll wrapper on mobile | Table markup: caption, th scope, proper structure |
| `<Header>` | Transparent on hero, solid on scroll | Hamburger nav mobile, inline desktop | nav role, aria-label, hamburger: aria-expanded/controls |
| `<Footer>` | Links, tagline, social icons | Single column mobile, multi-column desktop | role="contentinfo", aria-label on footer nav |
| `<Accordion>` | Closed, open | Full-width, 44px min touch target | aria-expanded, aria-controls, aria-labelledby |
| `<Button>` | Primary, secondary, ghost | Full-width on mobile | Descriptive text, visible focus ring |
| `<SkipLink>` | Visible on focus only | — | First focusable element, links to `#main` |
| `<VisuallyHidden>` | Utility component | — | `.visually-hidden` CSS class for screen-reader-only text |

---

## 7. Launch Checklist

### Must Have (Day 1)

- [ ] Next.js app scaffolded
- [ ] Homepage with hero, pain statement, feature cards, CTA, footer
- [ ] `output: 'standalone'` in next.config.ts
- [ ] Plausible analytics installed
- [ ] Cloudflare DNS pointing at Vercel
- [ ] `.env.local` with `NEXT_PUBLIC_API_URL` stub
- [ ] Email signup form (ConvertKit/Buttondown custom form)
- [ ] Privacy + Terms pages
- [ ] Vercel GitHub connect (auto-deploy from main)
- [ ] Responsive tested on BrowserStack or real devices (iPhone SE, iPad Mini, iPad)
- [ ] Accessibility tested: keyboard-only navigation, axe-core, VoiceOver/NVDA

### Launch Window (Week 1)

- [ ] Plugin landing page (`/plugins/woocommerce-bulk-editor`)
- [ ] Blog post #1: comparison article
- [ ] `sitemap.xml` + `robots.txt`
- [ ] Google Search Console property created + sitemap submitted
- [ ] 2-3 pSEO pages
- [ ] Accessibility review passed on all new pages

### Post-Launch (Week 2-4)

- [ ] Blog posts #2-5
- [ ] More pSEO pages
- [ ] YouTube embed on plugin page
- [ ] Community outreach (Reddit, Facebook groups — per existing 14-day plan)

---

## 8. Out of Scope (Deliberate)

- No shopping cart / direct payments on marketing site (Freemius handles this)
- No user accounts on marketing site (Freemius handles this)
- No blog comments (use Plausible events instead of Disqus)
- No A/B testing infrastructure (add after first revenue)
- No multi-language (add after English market traction)
- No dark mode (add if requested after user testing)
