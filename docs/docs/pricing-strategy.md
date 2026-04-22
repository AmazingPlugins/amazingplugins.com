# Competitor Pricing Analysis — WooCommerce Accessibility Plugins

**Research date:** 2026-04-13
**Category:** Accessibility overlays + code-fix plugins

---

## Competitor Overview

### Overlay Tools (JavaScript widget layer)

These tools add a JavaScript widget that modifies the page in the browser — they do NOT change the underlying HTML/CSS. Courts and accessibility advocates consider these inadequate for true compliance because automated testing tools still detect violations in the source code.

| Product | Type | Starting Price | Notes |
|---|---|---|---|
| AccessiBe Widget | Overlay | $490/yr | Market leader, well-known (infamous in a11y community) |
| AccessiBe Managed | Overlay + human audits | $1,188/yr | Quarterly human audits |
| UserWay | Overlay | ~$99-199/yr | Smaller competitor |
| OneTap (WordPress) | Overlay | $69/yr | WordPress-specific, cheap |
| AudioEye | Overlay | Custom pricing | Enterprise-focused |
| User1st | Overlay | Custom pricing | EU-focused |
| A11Y Machine | Hybrid | Custom | Some code fixes |

### Code-Fix Plugins (actual HTML/CSS remediation)

These actually modify the underlying code — more defensible for compliance purposes.

| Product | Type | Notes |
|---|---|---|
| WP ADA Compliance (Webnus) | Code-fix + human audits | Established player, expensive |
| Shadeed A11Y | Code-fix | Smaller, less established |
| AmazingPlugins WooCommerce Fixer | Code-fix | WooCommerce-specific, freemium |

---

## AccessiBe Pricing Breakdown

### Widget Plans (Annual Billing)
- Up to 10,000 pageviews/month: **$490/yr**
- 10,001-25,000 pageviews: **$950/yr**
- 25,001-100,000 pageviews: Custom (~$1,200-$1,800/yr)
- 100,000+ pageviews: Enterprise (~$10,000+/yr)

### Managed Services (Annual Billing)
- Up to 1,000 pageviews: **$1,188/yr**
- 1,001-10,000 pageviews: **$1,584/yr**
- 10,001-25,000 pageviews: **$2,376/yr**
- 25,001-100,000 pageviews: **$3,564/yr**
- 100,001-250,000 pageviews: **$5,940/yr**
- 250,000+ pageviews: Custom

### Enterprise
- Starts at **$10,000/yr**, scales to $50,000+ for large sites

### Weaknesses in AccessiBe's Model
- Overlays do NOT fix source code — WAVE/axe still detect violations
- FTC issued a warning (2024) about accessibility overclaiming
- Multiple lawsuits have targeted AccessiBe users specifically
- Expensive for small businesses
- No continuous fixing — weekly scans, issues persist until next scan

---

## OneTap Pricing (WordPress-specific overlay)

From search results:
- 1 website: **$69/yr**
- Unknown higher tiers

### Weaknesses
- Overlay — same fundamental problem as AccessiBe
- Unknown brand — small vendor risk
- No specific WooCommerce support

---

## UserWay Pricing

- Starting around **$99-199/yr** (overlay)
- Free tier with UserWay branding
- Custom enterprise pricing

### Weaknesses
- Same overlay problem
- Free tier has limited functionality

---

## WP ADA Compliance (Webnus) Pricing

From search results:
- Subscription-based (annual)
- Pricing tiers based on pages/features
- Human audit add-ons available

### Notes
- More legitimate than pure overlays (some human review)
- More expensive than overlay tools
- WordPress/WooCommerce focused

---

## Our Pricing Strategy

### Positioning

**We are NOT an overlay.** We actually fix the code. This is the fundamental differentiation — our plugin modifies the underlying HTML/CSS to address accessibility violations at the source. Automated tools (WAVE, axe) pass after fixing.

This makes us defensible in a lawsuit. Overlays do not.

### Freemium Tiers

| Tier | Price | Fixes/month | Features |
|---|---|---|---|
| **Free** | $0 | 10/month | All 10 fixers, email support |
| **Pro** | $19/mo ($190/yr) | Unlimited | Priority support, batch scan, all platforms |
| **Agency** | $49/mo ($490/yr) | Unlimited + white-label | 5 sites, API access, batch scan |

### Why This Pricing

**vs AccessiBe ($490/yr minimum):**
- AccessiBe is $490/yr for an overlay that doesn't actually fix code
- We're $190/yr for real code fixes + unlimited usage
- 60% cheaper AND technically superior

**vs WordPress overlay tools ($69-199/yr):**
- We're similarly priced but actually fix code (not just overlay)
- WooCommerce-specific — more relevant than generic tools
- Free tier with 10 fixes — users can test before buying

**vs WP ADA Compliance (human audits):**
- Human audit services start at $1,000+ for a one-time review
- We're $19/mo for continuous automated fixing
- No professional audit claim — we fix automatically, not via human review

### Pricing Principles

1. **Free tier is generous** — 10 fixes/month lets small stores stay compliant without paying. This generates goodwill, reviews, and word-of-mouth.
2. **Price on value, not time** — a store avoiding a $5,000 lawsuit gets massive value from a $19/mo subscription.
3. **Annual discount** — 2 months free on annual ($190 vs $228 monthly) incentivizes commitment.
4. **Agency tier matches AccessiBe Widget pricing** — at $490/yr, agencies managing multiple WooCommerce stores get the same price as AccessiBe Widget but with actual code fixes.
5. **Never compete on price with desperate vendors** — there are cheap overlay tools. We don't go there. We compete on quality and defensibility.

### Pricing Anchoring Copy

> "AccessiBe charges $490/year for an overlay that doesn't fix your code. We charge $190/year to actually fix it."

> "If the ADA lawsuit risk is real (and it is), $19/month is a rounding error compared to $5,000+ in legal defense."

---

## Shopify App Pricing (to align with WooCommerce)

| Tier | Price | Features |
|---|---|---|
| **Free** | $0 | 10 fixes/month |
| **Pro** | $19/mo ($190/yr) | Unlimited, all 10 fixers |
| **Agency** | $49/mo ($490/yr) | 5 stores, API access |

Same tier structure as WooCommerce plugin. Single purchase covers both platforms or bundled for both.

---

## Future: Enterprise Tier (Optional)

If demand materializes:
- Custom pricing
- Human audit add-on (partner with a11y consultancy)
- SLA guarantee
- Dedicated account manager
- Priority emergency support

---

## Notes on Freemius

- Standard platform fee: 7% + payment processing
- This is built into pricing already
- We charge $190/yr, Freemius takes ~7% + stripe = ~$13-14 per transaction, leaving us ~$176 net
- Alternative: one-time purchase (but harder to sustain development)

---

## Competitor Weaknesses to Highlight in Copy

1. **Overlays don't fix code** — axe/WAVE still fail
2. **Weekly scans are not continuous** — violations accumulate between scans
3. **Expensive for small stores** — AccessiBe's minimum is $490/yr
4. **Poor a11y community reputation** — overlay tools are widely criticized
5. **No WooCommerce-specific features** — most tools are generic
6. **No free tier** — UserWay free = limited, AccessiBe = no free tier
