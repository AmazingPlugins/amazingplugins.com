# AmazingPlugins — PRD: WooCommerce Smart Bulk Editor

**Plugin name:** WooCommerce Smart Bulk Editor
**Date:** April 8, 2026
**Status:** Validated — building

---

## 1. Problem

Managing a WooCommerce catalog by editing products one at a time wastes hours every week, and the built-in bulk editor cannot touch variations, times out on stores over 100 products, and has no undo. Every plugin that claims to solve this locks the features that actually matter behind a paywall.

---

## 2. ICP (Ideal Customer Profile)

**Store profile:**
- Store size: 50–5,000 products; any order volume
- Platform: WooCommerce 8.0+ on WordPress 6.4+
- Hosting: Any self-hosted or managed WordPress (plugin runs entirely on merchant's server)
- Tech level: Non-technical store owner to developer-adjacent; not expected to write code

**What they do today instead:**
> They use WooCommerce's native bulk editor (slow, limited to basic fields, times out, loses changes) or they edit products one at a time. Some pay $49–199/yr for a competing plugin whose free version turned out to be a useless demo.

**Trigger event (when they start searching):**
> Black Friday prep with hundreds of prices to update. Post-supplier-restock with stock levels to correct across 200 SKUs. A bad experience with a competing plugin's crippled free version. A Google search for "woocommerce bulk edit variations" after realizing the native editor can't do it.

**Buyer vs user:**
> Usually the same person: the store owner or the one staff member who manages products. In agencies, the developer recommends and the client pays; the developer is the de facto buyer and the store owner is the user.

---

## 3. Free Tier

The free version is the product. A store owner with 200 simple or variable products should be able to manage their entire catalog — prices, stock, descriptions, categories, variations — without paying a cent. The goal is 5-star reviews and word-of-mouth, not upgrade pressure.

**What ships free:**

| Feature | Why it must be free |
|---|---|
| Spreadsheet-style inline editing for all core product fields (title, description, short description, regular price, sale price, sale dates, SKU, stock quantity, stock status, manage stock toggle, categories, tags, weight, dimensions, status, visibility, featured) | This is the core product. Every competitor that locks basic fields behind a paywall earns 1-star reviews and kills word-of-mouth. Smart Manager's free version does essentially nothing — that is the cautionary example. |
| Variable product and variation editing in the grid | Every free competitor either omits this (ELEX, YITH), limits it to unreadable rows (PW Bulk Edit), or cuts the page to 10 products (BEAR). This one feature differentiates the free version from every other option in the market. |
| Filter by category, product type, stock status, price range, keyword/SKU | Filtering is table stakes. A grid with no filtering is unusable on any store over 100 products. Broken filters are the second-most-frequent complaint across all competitors. |
| Bulk operations: set price (fixed/percentage), search-replace in title/description, bulk change categories/tags | These are the three operations every store runs before a sale. Locking them behind premium makes the free version a demo, not a tool. |
| Single-step undo with confirmation (preview old vs new values before committing) | BEAR has documented data corruption incidents with no undo. Undo is a trust prerequisite, not a premium feature. |
| 50 products per page default, configurable up to 200 | BEAR's 10-product-per-page limit is the single most mocked limitation in the category. 50 is generous and performant. |
| Keyboard navigation (Tab, Enter, arrow keys, Escape) | The Excel-like UX is a core differentiator. Without keyboard nav it is just another form-based editor. |
| HPOS (High-Performance Order Storage) compatibility | Default in WooCommerce since 2024. Any plugin that does not support HPOS gets immediately flagged in reviews. |

**Free tier boundary:**
> A store owner with up to 5,000 products can open any product (simple or variable), edit any core field inline, run a price update or stock correction across filtered results, preview what will change, and undo the last operation — all without a license key.

**What is explicitly NOT in free (reserved for paid):**
- Saved filter presets
- Scheduled bulk operations
- CSV export / import
- Custom meta field editing (ACF, Yoast, WooCommerce extensions)
- Full operation history with multi-step rollback
- Role-based access control
- Image management (bulk featured image, gallery)
- Order and coupon bulk editing

---

## 4. Paid Tier

Premium = workflow acceleration and delegation. Free covers "edit my products now." Premium covers "automate this, do it faster, give my team controlled access to it."

**What ships in premium (launch day):**

| Feature | Conversion trigger | Why users pay |
|---|---|---|
| Saved filter presets | User rebuilds the same filter from scratch for the third Monday in a row | Saves 5–10 min per session; power users convert on this without being asked |
| Scheduled bulk operations | Pre-Black Friday scramble; store owner stays up to midnight to run a manual price change | Automates recurring promotional cycles; no competitor offers this in a simple UI |
| CSV export / import with field mapping and preview | Store hits 500+ products and needs to hand data to a VA or sync with a supplier's price sheet | Round-trip CSV is the only bridge to external tools; WP Sheet Editor charges $99/yr for this alone |
| Custom meta field editing | Store uses ACF, Yoast SEO, WooCommerce Subscriptions, or any plugin that stores custom product data in meta | Unlocks the long tail of WooCommerce configurations; zero alternatives in free |
| Full operation history with multi-step rollback | Free user runs a bulk update, saves, realizes it hit the wrong filtered set, single-step undo is gone | Insurance feature; converts after the first scare |
| Role-based access control | Store has a shop manager or VA touching products | Standard expectation for team stores; blocks upgrade only when a second person needs access |

**Pricing:**

| Tier | Price | License | Target buyer |
|---|---|---|---|
| Personal | $49/yr | 1 site | Solo store owner |
| Business | $99/yr | 5 sites | Developer / small agency |
| Agency | $149/yr | Unlimited | Freelancer / larger agency |

*Launch discount: 20% off all tiers for first 60 days post-launch. Email list early-bird: 50% off first year, one-time use per address.*
*Money-back guarantee: 14 days, unconditional.*
*Billing: Annual only at launch. Add monthly at +30% only if conversion data after 90 days justifies it.*
*Renewals: Full price auto-renew. 30% win-back offer on active cancellation (Freemius handles this automatically).*

**Pricing rationale:**
- $49/yr undercuts PW Bulk Edit ($59/yr), ELEX ($79/yr), YITH ($79.99/yr), and Smart Manager ($199/yr)
- At $49/yr: 123 paying customers = ~$500 MRR. Achievable in 12–18 months at 2% conversion from ~6,150 free installs.
- Annual pricing matches market expectation (Smart Manager, ELEX, PW Bulk Edit, YITH are all annual)
- Do not use AppSumo or any lifetime deal platform — lifetime deals create permanent support burden with no recurring revenue

---

## 5. MVP Scope

**Ships at MVP (day 35–40, target WordPress.org submission at week 5):**
- [ ] Spreadsheet grid using AG Grid Community Edition (MIT license, free for commercial use)
- [ ] Load products via paginated REST API (50–100 per request); virtual scrolling handles rendering
- [ ] Inline editing for all core product fields listed in Free Tier
- [ ] Variable product support: expandable rows showing parent + variation rows; AG Grid master-detail
- [ ] Filter by category, product type, stock status, price range, keyword/SKU
- [ ] Bulk operations: set price (fixed/percentage), search-replace in title/description, change categories/tags
- [ ] Single-step undo with diff preview (old vs new values highlighted before committing)
- [ ] Keyboard navigation (Tab, Enter, arrows, Escape)
- [ ] HPOS-aware reads (WP_Query with HPOS-compatible meta queries); WooCommerce CRUD API for writes
- [ ] JSON snapshot of affected products in wp_options before every bulk save (capped at last 5 ops, auto-cleaned via wp-cron)
- [ ] WordPress.org readme.txt written as marketing copy

**Explicitly deferred (post-launch, built as premium):**
- Saved filter presets
- Scheduled bulk operations
- CSV export / import
- Custom meta field editing
- Full operation history
- Role-based access
- Image management
- Order / coupon editing
- Freemius SDK integration (week 6)
- Landing page at amazingplugins.com (parallel with submission)

**Tech stack:**
- Backend: PHP 8.1+, WordPress REST API custom endpoints, WooCommerce CRUD API for writes
- Frontend: AG Grid Community Edition (MIT, ~300KB gzipped), vanilla JS (no React/Vue — keeps bundle small and WP Admin compatible)
- Data flow: REST API → JSON → AG Grid → REST API → WC CRUD save
- Undo store: JSON snapshots in wp_options, capped at 5 operations, auto-expired via wp-cron
- Key dependency: AG Grid Community (MIT) — confirmed free for commercial use; Handsontable ruled out (requires paid commercial license)

**Plugin file structure:**
```
amazingplugins-bulk-editor/
  amazingplugins-bulk-editor.php    — bootstrap, hook registration
  includes/
    class-product-query.php         — HPOS-aware product fetch (WP_Query wrapper)
    class-product-saver.php         — WC CRUD writes + undo snapshots
    class-rest-api.php              — custom REST endpoints
    class-bulk-operations.php       — price set/adjust, search-replace, category change
  assets/
    js/
      ag-grid-community.min.js
      bulk-editor.js
    css/
      bulk-editor.css
  readme.txt
```

**Build timeline:**

| Week | Deliverable |
|---|---|
| 1 | Plugin scaffold, HPOS-aware REST endpoints for product data, AG Grid rendering basic list |
| 2 | Inline cell editing, save via REST, keyboard navigation |
| 3 | Variable product / variation display (expandable rows), variation inline editing |
| 4 | Filtering, bulk operations (price set/adjust, search-replace, category change) |
| 5 | Undo / preview system, WordPress.org submission |
| 6 | Freemius integration, premium feature scaffolding, landing page launch |

---

## 6. Validation Proof

| Signal type | Finding | Strength |
|---|---|---|
| Search volume | "woocommerce bulk edit products," "woocommerce bulk edit prices," "woocommerce bulk edit variations," "bulk edit woocommerce stock" — all transactional intent, thousands of monthly searches globally. "Best woocommerce bulk edit plugin" — commercial investigation, all major competitor blogs target this. | High |
| Competitor install base | BEAR: 40,000+ installs. PW Bulk Edit: 20,000+. Smart Manager: 10,000+. Bulky: 10,000+. WP Sheet Editor: 10,000+. ELEX: 4,000+. YITH: 18,249 paying customers. Combined active install base exceeds 100,000. | High |
| Competitor review gaps | Top 3 complaint categories from 1–2 star reviews: (1) Crippled free version — "it does nothing unless you purchase" (Smart Manager, most-cited); (2) Variation editing broken or absent — "can't read the variant values so can't know what price to enter" (PW Bulk Edit); (3) Data corruption, no undo — "the plugin randomly deletes the price meta_tag...our backup was already overwritten" (BEAR). All three are directly addressed by this plugin's free tier. | High |
| Reddit / forum threads | r/woocommerce and r/WordPress both show recurring threads asking for bulk editor recommendations with complaints about crippled free versions. WooCommerce GitHub issue #22549 ("Bulk edit NOT WORKING") has been open for years with no resolution from core team. | High |
| Email signups | Target: 30+ at day-30 go/no-go gate. [Fill in actual count when gate is reached.] | Pending |
| 1:1 conversations | Target: 3+ completed by day 14. [Fill in actual findings.] | Pending |
| Comparison article coverage | 10+ actively maintained comparison articles rank on page 1 for "best woocommerce bulk edit plugin 2026." Getting included in these is a key post-launch distribution channel. | High |

**Go / no-go gate (day 30):**

| Metric | Go | Caution | No-go |
|---|---|---|---|
| Email signups | 30+ | 15–29 | Under 15 |
| Community engagement (comments + upvotes, all channels) | 30+ | 10–29 | Under 10 |
| 1:1 conversations completed | 3+ | 1–2 | 0 |
| Competitor complaint catalog | 50+ documented | 30–49 | Under 30 |
| Prototype load time (5,000 products) | Under 3 seconds | 3–10 seconds | Over 10 seconds |

---

## 7. Build Complexity

**Size:** M (3–5 weeks solo to WordPress.org submission; 6 weeks to premium launch)

**Key technical risks:**

| Risk | Severity | Mitigation |
|---|---|---|
| Spreadsheet grid performance at scale (10,000+ products) | High | AG Grid Community handles virtual scrolling (only renders visible rows). Load products via paginated REST (50–100 per request). Server-side filtering/sorting for large catalogs. Test at 1K, 5K, and 10K products before submission. |
| WooCommerce CRUD API read performance | Medium | Use WP_Query for reads (5–10x faster than wc_get_products for grid rendering). Use WC CRUD API only for writes (maintains data integrity, fires hooks, HPOS-safe). Cache grid data in transients if needed. |
| Variation editing complexity | Medium | AG Grid master-detail handles expandable parent/child rows natively. On save, call WC_Product_Variable::sync() to recalculate parent price ranges. Enforce that variation-only fields (e.g., variation price) cannot be edited on the parent row. |
| Data corruption — reputation risk | Low probability, high impact | Before every bulk save: serialize affected product data to a JSON snapshot in wp_options. Cap at last 5 operations with auto-expiry. Display warning UI before operations affecting 50+ products. Recommend WooCommerce export as backup for large operations. This is BEAR's #1 failure mode; do not repeat it. |
| WordPress.org plugin review rejection | Low probability, blocking | Follow WordPress coding standards from day 1. Include unminified JS source alongside minified. No external API calls in free version. Submit at week 5 to parallelize review (2–4 weeks) with premium development. |

**WooCommerce APIs / hooks needed:**

| API / Hook | Purpose | HPOS compatibility note |
|---|---|---|
| WP_Query with meta_query | Fast product reads for grid rendering | Use wc_get_orders() equivalent for HPOS; products use post meta regardless of HPOS setting |
| WC REST API (custom endpoints) | Async grid data loading, cell save operations | Register endpoints under `wc/v3` namespace for consistency |
| WC_Product, WC_Product_Variable, WC_Product_Variation | Writes via WC CRUD for data integrity | HPOS-safe; always write through WC data layer, never direct DB |
| WC_Product_Variable::sync() | Recalculate parent price range after variation price changes | Required or parent min/max price display breaks |
| save_post_product (hook) | Trigger index refresh after save | Standard; no HPOS issue |
| woocommerce_product_query (hook) | Extend default product queries for filtering | Compatible with HPOS |

**WordPress.org submission risks:**
- Common rejection reasons: minified JS without source, external API calls without user disclosure, GPL-incompatible bundled libraries (AG Grid Community is MIT — confirmed safe), missing sanitize/escape calls on output
- Estimated review time: 2–4 weeks
- Mitigation: submit at end of week 5; use the wait time to build premium features and the landing page

---

## 8. Launch Plan

**Pre-submission (before WordPress.org approval):**
- [ ] Landing page live at amazingplugins.com/woocommerce-bulk-editor with email capture form
- [ ] Email form includes 2 qualifying questions: store size (dropdown) + biggest frustration (open text)
- [ ] Comparison blog post published: "The 6 Best WooCommerce Bulk Edit Plugins Compared (2026 Honest Review)"
- [ ] Freemius account created; pricing tiers configured ($49/$99/$149 annual); SDK integrated in plugin
- [ ] Plugin readme.txt written as marketing copy: headline ("The WooCommerce bulk editor with a free version that actually works"), feature list, comparison callouts, FAQ

**WordPress.org submission:**
- [ ] PHPCS clean (WordPress coding standards)
- [ ] Unminified JS source included alongside minified
- [ ] No external API calls (all data ops on merchant's server)
- [ ] Plugin icon 256×256 and banner 1544×500 + 772×250 created
- [ ] 5 screenshots: grid view, inline editing, variation editing, bulk operations panel, undo preview
- [ ] Submitted; target: end of week 5

**Launch day (WordPress.org approval received):**
- [ ] Email list notified with launch announcement + early-bird discount link (50% off for pre-signups, 20% off for everyone)
- [ ] Post in r/woocommerce: genuine mention — "I built this specifically because the free versions of every existing plugin are crippled. Variation editing and undo are free. Here is the WP.org link."
- [ ] Post in WooCommerce Help & Share (Facebook) with same framing
- [ ] Email 5 comparison article authors: "New entrant that addresses the top 3 complaints in the category — would you consider including it in your next update?"
- [ ] Pitch WP Tavern, MasterWP, Post Status with the contrarian angle: "generous free version in a market of demos"

**Post-launch (days 30–60):**
- [ ] Review request trigger confirmed live (fires after first successful bulk save, dismissed permanently after one interaction)
- [ ] Freemius email sequence confirmed active (day 3: "how did it go?", day 14: "a feature you might have missed", day 30: "still on free? here's what pro adds")
- [ ] In-context upsells at each gated feature: "Save as Preset" button, "Schedule" tab, "Export CSV" button, "Full History" link — each opens a Freemius modal with feature-specific copy
- [ ] First 20 support tickets reviewed; UX issues logged as next sprint
- [ ] Comparison article authors followed up; link requests sent to any that published without including the plugin

---

## 9. Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Performance degrades on large catalogs, generating 1-star reviews before the plugin gains traction | Medium | High — one "it's slow" review wave early on can permanently suppress WordPress.org ranking | Test at 5,000 and 10,000 products before submission. AG Grid virtual scrolling + server-side filtering is the architecture. Do not cut this corner. |
| BEAR or PW Bulk Edit ships a genuinely good free tier update in response | Low | Medium — narrows differentiation, but only if they ship it before this plugin builds install count and reviews | First-mover lead matters more than features at this stage. Ship fast and compound WordPress.org authority. If a competitor improves their free tier, respond by shipping a scheduled premium feature (CSV, presets) that resets the gap. |
| WordPress.org review takes 6+ weeks (backlog) | Medium | Medium — delays the install flywheel by a month | Submit at week 5 exactly. Use waiting time for landing page, premium build, and community seeding. Do not push to launch without WP.org approval — the organic install flywheel is the growth engine. |

---

## 10. Success Metrics

**Day 30 (post-WP.org approval):**
- Free installs: 100+
- Paying customers: 0–2 (first revenue signal, not expected at scale)
- WordPress.org rating: 4.5+ (minimum 5 reviews)
- Go / no-go: If under 50 installs and 0 reviews by day 30, double down on comparison article and community outreach before writing new code

**Day 60:**
- Free installs: 500+
- MRR: $40–80 (5–10 paying customers at $49/yr avg)
- WordPress.org reviews: 20+, rating 4.7+
- Go / no-go: If under 200 installs and no paying customers, audit community seeding and WP.org readme — traffic problem, not a conversion problem

**Day 90:**
- Free installs: 1,000+
- MRR: $150–400 (25–50 paying customers)
- Conversion rate (free → paid): 2–3%
- Go / no-go: If under 500 installs and MRR under $50 at day 90, reassess time allocation — may indicate a positioning or distribution failure, not a product failure

**Kill criteria:**
> At day 90, if free installs are under 300 AND MRR is under $50 AND WordPress.org rating is under 4.0, pause feature development and run a full positioning audit. The product may be right but the readme, landing page, or community seeding is wrong. Fix distribution before writing more code.

---

*Sources used for this PRD:*
- [x] Competitor review mining — 50+ complaints cataloged across Smart Manager, BEAR, PW Bulk Edit, ELEX, YITH, Bulky, WP Sheet Editor (see `woocommerce-bulk-editor-validation.md`)
- [x] Search keyword research — transactional and commercial investigation clusters confirmed (see `woocommerce-bulk-editor-validation.md`)
- [x] Reddit / forum validation — r/woocommerce threads, WooCommerce GitHub issue #22549, WordPress.org support forums (see `zero-cost-validation-channels.md`)
- [x] Pricing analysis — full competitor pricing map April 2026 (see `woocommerce-bulk-editor-validation.md`, `free-to-paid-packaging.md`)
- [ ] 1:1 conversations with store owners — planned, not yet completed
- [ ] Email signups — landing page not yet live
