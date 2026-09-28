---
title: WCAG 2.2 Requirements for WordPress and WooCommerce
description: >-
  Where WCAG 2.2 checks land in a WordPress store, who owns each component,
  and how to test product, checkout, and account flows.
pubDate: 2026-05-08T00:00:00.000Z
updatedDate: 2026-09-28T00:00:00.000Z
author: Harun Ray
tags:
  - WooCommerce
  - WordPress
  - WCAG
  - Compliance
  - WCAG 2.2
seoKeywords:
  - wcag 2.2 wordpress
  - wcag 2.2 woocommerce
  - wcag 2.2 requirements
  - woocommerce wcag 2.2
  - wordpress accessibility 2026
seoCategory: Guides
canonicalUrl: 'https://amazingplugins.com/blog/wcag-2-2-wordpress-woocommerce-requirements/'
gscSubmitted: true
---

WCAG 2.2 is a web-content standard, not a WordPress plugin setting. A store's result depends on the rendered theme, WooCommerce templates, extensions, content, and payment flow together. A component that passes in a demo can fail after a sticky header, chat button, or custom checkout is added.

Reviewed September 28, 2026 against the [W3C WCAG 2.2 Recommendation](https://www.w3.org/TR/WCAG22/) and its [guide to what changed](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/). This page maps checks to the parts of a WordPress store. For all nine new criteria and their levels, see [what changed for WooCommerce](/blog/wcag-22-compliance-woocommerce-what-changed/). For legal timelines, see the [deadline guide](/blog/wcag-22-compliance-woocommerce-deadline/).

## Set a target, then map ownership

WCAG 2.2 adds nine success criteria to 2.1 and removes obsolete 4.1.1 Parsing. The new Level A and AA criteria include focus not being completely obscured, alternatives to dragging, minimum pointer target size with exceptions, consistent help, redundant entry, and accessible authentication. Three additions are Level AAA. A WCAG 2.2 AA target also includes the applicable earlier A and AA criteria. Publishing the standard did not create one legal deadline for every private store.

Map each customer task to the code that controls it:

| Task | Likely owner | Test question |
| --- | --- | --- |
| Navigate the catalog | Theme, filters, search extension | Can a keyboard user reach filters, operate them, and find the updated results? |
| Choose a product | WooCommerce template, gallery, variation extension | Are options named, and does a drag-only gallery have a single-pointer alternative? |
| Add to cart | Theme, cart drawer extension | Is focus visible and usable when a drawer or notice opens? |
| Check out | Checkout, shipping, payment providers | Can someone recover from errors and reuse information already given in the same process? |
| Sign in | Account and authentication extensions | Can a password manager fill fields or can a user paste credentials and codes? |
| Get help | Theme, chat, support pages | Where help appears on pages in the same set, is it in a consistent relative order? |

A failed test needs an owner. “WordPress issue” is too broad to tell the team what to change.

## Test the 2.2 additions in context

**Focus behind persistent UI (2.4.11, AA):** Tab through navigation, product options, cart, and checkout while sticky headers, cookie banners, and chat controls are present. The focused component must not be completely hidden by author-created content. A focus outline from a plugin does not solve a control covered by a header. [W3C explains the criterion](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum).

**Dragging (2.5.7, AA):** Try galleries, sliders, and custom reorder controls with a single pointer without dragging. An arrow or button may provide the same function. The criterion has exceptions for essential dragging or unmodified user-agent behavior; do not label every swipe interaction a failure without testing its alternatives. [Read the W3C criterion](https://www.w3.org/TR/WCAG22/#dragging-movements).

**Pointer targets (2.5.8, AA):** Inspect the *clickable area*, not only the visible icon, on quantity controls, variation swatches, pagination dots, and close buttons. The minimum is 24 by 24 CSS pixels unless an exception applies, including adequate spacing, an equivalent control, inline text, an unmodified user-agent control, or an essential presentation. A small checkbox is a candidate to inspect, not an automatic failure. [W3C's target-size explanation](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum) shows how to judge spacing.

**Repeated data (3.3.7, A):** If a multi-step checkout asks for information already entered in that same process, prefill it or offer it for selection unless an exception applies. Different billing and shipping addresses are legitimate; asking for the same one twice without reuse is the case to investigate. The process can cross into a third-party payment service. [W3C's redundant-entry explanation](https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html) covers the exceptions.

**Authentication (3.3.8, AA):** Test account sign-in, recovery, and any verification challenge. A password is allowed when a mechanism such as password-manager support or copy and paste reduces the memory burden. Do not block paste into one-time-code fields. Object recognition is an AA exception, although W3C advises against relying on it where possible. [W3C's authentication explanation](https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html) sets out the rule.

**Consistent help (3.2.6, A):** Compare the relative order of recurring contact, chat, or self-help mechanisms across pages in the same set. [W3C says](https://www.w3.org/WAI/WCAG22/Understanding/consistent-help.html) the criterion does not require putting help on every page.

## Run and record a repeatable check

Pick one simple product, one variable product, cart, checkout, account sign-in, and the payment step. Test desktop and narrow layouts with a keyboard. Use a screen reader to check what each control announces and whether status changes make sense. Use automated tools to flag issues they can detect, then inspect the rendered result yourself.

Record the page, viewport, browser, input method, issue, code owner, fix, and retest. Repeat after theme or extension updates that affect the path. A scan of a homepage cannot establish whether the checkout meets WCAG 2.2 AA.

## What our plugin covers

**Disclosure:** AmazingPlugins publishes [AP Accessibility Fixer for WooCommerce](/plugins/woocommerce-accessibility-fixer/). We reviewed the public WordPress.org 1.5.1 release and code on September 28, 2026. It is free, with nine fixers and no Pro tier. It scans configured WooCommerce pages and samples up to three published products per run. Fixers include a product-image alt fallback, a skip link, and selected focus and error styles. The release does not provide dedicated checks or automatic fixes for 2.5.8 target size, 2.5.7 dragging alternatives, 3.3.7 repeated entry, or 3.3.8 authentication. Test those criteria on your actual store.

## Related reading

- [All nine WCAG 2.2 changes for WooCommerce](/blog/wcag-22-compliance-woocommerce-what-changed/)
- [WooCommerce accessibility plugin selection guide](/blog/ada-compliance-plugin-full-guide/)
