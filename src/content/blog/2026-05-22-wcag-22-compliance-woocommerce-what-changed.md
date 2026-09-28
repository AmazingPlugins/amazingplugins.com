---
title: 'WCAG 2.2 Compliance for WooCommerce: What Changed'
description: >-
  The nine WCAG 2.2 additions, their levels, and how to check focus, touch
  targets, checkout, and account sign-in on a WooCommerce store.
pubDate: 2026-05-22T13:02:00.824Z
updatedDate: 2026-09-28T00:00:00.000Z
author: Harun Ray
tags:
  - WCAG 2.2
  - WooCommerce
  - Accessibility
  - ADA Compliance
  - What Changed
seoKeywords:
  - '`WCAG 2.2 compliance woocommerce`'
seoCategory: woocommerce
articleAngle: what-changed
gscSubmitted: true
---

WCAG 2.2 adds nine success criteria to WCAG 2.1 and removes 4.1.1 Parsing. For a WooCommerce store, the useful question is where those changes show up in a real shopping session: sticky headers hiding focus, controls that only work by dragging, small tap targets, repeated checkout fields, and account sign-in that blocks password managers.

This technical guide was reviewed on September 28, 2026 against the [W3C standard](https://www.w3.org/TR/WCAG22/) and its [guide to the additions](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/). WCAG publication is not itself a legal deadline. See the separate [deadline and scope guide](/blog/wcag-22-compliance-woocommerce-deadline/) for that question.

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

That is nine new criteria, but only the Level A and AA entries are needed for a WCAG 2.2 AA target. The AAA entries are still useful design prompts; they are not extra AA requirements.

## Check the cases that are easy to misread

**A missing help link on checkout is not automatically a 3.2.6 failure.** The [W3C explanation](https://www.w3.org/WAI/WCAG22/Understanding/consistent-help.html) says the rule governs the order of help mechanisms on pages where they appear. It does not force a store to add the same help mechanism to every page.

**Separate billing and shipping addresses are not automatically redundant entry.** Buyers may need different addresses. If your flow asks them to enter the *same* information again, make the earlier entry available, for example with a “same as billing” option. W3C's [3.3.7 guidance](https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html) also lists essential, security, and invalid-information exceptions. The process can extend to a third-party payment page.

**Passwords are allowed.** Under [3.3.8](https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html), an account login can use a password if people can use assistance such as a password manager or copy and paste. An object-recognition challenge is an AA exception, although it can still exclude users. Do not recommend an invisible CAPTCHA brand as proof of conformance. Test the actual login, including any fallback challenge and verification code.

**Small targets have exceptions.** A quantity control under 24 by 24 CSS pixels is a test candidate, not an automatic failure. The [2.5.8 criterion](https://www.w3.org/TR/WCAG22/#target-size-minimum) includes spacing and other exceptions. Measure the rendered target and nearby targets at the viewport you are testing.

**Parsing was removed, not good markup.** W3C marks [4.1.1 Parsing as obsolete](https://www.w3.org/WAI/WCAG22/Understanding/parsing). A duplicate ID or malformed component can still create an accessibility problem under another criterion, including 1.3.1 or 4.1.2. Keep testing the accessible name, role, value, and relationships that users actually receive.

## A practical WooCommerce test pass

You cannot infer the result from a theme name or a default WooCommerce install. Test the version and extensions you run.

1. **Product page:** Tab into the image gallery and variation controls. If a gallery requires dragging, look for a usable click or tap alternative. Measure small gallery and quantity controls with the spacing rule in mind.
2. **Cart and checkout:** Follow keyboard focus while sticky headers, notices, and cart drawers are present. If checkout has several steps, check whether previously entered information can be reused when it is requested again.
3. **Account sign-in:** Try a password manager and pasting into password and code fields. Trigger the challenge or recovery flow if one exists.
4. **Help across the flow:** Where phone, contact, chat, or self-help mechanisms recur, compare their relative order on pages in the same set.
5. **Repeat after changes:** Recheck the affected path after a theme, checkout, payment, or login-plugin update. Record the viewport, browser, input method, and result.

Automated checks can flag some candidates. A keyboard pass and an assistive-technology pass are needed to see whether the task is usable. A passing scan on the product page says little about a payment dialog later in checkout.

## Where AP Accessibility Fixer helps

**Disclosure:** AmazingPlugins publishes [AP Accessibility Fixer for WooCommerce](/plugins/woocommerce-accessibility-fixer/). We reviewed the public WordPress.org 1.5.1 release and code on September 28, 2026. It has nine free fixers and no Pro tier.

The release adds selected focus styles, a skip link, product-image alt fallback, and other limited changes. Its scanner samples up to three published product pages in addition to configured WooCommerce pages. It does **not** implement a dedicated audit of the nine WCAG 2.2 additions. A visible outline style alone cannot prove 2.4.11 when a sticky element covers the focused control. The plugin also cannot establish that a dragging alternative, target spacing, help order, redundant-entry behavior, or authentication flow passes. Check these yourself on the rendered store.

## Questions store owners ask

### Do I need all nine additions for WCAG 2.2 AA?

No. Three of the nine are Level AAA: 2.4.12, 2.4.13, and 3.3.9. The other six are Level A or AA. A WCAG 2.2 AA target also includes the applicable earlier Level A and AA criteria, apart from obsolete 4.1.1.

### Does every gallery need a drag alternative?

If dragging is required for a function, [2.5.7](https://www.w3.org/TR/WCAG22/#dragging-movements) generally calls for a single-pointer method without dragging, subject to the criterion's exception. Test the actual gallery controls; a swipe gesture may already have usable arrows or thumbnails.

### How long will this take to fix?

There is no reliable universal estimate. A standard store with accessible components may need little work. A custom checkout, account flow, or product configurator can take longer. Audit the actual barriers first, then estimate each fix and retest.

## Related reading

- [WCAG 2.2 deadline and legal scope for WooCommerce](/blog/wcag-22-compliance-woocommerce-deadline/)
- [Choosing an ADA accessibility plugin for WooCommerce](/blog/ada-compliance-plugin-full-guide/)
