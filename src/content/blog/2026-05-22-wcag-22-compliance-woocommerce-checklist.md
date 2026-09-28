---
title: "WooCommerce WCAG 2.2 AA Checklist: Six New Criteria to Test"
description: "A practical WCAG 2.2 AA checklist for WooCommerce: test focus, dragging, target size, help, repeated input, and authentication on your actual store."
pubDate: 2026-05-22T13:03:41.048Z
updatedDate: 2026-09-28T00:00:00.000Z
author: Harun Ray
tags:
  - WooCommerce
  - Accessibility
  - WCAG 2.2
  - Compliance
  - Checklist
seoKeywords:
  - "WCAG 2.2 compliance woocommerce"
seoCategory: woocommerce
articleAngle: checklist
gscSubmitted: true
---

WCAG 2.2 adds six success criteria at Level A or AA to the WCAG 2.1 set and removes 4.1.1 Parsing. For a WooCommerce store, the new checks touch sticky headers, product controls, account login, help links, and repeated checkout fields. Passing them alone does not establish WCAG 2.2 AA conformance; the earlier applicable criteria still matter.

**Review method, September 28, 2026:** This checklist is based on the [W3C WCAG 2.2 Recommendation](https://www.w3.org/TR/WCAG22/) and its linked understanding documents. It was not a test of a specific WooCommerce installation. AmazingPlugins publishes the plugin mentioned below. Test your actual theme, extensions, payment gateway, and product content before claiming conformance.

## The six new A and AA checks

| Criterion | Level | WooCommerce test |
| --- | --- | --- |
| [2.4.11 Focus Not Obscured (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html) | AA | Tab past the header, cookie notice, sticky Add to Cart bar, and chat widget. The focused control must not be entirely hidden by author-created content. |
| [2.5.7 Dragging Movements](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html) | AA | Try a gallery slider, price filter, or sortable list without dragging. Provide a single-pointer alternative where the criterion applies. |
| [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) | AA | Measure variation swatches, quantity buttons, pagination, and cart controls. The target must be at least 24 by 24 CSS pixels or meet an applicable spacing or other exception. |
| [3.2.6 Consistent Help](https://www.w3.org/WAI/WCAG22/Understanding/consistent-help.html) | A | If contact, support, or self-help appears across pages, keep those mechanisms in the same relative order. Check product, cart, checkout, and account pages. |
| [3.3.7 Redundant Entry](https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html) | A | During one purchase, check whether previously entered information must be typed again when it could be auto-populated or selected, subject to the criterion's exceptions. |
| [3.3.8 Accessible Authentication (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html) | AA | Test account login, password reset, and checkout login with password-manager paste or autofill. Check any CAPTCHA or other cognitive test against the permitted alternatives. |

The 24-pixel rule has exceptions; it is not a universal instruction to make every control exactly 24 pixels. Likewise, passing these six checks does not mean your store meets all WCAG 2.2 AA requirements.

## Keep testing the earlier criteria

On a product page, cart, checkout, and account page, check these common barriers against the [full standard](https://www.w3.org/TR/WCAG22/):

- **Images and names:** Product images need appropriate text alternatives. Variation controls need names, roles, and states that reflect the selected option.
- **Keyboard and focus:** Complete the purchase without a mouse. Focus must be visible, move in a meaningful order, and remain usable in dialogs.
- **Contrast and reflow:** Measure text and control contrast. Zoom and narrow the viewport without losing information or controls.
- **Forms and errors:** Labels must identify fields; validation messages need to tell users which field needs attention and how to correct it.
- **Updates:** Check whether cart totals, shipping changes, and Add to Cart feedback are announced where needed.

A scanner can help find some markup issues. It cannot decide whether an image description is meaningful or whether a buyer can complete payment. Use the [screen reader testing guide](/blog/screen-reader-testing-woocommerce-guide/) and the [Blocks versus Classic checkout checklist](/blog/woocommerce-blocks-vs-classic-checkout/) to test the full flow.

## What the AP plugin changes

The free [AP Accessibility Fixer for WooCommerce](/plugins/woocommerce-accessibility-fixer/) has nine targeted fixers in its public 1.5.1 release. They include a fallback for empty product-image alt text, selected focus styles, and a skip link. The package does not provide a catalog-wide WCAG 2.2 audit, text contrast measurement, a Pro tier, or a PDF conformance report. Its form-label filter does not establish coverage of every checkout template. Verify each enabled fix on your store.

For the regulatory distinction between a technical standard and a legal obligation, see [what WCAG 2.2 means for WordPress and WooCommerce](/blog/wcag-2-2-wordpress-woocommerce-requirements/) and the [European Accessibility Act checklist](/blog/eu-accessibility-act-ecommerce-checklist-2026/). Whether a particular law applies depends on the business and jurisdiction; this checklist cannot decide that.
