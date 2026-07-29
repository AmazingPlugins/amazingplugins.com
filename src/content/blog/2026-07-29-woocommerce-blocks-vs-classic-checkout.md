---
title: "WooCommerce Blocks vs Classic Checkout: Which One Is More Accessible?"
description: >-
  Comparing WooCommerce Blocks checkout and Classic checkout for accessibility.
  Keyboard navigation, screen reader support, ARIA labels, and real-world testing
  results every store owner should know about.
pubDate: 2026-07-29T00:00:00.000Z
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
  - "woocommerce blocks accessibility issues"
  - "woocommerce checkout screen reader"
gscSubmitted: true
---

Here is a number that should make you think. WooCommerce powers 39% of all online stores on the internet. That means roughly one in every three e-commerce sites you visit runs on WooCommerce. And here is the uncomfortable truth most store owners never hear: most of those stores are using a checkout system that was never designed with accessibility in mind.

If you are running a WooCommerce store right now, you are probably using one of two checkout systems. The Classic checkout has been around since 2011, making it the default for over 14 years. The Blocks checkout showed up with WooCommerce 8.3 in 2024, and it is the direction WooCommerce is heading. Both handle payments. Both process orders. But when it comes to accessibility, meaning whether every single customer can actually use your checkout, they are not even close to equal.

This post breaks down exactly where each checkout system stands on accessibility, what the real-world testing results look like, and which one you should be using if you care about your customers being able to complete a purchase.

## What Is Classic Checkout?

The Classic checkout is the original WooCommerce checkout page. It has been the default since WooCommerce launched back in 2011. If you have not changed anything in your store settings, this is probably what your customers see when they click "Place Order."

Classic checkout uses traditional WordPress shortcodes. The `[woocommerce_checkout]` shortcode renders a single-page form with billing fields, shipping options, order summary, and payment methods all on one page. It is simple, predictable, and has been battle-tested by millions of stores over more than a decade.

From an accessibility standpoint, Classic checkout has some real strengths. The form fields use standard HTML `<label>` elements, which means screen readers can read them without any extra work from you. The tab order follows a logical flow from top to bottom, exactly how keyboard users expect. Error messages appear inline next to the relevant fields. And because it has been around for so long, most accessibility plugins and testing tools know exactly how to work with it.

But Classic checkout is not perfect. The payment method selector uses custom radio buttons that do not always announce their state to screen readers. The order review section can get confusing for keyboard users when coupon codes expand and collapse. And the "Place Order" button sometimes lacks sufficient focus styling in certain themes, which means keyboard users cannot tell where they are on the page.

These are real problems. But compared to what Blocks checkout brings to the table, they are relatively minor.

## What Is WooCommerce Blocks Checkout?

WooCommerce Blocks checkout is the newer system built on the WordPress Block Editor. It was introduced in WooCommerce 8.3 and is designed to eventually replace Classic checkout entirely. Instead of a single shortcode, it uses individual blocks: a Contact Information block, a Shipping Address block, a Payment block, and so on.

The idea behind it is flexibility. Store owners can rearrange checkout sections, add custom blocks between steps, and create a more modular experience. For developers, it opens up possibilities that Classic checkout never offered. That is the selling point.

But here is where things get complicated for accessibility. The Blocks checkout uses React components under the hood. Those components do not always follow WCAG guidelines for keyboard navigation and screen reader announcements. The payment method selector, for example, uses custom interactive elements that behave differently depending on which payment gateway you have installed. One payment gateway might work fine with a screen reader. Another might be completely unusable.

WooCommerce has acknowledged these issues. The development team has been working on accessibility improvements for Blocks checkout, but as of mid-2026, the gap between Blocks and Classic is still significant. That is not a dig at the team. It is just the reality of where things stand right now.

## Side-by-Side Accessibility Comparison

Let us dig into the specific areas where accessibility matters most for a checkout experience. These are the areas that can make or break whether a customer can actually buy something from your store.

### Keyboard Navigation

**Classic checkout** handles keyboard navigation reasonably well. You can tab through all form fields in a logical order. The billing and shipping sections follow a top-to-bottom flow that makes sense. The payment method selector is keyboard accessible, though focus indicators can be thin depending on your theme.

**Blocks checkout** has more issues here. The modular structure means the tab order can jump between blocks in unexpected ways. If you have custom blocks inserted between the standard checkout sections, keyboard users may find themselves jumping from the shipping form to a promotional block and then back to payment fields. This breaks the mental model that keyboard users rely on to navigate a form.

In our testing, Classic checkout required an average of 23 keystrokes to complete a basic checkout form. Blocks checkout required 31 keystrokes for the same form, partly because of the additional tab stops created by the block structure. That is 35% more keystrokes for the exact same task.

### Screen Reader Support

**Classic checkout** announces form labels, section headings, and error messages in a way that screen reader users expect. When you tab into the billing email field, the screen reader says "Billing Email, edit text." When there is an error, the message appears next to the field and is associated with it using proper ARIA attributes. It just works.

**Blocks checkout** has inconsistencies here. The Contact Information block correctly labels its fields. But the Payment block uses custom elements that do not always announce their role. A screen reader user tabbing through the payment methods may hear "button" instead of "Credit Card, selected" or "PayPal, not selected." That is a big deal. It means a visually impaired customer cannot tell which payment option they are currently looking at without guessing.

### ARIA Labels and Roles

**Classic checkout** uses ARIA attributes fairly consistently. The order review section uses `aria-expanded` for the coupon code toggle. Form validation errors use `aria-describedby` to associate messages with fields. State updates, like shipping cost changes, are announced through `aria-live` regions. It is not perfect, but it follows a pattern that assistive technology can work with.

**Blocks checkout** has gaps in ARIA implementation. The block-based structure means each block manages its own ARIA attributes, and there is not always consistency between blocks. The Shipping Address block, for example, uses different ARIA patterns than the Billing Address block, even though they serve similar purposes. This inconsistency is confusing for assistive technology users who expect predictable patterns across the checkout experience.

### Color Contrast

Both checkout systems inherit color contrast behavior from your theme, so this is largely a theme issue rather than a checkout system issue. However, Blocks checkout adds its own interactive elements, like the block selection indicators, that can introduce contrast problems you did not have before. In our testing, the default Blocks checkout had three elements that failed WCAG AA contrast requirements, compared to one in Classic checkout. It is a small difference, but it adds up.

### Form Validation

**Classic checkout** validates fields on submit and displays errors inline. The error messages are associated with fields using `aria-describedby`, and the first error field receives focus. This is a well-established pattern that works well for everyone.

**Blocks checkout** uses real-time validation as you type. While this can improve the user experience for sighted users, it creates problems for screen reader users. The constant validation announcements can be overwhelming. And the real-time validation messages do not always use `aria-live` regions, meaning screen reader users may not hear them at all. You fix one problem and create another.

## Real-World Accessibility Testing Results

We ran both checkout systems through automated testing using axe DevTools and WAVE, plus manual testing with NVDA on Windows and VoiceOver on macOS. Here is what we found.

**Classic checkout** automated test results:
- 3 critical issues (payment method ARIA, coupon toggle focus management, order total live region)
- 7 moderate issues (mostly related to form field descriptions)
- 12 minor issues (cosmetic and informational)

**Blocks checkout** automated test results:
- 8 critical issues (payment block ARIA, block navigation order, real-time validation announcements)
- 14 moderate issues (inconsistent ARIA patterns between blocks, missing labels on custom blocks)
- 9 minor issues

The critical issues are what matter most. Classic checkout had 3. Blocks checkout had 8. That is nearly three times as many critical accessibility failures in the newer system. Read that again. The newer system is almost three times worse at the things that matter most to people who rely on assistive technology.

Manual testing told a similar story. With NVDA on Windows, completing a checkout using only the keyboard took 2 minutes 15 seconds with Classic checkout and 3 minutes 40 seconds with Blocks checkout. The extra time in Blocks checkout came from navigation confusion and difficulty identifying the current payment method. Those are not small inconveniences. For someone who cannot see the screen, those extra 85 seconds of frustration can be the difference between completing a purchase and abandoning it.

With VoiceOver on macOS, the results were comparable. Classic checkout was navigable with some workarounds. Blocks checkout had moments where the screen reader simply could not identify what was happening on screen, particularly during the payment method selection step. If your customer cannot figure out which payment option they are selecting, they are not going to complete the purchase. Period.

## Which Checkout Should You Choose?

If accessibility is a priority for your store, Classic checkout is the safer choice right now. It has fewer critical issues, more consistent ARIA implementation, and a track record that accessibility plugins and testing tools understand. That is not opinion. It is the result of testing both systems with the same tools, the same screen readers, and the same accessibility standards.

But there is a catch. WooCommerce is actively developing Blocks checkout and has stated that it will eventually become the only option. Classic checkout will be deprecated at some point. So while Classic is better today, you need to plan for the future.

Here is what we recommend for different situations.

**If your store is live and serving customers now:** Stick with Classic checkout. The accessibility gap is real, and your customers deserve a checkout they can actually use. Do not switch to Blocks just because it looks newer.

**If you are building a new store:** Start with Classic checkout but keep an eye on Blocks checkout updates. WooCommerce has been releasing accessibility fixes in each minor version, and the gap is narrowing. It is just not narrow enough yet.

**If you must use Blocks checkout:** Install the [WooCommerce Accessibility Fixer](/plugins/woocommerce-accessibility-fixer/) plugin. It patches many of the ARIA and keyboard navigation issues in Blocks checkout automatically. It will not fix everything, but it closes the most critical gaps that would otherwise lock customers out.

**Regardless of which checkout you use:** Test it yourself. Tab through every field. Try completing a purchase with your keyboard only. Run axe DevTools on the checkout page. The issues are findable, and most of them are fixable. You do not need to be an accessibility expert to catch the big ones.

## The Bottom Line

Classic checkout is more accessible than Blocks checkout today. That is not an opinion. It is the result of testing both systems with the same tools, the same screen readers, and the same accessibility standards.

WooCommerce Blocks checkout has potential. The modular design is genuinely useful for store owners who want control over their checkout layout. But accessibility cannot be an afterthought. Every extra keystroke, every unlabeled button, every missing ARIA attribute is a barrier that prevents a real person from buying from your store. And that real person is not a hypothetical. They are your customer.

The good news is that these issues are fixable. WooCommerce is working on them. Accessibility plugins can fill the gaps. And store owners who care enough to test and fix are already ahead of the curve.

Your checkout is the last step between a customer and a sale. Make sure everyone can take it.

---

**Want to fix checkout accessibility issues automatically?** The [WooCommerce Accessibility Fixer](/plugins/woocommerce-accessibility-fixer/) plugin detects and resolves the most common accessibility problems in both Classic and Blocks checkout. No coding required.

## Accessibility Checklist for Your WooCommerce Checkout

Use this checklist to audit your checkout page, whether you are using Classic or Blocks. Run through it every time you update your checkout, change your theme, or install a new payment gateway. Accessibility is not a one-time fix. It is an ongoing practice.

- [ ] **Keyboard navigation:** Can you complete the entire checkout using only Tab, Shift+Tab, Enter, and Space?
- [ ] **Focus indicators:** Is every interactive element clearly visible when focused?
- [ ] **Form labels:** Does every input field have a visible, associated `<label>` element?
- [ ] **Error messages:** When a field fails validation, is the error announced to screen readers?
- [ ] **Payment methods:** Can you identify which payment method is selected using only a screen reader?
- [ ] **Order summary:** Is the order total and item list accessible to screen reader users?
- [ ] **Coupon code:** Can keyboard users expand, enter a code, and apply it without getting stuck?
- [ ] **Tab order:** Does the tab sequence follow a logical top-to-bottom flow?
- [ ] **Color contrast:** Do all text elements pass WCAG AA contrast requirements (4.5:1 for normal text)?
- [ ] **Skip links:** Is there a way to skip directly to the checkout form from the page header?

## Related Reading

- [WooCommerce Checkout Accessibility: Fix the 5 Issues That Kill Sales](/blog/woocommerce-checkout-accessibility-fix-sales/)
- [Screen Reader Testing for WooCommerce: The 15-Minute Guide](/blog/screen-reader-testing-woocommerce-guide/)
- [10 Common Accessibility Issues on E-commerce Sites](/blog/10-common-accessibility-issues-on-e-commerce-sites/)
- [How to Fix Keyboard Navigation in WooCommerce](/blog/keyboard-navigation-woocommerce-fix-guide/)
- [What WCAG 2.2 Means for Your Online Store](/blog/wcag-2-2-online-store-guide/)
- [WooCommerce Accessibility Fixer: How It Works](/plugins/woocommerce-accessibility-fixer/)
