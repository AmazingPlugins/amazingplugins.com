---
title: 'Accessibility Checker Tool: WCAG 2.2 Buyer''s Checklist'
description: >-
  The exact WCAG 2.2 checklist to use when you buy an accessibility checker tool
  for WooCommerce. 27 checks, success criteria numbers, no fluff.
pubDate: 2026-05-15T13:05:41.443Z
author: Harun Ray
tags:
  - Accessibility
  - WCAG
  - WooCommerce
  - Compliance
  - Buying Guide
seoKeywords:
  - '`accessibility checker tool buy`'
seoCategory: accessibility
articleAngle: wcag-checklist
gscSubmitted: true
---

Before you buy any accessibility checker tool, run it against this WCAG 2.2 checklist. If the tool cannot detect or fix at least 22 of these 27 items on a real WooCommerce store, do not buy it. The checklist below is what separates a real checker from a JavaScript widget that paints a badge on your footer.

This guide is for WooCommerce store owners who are about to spend money on an accessibility checker tool and want to test it honestly before the credit card hits. Every item maps to a specific WCAG 2.2 success criterion and a real WooCommerce surface (product page, cart, checkout, account).

## Quick answer

A WCAG 2.2 buyer's checklist for an accessibility checker tool needs three layers:

1. **Detection coverage** of all 50 WCAG 2.2 Level A and AA success criteria, with honest reporting on which it cannot test automatically (roughly 30 to 40 percent of criteria need human review).
2. **WooCommerce-specific checks** that hit cart, checkout, variable products, mini-cart, account dashboard, and the block-based product gallery, not just the homepage.
3. **Fix capability**, not just reporting. A checker that finds 200 issues and offers no path to fix them is a $300 invoice you have to send to a developer.

If you only have 10 minutes to evaluate a tool, run the **Top 10 quick checks** in the next section.

## The top 10 quick checks (10 minutes)

Use a free trial. Point the tool at one product page, your cart, and your checkout. Confirm each of these:

- [ ] **Detects missing alt text** on product images (WCAG 1.1.1 Non-text Content). It should flag your product gallery, not just the header logo.
- [ ] **Detects color contrast failures** on Add to Cart buttons and price text (WCAG 1.4.3 Contrast Minimum, 4.5:1 ratio).
- [ ] **Detects unlabeled form fields** on checkout (WCAG 1.3.1 Info and Relationships, 4.1.2 Name Role Value). WooCommerce checkout has 18+ fields. Every one needs a label.
- [ ] **Detects keyboard trap** scenarios on the variable product dropdown (WCAG 2.1.2 No Keyboard Trap).
- [ ] **Detects missing focus indicator** on the cart quantity input and Update Cart button (WCAG 2.4.7 Focus Visible).
- [ ] **Detects empty buttons** (WCAG 2.4.4 Link Purpose). The icon-only mini-cart button is a classic offender.
- [ ] **Detects missing lang attribute** on `<html>` (WCAG 3.1.1 Language of Page).
- [ ] **Detects skipped heading levels** (WCAG 1.3.1). Themes love jumping from H1 to H4.
- [ ] **Detects link text like 'Read more'** repeated 12 times on the shop page (WCAG 2.4.4).
- [ ] **Reports WCAG 2.2 specifically**, not WCAG 2.0 or 2.1. WCAG 2.2 added 9 new criteria, including Focus Not Obscured (2.4.11) and Dragging Movements (2.5.7). If the tool's report still says 'WCAG 2.0 AA', the engine is old.

If a tool fails 3 or more of these 10, save your money.

## Full WCAG 2.2 buyer's checklist (27 items)

### Perceivable (WCAG 1.x)

- [ ] **1.1.1 Non-text Content** - flags missing or filename-style alt on product images, gallery, and category thumbnails.
- [ ] **1.3.1 Info and Relationships** - detects unlabeled form fields, broken table structure, missing list semantics on the product attributes table.
- [ ] **1.3.4 Orientation** - checks the mobile checkout works in both portrait and landscape.
- [ ] **1.3.5 Identify Input Purpose** - flags missing `autocomplete` attributes on the billing address fields.
- [ ] **1.4.3 Contrast (Minimum)** - 4.5:1 for body text, 3:1 for large text. Tests sale price text on top of a colored sale badge.
- [ ] **1.4.4 Resize Text** - content stays usable at 200% zoom. Many themes break the cart at 200%.
- [ ] **1.4.10 Reflow** - no horizontal scroll at 320px wide.
- [ ] **1.4.11 Non-text Contrast** - 3:1 for UI components like the quantity selector borders.
- [ ] **1.4.12 Text Spacing** - text does not get clipped when line height and letter spacing are increased.

### Operable (WCAG 2.x)

- [ ] **2.1.1 Keyboard** - every interactive element reachable by Tab. Includes the variation swatch picker.
- [ ] **2.1.2 No Keyboard Trap** - focus can escape modals, mini-cart drawer, and the WooCommerce notice popups.
- [ ] **2.4.1 Bypass Blocks** - a working skip link to main content.
- [ ] **2.4.3 Focus Order** - Tab order matches visual order on checkout. Test the address fields top to bottom.
- [ ] **2.4.4 Link Purpose (In Context)** - link text describes destination. No bare 'Read more' or 'Click here'.
- [ ] **2.4.7 Focus Visible** - focus indicator is visible on dark and light theme backgrounds.
- [ ] **2.4.11 Focus Not Obscured (Minimum)** - NEW in WCAG 2.2. Sticky headers must not hide the currently focused field.
- [ ] **2.5.7 Dragging Movements** - NEW in WCAG 2.2. If you use a drag-to-reorder cart UI, an alternative single-pointer method must exist.
- [ ] **2.5.8 Target Size (Minimum)** - NEW in WCAG 2.2. Buttons at least 24×24 CSS pixels. The minus/plus quantity buttons frequently fail this.

### Understandable (WCAG 3.x)

- [ ] **3.1.1 Language of Page** - `<html lang="en">` or your store's locale.
- [ ] **3.2.2 On Input** - selecting a variation does not auto-submit a form without warning.
- [ ] **3.3.1 Error Identification** - the checkout error 'Billing first name is a required field' is announced and visible.
- [ ] **3.3.2 Labels or Instructions** - every checkout field has a visible label, not just placeholder text.
- [ ] **3.3.7 Redundant Entry** - NEW in WCAG 2.2. Billing address auto-fills shipping if the user already entered it.
- [ ] **3.3.8 Accessible Authentication (Minimum)** - NEW in WCAG 2.2. Login does not require solving a cognitive puzzle (no math captchas).

### Robust (WCAG 4.x)

- [ ] **4.1.2 Name, Role, Value** - custom WooCommerce widgets expose ARIA roles. The mini-cart count needs `aria-live`.
- [ ] **4.1.3 Status Messages** - 'Product added to cart' announces to screen readers via `aria-live="polite"`.

### Honest reporting

- [ ] **Tool clearly marks** which checks are automated and which require human review. WebAIM and Deque both estimate automated tools catch 30 to 50 percent of WCAG issues. Any vendor claiming '100% automated WCAG compliance' is selling an overlay.

## What to test it on (the WooCommerce surfaces)

A homepage scan tells you almost nothing. Run any candidate tool against:

1. **One simple product page** with reviews enabled.
2. **One variable product page** with at least 3 attributes.
3. **The shop archive** with pagination.
4. **The cart page** with 2 items and a coupon applied.
5. **The checkout page** with the 'Create an account' option visible.
6. **The My Account dashboard** after logging in.
7. **The category page** with filters/facets active.

If the tool only scans the homepage on the free tier, that is a marketing demo, not a real evaluation.

For a deeper walkthrough of the buying process itself, see our [step-by-step buying guide for accessibility checker tools](https://amazingplugins.com/blog/accessibility-checker-tool-buy-step-by-step-guide/), and the [9 buying mistakes to avoid](https://amazingplugins.com/blog/accessibility-checker-tool-buy-common-mistakes/) before you commit to a yearly contract.

## Detection vs fix: the comparison that actually matters

Most accessibility checker tools fall into one of three buckets. Know which one you are buying.

| Tool type | What it does | Honest limitation | When to buy |
|---|---|---|---|
| **Pure scanner** (axe, WAVE, Lighthouse) | Reports WCAG failures with code references | You still need a developer to fix every issue | You have a dev team and want a free audit baseline |
| **Overlay widget** (the ones with a wheelchair icon) | Injects JavaScript that tries to patch issues at runtime | FTC fined accessiBe; overlays do not fix underlying code; stores using them still get sued | Almost never. The 2025 lawsuit data is brutal here |
| **Code-level fixer plugin** | Scans, then applies real HTML/ARIA fixes via WordPress hooks | Cannot judge meaningful alt text or complex custom flows | You run WooCommerce, do not have a dev on retainer, and want fixes applied at the source |

This is the trade most store owners get wrong. They buy a scanner, get a 400-issue report, and have no plan for the next step. Or they buy an overlay because the sales page promised '100% ADA compliance in one line of code', and end up in the lawsuit data we cited above.

## How AmazingPlugins helps

The **WooCommerce Accessibility Fixer** is built for the third bucket. It scans your store against the WCAG 2.2 checklist above and applies real fixes through WordPress hooks and WooCommerce template overrides, not a JavaScript overlay.

What it actually does on the items in this checklist:

- **Auto-generates alt text** for product images that are missing it (1.1.1).
- **Adds proper ARIA labels** to the cart quantity inputs and checkout fields (4.1.2, 3.3.2).
- **Injects a visible focus indicator** that respects your theme's color scheme (2.4.7).
- **Adds the skip link** if your theme is missing one (2.4.1).
- **Sets the lang attribute** correctly from your WordPress site language (3.1.1).
- **Fixes empty button text** on icon-only mini-cart and search buttons (2.4.4).
- **Improves color contrast** on common WooCommerce elements where automatic adjustment is safe (1.4.3).

The **Pro tier** adds batch scanning across all products, an auto-fix mode where the change is safe, and a PDF compliance report you can hand to a lawyer or auditor.

What it will not do, honestly: write meaningful alt text for a complex lifestyle photo of your product in use (a human still has to write 'Woman wearing the navy raincoat in the rain at a London bus stop'), or fix accessibility bugs in a custom checkout flow built by a developer who left no documentation. For those, you need a human reviewer, and the Pro PDF report is built to make that review fast.

For a wider list of issues this catches, see our breakdown of [10 common accessibility issues on e-commerce sites and how to fix them](https://amazingplugins.com/blog/10-common-accessibility-issues-on-e-commerce-sites/).

## Frequently asked questions

### What WCAG version should an accessibility checker tool support in 2026?

WCAG 2.2 Level AA. WCAG 2.2 was finalized in October 2023 and is now the de facto best-practice standard. The European Accessibility Act (EAA), enforceable since June 28, 2025, references EN 301 549 which is aligned with WCAG 2.1 AA as the legal floor. WCAG 2.2 added 9 new success criteria you should specifically ask the vendor about, including Focus Not Obscured (2.4.11) and Target Size Minimum (2.5.8).

### How much does a real WooCommerce accessibility checker tool cost?

Reputable code-level fixer plugins for WooCommerce typically run $99 to $499 per year for a single site. Overlay widgets often charge $490+ per year and provide questionable value. A full manual audit by an accessibility consultancy runs $5,000 to $15,000 per site. The math: with average ADA lawsuit settlement around $25,000 and 5,114+ digital accessibility lawsuits filed in 2025, a $200 plugin pays for itself if it prevents one demand letter.

### Can an accessibility checker tool make my WooCommerce store fully WCAG compliant on its own?

No, and any vendor that claims this is misleading you. WebAIM and Deque both estimate that automated tools catch 30 to 50 percent of WCAG issues. The remaining 50 to 70 percent require human judgment: meaningful alt text, logical reading order, error message clarity, and complex interactive component testing. A good tool will tell you this honestly and flag which criteria need human review.

### Do I need an accessibility checker tool if I sell only in the US?

Yes. The Department of Justice has confirmed Title III of the ADA applies to commercial websites, and 5,114 to 8,667 digital accessibility lawsuits were filed in the US in 2025 alone (sources vary on federal-only vs federal-plus-state counts). About 32% of those targeted WooCommerce-style e-commerce sites. The lack of an official ADA technical standard makes WCAG 2.1 AA the courts' default reference.

### How do I test a checker tool's free trial properly?

Point it at four pages, in this order: a variable product, the cart with a coupon, the checkout with intentionally invalid data, and the My Account page. Compare the report to a manual scan with the free WAVE browser extension and axe DevTools. If the paid tool finds significantly fewer issues than the free tools, the engine is weak. If it finds the same issues but offers a fix path, that is what you are paying for.

## Final scoring

Give each candidate tool a score out of 27 against the checklist above. Anything below 22 is a no-buy. Anything from 22 to 25 is workable if it has a strong fix capability. 26 to 27 is rare and worth paying for, especially if it includes WooCommerce-specific checks for cart, checkout, and variation forms.

Spend an hour on this checklist before you spend a dollar on the tool. It is the cheapest insurance against buyer's remorse and a follow-up demand letter.
