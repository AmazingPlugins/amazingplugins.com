---
title: 'WCAG 2.2 WooCommerce Deadline: What''s Due When'
description: >-
  When WCAG 2.2 compliance is due for WooCommerce stores, what happens if you
  miss it, and the fastest path to fix the highest-risk issues.
pubDate: 2026-05-22T13:05:07.505Z
author: Harun Ray
tags:
  - WCAG 2.2
  - WooCommerce
  - Accessibility
  - ADA Compliance
  - EAA
seoKeywords:
  - '`WCAG 2.2 compliance woocommerce`'
seoCategory: woocommerce
articleAngle: deadline
gscSubmitted: true
---

If you sell anything to EU consumers, the WCAG 2.2 compliance WooCommerce deadline already passed. The European Accessibility Act (EAA) has been enforceable since **June 28, 2025**, and it points to **EN 301 549**, which adopts **WCAG 2.1 AA** as the technical floor with WCAG 2.2 AA as the de facto best practice for 2026. In the US there is no single federal "WCAG 2.2 deadline" for private WooCommerce stores, but courts treat WCAG 2.1 AA as the bar today and plaintiffs are starting to cite **WCAG 2.2** in 2026 complaints. So the honest answer is: yesterday for EU, ongoing for US, and the lawsuit cost (~$25K per settlement) is now higher than the cost of fixing the store.

## Quick answer

- **EU consumers (EAA):** enforceable since **June 28, 2025**. Already overdue.
- **WCAG 2.2 published:** October 5, 2023. WCAG 2.1 is being formally "obsoleted" by W3C, so 2.2 is the version you should target.
- **US private stores (ADA Title III):** no statutory date, but **5,114+ digital ADA lawsuits** were filed in 2025, up ~20% year over year. Average settlement: **$10,000 to $25,000**, plus your legal fees.
- **US state/local government sites (DOJ Title II rule):** WCAG 2.1 AA required by **April 24, 2026** (50,000+ population) and **April 24, 2027** (under 50,000). This is not WooCommerce private stores, but it raises the courtroom expectation for everyone.
- **Cheapest path to comply:** fix the top 6 WCAG failures that cause **96% of automatically detectable issues** (contrast, alt text, empty links/buttons, missing form labels, missing `lang`, low contrast). Most stores can be 80% of the way there in a weekend.

## What WCAG 2.2 actually requires by when

WCAG 2.2 became a W3C Recommendation on **October 5, 2023**. It adds 9 new success criteria on top of 2.1, including:

- **2.4.11 Focus Not Obscured (Minimum)** AA, new
- **2.4.12 Focus Not Obscured (Enhanced)** AAA, new
- **2.5.7 Dragging Movements** AA, new
- **2.5.8 Target Size (Minimum)** AA, 24x24 CSS pixels
- **3.2.6 Consistent Help** A, new
- **3.3.7 Redundant Entry** A, new
- **3.3.8 Accessible Authentication (Minimum)** AA, new
- **3.3.9 Accessible Authentication (Enhanced)** AAA

And one criterion was removed: **4.1.1 Parsing** (HTML parsing is now handled by browsers, so this no longer counts against you).

For WooCommerce specifically, the criteria that bite most often are **2.5.8 Target Size** (the +/- buttons in cart quantity selectors, the "Add to cart" buttons on mobile, and tiny icon-only buttons in mini-cart drawers) and **3.3.8 Accessible Authentication** (CAPTCHA on checkout). Both are easy to miss in a custom theme.

## The deadlines that actually matter for WooCommerce

### EU: European Accessibility Act, June 28, 2025

If you ship to **any** of the 27 EU member states, the EAA already applies to you, regardless of where your business is registered. It does not have a US-style "private right of action" yet, but member states are enforcing it through their own consumer protection bodies. Germany's BFSG (Barrierefreiheitsstärkungsgesetz) is the most active, with fines up to **EUR 100,000** for non-compliance.

There is a transitional provision: services contracted before June 28, 2025 can continue under existing terms until June 28, 2030. New checkouts, new sign-ups, new product flows do not get that grace period.

### US: ADA Title III, ongoing

There is no DOJ regulation that names a date for private ecommerce. What there is: a steady volume of demand letters and lawsuits citing WCAG 2.1 AA, with plaintiffs starting to cite **WCAG 2.2 AA** in 2026 cases because W3C has formally moved on from 2.1.

The practical deadline is whenever a plaintiff's law firm runs an automated scanner on your store. The math:

- **5,114 to 8,667** digital ADA lawsuits filed in 2025 (sources vary on whether state-court cases are included)
- ~**20%** year-over-year growth
- **95.9%** of home pages have detectable WCAG failures (WebAIM Million 2026)
- Average settlement: **$10,000 to $25,000** for a first-time defendant, much higher for repeat

### US: DOJ Title II rule, April 24, 2026 / April 24, 2027

This covers state and local government websites, not your WooCommerce store, but it matters because plaintiff law firms will use the same WCAG 2.1 AA standard as their reference point in Title III cases. If a Title II site is required to meet 2.1 AA by April 2026, expect that bar to be the baseline cited against private stores.

## What happens if you miss the deadline

**For US stores (no EU sales):**

1. You get a demand letter from a plaintiff's firm, usually after their scanner flags your site.
2. You have ~30 days to respond. Settling early is usually $5K to $15K. Letting it go to filing pushes it to $25K plus legal fees.
3. Settlement usually includes a remediation plan (you have to actually fix the site within 6 to 12 months) and sometimes a monitoring period.
4. Your name goes into the plaintiff firm database. Repeat lawsuits in 12 to 18 months are common.

**For stores selling into the EU:**

1. National enforcement bodies investigate after consumer complaints.
2. Fines vary by country. Germany's BFSG: up to EUR 100,000. Spain: up to EUR 600,000 for  serious violations.
3. You can be ordered to remove non-compliant services from the market until fixed.

## Cheapest, fastest path to compliance

If you have a weekend and a basic understanding of HTML, you can hit the top automatically detectable failures, which is where 96% of scanner-detected issues live. Here is the order:

1. **Run a baseline scan.** WAVE, axe DevTools, or a plugin scanner. Save the report so you can show "good faith" effort if a demand letter arrives.
2. **Fix color contrast first.** Buttons, link text, body text against backgrounds. WCAG 2.1 AA requires **4.5:1** for normal text, **3:1** for large text. This single fix often clears 30% of failures.
3. **Add alt text to product images.** Empty `alt=""` is fine for decorative, but every product photo needs real descriptive alt text.
4. **Label every form field.** Checkout fields, login forms, search bars. Every input needs a `<label>` or `aria-label`.
5. **Add focus indicators.** A visible outline on every interactive element when keyboard-focused. Themes often strip this.
6. **Set the `lang` attribute.** Single line in your theme's header: `<html lang="en">`. Surprisingly missing on many WooCommerce themes.
7. **Fix empty buttons and links.** Icon-only buttons need an `aria-label`. "Click here" links need real text.
8. **Increase tap target size.** Quantity +/- buttons, close buttons, mini-cart icons need to be **at least 24x24 CSS pixels** for WCAG 2.2 AA.
9. **Add skip links.** "Skip to main content" at the top of every page for keyboard users.
10. **Write an accessibility statement.** Publish it at /accessibility. Linking it from the footer is a strong good-faith signal in court.

This is not theoretical. The same 10 items are what 80% of demand letters cite.

## How AmazingPlugins helps

WooCommerce Accessibility Fixer is built specifically for the failures above. It is a WordPress plugin that uses real WooCommerce hooks and templates, not a JavaScript overlay (which has been used as evidence against defendants since the FTC's accessiBe ruling).

What it actually does on a WooCommerce store:

- Scans every product, cart, and checkout page against WCAG 2.1 and 2.2 AA criteria
- Auto-fixes safe categories: missing `lang`, empty button text, link distinguishing text, accessible input names, skip links, focus indicators, color contrast on theme buttons
- Generates draft alt text for product images that you can review and approve, since meaningful alt text is judgment-based and should not be fully automated
- Outputs a PDF compliance report you can attach to your accessibility statement, which is what plaintiff firms look for when deciding whether to pursue

Where it cannot help honestly: complex custom checkout flows that need human review, third-party iframes from payment processors, and anything that requires content judgment like meaningful product descriptions for screen reader users. Those still need a human pass.

If you want the full criterion list before deciding what to fix, see the [WCAG 2.2 Compliance WooCommerce: The Full Checklist](https://amazingplugins.com/blog/wcag-22-compliance-woocommerce-checklist/). If you want the line-by-line diff between 2.1 and 2.2, see [WCAG 2.2 Compliance for WooCommerce: What Changed](https://amazingplugins.com/blog/wcag-22-compliance-woocommerce-what-changed/).

## People also ask

### Is there a hard deadline for WCAG 2.2 compliance in the US?

No statutory deadline for private WooCommerce stores. The DOJ's Title II rule sets **April 24, 2026** for large state and local government sites and **April 24, 2027** for smaller ones, both at WCAG 2.1 AA. For private ecommerce under Title III, the deadline is whenever a plaintiff's scanner finds you. In practice, treat WCAG 2.2 AA as today's standard.

### Did the EAA  start in 2025? My store still works fine.

Yes, **June 28, 2025**. "Still works fine" is not a defense. EU enforcement is complaint-driven, so most stores have not been hit yet, but the legal exposure is real. If you have any EU customers, the law applies regardless of where you incorporated.

### Is WCAG 2.1 still enough?

Legally in most jurisdictions, yes for now. Practically, no. W3C has formally moved to **WCAG 2.2** and is in the process of "obsoleting" 2.1 documents. Plaintiffs are already citing 2.2 in 2026 cases, and the gap (9 new criteria) is small enough that there is no good reason to stop at 2.1.

### What's the difference between WCAG 2.2 AA and AAA for WooCommerce?

**AA** is the legal and practical target. **AAA** is the enhanced level that includes things like sign-language interpretation for video and is not realistic for most stores. Every reference to "WCAG compliance" in lawsuits, the EAA, and the DOJ rule means **AA**, not AAA.

### Can I just install an accessibility overlay and call it done?

No. Overlays have been called out by the FTC in the accessiBe case, named in plaintiff lawsuits, and recommended against by every credible accessibility consultancy. Courts now treat overlay-only stores as worse than no overlay, because it shows you knew about the problem and tried to paper over it. Fix the underlying HTML and CSS instead.

### How much does WooCommerce accessibility actually cost to fix?

A reasonable DIY weekend gets you 80% of the way for under $200 in plugin costs. A full agency audit and remediation is $5,000 to $25,000. A lawsuit settlement is $10,000 to $25,000 plus your legal fees plus the remediation you have to do anyway. The cost-benefit math on fixing it before you get a letter is overwhelming.
