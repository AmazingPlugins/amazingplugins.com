# AmazingPlugins — Free-to-Paid Packaging Strategy

**Date:** April 8, 2026
**Author:** Research compiled for AmazingPlugins
**Plugin:** WooCommerce Smart Bulk Editor (first plugin)
**Status:** Strategy locked — act on this

---

## Introduction

This document answers the five core packaging questions for the WooCommerce Smart Bulk Editor and, where applicable, sets reusable patterns for future AmazingPlugins products. The guidance is grounded in what competitors in this category have gotten right and wrong, what the freemium conversion data says, and what successful plugin businesses (Barn2, Gravity Forms, WooCommerce itself) have demonstrated works at scale.

The central tension in plugin packaging is this: a free tier generous enough to earn installs and reviews will cannibalize some premium sales. A free tier stingy enough to force upgrades will earn neither installs nor trust. The resolution is not a compromise; it is a clean split. Free covers the workflow foundation. Premium covers workflow acceleration and delegation. Get that line right and the funnel works.

---

## 1. What the Free Tier Must Include

### The Competitor Trap to Avoid

Every competitor in the bulk editor category has made the same mistake, just to different degrees. Smart Manager's free version is a non-functional demo: users install it, find it does nothing, and leave a 1-star review saying "it does nothing unless you purchase." BEAR limits the free version to 10 products per page, which is not bulk editing by any reasonable definition. ELEX restricts free to Simple products only, excluding the half of WooCommerce stores that rely on variable products. WP Sheet Editor limits free to simple products and two fields (price only).

The result of this approach is not more upgrades. It is worse ratings, fewer installs, and less word-of-mouth. Smart Manager sits at 4.4 stars despite 10K+ installs because of review backlash from the crippled free version. A plugin with a 4.4 star rating in 2026 is not a healthy plugin business.

The free tier must be genuinely useful. Not "useful enough that you might upgrade." Useful enough that someone with 200 products and a basic use case never needs to upgrade, recommends it to peers, and leaves a 5-star review. That review traffic and that install count is the growth engine.

### The Right Philosophy

Free = workflow foundation. The free user can open any product (simple or variable), edit any core field inline, run a price update across filtered results, preview what will change, and undo the last operation if something goes wrong. That is a complete, working tool for the majority of WooCommerce stores.

Premium = workflow acceleration and delegation. The premium user can save the filter-and-edit routine they run every Monday as a preset that executes in two clicks. They can schedule a 10% price increase to run automatically at midnight before Black Friday. They can export a CSV to hand off to a team member. They can give their shop manager a restricted view that prevents accidental bulk deletes. Those are all about doing the same core task faster, more safely, or by someone other than the store owner.

The line between free and premium should never feel arbitrary. It should feel like: "I use this daily and I want more power" rather than "I installed this and it barely works."

### What Stays Free (Non-Negotiable)

| Feature | Why It Must Be Free |
|---|---|
| Inline editing for all core product fields (title, description, price, sale price, sale dates, SKU, stock quantity, stock status, manage stock toggle, categories, tags, weight, dimensions, status, visibility, featured) | This is the basic value proposition. Lock any of these and you are BEAR. |
| Variable product and variation editing in the grid | Every competitor fails here in the free version. This is the single biggest differentiator. Ship it free. |
| Filter by category, product type, stock status, price range, keyword/SKU | Filtering is table stakes. Without it, the grid is unusable on stores over 100 products. |
| Bulk operations: set price (fixed amount or percentage), search-replace in titles/descriptions, change categories/tags | These are the core bulk actions. Lock them and you are Smart Manager. |
| Single-step undo/rollback with confirmation | Data safety is a trust prerequisite. Not a premium feature. |
| Preview before save (diff highlighting, old vs new values) | Same argument: trust, not upsell. |
| No arbitrary pagination limits (50 products/page default, configurable up to 200) | BEAR's 10/page limit is the most mocked limitation in the category. Do not repeat it. |
| HPOS compatibility | Required for any WooCommerce plugin in 2026. |
| Performance with 5,000+ products | If it's slow on large catalogs in the free version, your 1-star reviews will say so. |

### What Gets Gated (The Premium Line)

The free version handles "edit my products now." Everything gated in premium handles "automate this, expand this to other parts of my store, or give my team access to it."

Do not gate features that make the core experience work. Gate features that make the core experience faster, delegatable, or extensible.

---

## 2. Premium Hooks That Convert Best for WooCommerce Plugins

Ranked by conversion impact, based on patterns from this category and adjacent WooCommerce plugin markets.

### 1. CSV Export/Import (Highest Conversion Impact)

**Why it converts:** CSV export/import is the only bridge between a WooCommerce store and every other tool in the merchant's stack: Excel, Google Sheets, a supplier's price sheet, a VA's workflow, a PIM system. When a store reaches 500+ products, someone on the team inevitably needs to "take the data out" or "load the updated prices from the supplier's file." The moment a free user hits that need, they upgrade.

This is also the feature that turns the plugin from a UI tool into a data management tool. That is a different, more valuable category in the buyer's mind. Price accordingly.

**What to build:** Export the current filtered view to CSV. Import from CSV with field mapping and a preview/diff before committing. Handle duplicate SKU detection. Do not require a specific column format; let users map their columns to WooCommerce fields.

### 2. Scheduled Bulk Operations

**Why it converts:** Price automation for promotional events (Black Friday, seasonal sales, flash deals) is a genuine business need that store owners feel acutely. The free version lets you run a bulk price update manually. Premium lets you schedule "reduce all products in the Summer Sale category by 20% starting Friday at 6pm, then restore original prices Monday at midnight." That is no longer convenience; it is a feature that prevents a store owner from staying up at midnight to run a manual operation.

This hook converts best for stores doing 3+ promotional cycles per year, which is most active WooCommerce stores. It also has the highest perceived value-to-price ratio: the alternative is hiring someone to do the manual operation or building a custom cron job.

**What to build:** A scheduled operations queue with a simple time picker, recurrence options (one-time, weekly, monthly), and an operations log showing past runs and their results.

### 3. Saved Filter Presets and Bulk Operation Templates

**Why it converts:** Any store owner who runs the same filter-and-edit routine more than twice will want to save it. "Filter to: category=Supplements, stock<10, status=published. Then: export to CSV." That is a Monday morning workflow that a shop manager runs weekly. The moment they realize they have to rebuild that filter from scratch every time, they upgrade.

This is the most frictionless premium hook in the category because users discover the need by doing, not by being told. They naturally try to save a preset and find the gate. The in-context upsell at that moment converts at significantly higher rates than a cold upgrade prompt.

**What to build:** Named presets for filter combinations. Named templates for bulk operation sequences. A "Save as Preset" button visible (but gated) in the filter panel on the free version.

### 4. Multi-Step Undo History

**Why it converts:** The free version provides single-step undo, which covers the immediate "I just changed the wrong field" scenario. But stores that run bulk operations regularly will eventually want to roll back to "what this product looked like two sessions ago." After BEAR's documented data corruption incidents, any competitor that offers meaningful rollback history has a genuine story to tell on safety.

The conversion trigger is usually an incident: someone runs a bulk price update, saves, realizes it was the wrong filter scope, and the single-step undo is already gone. The next time they open the plugin, the premium upsell for full operation history is highly visible to them.

**What to build:** An operation log showing the last 30 days of bulk actions with before/after snapshots per product. One-click rollback of any past operation. Searchable by date, field, or operation type.

### 5. Role-Based Access Control

**Why it converts:** This hook is specifically for stores with a team: shop managers, VAs, content editors. The store owner wants to let a shop manager update inventory and prices but not delete products or change categories. That is not a use case a solo store owner has, but a store doing $10K+/month in WooCommerce revenue almost certainly has at least one other person touching the admin.

Role-based access also signals trust from the developer ("we take permissions seriously") and is a standard expectation in any tool used by teams. Gravity Forms, Barn2's WooCommerce Product Table, and virtually every mature WooCommerce admin plugin offers it at the premium tier.

**What to build:** A permissions screen where the store admin can configure per-role access: which fields are editable, which bulk operations are available, whether a user can delete or only edit. Log which user performed each bulk operation.

### 6. Order and Coupon Bulk Editing

**Why it converts:** This extends the plugin from product management into store operations. A store owner who uses the bulk editor daily for products will eventually look at their order list and want the same experience. The upgrade from "product tool" to "store management tool" is a natural progression and justifies a higher price tier or an add-on.

The conversion trigger is usually a seasonal event: a store owner needs to bulk-update all orders with a specific status, or bulk-generate coupons for a promo. Once they realize the plugin they already trust for products can do this, the upgrade is obvious.

**What to build:** A separate grid view for orders (edit status, add notes, update tracking numbers in bulk). A coupon bulk generator and editor. Keep these in a separate tab so they do not crowd the product editing experience.

### 7. Custom Meta Field Editing

**Why it converts:** Stores using ACF, Yoast SEO custom fields, or third-party plugin meta will hit this wall almost immediately if they have custom product data. The free version edits WooCommerce core fields only. Premium unlocks any registered meta key in a configurable column.

This hook is particularly strong for agencies managing multiple client stores with custom schemas, and for stores using WooCommerce extensions that store data in meta (WooCommerce Subscriptions, Memberships, Bookings, etc.).

**What to build:** A "Columns" panel where users can add meta keys as editable columns. Auto-detect registered meta from ACF, Yoast, and common WooCommerce extensions. Display the meta key's label if one is registered, otherwise show the raw key.

### 8. WooCommerce Subscriptions and Memberships Support

**Why it converts:** WooCommerce Subscriptions ($279/yr from WooThemes) is one of the most common paid extensions on WooCommerce stores. Stores using it need to bulk-edit subscription prices, trial periods, and billing intervals. None of this is possible with core WooCommerce fields. A plugin that handles Subscriptions bulk editing is the only option for these stores, which means zero price resistance at upgrade.

This is a narrow market (not every WooCommerce store uses Subscriptions) but an extremely willing-to-pay one. Price accordingly: this should be a higher-tier or add-on premium feature, not bundled in the base premium plan.

### 9. Image Management (Lowest Conversion Priority)

**Why it converts:** Bulk reassigning featured images, adding gallery images, or replacing images across a filtered product set is a real workflow, but it is less frequent than price or inventory updates. It also has the highest complexity to build correctly (handling media library, aspect ratios, etc.).

Include this in premium but treat it as a third-tier feature. It helps justify the premium price and converts for specific use cases (seasonal catalog refreshes, rebranding), but it is not a conversion driver for typical monthly-active users.

---

## 3. Premium Hooks That Convert Best for Shopify Apps

This section is forward-looking for AmazingPlugins. Shopify is not the current target but will be once WooCommerce is generating traction.

### How the Freemium Model Works Differently on Shopify

Shopify has no WordPress.org equivalent. There is no organic discovery mechanism that accumulates free installs passively. Shopify App Store discovery is driven by search ranking, which is driven by install count and review velocity. The flywheel is similar, but the mechanics of accumulating it differ.

On Shopify:
- Monthly billing is standard. Annual prepay at 15-20% discount is the retention play, not the primary model.
- The free tier is typically limited by product count or operation count (e.g., "free up to 50 products"), not by feature set. Volume-based gates feel less arbitrary than feature gates to Shopify merchants.
- Review requests must be in-app (Shopify policy) and triggered at the right moment. The App Store review system is the primary trust signal for new merchant installs.
- Shopify actively monitors apps for policy compliance. Any dark pattern (confusing upgrade flows, hidden fees, subscription terms buried in UI) will result in app rejection or removal.

### Conversion Hooks Ranked for Shopify

1. **Volume-based limits (products/operations per month).** The most natural Shopify gate. Free tier: edit up to 100 products. Starter tier: up to 1,000. Growth tier: unlimited. Merchants immediately understand the limit and can self-qualify for upgrade. This is how Matrixify (the leading Shopify bulk import/export app) structures its tiers.

2. **Scheduled publications and price changes.** Same fundamental need as WooCommerce, but Shopify merchants are even more event-driven (flash sales, product drops). "Schedule this price change for Friday 9am" is a compelling upgrade hook for any merchant running promotions.

3. **CSV/Excel import-export with field mapping.** Shopify's native import is basic: it requires a specific template format and does not handle partial updates well. An import tool that maps arbitrary columns to Shopify metafields, handles variant matrices correctly, and previews changes before committing is worth paying for.

4. **Metafield editing.** Shopify metafields are the equivalent of WooCommerce custom meta: they store custom product data used by themes, apps, and storefronts. Most merchants cannot edit metafields without a developer. A bulk metafield editor is a strong premium hook for non-technical Shopify merchants.

5. **Multi-location inventory management.** Shopify merchants using multiple fulfillment locations need to bulk-update stock across locations simultaneously. Native Shopify admin handles this one product at a time. Bulk multi-location inventory is an obvious gap with real business need.

6. **B2B and wholesale pricing tiers.** Shopify B2B GMV grew 96% in 2025. Merchants running wholesale alongside retail need customer-segment-specific pricing, quantity discounts, and contract pricing. These cannot be configured in Shopify admin in bulk without an app. This is a high-value hook with willing-to-pay buyers.

### Pricing on Shopify

Monthly billing is the norm. A typical structure for a bulk editing app:

| Tier | Price/Month | Limit | Target User |
|---|---|---|---|
| Free | $0 | 100 products | Early-stage stores |
| Starter | $9/month | 1,000 products | Growing stores |
| Growth | $29/month | 10,000 products | Established stores |
| Pro | $79/month | Unlimited + advanced features | High-volume / B2B stores |

Annual prepay discount (typically 2 months free, or 17% off) should be offered at checkout. This improves LTV and reduces churn from card failures.

The key difference from WooCommerce: do not try to sell annual plans as the primary path on Shopify. Merchants are used to monthly billing aligned with their Shopify subscription. Present monthly first; surface annual as the savings option.

---

## 4. Best Onboarding Path for Free-to-Paid Conversion

### Define the "Aha Moment" First

Every conversion strategy should start here. The aha moment for the WooCommerce Smart Bulk Editor is: the user completes their first successful bulk save operation on 10+ products and sees the grid update in real time with all changes confirmed.

That moment creates two things: relief (their data is safe, nothing broke) and habit (they now know how to do this faster than the native WooCommerce editor). Everything in the onboarding flow should be designed to get users to that moment as fast as possible, then surface upgrade messaging immediately after.

### Onboarding Sequence

**On activation (Day 0):**
- Show a one-screen welcome notice in the plugin page: "You're set up. Open the Bulk Editor." One button. No feature tour. No video. Get them into the grid.
- The first time the grid loads, show an empty-state message if there are no products. If products exist, load the grid immediately with the last 50 products. No configuration required.
- Freemius opt-in dialog (required for Freemius SDK): keep it short. "Help us improve by sharing basic usage data" with a clear skip option. Do not block the plugin with this.

**After first successful bulk save (Day 0-3):**
This is the trigger for the review request. Not on activation. Not on a timer. When the user has successfully saved a bulk edit, show a notice: "Nice work. Would you rate the plugin on WordPress.org? It takes 30 seconds and helps others find it." One click to WP.org reviews. One click to dismiss permanently.

The timing of this notice matters more than its copy. Asking for a review before the user has done anything meaningful gets you 3-star "haven't used it enough to know yet" reviews. Asking after a successful save gets you 5-star "saved me an hour" reviews. PW Bulk Edit's 4.9 rating is largely a product of earning reviews at the right moment.

**Day 3 Freemius email:**
Subject: "How did the bulk edit go?"
Content: Short. Ask if they have questions. Mention one premium feature relevant to what they likely edited (if Freemius install tracking shows they edited prices, mention scheduled price changes; if they filtered by stock, mention saved filter presets). Include a direct link to the upgrade page.

**Day 14 Freemius email:**
Subject: "A feature you might have missed"
Content: One-sentence description of the feature they most likely need based on store size or install data. Direct link. No pushy copy.

**Day 30 Freemius email:**
Subject: "Still on the free version? Here's what you get with Pro"
Content: Brief feature comparison table (free vs pro, 5 rows). Launch-price offer if still in early pricing period. Clear call to action.

Do not send more than these three emails in the first 30 days. Freemius email fatigue is a documented pattern: plugins that send 6+ emails in the first month see unsubscribe rates that undermine the list's long-term value.

### The Freemius Upgrade Modal

The upgrade modal should appear in two situations only:

1. **When a user clicks a gated feature.** The user clicks "Save as Preset," the modal appears: "Filter presets are a Pro feature. Save and reuse your most-used filters instantly." Feature name, one sentence explaining the value, price, upgrade button. No full-page redirect; the modal overlays the grid so the user sees the context they were in.

2. **When a user manually navigates to the Upgrade tab.** No aggressive triggers elsewhere.

The modal copy that converts is not clever. It is specific. "Save and reuse filter presets" converts better than "Unlock the full power of Pro." Name the feature, name the time it saves, show the price.

### Admin Notices: Cadence Rules

Admin notices are the most abused conversion mechanism in WordPress plugins. The rule is simple: if a notice is not directly relevant to what the user is doing right now, suppress it.

**Show admin notices for:**
- First-time activation: "Start editing" button, dismissed after first click
- License expiry warning (30 days before): factual, not alarming
- Plugin update available: standard WordPress update mechanism

**Never show admin notices for:**
- Upgrade upsells unrelated to the current screen
- Review requests in the WP admin dashboard (only in the plugin itself, after a successful save)
- "You're missing out on Pro features" reminders on a cadence

YITH is the canonical example of notice abuse: their plugins show multiple admin notices across the entire WP admin, not just on plugin screens. The resulting reviews consistently mention "too many notifications." Do not be YITH.

### In-Context Upsells

The most effective upsell mechanism in a UI-heavy plugin is a visible, grayed-out, labeled feature that opens a modal when clicked. Not a redirect to a sales page. Not a notice bar. A locked icon on the feature, a one-sentence value statement, and an upgrade button.

Place in-context upsells at:
- The "Save as Preset" button in the filter panel
- The "Schedule" tab in the bulk operations panel
- The "Export CSV" button in the toolbar
- The "Full History" link in the undo panel

Each of these upsells should fire the Freemius upgrade modal with copy specific to that feature. Do not use a generic "Go Pro" modal for every gated feature.

### Trial-to-Paid for a Bulk Editor

A 7-day trial is appropriate for this category. The value of a bulk editor is demonstrated in the first session, not over weeks. A 14-day trial is too long; users forget they are on a trial and are surprised by the charge.

Structure: "Try Pro free for 7 days. No credit card required." At day 5, send a Freemius email: "Your trial ends in 2 days. Here's what you'd lose." List the specific Pro features they actually used during the trial (Freemius tracks feature usage per install).

If a user has not used any Pro features during the trial, do not send a "you'd lose these features" email. Send a "here's a feature you might not have tried yet" email with a link to the feature and a one-click trial extension.

### What Not to Do

- Do not lock the grid or any free feature behind an upgrade prompt. The grid should load fully, always. Gating the core experience converts no one and earns 1-star reviews.
- Do not show a full-page upgrade screen on first install. Plugins that redirect new activations to a "welcome/upgrade" page before the user has seen the product are treating installs as leads, not users. They are not yet leads. Get them to the aha moment first.
- Do not nag. One upgrade touchpoint per session is the limit. If the user has dismissed a notice or modal, respect that dismissal for at least 30 days.
- Do not make the Freemius opt-in blocking. Users who skip usage tracking should still get the full plugin experience.

---

## 5. Pricing Ladder

### The 3-Tier Model

The 3-tier ladder is the standard for WooCommerce utility plugins in 2026. WP Rocket ($49/$99/$249), Barn2 products, and most Freemius-based plugins use it because it serves three distinct buyers without requiring a complex decision.

| Tier | Price/Year | License | Target Buyer |
|---|---|---|---|
| Personal | $49/yr | 1 site | Solo store owner, single WooCommerce install |
| Business | $99/yr | 5 sites | Agency managing a handful of clients, developer who works on their own portfolio |
| Agency | $149/yr | Unlimited sites | Freelancer or agency with 10+ client stores |

### Why These Numbers

**$49/yr (Personal)** sits below PW Bulk Edit ($59/yr), well below ELEX ($79/yr), and far below Smart Manager ($199/yr). For a new brand with no track record, this is the right entry price. It removes the pricing objection from store owners who have been burned by overpriced competitors. The ROI story is simple: "If this saves you 2 hours this month, it's paid for itself."

**$99/yr (Business)** is the highest-volume tier in practice. Most individual store owners who need the full feature set will land here, because "5 sites" feels like plenty of headroom even if they only have one. It also captures the developer/agency-light buyer without requiring them to choose the most expensive option.

**$149/yr (Agency)** captures the unlimited-site buyer. Keep this tier simple: same features as Business, more sites. Do not invent agency-exclusive features. The volume buyer wants the same product at a fair per-site economics, not a different product.

### Annual vs Monthly

Annual only, for WooCommerce plugins. Here is why:

WooCommerce store owners are not SaaS power users who think monthly. They are small business owners who set up a plugin and want it to work for a year without thinking about it. Monthly billing creates billing fatigue (a recurring charge they did not budget for annually) and increases churn from simple payment failures. Smart Manager and ELEX charge annually. PW Bulk Edit charges annually. The market expectation is set.

The one argument for monthly is lower initial commitment, which can help conversion for price-sensitive buyers. If conversion data at 90 days shows lower-than-expected paid conversions, add a monthly option at a 30% premium to annual (so $6/month for the $49/yr plan). But start annual only and measure before adding complexity.

### First-Year Discount Strategy

**Launch pricing:** Sell the Personal tier at $39/yr (20% off) and the Business tier at $79/yr for the first 60 days post-launch. This is not about being cheap; it is about collecting early customers who become case studies, review writers, and word-of-mouth drivers. The discounted price also gives early buyers a reason to tell peers: "I got it at launch price, you should grab it."

**Email list early-bird discount:** Anyone on the pre-launch email list gets 50% off first year. Promote this in the email announcement on launch day. This is a one-time-use coupon per email address, automatically via Freemius.

**When to remove discounts:** After 50 paying customers or 90 days post-launch, whichever comes first. At that point, remove the launch price and let pricing normalize. The launch discount should feel like urgency, not a permanent markdown.

Do not put the plugin on AppSumo or any lifetime deal platform. Lifetime deals generate short-term cash but create a permanent support burden with no recurring revenue. They also poison the pricing anchor: if users know a $49/year plugin was once sold for $69 lifetime, they wait for the next deal instead of buying.

### Money-Back Guarantee

Offer a 14-day unconditional money-back guarantee, managed through Freemius. The industry standard is 14-30 days. Gravity Forms offers 30 days. WP Rocket offers 14 days.

The guarantee serves two purposes: it reduces friction at checkout (the "what if it doesn't work?" objection disappears) and it signals confidence in the product. Refund rates for WooCommerce admin plugins are consistently low (under 5%) because the product either works or it doesn't within the first session. A 14-day guarantee is basically never invoked by users who complete the aha moment.

### Renewal Pricing

Auto-renew at full price via Freemius. Do not discount renewals by default.

The renewal discount argument ("offer 40% off to prevent churn") is a race to the bottom that devalues the product and trains customers to wait for the offer. If renewal churn is high (over 20%), the problem is product quality or lack of engagement, not price. Fix the product first.

The one exception: if a customer actively cancels (not passive churn from a failed payment), Freemius can automatically offer a 30% discount as a win-back attempt. This is a standard Freemius feature and it works because it targets revealed intent-to-cancel, not the entire renewal cohort.

### When to Raise Prices

Raise prices when either of these thresholds is hit:
- 100 paying customers with a renewal rate above 70%
- 4.8+ star rating on WordPress.org with 50+ reviews

At that point, the social proof exists to support a higher price. Move the Personal tier from $49/yr to $59/yr, Business from $99/yr to $119/yr, Agency from $149/yr to $179/yr. Do not raise prices before the social proof exists; without it, new visitors have no reason to pay more than a competitor.

Barn2's pricing trajectory is a useful reference: their plugins started at similar price points and have moved up to $79-129/yr for single-site licenses as their brand reputation has compounded. The brand trust (4.9 ratings, thousands of installs, active blog) is what enables the price increase. Build the trust first.

### Pricing Summary

| Tier | Launch Price | Standard Price | License |
|---|---|---|---|
| Personal | $39/yr (first 60 days) | $49/yr | 1 site |
| Business | $79/yr (first 60 days) | $99/yr | 5 sites |
| Agency | $119/yr (first 60 days) | $149/yr | Unlimited |

Email list early-bird: 50% off first year on any tier, one-time use.
Money-back guarantee: 14 days, unconditional.
Billing: Annual only at launch (add monthly option at +30% if conversion data justifies it after 90 days).
Renewal: Full price auto-renew. 30% win-back offer on active cancellation only.

---

## Sources

- [First Plugin Decision Brief](/Users/ray/Work/amazingplugins/docs/first-plugin-decision-brief.md) — final plugin decision, MVP scope, revenue targets
- [Distribution and Brand Strategy](/Users/ray/Work/amazingplugins/docs/distribution-and-brand-strategy.md) — Freemius billing, brand decisions, content/SEO plan
- [WooCommerce Bulk Editor Deep Dive](/Users/ray/Work/amazingplugins/research/woocommerce-bulk-editor-deep-dive.md) — competitive analysis, competitor weaknesses, pricing recommendations
- [Market Analysis 2026](/Users/ray/Work/amazingplugins/research/market-analysis-2026.md) — freemium conversion benchmarks, pricing model analysis, Shopify context
