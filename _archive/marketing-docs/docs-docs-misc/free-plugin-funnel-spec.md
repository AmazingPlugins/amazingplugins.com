# Free-to-Paid Funnel Spec
## WooCommerce Smart Bulk Editor — AmazingPlugins

**Date:** April 8, 2026
**Status:** Implementation-ready — act on this
**Depends on:** `free-to-paid-packaging.md`, `woocommerce-bulk-editor-validation.md`

---

## 1. Free Tier Feature List

### IN — Included Free (Non-Negotiable)

| Feature | Decision |
|---|---|
| Spreadsheet grid with inline editing | In. This is the product. |
| All core product fields: title, description, regular price, sale price, sale start/end dates, SKU, stock quantity, stock status, manage stock toggle, weight, dimensions, categories, tags, product status, visibility, featured flag | In. Locking any of these = BEAR/Smart Manager trap. |
| Variable product and variation editing in the grid | In. Every competitor fails here in free. This is the single biggest differentiator. |
| Filter by: category, product type, stock status, price range, title/SKU search | In. Without filtering, the grid is useless on stores over 100 products. |
| Bulk operations: set price (fixed or percentage), search-replace in titles and descriptions, change categories, change tags | In. These are the basic operations every store needs weekly. |
| Up to 200 products per page (default 50, configurable to 200) | In. BEAR's 10/page is the most mocked limitation in the category. |
| Single-step undo with full preview (old vs new diff) | In. Data safety is a trust prerequisite, not a premium feature. |
| Keyboard navigation: Tab, Enter, arrow keys, Escape | In. Excel-like UX is the positioning. Without keyboard nav, it is just a form. |
| HPOS compatibility | In. Default WooCommerce in 2026. Required day one or reviews tank. |
| Performance with 5,000+ product catalogs | In. If free is slow, 1-star reviews will say so. Use AG Grid virtual scrolling. |

### OUT — Not in Free (Gated to Premium)

| Feature | Gate Rationale |
|---|---|
| Saved filter presets | Acceleration, not foundation. |
| Scheduled bulk operations | Automation, not foundation. |
| CSV export / CSV import with field mapping | Integration/delegation, not foundation. |
| Full operation history (last 30 days) with multi-step rollback | Beyond the single-undo safety baseline. |
| Role-based access control | Team delegation, not solo workflow. |
| Order bulk editing | Scope extension beyond products. |
| Coupon bulk editing | Scope extension beyond products. |
| Custom meta field editing (ACF, Yoast, extension meta) | Power user / agency need. |
| Image management (featured image, gallery bulk assign) | Third-tier need, high build complexity. |
| WooCommerce Subscriptions / Memberships field editing | Niche extension, fully willing to pay. |

---

## 2. Premium Feature List

Freemius handles license delivery, seat enforcement, and update delivery. No external billing infra.

### Base Premium (Pro) — $49/yr single site, $99/yr unlimited

| Feature | Why It Is Gated |
|---|---|
| **Saved filter presets** | Power users run the same filter-and-edit routine multiple times per week. They try to save a preset naturally, hit the gate in-context, and upgrade. This is the highest-converting in-context gate in the plugin. |
| **Scheduled bulk operations** | "Reduce all Summer Sale products 20% starting Friday 6pm, restore Monday midnight." No manual cron. No staying up at midnight. Unique in the category at this price point. |
| **CSV export** | Bridges WooCommerce to every external tool: Excel, Google Sheets, supplier price sheets, VA workflows. The moment a store hits 500+ products and needs to hand off a file, this gate appears. |
| **CSV import with field mapping and preview/diff** | Round-trip CSV. Let users map arbitrary columns to WooCommerce fields. Detect duplicate SKUs before committing. WP Sheet Editor charges $99/yr just for this. |
| **Full operation history (30 days) with multi-step rollback** | Free gives single undo. Premium gives complete audit history per product, one-click rollback of any past operation. The conversion trigger is usually an incident — wrong filter scope, already saved, single undo gone. |
| **Role-based access control** | Per-role field permissions and operation permissions. Log which user ran each operation. Standard expectation for any tool used by a team. Converts for stores with shop managers or VAs. |
| **Order bulk editing** | Bulk-update order status, add notes, update tracking numbers. Extends the plugin from product management to store operations. Conversion trigger is seasonal event. |
| **Coupon bulk editing** | Bulk-generate and edit coupons. Natural companion to order editing. |
| **Custom meta field editing** | Add any registered meta key as an editable column. Auto-detect ACF, Yoast, WooCommerce extension meta. Agency / power user gate. |
| **Image management** | Bulk set featured images, bulk manage gallery images. Third-tier feature — helps justify price, converts for specific seasonal workflows. |
| **WooCommerce Subscriptions / Memberships fields** | Bulk-edit subscription prices, trial periods, billing intervals. Narrow market, zero price resistance. Treat as add-on in a future tier if volume justifies it. |

### Pricing Summary (Already Decided in `free-to-paid-packaging.md`)

| Tier | Launch (first 60 days) | Standard | License |
|---|---|---|---|
| Personal | $39/yr | $49/yr | 1 site |
| Business | $79/yr | $99/yr | 5 sites |
| Agency | $119/yr | $149/yr | Unlimited |

- 14-day unconditional money-back guarantee via Freemius
- Annual only at launch; revisit monthly option at 90 days if conversion data justifies it
- No AppSumo, no lifetime deals

---

## 3. Upgrade Prompt Placements

### Rule: One upgrade touchpoint per session maximum. Respect any dismissal for 30 days.

| Location | Trigger | CTA Copy |
|---|---|---|
| **Filter panel — "Save as Preset" button** | Visible and labeled in free, grayed out with lock icon. User clicks it. | "Save Filter Presets — Pro Feature. Save and reuse your most-used filters in one click. Upgrade to Pro →" |
| **Bulk operations panel — "Schedule" tab** | Tab is visible in free UI, inactive. User clicks the tab. | "Scheduled Operations — Pro Feature. Run this operation automatically at a date and time you choose. Upgrade to Pro →" |
| **Toolbar — "Export CSV" button** | Button visible in free, grayed out. User clicks it. | "CSV Export — Pro Feature. Export your current filtered view to CSV for Excel, Google Sheets, or your VA. Upgrade to Pro →" |
| **Undo panel — "View Full History" link** | Shown below the single-step undo control. User clicks it. | "Full Operation History — Pro Feature. Browse and roll back any bulk change from the last 30 days. Upgrade to Pro →" |
| **Columns panel — "Add Custom Field" option** | Visible as the last item in the column picker, with lock icon. User clicks it. | "Custom Meta Fields — Pro Feature. Add any product meta key as an editable column. Upgrade to Pro →" |
| **Role/Permissions screen** | Visible as a menu item under the plugin. User navigates to it. | "Role-Based Access — Pro Feature. Control which fields and operations each WordPress role can access. Upgrade to Pro →" |
| **Day 3 Freemius email** | Sent automatically by Freemius 3 days after activation to opted-in users. | Subject: "How did the bulk edit go?" — Body: Short. One premium feature matched to what Freemius install data shows they edited. Direct upgrade link. |
| **Day 14 Freemius email** | 14 days post-activation, opted-in users who have not upgraded. | Subject: "A feature you might have missed" — Body: One feature, one sentence, one link. |
| **Day 30 Freemius email** | 30 days post-activation, opted-in users who have not upgraded. | Subject: "Still on free? Here's what Pro adds." — Body: 5-row free vs Pro comparison table. Launch-price note if still in first 60 days. |
| **Plugin "Upgrade" tab in admin nav** | User manually navigates to it. | Standard Freemius upgrade page with pricing table. |

### What Never Gets an Upgrade Prompt

- The grid itself — never disabled, never nag-barrered, never partially blocked
- The WP admin dashboard — no admin notices on screens outside the plugin
- On a timer inside the plugin session — only on explicit feature interaction
- If the user already dismissed an in-context modal this session

---

## 4. Telemetry and Metrics via Freemius

### What Freemius Tracks Automatically (No Instrumentation Needed)

| Metric | Where It Lives |
|---|---|
| Total installs (active, inactive, uninstalled) | Freemius dashboard |
| Install to activation rate | Freemius dashboard |
| Free-to-paid conversion rate | Freemius dashboard |
| Paid plan breakdown (Personal / Business / Agency) | Freemius dashboard |
| Revenue (MRR, ARR, total) | Freemius dashboard |
| Renewal rate and churn | Freemius dashboard |
| Refund requests and rate | Freemius dashboard |
| Plugin version distribution across installs | Freemius dashboard |
| WordPress version and WooCommerce version per install | Freemius dashboard |
| PHP version per install | Freemius dashboard |
| Deactivation reason (collected via exit survey) | Freemius dashboard |
| Email opt-in rate | Freemius dashboard |
| Trial starts and trial-to-paid conversion (if trial enabled) | Freemius dashboard |

### What to Instrument Manually (Custom Freemius Events)

Use `fs()->track_event()` calls in PHP/JS. These appear in the Freemius events log per install.

| Event Name | Trigger | Why Track It |
|---|---|---|
| `bulk_save_completed` | User completes a bulk save (any size) | Tracks aha moment completion; correlates with review requests |
| `bulk_save_product_count` | Number of products in the save operation | Identifies power users; helps segment upgrade email timing |
| `variation_editing_used` | User expands and edits a variation row | Confirms our differentiator is being used |
| `filter_applied` | User runs a filter and sees results | Measures core engagement depth |
| `undo_used` | User clicks undo | Measures trust feature adoption |
| `preset_gate_clicked` | User clicks gated "Save as Preset" | Direct conversion signal — top priority gate |
| `schedule_gate_clicked` | User clicks gated "Schedule" tab | Conversion signal |
| `csv_export_gate_clicked` | User clicks gated "Export CSV" | Conversion signal |
| `history_gate_clicked` | User clicks gated "View Full History" | Conversion signal |
| `custom_field_gate_clicked` | User clicks gated "Add Custom Field" | Conversion signal |
| `review_prompt_shown` | Review request shown after first successful save | Track shown/clicked/dismissed rates |
| `review_prompt_clicked` | User clicks through to WP.org review | Correlate with 5-star timing |

### Weekly Check — What to Review Each Week

1. **New installs this week** (Freemius dashboard) — leading indicator of WP.org ranking health
2. **Gate click events** (Freemius events) — which premium gates are being hit most; inform what to build/promote first
3. **Bulk save completions** — are new installs reaching the aha moment?
4. **New paid conversions and which plan** — is the funnel working?
5. **Deactivation reasons** — immediate signal if something is broken or off-putting
6. **Refund requests** — investigate every refund in the first 90 days

### No External Infrastructure Required

Freemius SDK is bundled in the plugin. All event data flows to Freemius. No Mixpanel, no Amplitude, no custom DB tables for analytics. Check everything at dashboard.freemius.com.

---

## 5. Ethical Email Capture from Free Users

### How Freemius Handles This

Freemius shows an opt-in dialog on plugin activation. The dialog is displayed once. It is not blocking — users who click "Skip" get the full plugin. Freemius handles the modal, stores consent, and sends drip emails only to users who opted in.

### What the Opt-In Dialog Should Say

**Heading:** "Help us improve WooCommerce Smart Bulk Editor"

**Body:** "Share basic plugin usage data (no personal or store data) so we can fix issues faster and build the features you actually use. You can opt out at any time."

**Buttons:** "Sure, no problem" | "Skip"

**Below the buttons (small text):** A link to the privacy policy.

### What to NOT Do

- Do not make opt-in required to use the plugin
- Do not pre-check a "subscribe to marketing emails" checkbox alongside the usage opt-in
- Do not say "Join our community" when you mean "receive our marketing emails"
- Do not reference "exclusive deals" or "early access" as the reason to opt in — this implies they are joining a list, not just sharing telemetry
- Do not re-prompt after a skip. One ask. That is it.
- Do not send more than 3 emails in the first 30 days to opted-in users (see drip sequence in section 3)
- Do not email opted-in users who have not completed a single bulk save — they have not reached the aha moment and are not a warm audience yet

### What Makes the Email List Valuable

The list is only useful if the open rate stays healthy. A healthy WP plugin drip list runs 35-50% open rates in year one. That rate drops to 15-20% if early emails feel like marketing spam. Keep every email:
- Short (under 150 words)
- Specific (one feature, one link)
- Optional (always-visible unsubscribe link)

---

## 6. What Makes It Feel Generous

These are specific UX decisions — not features — that signal "this is not crippleware." Each one is in direct contrast to a documented competitor failure.

| Decision | What It Signals | Anti-Pattern It Avoids |
|---|---|---|
| **Variations edit in free** | "We didn't build a fake free version." | ELEX, YITH, PW Bulk Edit all lock variable editing. |
| **No product count cap on the grid** | "We trust you with your own data." | BEAR's 10/page cap is the most mocked limitation in every comparison article. |
| **Preview diff before every save** | "We are not going to trash your catalog." | BEAR's data corruption incidents and hostile developer blame responses. |
| **Single-step undo in free** | "The safety net is not a premium feature." | No competitor offers visible undo in their free version. |
| **Grid loads immediately on open** | "No onboarding wall between you and your products." | Plugins that redirect new activations to a purchase/upgrade page before showing the product. |
| **Gated features are visible and labeled** | "You know exactly what you are not getting." | Dark patterns where premium features are invisible until you upgrade. |
| **Upgrade modal is per-feature, not generic** | "We are showing you the specific thing you need, not a generic upsell." | "Unlock the full power of Pro" modals that never name the feature. |
| **Admin notices only inside the plugin** | "We are not colonizing your WP admin." | YITH's admin notices that appear on every admin screen, including screens unrelated to their plugins. |
| **Review request fires after a successful save, not on activation** | "We earned this ask." | Plugins that request a review on activation day one, before the user has done anything. |
| **Skip on Freemius opt-in is always present** | "Saying no has no consequences." | Any plugin that makes usage tracking a condition of full access. |
| **No nag after dismissal for 30 days** | "We respect that you heard us." | Plugins that re-show the same upgrade prompt every session. |
| **Freemius exit survey on deactivation** | "We want to know why, not punish you for leaving." | Plugins that silently deactivate with no feedback mechanism. |

---

## Implementation Notes

- **Freemius SDK:** Integrate in week 6 (per build timeline in `woocommerce-bulk-editor-validation.md`). Initialize with `freemius_init()` in main plugin file.
- **Gate implementation:** Use Freemius `fs()->is_paying()` check server-side and `fsIsPayingUser` JS variable client-side. Do not trust client-side checks for actual feature execution.
- **Event tracking:** Call `fs()->track_event('event_name', ['key' => 'value'])` in PHP for server-side events; use Freemius JS SDK for client-side events.
- **Drip email sequence:** Configure in Freemius dashboard under "Campaigns." Uses merge tags like `{{first_name}}` and feature-usage variables from tracked events.
- **Trial:** Configure 7-day free trial in Freemius dashboard. "No credit card required." Enable trial from the Upgrade tab and from the in-context upgrade modals.

---

## Sources

- [free-to-paid-packaging.md](/Users/ray/Work/amazingplugins/docs/free-to-paid-packaging.md)
- [woocommerce-bulk-editor-validation.md](/Users/ray/Work/amazingplugins/docs/woocommerce-bulk-editor-validation.md)
- [distribution-and-brand-strategy.md](/Users/ray/Work/amazingplugins/docs/distribution-and-brand-strategy.md)
- [first-plugin-decision-brief.md](/Users/ray/Work/amazingplugins/docs/first-plugin-decision-brief.md)
