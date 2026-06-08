---
title: 'WCAG 2.2 Compliance for Shopify: What Actually Changed'
description: >-
  WCAG 2.2 adds 9 new success criteria that affect Shopify checkout, focus, and
  touch targets. Here's what changed from 2.1 and what to fix first.
pubDate: 2026-05-21T13:02:24.558Z
author: Harun Ray
tags:
  - WCAG 2.2
  - Shopify
  - Accessibility
  - ADA Compliance
  - WCAG
seoKeywords:
  - '`WCAG 2.2 compliance shopify`'
seoCategory: shopify
articleAngle: what-changed
gscSubmitted: true
---

WCAG 2.2 added **nine new success criteria** on top of WCAG 2.1, and six of them directly affect things your Shopify store already does: checkout forms, sticky headers, cart drawers, mobile tap targets, and any login or account flow. The biggest changes for store owners are 2.4.11 Focus Not Obscured, 2.5.7 Dragging Movements, 2.5.8 Target Size (Minimum), 3.2.6 Consistent Help, 3.3.7 Redundant Entry, and 3.3.8 Accessible Authentication. If your theme has a sticky announcement bar that covers focused fields, a slider you can only drag, or a checkout that asks for the same address twice, you have WCAG 2.2 work to do.

WCAG 2.2 was published as a W3C Recommendation in October 2023 and is now the de facto best-practice standard for ecommerce in 2026. It's backward compatible with 2.1, so nothing from 2.1 went away. The legal floor in most ADA cases is still WCAG 2.1 AA, and the European Accessibility Act references EN 301 549 (which is built on 2.1 AA). But plaintiff law firms and accessibility auditors now write reports against 2.2 AA, so treating 2.2 as the standard is the safer position.

## Quick answer

WCAG 2.2 added nine new success criteria, removed one (4.1.1 Parsing), and kept everything else from 2.1. For a Shopify store running a modern theme like Dawn, the practical impact is:

- **Touch targets** must be at least 24x24 CSS pixels (Level AA). Most theme icons and close buttons fail this.
- **Focused elements** can't be fully covered by sticky bars, cookie banners, or chat widgets.
- **Drag interactions** (image sliders, color swatches) need a single-pointer alternative.
- **Checkout** can't ask customers to re-enter information they already gave you in the same flow.
- **Login** can't depend on cognitive puzzles like "remember this 8-digit code" or unsolvable CAPTCHAs.
- **Help links** (chat, contact, FAQ) must appear in the same place on every page that has them.

WCAG 2.0 had 50 success criteria. 2.1 added 17. 2.2 added 9 and removed 1, for a current total of 86. Of the 9 new ones, 6 are Level A or AA (the levels that matter for compliance).

## The 9 new WCAG 2.2 criteria, ranked by Shopify impact

### 1. SC 2.4.11 Focus Not Obscured (Minimum) - Level AA

When a keyboard user tabs to an element, that element must not be **entirely** hidden by other content. Sticky announcement bars, cookie banners, and live chat widgets are the usual culprits. If a customer tabs into the email field at the bottom of your footer and your sticky "Free shipping over $50" bar covers it, you fail 2.4.11.

The fix is usually CSS: add `scroll-margin-top` to focusable elements equal to the height of your sticky header, or change your sticky bar to be dismissible. This is the single most common 2.2 failure on Shopify themes I see.

### 2. SC 2.5.8 Target Size (Minimum) - Level AA

Interactive controls (buttons, links, icons) must be at least **24x24 CSS pixels**, or have at least 24 CSS pixels of spacing around them. The exceptions: inline links inside text, controls set by the user agent default, and "essential" cases where a larger size would break the design.

Default Shopify theme close buttons (the X on the cart drawer), quantity steppers, and social icons in the footer often clock in at 16x16 or 20x20. They need to grow. On mobile, this is the criterion that hurts the most.

### 3. SC 3.3.8 Accessible Authentication (Minimum) - Level AA

Login and account flows can't require a **cognitive function test** unless an alternative is available. "Cognitive function test" includes:

- Remembering a password (paste must be allowed; password managers must work)
- Solving a puzzle or distorted-character CAPTCHA without an alternative
- Identifying objects in images ("select all the buses")
- Transcribing data from one place to another

If your Shopify store uses a third-party login app that blocks paste into the password field, you fail. If your CAPTCHA only offers visual challenges, you fail. The good news: Shopify's native customer account system passes this by default. Customizations are where it breaks.

### 4. SC 3.3.7 Redundant Entry - Level A

Information a user already entered in the same process can't be required again, unless re-entering it is essential (like confirming a password), or the information was auto-populated, or it's no longer valid.

This affects custom checkout flows, multi-step forms, and any flow that asks for shipping address and then asks again for billing address without offering "same as shipping" as the default. Shopify's standard checkout handles this, but if you've added a custom address form before checkout or use a third-party order app, audit it.

### 5. SC 2.5.7 Dragging Movements - Level AA

Any functionality that uses a dragging gesture must have a **single-pointer alternative**. Sliders, carousels, color/size pickers that work by dragging, and "swipe to confirm" patterns all need keyboard or single-tap equivalents.

Most Shopify image galleries already have arrow buttons next to the swipeable image, so they pass. The ones that fail are usually custom-built variant pickers and price-range filters in collection pages.

### 6. SC 3.2.6 Consistent Help - Level A

If your site offers help mechanisms (contact info, chat, FAQ link, self-service link), they must appear in **the same relative order** on every page they appear on. You don't have to put a chat widget on every page. But if you have one in the bottom right on the homepage, it can't be top left on the product page.

### 7. SC 2.4.12 Focus Not Obscured (Enhanced) - Level AAA

Same as 2.4.11 but stricter: no part of the focused element can be obscured. AAA is rarely a legal requirement, so most stores skip this.

### 8. SC 2.4.13 Focus Appearance - Level AAA

Focus indicators must have a contrast ratio of at least 3:1 against the unfocused state and be at least 2 CSS pixels thick. AAA again, but worth aiming for because the default browser focus ring often fails the spirit of this.

### 9. SC 3.3.9 Accessible Authentication (Enhanced) - Level AAA

The stricter version of 3.3.8: no cognitive function tests at all, even with alternatives. Most stores don't need to hit AAA.

## What got removed: SC 4.1.1 Parsing

WCAG 2.2 retired SC 4.1.1 Parsing. The old criterion required HTML to have unique IDs, properly nested tags, no duplicate attributes, etc. Modern browsers and assistive technologies now handle these issues automatically, so the W3C decided it no longer serves users. That said, clean markup is still good engineering practice and helps with [WCAG 2.1 AA vs AAA decisions](https://amazingplugins.com/blog/2026-04-21-wcag-2-1-aa-vs-aaa-what-s-the-real-difference-for-e-commerce/) on related criteria like 4.1.2 Name, Role, Value.

## A practical Shopify 2.2 audit, in order

This is the order I'd actually work in for a typical Dawn-based store:

1. **Audit touch target sizes on mobile.** Open Chrome DevTools, switch to mobile view, and inspect every icon, close button, quantity stepper, and social link. Anything under 24x24 fails 2.5.8.
2. **Tab through the checkout with the keyboard.** Watch for any moment where the focused field disappears behind a sticky header, cookie banner, or chat bubble. That's 2.4.11.
3. **Try to use every slider, swatch, and gallery with the keyboard only.** If there's no arrow-key or button alternative to dragging, that's 2.5.7.
4. **Log in with a password manager.** If paste is blocked or the field rejects autofill, that's 3.3.8.
5. **Walk through checkout end to end.** Note any field that asks for information already provided. That's 3.3.7.
6. **Check the position of your chat or contact link across templates.** Same place on every page that has it, or you fail 3.2.6.

If you want a fuller list with line-by-line checks, the [Shopify WCAG 2.2 compliance checklist](https://amazingplugins.com/blog/shopify-wcag-2-2-compliance-checklist/) covers all 86 criteria, not just the 9 new ones.

## How AmazingPlugins helps with WCAG 2.2

Shopify Accessibility Fixer doesn't promise to make you 2.2 compliant in one click. Nothing automated can, because criteria like 3.3.8 (authentication) and 3.2.6 (consistent help) depend on flows and content choices a tool can't read.

What it does handle directly:

- **Focus indicators** that pass 2.4.7 and approach the spirit of 2.4.13 AAA
- **Skip links** so keyboard users don't tab through 40 nav items to reach the main content
- **Alt text scaffolding** for product images (you still review and refine)
- **ARIA form labels** on common Shopify form patterns
- **Color contrast checks** on theme colors with suggested fixes
- **Keyboard navigation** patches for common theme bugs
- **Lang attribute** on the html element
- **Link distinguishing text** so "Read more" links aren't ambiguous
- A **PDF compliance report** mapped to WCAG 2.1 and 2.2 criteria, which you can hand to auditors or legal counsel

For judgment calls (meaningful alt text, whether your checkout flow  requires redundant entry, whether your CAPTCHA alternative is sufficient), you still need a human review. We're upfront about that. If a vendor tells you their widget will make you 2.2 compliant automatically with no review, walk away.

For a wider product comparison, see the [Best Accessibility App for Shopify (2026 Buyer's Guide)](https://amazingplugins.com/blog/best-accessibility-app-shopify-full-guide/).

## People also ask

### Is WCAG 2.2 legally required for Shopify stores?

Not directly, in most jurisdictions. US ADA cases still cite WCAG 2.1 AA as the technical benchmark, and the EAA (effective June 28, 2025) references EN 301 549, which is built on 2.1 AA. But auditors, lawyers, and accessibility consultants now write reports against 2.2 AA because it's the current W3C Recommendation. If you're aiming for the legal floor, 2.1 AA is fine. If you want to be defensible against the report your plaintiff's expert will write, target 2.2 AA.

### What's the difference between WCAG 2.1 and 2.2?

WCAG 2.2 adds 9 new success criteria and removes 1 (Parsing). Six of the new criteria are Level A or AA. The biggest practical changes for ecommerce are the 24x24 touch target minimum, focus-not-obscured rules, dragging alternatives, redundant entry restrictions, and accessible authentication requirements. Everything in 2.1 still applies.

### Does Shopify's default Dawn theme pass WCAG 2.2?

Dawn passes more 2.2 criteria than most themes out of the box. But it still has gaps: some icon buttons fall below 24x24 on mobile, custom sections added by merchants often introduce focus traps, and any third-party app drawer can break 2.4.11 if it overlays focused fields. The base theme is a good starting point, not a finished compliance posture.

### What's the most common WCAG 2.2 failure on Shopify?

Target Size (2.5.8). Almost every Shopify theme I audit has close buttons, social icons, or quantity steppers under 24x24 on mobile. The fix is straightforward CSS, but it's tedious because you have to check every interactive control.

### Do I have to fix AAA criteria?

No. Level AAA is aspirational. Almost no compliance program, lawsuit, or regulation requires AAA for full-site conformance. The W3C explicitly says AAA shouldn't be required as a blanket policy. Focus your effort on Level A and AA.

## What to do this week

If you've never looked at 2.2 before, do this in order:

1. Run a mobile audit focused on touch targets (2.5.8). This is your highest-frequency failure.
2. Test the keyboard tab path through your sticky header, cart drawer, and checkout (2.4.11).
3. Try one slider or swatch with the keyboard only (2.5.7).
4. Log into your own store with a password manager (3.3.8).

Four tests, maybe 30 minutes, and you'll know where the work is. From there, fix CSS where you can, audit your apps and customizations for the flow-level criteria, and document everything in an accessibility statement. The work compounds. Stores that take 2.2 seriously now will be in much better shape when the legal benchmark catches up, which historically happens within 2-3 years of a new WCAG version landing.
