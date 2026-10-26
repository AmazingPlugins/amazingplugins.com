---
title: WCAG 2.2 Requirements for WordPress and WooCommerce
description: >-
  The nine WCAG 2.2 additions, which dates apply to whom, and how to test
  product, checkout, and account flows on a WordPress store.
pubDate: 2026-05-08T00:00:00.000Z
updatedDate: 2026-10-26T00:00:00.000Z
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
  - wcag 2.2 deadline
  - wcag 2.2 what changed
seoCategory: Guides
canonicalUrl: 'https://amazingplugins.com/blog/wcag-2-2-wordpress-woocommerce-requirements/'
gscSubmitted: true
---

WCAG 2.2 is a web-content standard, not a WordPress plugin setting. A store's result depends on the rendered theme, WooCommerce templates, extensions, content, and payment flow together. A component that passes in a demo can fail after a sticky header, chat button, or custom checkout is added.

Reviewed September 28, 2026 against the [W3C WCAG 2.2 Recommendation](https://www.w3.org/TR/WCAG22/) and its [guide to what changed](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/). This page lists the nine new criteria, maps the checks to the parts of a WordPress store, and separates the dates people mix together. It's a planning guide, not a legal determination for your business.

## The nine additions, by level

| Criterion | Level | What to check on a store |
| --- | --- | --- |
| **2.4.11 Focus Not Obscured (Minimum)** | AA | A sticky header, cart drawer, or banner must not completely hide the keyboard-focused control. |
| **2.4.12 Focus Not Obscured (Enhanced)** | AAA | No part of the focused component is hidden by author-created content. |
| **2.4.13 Focus Appearance** | AAA | The visible focus indicator meets the criterion's size and contrast requirements. Check the full [W3C text](https://www.w3.org/TR/WCAG22/#focus-appearance), including its alternatives and exceptions, before judging an outline by thickness alone. |
| **2.5.7 Dragging Movements** | AA | A gallery, slider, or reorder control that uses dragging also has a single-pointer method without dragging, unless an exception applies. |
| **2.5.8 Target Size (Minimum)** | AA | Small controls meet the 24 by 24 CSS pixel rule **or one of its exceptions**, including sufficient spacing. Measure quantity buttons and gallery dots in context. |
| **3.2.6 Consistent Help** | A | Help mechanisms that appear on several pages in the same set stay in the same relative order. The criterion does not require adding help to every page. |
| **3.3.7 Redundant Entry** | A | Information requested again during the same purchase process is prefilled or available to select, unless an exception applies. |
| **3.3.8 Accessible Authentication (Minimum)** | AA | Account sign-in does not require a memory, transcription, or puzzle task without an allowed alternative or assistance mechanism. |
| **3.3.9 Accessible Authentication (Enhanced)** | AAA | A stricter version of authentication that does not use the object-recognition or personal-content exceptions. |

Only the six Level A and AA entries are needed for a WCAG 2.2 AA target. The AAA entries are useful design prompts, not extra AA requirements.

**Parsing was removed, not good markup.** W3C marks [4.1.1 Parsing as obsolete](https://www.w3.org/WAI/WCAG22/Understanding/parsing). A duplicate ID or malformed component can still fail another criterion, such as 1.3.1 or 4.1.2. Keep testing the accessible name, role, value, and relationships users actually receive.

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

## Is there a WCAG 2.2 deadline?

There is no single WCAG 2.2 deadline for every WooCommerce store. WCAG is a technical standard. Whether a law applies to your business depends on where you offer services, the type and size of the business, and the law in that jurisdiction.

| Date | What it means | Who should check it |
| --- | --- | --- |
| October 5, 2023 | [W3C published WCAG 2.2](https://www.w3.org/TR/WCAG22/) as a Recommendation. Publication did not create a legal deadline. | Anyone setting a technical accessibility target. |
| June 28, 2025 | EU member states began applying measures under the [European Accessibility Act](https://eur-lex.europa.eu/eli/dir/2019/882/oj), which includes certain ecommerce services. The directive has exceptions and transitional provisions. | Businesses offering covered services to EU consumers. Check the law of the relevant member state and any exception. |
| April 26, 2027 and April 26, 2028 | The U.S. Department of Justice's [Title II web rule](https://www.ada.gov/resources/web-rule-first-steps/) dates for state and local government entities, depending on population or entity type. Its technical standard is WCAG 2.1 AA. | State and local governments. These are not deadlines for private WooCommerce stores. |

**Private U.S. stores:** no federal date requires every private store to meet WCAG 2.2 AA. The ADA and other laws may still matter, but how they apply to a particular store is a legal question. Don't use the Title II government dates as your store's deadline. Ask qualified counsel if you need an assessment.

**Selling to EU customers:** the EAA covers certain consumer services, including ecommerce, from June 28, 2025. An EU visitor doesn't give every business the same duties. Microenterprises have provisions of their own, and member states enforce the directive through national law. Check the [directive's scope and exceptions](https://eur-lex.europa.eu/eli/dir/2019/882/oj) before saying your store is covered or exempt. The [EAA checklist](/blog/eu-accessibility-act-ecommerce-checklist-2026/) goes further.

## Run and record a repeatable check

Pick one simple product, one variable product, cart, checkout, account sign-in, and the payment step. Test desktop and narrow layouts with a keyboard. Use a screen reader to check what each control announces and whether status changes make sense. Use automated tools to flag issues they can detect, then inspect the rendered result yourself.

Record the page, viewport, browser, input method, issue, code owner, fix, and retest. Repeat after theme or extension updates that affect the path. A scan of a homepage cannot establish whether the checkout meets WCAG 2.2 AA.

## What our plugin covers

**Disclosure:** AmazingPlugins publishes [AP Accessibility Fixer for WooCommerce](/plugins/woocommerce-accessibility-fixer/). We reviewed the public WordPress.org 1.5.1 release and code on September 28, 2026. It is free, with nine fixers and no Pro tier. It scans configured WooCommerce pages and samples up to three published products per run. Fixers include a product-image alt fallback, a skip link, and selected focus and error styles. The release does not provide dedicated checks or automatic fixes for 2.5.8 target size, 2.5.7 dragging alternatives, 3.3.7 repeated entry, or 3.3.8 authentication. Test those criteria on your actual store.

## Questions store owners ask

### Do I need all nine additions for WCAG 2.2 AA?

No. Three of the nine are Level AAA: 2.4.12, 2.4.13, and 3.3.9. The other six are Level A or AA. A WCAG 2.2 AA target also includes the applicable earlier Level A and AA criteria, apart from obsolete 4.1.1.

### Is there a U.S. WCAG 2.2 deadline for my private store?

No single federal WCAG 2.2 date covers all private ecommerce stores. The DOJ Title II dates apply to state and local governments. Get legal advice for your business if you need to know its obligations.

### Does the European Accessibility Act apply to every WooCommerce store?

No. It covers specified products and services and has exceptions. If you offer ecommerce services to EU consumers, check the relevant national law and the directive's scope.

### Can a plugin meet the requirement for me?

A plugin can fix specific barriers. It can't judge every piece of content, custom checkout, payment flow, or sign-in. Test the whole purchase path and write down what remains.

## Related reading

- [WooCommerce WCAG 2.2 AA checklist](/blog/wcag-22-compliance-woocommerce-checklist/)
- [WooCommerce accessibility plugin selection guide](/blog/ada-compliance-woocommerce-plugin-full-guide/)
