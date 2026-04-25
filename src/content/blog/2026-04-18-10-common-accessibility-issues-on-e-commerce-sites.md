---
title: "10 Common Accessibility Issues on E-commerce Sites (And How to Fix Them)"
description: "The ten accessibility violations most frequently found on online stores, from missing alt text to poor color contrast, with specific fixer recommendations for each."
pubDate: 2026-04-18
author: Harun Ray
tags:
  - Accessibility
  - WCAG
  - E-commerce
  - Best Practices
---

# 10 Common Accessibility Issues on E-commerce Sites (And How to Fix Them)

Most accessibility problems on e-commerce sites fall into a predictable set of categories. If you can fix these ten, you'll address the vast majority of real-world WCAG failures. Here's the list, starting with the most common.

## 1. Missing or Blank Alt Text on Product Images

The most frequent e-commerce accessibility violation. Screen readers read alt text to describe images. Without it, a blind user shopping for a "Men's Navy Blue Chino Pants" gets told "image 12" instead of anything useful.

**Fix:** Every product image needs descriptive alt text. Decorative images (borders, dividers, background patterns) need `alt=""` to be explicitly skipped.

## 2. Keyboard Navigation Broken by Custom CSS

Buttons, links, and form fields must be keyboard-accessible. Custom themes often restyle interactive elements in ways that remove the visible focus indicator — making keyboard navigation invisible to the user even though the element technically receives focus.

**Fix:** Add CSS `:focus-visible` styles to restore visible focus rings. Never remove focus styles for aesthetic reasons without providing an equivalent alternative.

## 3. Form Fields Without Labels

Placeholder text is not a label. Many e-commerce forms use grey placeholder text inside input fields instead of visible, associated labels. Screen readers may not read placeholder text reliably, and the WCAG requirement is an explicit, visible label.

**Fix:** Add `<label for="field-id">` elements to every form input. Never use placeholder as a substitute for a label.

## 4. Poor Color Contrast

Text and background colors that fail WCAG's 4.5:1 contrast ratio for normal text (or 3:1 for large text). Common culprits: grey text on white backgrounds, muted labels, "disabled" button states.

**Fix:** Use a contrast checker (WebAIM Contrast Checker is free). Most failures can be fixed with a single color value change.

## 5. Missing Skip Links

Without a "skip to main content" link, keyboard users must tab through every navigation item, search bar, and widget on every page before reaching the actual content. For pages with extensive navigation, this can mean 20–30 keystrokes before a blind user reaches the page content.

**Fix:** Add a skip link as the first focusable element in the `<body>`. It's a single `<a href="#main-content">` and a matching `<div id="main-content">` on your main content container.

## 6. Heading Hierarchy Broken

Pages with no H1, multiple H1s, or headings that skip levels (H1 → H3 with no H2). Screen reader users navigate pages by heading — a broken structure makes the page unsortable.

**Fix:** One H1 per page (usually the page title). H2 for main sections, H3 for subsections. Don't skip levels.

## 7. Auto-Playing Media

Video or audio that plays automatically when a page loads. This interferes with screen reader audio and is a WCAG failure. If there's no pause control, it's a guaranteed failure.

**Fix:** Remove autoplay, or provide a visible, keyboard-accessible pause control. Keep audio muted by default.

## 8. Inaccessible Dropdowns and Menus

Mega menus and dropdowns built with `<div>` elements and JavaScript instead of native `<select>` or properly structured `<button>` elements. These are invisible to screen readers and unkeyboardable without additional ARIA roles.

**Fix:** Use semantic HTML. Dropdowns that use `<button>` with `aria-expanded` and `aria-controls` are keyboard-accessible by default. `<div>` click handlers almost never are.

## 9. Missing or Incorrect ARIA When JavaScript Is Involved

Dynamic content — cart updates, product variant changes, form validation messages — often fails accessibility because JavaScript changes the DOM without updating ARIA attributes. An error message that's injected into the page with JavaScript but not associated with the relevant field is invisible to assistive technology.

**Fix:** Use `aria-live` regions for dynamic content. Associate error messages with fields using `aria-describedby`. Don't assume that "visually obvious" equals "programmatically accessible."

## 10. Checkout Forms That Don't Announce Errors

When a form submission fails — wrong card number, missing address field — the error must be announced to screen reader users. If the error appears visually but isn't connected to the relevant field or announced via ARIA, a blind user won't know the purchase failed.

**Fix:** On form validation failure: associate the error message with the field using `aria-describedby`, put the error in an `aria-live="assertive"` region so it's announced immediately, and set `aria-invalid="true"` on the field.

## The Pattern Behind Most Failures

These issues share a common root: building for what looks right rather than for what renders correctly in assistive technology. The fix is usually straightforward — the problem is knowing what to look for. An automated scanner like axe DevTools or WAVE will surface 70–80% of these issues in under a minute. Start there.
