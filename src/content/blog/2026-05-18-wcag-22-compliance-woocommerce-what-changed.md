---
title: "WCAG 2.2 Compliance WooCommerce: What Actually Changed"
description: "WCAG 2.2 added 9 new success criteria. Here's exactly what changed from 2.1, which ones hit WooCommerce stores hardest, and how to fix them."
pubDate: 2026-05-18T13:02:18.279Z
author: "Harun Ray"
tags:
  - "WooCommerce"
  - "WCAG 2.2"
  - "Accessibility"
  - "ADA Compliance"
  - "WordPress"
seoKeywords:
  - "`WCAG 2.2 compliance woocommerce`"
seoCategory: "woocommerce"
articleAngle: "what-changed"
gscSubmitted: false
---

WCAG 2.2 added nine new success criteria on top of WCAG 2.1, and for WooCommerce stores, six of them actually matter day to day: focus visibility behind sticky headers, minimum touch target size, no drag-only interactions, consistent help placement, no re-typing data the user already entered, and accessible authentication. One older criterion (4.1.1 Parsing) was removed because modern browsers handle it automatically. Nothing from 2.1 was downgraded, so if your store was already WCAG 2.1 AA, you are not starting over. You are filling gaps.

That is the short version. The longer version matters because most WooCommerce themes still fail at least three of the new criteria, and the lawsuits in 2025 are increasingly citing 2.2 language even though 2.1 AA is still the legal floor in the US.

## Quick answer

**WCAG 2.2 added 9 success criteria, removed 1, and changed 0 existing ones.** It was published October 5, 2023, and as of 2026 it is the de facto best-practice standard. For WooCommerce store owners, the practical impact is:

- **2 new Level A criteria** (Consistent Help, Redundant Entry)
- **4 new Level AA criteria** (Focus Not Obscured Minimum, Dragging Movements, Target Size Minimum, Accessible Authentication Minimum)
- **3 new Level AAA criteria** (you can mostly ignore these unless you want the gold star)
- **1 removed**: 4.1.1 Parsing is gone. Stop fighting your theme over stray HTML validation errors.

If you sell to the EU, the European Accessibility Act became enforceable on June 28, 2025, and its technical baseline (EN 301 549) currently maps to WCAG 2.1 AA, with 2.2 widely expected to follow. So you have time, but not much.

## What's new in WCAG 2.2 (the 9 criteria, in plain English)

### 2.4.11 Focus Not Obscured (Minimum) - Level AA

When a keyboard user tabs through your site, the focused element cannot be fully hidden by another element. The most common WooCommerce offender: sticky headers and sticky "Add to cart" bars that cover the focused link or input when you tab to the top of the viewport.

**Fix:** Add `scroll-padding-top` to your `<html>` element matching your sticky header height, or use `scroll-margin-top` on focusable elements. Most modern WooCommerce themes need a 10-line CSS patch.

### 2.4.12 Focus Not Obscured (Enhanced) - Level AAA

Stricter version of the above. The focused element cannot be obscured *at all*, not even partially. Most stores skip this one.

### 2.4.13 Focus Appearance - Level AAA

Focus indicators must be at least 2 CSS pixels thick and meet a 3:1 contrast ratio against the unfocused state. This is AAA but worth doing anyway because weak focus rings are one of the top complaints from real screen-reader and keyboard users.

### 2.5.7 Dragging Movements - Level AA

Any function that requires dragging must have a single-pointer alternative (tap, click). Where this hits WooCommerce:

- Drag-to-reorder variation swatches
- Image gallery sliders that only respond to swipe
- Range sliders for price filters with no number input fallback
- Drag-and-drop file uploads with no "Choose file" button

If your price filter is a slider only, you fail this criterion. WooCommerce's default price filter widget actually does provide number inputs, but many premium themes hide them.

### 2.5.8 Target Size (Minimum) - Level AA

Interactive targets must be at least **24x24 CSS pixels**, with exceptions for inline links in text, user-agent controls, and elements where size is essential. This is one of the biggest practical changes.

Common WooCommerce failures:
- Tiny quantity "+/-" buttons on the cart page (often 16-20 pixels)
- Compressed mini-cart icons in mobile headers
- Close (X) buttons on quickview modals
- Pagination numbers in product archives
- Star-rating inputs on review forms

Note: 24x24 is the minimum. WCAG 2.5.5 (AAA) still recommends 44x44. Apple HIG recommends 44x44. Material Design says 48x48. The 24px floor is a hard legal minimum, not a design recommendation.

### 3.2.6 Consistent Help - Level A

If you offer help (contact link, chat widget, FAQ link, phone number), it has to appear in the same relative order on every page that has it. You cannot put the chat button bottom-right on the homepage and bottom-left on checkout.

This one trips up stores that load different live-chat widgets per page or hide the contact link in the footer on some templates.

### 3.3.7 Redundant Entry - Level A

Do not make users re-enter information they have already entered in the same process, unless re-entry is essential (like a password confirmation) or the original information is no longer valid.

WooCommerce checkout is the classic violator: customers fill in a billing address, then have to retype it as the shipping address. WooCommerce's "Ship to a different address?" checkbox handles this correctly by default, but many one-page checkout plugins break the pattern.

### 3.3.8 Accessible Authentication (Minimum) - Level AA

Do not require a cognitive function test (memorizing a password, solving a puzzle, transcribing characters) for login unless an alternative exists. Practical implications:

- Password managers must work. Do not block paste into password fields.
- CAPTCHAs that require image recognition ("select all crosswalks") fail this unless you also offer an audio CAPTCHA, an email link, or another non-cognitive option.
- Email magic links and OAuth (Login with Google) satisfy the criterion.

If your store uses reCAPTCHA v2 image challenges with no alternative, you are non-compliant.

### 3.3.9 Accessible Authentication (Enhanced) - Level AAA

Stricter: no cognitive function tests at all, even with alternatives. Most ecommerce stores will not chase this one.

## What was removed: 4.1.1 Parsing

This is the only deletion. The old 4.1.1 required that HTML be free of duplicate IDs, unclosed tags, and similar parser errors. It was removed because modern browsers and assistive tech recover from these issues automatically. If you previously had a long list of HTML validation warnings flagged by an accessibility scanner, most of them are now moot.

For more detail on how 2.2 differs from 2.1 conceptually, see [WCAG 2.2 Compliance for Shopify: What Actually Changed](https://amazingplugins.com/blog/2026-05-16-wcag-22-compliance-shopify-what-changed/). The 2.1 vs 2.2 changes are platform-neutral, but the Shopify article walks through the same criteria with different theme examples.

## What this means for your WooCommerce store (practical checklist)

Go through this in order. The first three items catch ~80% of the new-in-2.2 issues most stores have:

1. **Test sticky headers.** Tab through your homepage, product page, and checkout. Does the sticky header ever cover the focused element? If yes, add `scroll-padding-top` to `html` matching your header height.
2. **Measure your buttons.** Open Chrome DevTools, inspect your quantity selector, mini-cart icon, modal close buttons, and pagination links. Anything under 24x24 CSS pixels fails 2.5.8.
3. **Audit your price filter and image galleries.** If they only respond to drag/swipe, add tap or input alternatives.
4. **Check your CAPTCHA.** If it requires image recognition without an audio or email-link fallback, replace it or add an alternative.
5. **Test password paste.** Try pasting into your login form's password field. If it is blocked, remove the block.
6. **Walk the checkout.** Confirm that customers do not have to retype any data they entered earlier in the same flow.
7. **Verify help placement.** If you have a chat widget or contact link, confirm it is in the same relative position on every page.
8. **Review focus indicators.** Tab around. Are the focus rings at least 2px thick and visible against every background?

If you want a broader compliance walkthrough that covers WCAG 2.1 fundamentals too, the [How to Make Your WooCommerce Store ADA Compliant guide](https://amazingplugins.com/blog/2026-04-16-how-to-make-your-woocommerce-store-ada-compliant/) is the longer companion piece. For the conformance level question (AA vs AAA), [WCAG 2.1 AA vs AAA for E-commerce](https://amazingplugins.com/blog/2026-04-21-wcag-2-1-aa-vs-aaa-what-s-the-real-difference-for-e-commerce/) explains why AA is the realistic target.

## How AmazingPlugins helps

The **WooCommerce Accessibility Fixer** plugin scans your store against WCAG 2.2 AA criteria specifically (not just the older 2.1 set) and applies real code fixes through WordPress hooks and WooCommerce template filters. It is not an overlay, so there is no JavaScript widget that screen readers will ignore or that plaintiffs' lawyers will cite as evidence of bad-faith remediation.

What it actually does for the new 2.2 criteria:

- **Target Size (2.5.8):** Auto-applies minimum 24x24 padding to WooCommerce quantity buttons, mini-cart icons, and pagination links where the theme has compressed them.
- **Focus Not Obscured (2.4.11):** Detects common sticky-header patterns and injects the right `scroll-padding-top` value.
- **ARIA Form Labels & Accessible Input Names:** Catches checkout fields missing programmatic labels, which is also enforced by 2.1 but still one of the most common ADA lawsuit complaints.
- **Color Contrast:** Flags failures across product cards, button states, and form errors, with auto-fix where the change is safe.
- **PDF compliance report:** Pro tier generates a report you can hand to legal counsel or attach to your accessibility statement.

Where it stops: meaningful alt text for product images still needs human judgment (an automated tool can fill blanks, but it cannot tell you which product detail actually matters), and complex custom checkout flows need manual review. The Pro tier includes priority support for those edge cases.

## People also ask

### Is WCAG 2.2 legally required for WooCommerce stores in 2026?

Not . The legal floor in the US under the ADA is still WCAG 2.1 AA, and the EU's EAA technical standard (EN 301 549) currently references 2.1 AA as well. However, courts and plaintiffs' attorneys increasingly cite 2.2 criteria when 2.1 does not catch the specific complaint (especially target size and authentication issues), and the WCAG 2.2 standard is the version W3C now recommends. Treat 2.2 AA as the realistic compliance target.

### Do I have to redo my whole accessibility audit because of WCAG 2.2?

No. WCAG 2.2 is fully backward-compatible. If your store met 2.1 AA, you only need to test against the 6 new A/AA criteria (Consistent Help, Redundant Entry, Focus Not Obscured Minimum, Dragging Movements, Target Size Minimum, Accessible Authentication Minimum). The 3 new AAA criteria are optional.

### Does WooCommerce core handle WCAG 2.2 automatically?

Partially. WooCommerce shipped 140+ accessibility enhancements in mid-2025 moving toward WCAG 2.2 AA, including better ARIA labels, focus management, and target sizes on core templates. But the moment you install a custom theme, a page builder, or third-party checkout plugins, you reintroduce compliance gaps. Core fixes do not protect customizations.

### What is the deadline for WCAG 2.2 compliance?

There is no single global deadline. In the US, ADA Title III applies continuously (no grace period), and the DOJ's April 2024 Title II rule sets WCAG 2.1 AA deadlines for state and local government in 2026-2027. In the EU, the EAA has been enforceable since June 28, 2025. The practical answer: get to 2.2 AA as soon as reasonably possible, because plaintiffs do not wait for official deadlines.

### Are accessibility overlays good enough for WCAG 2.2?

No, and this has been confirmed by both the FTC (which fined accessiBe $1 million in January 2025 for deceptive practices) and by court rulings that have allowed lawsuits to proceed against stores using overlays. Overlays add a JavaScript widget on top of inaccessible code; they do not fix the underlying HTML. Real WCAG 2.2 compliance requires changes to the markup, CSS, and ARIA, which is what code-level fixers do.

