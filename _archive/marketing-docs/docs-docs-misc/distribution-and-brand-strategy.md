# AmazingPlugins — Go-to-Market and Distribution Strategy

**Date:** April 8, 2026
**Author:** Compiled for AmazingPlugins launch
**Updated (April 11, 2026):** Build order updated. Plugin #1 = WooCommerce Smart Bulk Editor (in progress). Plugin #1b = Accessibility Auto-Fixer (WooCommerce + Shopify, after #1 ships). Plugin #2 = Shopify Digital Product Delivery (queued after #1b). Plugin #3 = WooCommerce Order Database Archiver.
**Status:** Strategy locked — act on this

---

## Table of Contents

1. [Brand Strategy: Single vs Per-Plugin](#1-brand-strategy-single-vs-per-plugin)
2. [Launch Sequence: WordPress.org vs Own Site vs Both](#2-launch-sequence-wordpressorg-vs-own-site-vs-both)
3. [Billing Stack: Freemius vs LemonSqueezy vs Paddle vs Stripe](#3-billing-stack)
4. [Content and SEO: First 90 Days](#4-content-and-seo-first-90-days)
5. [Day-1 Metrics](#5-day-1-metrics)
6. [TL;DR Recommendations](#tldr-recommendations)

---

## 1. Brand Strategy: Single vs Per-Plugin

### The Question

Should the WooCommerce Smart Bulk Editor launch under the "AmazingPlugins" umbrella brand, or should it have its own standalone brand identity (e.g., "WooBulkPro," "BulkMate," "GridEdit")?

### The Case for Umbrella Brand (AmazingPlugins)

**Domain authority compounds.**
Every backlink earned, every comparison article that mentions the plugin, every WordPress.org review — it all flows to amazingplugins.com. When Plugin #1b (Accessibility Auto-Fixer) launches, it inherits the authority built by Plugin #1 rather than starting from zero. This is the Barn2 Plugins model: they reached $141K/month under a single brand by building authority on barn2.com, not on separate per-plugin domains.

**Note on dual-platform:** The Accessibility Auto-Fixer covers both WooCommerce (WordPress.org + WooCommerce.com) AND Shopify (Shopify App Store). Both versions share the same core fixer logic. The AmazingPlugins brand provides the framework for both distributions, though Shopify merchants may encounter it via the Shopify App Store.

**Cross-sell is trivial.**
A customer who buys the Bulk Editor is already a WooCommerce store owner with multiple problems. When the Accessibility Fixer launches, the entire Bulk Editor customer base is a pre-qualified audience. This is only possible if they bought from the same brand. A standalone "BulkMate" brand has no cross-sell path.

**Operational simplicity.**
One website, one blog, one email list, one affiliate program, one support inbox, one social media presence. For a solo developer, every additional brand doubles the marketing overhead with no corresponding revenue increase early on.

**Brand-as-moat builds faster.**
Trust in a plugin business is slow to earn and fast to lose. "AmazingPlugins" as a brand that ships quality WooCommerce tools is a more durable moat than a per-plugin brand, because future plugins can inherit that trust rather than rebuilding it from scratch.

### The Case for Per-Plugin Brand

**Exact-match domain SEO advantage.**
A domain like `woocommerce-bulk-editor.com` would rank for exact-match queries out of the gate. This is real but modest — on-page optimization and inbound links matter more than domain names for most queries by 2026.

**Easier to sell independently.**
If a specific plugin becomes a breakout hit and attracts an acquisition offer, a standalone brand is cleaner to separate and sell. This is a valid concern for year 3+, not year 1.

**Stronger product identity for niche communities.**
A plugin with its own name and visual identity may have more community resonance in WooCommerce-specific channels ("Have you seen GridEdit? It does bulk editing really well") vs. "AmazingPlugins has a bulk editor."

### Trade-Off Summary

| Factor | Umbrella Brand | Per-Plugin Brand |
|---|---|---|
| SEO domain authority | Compounds across all plugins | Resets with each plugin |
| Cross-sell capability | Built-in | Requires separate effort |
| Operational overhead | Single system | Multiplied per plugin |
| Year-1 revenue impact | Neutral to positive | Neutral |
| Acquisition readiness | Harder to unbundle | Clean separation |
| Trust-building speed | Faster (carries over) | Slower (starts fresh) |

### Decision Rationale

**Use the AmazingPlugins umbrella brand.** This is the right call for the first 12 months and beyond for a solo developer with a pipeline of multiple plugins.

The per-plugin brand argument becomes compelling only when: (a) you have a breakout hit and want to maximize an acquisition outcome, or (b) you are deliberately building a product studio where each plugin has a distinct audience and voice. Neither applies at launch.

The Barn2 Plugins playbook — single brand, multiple WooCommerce plugins, content-heavy site — is the closest comparable to what AmazingPlugins is building, and they reached $141K/month without ever splitting brands.

**One nuance:** Give the first plugin a clear, memorable product name — "WooCommerce Smart Bulk Editor by AmazingPlugins." The product has a name; the company has a brand. This is how Barn2 operates (e.g., "WooCommerce Product Table by Barn2"). You get product identity without splitting brand authority.

---

## 2. Launch Sequence: WordPress.org vs Own Site vs Both

### The Three Options

**Option A: WordPress.org first, own site later**
Submit free plugin to WordPress.org, spend 2-4 weeks waiting for approval, build organic install base, then add premium once you have social proof (ratings, install count).

**Option B: Own site first, WordPress.org later**
Launch a premium plugin at amazingplugins.com, sell direct, only submit to WordPress.org when premium is stable.

**Option C: Both in parallel**
Develop free and premium simultaneously. Submit to WordPress.org at the same time the premium goes live on amazingplugins.com.

### Why Option A Fails

Launching WordPress.org-only with no premium available means:
- Every free user who wants more has nowhere to go. No conversion path.
- If the plugin gets traction quickly (which is the goal), you are leaving money on the table while scrambling to build premium.
- The WordPress.org approval takes 2-4 weeks. If you submit before premium is ready and get approved immediately, you have a traffic source with no monetization.

### Why Option B Fails

Launching premium-only with no free tier:
- Discovery is nearly impossible. New premium plugins without WordPress.org presence depend entirely on paid acquisition or a pre-existing audience. You have neither at launch.
- No social proof (no install count, no public ratings) makes conversion from strangers extremely difficult.
- Content SEO alone cannot replace WordPress.org directory traffic in year 1 — organic SEO takes 6-12 months to compound.

### Why Option C is the Answer

The optimal sequence is: **build both in parallel, launch both simultaneously.**

**How this works in practice:**
- Weeks 1-5: Build the free version (core MVP features as defined in the validation doc).
- Week 4: Submit to WordPress.org plugin review (2-4 week approval clock starts).
- Week 5-6: Build Freemius integration, premium feature gates, and amazingplugins.com landing page.
- Week 6-8: WordPress.org approves the plugin. Publish it with the premium upgrade path already live.

**Day of launch, both are available simultaneously:**
1. Free version at WordPress.org
2. Premium at amazingplugins.com (powered by Freemius)

The WordPress.org listing links to amazingplugins.com. The upgrade flow inside the plugin (via Freemius) points to the premium checkout. Every free user who installs from WordPress.org has an immediate, frictionless upgrade path.

### The WooCommerce Marketplace Question

The official WooCommerce Marketplace (woocommerce.com/products/) is a secondary distribution channel worth noting. Getting listed there adds legitimacy and a small amount of discovery traffic. However:
- The review process is slow and quality bar is higher.
- Woo takes a revenue share (historically around 30%).
- It is not necessary at launch.

**Verdict:** Submit to WooCommerce Marketplace at month 3-4 once the plugin has reviews and an install base. Do not prioritize it at launch.

### CodeCanyon

Skip entirely. CodeCanyon takes 37.5% for non-exclusive listings, you do not own the customer relationship, and the 97.6% of plugins that earn under $1,001/month on CodeCanyon confirms it is not a viable primary channel.

### Launch Sequence Summary

| Week | Action |
|---|---|
| 1-4 | Build free MVP |
| 4 | Submit to WordPress.org (2-4 week queue) |
| 5-6 | Build premium features + Freemius integration + amazingplugins.com landing page |
| 6-8 | WordPress.org approval lands. Launch both simultaneously. |
| 10-12 | Begin WooCommerce Marketplace submission. |
| 12+ | Content SEO compounds. WordPress.org install count builds. |

---

## 3. Billing Stack

### Options Under Evaluation

1. **Freemius** — WordPress-specific billing + licensing platform
2. **LemonSqueezy** — General digital product billing, merchant of record
3. **Paddle** — SaaS-focused merchant of record
4. **Self-managed Stripe** — Direct Stripe integration, manual tax handling

### Current Pricing (Verified April 2026)

**Freemius:**
- Revenue share: 7% total (4.7% base + 2.3% for the WordPress-specific solution)
- Scales down: below 0.5% on sales above $100K/month
- No monthly fee
- No extra fee on subscription renewals
- VAT/tax NOT collected or remitted by Freemius — you are responsible for VAT compliance
- Payout: monthly on the 10th, 2-month delay after sale (for refund processing), $100 minimum
- Payout methods: PayPal, Payoneer, Wire Transfer, TransferWise

**LemonSqueezy:**
- Fee: 5% + $0.50 per transaction
- International surcharge: +1.5% on non-US transactions
- Affiliate program: +3% on referred sales
- No monthly fee
- Merchant of record: handles VAT, GST, and sales tax in 100+ countries
- Effective rate for a globally-selling indie: ~6.5-7% once international surcharge factors in

**Paddle:**
- Fee: 5% + $0.50 per transaction
- No monthly fee
- Merchant of record: handles VAT, GST, sales tax globally
- Effective rate: 7-8% when currency conversion margins (~2-3% above mid-market) are factored in
- Primarily designed for SaaS, not WordPress-specific plugin workflows

**Self-managed Stripe:**
- Fee: 2.9% + $0.30 per transaction (standard), lower with volume
- No monthly fee
- You are NOT a merchant of record: you must register for VAT in each EU member state, handle US state sales tax (~50 states with varying rules), and comply with global tax regulations yourself
- License key management: you build it yourself or use a separate library (EDD, WooCommerce, or a custom system)
- Auto-update mechanism: you build it yourself
- Churn recovery (failed payments, dunning): you build it yourself

### Comparison Matrix

| Factor | Freemius | LemonSqueezy | Paddle | Self-Stripe |
|---|---|---|---|---|
| Fee (effective, global) | 7% | ~6.5-7% | ~7-8% | 2.9% + $0.30 |
| Merchant of record | No | Yes | Yes | No |
| VAT/tax handled | No | Yes | Yes | No |
| WordPress SDK | Yes (native) | Community library | No | Manual build |
| License keys | Yes (native) | Yes (native) | Manual | Manual |
| Auto-updates | Yes (native) | Yes (with library) | Manual | Manual |
| Upgrade flows in WP admin | Yes (native modal) | Manual integration | Manual | Manual |
| Freemium analytics | Yes (install tracking) | No | No | No |
| Churn recovery | Yes (native) | Yes | Yes | Manual build |
| Trial support | Yes | Yes | Yes | Manual |
| Payout timing | Monthly, 2-month delay | Faster | Weekly | Same-day Stripe payout |
| Complexity for solo dev | Low | Medium | High | Very High |

### Analysis for an Indie WordPress Plugin Founder

**Freemius is purpose-built for this exact use case.** The feature set reads like a checklist written for WordPress plugin developers:
- The Freemius WordPress SDK drops into your plugin in hours. It handles the upgrade modal inside WP Admin, license key validation, installs tracking, freemium analytics (who activated, who installed but never upgraded, at which country), and automatic update delivery.
- The 7% fee is reasonable for what you get: you are not building license management, not building an updater, not building an upsell modal, not building dunning, not building trial flows. A solo developer who implements all of this on Stripe would spend 4-6 weeks of dev time. At $49/yr with 100 customers, that is $490/month — Freemius costs $34.30/month at that scale, a bargain.
- The VAT/tax limitation is real. You are responsible for your own tax compliance. At launch with sub-$10K annual revenue, this is manageable — register for VAT OSS in the EU (a single registration that covers all EU member states), use a tool like Quaderno or TaxJar for US state tracking. It is not zero work but it is not blocking.

**LemonSqueezy is the better choice if you want zero tax complexity.** The merchant of record model means LemonSqueezy handles all tax collection and remittance. You receive revenue net of taxes and fees. The tradeoff: WordPress-specific features (the in-admin upgrade modal, install tracking, auto-updates) require more integration work compared to Freemius's native SDK. If you value "never think about VAT again" over "native WordPress upgrade experience," LemonSqueezy is defensible.

**Paddle is not the right fit.** It is designed for SaaS companies with recurring subscriptions, not for WordPress plugin freemium flows. The integration work to replicate Freemius's in-admin features would be substantial, and the effective rate (7-8% with currency conversion) is no cheaper than the alternatives.

**Self-managed Stripe is a trap for an indie founder at launch.** The 2.9% fee looks attractive compared to 7%, but the hidden cost is weeks of development time and ongoing tax liability. At $500/month revenue, the fee difference between Stripe (2.9%) and Freemius (7%) is $21/month. The development cost to build what Freemius provides natively is north of 40 hours. This is not a close decision.

### Recommendation: Start with Freemius, optionally add LemonSqueezy checkout later

**Phase 1 (Launch through $5K MRR):** Freemius only. The WordPress SDK integration, install analytics, and native upgrade flows are worth the 7% fee. Tax compliance: register for EU VAT OSS and use Quaderno (~$49/month) for automated reporting. If you are a Bangladeshi founder, consult a local accountant for BD VAT obligations — digital exports may be zero-rated.

**Phase 2 (If expanding beyond WordPress):** Add LemonSqueezy as a second checkout option for non-WordPress purchases (direct landing page sales, future SaaS products). The merchant of record model becomes more valuable as international revenue scales.

---

## 4. Content and SEO: First 90 Days

### The Core Principle

WordPress plugin SEO in 2026 operates on two parallel tracks:
1. **WordPress.org directory search** (within WP Admin) — dominated by install count, rating, and keyword match in the plugin name and description
2. **Google and AI search** — dominated by content quality, domain authority, and backlinks from relevant sites

Both tracks compound over time. In the first 90 days, you are planting seeds, not harvesting. Expect minimal organic traffic for the first 60 days. The payoff is months 4-12.

### Pages to Create (Prioritized)

**Priority 1 — Must exist at launch**

1. **Homepage (amazingplugins.com)**
   Content: Brief brand statement + links to Plugin #1 + email signup. Keep it simple. Do not design by committee.

2. **Plugin landing page (amazingplugins.com/woocommerce-bulk-editor)**
   This is the conversion page. Structure:
   - H1: "Bulk Edit WooCommerce Products Like a Spreadsheet" (primary keyword in H1)
   - Demo GIF or video above the fold (critical — this is the #1 conversion lever)
   - Competitor comparison table (free version features: yours vs Smart Manager vs BEAR vs ELEX)
   - Pricing table ($49/yr single, $99/yr unlimited)
   - Social proof section (leave this empty at launch; add reviews once they arrive)
   - FAQ section targeting secondary keywords: "Does this work with variable products?", "How many products can I edit at once?", "Is there a free version?"

3. **WordPress.org readme.txt**
   This is marketing copy, not documentation. The `== Description ==` section is indexed by WordPress.org search and Google. Target keywords: "woocommerce bulk edit", "bulk edit woocommerce products", "woocommerce bulk edit variations". Include screenshots. Write the short description (150 chars) to include the primary keyword.

**Priority 2 — Publish in the first 30 days**

4. **Blog post: "The 6 Best WooCommerce Bulk Edit Plugins Compared (2026 Honest Review)"**
   This is the highest-leverage piece of content you can write. It targets "best woocommerce bulk edit plugin" — a high commercial intent query searched by buyers comparing options. Every competitor has a version of this post. Yours will:
   - Evaluate each competitor honestly (not just say "they're all bad")
   - Include the comparison table from the validation doc (pricing, free features, ratings)
   - Position AmazingPlugins Bulk Editor in the comparison with an honest self-assessment
   - Target keyword density: use "woocommerce bulk edit" naturally 8-12 times
   - Length: 2,500-3,000 words minimum. Thin comparison posts do not rank.
   - Add a data table with installation counts, ratings, pricing — tables get Google rich snippets

5. **Blog post: "How to Bulk Edit WooCommerce Product Prices (Without Breaking Your Store)"**
   Targets "woocommerce bulk edit prices" and "how to bulk edit woocommerce products" — the two highest-volume informational queries. This post:
   - Walks through the native WooCommerce bulk edit (and its limitations)
   - Shows how to do it with your plugin (screenshots, step-by-step)
   - Includes the undo/preview feature prominently (addresses the fear of breaking things)
   - Length: 1,500-2,000 words

**Priority 3 — Publish in days 30-90**

6. **Blog post: "How to Bulk Edit WooCommerce Variations (The Complete Guide)"**
   Targets "woocommerce bulk edit variations" — a high-intent query where every competitor fails. This is a differentiation post.

7. **Blog post: "WooCommerce Bulk Edit Not Working? Here's Why (and How to Fix It)"**
   Targets pain-driven queries from frustrated native WooCommerce users. Problem-aware traffic, high intent.

8. **Blog post: "Black Friday WooCommerce Prep: Update Prices in Bulk (5-Minute Guide)"**
   Seasonal content. Publish by October (republish annually). Black Friday is the highest-demand period for bulk price editing.

9. **Plugin launch announcement post**
   Short (500 words). Tells the story of why you built this. Useful for community sharing but not an SEO driver.

### WordPress.org Optimization

The WordPress.org listing is the most important single page at launch because it drives direct installation from WP Admin.

Key elements:
- **Plugin name:** Include "Bulk Edit" in the plugin name — this is how directory search works
- **Short description (150 chars):** Lead with the primary keyword. "Bulk edit WooCommerce products, prices, and variations in a spreadsheet grid. Free version with no limits."
- **Long description:** Target 3-5 primary keywords naturally. Use H3 headings for each major feature.
- **Screenshots:** 5+ screenshots minimum. Show the grid in action, the variation editor, the preview mode. Label them descriptively — screenshot captions are indexed.
- **Changelog:** Keep it updated. Fresh changelogs signal active maintenance — this is a ranking factor.
- **Tags:** Use all 5 allowed tags. Exact-match tags matter: "woocommerce", "bulk edit", "product management", "inventory", "woocommerce products"

### Community Participation

Communities are not primarily for SEO — they are for early installs, reviews, and word-of-mouth. In the first 90 days:

**Reddit**
- r/woocommerce (280K+ members): The most valuable community. Search for "bulk edit" threads and answer them with a helpful response that mentions the plugin where relevant. Do not spam. Target 2-3 genuinely helpful replies per week.
- r/WordPress (800K+ members): Less targeted but broader reach. Answer general WooCommerce admin questions.
- Rule: Never post a direct ad. Only share the plugin when you are directly answering a question where it is the answer.

**Facebook Groups**
- "WooCommerce Help & Share" (100K+ members): Active group. Search for "bulk edit" posts. Comment with a screenshot and a link when appropriate.
- "WooCommerce Developers & Users" — More technical audience. Good for getting early technical feedback.

**WooCommerce Community Forums**
- The WordPress.org support forums for competing plugins (BEAR, Smart Manager) have users asking for help. Answering those support posts — genuinely, not just promoting — builds goodwill and occasionally captures users who are frustrated with the competitor.

**WooCommerce-Focused Newsletter and Blog Outreach**
Target for guest posts or inclusion in roundups:
- Barn2 Blog (barn2.com) — unlikely to feature a competitor, but worth reading their content model
- WP Beginner (wpbeginner.com) — large audience, covers plugin roundups
- WP Tavern (wptavern.com) — covers plugin launches, especially interesting new entrants
- Kinsta Blog — frequently publishes "best WooCommerce plugins" roundups
- SiteGround Blog — same pattern

The single highest-leverage community action in the first 90 days: **get included in one "best WooCommerce bulk edit plugins" roundup on a domain with DR 50+.** Target WP Beginner, Kinsta, or IsItWP. This single placement can drive 500+ trial installs. Outreach angle: "I noticed your roundup was last updated in 2024 — I'd like to introduce a new entrant that addresses the main complaints about the existing options."

### YouTube

A 3-5 minute demo video of the plugin in action is a conversion multiplier. "WooCommerce bulk edit prices in 3 minutes" is searched on YouTube thousands of times. Create one video showing the core workflow (filter, edit, preview, save). Upload to YouTube and embed on the landing page. This is a week-1 action, not optional.

### Timeline Summary

| Day | Content/SEO Action |
|---|---|
| 1 | Plugin landing page live, WordPress.org readme finalized |
| 1-7 | Demo video created and uploaded to YouTube |
| 7 | Comparison blog post published |
| 14 | How-to bulk edit prices post published |
| 21 | Community participation begins (Reddit, Facebook groups) |
| 30 | How-to bulk edit variations post published |
| 45 | Outreach to 5 roundup articles for inclusion |
| 60 | "Bulk edit not working" post published |
| 75 | Black Friday pricing guide published (or queued for October) |
| 90 | Review first 90 days: keyword rankings, install source breakdown, email signups |

---

## 5. Day-1 Metrics

### What to Track from Launch Day

Not all metrics matter equally in the first 30 days. Here is what to instrument and what to ignore.

**Tier 1 — Track Daily**

| Metric | What It Tells You | Tool |
|---|---|---|
| New WordPress.org installs | Primary discovery channel health | WordPress.org plugin stats |
| Active installs (cumulative) | Stickiness — do people keep it installed? | WordPress.org plugin stats |
| Freemius "Install" events | Who activated (not just downloaded) | Freemius dashboard |
| Landing page unique visitors | Is anyone finding amazingplugins.com? | Plausible.io or Fathom (privacy-first) |
| Landing page CTA clicks | Are visitors engaging with "Go Pro"? | Plausible goals |
| Email signups | Pre-purchase intent signal | Email provider (ConvertKit, etc.) |

**Tier 2 — Track Weekly**

| Metric | What It Tells You |
|---|---|
| Freemius trial starts | Freemium-to-premium funnel entry |
| Revenue (MRR) | Direct business health |
| WordPress.org rating and review count | Trust signal and directory ranking factor |
| Support tickets opened | If volume is high, something is broken or confusing |
| Freemius activation-to-upgrade rate | Conversion efficiency |
| Traffic source breakdown | Which channels are sending installs? |

**Tier 3 — Check Monthly**

| Metric | Notes |
|---|---|
| Keyword rankings (primary terms) | Track in Ahrefs or Google Search Console |
| Backlinks acquired | Track in Ahrefs |
| Churn rate (annual renewals) | Not relevant until month 13, but start tracking |
| Active vs inactive installs ratio | High inactive ratio signals onboarding problem |
| Freemius cohort reports | Which install dates are converting at what rate? |

**What to Ignore in the First 90 Days**
- Social media follower counts
- Page views (vanity metric — installs matter, not page views)
- Email open rates (not enough volume to be meaningful)
- MRR growth rate (too early — look at absolute numbers)

### What Healthy Early Signals Look Like

**Week 1-2 after WordPress.org approval:**
- 50-100 new installs: Normal for a plugin with no external promotion. This is purely WordPress.org directory discovery.
- 0 support tickets: Expected — nobody has had the plugin long enough to have problems.
- 0 paid conversions: Normal. Freemium conversion takes 30-60+ days from first install.

**Day 30:**
- 200-500 active installs: Healthy for an unmarketed new plugin with a decent readme. Below 100 installs is a warning sign — either the readme needs rewriting or the category is less active than expected.
- 4.5+ star rating with 3+ reviews: Five-star reviews arriving in week 1-2 means the plugin works and delivers on its promise. No reviews at day 30 means you should proactively ask early users for feedback.
- 1-3 paid conversions: First paid customers often arrive within 30 days if the free-to-paid upgrade path is smooth. If zero, check the Freemius upgrade flow is visible and frictionless.
- Landing page CVR (visitors to CTA click): 5-10% is healthy for a plugin landing page.

**Day 90:**
- 500-1,500 active installs: Wide range because install velocity depends heavily on whether you got any external coverage (roundup articles, Reddit mention, YouTube). 500 organically is healthy; 1,500 means something went right with distribution.
- 5-15 paid customers: $245-$735 in first-quarter revenue. At 2% conversion from 500-750 active installs, this range is realistic.
- 4.7+ rating with 10+ reviews: Enough social proof for visitors to convert. Getting to 10 reviews quickly requires proactively emailing users who have been active for 30+ days (Freemius makes this easy via their email segmentation).

### Warning Signs

**Red flags at day 30:**
- Under 50 active installs AND no promotion done: The readme is not converting directory browsers. Rewrite the short description and ensure keyword targeting is correct.
- 3+ one-star reviews mentioning bugs: Something is broken. Stop marketing and fix the bug first.
- Support tickets outnumbering installs: Core UX is too confusing. Invest in onboarding (tooltip guidance, empty state messages).
- Zero landing page traffic: SEO is not indexed yet (normal), but if email signups are also zero, nobody is finding you through any channel.

**Red flags at day 90:**
- Under 200 active installs with active promotion: The niche is not responding. Investigate: check WordPress.org search ranking for "bulk edit woocommerce," check if there is a competing plugin that just launched with heavy marketing.
- Zero paid conversions after 500+ installs: The free version may be too complete — users have no reason to upgrade. Or the upgrade flow is broken. Audit the Freemius checkout flow and the premium feature differentiation.
- Support volume growing faster than installs: Scalability problem. The product is not self-explanatory. Consider adding in-plugin onboarding.
- Rating below 4.0 at day 90: Serious quality problem. Respond to every review, fix the issues, and consider a "rate us" prompt only after successful bulk save operations (not immediately on activation).

### Revenue Targets (from validation doc, restated)

| Milestone | Target | Notes |
|---|---|---|
| Day 60 (launch) | 100-200 free installs, 0-3 paid | Launch day target |
| Day 90 | 500 free installs, 5-15 paid ($245-$735 revenue) | 2% conversion |
| Month 6 | 2,000 free installs, 30-50 paid ($1,470-$2,450 ARR) | SEO compounding |
| Month 12 | 5,000 free installs, 80-120 paid ($3,920-$5,880 ARR) | Category leader emerging |

---

## TL;DR Recommendations

**One clear answer per question, no hedging.**

### 1. Single brand vs per-plugin brands

**Use AmazingPlugins as the umbrella brand from day one.** Give the plugin a product name ("WooCommerce Smart Bulk Editor by AmazingPlugins") but build all domain authority, email list, and content on amazingplugins.com. Per-plugin branding is a distraction that splits authority and destroys cross-sell capability. Barn2 built $141K/month under a single brand — follow that playbook.

### 2. WordPress.org first, own site first, or both in parallel?

**Both in parallel, launched on the same day.** Submit to WordPress.org in week 4 of development (during the 2-4 week approval queue). Build premium + Freemius integration in weeks 5-6. Launch free on WordPress.org and premium on amazingplugins.com simultaneously. Never launch one without the other — you will either lose conversion opportunities (free only) or lose discovery (premium only).

### 3. Billing stack

**Start with Freemius.** The 7% fee buys you a native WordPress SDK, in-admin upgrade modals, license key management, auto-update delivery, install analytics, trial flows, and churn recovery — all features that would take 4-6 weeks to build on Stripe. At sub-$5K MRR, the fee difference between Freemius and Stripe is under $50/month. The dev time saved is worth 100x that. Handle EU VAT via VAT OSS registration + Quaderno. Add LemonSqueezy as a second checkout if/when you expand beyond WordPress.

### 4. Content/SEO in the first 90 days

**Three actions drive 80% of early installs:** (1) Optimize the WordPress.org readme.txt with primary keywords in the plugin name, short description, and long description. (2) Publish a 2,500-word comparison post ("Best WooCommerce Bulk Edit Plugins 2026") within the first week of launch. (3) Get included in one existing roundup article on a DR 50+ domain (WP Beginner, Kinsta, IsItWP) through direct outreach. Secondary: engage in r/woocommerce and WooCommerce Facebook groups organically, and publish a 3-minute demo video on YouTube.

### 5. Day-1 metrics to track

**Track three numbers daily: new WordPress.org installs, Freemius activation count, and first paid conversions.** A healthy signal at day 30 is 200+ active installs and at least 1 paid conversion. A warning sign is under 50 installs at day 30 (readme problem) or zero paid conversions at day 90 with 500+ installs (upgrade flow broken or free version too complete). Do not track social followers, page views, or email open rates in the first 90 days — they are noise.

---

## Sources

- Freemius pricing: [freemius.com/new-pricing](https://freemius.com/new-pricing/), [freemius.com/blog/new-freemius-pricing-2025](https://freemius.com/blog/new-freemius-pricing-2025/)
- Freemius payout schedule: [freemius.com/help/documentation/selling-with-freemius/your-earnings](https://freemius.com/help/documentation/selling-with-freemius/your-earnings/)
- LemonSqueezy fees: [docs.lemonsqueezy.com/help/getting-started/fees](https://docs.lemonsqueezy.com/help/getting-started/fees)
- LemonSqueezy review 2026: [daveswift.com/lemon-squeezy](https://daveswift.com/lemon-squeezy/)
- Paddle fees and pricing: [paddle.com/pricing](https://www.paddle.com/pricing), [dodopayments.com/blogs/paddle-fees-explained](https://dodopayments.com/blogs/paddle-fees-explained)
- Freemius vs LemonSqueezy: [freemius.com/lemon-squeezy-alternative](https://freemius.com/lemon-squeezy-alternative/)
- LemonSqueezy WordPress updates: [docs.lemonsqueezy.com/help/wordpress/theme-plugin-updates](https://docs.lemonsqueezy.com/help/wordpress/theme-plugin-updates)
- Internal research: [market-analysis-2026.md](/Users/ray/Work/amazingplugins/research/market-analysis-2026.md)
- Internal research: [first-plugin-decision-brief.md](/Users/ray/Work/amazingplugins/docs/first-plugin-decision-brief.md)
- Internal research: [woocommerce-bulk-editor-validation.md](/Users/ray/Work/amazingplugins/docs/woocommerce-bulk-editor-validation.md)
- Internal research: [woocommerce-bulk-editor-deep-dive.md](/Users/ray/Work/amazingplugins/research/woocommerce-bulk-editor-deep-dive.md)
- Barn2 Plugins case study: [freemius.com/blog/wordpress-plugins-sales-support](https://freemius.com/blog/wordpress-plugins-sales-support/)
- CodeCanyon analysis: [freemius.com/blog/codecanyon-wordpress-plugins-analysis](https://freemius.com/blog/codecanyon-wordpress-plugins-analysis/)
