---
title: "Your Shopify WCAG 2.2 Compliance Checklist (Everything You Need to Fix)"
description: "WCAG 2.2 added 9 new success criteria. Run this exact Shopify checklist to find out what's broken on your store and what to fix first."
pubDate: 2026-05-06
author: Harun Ray
tags:
  - Shopify
  - WCAG 2.2
  - Compliance
  - Checklist
seoKeywords:
  - shopify wcag 2.2 compliance checklist
  - wcag 2.2 new requirements ecommerce
  - shopify accessibility checklist
  - shopify store wcag 2.2 compliance
seoCategory: "Guides"
canonicalUrl: "https://amazingplugins.com/blog/shopify-wcag-2-2-compliance-checklist"
gscSubmitted: false
---

# Your Shopify WCAG 2.2 Compliance Checklist (Everything You Need to Fix)

WCAG 2.2 introduced 9 new success criteria that didn't exist in 2.1. If you audited your Shopify store last year and passed, you might be failing new criteria today. The European Accessibility Act now references WCAG 2.2 as the de facto standard, and U.S. courts have started citing it in ADA settlements. Most Shopify themes were built against 2.1 and never updated. Here is the exact checklist to run against your store right now, what each item means in practical Shopify terms, and where the new 2.2 criteria break the most.

## What's New in WCAG 2.2 — The Changes That Affect Every Shopify Store

WCAG 2.2 added nine new success criteria on top of 2.1. Five of them affect almost every Shopify storefront.

**Focus Appearance (2.4.11, AA)** — When a button or link receives keyboard focus, the indicator must be visible enough to actually find. Most Shopify themes strip the browser default and replace it with something faint or partial.

**Dragging Movements (2.5.7, AA)** — Anything you operate by dragging — image carousels, sliders, range pickers — must also work with a single tap or click. Shopify's product image zoom and review-rating sliders are common offenders.

**Target Size Minimum (2.5.8, AA)** — Interactive controls need at least 24×24 CSS pixels of clickable area, with limited exceptions. Mobile add-to-cart icons, quantity steppers, and footer links routinely fail.

**Consistent Help (3.2.6, A)** — If you offer help (chat, contact, FAQ), the entry point must appear in the same place on every page. Shopify themes that show chat only on product pages fail.

**Redundant Entry (3.3.7, A)** — Don't make customers re-type information they already gave you in the same flow. Shopify's default checkout handles this; custom multi-step checkouts often don't.

## The Full Shopify WCAG 2.2 Compliance Checklist

### Perceivable

1. **Alt text on all non-decorative images.** Product photos, lifestyle shots, hero banners. Decorative images get `alt=""`, never missing alt entirely.
2. **Videos have captions** (and audio descriptions where the visuals carry information beyond the audio). Product demo videos, tutorial videos, hero loops with voiceover.
3. **Color is not the only way to convey information.** Sale badges, error states, stock indicators, swatch availability — pair color with an icon, label, or pattern.
4. **Contrast ratio: 4.5:1 for normal text, 3:1 for large text** (18pt+ or 14pt bold). Check your "Sale" prices, placeholder text, footer links, and disabled-button states.

### Operable

5. **All functions keyboard-accessible.** Mega menus, quick-view modals, variant pickers, cart drawer, filters — every interaction must be reachable with Tab and operable with Enter or Space.
6. **No keyboard traps**, especially in checkout, modals, and the cart drawer. You must be able to Tab in *and* Tab out.
7. **Focus visible on every interactive element.** No `outline: none` without a replacement.
8. **Skip links present and functional.** A "Skip to main content" link as the first focusable element.
9. **Touch targets minimum 24×24px on mobile.** Includes hamburger menus, close buttons, quantity steppers, and social icons.
10. **No content flashes more than 3 times per second.** Hero animations, promo banners, GIFs.

### Understandable

11. **Language declared in HTML.** `<html lang="en">` (or your store's language) on every template.
12. **Consistent navigation across pages.** Header, footer, and utility nav appear in the same order site-wide.
13. **Error messages are specific and helpful.** "Enter a valid email address" beats "Invalid input."
14. **Forms prevent and recover from errors.** Inline validation, clear correction guidance, no data loss on failure.

### Robust

15. **Valid HTML — no duplicate IDs.** Shopify section IDs are a frequent culprit when sections render twice on one page.
16. **ARIA used correctly — not as a patch for missing HTML semantics.** A `<div role="button">` is worse than a real `<button>`. Audit your theme's custom components.

## Focus Appearance (2.4.11) — The WCAG 2.2 Criterion That Breaks Most Shopify Themes

Focus Appearance is the criterion that quietly fails the largest share of Shopify stores, because most premium themes override the browser's default focus ring with custom CSS that looks cleaner but communicates less.

To meet 2.4.11 at AA, the focus indicator must satisfy three conditions. **Minimum area:** an outline at least as large as a 2 CSS pixel perimeter around the element. **Contrast:** at least 3:1 between the focused and unfocused states of the same pixels. **Unobscured:** the indicator can't be hidden behind a sticky header, cookie banner, or chat widget.

Open your theme's stylesheet and search for `outline: none`, `outline: 0`, and `:focus { outline:`. Every match is a candidate failure. Replace stripped outlines with a high-contrast `:focus-visible` style — typically a 2px solid ring with a 2px offset, in a color that hits 3:1 against both the element and the page background.

## Target Size Minimum (2.5.8) — Mobile Buttons and Touch Targets on Shopify

On mobile, Shopify's default UI patterns are the ones that fail this most. The hamburger close icon, the quantity decrement button, the variant swatches, and the social icons in the footer are commonly rendered at 16–20 px and stacked tightly.

WCAG 2.2 requires interactive targets to be at least **24×24 CSS pixels**, measured as the clickable area (not just the visible icon). Spacing counts: a 20px target with at least 24px of clearance around it can still pass, because no other target can be activated by a slightly off tap.

To test, open Chrome DevTools, switch to a mobile device profile, and use the ruler tool on every button, link, and form control on your product and cart pages. Anything under 24×24 with neighbors closer than 24px gets fixed by increasing padding — not the icon size. Padding expands the hit area without changing your visual design.

## How to Use This Checklist on Your Shopify Store

Run the checklist in two passes. **First pass:** an automated scan with axe DevTools or WAVE on your homepage, a collection page, a product page, the cart, and checkout. That catches roughly 30% of issues — mostly contrast, alt text, and labels. **Second pass:** manual keyboard and mobile-touch testing for everything else, especially the new 2.2 criteria, which automated tools detect inconsistently.

Doing this once is a snapshot. Themes update, apps inject new markup, and merchandising changes break compliance silently. AmazingPlugins runs this checklist continuously against your live store and alerts you the moment something regresses.

> **Stop checking your store manually every quarter.** AmazingPlugins scans your Shopify store against WCAG 2.2 around the clock and sends you a fix-ranked report the moment something breaks. [Start your free scan →](https://amazingplugins.com)
