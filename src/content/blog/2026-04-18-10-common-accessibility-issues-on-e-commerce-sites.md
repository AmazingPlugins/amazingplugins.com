---
title: "10 Common E-commerce Accessibility Issues (With Fixes)"
description: "The 10 accessibility violations most common on e-commerce sites, from missing alt text to keyboard traps, with a practical fix for each one."
pubDate: 2026-04-18T00:00:00.000Z
updatedDate: 2026-11-27T00:00:00.000Z
author: Harun Ray
tags:
  - Accessibility
  - WCAG
  - E-commerce
  - Best Practices
gscSubmitted: true
---

Most accessibility problems on e-commerce sites fall into a predictable set of categories. If you can fix these ten, you'll address the vast majority of real-world WCAG failures. Here's the list, starting with the most common.

## 1. Missing or Blank Alt Text on Product Images

The most frequent e-commerce accessibility violation. Screen readers read alt text to describe images. Without it, a blind user shopping for a "Men's Navy Blue Chino Pants" gets told "image 12" instead of anything useful.

**Fix:** Every product image needs descriptive alt text. Decorative images (borders, dividers, background patterns) need `alt=""` to be explicitly skipped.

## 2. Keyboard Navigation Broken by Custom CSS

Buttons, links, and form fields must be keyboard-accessible. Custom themes often restyle interactive elements in ways that remove the visible focus indicator - making keyboard navigation invisible to the user even though the element technically receives focus.

**Fix:** Add CSS `:focus-visible` styles to restore visible focus rings. Never remove focus styles for aesthetic reasons without providing an equivalent alternative.

## 3. Form Fields Without Labels

Placeholder text is not a label. Many e-commerce forms use grey placeholder text inside input fields instead of visible, associated labels. Screen readers may not read placeholder text reliably, and the WCAG requirement is an explicit, visible label.

**Fix:** Add `<label for="field-id">` elements to every form input. Never use placeholder as a substitute for a label.

## 4. Poor Color Contrast

Text and background colors that fail WCAG's 4.5:1 contrast ratio for normal text (or 3:1 for large text). Common culprits: grey text on white backgrounds, muted labels, "disabled" button states.

**Fix:** Use a contrast checker (WebAIM Contrast Checker is free). Most failures can be fixed with a single color value change.

## 5. Missing Skip Links

Without a "skip to main content" link, keyboard users must tab through every navigation item, search bar, and widget on every page before reaching the actual content. For pages with extensive navigation, this can mean 20 to 30 keystrokes before a blind user reaches the page content.

**Fix:** Add a skip link as the first focusable element in the `<body>`. It's a single `<a href="#main-content">` and a matching `<div id="main-content">` on your main content container.

## 6. Heading Hierarchy Broken

Pages with no H1, multiple H1s, or headings that skip levels (H1 → H3 with no H2). Screen reader users navigate pages by heading - a broken structure makes the page unsortable.

**Fix:** One H1 per page (usually the page title). H2 for main sections, H3 for subsections. Don't skip levels.

## 7. Auto-Playing Media

Video or audio that plays automatically when a page loads. This interferes with screen reader audio and is a WCAG failure. If there's no pause control, it's a guaranteed failure.

**Fix:** Remove autoplay, or provide a visible, keyboard-accessible pause control. Keep audio muted by default.

## 8. Inaccessible Dropdowns and Menus

Mega menus and dropdowns built with `<div>` elements and JavaScript instead of native `<select>` or properly structured `<button>` elements. These are invisible to screen readers and unkeyboardable without additional ARIA roles.

**Fix:** Use semantic HTML. Dropdowns that use `<button>` with `aria-expanded` and `aria-controls` are keyboard-accessible by default. `<div>` click handlers almost never are.

## 9. Missing or Incorrect ARIA When JavaScript Is Involved

Dynamic content - cart updates, product variant changes, form validation messages - often fails accessibility because JavaScript changes the DOM without updating ARIA attributes. An error message that's injected into the page with JavaScript but not associated with the relevant field is invisible to assistive technology.

**Fix:** Use `aria-live` regions for dynamic content. Associate error messages with fields using `aria-describedby`. Don't assume that "visually obvious" equals "programmatically accessible."

## 10. Checkout Forms That Don't Announce Errors

When a form submission fails - wrong card number, missing address field - the error must be announced to screen reader users. If the error appears visually but isn't connected to the relevant field or announced via ARIA, a blind user won't know the purchase failed.

**Fix:** On form validation failure: associate the error message with the field using `aria-describedby`, put the error in an `aria-live="assertive"` region so it's announced immediately, and set `aria-invalid="true"` on the field.

## Which of these cost you the most

Not every failure is equal. Ranked by what it blocks:

| Issue | Blocks | Fix cost |
|---|---|---|
| Checkout that does not announce errors | The purchase itself | Low: labels, `aria-describedby`, `aria-live` |
| Keyboard traps in drawers and menus | The whole flow | Low: Escape handler, focus return |
| Missing form labels | Address and payment entry | Low: visible `<label>` per field |
| Missing alt text | Choosing between products | Medium: content work per image |
| No focus indicator | Knowing where you are | Low: one CSS rule |
| Poor contrast | Reading prices and notices | Low: color tokens |
| Missing skip link | Reaching content at all | Low: one link, one anchor |
| Broken headings | Navigating a long page | Low: markup cleanup |
| Inaccessible dropdowns | Choosing a variation or filter | Medium: semantic buttons and ARIA |
| Auto-playing media | Hearing the screen reader | Low: remove autoplay or add pause |

Start at the top. A store that announces errors and releases focus traps will pass a keyboard purchase even if the gallery still needs work.

## What a scanner catches and what it misses

Automated tools are good at rules that can be checked against the DOM. They are bad at anything that depends on meaning or state.

- **Reliable for a scanner:** missing `alt`, unlabeled inputs, missing `lang`, duplicate IDs, insufficient contrast for known color pairs, empty buttons, invalid ARIA.
- **Unreliable or invisible:** whether alt text describes the right thing, whether a payment iframe is usable, whether a drawer traps focus, whether an error message is announced at the right moment, whether the flow makes sense.
- **Never automatic:** whether a customer can finish a purchase.

The practical split is a scan for the first list, then a keyboard and screen reader pass for the rest. That second pass is where most of the money is lost, because the failures that stop a purchase are usually interaction failures.

## Where these show up in WooCommerce

The generic list maps to specific templates:

- **`single-product.php`:** gallery, variation picker, quantity, add to cart, tabs, reviews.
- **`cart.php` and the cart block:** quantity controls, coupon field, remove links, empty-cart state.
- **`checkout.php` and the checkout block:** billing and shipping fields, order summary, payment iframe, validation errors.
- **`my-account.php`:** login, lost password, address forms, order tables.
- **Archive and filter blocks:** sort dropdown, price filter, layered nav, pagination.
- **Global:** header search, cart icon, mobile menu, footer links, cookies and notices.

If you only have an afternoon, do checkout and the product page. Those two carry the purchase.

## A repair order that works

1. **Scan the four money pages** and save the raw list. Do not fix from the scan alone.
2. **Do a keyboard purchase.** Note every point where you get stuck.
3. **Do a screen reader purchase.** Fifteen minutes is enough to hear whether fields and errors are announced.
4. **Fix the blockers first:** error announcements, focus traps, labels.
5. **Then the visible issues:** contrast, focus ring, skip link, headings.
6. **Retest the same flows** and record what changed.
7. **Repeat after theme, checkout, or payment updates.**

The order matters. A store with perfect alt text and a checkout that never announces an error still loses the sale.

## Questions store owners ask

### Do I have to fix all ten before launching?

No. Fix the ones that block a purchase, then work through the rest. A store that is honest about remaining gaps is better off than one that claims full conformance after a scan.

### Can a plugin fix these automatically?

Some of them, partially. Alt text fallbacks, a skip link, focus styles, and selected label and error patterns can be added by code. Meaning, contrast tokens, and flow decisions stay with you. Test any fix on your own theme, because Woo templates differ.

### Are some of these less important for a small store?

The blockers are not size-dependent. A ten-product store still has a checkout. What changes is the volume of content work, not the plumbing.

## The Pattern Behind Most Failures

These issues share a common root: building for what looks right rather than for what renders correctly in assistive technology. The fix is usually straightforward - the problem is knowing what to look for. An automated scanner like axe DevTools or WAVE will surface 70 to 80% of these issues in under a minute. Start there.

---

**Use WooCommerce?** [AP Accessibility Fixer for WooCommerce](/plugins/woocommerce-accessibility-fixer/) addresses selected issues, such as missing product-image alt text and focus styles. Test the rest of this checklist yourself. For a practical assistive-technology pass, use the [WooCommerce screen-reader testing guide](/blog/screen-reader-testing-woocommerce-guide/).

## Related Reading

- [Alt Text, Keyboard Navigation, and Other Quick Accessibility Wins for E-commerce](/blog/alt-text-keyboard-navigation-and-other-quick-accessibility-wins-for-e-commerce/)
- [The Hidden Accessibility Issues That Are Costing Your Store Customers](/blog/the-hidden-accessibility-issues-that-are-costing-your-store-customers/)
- [How to Fix Keyboard Navigation in WooCommerce](/blog/keyboard-navigation-woocommerce-fix-guide/)
- [WooCommerce Checkout Accessibility: Fix the 5 Issues That Kill Sales](/blog/woocommerce-checkout-accessibility-fix-sales/)
- [WooCommerce Accessibility Fixer](/plugins/woocommerce-accessibility-fixer/)
