---
title: "The FTC Called Out Accessibility Overlays. Here Are Real Alternatives for Shopify Stores"
description: "Overlays do not fix WCAG violations. The FTC confirmed it. If you want real compliance on Shopify, here is what source-code fixes look like compared to overlay widgets."
pubDate: 2026-05-07
author: Harun Ray
tags:
  - Shopify
  - WCAG
  - Overlays
  - FTC
seoKeywords:
  - shopify overlay alternatives 2026
  - accessibe alternative shopify
  - accessibility widget shopify vs source code fix
  - best overlay alternative shopify
  - why shopify overlay does not work
seoCategory: "Guides"
canonicalUrl: "https://amazingplugins.com/blog/shopify-overlay-alternatives"
gscSubmitted: false
---

# The FTC Called Out Accessibility Overlays. Here Are Real Alternatives for Shopify Stores

You installed an accessibility overlay because the vendor said it would make your Shopify store ADA-compliant. Then you read that the FTC told the biggest overlay company that the claim was false. Now you have a store that might not be covered, a tool that does not do what it promised, and no clear idea what to do next.

Here is the honest version.

## What the FTC Actually Said About Overlays

The FTC's action against accessiBe was not subtle. The commission found that claiming an AI overlay widget makes a website compliant with WCAG, ADA, or any accessibility standard is a deceptive practice. The overlay modifies what users see in the browser without fixing the underlying HTML. That is not compliance. That is decoration.

The legal framing matters here. Courts have consistently held that ADA accessibility for websites requires fixing the actual markup, not overlaying it with a client-side script. Two major cases in 2025 and 2026 rejected the overlay-as-compliance argument explicitly. Having accessiBe or UserWay installed does not satisfy the legal standard. If your store was audited on the basis of having one of these widgets, you have a gap, not a shield.

The uncomfortable truth is that most overlay vendors knew this. The marketing said "ADA compliant" and "WCAG 2.1 AA" and "AI-powered accessibility." The technical reality was a JavaScript layer that tweaked contrast settings and added keyboard simulation on top of markup that was still broken underneath.

## Why Overlays Fail Structurally

Overlays run in the browser after the page has already loaded. They intercept what the browser renders and patch it in real time. This creates a specific class of failures that the overlay cannot escape.

aria-live conflicts are the most common. When a Shopify app or theme uses an aria-live region to announce dynamic content (a cart update, a product variant change, an error message), the overlay has its own aria-live region running at the same time. Screen reader users hear both. Sometimes the overlay wins and they miss the information they actually needed. Sometimes the page wins and the overlay's "accessibility" never reaches them.

Keyboard focus theft is a close second. Overlays inject focus-stealing code to manage their own modal behavior. If your theme already has its own focus management for a cart drawer or product lightbox, two systems are now fighting over focus state. The result is unpredictable. Keyboard users report being trapped, lost, or unable to complete a purchase.

DOM patching creates another failure mode. When the overlay detects that the page has a violation, it rewrites the offending element in the browser's DOM. But that rewrite is invisible to assistive technology until the next page load. A screen reader that loaded before the overlay patched the DOM still has the old, broken accessibility tree. The overlay is fixing something for the next visitor while breaking it for the current one.

None of this means overlay developers are incompetent. It means the approach is architecturally limited. You cannot fix source-level problems from the client side.

## Your Actual Alternatives for Shopify Stores

Real accessibility on Shopify requires changing the actual markup. Here is what that looks like in practice.

**Theme upgrade** is the lowest-effort starting point. Some Shopify themes were built with WCAG 2.2 AA as a design requirement. Others were not. If you are starting from a theme that was never audited, switching to a theme with a documented accessibility baseline costs you the price of a theme and eliminates the violations that came built-in. This does not fix your apps (more on that below), but it fixes the foundation.

**Manual remediation** works when you have a developer who understands WCAG. The work is specific: alt text on every product image, form labels that are actually labels (not placeholder text), focus indicators that meet the 3:1 contrast ratio, keyboard navigation that does not trap users. The cost scales with the size of the store and the quality of the current theme. It is ongoing, because Shopify themes update and apps change.

**Automated source-code scanning** is the middle path. A tool that crawls your rendered storefront, identifies WCAG 2.2 AA violations, and returns specific fixes rather than a generic score. This is faster than manual audit and more accurate than a syntax checker that does not know Shopify. The catch: automated tools fix what they can detect. Some violations require human judgment. The best approach is automated scan plus targeted manual review for the items the scan flags as complex.

**Dedicated accessibility apps** that integrate with Shopify at the code level. Unlike overlays, these make actual changes to the Liquid files, theme settings, or app bridge components. They are not patching the browser; they are fixing the source. This is what the overlay claimed to be, minus the deception.

## The Difference That Matters

Overlays are client-side JavaScript. They run in the browser after the server has already sent the page. They change what the browser displays but not what the server sends.

Source-code fixes change what the server sends. When the page reaches the browser, it is already correct. No patching required. Assistive technology reads the right markup the first time.

The distinction matters for legal purposes, but it also matters for actual users. A screen reader user on a store with a good overlay still has a worse experience than a screen reader user on a store with clean markup. The overlay is fighting the page. Source code is not.

## What to Do If You Have an Overlay Installed Now

Step 1 is to run a real accessibility scan with the overlay disabled or removed. You cannot see your actual violations while the overlay is masking them. A scan against the rendered page without the overlay tells you what is actually there.

Step 2 is to fix the source-level issues the scan identifies. This is the work. It may be more than one afternoon, depending on your store. The overlay was never going to do this for you.

Step 3 is to remove the overlay after remediation. It is not helping and it is potentially making things worse.

Step 4 is to monitor for regressions. Shopify themes update. Apps update. Violations come back. A scan schedule that catches changes before they stack into a new audit failure is cheaper than the next demand letter.

## See How Real Compliance Scanning Works

AmazingPlugins scans your live Shopify storefront with apps and themes active, identifies WCAG 2.2 AA violations, and tells you what to fix without overlaying anything. Run a free scan on your store to see what is actually there.

[See how the Shopify scanner works](https://amazingplugins.com/products/shopify-accessibility-scanner)
