---
title: "WCAG 2.2 Compliance Shopify Checklist (2026)"
description: "A practical WCAG 2.2 compliance checklist for Shopify store owners. Every criterion that matters, what to test, and how to fix it if you fail."
pubDate: 2026-05-16T13:04:36.069Z
author: "Harun Ray"
tags:
  - "WCAG 2.2"
  - "Shopify"
  - "Accessibility"
  - "ADA Compliance"
  - "Checklist"
seoKeywords:
  - "`WCAG 2.2 compliance shopify`"
seoCategory: "shopify"
articleAngle: "checklist"
gscSubmitted: false
---

If you run a Shopify store and want to know exactly where you stand on WCAG 2.2 compliance, here it is: WCAG 2.2 AA is the current best-practice standard, WCAG 2.1 AA is still the legal floor under the ADA and the EAA, and most Shopify themes fail roughly 6 to 8 success criteria straight out of the box. This checklist walks through every WCAG 2.2 success criterion that actually matters for a Shopify storefront, what to test, and what to do if you fail.

## Quick answer

Start with the nine new WCAG 2.2 success criteria, then work through the 50 that carried over from 2.1 AA. The new 2.2 items are where most 2026 Shopify themes break:

1. 2.4.11 Focus Not Obscured (Minimum) AA
2. 2.4.12 Focus Not Obscured (Enhanced) AAA
3. 2.4.13 Focus Appearance AAA
4. 2.5.7 Dragging Movements AA
5. 2.5.8 Target Size (Minimum) AA
6. 3.2.6 Consistent Help A
7. 3.3.7 Redundant Entry A
8. 3.3.8 Accessible Authentication (Minimum) AA
9. 3.3.9 Accessible Authentication (Enhanced) AAA

Fix the A and AA items. You can skip the AAA ones unless you are going for full conformance. Once those are clean, you still have to clear the 50 inherited 2.1 AA criteria: alt text, color contrast, keyboard navigation, form labels, and the rest.

Want the background on what is actually new in 2.2 versus 2.1? Read [WCAG 2.2 Compliance for Shopify: What Actually Changed](https://amazingplugins.com/blog/2026-05-16-wcag-22-compliance-shopify-what-changed/) first, then come back to this checklist.

## The WCAG 2.2 Shopify checklist

### Section 1: The nine new WCAG 2.2 criteria

#### 2.4.11 Focus Not Obscured Minimum (AA)

**Check:** Tab through your store with the keyboard. When an element receives focus, is any part of it hidden behind a sticky header, sticky add-to-cart bar, announcement bar, or cookie banner?

**Standard:** At least part of the focused element must remain visible.

**Fix:** Set `scroll-padding-top` in CSS to match your sticky header height, or add `scroll-margin-top` to focusable elements. For cookie banners, make sure they trap focus when open and release it when dismissed.

#### 2.5.7 Dragging Movements (AA)

**Check:** Any feature that requires a drag gesture: image sliders with drag-to-pan, quantity steppers, color swatches, size selectors built as drag controls.

**Standard:** Every dragging action must have a single-pointer alternative (tap, click, or button).

**Fix:** Add visible arrow buttons next to drag-only sliders. Replace draggable carousels with prev/next buttons. Almost every Shopify hero slider needs this.

#### 2.5.8 Target Size Minimum (AA)

**Check:** Buttons, links, and form controls must be at least 24x24 CSS pixels, with exceptions for inline links in text.

**Standard:** 24x24 px minimum.

**Fix:** Audit your icon buttons (cart, search, wishlist, hamburger menu, social icons). Most Shopify themes ship some at 20x20. Increase padding, not just the icon size.

#### 3.2.6 Consistent Help (A)

**Check:** If you have a help link, chat widget, contact email, or phone number, it has to appear in the same relative order on every page that includes it.

**Standard:** Help mechanisms appear in a consistent location.

**Fix:** Do not hide chat on product pages while showing it on collection pages. Do not shuffle the contact link between footer columns on different templates.

#### 3.3.7 Redundant Entry (A)

**Check:** Multi-step checkout and account flows. Does the form re-ask for information the user already gave in the same session?

**Standard:** Previously entered information must be auto-populated or available to select.

**Fix:** Shopify Checkout handles most of this for you. Audit any custom checkout extensions, post-purchase pages, or third-party upsell apps that ask for shipping or contact details again.

#### 3.3.8 Accessible Authentication Minimum (AA)

**Check:** Login, account creation, password reset. Are users forced to solve an image CAPTCHA, remember a long password with no paste support, or recognize objects?

**Standard:** No cognitive function test, or an alternative must exist.

**Fix:** Allow paste in password fields. Many themes block paste with JavaScript. Remove that. Offer email magic-link or Shop Pay login. Use Cloudflare Turnstile instead of image CAPTCHAs.

Skip 2.4.12, 2.4.13, and 3.3.9. Those are AAA and not legally required.

### Section 2: The inherited 2.1 AA criteria that most often fail on Shopify

Most ADA lawsuits cite these, not the new 2.2 items. Here are the worst offenders:

#### 1.1.1 Non-text Content (A)

**Check:** Every product image, banner, icon button, and decorative image.

**Standard:** Meaningful images need descriptive alt text. Decorative images need `alt=""`.

**Fix:** Product images get alt text from the Shopify product editor. Theme banner images need Liquid edits in the section settings. Icon-only buttons need `aria-label`.

#### 1.4.3 Contrast Minimum (AA)

**Check:** Body text 4.5:1 against background. Large text (18pt+, or 14pt+ bold) needs 3:1.

**Fix:** Run your theme through WebAIM Contrast Checker. Update theme color tokens in your theme settings. Common failures: light gray placeholder text, sale badges on pale pink, footer copyright in #999 on white.

#### 1.4.11 Non-text Contrast (AA)

**Check:** Form input borders, icon buttons, focus indicators.

**Standard:** 3:1 against adjacent colors.

**Fix:** Darken input borders from `#ddd` (which fails) to at least `#767676` against white.

#### 2.1.1 Keyboard (A)

**Check:** Can you reach and operate every interactive element with just Tab, Shift+Tab, Enter, Space, and arrow keys?

**Fix:** Custom dropdowns, mega menus, and modal popups are the usual failures. Replace `<div onclick>` with real `<button>` elements.

#### 2.4.7 Focus Visible (AA)

**Check:** Tab through. Is there a clear visible outline on the focused element?

**Fix:** Remove `outline: none` from your CSS. Add a 3px solid outline in a contrasting color. Shopify Dawn does this; many premium themes do not.

#### 3.3.2 Labels or Instructions (A)

**Check:** Every form field has a visible or programmatic label.

**Fix:** Newsletter signups, search bars, and contact forms commonly use placeholder-only labels. Add real `<label>` elements or `aria-label`.

#### 4.1.2 Name, Role, Value (A)

**Check:** Custom components (toggles, tabs, accordions, sliders) expose name, role, and state to assistive tech.

**Fix:** Add `role`, `aria-expanded`, `aria-selected`, and `aria-controls` where needed.

### Section 3: Shopify-specific gotchas

These are not separate WCAG criteria, but they are the items only Shopify owners hit:

- **Theme app blocks.** Sections from third-party apps rarely follow the theme's accessibility patterns. Audit each one separately.
- **Predictive search.** The default Shopify search dropdown is usually fine. Custom search apps (Searchanise, Boost) often are not.
- **Sticky add-to-cart bar.** Frequently obscures focus (fails 2.4.11) and is often not keyboard-reachable.
- **Quick view modals.** Frequently miss focus traps and do not return focus to the trigger button on close.
- **Currency and language pickers.** Often built as `<div>` menus instead of real `<select>` elements.
- **Age verification popups.** Many block keyboard access entirely.
- **Cookie consent banners.** Most third-party banners (Termly, Cookiebot free tier) fail focus management and contrast.

## How to actually run this audit

1. Install axe DevTools or WAVE browser extension. Both are free.
2. Run them on your home page, one collection page, one product page, the cart, and checkout.
3. Tab through each page top to bottom with no mouse. Note where focus disappears, gets stuck, or jumps somewhere unexpected.
4. Test with a screen reader on the same five page types. VoiceOver on Mac is built in. NVDA on Windows is free.
5. Check color contrast on text and UI elements with WebAIM Contrast Checker.
6. Write down what you found. Fix the A and AA items. Document the AAA items as future work.

For an average Shopify store this takes 4 to 8 hours the first time. Run it quarterly after that.

## How AmazingPlugins helps

Going through this checklist by hand is realistic if you have done it before. If you have not, the [Shopify Accessibility Fixer](https://amazingplugins.com/) automates the parts that can safely be automated:

- Scans every page for the common 2.1 AA failures: missing alt text, color contrast, empty button text, missing form labels, missing `lang` attribute, link distinguishability, focus indicators.
- Adds skip links and improves keyboard navigation in your theme without using an overlay.
- Generates a PDF compliance report you can hand to legal or attach to your accessibility statement.
- Auto-fixes the safe items (alt text from product titles, ARIA labels on form inputs, focus styles) without rewriting your theme files.

What it will not do: judgment calls on meaningful alt text for marketing banners, audits of custom checkout extensions, or fixing fundamentally broken third-party app blocks. Those need a human. We are upfront about that because automated tools that promise one-click compliance are the same overlays that got accessiBe sued.

If you are still weighing tools, the [Best Accessibility App for Shopify (2026 Buyer's Guide)](https://amazingplugins.com/blog/2026-05-13-best-accessibility-app-shopify-full-guide/) compares the main options head to head.

## Frequently asked questions

### Is WCAG 2.2 legally required for Shopify stores?

Not yet. The legal floor in the US (ADA) and EU (EAA) is still WCAG 2.1 AA. But courts and plaintiff's lawyers are increasingly citing 2.2 as the current standard, and 2.2 is fully backward compatible with 2.1. Meeting 2.2 AA is the safer play and not significantly more work.

### How much does WCAG 2.2 compliance cost for a Shopify store?

A DIY audit and fix cycle is 4 to 16 hours of your time. A professional audit runs $2,000 to $8,000 depending on store size. An accessibility app with auto-fix runs $15 to $99 per month. The average ADA lawsuit settlement is around $25,000, with 5,114 to 8,667 filed in 2025 alone.

### Do Shopify themes pass WCAG 2.2 out of the box?

No. Even Shopify's own free themes (Dawn, Sense, Refresh) ship with accessibility issues: low contrast sale badges, missing form labels in some sections, target sizes under 24px. They are closer than most paid themes, but none of them are compliant by default.

### What about EAA compliance?

The European Accessibility Act became enforceable on June 28, 2025. It uses WCAG 2.1 AA as its technical standard via EN 301 549. If you sell to EU consumers, see [How to Make Your Shopify Store EAA Compliant](https://amazingplugins.com/blog/2026-05-06-how-to-make-your-shopify-store-eaa-compliant/).

### Do accessibility overlays satisfy WCAG 2.2?

No. The FTC and multiple courts have ruled that overlay widgets do not fix underlying code issues. Stores running accessiBe, UserWay, EqualWeb, and similar widgets still get sued. Compliance has to live in the HTML, CSS, and ARIA. A JavaScript layer on top does not count.

