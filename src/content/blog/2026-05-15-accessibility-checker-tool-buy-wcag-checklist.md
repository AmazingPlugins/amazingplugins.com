---
title: 'Accessibility Checker Tool: WCAG 2.2 Buyer''s Checklist'
description: >-
  A WooCommerce buyer's checklist for testing accessibility tools against WCAG
  2.2, with manual checks alongside automated findings.
pubDate: 2026-05-15T13:05:41.443Z
updatedDate: 2026-09-28T00:00:00.000Z
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

Before you buy an accessibility checker, use this list to test what it finds and what it leaves to a person. A tool does not need to automate every item to be useful. It should tell you which ones it checks and what you must test yourself.

**Disclosure and method (September 28, 2026):** AmazingPlugins publishes WooCommerce Accessibility Fixer. This checklist uses [WCAG 2.2](https://www.w3.org/TR/wcag/) and [W3C evaluation guidance](https://www.w3.org/WAI/test-evaluate/tools/selecting/). We reviewed our released 1.5.1 package. We have not benchmarked competing products on a shared store. This is a buyer's test plan, not a vendor ranking or a conformance audit.

## Ten checks to try first

Use a product page, cart, and checkout with both valid and invalid input:

- [ ] Find product images with missing alternative text. Review whether existing text is useful (1.1.1).
- [ ] Measure text contrast in normal, hover, focus, and error states (1.4.3).
- [ ] Check accessible names and visible labels for checkout fields, including payment fields (3.3.2, 4.1.2).
- [ ] Use only a keyboard to open and leave drawers, menus, and dialogs (2.1.1, 2.1.2).
- [ ] Follow the focus order through checkout and locate the visible focus indicator (2.4.3, 2.4.7).
- [ ] Check that icon-only buttons have names (4.1.2).
- [ ] Confirm the page language is set correctly (3.1.1).
- [ ] Review heading structure in context; skipped levels alone are not a conformance failure (1.3.1, 2.4.6).
- [ ] Check that links make sense in context (2.4.4).
- [ ] Ask which WCAG 2.2 checks the tool automates and which need manual review.

## Full WCAG 2.2 buyer's checklist (27 items)


### Perceivable (WCAG 1.x)

- [ ] **1.1.1 Non-text Content** - flags missing alt; a person reviews filename-style or unhelpful alt on product images, gallery, and category thumbnails.
- [ ] **1.3.1 Info and Relationships** - checks field names, table structure, and list semantics on the product attributes table.
- [ ] **1.3.4 Orientation** - manually checks the mobile checkout works in both portrait and landscape.
- [ ] **1.3.5 Identify Input Purpose** - checks input purpose and appropriate `autocomplete` tokens on the billing address fields.
- [ ] **1.4.3 Contrast (Minimum)** - 4.5:1 for body text, 3:1 for large text. Tests sale price text on top of a colored sale badge.
- [ ] **1.4.4 Resize Text** - content stays usable at 200% zoom. Many themes break the cart at 200%.
- [ ] **1.4.10 Reflow** - checks reflow at 320 CSS pixels without two-dimensional scrolling for ordinary content.
- [ ] **1.4.11 Non-text Contrast** - 3:1 for UI components like the quantity selector borders.
- [ ] **1.4.12 Text Spacing** - text does not get clipped when line height and letter spacing are increased.

### Operable (WCAG 2.x)

- [ ] **2.1.1 Keyboard** - every interactive element reachable by Tab. Includes the variation swatch picker.
- [ ] **2.1.2 No Keyboard Trap** - focus can escape modals, mini-cart drawer, and the WooCommerce notice popups.
- [ ] **2.4.1 Bypass Blocks** - a working skip link to main content.
- [ ] **2.4.3 Focus Order** - Tab order matches visual order on checkout. Test the address fields top to bottom.
- [ ] **2.4.4 Link Purpose (In Context)** - link purpose is clear from its text or programmatic context. Review repeated 'Read more' links.
- [ ] **2.4.7 Focus Visible** - focus indicator is visible on dark and light theme backgrounds.
- [ ] **2.4.11 Focus Not Obscured (Minimum)** - NEW in WCAG 2.2. Sticky headers must not hide the currently focused field.
- [ ] **2.5.7 Dragging Movements** - NEW in WCAG 2.2. If you use a drag-to-reorder cart UI, an alternative single-pointer method must exist.
- [ ] **2.5.8 Target Size (Minimum)** - NEW in WCAG 2.2. Check target size or an applicable WCAG exception for quantity controls.

### Understandable (WCAG 3.x)

- [ ] **3.1.1 Language of Page** - `<html lang="en">` or your store's locale.
- [ ] **3.2.2 On Input** - selecting a variation does not auto-submit a form without warning.
- [ ] **3.3.1 Error Identification** - the checkout error 'Billing first name is a required field' is announced and visible.
- [ ] **3.3.2 Labels or Instructions** - every checkout field has a visible label, not just placeholder text.
- [ ] **3.3.7 Redundant Entry** - NEW in WCAG 2.2. Previously entered information is not requested again in the same process unless an exception applies.
- [ ] **3.3.8 Accessible Authentication (Minimum)** - NEW in WCAG 2.2. Login offers a way through without a cognitive function test, subject to the criterion's exceptions.

### Robust (WCAG 4.x)

- [ ] **4.1.2 Name, Role, Value** - custom controls expose the right name, role, and value.
- [ ] **4.1.3 Status Messages** - 'Product added to cart' announces to screen readers via `aria-live="polite"`.

### Honest reporting

- [ ] **Tool clearly marks** which checks are automated and which require human review. No automated tool covers every WCAG check. Ask for the scope and manual-review queue.

## Test real WooCommerce states

Run the candidate tool on a simple product, a variable product, shop filters, a cart with a coupon, checkout with invalid entries, and My Account. If the scanner cannot reach a logged-in or dynamic state, record that gap. Then test those states manually with keyboard and screen reader. A homepage scan cannot stand in for the purchase flow.

## Detection and repair are different jobs

| Tool | What it can do | What to check |
|---|---|---|
| Scanner | Report potential issues | Which pages, states, and criteria it covers |
| Plugin or automated remediation | Change selected markup, CSS, or behavior | Whether fixes are saved or run only while the tool is active |
| Human audit | Test meaning and interaction | Scope, methods, findings, and who fixes them |

A widget can also make automated changes. Its presence alone says nothing about whether the resulting checkout works. [W3C guidance](https://www.w3.org/WAI/test-evaluate/tools/selecting/) says tools cannot determine accessibility on their own.

## Where AmazingPlugins fits

[WooCommerce Accessibility Fixer](/plugins/woocommerce-accessibility-fixer/) 1.5.1 offers nine free, targeted fixers, including product-image alt fallbacks, skip links, focus styling, selected error messaging, and landmarks. Its form-label fixer has limited scope. Its contrast fixer adds selected focus and error styling; it does not measure text contrast. Some fixes use inline scripts. It does not scan against this whole checklist, cover every checkout field, or provide a Pro report. Use this checklist to test what remains.

## Questions before you choose

**Should the tool support WCAG 2.2?** Ask how it handles the newer criteria, including focus not obscured and target size. The [W3C lists the additions](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/). A report label is less useful than evidence from your store.

**Can a checker prove conformance?** No. WCAG conformance concerns the full page and requires checks that automation cannot complete. A dated report should identify its scope and remaining work.

**How should I compare trial results?** Run candidates on the same pages and states. Compare specific findings, false positives, missed barriers, and paths to repair. Do not use an arbitrary score cutoff: items vary in severity and some require human testing.

## Sources

- [W3C: WCAG 2.2](https://www.w3.org/TR/wcag/)
- [W3C: What's New in WCAG 2.2](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/)
- [W3C: Selecting Web Accessibility Evaluation Tools](https://www.w3.org/WAI/test-evaluate/tools/selecting/)

## Related reading

- [Step-by-step buying guide](/blog/accessibility-checker-tool-buy-step-by-step-guide/)
- [Nine buying mistakes](/blog/accessibility-checker-tool-buy-common-mistakes/)
