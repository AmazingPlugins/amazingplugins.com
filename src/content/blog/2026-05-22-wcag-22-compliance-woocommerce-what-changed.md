---
title: "WCAG 2.2 Compliance for WooCommerce: What Changed"
description: "What WCAG 2.2 actually changed for WooCommerce stores. The 9 new success criteria, what they mean for checkout, and what to fix first."
pubDate: 2026-05-22T13:02:00.824Z
author: "Harun Ray"
tags:
  - "WCAG 2.2"
  - "WooCommerce"
  - "Accessibility"
  - "ADA Compliance"
  - "What Changed"
seoKeywords:
  - "`WCAG 2.2 compliance woocommerce`"
seoCategory: "woocommerce"
articleAngle: "what-changed"
gscSubmitted: false
---

WCAG 2.2 added **nine new success criteria** on top of WCAG 2.1, and for WooCommerce store owners the most important ones touch checkout, login, focus visibility, and how big your buttons are. The standard was finalized in October 2023, and by 2026 it has become the de facto best-practice level that auditors, EU regulators, and US plaintiffs' lawyers reference. WCAG 2.1 AA is still the legal floor in most jurisdictions, but WCAG 2.2 AA is what you should be aiming for if you sell online today.

If you only have 10 minutes to understand what changed, this article gives you the practical version: what's new, what got removed, what's likely to break on a default WooCommerce theme, and where to start fixing.

## Quick answer

WCAG 2.2 adds nine new success criteria and removes one. The additions focus on:

- **Focus visibility** (you can actually see where your keyboard is)
- **Drag alternatives** (no checkout step should require dragging)
- **Target size** (buttons big enough to tap)
- **Cognitive load at login** (no memory puzzles, no re-entering data)
- **Help that stays in the same place across pages**

The one criterion that was removed is **4.1.1 Parsing**, because modern browsers handle malformed HTML well enough that it stopped being a real barrier.

For a WooCommerce store, the practical impact lands on three areas: the checkout flow, the My Account login, and any product page that uses sliders, drag-to-zoom, or small icon buttons.

## The nine new WCAG 2.2 success criteria

Here is the full list, with the WCAG number, the level, and what it means in plain English for an online store.

### 2.4.11 Focus Not Obscured (Minimum) - Level AA

When a keyboard user tabs to an element, the focus indicator must not be **completely hidden** by other content. Sticky headers, cookie banners, chat widgets, and announcement bars are the usual offenders on WooCommerce sites. If your sticky header covers the input field a user just tabbed to, that's a 2.4.11 failure.

### 2.4.12 Focus Not Obscured (Enhanced) - Level AAA

Same idea, but stricter: **no part** of the focused element can be obscured. AAA is optional, but worth knowing.

### 2.4.13 Focus Appearance - Level AAA

The focus indicator must be at least 2 CSS pixels thick around the element, with a contrast ratio of at least 3:1 against adjacent colors. AAA, but the principle is the same as 1.4.11: a barely-visible blue outline that the browser ships with is not enough on a busy product page.

### 2.5.7 Dragging Movements - Level AA

Any function that uses a dragging movement must also work with a single-pointer click or tap. The common WooCommerce trip-ups here: image zoom sliders, color picker sliders for variable products, and product gallery carousels that only respond to swipe.

### 2.5.8 Target Size (Minimum) - Level AA

Interactive targets must be at least **24x24 CSS pixels**, unless there's enough spacing around them. The previous AAA version (2.5.5) asked for 44x44, which most themes already fail. The new AA bar at 24x24 is reachable, but you'll still see failures on quantity steppers (+/-), social share icons, and pagination dots.

### 3.2.6 Consistent Help - Level A

If your store offers help (a contact link, a chat widget, a support phone number), it must appear in **the same relative order on every page**. WooCommerce stores often have a help link in the footer on the storefront but not on the checkout page, which is now a failure.

### 3.3.7 Redundant Entry - Level A

Users shouldn't have to re-enter information they already provided in the same session. Classic WooCommerce failure: a multi-step checkout that asks for the billing address, then asks again for the shipping address with no "same as billing" option pre-filled.

### 3.3.8 Accessible Authentication (Minimum) - Level AA

No cognitive function tests at login. That means no "what was the name of your first pet" puzzle, no "transcribe this distorted text," no math problem. You **can** use CAPTCHAs that test for object recognition ("select all images with a bus"), and you **can** require passwords if the user is allowed to paste from a password manager.

For WooCommerce, the practical fix is: don't use CAPTCHA plugins that ask for character transcription on the My Account login or the checkout. Use reCAPTCHA v3 or hCaptcha invisible mode instead.

### 3.3.9 Accessible Authentication (Enhanced) - Level AAA

Stricter version: no object recognition either. AAA, so optional.

## What was removed: 4.1.1 Parsing

WCAG 2.1's 4.1.1 required HTML to be well-formed. In WCAG 2.2, this criterion is **obsolete and removed**. Modern browsers and screen readers handle parsing issues consistently enough that the criterion no longer mapped to a real accessibility barrier.

If you've ever been told to fix duplicate IDs or unclosed tags for accessibility, that's no longer a WCAG requirement (though it's still good hygiene). Other criteria, like 4.1.2 Name, Role, Value, still apply.

## What this means for a default WooCommerce store

A stock WooCommerce install on a popular theme (Storefront, Astra, Kadence, Blocksy) will typically pass some of the new 2.2 criteria and fail others. Here's where the failures usually land:

**Likely fails out of the box:**

- Quantity stepper buttons (+/- on the cart and product page) under 24x24px → 2.5.8
- Sticky header covers the focused field on checkout → 2.4.11
- Help link in footer not visible during checkout → 3.2.6
- Shipping address form doesn't pre-fill from billing → 3.3.7

**Usually passes:**

- 2.5.7 Dragging - most WooCommerce galleries already support tap navigation
- 3.3.8 Auth - if you're using reCAPTCHA v3 (invisible) instead of v2 (image puzzle)

If you want a deeper checklist beyond just the 2.2 deltas, see our [WCAG 2.2 Compliance Shopify checklist](https://amazingplugins.com/blog/wcag-22-compliance-shopify-checklist/) (most items apply to WooCommerce too) and the broader [How to Make Your WooCommerce Store ADA Compliant](https://amazingplugins.com/blog/2026-04-16-how-to-make-your-woocommerce-store-ada-compliant/) guide.

## A 30-minute audit for the WCAG 2.2 changes

You don't need a full audit to know where you stand on the new criteria. Here's a fast pass:

1. **Tab through your checkout.** Use only the Tab and Shift+Tab keys. Note any field where the focus ring goes behind your sticky header. That's 2.4.11.
2. **Measure your quantity buttons.** Open dev tools, hover over the +/- buttons, check the computed width and height. Under 24px without spacing? 2.5.8 failure.
3. **Open your checkout in mobile view.** Look for the help link or contact info. If it's in the footer on the storefront but missing on /checkout, that's 3.2.6.
4. **Place a test order.** Does the shipping address auto-fill from billing, or do you re-type it? Re-typing is 3.3.7.
5. **Log out, then log in.** Did you have to solve a puzzle, transcribe distorted text, or answer a memory question? If yes, 3.3.8.
6. **Try dragging a product image to zoom.** Now try just tapping or clicking. If only drag works, that's 2.5.7.

This won't catch everything, but it will catch the WCAG 2.2-specific issues on your store in about 30 minutes.

## WCAG 2.1 vs 2.2: what's the same

It's worth saying out loud: **2.2 is a superset of 2.1**. Everything in 2.1 still applies. Alt text, color contrast (4.5:1 for normal text), keyboard navigation, form labels, page language, skip links - all of that is unchanged.

If your store is already solid on WCAG 2.1 AA, you're 90% of the way to 2.2 AA. The new criteria are real, but they're focused additions, not a rewrite.

For a comparison of how the levels stack up, see [WCAG 2.1 AA vs AAA: What's the Real Difference for E-commerce?](https://amazingplugins.com/blog/2026-04-21-wcag-2-1-aa-vs-aaa-what-s-the-real-difference-for-e-commerce/).

## Why this matters in 2026

A few numbers that make the case:

- **5,114 to 8,667** ADA digital accessibility lawsuits were filed in 2025 (sources vary on whether they count federal only or federal plus state).
- The average settlement cost is around **$25,000**, before legal fees.
- The **European Accessibility Act** became enforceable on **June 28, 2025**, and it uses EN 301 549, which maps to WCAG 2.1 AA. EU enforcement bodies and audit firms increasingly reference 2.2 as the working standard.
- **95.9%** of home pages have detectable WCAG failures (WebAIM Million 2026).

WCAG 2.2 isn't legally required in most jurisdictions yet, but if you're being audited, sued, or asked for documentation, 2.2 AA is what reviewers will look at.

## How AmazingPlugins helps

The [WooCommerce Accessibility Fixer](https://amazingplugins.com/woocommerce-accessibility-fixer/) is built around the issues most likely to fail WCAG 2.1 and 2.2 on a WooCommerce store. It's a plugin, not an overlay, so the fixes happen at the HTML and CSS layer:

- **Focus indicators** that meet 2.4.11 visibility requirements, with a configurable outline thickness and contrast
- **ARIA form labels** on checkout fields that ship without them in some themes
- **Alt text scanning** for product images, with a flag for empty alt attributes
- **Color contrast detection** for text against your theme's backgrounds
- **Skip links** so keyboard users can bypass the header
- **Empty button text** detection (common on icon-only buttons that fail 4.1.2)
- **Lang attribute** verification on the html element
- **Accessible input names** on quantity steppers and search fields

The Pro version adds batch scanning across your full catalog, an auto-fix mode for cases where the fix is safe to apply automatically, and a PDF compliance report you can hand to a lawyer or auditor.

What the plugin won't do: write meaningful alt text for you, fix a fundamentally broken checkout flow, or replace human review for judgment calls. Automated tools handle the common, mechanical WCAG failures well. The judgment-based work, like writing alt text that actually describes the product in context, still needs you.

## People also ask

### Is WCAG 2.2 legally required for WooCommerce stores?

Not yet, in most jurisdictions. The US ADA doesn't name a specific WCAG version, but plaintiffs typically reference WCAG 2.1 AA. The European Accessibility Act references EN 301 549, which aligns with WCAG 2.1 AA. WCAG 2.2 AA is the best-practice target, and auditors increasingly use it, but the legal floor is still 2.1 AA in 2026.

### What's the biggest WCAG 2.2 change for ecommerce specifically?

**3.3.7 Redundant Entry** and **3.3.8 Accessible Authentication**. Both directly affect checkout and account creation, which is where ecommerce sites lose customers and get sued. If you can't fix everything, fix these two first.

### Does my theme need to be updated for WCAG 2.2?

Probably yes, at least partially. Most popular WooCommerce themes were built against WCAG 2.1 AA. Check your theme changelog: many of them (Storefront, Astra, Kadence) have shipped 2.2-related updates since late 2024. Update first, then test the new criteria against your live site.

### Will an accessibility overlay make my store WCAG 2.2 compliant?

No. Overlays inject JavaScript that toggles styles, but they don't fix the underlying HTML. Plaintiffs' law firms and accessibility consultants now explicitly target sites using overlays. The FTC's 2024 case against accessiBe made this position clear. Use a fixer that edits the real markup, not a widget that paints over it.

### How long does it take to fix a WooCommerce store for WCAG 2.2?

For a small store (one theme, under 100 products, standard checkout), most owners can hit 2.1 AA in 4 to 8 hours of work plus a plugin, and 2.2 AA in another 2 to 4 hours on top. Larger catalogs or heavily customized checkout flows take proportionally longer. The 30-minute audit above will give you a realistic estimate for your specific store.

