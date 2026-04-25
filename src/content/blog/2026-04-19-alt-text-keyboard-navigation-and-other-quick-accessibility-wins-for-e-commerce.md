---
title: "Alt Text, Keyboard Navigation, and Other Quick Accessibility Wins for E-commerce"
description: "Quick wins that can dramatically improve your store's accessibility score with minimal effort — covering alt text, skip links, focus indicators, and form labels."
pubDate: 2026-04-19
author: Harun Ray
tags:
  - Accessibility
  - Alt Text
  - Keyboard Navigation
  - WCAG
---

# Alt Text, Keyboard Navigation, and Other Quick Accessibility Wins for E-commerce

Most accessibility improvements don't require a rebuild. They're quick changes — a few minutes per page — that move the needle significantly. Here are the highest-impact ones for e-commerce stores.

## Alt Text: More Than "Product Image"

The rule: alt text should convey the same information a sighted user gets from the image. For a product photo, that's the product name, key style details, and relevant context.

Bad: `alt="product"`
Better: `alt="product image"`
Good: `alt="Men's Oxford Blue Cotton Polo Shirt, front view"`
Best: `alt="Men's Oxford Blue Cotton Polo Shirt — front view showing collar detail"`

The exception: decorative images that add no information (section dividers, background patterns, spacer images). These should have `alt=""` — explicitly empty — so screen readers skip them.

For gallery images showing the same product from multiple angles, describe what's unique about each angle: "front view," "back view," "side seam detail," "size label closeup."

## Skip Links: One Link, Massive Impact

A skip link is a hidden link at the top of the page that lets keyboard users jump directly to the main content, bypassing the entire navigation.

It's usually the first link in the HTML, hidden by default but visible on keyboard focus. When a sighted user tabs through, they see it briefly. When a screen reader user loads the page, they hear "Skip to main content, link."

Implementation looks like this:
```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```
And the target:
```html
<main id="main-content">
```

Without this, a keyboard user tabbing through a navigation with 10 items, a search bar, and 5 sidebar widgets has to press Tab 16 times before reaching the actual page content. Every single page load.

## Focus Indicators: Don't Kill the Ring

The browser's default focus outline — usually a blue ring — is a feature, not a bug. Designers often remove it with `outline: none` because it "doesn't match the design." This breaks keyboard navigation for every user.

The fix isn't keeping the ugly default — it's replacing it with a styled alternative that fits your design:
```css
:focus-visible {
  outline: 2px solid var(--coral);
  outline-offset: 3px;
}
```

This preserves visibility while matching your brand. Make it a design feature, not a afterthought.

## Form Labels: Always Visible, Always Associated

Every form input needs a visible label. Not placeholder text — a real `<label>` element associated with the input via the `for` attribute:
```html
<label for="email">Email address</label>
<input type="email" id="email" name="email" />
```

Placeholders disappear when you start typing, which is exactly when you need them most. They're also low-contrast by default. Always use a real label.

For complex forms with grouped fields (e.g., "Card Number" above four individual digit inputs), use `fieldset` and `legend`:
```html
<fieldset>
  <legend>Card Number</legend>
  <input type="text" inputmode="numeric" maxlength="4" /> -
  <input type="text" inputmode="numeric" maxlength="4" /> -
  ...
</fieldset>
```

## Error Messages That Actually Help

Bad error: "Invalid input"
Good error: "Please enter a valid 16-digit card number"
Great error: "Card number must be 16 digits. You entered 14."

The best error messages tell the user what went wrong, what the correct format is, and — where possible — what they actually entered. In e-commerce, where a failed form means a lost sale, clarity in error messages directly impacts conversion.

## Image Optimization and Alt Text Together

Every product image should have both optimized file size (for performance) and descriptive alt text (for accessibility). These aren't separate tasks — when you're writing alt text, you're already looking at the image. A quick description takes 10 seconds.

The store owner or content manager is usually the best person to write alt text, because they know what makes each product image distinctive. Brief, descriptive, specific.

## The Cumulative Effect

None of these fixes is hard individually. Alt text: 30 seconds per image. Skip link: one link. Focus styles: four lines of CSS. But they compound. A store with 50 products and no alt text has 50 accessibility failures. Fix them all and you've removed the single most common WCAG violation on e-commerce sites.

Start with the quickest wins — skip links and focus styles — and work through product images systematically. You don't need to fix everything at once.
