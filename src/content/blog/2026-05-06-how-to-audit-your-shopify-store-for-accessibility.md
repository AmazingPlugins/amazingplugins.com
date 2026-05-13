---
title: How to Audit Your Shopify Store for Accessibility (Step by Step)
description: >-
  Run a full accessibility audit on your Shopify store in under an hour. This
  step-by-step guide covers automated scanners, keyboard tests, screen reader
  checks, and what to fix first.
pubDate: 2026-05-06T00:00:00.000Z
author: Harun Ray
tags:
  - Shopify
  - Accessibility Audit
  - WCAG
  - Tutorial
seoKeywords:
  - how to audit your Shopify store for accessibility
  - shopify accessibility audit tool
  - free shopify accessibility test
  - shopify wcag 2.2 checklist
seoCategory: Guides
canonicalUrl: >-
  https://amazingplugins.com/blog/how-to-audit-your-shopify-store-for-accessibility
gscSubmitted: true
---

# How to Audit Your Shopify Store for Accessibility (Step by Step)

Most Shopify stores fail accessibility audits for the same five or six reasons. Missing alt text. Color contrast failures. Form fields without labels. A keyboard trap somewhere in checkout. The good news: you can find these issues yourself in under an hour, before you spend money on a consultant or a paid scanner. You need a Chrome extension, a working keyboard, and a screen reader that ships free with your operating system. This guide walks you through the same audit a professional would run, step by step.

## Why Automated Scanners Catch Only 30% of Accessibility Issues

Automated tools are useful, but they are not enough. Independent research from Deque and the WebAIM Million project both put scanner coverage at around 30% of WCAG failures. The other 70% requires a human.

Scanners flag missing alt attributes, low color contrast, and unlabeled form inputs. They cannot tell you whether the alt text is meaningful, whether the tab order makes sense, whether a custom dropdown is announced correctly to a screen reader, or whether a customer can complete checkout without timing out. They will not catch a focus trap inside your size-selector modal. They will not notice that your "Add to Cart" confirmation never gets read aloud.

Treat the automated scan as your starting point, not your finish line.

## Step 1 — Run an Automated Baseline Scan

Install three free tools: the [axe DevTools](https://www.deque.com/axe/devtools/) Chrome extension, [WAVE](https://wave.webaim.org/extension/) by WebAIM, and Lighthouse (built into Chrome DevTools). Each catches slightly different issues, so running all three takes ten extra minutes and reduces blind spots.

Scan five pages, in this order: homepage, collection page, product page with variants, cart, and checkout. Checkout is the most important. It is also the page most merchants forget to test because it lives on a different Shopify subdomain.

Save every report as a PDF or screenshot, with the page URL on it. Group the issues by type — contrast, labels, alt text, ARIA — rather than by page, so you can fix categories in batches.

## Step 2 — The Keyboard Navigation Test (The One Test That Catches Everything Scanners Miss)

Unplug your mouse, or set it aside and commit to using only Tab, Shift+Tab, Enter, Space, and the arrow keys for the next ten minutes. This single test surfaces more real issues than any tool.

Start on your homepage. Press Tab and watch where focus goes. Look for four things:

1. **A skip link.** The first Tab press should reveal a "Skip to main content" link. Many Shopify themes hide it with `display: none`, which breaks it for screen reader users.
2. **A visible focus indicator on every focusable element.** If you can't see where focus is, neither can a sighted keyboard user. Themes that set `outline: none` without a replacement are the cause.
3. **Logical tab order.** Focus should move left to right, top to bottom, matching the visual layout. If you tab from header to footer and back to the middle, the DOM order is broken.
4. **No focus traps.** Open a modal — a size guide, a quick-view, the cart drawer — and try to Tab out of it. If focus gets stuck, that's a trap and it blocks keyboard users from reaching checkout.

Complete a full purchase with the keyboard alone. If you cannot, your customers with motor disabilities cannot either.

## Step 3 — Screen Reader Testing (What VoiceOver and NVDA Actually Announce)

You do not need to be fluent in a screen reader to spot bad output. You need ten minutes and a willingness to listen.

On Mac, press Cmd+F5 to start VoiceOver. On Windows, install [NVDA](https://www.nvaccess.org/download/) — it is free and the most widely used screen reader in the world. Both ship with built-in tutorials, but the basics are: use Tab to move through interactive elements, and use the heading or landmark commands (VO+Cmd+H for VoiceOver, H for NVDA) to jump between sections.

Listen for four problems on a product page and through checkout:

- **Form fields announced as "edit text" with no label.** This is the most common screen reader failure on Shopify.
- **Add-to-cart confirmations that are silent.** When the cart updates, the screen reader should announce it. If nothing is read, you are missing an `aria-live` region.
- **Images announced as "image" or with the filename.** Means the alt text is missing or junk.
- **No landmarks.** If `<main>`, `<nav>`, and `<footer>` are missing, screen reader users cannot jump around the page efficiently.

## Step 4 — Check Your Theme's Accessibility Defaults

Some themes start you out further behind than others. Dawn (Shopify's reference theme) has the strongest accessibility baseline. Debut and Brooklyn are older and ship with several known issues — most often missing focus styles, header drawers that trap keyboard focus, and product variant pickers that do not announce changes.

Open your theme's Liquid files in the code editor. Search for `outline: none`, `aria-hidden="true"` on visible elements, and `<button>` tags missing accessible names. If you find more than a handful, consider switching to a maintained theme rather than patching one that fights you. A theme rewrite is cheaper than ongoing audits on a broken foundation.

## What to Fix First (The 6 Issues That Appear on Every Shopify Store Audit)

After hundreds of Shopify audits, the same six issues come up almost every time. Fix them in this order:

1. **Add real alt text to every product image.** Describe the product in context: "Black leather wallet, open, with three card slots visible." Decorative images get `alt=""`.
2. **Fix color contrast failures.** Sale badges, "Free shipping" banners, and small grey text on white are the usual offenders. Aim for 4.5:1 for body text.
3. **Add `<label>` elements to every form field.** Placeholder text is not a label.
4. **Remove the keyboard trap from checkout or modal drawers.** Test with Tab and Escape.
5. **Restore visible focus indicators.** A 2px solid outline at high contrast will do.
6. **Add captions to product videos.** YouTube auto-captions are a starting point — review and correct them.

Knock these out and you will pass most automated scans and clear the manual issues that get stores sued.

## How AmazingPlugins Automates Ongoing Shopify Accessibility Audits

A one-time audit is not the finish line. Every theme update, every new app, every Liquid edit can reintroduce a regression. AmazingPlugins scans your theme source code on a schedule and flags new issues the moment they appear. Theme updates, app installs, and content changes get checked automatically. You get a prioritized fix list mapped to WCAG 2.2 AA — no manual re-audit required, and no surprise regressions before the next legal demand letter arrives.

<div class="cta-box">
  <h3>Run a free Shopify accessibility scan</h3>
  <p>Get a full WCAG 2.2 AA audit of your live theme in under 10 minutes. No credit card required.</p>
  <a href="/scan" class="cta-button">Run Free Scan</a>
</div>
