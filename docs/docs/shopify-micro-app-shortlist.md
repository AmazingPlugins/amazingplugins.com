# Shopify Micro-App Shortlist -- AmazingPlugins

**Date:** April 8, 2026
**Purpose:** 10 Shopify micro-app ideas ranked by ease of MVP + revenue potential, with honest platform comparison
**Constraints:** 2-5 week solo MVP, low/zero ongoing infra cost, store-owner painkiller, not SEO/marketing/content, not compliance-heavy, freemium or low-friction listing, fast path to first revenue (90 days)

---

## Shopify Context: What Makes This Different from WordPress

Before diving into ideas, three realities shape every decision here:

1. **Every Shopify app needs a backend.** Unlike WordPress where a plugin is a PHP file that runs on the merchant's server, Shopify apps are hosted services. You run a web server (Laravel works well here via the official `shopify-app-template-php` and `Kyon147/laravel-shopify` package). This means ongoing hosting cost, even if small (a $5-7/month VPS handles hundreds of installs).

2. **Approval takes 1-4 weeks.** Simple utility apps with clean OAuth, correct scopes, and Polaris-compliant UI can clear in 1-2 days. Apps with complex billing, server-side processing, or security-sensitive scopes take 5-10+ business days. Plan for 2 weeks as the baseline.

3. **Shopify absorbs successful app categories.** Shopify natively expanded into checkout extensibility, advanced discounting, 2,000-variant products, AI product photos, and multi-channel campaigns in 2025-2026 alone. Any app you build should solve a workflow problem Shopify is unlikely to absorb (operational tooling, not platform features).

4. **Revenue share is generous early.** Developers keep 100% of the first $1M in lifetime gross app revenue, then 85% above that. Monthly subscription billing is standard. Average paid app costs $58.49/month, but for simple utility apps targeting small merchants, $5-19/month is the entry sweet spot.

---

## Full Shortlist (10 Ideas)

| # | App Idea | Core Pain | Build Size |
|---|---|---|---|
| 1 | Sale & Price Scheduler | No native way to schedule future price changes or time-limited sales across products | S |
| 2 | Order Internal Notes & Team Tags | No rich internal notes on orders for team coordination; native notes are flat text with no flags or filters | S |
| 3 | Low Stock Alerts Dashboard | No consolidated view of stock health; Shopify only shows stock per-product with no alerting | S |
| 4 | Bulk Order Status Tagger | Manual order tagging is tedious; merchants need auto-rules based on order properties | S |
| 5 | Product Cost & Profit Tracker | Shopify has a cost-per-item field but generates no profit reports from it | M |
| 6 | Scheduled Product Publisher | No native scheduling for publish/unpublish of products; needed for drops, launches, seasonal items | S |
| 7 | Order Export & Report Builder | Native export is limited; merchants want custom CSV/PDF reports with specific fields | M |
| 8 | Shipping Progress Bar (Free Shipping Upsell) | "Add $X more for free shipping" bar to increase AOV; existing apps are overpriced for what they do | S |
| 9 | Min/Max Order Quantity Rules | Setting minimum/maximum purchase quantities per product or variant requires code or expensive apps | S |
| 10 | Quick Reorder (Repeat Purchase) | B2C stores with consumable products have no simple "reorder my last order" button for customers | M |

---

## Top 5 Ranked

Scoring: easiest MVP (2-5 weeks solo) + best revenue potential within 30-90 days + fits all constraints.

---

### Rank 1: Sale & Price Scheduler

**Pain Description:**
Shopify has no native way to schedule a future price change. If a merchant wants to run a weekend sale starting Friday at 6pm, they must manually edit prices at exactly 6pm and manually revert them Monday morning. For stores with 50-500 products, this means either staying up to edit prices or accepting that the sale starts "whenever I get around to it." The existing apps in this space (NA Bulk Price Editor, JD Auto Schedule, Simple Product Price Scheduler) work but have significant UX friction, mixed reviews, or are bundled with features merchants do not need. No app owns this niche the way a focused, clean "schedule your sale" tool could.

**Required Shopify APIs:**
- GraphQL Admin API: `productUpdate` mutation (to set/revert prices)
- `productVariantsBulkUpdate` for bulk variant price changes
- Product and collection queries for filtering
- App Bridge for embedded admin UI
- Billing API for subscription charges

**Review/Approval Risk: LOW**
This is a pure utility app with no sensitive data scopes. It reads/writes product prices only. No customer data, no checkout modification, no payment processing. Fast approval category.

**Likely Pricing:**
- Free: Schedule up to 5 products per sale, 1 active scheduled sale
- Basic: $7.99/month -- unlimited products, 5 active schedules
- Pro: $14.99/month -- unlimited schedules, recurring sales, collection-based scheduling

**Build Complexity: S (Small -- 2-3 weeks)**
The core is a Laravel backend that stores scheduled price changes in a database, runs a cron job to apply/revert prices via the GraphQL Admin API at the scheduled time. The frontend is an embedded Shopify admin page (using App Bridge + Polaris components) with a product picker, price editor, and date/time selector. No complex UI library needed -- Polaris provides the date picker, resource picker, and data table components natively.

**Why It Fits Constraints:**
- Infra cost: one $5-7/month VPS handles hundreds of merchants (the cron job is lightweight)
- Universal demand: every store runs sales
- Not SEO/marketing/content: this is operational workflow tooling
- Fast approval: simple scopes, no checkout or payment involvement
- Mirrors the WooCommerce Sale Scheduler concept from the WordPress shortlist, creating knowledge reuse across platforms

---

### Rank 2: Low Stock Alerts Dashboard

**Pain Description:**
Shopify shows stock levels on individual product pages but provides no consolidated inventory health view. There is no "which products are running low?" dashboard, no configurable alert thresholds per product, and no notification when stock drops below a custom level. Merchants with 100+ SKUs discover stockouts when customers complain, not when they check their admin. Shopify Flow can tag products at low stock, but it requires Plus ($2,000/month) or an Advanced plan, and even then, it provides no visual dashboard. Existing inventory apps (Stocky, Stock Perfect) focus on forecasting and purchase orders -- overkill for small-to-mid stores that just want "tell me when things are low."

**Required Shopify APIs:**
- GraphQL Admin API: Product and InventoryLevel queries
- Webhooks: `inventory_levels/update` for real-time stock change detection
- App Bridge for embedded dashboard
- Billing API

**Review/Approval Risk: LOW**
Read-only product and inventory scopes. No customer data. Straightforward utility app.

**Likely Pricing:**
- Free: Dashboard for up to 25 products, email alerts
- Basic: $6.99/month -- unlimited products, custom thresholds per product
- Pro: $12.99/month -- Slack/webhook alerts, stock velocity tracking, CSV export

**Build Complexity: S (Small -- 2-3 weeks)**
The backend listens to inventory webhooks, stores stock levels, and checks against thresholds. The dashboard is an embedded admin page with a color-coded table (green/yellow/red) built using Polaris components. Email alerts are a simple mailer triggered by the threshold check. No complex calculations at the MVP stage.

**Why It Fits Constraints:**
- Solves a daily problem (checking inventory health) that every product-based store has
- The free version is immediately useful, driving installs and reviews
- Low infra cost: webhook listener + simple database + email sending
- Not competing with enterprise inventory management -- positioned as the simple, focused alert tool
- Fast approval: read-only inventory access, no sensitive scopes

---

### Rank 3: Order Internal Notes & Team Tags

**Pain Description:**
Shopify's native order notes are a flat text field. For stores with 2+ people handling orders, there is no way to flag an order for attention, color-code by priority, tag orders for specific team members, or filter the order list by internal note status. The result: stores use Slack threads, spreadsheets, or sticky notes to coordinate on orders. The existing tagging apps (OrderTagger, Leap Auto Tags, Tag Robot) focus on automated rule-based tagging, not human-to-human team coordination. There is a gap for a simple "internal order notes + priority flags + team mentions" tool that makes the orders list actionable for small teams.

**Required Shopify APIs:**
- GraphQL Admin API: `orderUpdate` mutation (for metafields and tags)
- Order queries with metafield access
- App Bridge for embedded UI in order detail page
- Billing API

**Review/Approval Risk: LOW**
Order read/write is a standard scope. No customer PII beyond what is already in the order. No checkout modification.

**Likely Pricing:**
- Free: Internal notes on orders, 3 custom flags/tags
- Basic: $5.99/month -- unlimited flags, color coding, filter by flag
- Pro: $11.99/month -- team mentions, note history/audit log, bulk operations

**Build Complexity: S (Small -- 2-3 weeks)**
Notes and flags are stored as order metafields. The UI is an App Bridge extension embedded in the order detail page plus a filtered orders list view. Polaris provides all needed components. The backend is thin: CRUD operations on metafields with minimal business logic.

**Why It Fits Constraints:**
- Solves a real coordination pain for any store with more than one person handling orders
- Very small app surface area -- easy to build, easy to maintain
- Low infra: metafield reads/writes are lightweight
- The "team notes" angle differentiates from pure auto-tagging apps
- Low churn: once a team builds workflows around internal notes, they do not remove the app

---

### Rank 4: Product Cost & Profit Tracker

**Pain Description:**
Shopify has a "Cost per item" field on every product variant. Most merchants fill it in. But Shopify generates zero profit reporting from this data. There is no "which products are profitable?" view, no "what was my margin this month?" dashboard, no "this product is selling at a loss" alert. Merchants either export to spreadsheets or pay for BeProfit ($49-149/month), Lifetimely ($49-199/month), or TrueProfit ($25-99/month) -- apps that are powerful but expensive and complex for small stores that just want basic profit visibility. The gap is a lightweight profit dashboard that reads the existing cost-per-item field and calculates margins, with no setup required beyond what the merchant has already entered.

**Required Shopify APIs:**
- GraphQL Admin API: Product (cost per item), Order (line items, shipping, taxes)
- Analytics API or order queries for historical data
- App Bridge for embedded dashboard
- Billing API

**Review/Approval Risk: LOW-MEDIUM**
Requires order read access (contains customer info). Straightforward justification: "we read orders to calculate profit." Slightly more scrutiny than a pure product-data app, but standard for analytics apps.

**Likely Pricing:**
- Free: Profit dashboard for last 7 days, top 10 products by margin
- Basic: $9.99/month -- 30/90/365 day ranges, all products, CSV export
- Pro: $19.99/month -- include ad spend (manual entry), shipping costs, payment processing fees, email digest

**Build Complexity: M (Medium -- 3-4 weeks)**
The medium complexity comes from: (a) efficiently querying order history for stores with thousands of orders, (b) handling variants with different costs, (c) caching aggregated profit data to avoid recalculating on every page load, (d) handling currency conversion for international orders. The dashboard itself is standard Polaris components (data tables, charts via a simple charting library).

**Why It Fits Constraints:**
- Reads data the merchant has already entered -- zero onboarding friction ("see your profit in 30 seconds")
- Existing competitors are priced at $49-199/month -- a $9.99/month focused alternative has clear positioning
- Not SEO/marketing: this is pure operational analytics
- Timing parallel to the WooCommerce Profit Calculator concept -- can share domain knowledge
- "Know your real profit" sells itself

---

### Rank 5: Scheduled Product Publisher

**Pain Description:**
Shopify has no native way to schedule when a product goes live or gets hidden. For stores doing product drops, seasonal collections, or pre-launch builds, the merchant must manually set the product to "Active" at the right moment. This is a problem for stores with weekly drops (streetwear, limited edition goods), seasonal businesses (holiday products that should appear November 1 and disappear January 2), and any store that prepares products in advance. Shopify's native scheduling only works for blog posts, not products. The existing app "JD Auto Schedule" handles this but has mixed reviews and bundles pricing features the merchant may not need.

**Required Shopify APIs:**
- GraphQL Admin API: `productUpdate` mutation (status: ACTIVE/DRAFT/ARCHIVED)
- Product queries
- App Bridge for embedded UI
- Billing API

**Review/Approval Risk: LOW**
Product write scope only. No customer data. No checkout. Trivial approval.

**Likely Pricing:**
- Free: Schedule up to 3 products, publish/unpublish
- Basic: $4.99/month -- unlimited products, collection-level scheduling
- Pro: $9.99/month -- recurring schedules, timezone support, Slack notification on publish

**Build Complexity: S (Small -- 2 weeks)**
This is the simplest app on the list. The backend stores a schedule (product ID + target status + datetime), and a cron job fires the `productUpdate` mutation at the scheduled time. The UI is a product picker + datetime selector + a list of upcoming scheduled changes. Polaris provides every component needed. The entire app could ship in under 2 weeks.

**Why It Fits Constraints:**
- Extremely small surface area -- low build time, low maintenance burden
- Solves a real gap: Shopify schedules blog posts but not products
- Low price point means low decision friction for merchants
- Fast approval: simple scopes, simple functionality
- Risk: Shopify could add native product scheduling. Mitigated by the low build investment -- even if Shopify adds this in 12 months, the app will have paid for itself.

---

## Ideas 6-10 (Honorable Mentions)

### 6. Bulk Order Status Tagger
Auto-tag orders based on rules (payment method, shipping country, product type, order value). Existing apps (OrderTagger, Tag Robot) cover this, but pricing starts at $9.99/month for basic features. A simpler, cheaper alternative at $4.99/month with 5 free rules could capture the low end. Build: S. Revenue risk: crowded category with established players; differentiation is price only.

### 7. Order Export & Report Builder
Custom CSV/PDF export of orders with user-defined field selection. Shopify's native export is inflexible. Existing apps (Matrixify, EZ Exporter) are $20-50/month and feature-heavy. A $7.99/month "just export my orders the way I want" app has a market. Build: M. Revenue risk: Shopify could improve native exports; Matrixify is deeply entrenched.

### 8. Shipping Progress Bar (Free Shipping Upsell)
"Add $X for free shipping" bar on cart and product pages. Proven AOV booster. Build: S. Revenue risk: at least 10+ apps do this already; several are free. Hard to differentiate without marketing spend.

### 9. Min/Max Order Quantity Rules
Set minimum and maximum purchase quantities per product, variant, or collection. Required for wholesale-lite and bundle businesses. Build: S. Revenue risk: Shopify's native "purchase options" are expanding; could absorb this. Also several existing apps with strong ratings.

### 10. Quick Reorder (Repeat Purchase Button)
Add a "Reorder" button to the customer account page that re-adds previous order items to cart. For consumable/replenishable products (supplements, pet food, coffee). Build: M. Revenue risk: overlaps with subscriptions apps; Shopify's native subscriptions are expanding. Medium build because it requires storefront integration via theme app extensions.

---

## The Two Candidates to Validate Immediately

### Candidate A: Sale & Price Scheduler
### Candidate B: Low Stock Alerts Dashboard

---

### Why These Two (and Not the Others)

**Sale & Price Scheduler** wins on universality and build speed. Every Shopify store runs sales, and the lack of native price scheduling is a genuine gap that Shopify has not addressed. The MVP is 2-3 weeks because it is a cron job + a product picker + a date selector, all using Polaris components. The existing apps in this space have mediocre UX and bundle unnecessary features. A focused, clean "schedule your sale" tool with a generous free tier will stand out. Additionally, this mirrors the WordPress Sale Scheduler concept from the existing shortlist, creating knowledge reuse: the same mental model, business logic, and pricing strategy apply to both platforms.

**Low Stock Alerts Dashboard** wins on daily-use stickiness and low competition. Unlike auto-tagging or profit analytics, a stock alerts dashboard is something the merchant checks every day. The free version provides genuine value (a color-coded stock health view), which drives installs and reviews. The premium hook (custom thresholds, Slack alerts, stock velocity) justifies a subscription without feeling like a paywall. Existing inventory apps in the Shopify ecosystem target enterprise workflows (forecasting, purchase orders), leaving the "just tell me what is running low" niche underserved.

**Order Internal Notes** is a close third but loses because the TAM is limited to multi-person stores, and the pricing ceiling is low ($5.99-11.99/month). It would be an excellent third app in a portfolio but is not the strongest first bet.

**Profit Tracker** is strong but loses to Sale Scheduler because the Shopify profit analytics space has well-funded incumbents (BeProfit, TrueProfit, Lifetimely) even at the low end, and the "medium" build complexity means 3-4 weeks instead of 2-3. Better as a second or third app after establishing the brand.

**Scheduled Product Publisher** is the easiest to build (2 weeks) but the pricing ceiling is too low ($4.99-9.99/month) and the TAM is narrow (only stores doing drops or seasonal products). It could be a free lead-gen app in a portfolio, not a revenue driver.

---

## 7-Day Validation Plan

### Candidate A: Sale & Price Scheduler

**Day 1-2: Demand Confirmation**
Search the Shopify Community Forums for "schedule sale," "schedule price change," "timed discount," and "automate sale prices." Search r/shopify for the same terms. Screenshot and count unique requests. Check the existing apps (NA Bulk Price Editor, JD Auto Schedule, Simple Product Price Scheduler) and read their 1-3 star reviews -- catalog every complaint about UX, reliability, and missing features. Target: find 15+ unique requests or complaints in the last 12 months confirming merchants want a simpler solution.

**Day 3-4: Competition Audit**
Install the top 3 price scheduling apps on a Shopify development store (free via Shopify Partner account). Document exactly how many clicks it takes to schedule a 20%-off sale on one collection starting Friday at 6pm and ending Monday at 9am. Document what is free vs locked. Identify the specific UX friction points. Target: confirm that no free app offers a clean "pick products, set discount, pick dates, done" workflow in under 5 clicks.

**Day 5: Landing Page**
Create amazingplugins.com/shopify-sale-scheduler with headline: "Schedule Shopify sales in advance. Set it and forget it." Three bullet points (schedule by collection, calendar view of upcoming sales, auto-revert prices when the sale ends). Email signup: "Get early access." One screenshot mockup of the scheduling UI using Polaris-style design.

**Day 6-7: Community Seeding**
Post in the Shopify Community or r/shopify: "Store owners running frequent sales -- how do you handle scheduling price changes? Do you just manually edit everything?" Do NOT mention your app. Gauge responses. Track email signups. Target: 8+ signups from a single landing page with no paid traffic.

---

### Candidate B: Low Stock Alerts Dashboard

**Day 1-2: Demand Confirmation**
Search Shopify Community Forums for "low stock alert," "inventory dashboard," "stock notification," and "out of stock warning." Search r/shopify for the same. Check if Shopify Flow covers this (it does, but only on Advanced/Plus plans at $299-2,000/month -- confirming the gap for Basic/Standard merchants). Read reviews of existing inventory apps and catalog complaints about complexity and price. Target: find 15+ merchants asking for simpler stock visibility.

**Day 3-4: Competition Audit**
Install Stocky (Shopify's own inventory app, limited to Shopify POS Pro locations), Stock Perfect, and one other inventory app on a dev store. Document what they offer for free vs paid. Key question: does ANY app provide a simple, free stock health dashboard with configurable alert thresholds that works on Basic Shopify plans? Target: confirm the gap exists.

**Day 5: Landing Page**
Create amazingplugins.com/shopify-stock-alerts with headline: "Never discover a stockout from a customer complaint again." Three bullet points (real-time stock dashboard, custom alert thresholds, email + Slack notifications). Email signup.

**Day 6-7: Community Seeding**
Post in r/shopify: "How do you track which products are about to run out of stock? I have 200+ SKUs and keep finding out too late." Track responses and signups. Target: 8+ signups.

---

## Decision Gate (Day 8)

**If both validate:** Build Sale & Price Scheduler first (mirrors the WordPress Sale Scheduler for knowledge reuse, ships in 2-3 weeks). Build Low Stock Alerts as app #2.

**If only one validates:** Build that one.

**If neither validates:** Revisit Order Internal Notes or Scheduled Product Publisher.

---

## Honest Platform Comparison: Shopify vs WordPress for AmazingPlugins

This is the most important section in this document.

### The Case for WordPress First (Current Plan)

| Factor | Assessment |
|---|---|
| PHP/Laravel skills | WordPress plugins are pure PHP. Harun's Laravel skills translate directly. No framework mismatch. |
| Hosting cost | Zero. The plugin runs on the merchant's server. No infra to maintain. |
| Distribution | WordPress.org provides free organic discovery via the plugin directory (search from WP Admin). 60,000+ plugins compete, but niche WooCommerce tools rank well with good SEO. |
| Speed to market | Write PHP, submit to WordPress.org (2-4 week review), done. No OAuth, no hosted backend, no webhook infrastructure. |
| Revenue share | 0% on WordPress.org (you sell premium from your own site via Freemius at 7%). |
| Platform risk | Low. WordPress is open-source. No single entity can absorb your plugin category or delist you. |
| Monetization model | Annual subscription ($49-99/yr) via Freemius. Proven model, established tooling. |
| First revenue timeline | Realistic: 30-90 days post-launch for first paid customer via freemium funnel. |

### The Case for Shopify First

| Factor | Assessment |
|---|---|
| PHP/Laravel skills | Shopify's official PHP app template uses Laravel. Good fit. But you also need basic React/Polaris for the embedded admin UI. |
| Hosting cost | $5-7/month minimum for a VPS (Laravel app + database + cron). Not zero. |
| Distribution | Shopify App Store is the sole discovery channel. 12,000+ apps compete. No equivalent of WordPress.org's in-admin search dominance, but 87% of merchants use apps. |
| Speed to market | Longer. You must build a hosted Laravel app, implement OAuth, handle webhooks, build Polaris UI, and pass Shopify's app review (1-4 weeks). Minimum 4-6 weeks from code to live listing. |
| Revenue share | 0% on first $1M lifetime (generous). 15% above that. |
| Platform risk | High. Shopify actively absorbs successful app categories. They added native discounting, B2B, subscriptions, and Flow automation -- all previously app-only. |
| Monetization model | Monthly subscription ($5-20/month for utility apps). Standard, well-supported by Shopify Billing API. |
| First revenue timeline | Realistic: 60-120 days (longer build + review process + slower initial installs). |

### The Honest Verdict

**WordPress is the better first platform for Harun. The existing plan is correct.**

Here is why, with no sugarcoating:

1. **Zero hosting cost matters more than it seems.** When you are pre-revenue, every $7/month VPS is a drain that creates psychological pressure. WordPress plugins run on the merchant's server. You write PHP, upload to WordPress.org, and pay nothing until you start earning. Shopify apps require a hosted backend from day one -- before a single merchant installs your app.

2. **Build speed is dramatically faster on WordPress.** A WooCommerce plugin can go from first line of code to live on WordPress.org in 5-6 weeks (4 weeks building + 2 weeks review). A Shopify app realistically takes 6-8 weeks (3 weeks building the app + 1-2 weeks building OAuth/webhooks/Polaris UI + 2 weeks review). That extra 2-3 weeks delays first revenue by a month.

3. **PHP-only vs PHP+React.** WordPress plugins are 100% PHP with optional vanilla JS. Shopify apps require a React frontend for the embedded admin (Polaris is React-based). Harun's core strength is PHP/Laravel. Learning React/Polaris is achievable but adds friction and slows the first build.

4. **Platform risk is real on Shopify.** Shopify has absorbed discounting, subscriptions, B2B tools, and inventory management features over the last 2 years. A utility app that Shopify decides to build natively can lose 50% of its value overnight. WordPress has never done this -- WooCommerce's native features expand glacially.

5. **Revenue math favors WordPress for the first $5K MRR.** At $49/yr per customer, you need 123 paying customers to hit $500 MRR. WordPress.org's organic discovery funnel (free plugin -> 2% convert to paid) reliably delivers this in 12-18 months for a well-positioned WooCommerce plugin. On Shopify at $9.99/month, you need 50 paying customers for $500 MRR -- fewer customers needed, but acquiring those 50 paying customers on the Shopify App Store (where 54.53% of developers earn under $1,000/month and median first-3-month revenue is literally $0) is harder than it looks.

6. **The one thing Shopify does better:** monthly billing. $9.99/month feels smaller than $49/year even though it is more expensive annually. Monthly billing reduces friction for the first purchase. But this advantage does not outweigh the higher build cost, hosting overhead, and platform risk.

### When to Add Shopify

The existing market analysis already has this right: add Shopify after reaching $2K-3K MRR on WordPress. By then:
- The AmazingPlugins brand has credibility (WordPress.org reviews, install count)
- Revenue from WordPress plugins funds Shopify app hosting costs
- The domain knowledge (sale scheduling, stock alerts, profit tracking) transfers directly -- you are porting concepts, not researching from scratch
- The Laravel/Polaris learning curve is a one-time cost that pays off across multiple Shopify apps

**The recommended Shopify entry point:** Port the Sale & Price Scheduler to Shopify as the first Shopify app. It is the simplest concept to port (same business logic, different API layer), and it validates whether AmazingPlugins can succeed on Shopify with minimal risk.

---

## How These Fit the AmazingPlugins Portfolio (Cross-Platform)

| App Concept | WordPress Version | Shopify Version | Knowledge Reuse |
|---|---|---|---|
| Sale & Price Scheduler | WooCommerce Smart Sale Scheduler | Shopify Sale & Price Scheduler | Same logic: schedule price changes via cron. Different API (WC CRUD vs GraphQL). |
| Stock Alerts Dashboard | WooCommerce Stock Alerts Dashboard | Shopify Low Stock Alerts | Same logic: threshold checks + alerts. Different data source. |
| Profit Calculator/Tracker | WooCommerce Profit Calculator | Shopify Product Cost & Profit Tracker | Same concept: read COGS, calculate margins. WooCommerce reads native COGS field; Shopify reads cost-per-item. |
| Bulk Product Editor | WooCommerce Smart Bulk Editor (Plugin #1) | Shopify already has Ablestar, Hextom (crowded) | Lower priority for Shopify -- market is more saturated there. |

The portfolio strategy works cross-platform: build on WordPress first where the economics are better, then port winners to Shopify once the brand has traction.

---

## Sources

- [StoreInspect: State of Shopify 2026 (376K+ Stores Analyzed)](https://storeinspect.com/report/state-of-shopify)
- [StoreInspect: Shopify Retention Gap Study](https://storeinspect.com/blog/shopify-retention-gap)
- [Uptek: Shopify App Store Statistics 2026](https://uptek.com/shopify-statistics/app-store/)
- [Market Clarity: 21 Pain Points Shopify Store Owners Face](https://mktclarity.com/blogs/news/pain-points-shopify-users)
- [Market Clarity: How Much Money Can You Make With Shopify Apps](https://mktclarity.com/blogs/news/shopify-app-make-money)
- [Market Clarity: Shopify Revenue Share Policy](https://mktclarity.com/blogs/news/shopify-apps-new-revenue-share-policy)
- [Baremetrics: Top 10 Shopify Merchant Pain Points and App Ideas](https://baremetrics.com/blog/top-10-shopify-merchant-pain-points-and-app-ideas-to-solve-them)
- [Shopify: Build Apps That Address Merchant Pain Points](https://www.shopify.com/partners/blog/build-apps-that-address-merchant-pain-points)
- [Shopify: How to Choose the Right Pricing Model for Your App](https://www.shopify.com/partners/blog/pricing-model)
- [Shopify Editions Winter 2026](https://www.shopify.com/editions/winter2026)
- [Shopify Developer Docs: App Review Process](https://shopify.dev/concepts/app-store/getting-your-app-approved/review-process)
- [Kyon147/laravel-shopify: Laravel Package for Shopify App Development](https://github.com/Kyon147/laravel-shopify)
- [Cloudways: Build Your Shopify App Using Laravel & PHP](https://www.cloudways.com/blog/integrate-laravel-shopify/)
- [LetsMetrix: 4 Shopify Booming Niches with Big App Gaps](https://www.linkedin.com/posts/letsmetrix_4-shopify-booming-niches-with-big-app-gaps-activity-7437052144974848000-Jg2i)
- [Digittrix: Profitable Shopify App Ideas 2025](https://www.digittrix.com/blogs/top-10-most-profitable-shopify-app-ideas-for-2025)
- [Shopplaza: 12 Shopify App Ideas for 2026](https://shopplaza.io/blog/shopify-app-ideas.html)
- [Shopify App Store: NA Bulk Price Editor](https://apps.shopify.com/price-scheduler-plus)
- [Shopify App Store: JD Auto Schedule](https://apps.shopify.com/auto-schedule)
- [Shopify App Store: BeProfit Profit Analytics](https://apps.shopify.com/beprofit-profit-tracker)
- [eSOspace: Shopify App Store Approval Guide](https://eseospace.com/blog/shopify-app-store-approval/)
- Internal: [WordPress Micro-Plugin Shortlist](wordpress-micro-plugin-shortlist.md)
- Internal: [Market Analysis 2026](../research/market-analysis-2026.md)
- Internal: [First Plugin Decision Brief](first-plugin-decision-brief.md)
