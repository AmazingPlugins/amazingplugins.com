---
title: 'Is There a WCAG 2.2 Deadline for WooCommerce Stores?'
description: >-
  There is no single WCAG 2.2 deadline for every WooCommerce store. Check which
  EU and US rules may apply, then audit the barriers in your own checkout.
pubDate: 2026-05-22T13:05:07.505Z
updatedDate: 2026-09-28T00:00:00.000Z
author: Harun Ray
tags:
  - WCAG 2.2
  - WooCommerce
  - Accessibility
  - ADA Compliance
  - EAA
seoKeywords:
  - wcag 2.2 compliance woocommerce
seoCategory: woocommerce
articleAngle: deadline
gscSubmitted: true
---

There is no single WCAG 2.2 deadline that applies to every WooCommerce store. WCAG is a technical standard. Whether a legal requirement applies to your business depends on where you offer services, the type and size of your business, and the law in that jurisdiction. A date on a government guidance page may have nothing to do with your private store.

This page separates the dates people often mix together. It was reviewed on September 28, 2026 against the sources linked below. It is a planning guide, not a legal determination for your business.

## The dates, with their scope

| Date | What it means | Who should check it |
| --- | --- | --- |
| October 5, 2023 | [W3C published WCAG 2.2](https://www.w3.org/TR/WCAG22/) as a Recommendation. Publication did not itself create a universal legal deadline. | Anyone setting a technical accessibility target. |
| June 28, 2025 | EU member states began applying measures under the [European Accessibility Act](https://eur-lex.europa.eu/eli/dir/2019/882/oj), which includes certain ecommerce services. The directive includes exceptions and transitional provisions. | Businesses offering covered services to EU consumers. Check the law of the relevant member state and any applicable exception. |
| April 26, 2027 and April 26, 2028 | The U.S. Department of Justice's [Title II web rule](https://www.ada.gov/resources/web-rule-first-steps/) has these updated dates for state and local government entities, depending on population or entity type. Its technical standard is WCAG 2.1 AA. | State and local governments. These are not deadlines for ordinary private WooCommerce stores. |

### What about a private U.S. store?

There is no single federal date requiring every private WooCommerce store to meet WCAG 2.2 AA. The ADA and other laws may still matter to an online business, but their application to a particular store is a legal question. Do not use the Title II government dates as your store's deadline. Ask qualified counsel if you need an assessment of your obligations.

### What about selling to EU customers?

The EAA covers certain consumer services, including ecommerce services, from June 28, 2025. That does not mean every business with an EU visitor has identical duties. The directive has provisions for microenterprises and transitional arrangements, and member states enforce it through their own laws. Check the [directive's scope and exceptions](https://eur-lex.europa.eu/eli/dir/2019/882/oj) before stating that your store is covered or exempt.

## WCAG 2.1 and 2.2 on a WooCommerce store

WCAG 2.2 builds on 2.1. Its added criteria include focus that is not obscured by other content, alternatives to dragging, minimum target size, and accessible authentication. Read the [W3C WCAG 2.2 criteria](https://www.w3.org/TR/WCAG22/) before treating a theme setting or plugin toggle as proof of conformance.

On your own store, test a product page, a variable product, the cart, account sign-in, and checkout. Try each with a keyboard and a screen reader. In particular:

1. Follow the focus indicator through navigation, cart drawers, and checkout. Check whether sticky elements hide it.
2. Confirm that controls requiring a drag gesture have a usable alternative.
3. Measure small targets against the applicable WCAG criterion, including its exceptions.
4. Check product-image alt text for meaning. A product title copied into the alt field is only a starting point.
5. Verify that form fields have useful names and errors are associated with the right controls.
6. Re-test after theme, payment, or checkout plugin updates.

A scanner can help find candidates, but a passing scan does not confirm that the purchase flow works. Record the issue, the page and device where it occurs, who owns the fix, and the result of a repeat test. That gives you a practical work list regardless of which legal timeline applies.

## Where our plugin fits

We publish [AP Accessibility Fixer for WooCommerce](/plugins/woocommerce-accessibility-fixer/). Its public 1.5.1 release has nine free fixers, including a fallback for empty product-image alt text, focus styles on selected WooCommerce controls, and a skip link. It does not measure every text contrast ratio, repair every checkout field, or make a store fully conformant. Review each result on your theme and fix the remaining barriers manually.

For a fuller technical checklist, see [WCAG 2.2 compliance for WooCommerce](/blog/wcag-22-compliance-woocommerce-checklist/) and [what changed from WCAG 2.1](/blog/wcag-22-compliance-woocommerce-what-changed/).

## Questions store owners ask

### Is there a U.S. WCAG 2.2 deadline for my private store?

There is no single federal WCAG 2.2 date for all private ecommerce stores. The DOJ Title II dates above apply to state and local governments. Get legal advice for your specific business if you need to determine its obligations.

### Does the European Accessibility Act apply to every WooCommerce store?

No. It covers specified products and services and has exceptions. If you offer ecommerce services to EU consumers, check the relevant national law and the directive's scope rather than assuming that any EU visitor triggers the same rule.

### Can a plugin meet the requirement for me?

A plugin can address specific barriers. It cannot judge every piece of content, custom checkout, payment flow, or user experience. Test the whole purchase path and document what remains to be fixed.
