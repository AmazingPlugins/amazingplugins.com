---
title: "WCAG 2.2 Compliance Shopify: The Full Checklist"
description: "A practical WCAG 2.2 compliance checklist for Shopify store owners. Check every criterion, see what to fix, and know where you actually stand in 2026."
pubDate: 2026-05-21T13:03:55.824Z
author: "Harun Ray"
tags:
  - "Shopify"
  - "Accessibility"
  - "WCAG 2.2"
  - "ADA Compliance"
  - "Checklist"
seoKeywords:
  - "`WCAG 2.2 compliance shopify`"
seoCategory: "shopify"
articleAngle: "checklist"
gscSubmitted: false
---

If you run a Shopify store and want a real WCAG 2.2 compliance checklist you can work through this afternoon, this is it. WCAG 2.2 AA is now the de facto best practice for Shopify in 2026, while WCAG 2.1 AA remains the legal floor courts and EU regulators use. To be compliant, your storefront needs to pass the 50 Level A and AA success criteria of WCAG 2.1 plus the 9 new criteria added in WCAG 2.2. This checklist walks through every item that actually breaks on real Shopify themes, what the standard says, and what to do when you find a failure.

## Quick answer

WCAG 2.2 compliance on Shopify means meeting all Level A and AA success criteria of WCAG 2.2 across your storefront, checkout, account pages, and any apps that inject content. The fastest path is: (1) run an automated scan to catch the 30 to 40 percent of issues a tool can find, (2) do manual keyboard and screen reader testing on your top five page templates, (3) fix the failures in your theme code or with an accessibility app, (4) publish an accessibility statement. Most stores fail on color contrast, alt text, focus indicators, form labels, and the new 2.2 target size criterion. Expect 4 to 20 hours of work for a typical small store, more if you have heavily customized templates.

## What's actually in WCAG 2.2 that wasn't in 2.1

WCAG 2.2 added 9 new success criteria. Six are Level A or AA and matter for legal compliance. The others are AAA and aspirational. Here are the ones you must check on Shopify:

- **2.4.11 Focus Not Obscured (Minimum) AA**: when an element receives keyboard focus, no other element on the page (sticky header, cookie banner, chat widget) can cover it.
- **2.4.12 Focus Not Obscured (Enhanced) AAA**: stricter version; nice to have.
- **2.5.7 Dragging Movements AA**: any feature that uses dragging must have a single-pointer alternative. Affects sliders, image comparison, drag-to-reorder.
- **2.5.8 Target Size (Minimum) AA**: interactive targets must be at least 24x24 CSS pixels, with exceptions for inline links and user-agent defaults. Tiny social icons in footers fail this constantly.
- **3.2.6 Consistent Help A**: if you offer help (chat, contact link, FAQ), it must appear in the same relative order across pages.
- **3.3.7 Redundant Entry A**: do not ask users to re-enter information they already provided in the same flow. Critical for Shopify checkout customizations.
- **3.3.8 Accessible Authentication (Minimum) AA**: do not require users to solve cognitive puzzles to log in. Affects custom login pages with CAPTCHA only.
- **3.3.9 Accessible Authentication (Enhanced) AAA**: AAA version, optional.

For a deeper read on the changes, see [WCAG 2.2 Compliance for Shopify: What Actually Changed](https://amazingplugins.com/blog/2026-05-21-wcag-22-compliance-shopify-what-changed/).

## The full WCAG 2.2 Shopify checklist

Work through each section. For every item I list: what to check, the standard, and what to do if you're failing.

### 1. Images and media (WCAG 1.1.1, 1.2.x)

- **Product images have meaningful alt text.** Standard: 1.1.1 Non-text Content (A). Check by inspecting your product page or running Lighthouse. If alt is empty or says "product image", rewrite it as "Red leather wallet, bifold, open showing card slots".
- **Decorative images use empty alt.** Standard: 1.1.1. Background hero images should have `alt=""` so screen readers skip them. Do not use `alt="decorative"`.
- **Video has captions.** Standard: 1.2.2 Captions (A). If you embed YouTube product videos, enable captions and review the auto-generated text.
- **Audio-only content has a transcript.** Standard: 1.2.1 Audio-only and Video-only (A).

### 2. Structure and reading order (WCAG 1.3.1, 2.4.6)

- **One H1 per page, headings in order.** Standard: 1.3.1 Info and Relationships (A). Shopify themes often skip H1 on collection pages or put it on the logo. Use a browser extension like HeadingsMap to audit.
- **Lists are real `<ul>` or `<ol>`.** Standard: 1.3.1. Designer-built bullet lists with `<div>` plus a bullet character do not announce as a list.
- **Form fields have visible labels.** Standard: 1.3.1 and 3.3.2 Labels or Instructions (A). Placeholder-only labels fail. Newsletter signup forms in footers are a common offender.
- **Page language is set.** Standard: 3.1.1 Language of Page (A). Check `<html lang="en">` in your theme.liquid. Default Shopify themes get this right; custom ones sometimes ship without it.

### 3. Color and contrast (WCAG 1.4.3, 1.4.11)

- **Text contrast ratio is at least 4.5:1, or 3:1 for large text.** Standard: 1.4.3 Contrast Minimum (AA). Use the WebAIM contrast checker. The most common Shopify failure: light gray subtitles on white, or sale badge text on a brand-colored background.
- **UI components and graphical objects hit 3:1.** Standard: 1.4.11 Non-text Contrast (AA). Includes form input borders, focus indicators, and icon-only buttons.
- **Color is not the only way information is conveyed.** Standard: 1.4.1 Use of Color (A). "In stock" vs "out of stock" must use text or an icon, not just green/red.

### 4. Keyboard navigation (WCAG 2.1.1, 2.4.3, 2.4.7, 2.4.11)

- **Every interactive element is reachable with Tab.** Standard: 2.1.1 Keyboard (A). Common failures: custom dropdown menus, image zoomers, mobile menu toggles, variant pickers built with `<div>` instead of `<button>`.
- **No keyboard traps.** Standard: 2.1.2 No Keyboard Trap (A). Modal popups must release focus on Escape.
- **Focus indicator is visible.** Standard: 2.4.7 Focus Visible (AA). Many premium Shopify themes ship with `outline: none` in their CSS. Remove it or add a visible replacement.
- **Tab order matches visual order.** Standard: 2.4.3 Focus Order (A).
- **Focused element is not hidden behind sticky header or cookie banner.** Standard: 2.4.11 Focus Not Obscured (AA, new in 2.2). Test by Tab-ing slowly down the page with a sticky header pinned.
- **Skip link present.** Standard: 2.4.1 Bypass Blocks (A). Should appear when you hit Tab on a fresh page load and let you jump to main content.

### 5. Touch and targets (WCAG 2.5.5, 2.5.7, 2.5.8)

- **Touch targets are at least 24x24 CSS pixels.** Standard: 2.5.8 Target Size Minimum (AA, new in 2.2). Social icons in the footer, color swatches on product pages, and pagination dots are the usual failures.
- **Dragging actions have a non-drag alternative.** Standard: 2.5.7 Dragging Movements (AA, new in 2.2). If you use a quantity slider or drag-to-reorder cart, also offer plus/minus buttons.

### 6. Forms and checkout (WCAG 3.3.x)

- **Each input has a programmatic label.** Standard: 1.3.1 and 4.1.2 Name, Role, Value (A).
- **Errors are identified and described.** Standard: 3.3.1 Error Identification (A) and 3.3.3 Error Suggestion (AA). "Invalid input" is not enough. Say "Email must include @".
- **Required fields are programmatically marked.** Standard: 3.3.2. Use `required` attribute or `aria-required="true"`.
- **Users are not asked to re-enter info from the same session.** Standard: 3.3.7 Redundant Entry (A, new in 2.2). If your shipping and billing addresses are the same, auto-populate or offer a "same as shipping" toggle.
- **Login does not require a cognitive test.** Standard: 3.3.8 Accessible Authentication (AA, new in 2.2). Password plus optional CAPTCHA is fine; CAPTCHA-only or solve-a-puzzle to log in fails.

### 7. Navigation and consistency (WCAG 3.2.x, 2.4.x)

- **Help is in the same place on every page.** Standard: 3.2.6 Consistent Help (A, new in 2.2). If your live chat icon sits bottom-right on the home page but bottom-left on the product page, fix it.
- **Navigation menus are consistent across pages.** Standard: 3.2.3 Consistent Navigation (AA).
- **Page titles are unique and descriptive.** Standard: 2.4.2 Page Titled (A). Shopify handles this by default if you write good product titles.
- **Link text is descriptive.** Standard: 2.4.4 Link Purpose (A). Avoid "click here" and "read more". "Read our return policy" is the right shape.

### 8. Code quality (WCAG 4.1.x)

- **No duplicate IDs.** Standard: 4.1.1 was removed in 2.2 but duplicate IDs still break assistive tech. Worth checking.
- **ARIA is used correctly.** Standard: 4.1.2 Name, Role, Value (A). Common Shopify failure: a `<div role="button">` with no `tabindex` and no keyboard handler. If you can use a real `<button>`, do.
- **Status messages announce.** Standard: 4.1.3 Status Messages (AA). When an item is added to cart, screen readers should hear it. Use `aria-live` regions.

## How to actually run this checklist

Here is the order I'd work in for a real Shopify store:

1. **Run an automated scan first.** Use WAVE, axe DevTools, or a Shopify-specific scanner. This catches 30 to 40 percent of failures and gives you a starting list.
2. **Pick five page templates that cover 80 percent of traffic**: home, collection, product, cart, checkout (or a representative thank-you page).
3. **Tab through each template.** Note every place focus disappears, gets stuck, or jumps somewhere unexpected.
4. **Test with a screen reader.** VoiceOver on Mac (Cmd+F5) or NVDA on Windows are free. Read one product page top to bottom. If it does not make sense audibly, something is wrong.
5. **Check contrast on your brand colors.** Use the WebAIM contrast checker.
6. **Fix in the theme.** Edit Liquid, CSS, and JS in your dev theme, test, then publish. Or use an accessibility app for the fixes you cannot or will not touch in code.
7. **Re-scan and document.** Save a dated report. This is what you reference if you ever receive a demand letter.

## How AmazingPlugins helps

[Shopify Accessibility Fixer](https://apps.shopify.com/) is built around this checklist. Instead of overlaying a widget on top of your site, it injects real fixes into your theme: missing alt text on product images, ARIA form labels in the newsletter signup, visible focus indicators where the theme stripped them, skip links, the lang attribute, and distinguishing text on links that only differed by URL. The Pro tier adds batch scanning across all pages, an auto-fix mode for the safe-to-change items, and a PDF compliance report you can keep on file.

For a wider product comparison, see the [Best Accessibility App for Shopify (2026 Buyer's Guide)](https://amazingplugins.com/blog/best-accessibility-app-shopify-full-guide/).

For stores selling into the EU, WCAG 2.1 AA is the technical standard under the European Accessibility Act, which became enforceable June 28, 2025. The [Shopify EAA compliance guide](https://amazingplugins.com/blog/how-to-make-your-shopify-store-eaa-compliant/) covers what's different from US ADA expectations.

## Related pages

- [Shopify accessibility audit](https://amazingplugins.com/blog/shopify-accessibility-audit/)
- [Shopify accessibility policy template](https://amazingplugins.com/blog/shopify-accessibility-policy-template/)
- [Shopify accessibility statement vs policy vs remediation log](https://amazingplugins.com/blog/shopify-accessibility-statement-vs-policy-vs-remediation-log/)
- [Shopify Accessibility Tool: Full Guide for Store Owners (2026)](https://amazingplugins.com/blog/shopify-accessibility-tool-full-guide/)
- [Your Shopify App Is Quietly Breaking WCAG Compliance. Here's How to Find It](https://amazingplugins.com/blog/shopify-third-party-apps-wcag-violations/)
- [Best Accessibility App for Shopify (2026 Buyer's Guide)](https://amazingplugins.com/blog/best-accessibility-app-shopify-full-guide/)

## Frequently asked questions

### Is WCAG 2.2 legally required for Shopify stores?

Not strictly. US courts and EU regulators currently use WCAG 2.1 AA as the standard, which is what the EAA references in EN 301 549. But WCAG 2.2 is now the published recommendation from W3C, and ADA demand letters in 2026 increasingly cite 2.2 criteria. Treat 2.1 AA as the floor and 2.2 AA as where you should be heading.

### How do I test if my Shopify store passes WCAG 2.2?

Run an automated scan (WAVE or axe), then do manual keyboard testing on your top five page templates and a screen reader pass on one product page. Automated tools catch about a third of issues. The rest need a human.

### What does WCAG 2.2 compliance cost on Shopify?

For a small store on a stock theme, expect 4 to 20 hours of work or a tool subscription in the $10 to $50 per month range. For a heavily customized store, full remediation can run $2,000 to $10,000 with an agency. Compare that to an average ADA settlement of around $25,000 plus legal fees and the math is clear.

### Do Shopify themes come WCAG 2.2 compliant?

No theme is fully compliant out of the box, including Dawn. Shopify's own themes get the basics right (lang attribute, semantic landmarks, decent contrast in default colors), but break the moment you change brand colors, add apps, or customize sections. Always test after every theme edit.

### Will an accessibility overlay make my Shopify store compliant?

No. Overlays do not fix the underlying HTML and CSS. Plaintiffs' law firms specifically target stores using overlays because the source code is still broken. Use a tool that injects real code fixes, not one that adds a floating widget.

## Bottom line

WCAG 2.2 compliance on Shopify is a finite, checkable list. The criteria above cover everything Level A and AA. Work through them once with a scanner plus manual testing, fix what you find in your theme or with a code-based accessibility app, publish a dated accessibility statement, and re-test quarterly. That is the actual standard of care, and it is what protects you from both lawsuits and from the real users you're trying to serve.
