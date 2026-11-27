---
title: "Does the ADA Apply to Your WooCommerce Store?"
description: >-
  Does the ADA apply to your WooCommerce store? Learn when ADA Title III,
  EN301549, and the EU Accessibility Act apply to you.
pubDate: 2026-04-20T00:00:00.000Z
updatedDate: 2026-11-27T00:00:00.000Z
author: Harun Ray
tags:
  - ADA
  - EU Accessibility Act
  - Legal
  - WooCommerce
seoKeywords:
  - ADA apply WooCommerce
  - ADA compliance WooCommerce
  - ADA Title III ecommerce
seoCategory: legal
gscSubmitted: true
---

If you sell to people in the United States or the EU, treat the answer as yes and plan around WCAG. The ADA and the European Accessibility Act do not care that you built the store in WooCommerce. They care whether a customer with a disability can use it.

This is not legal advice. It is the practical version store owners actually need: when you are in scope, what "compliance" means in court and in the EU, and what to check this week.

## When the ADA covers a WooCommerce store

ADA Title III covers places of public accommodation. There is still no single federal WCAG rule for private ecommerce sites. US courts keep treating websites that sell to the public as in scope anyway, and they keep using WCAG 2.1 AA as the yardstick.

Size is not a get-out. A one-product store that takes US orders can still be named. Location is not a get-out either. If US customers can buy from you, plaintiffs treat you as fair game even when the business sits outside the US.

The volume is the reason people pay attention. Digital accessibility filings jumped again in 2025. Ecommerce shows up a lot because checkout and account forms collect money and personal data. For the current numbers, see [ADA lawsuits and WooCommerce in 2026](/blog/how-to-avoid-ada-lawsuits-woocommerce-store/).

## When the European Accessibility Act covers you

The EAA became enforceable on 28 June 2025. Unlike the ADA, it names ecommerce and points at a written standard: EN 301 549, which maps to WCAG 2.1 Level AA.

You are in the conversation if you sell products or services to people in the EU, including remote sales from outside the EU. Penalties are national, not one EU-wide fine. They can include money, injunctions, and being told to stop selling in that market.

The EU has a microenterprise carve-out (under 10 employees and under €2M turnover). Do not treat that as "so I can ignore checkout." You can still lose sales, fail an audit from a bigger buyer, and rank worse. If you sell into the EU and you are not sure you qualify, assume you need WCAG 2.1 AA on the money path.

## What compliance looks like on a real store

An overlay widget and a posted accessibility statement are not the work. The work is making product pages, cart, and checkout usable.

### WCAG 2.1 AA is the target people actually use

Courts in the US keep pointing at WCAG 2.1 AA. The EAA writes it down via EN 301 549. That is 50 success criteria. In a Woo store the ones that fail first are boring:

- Missing alt text on product images (1.1.1)
- Low contrast on price, notices, or buttons (1.4.3)
- Checkout fields with placeholders and no labels (1.3.1, 3.3.2, 4.1.2)
- No visible focus ring after a theme sets `outline: none` (2.4.7)
- Keyboard traps in mini-carts, drawers, and variation swatches (2.1.1, 2.1.2)
- No skip link, so Tab walks the whole header on every product (2.4.1)

### Code fixes beat JavaScript patches

accessiBe, UserWay, and similar tools sit on top of the page. They do not rewrite your Woo templates. A scanner can still fail the same product image after you install the widget. That is why overlays keep showing up in complaints as a shortcut, not as a fix. Longer version: [why overlays don't protect you from ADA lawsuits](/blog/why-accessibility-overlays-dont-protect-you-from-ada-lawsuits/).

A WooCommerce plugin that hooks templates can put alt text, labels, focus styles, and a skip link into the HTML that VoiceOver and NVDA actually read.

## Which US states add rules on top

Federal law is only part of the picture. A few state laws matter for ecommerce:

- **California:** the Unruh Civil Rights Act lets a plaintiff claim damages per offense, which makes it a favorite venue for website claims. California also has its own accessibility standard referenced in state contracting.
- **New York:** the state and city human rights laws cover places of public accommodation, and NYC has been an active venue for web claims.
- **Other states** mostly follow federal case law, but several have procurement rules that apply if you sell to government buyers.

Practically: if you ship to California, you are in the most active jurisdiction regardless of where your company is registered. That is why "we are a small EU shop" is not a defense in a US demand letter.

## What a demand letter usually asks for

Most letters are short and predictable. They name a handful of specific failures, cite WCAG criteria, and ask for:

1. A fix within a stated deadline, often 30 to 90 days.
2. A written accessibility statement or policy.
3. Sometimes a third-party audit and a period of monitoring.

The amount of money involved is usually legal fees plus damages where state law allows them. The technical work is rarely the expensive part. Responding late, or publishing a statement while the checkout still traps keyboard focus, is what turns a letter into a filing.

If you get one, the useful response is a dated remediation plan with the specific issues addressed and evidence that the flow works after the change. A widget installed the same week reads as a shortcut.

## What evidence is worth keeping

You do not need a binder. You need proof that you tested and fixed things on a schedule.

- **A dated issue log** listing the page, the failure, the criterion, who fixed it, and when it was retested.
- **Screenshots or recordings** of the failing state and the corrected state. A 20-second recording of a keyboard trap is worth more than a paragraph.
- **A short scope statement** for each test round: which pages, which states, which assistive technology, which browser.
- **Your accessibility statement**, kept honest. It should say what you have done and what is still open.

That record is what makes a remediation plan credible, and it is cheap to maintain once the first pass exists.

## The EAA in practice after June 2025

The European Accessibility Act became enforceable on 28 June 2025. Two things surprised store owners:

- **It reaches sellers outside the EU.** If you sell to EU consumers, the obligation follows the sale, not your registered address.
- **Smaller businesses are not fully off the hook.** The microenterprise carve-out covers services under 10 employees and under 2 million euro turnover. Even then, a large B2B customer can put accessibility in a contract, and inaccessible checkout still costs you sales.

Enforcement is national. Some member states have designated market surveillance authorities and set penalties; others are slower. Slow enforcement is not a reason to wait, because the same fixes are the ones that help conversion.

The UK sits outside the EAA but has its own Equality Act 2010, with a similar practical outcome: services should be accessible, and reasonable adjustments are expected.

## Questions store owners ask

### Does the ADA apply if I have no physical store?

Courts have generally treated commercial websites as covered. No physical location does not mean no exposure, especially for a store that takes US payments.

### Is an accessibility statement enough?

No. A statement describes what you have done. It does not fix a checkout that traps keyboard focus, and a statement claiming conformance you have not tested can make things worse.

### How often should we re-test?

Quarterly is a reasonable default for a small store, plus a retest after any theme, checkout, or payment update. A plugin update that changes markup can undo a fix quietly.

### Does the EAA cover B2B sales?

It covers services offered to consumers, and many B2B buyers now require accessibility in procurement. Treat a request from a large customer as a signal, not an exception.

## A one-hour self-check

You do not need a $5k audit to see if you have a problem.

1. Run WAVE or axe on the homepage, one variable product, cart, and checkout. Write down errors, not "needs review" noise.
2. Unplug the mouse. Tab the same four pages. Can you add to cart and reach every field? Is focus visible the whole time?
3. Turn on VoiceOver (Mac) or NVDA (Windows) and try to buy that product.
4. Spot-check contrast. Body text needs 4.5:1. Large text and UI components need 3:1.

If any of those fail, you have work. Most of it is the same five Woo problems, not a unique snowflake theme.

Step-by-step fixes live in [how to make your WooCommerce store ADA compliant](/blog/how-to-avoid-ada-lawsuits-woocommerce-store/). For the difference between AA and AAA, see [WCAG 2.1 AA vs AAA](/blog/wcag-2-1-aa-vs-aaa-what-s-the-real-difference-for-e-commerce/).

[WooCommerce Accessibility Fixer](/plugins/woocommerce-accessibility-fixer/) automates the repeatable ones: product alt text, labels, focus, skip links. It is free. It is not a certificate and it will not write your product copy.

## What to do this week

If you sell to the US or the EU, assume ADA Title III and the EAA apply to the storefront, then prove the money path on a keyboard. Fix the failures you can reproduce. Put a quarterly re-scan on the calendar. That is the job. An overlay is not.

---

## Related Reading

- [WCAG 2.1 AA vs AAA: What's the Real Difference for E-commerce?](/blog/wcag-2-1-aa-vs-aaa-what-s-the-real-difference-for-e-commerce/)
- [How to Avoid an ADA Lawsuit With Your WooCommerce Store](/blog/how-to-avoid-ada-lawsuits-woocommerce-store/)
- [WooCommerce Accessibility Fixer](/plugins/woocommerce-accessibility-fixer/)
- [WooCommerce vs Shopify accessibility](/blog/woocommerce-vs-shopify-accessibility/)
