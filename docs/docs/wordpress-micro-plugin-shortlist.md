# WordPress Micro-Plugin Shortlist -- AmazingPlugins

**Date:** April 8, 2026
**Purpose:** 10 micro-plugin ideas ranked by ease of MVP + revenue potential
**Constraints:** 2-4 week solo MVP, zero infra cost, freemium, store-owner painkiller, not SEO/marketing/content, not compliance-heavy

---

## Full Shortlist (10 Ideas)

| # | Plugin Idea | Core Pain | Build Size |
|---|---|---|---|
| 1 | WooCommerce Smart Sale Scheduler | No way to schedule price changes (start/end sales) in bulk across products | S |
| 2 | WooCommerce Order Status Automator | Manual order status transitions waste hours daily; custom statuses need code | S |
| 3 | WooCommerce Stock Alerts Dashboard | No single view showing low stock, out of stock, and overstock across the catalog | S |
| 4 | WooCommerce Email Template Builder (Lite) | Default WooCommerce emails are ugly; customizing requires code or expensive plugins | M |
| 5 | WooCommerce Quick Order Notes | Internal team notes on orders are buried; no way to flag, color-code, or filter by note status | S |
| 6 | WooCommerce Profit Calculator | WooCommerce added COGS field in v10.3 but generates zero usable reports from it | M |
| 7 | WooCommerce Product Cloner Pro | Native duplication breaks variable products; no bulk clone with field remapping | S |
| 8 | WooCommerce Min/Max & Step Quantities | Setting purchase quantity rules per product/category requires premium plugins or custom code | S |
| 9 | WooCommerce Image Watermarker | Store owners need bulk watermarks on product images; existing plugins are slow or premium-only | M |
| 10 | WooCommerce Shipping Progress Bar | "Add $X more for free shipping" bars increase AOV but existing free plugins are buggy or limited | S |

---

## Top 5 Ranked

Scoring criteria: easiest MVP (can ship in 2-4 weeks) + best revenue potential within 30-90 days + fits all constraints.

---

### Rank 1: WooCommerce Smart Sale Scheduler

**Core Pain:**
Store owners run sales constantly -- Black Friday, seasonal clearances, flash sales, end-of-season. WooCommerce lets you set sale prices with start/end dates on individual products, but there is no way to schedule a sale across 50 or 500 products at once. You either edit each product manually (30 seconds each x 200 products = nearly 2 hours) or use a bulk editor that does not support scheduling. Store owners in WooCommerce forums and subreddits routinely ask "how do I schedule a sale for an entire category?" The answer is always "manually" or "buy a $149+ plugin."

**Free Tier Wedge:**
- Select products by category/tag, apply percentage or fixed discount, set start and end datetime
- Visual calendar showing upcoming and active sales
- Bulk schedule up to 50 products at a time

**Premium Hook ($49/yr):**
- Unlimited products per scheduled sale
- Recurring sales (e.g., "every Friday 6pm-midnight, 10% off category X")
- Sale performance dashboard (revenue during sale vs. before/after)
- Stacking rules (prevent double-discounting)
- CSV export of scheduled sales
- Email notification when a sale starts/ends

**Build Complexity: S (Small -- 2-3 weeks)**
This is a thin wrapper around WooCommerce's existing sale price + date fields. The core logic is: query products by filter criteria, set `_sale_price`, `_sale_price_dates_from`, `_sale_price_dates_to` via WC CRUD API, schedule a WP-Cron event to sync prices. The frontend is a simple form with a date picker and product selector. No external APIs, no complex UI library needed.

**Why It Fits:**
- Zero infrastructure -- pure WordPress plugin, uses WP-Cron for scheduling
- Every WooCommerce store runs sales; this is universal demand
- The free version is genuinely useful (not crippled) so it will earn WordPress.org installs and reviews
- No existing plugin does ONLY this well. Bulk editors include it as a secondary feature buried in complex UI. A focused "sale scheduler" with a calendar view is differentiated positioning
- Natural cross-sell with the Bulk Editor (Plugin #1): "Edit products in bulk? Schedule sales in bulk too."

---

### Rank 2: WooCommerce Profit Calculator

**Core Pain:**
WooCommerce 10.3 (late 2025) added a Cost of Goods Sold (COGS) field natively, but it generates zero usable profit reports. Store owners now have cost data sitting in their database with no way to answer "which products are actually profitable?" or "what was my real profit this month after COGS?" The gap between having the data field and having actionable reporting is the entire product opportunity. Before 10.3, stores needed third-party plugins just to store COGS data. Now that WooCommerce stores the data natively, a lightweight reporting plugin can read it without asking users to re-enter anything.

**Free Tier Wedge:**
- Reads native WooCommerce COGS field (no duplicate data entry)
- Dashboard widget: total revenue, total COGS, gross profit, margin % for last 7/30/90 days
- Product profit table: sortable by margin %, profit per unit, total profit
- Top 10 most/least profitable products

**Premium Hook ($49/yr):**
- Profit by category, by date range, by customer
- Include additional costs: shipping, payment gateway fees (auto-detected), tax
- Profit trends chart (daily/weekly/monthly)
- Break-even calculator per product
- CSV/PDF export of profit reports
- Email digest: weekly profit summary to inbox
- WooCommerce Analytics integration (custom profit tab)

**Build Complexity: M (Medium -- 3-4 weeks)**
The read side is straightforward: query order line items, join with product COGS meta, calculate margins. The dashboard and tables are standard WordPress admin pages. The medium complexity comes from: (a) handling variable products where each variation may have different COGS, (b) historical accuracy (COGS at time of order vs. current COGS), (c) performance with large order volumes (needs aggregate caching). No external APIs, no frontend.

**Why It Fits:**
- Rides the native WooCommerce COGS feature -- timing is perfect, stores are just starting to populate this field
- Zero infrastructure -- reads existing WooCommerce data, no external services
- Existing COGS plugins (WPFactory, YITH) focus on the data entry side, not reporting. Alpha Insights is the closest competitor but costs $149/yr and is bloated with features most stores don't need
- Store owners who understand their margins make better pricing decisions and stick around (low churn)
- "Know your real profit" is a message that sells itself

---

### Rank 3: WooCommerce Stock Alerts Dashboard

**Core Pain:**
WooCommerce sends a single email when a product hits the low stock threshold. That's it. There is no dashboard showing all stock levels at a glance, no "which products are about to run out this week" view, no "which products have been out of stock for 30+ days" warning. Store owners with 100+ SKUs spend time clicking into individual products to check stock levels or export CSVs to a spreadsheet. The existing "Low Stock Alert" plugin on WordPress.org has 1,000 installs and only sends emails -- no dashboard, no intelligence.

**Free Tier Wedge:**
- Single-page stock dashboard: all products with stock levels, sortable/filterable
- Color-coded rows: green (healthy), yellow (low stock), red (out of stock)
- "Needs Reorder" view: products below threshold, sorted by urgency
- Quick-edit stock quantity inline (without leaving the dashboard)
- Out-of-stock duration tracker: "Product X has been out of stock for 14 days"

**Premium Hook ($49/yr):**
- Stock forecasting: "At current sales velocity, Product X will run out in 12 days"
- Reorder report: CSV export of products needing restock with suggested quantities
- Slack/email alerts for stock events (not just low stock -- also "back in stock" and "stock declining fast")
- Historical stock level charts per product
- Multi-warehouse/location support
- Supplier reorder templates (pre-formatted purchase orders)

**Build Complexity: S (Small -- 2-3 weeks)**
The core is a WP admin page with a WP_Query fetching products with `_stock` and `_stock_status` meta. The dashboard table uses standard WordPress admin table (WP_List_Table) with sortable columns and filters. Inline quick-edit is a simple AJAX save. The "out of stock duration" requires a one-time scan to record the first date a product went out of stock (store as product meta). No external APIs, no complex frontend.

**Why It Fits:**
- Every store with physical products needs inventory visibility
- The free version solves a real daily problem (checking stock) without any premium gate
- Existing solutions are either email-only (Low Stock Alert) or bloated inventory management suites (ATUM, which has 10K+ installs but overwhelms small stores)
- Natural cross-sell with the Bulk Editor: stock dashboard identifies problems, Bulk Editor fixes them
- The "stock forecasting" premium feature is a genuine power tool that justifies $49/yr

---

### Rank 4: WooCommerce Order Status Automator

**Core Pain:**
WooCommerce ships with 7 order statuses (pending, processing, on-hold, completed, cancelled, refunded, failed). Most stores need more: "packed," "shipped," "awaiting pickup," "ready for local delivery." Creating custom statuses requires code or a plugin, and then automating transitions between them (e.g., "auto-complete virtual product orders" or "move to shipped when tracking number is added") requires yet another plugin. Store owners managing 50+ orders/day waste significant time manually clicking status buttons. The existing free plugins (Custom Order Status for WooCommerce by Tyche) handle status creation but have limited automation rules.

**Free Tier Wedge:**
- Create unlimited custom order statuses with custom colors and icons
- 3 built-in automation rules:
  - Auto-complete orders for virtual/downloadable products
  - Auto-cancel orders still "pending" after X days
  - Auto-move "processing" to "completed" after X days
- Custom status emails (send a specific email template when an order enters a custom status)

**Premium Hook ($49/yr):**
- Unlimited automation rules with conditional logic (if payment method = X AND product category = Y, then status = Z)
- Scheduled status transitions ("move all 'processing' orders to 'shipped' at 6pm daily")
- Bulk status change from orders list with one click
- Status change audit log (who changed what, when)
- Webhook triggers on status change (connect to Zapier, shipping APIs, etc.)
- Conditional customer notifications per status

**Build Complexity: S (Small -- 2-3 weeks)**
Custom post statuses in WordPress are a well-understood pattern (register_post_status). The automation engine is WP-Cron jobs checking order meta against rules. Email templates use WooCommerce's existing email class system. The admin UI is a settings page with a rules builder (condition + action pattern). No external APIs needed.

**Why It Fits:**
- Every store with a fulfillment workflow needs this
- Existing free plugins handle status creation but not automation -- combining both in one plugin is the differentiation
- The "auto-complete virtual products" rule alone would drive installs because this is one of the most-searched WooCommerce questions
- Pairs with the Order Notes plugin concept for a complete order management stack under AmazingPlugins

---

### Rank 5: WooCommerce Email Template Builder (Lite)

**Core Pain:**
WooCommerce transactional emails (order confirmation, shipping notification, etc.) look generic and unprofessional out of the box. The only native customization is changing header color and adding a logo. Store owners want branded emails that match their site. The existing solutions fall into two camps: (a) expensive full-featured builders like Jestar/Kadence that cost $79-149/yr, or (b) free plugins with extremely limited template options. The #1 complaint on Email Customizer Pro reviews is "customization is very limited -- stuck with templates that are not flexible at all."

**Free Tier Wedge:**
- Visual preview of all WooCommerce email types (order confirmation, processing, completed, refunded, etc.)
- Customize: logo, header/footer colors, background color, font family, button colors
- Add custom text blocks above and below order details
- Add social media icons to footer
- Live preview (see changes without sending test emails)
- Mobile-responsive email output

**Premium Hook ($49/yr):**
- Drag-and-drop email builder with columns, images, spacers, dividers
- Custom email templates per order status
- Conditional content blocks (show different text based on product category, payment method, or shipping method)
- Custom CSS editor with syntax highlighting
- Email analytics (open rate tracking via pixel)
- Template library: 10+ pre-designed professional templates

**Build Complexity: M (Medium -- 3-4 weeks)**
The core is hooking into WooCommerce's email template system (woocommerce_email_header, woocommerce_email_footer, woocommerce_email_styles). The visual preview uses an iframe rendering the email template with live CSS injection. The free version is CSS overrides + content insertion hooks -- no drag-and-drop needed. The medium complexity comes from ensuring emails render correctly across email clients (Gmail, Outlook, Apple Mail), which requires inline CSS and table-based layouts. No external APIs.

**Why It Fits:**
- Every WooCommerce store sends transactional emails -- 100% of stores are potential users
- The free version provides immediate visible value (branded emails) without premium
- Competitors are either expensive or poorly rated
- Low churn: once a store customizes their emails, they don't remove the plugin
- Natural touchpoint for brand awareness: every customer email includes "Powered by AmazingPlugins" link in free version (removable in premium)

---

## Ideas 6-10 (Honorable Mentions)

### 6. WooCommerce Quick Order Notes
Internal team notes on orders with color-coded flags, pin important notes, filter orders by note status. Lightweight alternative to "Important Order Notes" ($79/yr). Build: S. Revenue risk: small TAM, mostly multi-employee stores.

### 7. WooCommerce Product Cloner Pro
Bulk duplicate products with field remapping (change SKU prefix, adjust prices, swap categories). Native WooCommerce duplication breaks variable products. Build: S. Revenue risk: low frequency use case, hard to justify annual subscription.

### 8. WooCommerce Min/Max & Step Quantities
Set minimum order quantity, maximum quantity, and step increments per product or category. Free version covers product-level rules; premium adds category-level and cart-level rules. Build: S. Revenue risk: crowded with 5+ existing plugins, WPFactory has 10K+ installs at 5.0 stars.

### 9. WooCommerce Image Watermarker
Bulk apply text or image watermarks to product photos. Protects against image theft. Build: M. Revenue risk: one-time-use feature (apply once and done), hard to justify recurring billing.

### 10. WooCommerce Shipping Progress Bar
"Add $X more for free shipping" bar on cart/shop pages to increase average order value. Build: S. Revenue risk: multiple free options already exist with 4.5+ ratings; hard to differentiate.

---

## The Two Candidates to Validate Immediately

### Candidate A: WooCommerce Smart Sale Scheduler

### Candidate B: WooCommerce Profit Calculator

---

### Why These Two (and Not the Others)

**Sale Scheduler** wins on speed and universality. Every WooCommerce store runs sales. The MVP is 2-3 weeks because it wraps existing WooCommerce fields (sale price + date range) with a bulk UI and a calendar. No one owns this niche as a standalone product -- it is always a sub-feature buried in complex bulk editors or marketing suites. A focused, well-named "Sale Scheduler" plugin will rank for "schedule WooCommerce sale" queries that have no strong incumbent.

**Profit Calculator** wins on timing and stickiness. WooCommerce adding native COGS in v10.3 created a new category of user: store owners who now have cost data but no reports. This is a narrow window before incumbents (WPFactory, YITH) add reporting to their existing COGS plugins. First-mover on "profit reporting for native WooCommerce COGS" is a defensible position. Once a store owner sees their profit dashboard daily, they do not uninstall it.

**Stock Alerts Dashboard** is a close third but loses to Profit Calculator because the stock dashboard overlaps with the Bulk Editor's roadmap (the Bulk Editor will eventually show stock columns and filters, reducing the standalone value of a separate stock plugin).

**Order Status Automator** is strong but loses to Sale Scheduler because the custom status market already has established free plugins with good ratings (Tyche, Bright Plugins). Differentiating requires the automation engine, which pushes the MVP closer to 4 weeks.

**Email Template Builder** is strong on TAM but loses because email rendering across clients (Gmail, Outlook, Apple Mail) is a testing rabbit hole that can easily balloon a 3-week project into 6+ weeks.

---

## 7-Day Validation Plan

### Candidate A: WooCommerce Smart Sale Scheduler

**Day 1-2: Demand Confirmation**
Search WordPress.org support forums for "schedule sale," "bulk sale price," and "sale date" across WooCommerce, BEAR, Smart Manager, and PW Bulk Edit. Screenshot and count the requests. Search r/woocommerce for "schedule sale" and "Black Friday prices" threads. Target: find 20+ unique requests in the last 12 months confirming people want this and cannot find a focused solution.

**Day 3-4: Competition Audit**
Install the top 3 plugins that claim to offer sale scheduling (Finale Lite, YITH Dynamic Pricing, and the native WooCommerce bulk edit). Document exactly how many clicks it takes to schedule a sale across 50 products in each. Document what is free vs. locked. Target: confirm that no free plugin offers a clean "select category, set discount, pick dates, done" workflow in under 5 clicks.

**Day 5: Landing Page**
Create amazingplugins.com/woocommerce-sale-scheduler with a single headline: "Schedule WooCommerce sales in bulk. Set it and forget it." Add 3 bullet points (category-based scheduling, calendar view, recurring sales), a "Get Early Access" email signup, and a screenshot mockup of the calendar UI.

**Day 6-7: Community Seeding**
Post a genuine question in r/woocommerce: "How do you handle scheduling Black Friday / seasonal sales across 100+ products? Manual or is there a tool that does this cleanly?" Do NOT mention your plugin. Gauge the responses. If 10+ people reply with "I wish there was something simple," you have demand. Track email signups. Target: 10+ signups in 7 days from a single landing page with no paid traffic.

---

### Candidate B: WooCommerce Profit Calculator

**Day 1-2: Demand Confirmation**
Search WordPress.org for "WooCommerce profit report," "COGS report," and "cost of goods report." Search r/woocommerce and r/ecommerce for "profit margin," "cost of goods," and "which products are profitable." Count stores asking for simple profit visibility. Check how many WooCommerce 10.3+ stores are actively using the native COGS field (look at support forum mentions and GitHub issues). Target: 15+ requests in the last 6 months.

**Day 3-4: Competition Audit**
Install Alpha Insights (free version), WPFactory Cost of Goods (free), and YITH Cost of Goods (free). Document what reporting each free version provides. Key question: does ANY free plugin generate a profit report from the native WooCommerce COGS field (not their own custom field)? If not, that is the gap. Target: confirm that no free plugin reads the native WooCommerce COGS field and produces a one-page profit dashboard.

**Day 5: Landing Page**
Create amazingplugins.com/woocommerce-profit-calculator with headline: "See your real WooCommerce profit. Uses the COGS data you already have." Add a mockup of the profit dashboard (revenue, COGS, gross profit, margin % with a product table sorted by profitability). Email signup: "Get early access."

**Day 6-7: Community Seeding**
Post in r/woocommerce: "Now that WooCommerce has a native COGS field, how are you tracking product-level profit? Any plugin that reads the native field and shows a dashboard?" Track responses and email signups. Target: 8+ signups in 7 days.

---

## Decision Gate (Day 8)

**If both validate:** Build Sale Scheduler first (smaller, ships faster, earns WordPress.org reviews sooner). Build Profit Calculator as plugin #3 after the Bulk Editor.

**If only one validates:** Build that one as plugin #2 after the Bulk Editor.

**If neither validates:** Revisit the Stock Alerts Dashboard or Order Status Automator.

---

## How These Fit the AmazingPlugins Portfolio

The Bulk Editor (Plugin #1, already decided) is the anchor product. These micro-plugins create a product suite for WooCommerce store operations:

| Plugin | Role in Suite | Cross-Sell Path |
|---|---|---|
| Smart Bulk Editor | Edit products in bulk | "Need to schedule a sale? Try Sale Scheduler" |
| Smart Sale Scheduler | Schedule sales in bulk | "Need to edit more fields? Try Bulk Editor" |
| Profit Calculator | Know your real profit | "Need to adjust prices for margin? Use Bulk Editor" |
| Stock Alerts Dashboard | Monitor inventory health | "Need to update stock in bulk? Use Bulk Editor" |

Every plugin feeds installs and cross-sell opportunities back to the others. This is the Barn2 playbook: multiple focused WooCommerce utilities under one brand, each solving one problem well.
