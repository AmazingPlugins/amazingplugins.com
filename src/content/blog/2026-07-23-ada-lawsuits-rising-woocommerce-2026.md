---
title: "ADA Website Claims and WooCommerce: How to Check Your Store"
description: "A practical response to ADA website-accessibility concerns for WooCommerce stores: test the purchase flow, document barriers, and fix what users cannot operate."
pubDate: 2026-07-23T00:00:00.000Z
updatedDate: 2026-09-28T00:00:00.000Z
author: Harun Ray
tags:
  - WooCommerce
  - ADA
  - Accessibility
  - Lawsuits
  - WCAG
  - E-commerce Compliance
gscSubmitted: true
---

A WooCommerce store can look fine while a keyboard user gets stuck at checkout. If a customer reports that kind of barrier, record the exact page, control, device, and action they tried. Test the same task before deciding what to fix.

**Review method, September 28, 2026:** This article uses the [US Department of Justice's web accessibility guidance](https://www.ada.gov/resources/web-guidance/) and the [W3C WCAG 2.2 standard](https://www.w3.org/TR/WCAG22/). We have not independently verified the lawsuit count, settlement ranges, or store-owner anecdote previously published here, so they have been removed. This is a technical checklist, not a prediction of legal liability or settlement cost.

## What the law and standard tell you

The DOJ says the ADA can apply to web content used by businesses open to the public and that inaccessible sites can prevent people from using their services. Federal courts have addressed website claims in different ways, and the exact obligations of a private online store depend on the facts and jurisdiction. The DOJ's specific WCAG 2.1 AA web rule and compliance dates apply to **state and local governments**, not automatically to every private WooCommerce store.

WCAG is a useful technical framework for testing barriers. It does not, on its own, decide whether a particular store has met every legal duty. If you receive a demand letter, preserve it and get advice from a lawyer who can assess your situation.

## Check the purchase path first

- **Product choice:** Are image alternatives useful? Can a buyer select variations and understand stock or price changes without relying on color?
- **Keyboard access:** Can you navigate menus, product controls, cart, and checkout with Tab, Shift+Tab, Enter, and Space? Is focus visible?
- **Forms and errors:** Do fields have names and visible labels? When a field fails, does the error identify it and explain the correction?
- **Popups:** Can you close a dialog by keyboard and return to the control that opened it?
- **Payment:** Can a buyer choose a gateway and complete a test order with a keyboard and screen reader?

Use our [screen reader testing guide](/blog/screen-reader-testing-woocommerce-guide/) and [checkout accessibility guide](/blog/woocommerce-checkout-accessibility-issues/) for the steps. An automated scanner can find some markup issues. It cannot prove that the order can be completed.

## Keep a record you can act on

For each failure, note the URL, date, theme and WooCommerce versions, browser, assistive technology, steps to reproduce, and the person responsible for the fix. Retest the original steps after changing a theme, plugin, or payment gateway. Give customers an accessible way to report a problem and respond to the report.

AmazingPlugins publishes the free [AP Accessibility Fixer for WooCommerce](/plugins/woocommerce-accessibility-fixer/). We reviewed its public 1.5.1 release on September 28, 2026. Its nine targeted fixers include an empty product-image alt fallback, selected focus styling, and a skip link. It does not scan an entire catalog, measure all text contrast, fix every checkout field, or prevent a lawsuit. Test the actual barrier after enabling it.

For scope and response planning, read [how to avoid ADA access barriers in a WooCommerce store](/blog/how-to-avoid-ada-lawsuits-woocommerce-store/) and [whether the ADA applies to a WooCommerce store](/blog/does-the-ada-actually-apply-to-your-woocommerce-store/).
