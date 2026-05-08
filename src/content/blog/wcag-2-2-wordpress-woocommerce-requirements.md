---
title: "WCAG 2.2 Is Here. What Does It Mean for Your WordPress or WooCommerce Store?"
description: "WCAG 2.2 added new requirements around focus visibility, target size, and dragging movements. Here's what changed from 2.1 and what it means for your WooCommerce store."
pubDate: 2026-05-08
author: Harun Ray
tags:
  - WooCommerce
  - WordPress
  - WCAG
  - Compliance
  - WCAG 2.2
seoKeywords:
  - wcag 2.2 wordpress
  - wcag 2.2 woocommerce
  - wcag 2.2 requirements
  - woocommerce wcag 2.2
  - wordpress accessibility 2026
seoCategory: "Guides"
canonicalUrl: "https://amazingplugins.com/blog/wcag-2-2-wordpress-woocommerce-requirements"
gscSubmitted: true
---

WCAG 2.2 became the recommended standard in 2023. If your site was audited against 2.1 AA, you may already be failing some 2.2 requirements. Here is what is new and what it means for WooCommerce.

## What Changed From WCAG 2.1 to 2.2

WCAG 2.2 introduced nine new success criteria, with four directly impacting how ecommerce sites function. The previous version focused heavily on text alternatives, color contrast, and keyboard navigation. Version 2.2 shifts attention toward motor accessibility and consistent user experiences.

The four criteria most relevant to WordPress and WooCommerce are:

**2.4.11 Focus Not Obscured (minimum)** requires that when a user navigates via keyboard, the focus indicator must not be completely hidden by other content. If a sticky header or modal overlays your focused element, you have a violation.

**2.5.7 Dragging Movements** states that any function using a dragging gesture must have a single-pointer alternative. This affects WooCommerce product sorting, cart updates, and any drag-and-drop page builders.

**2.5.8 Target Size (minimum)** mandates interactive targets measure at least 24 by 24 CSS pixels. Small buttons, checkboxes, and links that fall below this threshold fail compliance.

**3.2.6 Consistent Help** requires help mechanisms such as contact links, chat widgets, or FAQ sections to appear in consistent locations across pages. A help link in the header should not jump to the footer on certain pages.

## Why This Matters for WooCommerce

WooCommerce sites face unique challenges because of their interactive nature and the complexity of checkout flows. Here are the specific areas where most stores fail.

### Product Filters and Sort Dropdowns

Many WooCommerce themes use small dropdown arrows for filtering products. These arrows often measure below 24 pixels and violate the target size requirement. Store owners who rely on plugins for layered navigation frequently overlook that the filter checkboxes and radio buttons are too small for touch users.

The dragging movement requirement also impacts sort dropdowns. Some themes implement drag-to-reorder product displays or wishlist items. If a user cannot complete these actions with a single tap or click, you need an alternative method.

### Add-to-Cart Buttons

The add-to-cart button is the most critical conversion element on any WooCommerce site. Theme developers sometimes style these with padding that makes the visual button large but leaves the actual clickable area undersized. A button that measures 44 pixels wide with 2 pixels of actual interactive area fails target size requirements.

Mobile users suffer most from this issue. A thumb tapping a small button near the edge of the screen may accidentally trigger the wrong action or miss the target entirely.

### Checkout Form Fields

The checkout page combines multiple accessibility challenges. Error messages that appear above the form can obscure focused fields. Address auto-complete popups often block the next input. Form validation messages must remain visible and readable after appearing.

Many checkout plugins also use small checkboxes for terms acceptance and newsletter signup. These default browser checkboxes are often styled below the 24-pixel threshold by the time CSS adjustments finish.

### Mobile Responsiveness Failures

WooCommerce sites that pass desktop audits frequently fail on mobile. The viewport changes everything. A button that measures 24 by 24 pixels on desktop might shrink to 18 by 18 on mobile due to responsive scaling. Touch targets that work for a mouse pointer become frustrating for finger navigation.

Slide-out cart drawers, mobile menus, and hamburger icons commonly violate focus visibility rules when they overlay other content.

## How to Audit for 2.2 Issues on WordPress/WooCommerce

Start with automated testing before manual review. WAVE, Axe DevTools, and Lighthouse can catch obvious violations like missing focus indicators and undersized targets. However, automated tools miss context-specific issues such as consistent help placement.

For manual testing, use only your keyboard to navigate through the entire purchase flow. Tab through product listings, apply filters, add an item to cart, and complete checkout without touching your mouse. Note any places where you lose track of focus or cannot complete an action.

Measure touch targets on mobile using browser developer tools. Inspect element on interactive elements and check the computed CSS dimensions. Anything below 24 by 24 pixels needs adjustment.

Test dragging movements by disabling trackpad or mouse input on a tablet. Attempt to sort products, reorder wishlist items, or use any drag-based interface. If the action fails or requires workarounds, you need an alternative.

Review your help mechanisms. Find every instance of help text, contact links, and support widgets. Verify they appear in the same location across your product pages, cart, checkout, and account areas.

## Get Help Making Your Store Compliant

WooCommerce accessibility requires ongoing attention as you add products, change themes, and install new plugins. Each update can introduce new violations.

[AmazingPlugins offers a WooCommerce accessibility solution](https://amazingplugins.com) that addresses the most common 2.2 failures. The plugin works with most themes and automatically fixes target sizes, ensures focus visibility, and adds proper keyboard alternatives for drag interactions.

Preparing for 2026 enforcement does not have to mean rebuilding your store. A targeted approach that addresses the specific criteria that affect ecommerce converts compliance into a competitive advantage.
