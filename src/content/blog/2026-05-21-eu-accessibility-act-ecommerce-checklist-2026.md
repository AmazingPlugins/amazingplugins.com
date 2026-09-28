---
title: EU Accessibility Act ecommerce checklist 2026
description: >-
  A working EAA checklist for ecommerce teams: confirm scope, test the buying
  path, document barriers, and check national requirements.
pubDate: 2026-05-21T10:25:00.000Z
updatedDate: 2026-09-28T00:00:00.000Z
author: Harun Ray
tags:
  - EAA
  - EU
  - Accessibility
  - Checklist
  - Compliance
seoKeywords:
  - EU Accessibility Act ecommerce checklist 2026
  - EAA ecommerce checklist
  - European Accessibility Act checklist
seoCategory: compliance
gscSubmitted: true
---

This checklist is for teams assessing an ecommerce service under the European Accessibility Act (EAA). It is a work list, not a declaration that every WooCommerce store is covered. Reviewed September 28, 2026 against [Directive (EU) 2019/882](https://eur-lex.europa.eu/eli/dir/2019/882/oj). Check the law in the member states where you offer the service before making a legal compliance claim.

If your checkout runs on WooCommerce, the [European Accessibility Act and WooCommerce guide](/blog/european-accessibility-act-woocommerce/) walks through the store-specific purchase path before you use this checklist.

## 1. Record the scope decision

- [ ] Identify the service offered to consumers in the EU, the legal entity providing it, and the member states involved.
- [ ] Check whether it is an ecommerce service within the [directive's scope](https://eur-lex.europa.eu/eli/dir/2019/882/oj). The directive applies to covered services provided to consumers after June 28, 2025; that date is not a universal WCAG 2.2 deadline.
- [ ] Check whether the microenterprise service exemption or another provision applies. Record the facts used for the decision. Do not infer an exemption from store size alone without checking the directive's definition and local law.
- [ ] Assign an owner to confirm applicable national rules and any questions about transition, enforcement, or disproportionate burden. Do not put “we installed a plugin” in this field.

## 2. Map the complete buying path

List the pages and providers a buyer encounters: search or category, product, options, cart, checkout, payment, confirmation, account, returns, and support. Include mobile views, cookie consent, chat, and third-party widgets. Mark who can change each component.

For each key task, check:

- [ ] It works with a keyboard. Focus remains visible and reaches every control in a sensible order.
- [ ] Controls have useful names, roles, instructions, and error messages for screen-reader users.
- [ ] Product images and other non-text content have appropriate alternatives. Decorative images do not need descriptive prose.
- [ ] Text and controls remain usable at the relevant viewport sizes and zoom levels.
- [ ] Product variations, filters, cart drawers, and payment controls work without a mouse-only gesture.
- [ ] Captions, documents, and support information needed for the service are accessible.

Use [WCAG 2.2](https://www.w3.org/TR/WCAG22/) as a technical testing reference where relevant. It does not replace the directive's own requirements or national implementing law.

## 3. Keep evidence tied to actual tests

- [ ] Record the URL, date, browser, viewport, keyboard or assistive technology used, steps to reproduce, and observed barrier.
- [ ] Record the fix owner, change, retest date, and remaining issue. Keep examples of successful and failed checkout states.
- [ ] Keep scan exports with their coverage limits. A scan of three product pages is not a scan of the whole catalog.
- [ ] Review the directive's service-information duties, including [Annex V](https://eur-lex.europa.eu/eli/dir/2019/882/oj), and prepare the information required by the law that applies to your service. An accessibility statement alone is not a substitute for accessible operation.
- [ ] Recheck after changing the theme, catalog templates, checkout, payment provider, or support widget.

There is no useful fixed “three-week compliance plan” for every store. Work first on a task the buyer cannot finish, then on issues that recur across the store. Assign a date and owner to each remaining item.

## Where a plugin can help

**Disclosure:** AmazingPlugins publishes [AP Accessibility Fixer for WooCommerce](/plugins/woocommerce-accessibility-fixer/). We reviewed its public WordPress.org 1.5.1 release on September 28, 2026. It is free and has nine fixers. The scanner covers configured WooCommerce pages plus up to three randomly selected published products per run. The release includes a product-image alt fallback, a skip link, and selected form and focus changes. It does not audit every EAA requirement, every product, or your complete payment and support flow. Its report download is HTML. Check each result on your actual store.

## Common scope questions

### Does a store based outside the EU automatically fall under the EAA?

No automatic answer follows from where the business is incorporated or from a single EU visitor. The directive defines service providers making offers to EU consumers and specifies the covered services. Assess the actual offer, any exception, and the relevant national law.

### Is WCAG 2.2 AA mandatory for every covered store?

The directive sets accessibility requirements for covered services; it does not make a blanket “WCAG 2.2 AA by 2026” statement for every store. W3C recommends 2.2 as a current technical target. Match the applicable legal requirement and document which technical criteria you tested.

### What is the first useful test?

Try to buy a product with a keyboard, then repeat with a screen reader. Include the payment step. Record the first barrier that prevents completion and who owns it.

## Related reading

- [Choosing a WooCommerce EAA accessibility plugin](/blog/woocommerce-eaa-compliance-plugin-guide-2026/)
- [WCAG 2.2 changes for WooCommerce](/blog/wcag-22-compliance-woocommerce-what-changed/)
