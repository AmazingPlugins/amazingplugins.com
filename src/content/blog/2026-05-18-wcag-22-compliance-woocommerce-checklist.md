---
title: "WCAG 2.2 Compliance WooCommerce Checklist (2026)"
description: "A practical WCAG 2.2 checklist for WooCommerce store owners. Check each item, see the standard, and know what to fix if you're failing."
pubDate: 2026-05-18T13:03:46.079Z
author: "Harun Ray"
tags:
  - "WooCommerce"
  - "WCAG 2.2"
  - "Accessibility"
  - "ADA Compliance"
  - "Checklist"
seoKeywords:
  - "`WCAG 2.2 compliance woocommerce`"
seoCategory: "woocommerce"
articleAngle: "checklist"
gscSubmitted: false
---

If you run a WooCommerce store and want a real WCAG 2.2 compliance checklist you can work through this weekend, here it is. Every item below tells you what to check, which WCAG 2.2 criterion it maps to, and what to do if your store is failing. WCAG 2.2 became the de facto standard in 2026, and most lawsuits still cite WCAG 2.1 AA as the legal floor, so this checklist covers both.

Fair warning before you start: no checklist replaces real user testing with assistive tech. But if you can tick off everything here, you have closed roughly 80 percent of the issues that actually get WooCommerce stores sued.

## Quick answer

WCAG 2.2 compliance for WooCommerce means your store meets all 50 Level A and AA success criteria, including the nine new ones added in WCAG 2.2. For a typical WooCommerce store the highest-impact items are: keyboard navigation through checkout (2.1.1), visible focus indicators (2.4.7 and the stricter 2.4.11 in WCAG 2.2), alt text on every product image (1.1.1), color contrast of 4.5:1 for normal text (1.4.3), accessible form labels on cart and checkout (3.3.2, 4.1.2), and the new dragging movements alternative (2.5.7) if you use any drag-to-reorder UI.

If you have not yet read the background, start with [what actually changed in WCAG 2.2 for WooCommerce](https://amazingplugins.com/blog/2026-05-18-wcag-22-compliance-woocommerce-what-changed/) so the checklist below makes sense in context.

## The WCAG 2.2 WooCommerce checklist

Work through this top to bottom. Each item is structured the same way: what to check, the WCAG criterion, and what to do if you fail.

### 1. Every product image has meaningful alt text

**Check:** Open five random product pages. View source or right click each main product image and gallery image. Confirm the `alt` attribute is present and describes the product, not the filename.

**Standard:** WCAG 1.1.1 Non-text Content (Level A).

**If failing:** Add alt text in the WordPress Media Library for every product image. Decorative images (background patterns, spacer GIFs) should have `alt=""`, not a missing alt attribute. WooCommerce Accessibility Fixer can scan your full media library and flag every image missing alt text, including variation images that are easy to forget.

### 2. Entire checkout flow works with keyboard only

**Check:** Put your mouse aside. Use only Tab, Shift+Tab, Enter, Space, and arrow keys. Add a product to cart, go to checkout, fill in the form, and complete a test order with a free coupon or sandbox gateway.

**Standard:** WCAG 2.1.1 Keyboard (Level A) and 2.1.2 No Keyboard Trap (Level A).

**If failing:** Most failures are custom checkout fields or third party payment widgets that trap focus. Replace any `<div onclick>` patterns with real `<button>` elements. If a Stripe or PayPal popup traps focus, contact the gateway plugin author or use their hosted page version instead.

### 3. Focus indicator is visible on every interactive element

**Check:** Tab through your homepage, product page, and cart. Can you see clearly which element is focused at every step? The outline should have a contrast ratio of at least 3:1 against the background.

**Standard:** WCAG 2.4.7 Focus Visible (Level AA) and the new WCAG 2.4.11 Focus Not Obscured Minimum (Level AA in 2.2).

**If failing:** Most themes set `outline: none` somewhere in the CSS. Remove that rule, or override it with a high-contrast focus style like `:focus-visible  outline: 2px solid #005fcc; outline-offset: 2px; `. Also check that sticky headers or chat widgets do not cover the focused element when you Tab to the bottom of a long page.

### 4. Color contrast meets 4.5:1 for text and 3:1 for UI components

**Check:** Run your homepage and a product page through WebAIM Contrast Checker or the Chrome DevTools color picker. Pay attention to: light gray prices, sale badges, placeholder text in form fields, and "Add to cart" button text.

**Standard:** WCAG 1.4.3 Contrast (Minimum) for text, and 1.4.11 Non-text Contrast for buttons and form borders. Both Level AA.

**If failing:** Darken the failing color in your theme customizer or child theme CSS. Sale badges in light yellow on white are the single most common WooCommerce failure here.

### 5. Every form field has a programmatically associated label

**Check:** Inspect each input on the checkout page. Every `<input>`, `<select>`, and `<textarea>` should have a matching `<label for="id">` or an `aria-label` attribute. Placeholder text alone does not count.

**Standard:** WCAG 1.3.1 Info and Relationships (Level A), 3.3.2 Labels or Instructions (Level A), 4.1.2 Name, Role, Value (Level A).

**If failing:** WooCommerce core checkout fields are mostly fine, but custom fields added by plugins like Checkout Field Editor often skip labels. Edit the field template or add a snippet that injects proper `<label>` elements.

### 6. Skip link to main content exists and works

**Check:** Load your homepage. Press Tab once. You should see a "Skip to content" or "Skip to main" link appear. Press Enter. Focus should jump past the header navigation into the main content.

**Standard:** WCAG 2.4.1 Bypass Blocks (Level A).

**If failing:** Most modern WooCommerce themes (Storefront, Blocksy, Kadence) include this. If yours does not, add a skip link to your `header.php` that targets `#main` or `#primary` and style it to appear on focus.

### 7. Page has a correct lang attribute

**Check:** View source on any page. The `<html>` tag should have a `lang` attribute, for example `<html lang="en-US">`. If you sell in multiple languages, each language version should declare its own lang.

**Standard:** WCAG 3.1.1 Language of Page (Level A).

**If failing:** In WordPress this is usually one line in `header.php` calling `language_attributes()`. If you use WPML or Polylang, make sure they are configured to switch the lang attribute on translated pages.

### 8. All buttons have accessible names

**Check:** Inspect your cart icon, search icon, wishlist toggle, and any icon-only buttons. Each should have visible text, an `aria-label`, or a child element with a screen-reader-only class.

**Standard:** WCAG 4.1.2 Name, Role, Value (Level A) and 2.5.3 Label in Name (Level A).

**If failing:** Add an `aria-label="Search products"` to icon buttons. For social share icons, the visible label should match the accessible name so voice control users can say "click share".

### 9. Link text is meaningful out of context

**Check:** Scan your product descriptions and category pages for links that say only "click here", "read more", or "learn more". A screen reader user pulling up a list of links should know where each one goes.

**Standard:** WCAG 2.4.4 Link Purpose (In Context) (Level A) and 2.4.9 Link Purpose (Link Only) (Level AAA, but recommended).

**If failing:** Rewrite as "Read the full shipping policy" or "View Smith Acoustic Guitar details". This is judgment-heavy and not something any automated tool can fully fix for you.

### 10. Drag-to-reorder, drag-to-swap, or drag-to-zoom has a non-drag alternative

**Check:** Do you have a product image zoom that requires drag, a wishlist that requires drag-to-sort, or a builder UI that needs dragging? Can the same task be done with a single tap or button press?

**Standard:** WCAG 2.5.7 Dragging Movements (Level AA, new in 2.2).

**If failing:** Add Up/Down arrow buttons next to draggable list items, or provide a click-to-zoom alternative to drag-pan on product galleries.

### 11. Click targets are at least 24x24 CSS pixels

**Check:** Measure your "Add to cart" buttons, quantity steppers, variation swatches, and pagination links. They should be at least 24 by 24 pixels with adequate spacing.

**Standard:** WCAG 2.5.8 Target Size (Minimum) (Level AA, new in 2.2).

**If failing:** Increase padding on small buttons. The 24 pixel minimum is forgiving (the old 2.1 AAA was 44 pixels), but tiny `+/-` quantity buttons in some themes still fail.

### 12. Consistent help link or contact across all pages

**Check:** If your store has a help, contact, or chat option, it appears in the same relative location on every page.

**Standard:** WCAG 3.2.6 Consistent Help (Level A, new in 2.2).

**If failing:** Pick one location (header, footer, or floating button) and keep it there. Do not hide the contact link inside a hamburger menu on product pages but expose it in the footer on the homepage.

### 13. No cognitive function tests in authentication

**Check:** Do your login or checkout flows require solving a CAPTCHA, remembering a previous step, or re-typing a code from another device with no easier path?

**Standard:** WCAG 3.3.8 Accessible Authentication (Minimum) (Level AA, new in 2.2).

**If failing:** Allow password managers to autofill (do not block paste on password fields), offer passkeys, or provide an email magic link as an alternative to puzzle CAPTCHAs.

### 14. Redundant entry is avoided

**Check:** During checkout, are users asked to re-type information they already provided in the same session (for example, shipping address copied to billing)?

**Standard:** WCAG 3.3.7 Redundant Entry (Level A, new in 2.2).

**If failing:** WooCommerce core handles "Same as shipping" properly. If a custom checkout plugin breaks this, fix or replace it.

### 15. Accessibility statement is published

**Check:** Visit yourstore.com/accessibility. Is there a page describing your accessibility commitments, the standard you target (WCAG 2.2 AA), and a contact for accessibility issues?

**Standard:** Not a WCAG criterion, but required by the European Accessibility Act (enforceable since June 28, 2025) for stores selling to EU consumers, and strongly recommended for ADA defense in the US.

**If failing:** Create the page. Include the standard, known limitations, a reporting email, and the date of last review.

## How AmazingPlugins helps

Going through the 15 items above manually takes a full day for a typical store. WooCommerce Accessibility Fixer automates the parts that should be automated: it scans every product image for missing alt text, audits color contrast across your theme palette, injects skip links and lang attributes where missing, adds ARIA labels to unlabeled icon buttons, and enforces a visible focus indicator across the entire store.

The Pro version adds batch scanning across thousands of products, an auto-fix mode for the safe-to-automate items (alt text suggestions, focus styles, lang attributes, ARIA labels on common WooCommerce templates), and a PDF compliance report you can hand to a lawyer or auditor.

What the plugin honestly does not do for you: write meaningful alt text that explains a product's distinguishing features, judge whether your link text is descriptive enough in context, or test your custom checkout flow with a real screen reader. Those still need human review. For the bigger picture of ADA compliance beyond WCAG 2.2, see our [WooCommerce ADA compliance guide](https://amazingplugins.com/blog/2026-04-16-how-to-make-your-woocommerce-store-ada-compliant/).

## Frequently asked questions

### Is WCAG 2.2 mandatory for WooCommerce stores?

Legally, no court in the US has yet ruled that WCAG 2.2 specifically is the binding standard. WCAG 2.1 AA remains the de facto legal floor and is the technical standard cited by the European Accessibility Act through EN 301 549. But WCAG 2.2 is what auditors and plaintiff attorneys check against in 2026, and meeting 2.2 automatically means you meet 2.1.

### How long does it take to make a WooCommerce store WCAG 2.2 compliant?

For a small store (under 200 products) with a modern theme like Storefront or Blocksy, a determined owner can clear this checklist in two to four full days. Stores with custom themes, page builders, or hundreds of products typically need one to two weeks plus ongoing maintenance.

### Will an accessibility overlay make my store WCAG 2.2 compliant?

No. The FTC ruled against accessiBe in 2024 for deceptive claims, and 4,605 Shopify stores with overlays installed were sued in 2025 anyway. Overlays inject JavaScript over broken markup. WCAG 2.2 compliance requires the underlying HTML, CSS, and behavior to be accessible. Fix the code, not the surface.

### Which WCAG 2.2 criteria are new and where do I start?

The nine new criteria are 2.4.11 Focus Not Obscured (Minimum), 2.4.12 Focus Not Obscured (Enhanced), 2.4.13 Focus Appearance, 2.5.7 Dragging Movements, 2.5.8 Target Size (Minimum), 3.2.6 Consistent Help, 3.3.7 Redundant Entry, 3.3.8 Accessible Authentication (Minimum), and 3.3.9 Accessible Authentication (Enhanced). For WooCommerce stores, start with 2.5.8 target size and 2.4.11 focus not obscured. Those are where most stores fail today.

### Do I need an accessibility statement even if I am only US-based?

Not legally required, but strongly recommended. A well-written accessibility statement with a working contact channel has been cited in multiple cases as evidence of good faith effort, which has reduced settlement amounts in ADA cases. It also gives users a way to report issues to you instead of to a lawyer.

## Where to go next

Work through this list with your morning coffee over the next week. Mark items green, yellow, or red. The reds become your sprint backlog. If you have a developer, hand them this checklist and the WCAG 2.2 quick reference. If you do not, install a scanning tool that maps to these exact criteria and start with the auto-fixable items first.
