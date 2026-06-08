---
title: >-
  Shopify review app accessibility: WCAG fixes for star ratings, carousels, and
  write-a-review forms
description: >-
  A component-by-component guide to fixing accessibility issues in Shopify
  review apps. Make star ratings keyboard-friendly, keep review carousels
  readable, and label review forms so they pass WCAG.
date: 2026-06-05T00:00:00.000Z
pubDate: 2026-06-05T00:00:00.000Z
author: Harun Ray
tags:
  - Shopify
  - Accessibility
  - Review Apps
  - WCAG
  - ADA Compliance
seoKeywords:
  - Shopify review app accessibility
  - accessible star ratings Shopify
  - WCAG review widget fixes
  - Shopify reviews ADA compliance
  - accessible write-a-review form
seoCategory: shopify
articleAngle: component-guide
gscSubmitted: true
canonical: 'https://amazingplugins.com/blog/shopify-review-app-accessibility-fixes/'
---

Reviews sell. They also break accessibility on a lot of Shopify stores. The usual failures are easy to spot once you know where to look: star widgets that only work with a mouse, review sliders that swallow focus, and write-a-review forms with missing labels or broken error messages.

This is a component guide for those parts specifically. If you use a review app like Judge.me, Loox, Yotpo, Stamped, Okendo, Junip, or another widget that injects its own markup, the patterns below will feel familiar.

For the wider pattern behind third-party app failures, start with [Shopify third-party apps and WCAG violations](/blog/shopify-third-party-apps-wcag-violations/). If the problem is bigger than reviews and you need to patch the storefront without uninstalling the app, [fix Shopify app accessibility errors without uninstalling](/blog/2026-06-02-fix-shopify-app-accessibility-errors-without-uninstalling/) covers that workflow. If you want a tool to catch these issues faster, use the [Shopify Accessibility Fixer](/plugins/shopify-accessibility-fixer/).

## Why review widgets break accessibility so often

Most review apps are built to render fast, stay out of the theme's way, and work across a lot of stores. Accessibility usually comes second.

That leads to the same few problems over and over:

- The widget loads after `DOMContentLoaded`, so your theme scripts and scanners miss it on the first pass.
- Everything is built from `<div>` and `<span>` tags to avoid styling conflicts.
- Star controls are decorative icons instead of real form fields.
- Carousels reuse a generic slider library that was never wired up for keyboard use.
- The review form opens in a modal with no focus management.

None of that is surprising. It is also fixable in most cases from your theme layer.

## Which WCAG criteria matter here

You do not need the entire spec in your head. For review widgets, these are the ones that come up most often:

- **1.3.1 Info and Relationships**. Star ratings and review metadata need to be programmatically understandable, not just visual.
- **1.4.3 Contrast (Minimum)**. Review text on pale gray cards is a constant failure point.
- **2.1.1 Keyboard**. Every star, button, carousel control, and field must work without a mouse.
- **2.4.3 Focus Order**. When a review modal opens, focus has to move into it. When it closes, focus needs to go back to the trigger.
- **2.4.7 Focus Visible**. The focus ring has to be visible.
- **3.3.2 Labels or Instructions**. Every field in the write-a-review form needs a real label.
- **4.1.2 Name, Role, Value**. Custom controls need to expose what they are and what state they are in.
- **4.1.3 Status Messages**. When a review is submitted or filtered, screen reader users need to hear that something changed.

If you fix those items, you clear most of the issues that show up in a review widget audit.

## Star ratings should work two different ways

A read-only rating and an interactive rating are not the same component. People keep building them as if they are.

### Read-only ratings

The rating shown on a product card or beneath a title is display only. It should not be tabbable and it should not pretend to be a control.

```html
<div class="rating" role="img" aria-label="Rated 4.6 out of 5 based on 312 reviews">
  <span aria-hidden="true">*****</span>
  <span class="visually-hidden">4.6 out of 5</span>
</div>
```

A screen reader gets the label. Sighted users get the stars and the numeric value. The stars themselves stay hidden from assistive tech so they do not get read as a row of star glyphs.

### Interactive ratings

The rating field in the write-a-review form should be a real radio group. Anything else is you rebuilding a control that HTML already solved for you.

```html
<fieldset class="star-input">
  <legend>Your rating</legend>

  <input type="radio" id="rating-5" name="rating" value="5" required>
  <label for="rating-5"><span class="visually-hidden">5 stars</span><span aria-hidden="true">*</span></label>

  <input type="radio" id="rating-4" name="rating" value="4">
  <label for="rating-4"><span class="visually-hidden">4 stars</span><span aria-hidden="true">*</span></label>

  <input type="radio" id="rating-3" name="rating" value="3">
  <label for="rating-3"><span class="visually-hidden">3 stars</span><span aria-hidden="true">*</span></label>

  <input type="radio" id="rating-2" name="rating" value="2">
  <label for="rating-2"><span class="visually-hidden">2 stars</span><span aria-hidden="true">*</span></label>

  <input type="radio" id="rating-1" name="rating" value="1">
  <label for="rating-1"><span class="visually-hidden">1 star</span><span aria-hidden="true">*</span></label>
</fieldset>
```

Keep the inputs in the tab order. Hide them visually if you want, but do not use `display: none` or `visibility: hidden`. That breaks keyboard access.

```css
.star-input input {
  position: absolute;
  width: 1px;
  height: 1px;
  clip-path: inset(50%);
  overflow: hidden;
}

.star-input label {
  cursor: pointer;
  font-size: 1.5rem;
  color: #ccc;
}

.star-input input:checked + label,
.star-input label:hover,
.star-input input:focus-visible + label {
  color: #f5a623;
}

.star-input input:focus-visible + label {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}
```

That gives you a field that works with arrow keys, Space, Tab, and a screen reader. It also means a shopper can actually use the form without guessing where the control is.

If the app ships its own non-semantic star control and will not let you change it, patch the markup at runtime. That is the same approach used in [fix Shopify app accessibility errors without uninstalling](/blog/2026-06-02-fix-shopify-app-accessibility-errors-without-uninstalling/).

## Review carousels and pagination

Carousels are where review widgets do the most damage. The common version auto-rotates, has no pause button, no keyboard support, and no announcement when the slide changes.

A few rules help a lot:

- If it auto-rotates, give it a visible pause button. That is WCAG 2.2.2.
- Previous and Next must be real `<button>` elements.
- The current slide should be focusable as a unit, not a maze of nested links and controls.
- When the slide changes, announce it through a live region.
- Pagination dots should live inside a `<nav aria-label="Reviews pagination">` and the current page should be marked clearly.

A simple live region helps:

```html
<div aria-live="polite" class="visually-hidden" id="review-status">
  Showing review 3 of 12
</div>
```

If you can replace the carousel with a simple list and a "Load more" button, do it. That is easier to use, easier to maintain, and usually better for SEO too. Review sliders look neat in a mockup. They are usually worse in practice.

## Write-a-review forms need real labels

This is the part merchants often forget because the form still looks fine on the page.

The usual failures are:

- placeholder text used instead of labels
- no instructions for required fields
- validation errors that appear visually but are never announced
- a modal that opens without moving focus

A good baseline looks like this:

```html
<form id="review-form" novalidate>
  <div>
    <label for="review-name">Your name</label>
    <input id="review-name" name="name" type="text" autocomplete="name" required>
  </div>

  <div>
    <label for="review-email">Email address</label>
    <input id="review-email" name="email" type="email" autocomplete="email" required aria-describedby="review-email-help">
    <p id="review-email-help">We use this to verify the review. We do not publish it.</p>
  </div>

  <div>
    <label for="review-title">Review title</label>
    <input id="review-title" name="title" type="text" required>
  </div>

  <div>
    <label for="review-body">Your review</label>
    <textarea id="review-body" name="body" rows="5" required aria-describedby="review-count"></textarea>
    <p id="review-count" aria-live="polite">0 of 1000 characters</p>
  </div>

  <button type="submit">Submit review</button>
  <div id="review-status" role="status" aria-live="polite"></div>
</form>
```

If the form opens in a modal, focus should move into it as soon as it opens, Escape should close it, and focus should return to the button that opened it. If the app cannot do that cleanly, replace the trigger and open the form inline or in your own dialog shell.

The status area matters too. A message like "Thanks, your review has been submitted and will be published after moderation" gives screen reader users the same feedback sighted users get from the visual success toast.

## What to do when the app injects markup after page load

This is the part that trips people up. Review widgets often inject their UI a few seconds after load, sometimes longer on mobile. Your fixes need to wait for that markup to exist.

A `MutationObserver` is the cleanest fix when you cannot edit the app directly:

```js
const target = document.querySelector('#shopify-section-product-reviews') || document.body;

const observer = new MutationObserver(() => {
  document.querySelectorAll('.review-stars:not([data-a11y-fixed])').forEach((el) => {
    const value = el.dataset.rating || el.getAttribute('data-score') || '0';
    const count = el.dataset.count || '';

    el.setAttribute('role', 'img');
    el.setAttribute(
      'aria-label',
      `Rated ${value} out of 5${count ? ` based on ${count} reviews` : ''}`
    );
    el.dataset.a11yFixed = 'true';
  });
});

observer.observe(target, { childList: true, subtree: true });
```

Keep it idempotent. Use a `data-a11y-fixed` flag so you do not reapply the patch on every DOM change. Scope the observer as tightly as you can. Watching the whole document is lazy and expensive.

## How to test and document the fix

Do not stop at one axe scan on the initial DOM. Review widgets often load too late for that to catch anything useful.

Test in this order:

1. Load the product page and wait until the review widget has fully rendered.
2. Tab through every control in the widget.
3. Open the review modal with the keyboard, not the mouse.
4. Submit a review with VoiceOver on macOS or NVDA on Windows running.
5. Change the review sort or pagination and listen for a status message.
6. Check contrast on the actual rendered colors, not the CSS you expected to ship.

Write down what changed while it is fresh:

- which component failed
- which WCAG criterion applied
- what the original markup looked like
- what you patched
- which app version or theme version you tested

That record matters when the app updates and breaks your fix later. Review widgets change often. Your notes will save you from doing the same investigation twice.

## The practical takeaway

Most Shopify review apps are not going to get accessibility perfect on their own. That does not mean you are stuck.

Fix the star ratings. Fix the keyboard support in the carousel or replace the carousel with a list. Fix the labels and status messages in the form. Manage focus in the modal. Patch the injected markup if you have to.

Those are the boring fixes, which is usually where the real wins live.
