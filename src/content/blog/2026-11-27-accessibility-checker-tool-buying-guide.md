---
title: 'How to Buy an Accessibility Checker for WooCommerce'
description: 'What an accessibility checker can and cannot fix on a WooCommerce store, a WCAG 2.2 buyer checklist, and the questions to ask before you pay.'
pubDate: 2026-05-15T13:02:14.756Z
updatedDate: 2026-11-27T00:00:00.000Z
author: Harun Ray
tags:
  - Accessibility
  - WooCommerce
  - WCAG
  - ADA Compliance
  - Buying Guide
seoKeywords:
  - accessibility checker tool
  - wcag 2.2 checklist
  - buy woocommerce accessibility plugin
seoCategory: accessibility
articleAngle: buying-guide
gscSubmitted: false
---

A checker can save you a week of manual hunting. It can't tell you whether a customer can finish checkout with a screen reader. Knowing which half you're buying is the whole decision.

**Disclosure and method (November 27, 2026):** AmazingPlugins publishes WooCommerce Accessibility Fixer. This guide uses [W3C evaluation guidance](https://www.w3.org/WAI/test-evaluate/tools/selecting/), public vendor documentation, and our own released plugin. We haven't run competing products head to head on one store. Treat the advice as a test plan, not a legal opinion.

## What an accessibility checker can and cannot tell you

A checker loads a page, applies rules to the rendered markup, styles, and accessible names, then reports what it found. Point it at a product page and it will usually catch a missing `alt` attribute, a low contrast price, or a button with no name.

What it can't do is decide what those things should say, or whether the flow works. Two examples from a normal WooCommerce store:

- A missing `alt` on a gallery image is a finding. Whether "Blue hoodie, back view, size medium" is the right replacement is a judgement about your product.
- A scan may report that a variation picker has no accessible name. It won't tell you whether someone can actually choose "Large / Navy" with a keyboard and reach the add-to-cart button without getting lost.

Coverage depends on what the tool can reach. Product variations, cart updates, coupon errors, shipping choices, and payment iframes behave nothing like a static page. If the scanner can't log in, open a mini-cart, or trigger a validation error, those states were never tested. The [W3C is direct about this](https://www.w3.org/WAI/test-evaluate/tools/selecting/): evaluation tools can't determine accessibility on their own.

So the useful question isn't "does it scan my site". It's "which pages and states does it reach, and what do I still owe a human".

## Checker, fixer, widget, or audit: pick by the job

Vendors blend these categories, so the label on the pricing page tells you very little. Buy by the work:

| What you need | What to buy | Ask before paying |
|---|---|---|
| A list of repeatable failures | A scanner | Can it reach logged-in, cart, and checkout-error states? |
| A known pattern corrected | A targeted plugin or automated fix | Which markup changes, and does it persist after deactivation? |
| An interaction or content decision tested | A human review | Which devices, flows, and assistive technologies are included? |
| Work tracked over time | Monitoring plus a dated issue log | Can findings be assigned and retested? |

Automated remediation products sit in between. [accessiBe's accessWidget](https://support.accessibe.com/hc/en-us/articles/20590637170450-How-does-accessWidget-work) describes a visitor interface plus automatic adjustments. [UserWay](https://userway.org/widget/) also describes automated remediation and sells [monitoring](https://help.userway.org/en/articles/6140127-getting-started-with-the-userway-accessibility-monitor) separately. [AudioEye](https://www.audioeye.com/solution/all-features/) lists automated fixes next to expert services. It's wrong to say these tools only draw a toolbar, and equally wrong to assume they cover your checkout.

One detail worth asking about: what happens when the tool is switched off. Fixes saved in content or theme code stay. Fixes applied by CSS or JavaScript at page load leave with the tool. Both can be legitimate. You just need to know which one you're paying for.

## Nine ways people waste money on a checker

These are the patterns we see in support threads, not a ranking of vendors.

**1. Treating installation as proof.** A widget, plugin, or audit contract doesn't show that customers can use your checkout. [WCAG conformance](https://www.w3.org/TR/wcag/) applies to full pages, not to the presence of a tool.

**2. Trusting a score.** An automated score covers the checks the tool can run. It can miss a payment error, a variation picker, or an account-only page. Ask for the failed element, the criterion, the method, and what stayed open.

**3. Ignoring WooCommerce states.** Ask a vendor to demonstrate coverage on your theme, with your extensions, in a real cart. "WordPress support" is not the same as "your checkout".

**4. Buying a WCAG version label.** WCAG 2.2 added focus not obscured, target size, dragging movements, redundant entry, and accessible authentication. A dashboard that says "WCAG 2.2" may still leave all five to you. See the [W3C additions list](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/).

**5. Paying before running the purchase.** Get a baseline on staging first. Use only a keyboard to pick a variation, update the cart, trigger a checkout error, fix it, and submit. Repeat with a screen reader. Give every vendor the same scenario.

**6. Confusing page count with coverage.** A crawler can log thousands of product URLs and never open the mini-cart. A short test that touches real interactions tells you more.

**7. Buying findings without a repair plan.** A report is useful when each issue has an owner. Some fixes belong in content, some in the theme, some in an extension, and some in the payment provider.

**8. Accepting generated text as final.** An empty `alt` can be detected. Whether a product title describes a specific photo is a human call. The same goes for link text, headings, and instructions.

**9. Skipping retests.** A theme or extension update can change focus order, labels, and error messages. Keep a dated log and rerun the purchase flow after changes. The [W3C report template](https://www.w3.org/WAI/test-evaluate/report-template/) shows how to record scope and method instead of claiming a pass.

## The WCAG 2.2 buyer's checklist

Use this list to see what a candidate tool reports and what it leaves for you. A useful product doesn't have to automate every item. It has to tell you which ones it checked.

### Ten checks to run first

Run these on a product page, the cart, and checkout, with both valid and invalid input:

- [ ] Product images with missing or useless `alt` text (1.1.1).
- [ ] Text contrast in normal, hover, focus, and error states (1.4.3).
- [ ] Visible labels and accessible names on checkout fields, payment fields included (3.3.2, 4.1.2).
- [ ] Keyboard-only use of drawers, menus, and dialogs (2.1.1, 2.1.2).
- [ ] Focus order through checkout and a visible focus indicator (2.4.3, 2.4.7).
- [ ] Names on icon-only buttons (4.1.2).
- [ ] Correct page language (3.1.1).
- [ ] Heading structure in context. Skipped levels alone are not a failure (1.3.1, 2.4.6).
- [ ] Link purpose readable in context (2.4.4).
- [ ] Which WCAG 2.2 checks the tool automates and which it hands back.

### Full checklist, 27 items

**Perceivable**

- [ ] **1.1.1 Non-text Content** - flags missing alt; a person reviews filename-style or vague alt on product images and gallery thumbnails.
- [ ] **1.3.1 Info and Relationships** - field names, table structure, and list semantics on the product attributes table.
- [ ] **1.3.4 Orientation** - mobile checkout works in portrait and landscape.
- [ ] **1.3.5 Identify Input Purpose** - `autocomplete` tokens on billing address fields.
- [ ] **1.4.3 Contrast (Minimum)** - 4.5:1 for body text, 3:1 for large text, including sale prices on a colored badge.
- [ ] **1.4.4 Resize Text** - content stays usable at 200% zoom, where many themes break the cart.
- [ ] **1.4.10 Reflow** - no two-dimensional scrolling at 320 CSS pixels.
- [ ] **1.4.11 Non-text Contrast** - 3:1 for controls such as quantity selector borders.
- [ ] **1.4.12 Text Spacing** - text isn't clipped when spacing is increased.

**Operable**

- [ ] **2.1.1 Keyboard** - every control reachable by Tab, including the variation swatch picker.
- [ ] **2.1.2 No Keyboard Trap** - focus can leave modals, the mini-cart drawer, and notice popups.
- [ ] **2.4.1 Bypass Blocks** - a skip link that goes to main content.
- [ ] **2.4.3 Focus Order** - tab order matches the visual order on checkout.
- [ ] **2.4.4 Link Purpose (In Context)** - repeated "Read more" links make sense on their own.
- [ ] **2.4.7 Focus Visible** - the indicator is visible on light and dark backgrounds.
- [ ] **2.4.11 Focus Not Obscured (Minimum)** - sticky headers don't hide the focused field. New in 2.2.
- [ ] **2.5.7 Dragging Movements** - a single-pointer alternative for drag-to-reorder carts. New in 2.2.
- [ ] **2.5.8 Target Size (Minimum)** - quantity controls meet the size rule or an exception. New in 2.2.

**Understandable**

- [ ] **3.1.1 Language of Page** - `<html lang="en">` or your store's locale.
- [ ] **3.2.2 On Input** - choosing a variation doesn't submit without warning.
- [ ] **3.3.1 Error Identification** - "Billing first name is a required field" is visible and announced.
- [ ] **3.3.2 Labels or Instructions** - every field has a visible label, not just a placeholder.
- [ ] **3.3.7 Redundant Entry** - the flow doesn't ask for the same information twice. New in 2.2.
- [ ] **3.3.8 Accessible Authentication (Minimum)** - login has a path that doesn't need a cognitive test. New in 2.2.

**Robust**

- [ ] **4.1.2 Name, Role, Value** - custom controls expose the right name, role, and state.
- [ ] **4.1.3 Status Messages** - "Product added to cart" reaches screen readers through `aria-live="polite"`.

If a scan can't reach a logged-in page or a dynamic state, write that gap down and test it by hand. A homepage scan is not a purchase test.

## Six steps from baseline to a decision

1. **Write down what needs checking.** Theme, checkout type, payment provider, variation tools, and any custom cart or account extensions. If an issue lives inside a payment iframe, find out who can change it.
2. **Get a baseline before you pay.** Run an evaluator on a product page, cart, and checkout. Keep the issue details, not the score. Then do the keyboard and screen-reader purchase.
3. **Group failures by owner.** Content, theme, extension, payment provider, or tool. This is the list you'll hold vendors to.
4. **Ask for a demonstration on your cases.** A missing alt, an unlabeled field, an error message, a focus problem, and a contrast failure on your theme. Which get detected, which get changed, which get handed back.
5. **Check the quote and the contract.** Current pricing for your site and service level, renewal terms, scan limits, support, and whether human testing is included. Price ranges from old articles are not a quote.
6. **Use the trial to finish a purchase.** Same flow as step 2. Record what improved and what didn't, then ask for a dated report that names its scope and methods.

## Questions buyers ask

### Does buying a checker make a store compliant?

No. Conformance concerns the full page and includes checks automation can't complete. Use the tool to find and fix barriers, keep records, and get qualified advice for legal questions about your business.

### Is a free scanner enough?

It's a good start and it costs nothing. You still need someone to act on the findings and test the interactions a scanner can't assess.

### Do I need a PDF report?

You need a record of what was tested, fixed, and left open. Scope, date, methods, and findings matter more than the file format. A generated certificate isn't a substitute for a purchase test.

### Will an automated fixer slow down my store?

Measure it on your own theme before and after. Impact depends on the script and how it loads, and a category label won't give you a number.

### Should I buy something that fixes pages at runtime?

Sometimes yes. Just ask what happens after the tool is removed, and whether the fix survives a theme update. Runtime fixes are easy to test and easy to forget.

## Where WooCommerce Accessibility Fixer fits

[WooCommerce Accessibility Fixer](/plugins/woocommerce-accessibility-fixer/) has nine free fixers for specific WooCommerce problems. They cover product-image alt fallbacks, focus styles, form labels, a skip link, keyboard trap escape, focus and error contrast styles, and a few related patterns. Some of them add small inline scripts.

What it doesn't do: it isn't a catalog scanner, it doesn't measure text contrast across your site, it doesn't repair every checkout label, and it doesn't produce a compliance report. There's no Pro tier. Every fixer is a change to inspect on your own theme, and the judgement calls, such as what a product photo should say, are still yours.

Used against the checklist above, it clears some items and shows you where the rest of the work is. That's the honest pitch. [Website accessibility checker pricing](/blog/website-accessibility-checker-pricing/) covers what vendors charge if you're comparing quotes, and [how to fix missing alt text on WooCommerce product images](/blog/fix-missing-alt-text-woocommerce-product-images/) walks through the most common finding in detail.

## Sources

- [W3C: Selecting Web Accessibility Evaluation Tools](https://www.w3.org/WAI/test-evaluate/tools/selecting/)
- [W3C: WCAG 2.2](https://www.w3.org/TR/wcag/)
- [W3C: What's New in WCAG 2.2](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/)
- [W3C: Evaluation report template](https://www.w3.org/WAI/test-evaluate/report-template/)
- [accessiBe: How accessWidget works](https://support.accessibe.com/hc/en-us/articles/20590637170450-How-does-accessWidget-work)
- [accessiBe: Technological limitations](https://support.accessibe.com/hc/en-us/articles/25109109077010-What-are-accessWidget-s-technological-limitations)
- [UserWay Accessibility Widget](https://userway.org/widget/)
- [UserWay Accessibility Monitor](https://help.userway.org/en/articles/6140127-getting-started-with-the-userway-accessibility-monitor)
- [AudioEye product features](https://www.audioeye.com/solution/all-features/)

Vendor documentation was reviewed November 27, 2026. Products change. We didn't benchmark vendors on a shared store.
