---
title: "WCAG 2.1 AA vs AAA: What Changes for E-commerce?"
description: "A practical breakdown of WCAG AA vs AAA for e-commerce: what each conformance level requires and whether AAA is worth the effort for your store."
pubDate: 2026-04-21T00:00:00.000Z
updatedDate: 2026-11-26T00:00:00.000Z
author: Harun Ray
tags:
  - WCAG
  - Accessibility Standards
  - Compliance
gscSubmitted: true
---

Your lawyer says AA. A consultant says AAA. A forum post says A is plenty. For a WooCommerce store only one of those is a sensible target, and it's AA. Here's what each level asks for and why.

**Review method, November 26, 2026:** Every level and criterion number below was checked against the [WCAG 2.1 Recommendation](https://www.w3.org/TR/WCAG21/). This is a practical guide, not legal advice.

## What the three levels are

WCAG sorts its success criteria into three conformance levels. Think of them as a building code:

| Level | Analogy | What it means |
|-------|---------|---------------|
| **A** | Habitable | The minimum. The building won't collapse, but it isn't comfortable |
| **AA** | Code-compliant | Meets the building code. Safe and usable for most people |
| **AAA** | Luxury | Goes beyond code. Built for the best possible experience |

WCAG 2.1 has 78 success criteria: 30 at Level A, 20 at Level AA and 28 at Level AAA. The levels stack. To conform at AA you meet all 50 of the A and AA criteria. AAA adds the other 28 on top.

## What each level asks for

### Level A: the floor

Fail one of these and some people can't use the page at all.

- Images need a text alternative (1.1.1). A blind shopper gets nothing from an unlabeled product photo.
- Everything works from the keyboard (2.1.1), and focus never gets trapped (2.1.2).
- Form fields have labels or instructions (3.3.2), and errors are identified in text (3.3.1).
- Repeated blocks can be skipped, for example with a skip link (2.4.1), and focus moves in a logical order (2.4.3).
- Nothing flashes more than three times a second (2.3.1).

### Level AA: the usual target

AA covers barriers that affect many more people.

- Text has a contrast ratio of at least 4.5:1, or 3:1 for large text (1.4.3).
- Field borders, icons and focus rings have at least 3:1 against what's around them (1.4.11).
- Keyboard focus is visible (2.4.7).
- Error messages suggest a fix when they can (3.3.3).
- Pages that place an order or move money let people review, correct or confirm before submitting (3.3.4). That's your checkout.
- Navigation that repeats across pages stays in the same order (3.2.3).

### Level AAA: stricter, and not meant for a whole site

AAA criteria are tighter or broader than their AA versions.

- 7:1 contrast for text, or 4.5:1 for large text (1.4.6).
- Keyboard access with no exceptions (2.1.3).
- No time limits on interactions (2.2.3).
- Sign language for prerecorded audio (1.2.6).
- Touch targets of at least 44 by 44 CSS pixels (2.5.5).
- Error prevention on every form, not only legal and financial ones (3.3.6).

The W3C says Level AAA shouldn't be required as a general policy for entire sites, because some content can't satisfy every AAA criterion. Use individual AAA criteria where they're cheap. Large tap targets on checkout buttons are a good example.

## The same checkout at each level

| Topic | Level A | Level AA | Level AAA |
|-------|---------|----------|-----------|
| Text contrast | None | 4.5:1 (3:1 for large text), 3:1 for borders and icons | 7:1 (4.5:1 for large text) |
| Form errors | Labels and instructions, errors named in text | The error suggests a fix, and orders can be reviewed or confirmed | Review or confirmation on every form |
| Keyboard | Works from the keyboard, no traps, logical order, skip link | Focus is visible | No exceptions |
| Tap targets | None | None in 2.1 (WCAG 2.2 adds a 24 pixel minimum) | 44 by 44 pixels |

For a store, AA is the realistic line. Most modern themes can reach 4.5:1 without a redesign. Pushing every line of text to 7:1 can flatten a brand for a small gain.

## Which level your store needs

AA. These are the rules and references people usually point to:

| Rule or context | Level it points to |
|-----------------|--------------------|
| US private-sector lawsuits and settlements (the ADA names no technical standard) | WCAG 2.1 AA is the usual yardstick |
| US DOJ rule for state and local government websites (April 2024) | WCAG 2.1 AA |
| European Accessibility Act, enforceable since 28 June 2025 | AA, through EN 301 549 |
| Section 508 (US federal agencies) | WCAG 2.0 AA |

None of these asks for AAA. Level A alone is the floor: it doesn't cover text contrast or visible focus, so it rarely matches what the rules above point to. If someone tells you AAA is required to avoid a lawsuit, ask them which rule says so.

## Why AA is the right target

- **It's reachable on an ordinary theme.** Contrast, labels, focus rings and keyboard checks are fixable work, and AA has no criteria that fight each other.
- **It's what the rules name.** Keep a dated record of what you tested and fixed so you can show your process.
- **The fixes help everyone.** Clearer errors, readable text and visible focus make checkout easier for every customer.

## A note on WCAG 2.2

WCAG 2.2 adds nine success criteria (two at A, four at AA and three at AAA) and removes 4.1.1 Parsing. The levels work the same way. If you're testing now, test against 2.2 AA: it includes the 2.1 AA requirements apart from parsing. The [WCAG 2.2 requirements guide](/blog/wcag-2-2-wordpress-woocommerce-requirements/) and the [2.2 checklist](/blog/wcag-22-compliance-woocommerce-checklist/) cover what changed.

## How to test your store against AA

Automated tools check part of AA, such as contrast, missing alt text and missing labels. They can't tell you whether alt text is useful or whether a keyboard path makes sense. You need both kinds of testing.

1. Run [WAVE](https://wave.webaim.org/), the [axe browser extension](https://www.deque.com/axe/browser-extensions/) or Lighthouse on the homepage, a product page, cart, checkout and account pages.
2. Fix what they report.
3. Try the whole purchase with only Tab, Shift+Tab, Enter, Space and the arrow keys.
4. Repeat it with a screen reader. NVDA is free, and VoiceOver ships with macOS. The [screen reader testing guide](/blog/screen-reader-testing-woocommerce-guide/) walks through it.
5. Check your results against the [WCAG 2.1 quick reference](https://www.w3.org/WAI/WCAG21/quickref/?versions=2.1).

The free [AP Accessibility Fixer for WooCommerce](/plugins/woocommerce-accessibility-fixer/) offers nine targeted fixes, including an empty product-image alt fallback and selected focus styles. It doesn't make a store conformant by itself, so keep the manual checks.

## FAQ: WCAG levels for e-commerce

**Is Level AAA required for an online store?**
No. None of the rules above asks for it, and the W3C advises against requiring it for a whole site.

**Does a clean automated scan mean I meet AA?**
No. Scans can't judge whether labels make sense, whether focus order is logical or whether a screen reader user can finish checkout. Test those by hand.

**Should I test against WCAG 2.1 or 2.2?**
Most rules and lawsuits still cite 2.1 AA. WCAG 2.2 AA covers the 2.1 AA requirements apart from the obsolete parsing criterion, so testing against 2.2 covers both.

**Can one page go beyond AA?**
Yes. WCAG conformance is judged per page, so a critical page like checkout can meet extra criteria, such as larger tap targets or AAA contrast, while the rest of the site stays at AA.

---

## Related Reading

- [WCAG 2.2 Is Here. What Does It Mean for Your WordPress or WooCommerce Store?](/blog/wcag-2-2-wordpress-woocommerce-requirements/)
- [Does the ADA Actually Apply to Your WooCommerce Store?](/blog/does-the-ada-actually-apply-to-your-woocommerce-store/)
- [The Most Common WooCommerce WCAG Violations (And How to Fix Them)](/blog/woocommerce-wcag-violations-guide/)
- [WCAG 2.2 Compliance WooCommerce: The Full Checklist](/blog/wcag-22-compliance-woocommerce-checklist/)
- [WooCommerce Accessibility Fixer](/plugins/woocommerce-accessibility-fixer/)

