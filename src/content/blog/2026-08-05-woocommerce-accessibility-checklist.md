---
title: WooCommerce Accessibility Checklist for Store Owners
description: >-
  A practical accessibility checklist for WooCommerce store owners. Step-by-step
  items to check, fix, and maintain your store's compliance with WCAG standards.
pubDate: 2026-08-05T00:00:00.000Z
author: Harun Ray
tags:
  - WooCommerce
  - Accessibility
  - Checklist
  - WCAG
  - ADA
  - E-commerce
seoKeywords:
  - "woocommerce accessibility checklist"
  - "woocommerce accessibility"
  - "wcag checklist ecommerce"
  - "woocommerce accessibility audit"
gscSubmitted: false
---

# WooCommerce Accessibility Checklist for Store Owners

Most WooCommerce store owners do not think about accessibility until a customer complains or a lawsuit lands in their inbox. By then, fixing things costs time and money you could have spent on growing your store.

Here is the honest truth: accessibility is not a feature. It is basic hygiene. If your checkout form does not work for someone using a keyboard, or your product images have no alt text, you are leaving money on the table. You are also exposing yourself to legal risk that gets worse every year.

This checklist is for store owners, not developers. You do not need to write code for most of these items. You just need to know what to look for and where to fix it. I have broken it into four sections: navigation and structure, images and media, forms and checkout, and color and visual design. Each section has items you can check in under five minutes.

## Navigation and structure

These are the foundation. If navigation fails, nothing else matters.

- [ ] **Skip link exists and works.** When someone presses Tab on your site, the first element should be a "Skip to content" link. It lets keyboard users skip past the header and get straight to your products. Most WooCommerce themes do not include one by default. You can add one with a plugin or a small code snippet.

- [ ] **Focus indicators are visible.** Tab through your site and watch the keyboard focus. You should see a clear outline around every button, link, and form field. If you cannot tell which element is focused, neither can your customers. Many themes remove focus outlines for aesthetics. That is a mistake.

- [ ] **Heading hierarchy makes sense.** Every page should have one H1 (the product name or page title). Subheadings should go in order: H2, then H3 under it. Do not skip from H1 to H4. Screen readers use headings to navigate, so a broken heading structure makes your site confusing to move through.

- [ ] **Main navigation works with keyboard.** Open your menu, navigate through it with arrow keys and Tab, and make sure you can reach every link. Dropdown submenus are especially tricky. They often require mouse hover to open, which locks out keyboard users entirely.

- [ ] **Breadcrumbs are labeled.** If your theme uses breadcrumbs, make sure they are in a `nav` element with an accessible label. Screen reader users rely on breadcrumbs to understand where they are in your store.

## Images and media

Visual content is a huge accessibility gap on most WooCommerce stores.

- [ ] **Product images have descriptive alt text.** Go to Products in your WordPress dashboard, open a few products, and check the images. Alt text should describe what is in the image, not just repeat the product name. "Red running shoe with white sole" beats "Product image" every time. This is also good for [SEO](/blog/fix-missing-alt-text-woocommerce-product-images/).

- [ ] **Decorative images are marked as decorative.** Icons, backgrounds, and other purely decorative images should have empty alt attributes (`alt=""`). This tells screen readers to ignore them. If every image has alt text, screen reader users hear a lot of noise they do not need.

- [ ] **Product galleries work without a mouse.** Open a product with multiple images. Can you navigate the gallery with keyboard? Can you switch between thumbnails and the main image? Gallery sliders are one of the most common accessibility failures on e-commerce sites.

- [ ] **Videos have captions.** If you embed product videos, make sure they have captions. Not auto-generated captions that say "[music]" and get half the words wrong. Actual captions that match what is being said. YouTube and Vimeo both let you upload or edit captions.

- [ ] **Image sliders pause automatically.** Auto-rotating carousels are disorienting for screen reader users and people with cognitive disabilities. If you use a slider, make sure it pauses on hover and provides manual controls to navigate between slides.

## Forms and checkout

This is where accessibility directly affects your revenue. If someone cannot check out, you lose the sale. Period.

- [ ] **All form fields have labels.** Every input in your checkout, contact form, and search bar should have a visible label or an `aria-label`. Placeholder text is not a label. It disappears when the user starts typing, and screen readers do not always announce it.

- [ ] **Required fields are marked properly.** If a field is required, say so with a visible indicator and an `aria-required="true"` attribute. Do not just make the border red. Screen reader users need to know which fields they cannot skip.

- [ ] **Error messages are helpful and announced.** When someone submits a form with errors, the error message should appear near the field it relates to. It should also be announced to screen readers using an `aria-live` region. A red border with no explanation is not an error message. It is a mystery.

- [ ] **The checkout works with keyboard only.** Unplug your mouse and try to complete a purchase. Tab through every field, select a payment method, and submit the order. Pay attention to things like coupon code toggles, shipping calculators, and payment method radio buttons. These are where keyboard users get stuck.

- [ ] **Order confirmation is announced.** After submitting an order, the confirmation page should be clear and the page title should update. Screen reader users should not have to hunt for confirmation that their order went through.

## Color and visual design

These items catch problems that affect a wider range of users than you might expect.

- [ ] **Text has sufficient contrast.** Body text needs a contrast ratio of at least 4.5:1 against its background. Large text (18pt or 14pt bold) needs 3:1. This is a WCAG AA requirement. Light gray text on white backgrounds fails almost every time.

- [ ] **Information is not conveyed by color alone.** If you use red text to show an error, also add an icon, text label, or both. About 8% of men and 0.5% of women have some form of color vision deficiency. Do not rely on color to be the only signal.

- [ ] **Text can be resized to 200% without breaking.** Try zooming your browser to 200%. Does the text still fit on the screen? Can you read it without scrolling horizontally? If your layout breaks at high zoom levels, you are excluding people who need larger text.

- [ ] **Focus styles work on all backgrounds.** Check your focus indicator on buttons and links over both light and dark backgrounds. A blue focus ring on a blue button does not help anyone.

- [ ] **Touch targets are large enough.** On mobile, buttons and links should be at least 44x44 pixels. Small, tightly packed links are hard to tap for people with motor impairments. This includes the mobile menu toggle, quantity buttons, and social sharing links.

## Testing your checklist

Knowing what to check is one thing. Actually checking it is another. Here are the quickest ways to test without hiring anyone.

**The keyboard test.** Unplug your mouse. Can you navigate your entire store, add a product to cart, and complete checkout using only Tab, Shift+Tab, Enter, Space, and arrow keys? If you get stuck anywhere, that is a problem worth fixing.

**The screen reader test.** Download [NVDA](https://www.nvaccess.org/download/) (free, Windows) or press Command + F5 to start VoiceOver (built into Mac). Try to shop on your own store. What does the screen reader announce at each step? If the announcements do not make sense, your customers are having the same experience.

**The zoom test.** Set your browser to 200% zoom and use your store. Everything should still work. Nothing should overlap, overflow, or disappear.

**The contrast checker.** Use a free tool like the WebAIM Contrast Checker. Paste in your text color and background color. If the ratio is below 4.5:1 for body text, you need to darken your text or lighten your background.

**The automated scan.** Run your store through a tool like WAVE (wave.webaim.org) or axe DevTools. These catch the technical violations. They do not catch everything (automated tools miss about 60% of accessibility issues), but they are a fast first pass.

## How often to do this

Accessibility is not a one-time project. It is ongoing maintenance, like checking that your checkout still works after a WooCommerce update.

Run through this checklist:
- Before launching your store (obviously)
- After changing themes
- After adding or updating plugins
- After major content updates
- At least once a quarter

The quarterly check catches the slow drift that happens when plugins update and someone disables a feature they think is not important. It happens more often than you would think.

## The quick-start version

If this list feels overwhelming, here is your priority order. Do these five things first, and you will cover the biggest risks.

1. Add alt text to every product image. This is the single most common accessibility issue on e-commerce sites, and it is also the easiest to fix.

2. Make sure your checkout works with keyboard only. If someone cannot buy something, nothing else matters.

3. Check your color contrast. Bad contrast is the second most common issue and it affects everyone, not just people with disabilities.

4. Add a skip link. It takes five minutes and immediately helps keyboard and screen reader users.

5. Test with a screen reader once. Just once. You will learn more in ten minutes of using NVDA or VoiceOver than in an hour of reading about accessibility.

The [WooCommerce Accessibility Fixer plugin](/plugins/woocommerce-accessibility-fixer/) handles most of these items automatically. It fixes alt text, keyboard navigation, focus indicators, ARIA labels, and other common issues. It will not make your store perfect, but it gets you most of the way there without touching code.

## Related Reading

- [How to Test Your WooCommerce Store for Screen Readers](/blog/how-to-test-woocommerce-screen-readers/) - A step-by-step guide to testing with NVDA and VoiceOver
- [How to Fix Keyboard Navigation in WooCommerce](/blog/keyboard-navigation-woocommerce-fix-guide/) - Fix the most common keyboard navigation issues
- [10 Common Accessibility Issues on E-commerce Sites](/blog/10-common-accessibility-issues-on-e-commerce-sites/) - The problems you are most likely to find on your store
- [WooCommerce Accessibility Fixer](/plugins/woocommerce-accessibility-fixer/) - Automate common accessibility fixes with one plugin
