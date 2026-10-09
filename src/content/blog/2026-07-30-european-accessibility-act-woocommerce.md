---
title: "European Accessibility Act and WooCommerce Checklist"
description: "Understand how the European Accessibility Act can affect a WooCommerce store, then check product pages, checkout, support, and your service information."
pubDate: 2026-07-30T00:00:00.000Z
updatedDate: 2026-09-28T00:00:00.000Z
author: Harun Ray
tags:
  - WooCommerce
  - Accessibility
  - European Accessibility Act
  - EAA
  - ecommerce
gscSubmitted: true
---

The European Accessibility Act (EAA) covers certain products and services, including **e-commerce services**. Its main application date was June 28, 2025, with provisions and transitions that need to be read alongside the relevant country's implementing law. A WooCommerce store selling to EU consumers may need to assess whether its service falls within scope. The answer depends on what the business provides, where it operates, its size, and national implementation.

**Review method, September 28, 2026:** This guide draws on [Directive (EU) 2019/882](https://eur-lex.europa.eu/eli/dir/2019/882/oj) and the [W3C WCAG 2.2 standard](https://www.w3.org/TR/WCAG22/). We did not determine applicability for any particular store or audit a WooCommerce installation for this article. Check the law in each relevant member state before relying on a compliance conclusion.

## Check scope before changing the site

The Directive defines an e-commerce service as one provided at a distance, through websites or mobile services, electronically and at a consumer's individual request, with a view to concluding a consumer contract. It also provides an exemption from service accessibility requirements for **microenterprises providing services**, defined using fewer than ten employees and annual turnover or balance-sheet total not exceeding €2 million. Other provisions, including transitional arrangements, can matter to a particular business.

A useful first record is the legal entity, services offered to EU consumers, countries served, employee count, turnover or balance sheet, and the date of review. Have someone familiar with the applicable national laws check that record. An online checkout alone does not settle every scope question.

## Audit the purchase journey

If your e-commerce service is in scope, test the journey customers actually use:

1. **Finding a product:** Check navigation, search, filters, headings, and product descriptions with a keyboard and screen reader.
2. **Choosing a product:** Give product images appropriate alternatives. Make variations, stock status, and price changes understandable without color or sight alone.
3. **Cart and checkout:** Test focus order, field labels, errors, shipping updates, payment methods, and order confirmation. Repeat with the installed theme and gateway, including on mobile and at high zoom.
4. **Support and information:** Make contact methods and service information accessible. The Directive includes information requirements for in-scope services; review what your national implementation asks you to publish.
5. **After a change:** Re-run the same tasks when the theme, page builder, payment gateway, or checkout extension changes.

Use [WCAG 2.2](https://www.w3.org/TR/WCAG22/) as a practical test framework, but do not assume that passing one WCAG checklist automatically satisfies every EAA or national-law duty. For a more detailed technical starting point, use our [WCAG 2.2 WooCommerce checklist](/blog/wcag-22-compliance-woocommerce-checklist/) and [screen reader testing guide](/blog/screen-reader-testing-woocommerce-guide/).

## What a plugin can help with

AmazingPlugins publishes the free [AP Accessibility Fixer for WooCommerce](/plugins/woocommerce-accessibility-fixer/). We reviewed its public 1.5.1 code on September 28, 2026. It has nine targeted fixers, including a fallback for empty product-image alt text, selected focus styles, and a skip link. Some fixes use inline JavaScript. It does not audit an entire catalog, measure all text contrast, fix every checkout label, or establish EAA compliance. Check each change against the barrier you found on your own store.

An automated scan is a useful way to find some issues. A completed purchase with keyboard and screen reader testing is also needed to learn whether the specific flow works. Keep a dated record of the pages tested, tools used, failures found, and fixes verified.

For an action list focused on the law's service requirements, see the [EU accessibility ecommerce checklist](/blog/eu-accessibility-act-ecommerce-checklist-2026/).

If you are comparing platforms before you commit, read how [WooCommerce and Shopify differ on accessibility](/blog/woocommerce-vs-shopify-accessibility/).
