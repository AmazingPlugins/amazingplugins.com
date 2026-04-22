# AmazingPlugins -- Idea Scoring Matrix

**Created:** April 8, 2026
**Purpose:** Reusable framework for evaluating plugin/app ideas across 8 dimensions
**Status:** Living document -- add new ideas as rows

---

## Scoring Dimensions (1-5 scale, higher is better)

| # | Dimension | 5 (Best) | 1 (Worst) |
|---|---|---|---|
| A | Easiest MVP | Shippable in 2 weeks solo | 3+ months of dev work |
| B | Low/no ongoing infra cost | Zero server cost, runs on merchant's host | Requires SaaS backend, hosting, external APIs |
| C | Store-owner pain severity | Daily frustration, workflow blocker | Nice-to-have, rarely felt |
| D | Freemium fit | Obvious free/paid split, free is useful, paid is compelling | Hard to gate without crippling the product |
| E | Low support complexity | Self-explanatory, minimal config, few edge cases | Constant support tickets, env-specific bugs |
| F | Speed to first revenue | Paying users likely within 30 days of launch | 6+ months before anyone pays |
| G | Platform risk | WP/WooCommerce will never build this natively | WP/WooCommerce could ship this tomorrow |
| H | Moat/expansion potential | Leads to a product suite, network effects, data lock-in | One-trick plugin with no expansion path |

---

## Scoring Matrix

| Idea | A: MVP | B: Infra | C: Pain | D: Freemium | E: Support | F: Revenue Speed | G: Platform Risk | H: Moat | TOTAL |
|---|---|---|---|---|---|---|---|---|---|
| **WooCommerce Smart Bulk Editor** | 4 | 5 | 5 | 5 | 3 | 4 | 5 | 4 | **35** |
| **WooCommerce Smart Sale Scheduler** | 5 | 5 | 4 | 5 | 4 | 4 | 4 | 3 | **34** |
| **WooCommerce Profit Calculator** | 4 | 5 | 4 | 4 | 3 | 3 | 4 | 4 | **31** |
| **WooCommerce Stock Alerts Dashboard** | 5 | 5 | 4 | 4 | 4 | 3 | 3 | 3 | **31** |
| **WooCommerce Order Status Automator** | 4 | 5 | 4 | 4 | 3 | 3 | 4 | 3 | **30** |
| **WooCommerce Quick Order Notes** | 5 | 5 | 3 | 3 | 5 | 2 | 4 | 2 | **29** |
| **WooCommerce Email Template Builder Lite** | 3 | 5 | 4 | 4 | 2 | 3 | 3 | 3 | **27** |
| **WooCommerce Product Cloner Pro** | 5 | 5 | 3 | 3 | 4 | 2 | 3 | 2 | **27** |
| **WooCommerce Min/Max & Step Quantities** | 5 | 5 | 3 | 4 | 3 | 2 | 3 | 2 | **27** |
| **WooCommerce Shipping Progress Bar** | 5 | 5 | 3 | 3 | 4 | 2 | 2 | 2 | **26** |
| **WooCommerce Image Watermarker** | 4 | 5 | 2 | 2 | 3 | 2 | 5 | 1 | **24** |
| **WooCommerce Accessibility Auto-Fixer** | 2 | 5 | 4 | 3 | 2 | 2 | 5 | 4 | **27** |
| **WooCommerce Update Shield** | 2 | 4 | 3 | 3 | 1 | 2 | 2 | 3 | **20** |

---

## Score Justifications

### WooCommerce Smart Bulk Editor (35)

- **A: MVP = 4.** 5-6 weeks to WordPress.org submission. Not a 2-week build because the spreadsheet grid (AG Grid), variation editing, and undo system each add complexity. Docked one point vs a true 2-week plugin.
- **B: Infra = 5.** Pure PHP plugin running on the merchant's server. Zero external services, zero hosting cost.
- **C: Pain = 5.** Daily frustration confirmed by hundreds of competitor reviews. Every WooCommerce store with 50+ products feels this. The native bulk editor is universally hated.
- **D: Freemium = 5.** Textbook free/paid split. Free covers the full editing workflow (all fields, variations, undo). Premium covers automation (scheduled ops, CSV, saved presets, role-based access). No ambiguity about the line.
- **E: Support = 3.** Spreadsheet UIs generate edge-case questions (field formatting, variation sync, large catalog performance). Not the highest support load, but not self-explanatory either. Data-touching plugins always get "it broke my products" tickets even when user error is the cause.
- **F: Revenue Speed = 4.** Proven buyer market (BEAR sold 40K+ copies, Smart Manager charges $199/yr). Free WordPress.org listing drives installs fast. First paid conversions realistic within 30-60 days of launch.
- **G: Platform Risk = 5.** WooCommerce has had a terrible native bulk editor for 10+ years with no meaningful improvement. Their admin UX track record is poor. Extremely unlikely they build anything competitive.
- **H: Moat = 4.** WordPress.org install count and reviews compound over time. Cross-sell path to the entire AmazingPlugins WooCommerce suite. Data-safety reputation creates switching cost (users do not swap bulk editors after one corrupts their data). Not a 5 because the code itself is not defensible.

### WooCommerce Smart Sale Scheduler (34)

- **A: MVP = 5.** 2-3 week build. Thin wrapper around existing WooCommerce sale price + date fields. WP-Cron for scheduling, form with date picker and product selector. No complex UI library needed.
- **B: Infra = 5.** Pure WordPress plugin, WP-Cron handles scheduling. Zero external services.
- **C: Pain = 4.** Real pain (scheduling sales across 200+ products manually takes hours) but seasonal rather than daily. Peaks around Black Friday, end-of-season. Not a constant daily frustration for most stores.
- **D: Freemium = 5.** Clean split: free schedules sales for up to 50 products with a calendar view. Premium unlocks unlimited products, recurring sales, stacking rules, performance dashboards.
- **E: Support = 4.** Simple concept, limited config surface. Main support vector is WP-Cron reliability on cheap hosting, but that is a known WordPress issue with well-documented workarounds.
- **F: Revenue Speed = 4.** No one owns this niche as a standalone focused product. "Schedule WooCommerce sale" searches have no strong incumbent. First-mover advantage in a clear gap. Cross-sell from Bulk Editor users accelerates initial installs.
- **G: Platform Risk = 4.** WooCommerce already has per-product sale dates but has never built a bulk scheduling UI. Possible but unlikely they invest in this given their admin UX track record. Docked one point because "schedule a sale" is a feature they could reasonably add.
- **H: Moat = 3.** Functionally simple, easy to replicate. Moat comes primarily from WordPress.org ranking and cross-sell with the Bulk Editor suite. No deep technical barrier.

### WooCommerce Profit Calculator (31)

- **A: MVP = 4.** 3-4 weeks. Read-side is straightforward (query orders + COGS meta, calculate margins). Medium complexity from variable product COGS, historical accuracy, and aggregate caching for large order volumes.
- **B: Infra = 5.** Reads existing WooCommerce data, no external services. Pure PHP.
- **C: Pain = 4.** Real pain: WooCommerce added native COGS in v10.3 but generates zero reports from it. The gap between having data and having insight is the product. Docked one point because not every store has populated COGS data yet.
- **D: Freemium = 4.** Free: dashboard with revenue/COGS/profit/margin and a product profit table. Premium: profit by category, additional cost inclusion (shipping, gateway fees), trends, exports, email digests. Clean split but the free version is already quite complete, which may lower conversion rate.
- **E: Support = 3.** "My profit numbers look wrong" tickets are inevitable. COGS accuracy depends on when costs were entered, refund handling, tax inclusion, and gateway fee calculation. Each generates a support thread.
- **F: Revenue Speed = 3.** Timing is good (native COGS is new), but this is a reporting tool, not a workflow tool. Users install it, look at the dashboard, and may not feel urgency to upgrade. Conversion cycle is longer than action-oriented tools.
- **G: Platform Risk = 4.** WooCommerce has not built any COGS reporting despite adding the field. They may eventually, but their analytics tab has been minimal for years. Moderate risk.
- **H: Moat = 4.** Once a store owner checks their profit dashboard daily, they do not uninstall. Stickiness is high. COGS expertise and the reporting layer are harder to replicate well. Cross-sell to pricing tools (Bulk Editor) is natural.

### WooCommerce Stock Alerts Dashboard (31)

- **A: MVP = 5.** 2-3 weeks. A WP admin page with WP_Query fetching stock meta, WP_List_Table with sortable columns, inline AJAX quick-edit. Minimal frontend complexity.
- **B: Infra = 5.** Pure WordPress, reads existing product stock meta. Zero external cost.
- **C: Pain = 4.** Real pain for stores with 100+ physical SKUs. No native dashboard for stock health. But many smaller stores get by with email alerts or manual checks. Not a hair-on-fire daily problem for everyone.
- **D: Freemium = 4.** Free: stock dashboard with color-coded rows, needs-reorder view, inline quick-edit, out-of-stock duration. Premium: forecasting, Slack/email alerts, historical charts, supplier templates. Good split, but the free version covers the core need well.
- **E: Support = 4.** Simple concept, limited surface area. Main edge cases: variable product stock aggregation and multi-warehouse setups (premium only).
- **F: Revenue Speed = 3.** Competes with ATUM (10K+ installs, feature-rich, free). Standalone stock dashboard is a smaller niche than bulk editing. Slower path to first revenue unless positioned as a lightweight ATUM alternative.
- **G: Platform Risk = 3.** WooCommerce already has basic low-stock email alerts. They could add a stock dashboard to WooCommerce Analytics at any time. The analytics tab is actively being developed. Moderate-to-high risk.
- **H: Moat = 3.** Low switching cost. The stock dashboard overlaps with the Bulk Editor's roadmap (stock columns in the grid reduce standalone value). Limited expansion beyond inventory.

### WooCommerce Order Status Automator (30)

- **A: MVP = 4.** 2-3 weeks for custom statuses + 3 built-in rules. Closer to 4 weeks with the conditional automation engine (if/then rules). register_post_status is well-understood but the rules builder adds UI complexity.
- **B: Infra = 5.** Pure WordPress, WP-Cron for scheduled transitions. Zero external cost.
- **C: Pain = 4.** Real pain for stores with custom fulfillment workflows (50+ orders/day). But many smaller stores survive with the 7 default statuses. Pain scales with order volume.
- **D: Freemium = 4.** Free: unlimited custom statuses + 3 preset automation rules + status emails. Premium: unlimited rules with conditional logic, scheduled transitions, audit log, webhooks. Clean split but the 3-rule limit feels arbitrary.
- **E: Support = 3.** Custom statuses interact with payment gateways, shipping plugins, and email systems in unpredictable ways. "My status automation broke my checkout" tickets are probable.
- **F: Revenue Speed = 3.** Existing free plugins (Tyche, Bright Plugins) have established user bases. Differentiating requires the automation engine, which is the premium feature. Slower free-to-paid conversion because the free competition is adequate.
- **G: Platform Risk = 4.** WooCommerce has not expanded its status system in years. Custom statuses via code is a long-standing gap they have shown no interest in filling natively.
- **H: Moat = 3.** Once automation rules are configured, switching is painful (rebuilding all rules). But the code itself is simple to replicate. Limited expansion path beyond order management.

### WooCommerce Quick Order Notes (29)

- **A: MVP = 5.** 1-2 weeks. Add a meta box to the order page with color-coded flags, pin functionality, and a notes filter on the orders list. Standard WordPress meta API work.
- **B: Infra = 5.** Pure WordPress, stores data in order meta. Zero cost.
- **C: Pain = 3.** Real but niche. Only multi-employee stores feel this. Solo operators rarely need internal order notes beyond what WooCommerce provides. Small addressable market.
- **D: Freemium = 3.** Hard to create a compelling free/paid split for something this simple. Free: notes + flags. Premium: what? Filters and search? Feels thin. Risk of the free version being the whole product.
- **E: Support = 5.** Nearly zero support surface. Simple feature, no edge cases, no external integrations.
- **F: Revenue Speed = 2.** Small TAM (multi-employee WooCommerce stores). Hard to justify annual pricing for a notes feature. Likely very low conversion rate.
- **G: Platform Risk = 4.** WooCommerce's order notes are deliberately minimal and have not been enhanced in years. Low risk of native competition.
- **H: Moat = 2.** One-trick feature with no expansion path. Easy to replicate. No network effects or data lock-in.

### WooCommerce Email Template Builder Lite (27)

- **A: MVP = 3.** 3-4 weeks for the visual preview + CSS customization. The email rendering rabbit hole (Gmail vs Outlook vs Apple Mail compatibility) can easily balloon this to 6+ weeks. Inline CSS and table-based layout requirements add hidden complexity.
- **B: Infra = 5.** Pure WordPress, hooks into WooCommerce email templates. Zero external cost.
- **C: Pain = 4.** Every WooCommerce store sends transactional emails that look generic. Store owners want branded emails. The pain is real and universal but not urgent (ugly emails do not lose sales the way a broken bulk editor loses afternoons).
- **D: Freemium = 4.** Free: logo, colors, fonts, custom text blocks, live preview. Premium: drag-and-drop builder, conditional content, analytics, template library. Clean split.
- **E: Support = 2.** Email rendering is the problem. "It looks different in Outlook" and "the mobile version is broken" tickets are guaranteed. Testing across email clients is labor-intensive and ongoing.
- **F: Revenue Speed = 3.** Large TAM (every WooCommerce store) but low urgency to upgrade. Store owners customize their emails once and forget about it. Premium conversion requires a compelling builder that justifies annual payment for a one-time setup task.
- **G: Platform Risk = 3.** WooCommerce has improved its email system incrementally. They could add a basic visual editor at any time. The email customizer space is also crowded with established plugins (Jestar, Kadence, YayMail).
- **H: Moat = 3.** Once emails are customized, uninstalling means reverting to ugly defaults. Moderate switching cost. "Powered by AmazingPlugins" footer in free version provides brand distribution. No strong expansion path beyond email.

### WooCommerce Product Cloner Pro (27)

- **A: MVP = 5.** 1-2 weeks. Hook into WooCommerce's product duplication, add field remapping UI (change SKU prefix, adjust prices, swap categories). Standard CRUD work.
- **B: Infra = 5.** Pure WordPress. Zero cost.
- **C: Pain = 3.** Real but infrequent. Store owners clone products when launching similar items or creating seasonal variants. Most stores do this a few times a month, not daily.
- **D: Freemium = 3.** Hard to gate meaningfully. Free: clone with basic field remapping. Premium: bulk clone, clone to draft, clone with variation remapping? Thin premium value.
- **E: Support = 4.** Simple concept. Main edge case: variable product cloning with attribute and variation integrity. Manageable.
- **F: Revenue Speed = 2.** Low-frequency use case. Hard to justify annual subscription for something used a few times a month. One-time pricing might work but limits revenue.
- **G: Platform Risk = 3.** WooCommerce already has basic product duplication. They could improve it at any time (and should -- the current implementation breaks variable products). Moderate risk.
- **H: Moat = 2.** One-trick plugin. Easy to replicate. No expansion path. No data lock-in.

### WooCommerce Min/Max & Step Quantities (27)

- **A: MVP = 5.** 1-2 weeks. Product-level meta fields for min, max, and step. Validate on add-to-cart hook. Simple settings page.
- **B: Infra = 5.** Pure WordPress. Zero cost.
- **C: Pain = 3.** Real for B2B and wholesale stores but niche for typical B2C WooCommerce shops. Most stores never need quantity rules.
- **D: Freemium = 4.** Free: product-level rules. Premium: category-level, cart-level, customer-role-based rules. Clean split.
- **E: Support = 3.** Quantity rules interact with cart logic, coupons, and other plugins in edge-case ways. "Why can't my customer check out?" tickets are probable.
- **F: Revenue Speed = 2.** Crowded category. WPFactory has 10K+ installs at 5.0 stars. Hard to compete against an established, well-rated incumbent.
- **G: Platform Risk = 3.** WooCommerce could add basic quantity rules natively. They have not, but it is a straightforward feature.
- **H: Moat = 2.** Commodity feature. Easy to replicate. No expansion beyond quantity rules.

### WooCommerce Shipping Progress Bar (26)

- **A: MVP = 5.** 1-2 weeks. Frontend shortcode/widget, read WooCommerce free shipping threshold, display progress bar. Minimal backend.
- **B: Infra = 5.** Pure WordPress. Zero cost.
- **C: Pain = 3.** Nice-to-have that increases AOV. Not a pain point -- an optimization. Store owners want it but do not lose sleep without it.
- **D: Freemium = 3.** Hard to gate. The core feature (a progress bar) is simple. Premium: styling options, multiple thresholds, A/B testing? Thin premium proposition.
- **E: Support = 4.** Simple concept. Main support vector is theme compatibility and CSS conflicts. Manageable.
- **F: Revenue Speed = 2.** Multiple free alternatives already exist with 4.5+ ratings. Hard to differentiate or charge premium for a progress bar.
- **G: Platform Risk = 2.** Shopify already has this natively via themes. WooCommerce block themes could add this easily. High platform risk.
- **H: Moat = 2.** Commodity feature. No expansion path. Zero switching cost.

### WooCommerce Accessibility Auto-Fixer (27)

- **A: MVP = 2.** 10-14 weeks for something credible. Must parse and fix HTML/CSS across thousands of theme/plugin combinations. WCAG 2.2 has dozens of success criteria with edge cases. Testing across themes is labor-intensive.
- **B: Infra = 5.** Runs on merchant's server, scanning and fixing their own markup. No external APIs needed for the core product.
- **C: Pain = 4.** EAA compliance is mandatory for EU e-commerce since June 2025. ADA lawsuits continue in the US. Regulatory pain is real but awareness is still growing. Not yet at panic level for most store owners.
- **D: Freemium = 3.** Hard to split cleanly. A free "checker" with paid "fixer" works but the checker alone competes with Equalize Digital (5-star rating, 10K+ installs, NASA customer). The premium auto-fix is the differentiation, making the free tier weaker.
- **E: Support = 2.** Accessibility fixing across themes (Astra, Divi, Elementor, Kadence, etc.) generates endless edge cases. "Your fixer broke my layout" and "it says I'm compliant but the audit failed" tickets are guaranteed.
- **F: Revenue Speed = 2.** Longer build means later launch. Market education needed (most store owners do not know they need WCAG compliance). Longer sales cycle than utility tools.
- **G: Platform Risk = 5.** WordPress will never build a native accessibility auto-fixer. This is specialized compliance tooling far outside WordPress core's scope.
- **H: Moat = 4.** Regulatory compliance creates stickiness. WCAG expertise is a genuine barrier to entry. Once a store passes an audit using your fixer, they will not remove it. Years to replicate credibly.

### WooCommerce Update Shield (20)

- **A: MVP = 2.** 8-12 weeks. Must create filesystem copies and database clones across different hosting environments. Handle symlinks, non-standard installs, shared hosting constraints. High risk of edge-case bugs.
- **B: Infra = 4.** Mostly runs on merchant's server but may need a compatibility database (known plugin conflicts per WooCommerce version) hosted externally. Docked one point for potential API backend.
- **C: Pain = 3.** Real but episodic. Major WooCommerce updates happen 3-4 times per year. Between updates, the plugin sits idle. Pain is "I might get burned" not "my afternoon is ruined."
- **D: Freemium = 3.** Hard to split. Free: basic staging? Premium: compatibility scanning + rollback? But if staging does not include rollback, it is not useful. And if it does, the premium value is thin.
- **E: Support = 1.** Staging tools interact with every hosting environment differently. Shared hosting memory limits, execution timeouts, symlink handling, custom wp-content paths, multisite. Every unique hosting setup is a support ticket waiting to happen. Rollback failures on live stores are reputation-killing.
- **F: Revenue Speed = 2.** Niche market (self-hosted WooCommerce stores on cheap hosting). Managed hosting customers (WP Engine, Kinsta) already have staging built in. Long build time delays launch.
- **G: Platform Risk = 2.** Hosting providers are actively adding staging features. WP Engine, Kinsta, Bluehost all have staging. As managed hosting adoption grows, the addressable market shrinks.
- **H: Moat = 3.** WooCommerce-specific compatibility scanning is defensible but the core staging technology is being commoditized by hosting providers.

---

## Rankings by Total Score

| Rank | Idea | Total | Category |
|---|---|---|---|
| 1 | WooCommerce Smart Bulk Editor | 35 | Anchor product |
| 2 | WooCommerce Smart Sale Scheduler | 34 | Plugin #2 candidate |
| 3 | WooCommerce Profit Calculator | 31 | Plugin #3 candidate |
| 3 | WooCommerce Stock Alerts Dashboard | 31 | Plugin #3 candidate (tied) |
| 5 | WooCommerce Order Status Automator | 30 | Future portfolio |
| 6 | WooCommerce Quick Order Notes | 29 | Future portfolio |
| 7 | WooCommerce Email Template Builder Lite | 27 | Future portfolio |
| 7 | WooCommerce Accessibility Auto-Fixer | 27 | Long-term high-moat play |
| 7 | WooCommerce Product Cloner Pro | 27 | Future portfolio |
| 7 | WooCommerce Min/Max & Step Quantities | 27 | Future portfolio |
| 11 | WooCommerce Shipping Progress Bar | 26 | Low priority |
| 12 | WooCommerce Image Watermarker | 24 | Low priority |
| 13 | WooCommerce Update Shield | 20 | Not recommended |

---

## Top 3 Recommendations

### 1. WooCommerce Smart Bulk Editor (35 points)

The Bulk Editor wins because it scores highest on the two dimensions that matter most for a first product: pain severity (5) and freemium fit (5). Every WooCommerce store with 50+ products feels this pain daily, and the competitive landscape is uniquely weak in exactly the right way. All six major competitors have crippled free versions, giving AmazingPlugins a clear differentiation angle: ship a free version that actually works, with variation editing and undo included. The 5-6 week build timeline is longer than a true micro-plugin but justified by the revenue ceiling ($49/yr in a market where Smart Manager charges $199/yr). This plugin is already confirmed as Plugin #1. It anchors the brand and creates the cross-sell engine for everything that follows.

### 2. WooCommerce Smart Sale Scheduler (34 points)

The Sale Scheduler is the ideal Plugin #2 because it scores 5/5 on the two fastest-path dimensions: MVP speed and infra cost. It is a 2-3 week build wrapping existing WooCommerce sale price fields with a bulk scheduling UI and calendar view. No one owns this niche as a standalone focused product; it is always a sub-feature buried in complex bulk editors. A purpose-built "Sale Scheduler" with a clean calendar interface will rank for "schedule WooCommerce sale" queries with no strong incumbent. The natural cross-sell with the Bulk Editor is immediate: "Edit products in bulk? Schedule sales in bulk too." Ship this 4-6 weeks after the Bulk Editor launches to stack WordPress.org authority fast.

### 3. WooCommerce Profit Calculator (31 points, tiebreaker over Stock Alerts)

The Profit Calculator edges out the Stock Alerts Dashboard at the same score because of two factors: better moat (4 vs 3) and better timing. WooCommerce added native COGS in v10.3 (late 2025) but generates zero reports from it. There is a narrow first-mover window before incumbents (WPFactory, YITH) bolt reporting onto their existing COGS plugins. A lightweight, free profit dashboard that reads the native WooCommerce COGS field, with no duplicate data entry, fills a gap no other free plugin currently occupies. The Stock Alerts Dashboard, while scoring equally overall, overlaps with the Bulk Editor's roadmap (the Bulk Editor will eventually show stock columns and filters, reducing the standalone value of a separate stock plugin). The Profit Calculator has no such overlap.

---

## Blank Template for Future Ideas

Copy this row into the scoring matrix table when evaluating a new idea:

```
| **[Plugin Name]** | ? | ? | ? | ? | ? | ? | ? | ? | **?** |
```

Score each dimension 1-5 using the definitions at the top of this document, then sum for the total. Compare against existing scores to determine priority. Any idea scoring 30+ is worth validating. Below 25 is low priority unless a specific dimension score is a 5 that warrants investigation.

### Scoring Checklist for New Ideas

- [ ] **A: Easiest MVP** -- Can I ship a working free version to WordPress.org in 2 weeks (5), 4 weeks (4), 6 weeks (3), 8 weeks (2), or 12+ weeks (1)?
- [ ] **B: Low/no infra cost** -- Does it run entirely on the merchant's server with no external APIs or hosted backend?
- [ ] **C: Store-owner pain severity** -- Is this a daily workflow blocker (5), weekly annoyance (4), monthly inconvenience (3), occasional friction (2), or nice-to-have (1)?
- [ ] **D: Freemium fit** -- Can I draw a clean line where free is genuinely useful and premium is genuinely compelling, without the free feeling crippled or the premium feeling thin?
- [ ] **E: Low support complexity** -- Will this plugin work the same way on every WordPress/WooCommerce install, or will hosting environments, theme conflicts, and plugin interactions create a support burden?
- [ ] **F: Speed to first revenue** -- Given existing competition, market awareness, and the free-to-paid funnel, how fast can this generate a paying customer after launch?
- [ ] **G: Platform risk** -- Is this something WordPress or WooCommerce would build natively? Check WooCommerce GitHub roadmap and recent core releases for signals.
- [ ] **H: Moat/expansion potential** -- Does using this plugin create switching cost, data lock-in, or workflow dependency? Does it lead to adjacent products under the AmazingPlugins brand?
