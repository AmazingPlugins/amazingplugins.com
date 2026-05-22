---
title: "WCAG 2.2 Compliance WooCommerce: The Full Checklist"
description: "A WooCommerce-specific WCAG 2.2 AA checklist. Every new criterion, what to check on your store, and how to fix it if you're failing."
pubDate: 2026-05-22T13:03:41.048Z
author: "Harun Ray"
tags:
  - "WooCommerce"
  - "Accessibility"
  - "WCAG 2.2"
  - "Compliance"
  - "Checklist"
seoKeywords:
  - "`WCAG 2.2 compliance woocommerce`"
seoCategory: "woocommerce"
articleAngle: "checklist"
gscSubmitted: false
---

If you run a WooCommerce store and you want to know whether you meet WCAG 2.2 AA, the short answer is this: you need to pass the 50 WCAG 2.1 AA criteria you already had to pass, plus six new ones that landed in WCAG 2.2 (four at AA, two at A). For a WooCommerce shop, the criteria most likely to fail you are the new ones around focus visibility (2.4.11), tap target size on mobile (2.5.8), the cognitive accessibility rules (3.2.6, 3.3.7, 3.3.8), and the dragging rule (2.5.7). The rest of this WCAG 2.2 compliance WooCommerce checklist walks you through every item with the exact place to look in your store and what to do if it fails.

## Quick answer

WCAG 2.2 AA = WCAG 2.1 AA + 6 new success criteria (4 at AA, 2 at A) minus one criterion that was removed (4.1.1 Parsing). The new AA criteria you actually need to pass on a WooCommerce store are:

- **2.4.11 Focus Not Obscured (Minimum)** - AA
- **2.5.7 Dragging Movements** - AA
- **2.5.8 Target Size (Minimum)** - AA (24x24 CSS pixels)
- **3.3.8 Accessible Authentication (Minimum)** - AA

Plus two at Level A you also need (because A is a prerequisite for AA):

- **3.2.6 Consistent Help** - A
- **3.3.7 Redundant Entry** - A

If you've already done the work for ADA / WCAG 2.1 AA on WooCommerce, you are roughly 85% of the way there. The remaining 15% is mostly checkout, account login, and mobile button sizing. If you haven't done that earlier work, start with the [full WooCommerce ADA compliance guide](https://amazingplugins.com/blog/2026-04-16-how-to-make-your-woocommerce-store-ada-compliant/) first, then come back to this checklist.

## Why this checklist exists

WCAG 2.2 became a W3C Recommendation in October 2023 and is now the de facto best-practice standard for 2026. WCAG 2.1 AA is still the legal floor under the ADA in the US and EN 301 549 / the European Accessibility Act in the EU (enforceable since June 28, 2025), but plaintiffs' firms and EU regulators are starting to cite 2.2. WooCommerce core shipped over 140 accessibility enhancements in 2025 specifically aligned with WCAG 2.2 AA, which means the platform itself is mostly cooperating with you. Your theme, custom blocks, and checkout extensions are usually where the failures hide.

If you want the full background on what changed between 2.1 and 2.2 for WooCommerce specifically, read [WCAG 2.2 compliance for WooCommerce: what changed](https://amazingplugins.com/blog/2026-05-22-wcag-22-compliance-woocommerce-what-changed/) before working through the list below.

## The WCAG 2.2 WooCommerce checklist

For each item: **Check** (where to look on your store), **Standard** (the bar you must clear), **Fix** (what to do if you fail).

### Section 1 - The new WCAG 2.2 criteria (start here)

#### 1. Focus Not Obscured - Minimum (2.4.11, AA, NEW)

**Check:** Tab through your store with the keyboard. Open a product page, tab to "Add to Cart", then keep tabbing into the sticky header, sticky add-to-cart bar, cookie banner, chat widget, or mini-cart drawer.

**Standard:** When an element receives keyboard focus, it must not be entirely hidden by author-created content (sticky bars, overlays, cookie banners count).

**Fix:** Add `scroll-margin-top` equal to your sticky header height on focusable elements, or shrink the sticky header on focus. For cookie banners and chat widgets, make sure they don't sit on top of the focused element. The Astra, Kadence, and Blocksy themes have shipped fixes for this in 2025 releases - update your theme.

#### 2. Dragging Movements (2.5.7, AA, NEW)

**Check:** Any feature where users drag - image zoom sliders, product gallery swipers, range price filters, drag-to-reorder wishlists, signature pads.

**Standard:** Any function that uses a dragging movement must also work with a single pointer click or tap without dragging.

**Fix:** The WooCommerce price filter block now ships with `+` / `-` buttons and number inputs alongside the slider - use that block instead of older slider-only plugins. For product gallery swipers (FlexSlider, Swiper.js), expose previous/next buttons. For wishlist reordering, add up/down arrow buttons.

#### 3. Target Size - Minimum (2.5.8, AA, NEW)

**Check:** Open your store on mobile. Measure your "Add to Cart" button, quantity +/- buttons, mini-cart icon, variation swatches, pagination links, and footer social icons.

**Standard:** Interactive targets must be at least 24x24 CSS pixels, OR have 24px of spacing around them so the effective tap area is 24x24. Exceptions: inline links in sentences, browser-controlled controls, and where size is essential.

**Fix:** The classic place this fails is the quantity stepper on the product page (often 18x18 by default) and color/size swatches that hug each other. Add CSS: `.quantity input, .quantity button  min-width: 24px; min-height: 24px; ` and add at least 4px margin between swatches. WooCommerce 9.4+ ships compliant defaults - if you're on an older version, update.

#### 4. Consistent Help (3.2.6, A, NEW)

**Check:** Your contact link, live chat icon, help/FAQ link. Visit your homepage, a product page, the cart, and checkout.

**Standard:** If help mechanisms (contact info, chat, FAQ link, self-help) appear on multiple pages, they must appear in the same relative order on each page.

**Fix:** Don't move the chat widget from bottom-right to top-right between pages. Don't hide the contact link in the header on product pages but in the footer on checkout. Pick one location per help type and keep it consistent.

#### 5. Redundant Entry (3.3.7, A, NEW)

**Check:** Your checkout flow. If you have a multi-step checkout, or shipping-different-from-billing, or any "create account at checkout" flow.

**Standard:** Information the user already entered in the same session/process must be auto-filled or available to select - they shouldn't have to type their email a second time.

**Fix:** The default WooCommerce checkout block already does this (the "shipping address same as billing" toggle, and account email pre-fill). Custom checkout plugins (CartFlows, FunnelKit) sometimes break it. Test the full path and add a "copy from billing" button anywhere you ask for the same data twice.

#### 6. Accessible Authentication - Minimum (3.3.8, AA, NEW)

**Check:** My Account login page, checkout login, password reset, any CAPTCHA, any 2FA flow.

**Standard:** A cognitive function test (memorizing a password, solving a puzzle CAPTCHA, transcribing characters from an image) cannot be required to authenticate, unless one of these alternatives is available: an alternative method that doesn't require it, a mechanism to help (like a password manager with browser autofill working), object recognition, or personal-content recognition.

**Fix:** Make sure your login form has `autocomplete="current-password"` and `autocomplete="username"` so password managers work - WooCommerce core handles this, but some membership plugins override it. Replace image-based CAPTCHAs with reCAPTCHA v3 (invisible) or hCaptcha's accessibility cookie flow. If you offer magic-link login or social login as an option, you're covered.

### Section 2 - The WCAG 2.1 AA criteria still in force

These didn't change, but you still need them. Run through these at minimum:

- **1.1.1 Non-text Content (A):** Every product image has meaningful alt text. Decorative images use empty `alt=""`.
- **1.3.1 Info and Relationships (A):** Headings are real `<h1>`/`<h2>`, not styled divs. Product attribute tables use `<th>`.
- **1.4.3 Contrast Minimum (AA):** Body text has 4.5:1 contrast against background. Sale prices and "on sale" badges are usually the failure point.
- **1.4.10 Reflow (AA):** Page works at 320px wide without horizontal scrolling.
- **1.4.11 Non-text Contrast (AA):** Buttons, form borders, and focus indicators have 3:1 contrast.
- **2.1.1 Keyboard (A):** Everything works with Tab, Shift+Tab, Enter, Space, and arrow keys. Variation swatches are the usual offender.
- **2.4.3 Focus Order (A):** Tab order matches visual order. Mega menus and modal dialogs are common failures.
- **2.4.7 Focus Visible (AA):** You can see where keyboard focus is. If your theme has `outline: none` on `:focus`, fix it now.
- **3.3.2 Labels or Instructions (A):** Every form field has a real `<label>`. Placeholder text is not a label.
- **4.1.2 Name, Role, Value (A):** Custom widgets (accordions, tabs, modals) have correct ARIA roles and states.

Note: **4.1.1 Parsing was removed in WCAG 2.2.** You no longer have to validate HTML for compliance. (You should still write valid HTML, but it's not a WCAG failure anymore.)

### Section 3 - WooCommerce-specific hot spots

These are the places stores actually fail audits, by frequency:

1. **Product image alt text.** Bulk-imported products usually have alt text equal to the filename (`IMG_4521.jpg`) or empty. Either is a 1.1.1 failure.
2. **Variation swatches without accessible names.** Color swatches showing just a colored square with no text label fail 1.1.1 and 4.1.2.
3. **Sale badges and price strikethroughs.** Red sale text on light backgrounds rarely hits 4.5:1. Strikethrough on the regular price needs to also be conveyed non-visually.
4. **Add to Cart confirmation.** When the page silently updates the mini-cart, screen reader users get no announcement. Needs an ARIA live region.
5. **Checkout error messages.** "Please enter a valid postcode" needs to be associated with the postcode field via `aria-describedby` and announced.
6. **Quantity stepper buttons.** Too small for 2.5.8 on mobile in older themes.
7. **Modal product quick-view.** Usually missing focus trap, missing Escape-to-close, missing return-focus-to-trigger.

## How AmazingPlugins helps

The [WooCommerce Accessibility Fixer](https://amazingplugins.com/) scans your store against WCAG 2.2 AA and applies real HTML and CSS fixes where it can. It's not an overlay or a JavaScript widget that pretends to fix things at runtime.

For this checklist specifically, the plugin handles:

- **Alt text** on product images using your product title and attributes as a fallback (you still review for meaningful descriptions)
- **Focus indicators** that meet 1.4.11 and 2.4.7 across themes that strip them
- **Skip links** and **lang attribute** so screen reader users land in the right place
- **ARIA form labels** on the WooCommerce login, registration, and checkout forms
- **Accessible input names** for the quantity stepper and variation swatches
- **Color contrast** detection with specific CSS overrides per theme
- **Link distinguishing text** so "Read more" links get a context-aware accessible name
- **Empty button text** filled with sensible defaults

The Pro tier adds batch scanning across every product, an auto-fix mode for safe changes, and a PDF compliance report you can hand to your lawyer or attach to an accessibility statement. What it doesn't do: write genuinely meaningful alt text for product photography (that's a human judgment call) or restructure custom page builder layouts that conflict with the heading order. You still own those calls.

If you want the broader 2026 picture, including legal exposure and the EAA deadline, see [WCAG 2.2 compliance for WooCommerce: what changed](https://amazingplugins.com/blog/2026-05-22-wcag-22-compliance-woocommerce-what-changed/).

## Frequently asked questions

### Is WCAG 2.2 legally required for a WooCommerce store?

Not as the floor. In the US, courts settle ADA lawsuits against the WCAG 2.1 AA standard. In the EU, the European Accessibility Act references EN 301 549, which currently aligns with WCAG 2.1 AA. But WCAG 2.2 is the standard most new audits, procurement contracts, and accessibility statements reference as of 2026, and EN 301 549 is expected to update to 2.2. Treat 2.1 AA as the legal minimum and 2.2 AA as the actual target.

### How long does it take to get a WooCommerce store to WCAG 2.2 AA?

A small store on a well-maintained theme with under 200 products: 2 to 4 weeks of focused work, including audit, fixes, and verification. A larger store with custom checkout, page builders, and 1000+ products: 2 to 4 months. Most of the time is spent on per-product content (alt text, descriptions) rather than code.

### Can a plugin make my WooCommerce store fully WCAG 2.2 compliant on its own?

No. Automated tools catch 30 to 50 percent of failures (the deterministic ones: missing alt attribute, low contrast, missing label). Judgment calls (is this alt text meaningful, is the page structure logical, does the error message actually help) need a human. Any plugin or overlay that claims 100% automated compliance is misleading you, and the FTC has taken action against vendors making that claim.

### What about the European Accessibility Act deadline?

The EAA has been enforceable since June 28, 2025 for all e-commerce sites selling to EU consumers, regardless of where the business is based. The technical standard is EN 301 549, which currently equals WCAG 2.1 AA. If you pass this WCAG 2.2 checklist, you exceed the EAA requirement. Some EU member states (Germany's BFSG, France's RGAA) have additional local requirements on top.

### Do I need an accessibility statement?

Not strictly required by ADA, but strongly recommended and explicitly required under several EU member state laws. It signals good faith, documents what you've done, and gives users a contact path. Include: the standard you target (WCAG 2.2 AA), known limitations, the date of last review, and a contact email for accessibility issues.

## Where to start tomorrow morning

If this list feels like a lot, run it in this order and you'll cover the highest-risk items first:

1. Run an automated scan on your homepage, a product page, the cart, and checkout. (Free tools: WAVE, axe DevTools.)
2. Tab through those same four pages with the keyboard only. Note anywhere focus disappears or you can't reach something.
3. Open the same pages on a phone. Check button sizes.
4. Fix the top 10 issues. Repeat. The first pass usually covers 70% of legal exposure.

That's the checklist. Bookmark it, work through it once a quarter, and document what you've done in an accessibility statement on your store. That alone puts you ahead of 95.9% of websites, which is the share that still has WCAG 2 failures on their home page according to the 2026 WebAIM Million report.
