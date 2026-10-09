---
title: "WooCommerce Blocks vs Classic Checkout: Accessibility"
description: "Compare WooCommerce Blocks and Classic checkout by testing your payment gateway, keyboard flow, labels, errors, and screen reader announcements."
pubDate: 2026-07-29T00:00:00.000Z
updatedDate: 2026-09-28T00:00:00.000Z
author: Harun Ray
tags:
  - WooCommerce
  - Accessibility
  - Checkout
  - Blocks
  - Classic
seoKeywords:
  - "woocommerce blocks checkout accessibility"
  - "woocommerce classic checkout vs blocks"
  - "woocommerce checkout keyboard navigation"
gscSubmitted: true
---

WooCommerce offers two checkout implementations: the newer Checkout block and the Classic shortcode. Neither choice guarantees an accessible store. Your theme, payment gateway, checkout extensions, and custom fields can change the result. The useful comparison is the one you run on your own checkout, with your actual payment methods enabled.

**Review method, September 28, 2026:** This guide uses current [WooCommerce checkout documentation](https://woocommerce.com/document/woocommerce-store-editing/customizing-cart-and-checkout/) and its [accessibility guidance](https://woocommerce.com/document/accessibility-features-in-woocommerce/). We did not run a controlled Blocks-versus-Classic screen reader test for this article. Earlier figures on keystrokes, audit failures, and checkout times had no reproducible test record and have been removed.

## Know which checkout you have

Open your Checkout page in WordPress. A Checkout block means you use the block experience; `[woocommerce_checkout]` means Classic. WooCommerce says the Cart and Checkout blocks became the default for **new stores** in version 8.3, released in November 2023. Existing stores can still use Classic. Its editor also provides a way to [transform the Cart and Checkout blocks back to Classic](https://woocommerce.com/document/woocommerce-store-editing/customizing-cart-and-checkout/).

## The checks that decide the choice

| Check | Why it matters | What to try |
| --- | --- | --- |
| Payment gateway compatibility | A gateway that has not integrated with Checkout blocks may not appear there. | In a test order, confirm every offered method appears and can complete payment. Check the gateway's declared block support. |
| Keyboard sequence | A custom field, coupon panel, or modal can disrupt focus in either checkout. | Complete a test purchase with Tab, Shift+Tab, Enter, and Space. Check the focus indicator at each step. |
| Field names and errors | Labels and validation must be understandable without visual context. | Leave required fields empty; check that errors identify the field and are announced by a screen reader. |
| Dynamic totals | Shipping and order totals can change after input. | Change a shipping option and check whether the new total is perceivable. |
| Mobile zoom and reflow | Checkout controls need to remain usable at high zoom and narrow widths. | Test at 200% and 400% zoom and on a narrow screen. |

WooCommerce documents [accessibility features in both its core controls and blocks](https://woocommerce.com/document/accessibility-features-in-woocommerce/), while also warning that themes and extensions can break them. Its checkout documentation specifically warns that an incompatible gateway may leave the block checkout with no available payment methods. That compatibility check is a concrete reason to choose Classic for a particular store until the gateway supports blocks; it is not evidence that Classic is universally more accessible.

## A practical test sequence

1. Make a staging copy of the store with the same theme, gateways, and checkout extensions.
2. Test the currently installed checkout with a keyboard and one screen reader. Record the browser, screen reader, WooCommerce version, gateway, and any failure.
3. Switch the staging copy to the other checkout. WooCommerce recommends keeping Cart and Checkout on the same implementation when reverting to Classic.
4. Repeat the same purchase, including validation errors, coupons, shipping changes, and payment.
5. Keep the implementation that lets customers finish the transaction, then fix the specific barriers you found. Retest after theme or gateway updates.

An automated scan can catch some markup errors, but it cannot establish that a buyer can finish payment. For screen reader setup, use our [WooCommerce screen reader testing guide](/blog/screen-reader-testing-woocommerce-guide/). For common checkout failures, see [WooCommerce checkout accessibility issues](/blog/woocommerce-checkout-accessibility-issues/).

AmazingPlugins publishes this article and the free [AP Accessibility Fixer for WooCommerce](/plugins/woocommerce-accessibility-fixer/). The plugin provides nine targeted fixes in its current 1.5.1 release; it has not been shown here to repair every Classic or block checkout, payment gateway, or theme. Check its released features against the barriers your test actually finds.
