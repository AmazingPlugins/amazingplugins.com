---
title: 'Shopify subscription widget accessibility fixes: selling plans, Recharge, and frequency pickers'
description: >-
  How to fix accessibility problems in Shopify subscription widgets, including
  selling plan selectors, delivery frequency dropdowns, and Recharge and
  Skio widgets, without removing the subscription option.
date: 2026-06-08T00:00:00.000Z
pubDate: 2026-06-08T00:00:00.000Z
author: Harun Ray
tags:
  - Shopify
  - Accessibility
  - Subscriptions
  - WCAG
  - ADA Compliance
seoKeywords:
  - Shopify subscription widget accessibility
  - Recharge subscription widget accessibility
  - Shopify selling plan accessibility
seoCategory: shopify
articleAngle: remediation-guide
gscSubmitted: true
canonical: 'https://amazingplugins.com/blog/shopify-subscription-widget-accessibility-fixes/'
---

Subscription widgets are one of the most common accessibility blockers on a Shopify product page, and they are easy to miss because they look fine with a mouse. A customer who uses a keyboard or a screen reader often cannot tell whether they are buying once or subscribing, cannot change the delivery frequency, and cannot find out what they are committing to. This guide covers exactly what breaks in subscription widgets, which WCAG criteria apply, and how to patch the failures at the storefront level without removing the subscription option or switching apps.

If you want the broader picture of how third-party apps introduce accessibility problems across a store, the [Shopify third-party app WCAG violations guide](/blog/shopify-third-party-apps-wcag-violations/) covers the full pattern. This post focuses on subscription widgets specifically.

## What a subscription widget actually is

A subscription widget is the block on a product page that lets a customer choose between a one-time purchase and a recurring order, and set how often the order repeats. On Shopify it is usually built on top of Shopify's native selling plans, and rendered by a subscription app like Recharge, Skio, Loop, Seal, or Appstle.

Most widgets contain three parts:

1. A choice between "one-time purchase" and "subscribe and save," usually radio buttons or two stacked options.
2. A delivery frequency selector, like "every 30 days" or "every 2 months," usually a dropdown.
3. A price and discount display that updates when the customer changes their selection.

All three parts are interactive, and all three are where the accessibility failures cluster.

## Why subscription widgets break accessibility so reliably

Subscription apps inject their widget into the product form after the page loads, and they replace Shopify's native radio inputs and selects with custom styled markup. That custom markup is where the problems start. A native `<input type="radio">` and a native `<select>` are accessible by default. A `<div>` styled to look like a radio button is not.

Four failures show up again and again in subscription widget audits:

1. The one-time versus subscribe choice is built from `<div>` or `<span>` elements with click handlers, so it has no role, no checked state, and no keyboard support.
2. The frequency selector is a custom dropdown that opens on click but cannot be opened or navigated with a keyboard.
3. The two options are not grouped, so a screen reader reads "subscribe and save" and "one-time purchase" as loose text with no indication they are a single choice.
4. The price and discount update visually when the selection changes, but the change is never announced, so a screen reader user does not know the price moved.

That list covers WCAG 2.1.1 (Keyboard), 1.3.1 (Info and Relationships), 4.1.2 (Name, Role, Value), and 4.1.3 (Status Messages). These are baseline criteria, not edge cases.

## The WCAG criteria that actually apply

The six criteria below matter most for subscription widgets.

**WCAG 2.1.1 Keyboard (Level A):** The customer must be able to choose one-time or subscribe, open the frequency selector, and pick a frequency using only a keyboard. A custom dropdown that only responds to mouse clicks fails here.

**WCAG 1.3.1 Info and Relationships (Level A):** The two purchase options are a single related choice and must be grouped, normally with a `<fieldset>` and `<legend>` or a radio group with an accessible group name. Without grouping, the relationship between the options is lost to assistive technology.

**WCAG 4.1.2 Name, Role, Value (Level A):** Each option needs a role, an accessible name, and a state that exposes whether it is selected. A `<div>` acting as a radio button has none of these. The frequency selector needs a name like "Delivery frequency" and must expose its current value.

**WCAG 4.1.3 Status Messages (Level AA):** When the price or discount updates after the customer changes their selection, that change must be announced without moving focus. This requires a live region. A visual-only price update leaves screen reader users unaware that anything changed.

**WCAG 2.4.6 Headings and Labels (Level AA):** The frequency dropdown and the subscribe option both need clear labels. "Every 30 days" alone is not a label for the control. The control needs a name that says what it controls, like "Delivery frequency."

**WCAG 1.4.3 Contrast Minimum (Level AA):** Subscription widgets often render the discount badge, the "save 15%" text, or the secondary "one-time" option in low-contrast gray. The minimum ratio is 4.5:1 for normal text and 3:1 for large text. Many default widget themes fail this on the less-promoted option.

## Merchant QA checklist for subscription widgets

Run this with a keyboard only, mouse set aside. Then run it again with VoiceOver on macOS Safari or NVDA on Windows Chrome.

1. Tab to the subscription widget. Confirm focus lands on a real control, not a non-focusable `<div>`.
2. With the keyboard, switch between "one-time purchase" and "subscribe and save." Confirm both can be selected and the selected state is announced.
3. Confirm the screen reader announces the two options as a group, such as "Purchase options, subscribe and save, radio button, selected."
4. Tab to the delivery frequency selector. Confirm it can be opened and a frequency chosen using only the keyboard.
5. Confirm the frequency control has a name like "Delivery frequency," not just the current value.
6. Change the selection from one-time to subscribe. Confirm the price and discount change is announced, not just shown.
7. Confirm the discount text and the secondary option meet 4.5:1 contrast.
8. Add the subscription to cart with the keyboard. Confirm the cart reflects the correct frequency and that it carried through to checkout.
9. Confirm the chosen frequency is readable in the cart and checkout summary, not hidden in a properties blob.
10. Reload the page and repeat with the screen reader from the start, listening for whether the default selection is announced on load.

Log each step as pass, fail, or partial. A partial means it works but with a degraded experience, like a frequency that can be selected but is never announced.

## The purchase options: before and after

Most subscription apps render the one-time versus subscribe choice like this:

```html
<!-- BEFORE: common app output -->
<div class="sub-widget">
  <div class="sub-option sub-option-active" data-plan="subscribe">
    <span>Subscribe and save 15%</span>
  </div>
  <div class="sub-option" data-plan="onetime">
    <span>One-time purchase</span>
  </div>
  <div class="sub-frequency">
    <div class="freq-trigger">Every 30 days</div>
    <ul class="freq-list">
      <li data-value="30">Every 30 days</li>
      <li data-value="60">Every 60 days</li>
    </ul>
  </div>
</div>
```

Screen readers see two pieces of loose text and a third piece of text that looks like a button but has no role. There is no group, no selected state, and the frequency list is unreachable by keyboard.

The patched version uses native semantics:

```html
<!-- AFTER: native, accessible markup -->
<fieldset class="sub-widget">
  <legend>Purchase options</legend>

  <label>
    <input type="radio" name="purchase-type" value="subscribe" checked />
    Subscribe and save 15%
  </label>

  <label>
    <input type="radio" name="purchase-type" value="onetime" />
    One-time purchase
  </label>

  <label for="sub-frequency">Delivery frequency</label>
  <select id="sub-frequency" name="frequency">
    <option value="30">Every 30 days</option>
    <option value="60">Every 60 days</option>
  </select>
</fieldset>
```

Changes:
- A `<fieldset>` with a `<legend>` groups the two options into one named choice.
- Real `<input type="radio">` elements give each option a role, an accessible name, and a selected state for free.
- A real `<select>` for frequency is keyboard-accessible and announces its value with no extra code.
- The frequency control has a `<label>` that names what it does, not just the current value.

If you control the theme and the app exposes a way to use Shopify's native selling plan inputs, this is the most stable fix. Native controls do not regress when the browser updates.

## When you cannot replace the markup: patch the custom widget

Many apps do not let you swap their markup for native controls. In that case you keep the custom widget and add the missing semantics. For a custom radio group built from `<div>` elements, the ARIA radio group pattern applies:

```html
<!-- Custom widget patched with ARIA -->
<div role="radiogroup" aria-label="Purchase options">
  <div
    class="sub-option"
    role="radio"
    aria-checked="true"
    tabindex="0"
    data-plan="subscribe"
  >
    Subscribe and save 15%
  </div>
  <div
    class="sub-option"
    role="radio"
    aria-checked="false"
    tabindex="-1"
    data-plan="onetime"
  >
    One-time purchase
  </div>
</div>
```

With `role="radiogroup"` and `role="radio"`, the screen reader announces the group and the selected state. The roving `tabindex` (0 on the selected option, -1 on the rest) means Tab reaches the group once and arrow keys move between options, which is the expected behavior for a radio group. You still need the JavaScript that handles arrow keys and toggles `aria-checked`, which the runtime patch below provides.

## Runtime patch for a custom subscription widget

This script runs after the widget appears, wires up keyboard support for a custom radio group, and announces price changes through a live region. Add it to your theme's `layout/theme.liquid` or as a Shopify app embed block:

```javascript
(function patchSubscriptionWidget() {
  function patch(widget) {
    if (widget.dataset.a11yPatched) return;
    widget.dataset.a11yPatched = 'true';

    var options = widget.querySelectorAll('.sub-option');
    if (!options.length) return;

    // Build a radio group
    widget.setAttribute('role', 'radiogroup');
    if (!widget.getAttribute('aria-label')) {
      widget.setAttribute('aria-label', 'Purchase options');
    }

    options.forEach(function (opt) {
      opt.setAttribute('role', 'radio');
      var active = opt.classList.contains('sub-option-active');
      opt.setAttribute('aria-checked', active ? 'true' : 'false');
      opt.setAttribute('tabindex', active ? '0' : '-1');
    });

    function select(opt) {
      options.forEach(function (o) {
        o.setAttribute('aria-checked', 'false');
        o.setAttribute('tabindex', '-1');
      });
      opt.setAttribute('aria-checked', 'true');
      opt.setAttribute('tabindex', '0');
      opt.focus();
      opt.click(); // let the app's own handler update price and state
    }

    widget.addEventListener('keydown', function (e) {
      var current = document.activeElement;
      if (current.getAttribute('role') !== 'radio') return;
      var list = Array.prototype.slice.call(options);
      var i = list.indexOf(current);
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        select(list[(i + 1) % list.length]);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        select(list[(i - 1 + list.length) % list.length]);
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        select(current);
      }
    });

    // Announce price and discount changes
    var live = document.createElement('div');
    live.setAttribute('aria-live', 'polite');
    live.setAttribute('aria-atomic', 'true');
    live.className = 'visually-hidden';
    widget.appendChild(live);

    var price = document.querySelector('[data-subscription-price], .price');
    if (price) {
      new MutationObserver(function () {
        live.textContent = 'Price updated to ' + price.textContent.trim();
      }).observe(price, { childList: true, subtree: true, characterData: true });
    }
  }

  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (m) {
      m.addedNodes.forEach(function (node) {
        if (node.nodeType !== 1) return;
        var widget =
          node.querySelector('[class*="sub-widget"], [class*="subscription"]') ||
          node;
        if (widget.className && widget.className.toString().match(/sub|subscription|selling-plan/i)) {
          patch(widget);
        }
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
```

This is a starting point, not a complete solution. It handles the most common gaps. Some apps render inside shadow DOM or use a framework that re-renders the widget on every interaction, which wipes your patch and requires a more targeted fix. Test after every app update.

## App-specific patterns

### Recharge

Recharge widgets commonly render the subscribe and one-time choice as styled `<div>` elements, which means the radio group patch above usually applies directly. The most frequent Recharge failure is the missing announcement when the price updates after switching to a subscription, because Recharge updates the price node without notifying assistive technology. The live region in the runtime patch covers this. Recharge also offers a native integration mode in newer versions that uses Shopify selling plan inputs, which is worth enabling if your theme supports it.

### Skio and Loop

Skio and Loop both lean on Shopify's native selling plan groups more than older apps, so their radio inputs are often real `<input>` elements. The remaining gap is usually grouping and labeling: the inputs exist but are not wrapped in a `<fieldset>` with a `<legend>`, and the frequency `<select>` has no associated `<label>`. Add the group and the label and most of the problem is solved.

### Custom selling plan UIs

Some merchants build their own selling plan picker on top of the Shopify Subscriptions app. These are the most variable. The fix is always the same target: a named radio group for the purchase type, a labeled `<select>` for frequency, and a live region for price changes. Build to that target regardless of how the current markup looks.

## Vendor evidence and the retest workflow

When you fix an issue, record it. If your store receives a demand letter or an audit request, this log shows you identified the problem and acted. The same record format works whether you fixed it yourself or the vendor shipped a fix.

| App / widget | Issue found | WCAG criterion | Severity | Fix applied | Retest date | Result |
|---|---|---|---|---|---|---|
| Recharge widget | Purchase options are divs, no role or state | 4.1.2, 1.3.1 | Blocker | Runtime ARIA radio group patch | 2026-06-08 | Pass |
| Recharge widget | Price change not announced | 4.1.3 | Major | Added aria-live region | 2026-06-08 | Pass |
| Frequency selector | Custom dropdown not keyboard operable | 2.1.1 | Blocker | Replaced with native select | 2026-06-08 | Pass |
| Frequency selector | No label, only shows current value | 2.4.6 | Major | Added associated label | 2026-06-08 | Pass |
| Discount badge | "Save 15%" text at 2.9:1 contrast | 1.4.3 | Major | Color updated via theme CSS | 2026-06-08 | Pass |
| Custom widget | Default selection not announced on load | 4.1.2 | Minor | Vendor contacted, pending update | --- | Open |

Record the screen reader and version used for each retest. VoiceOver on Safari and NVDA on Chrome handle ARIA radio groups and live regions differently, and documenting both matters.

For the retest workflow itself:

1. Reproduce the original failure first, so you can prove the fix changed the behavior.
2. Apply the fix, then retest with keyboard only and with at least one screen reader.
3. Test the full path through cart and checkout, since a subscription that is accessible on the product page but loses its frequency at checkout is still broken. The [Shopify checkout accessibility fixes guide](/blog/shopify-checkout-accessibility-fixes/) covers the checkout side.
4. Re-run after every app or theme update, because subscription widgets re-render on the client and patches can silently break.

If you want a structured place to keep this record, the difference between a statement, a policy, and a working log is explained in [accessibility statement vs policy vs remediation log](/blog/shopify-accessibility-statement-vs-policy-vs-remediation-log/). For a full project plan around remediation, use the [ADA ecommerce remediation plan template](/blog/ada-ecommerce-remediation-plan-template/).

Subscription widgets are a modal-adjacent component when they open a frequency picker in an overlay, so the focus and labeling patterns in the [Shopify popup app accessibility fixes guide](/blog/shopify-popup-app-accessibility-fixes/) apply to those cases too.

## How AmazingPlugins helps

The [Shopify Accessibility Fixer app](/plugins/shopify-accessibility-fixer/) automates several of the fixes above. It detects subscription widgets that render purchase options as non-semantic elements and applies the radio group pattern at runtime. It adds the missing labels to frequency selectors and wires up a live region so price and discount changes are announced. It also flags which app is rendering the widget, which helps when you have several apps active and are not sure which one is causing a given failure.

The patterns in this post are stable on their own. They follow the [W3C WCAG 2.2 specification](https://www.w3.org/TR/WCAG22/) and the [WAI-ARIA radio group pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/), and those standards do not change often.

## FAQ

**Can I fix subscription widget accessibility without changing the app?**

Often yes. The runtime patch observes the DOM, adds the radio group semantics, wires up keyboard support, and announces price changes, all without touching the app files. The limit is apps that render inside shadow DOM or re-render on every interaction, which can wipe the patch and need a more targeted approach. Start with the MutationObserver pattern and escalate if it does not hold.

**Should I use native selling plan inputs or patch the custom widget?**

Use native inputs when your theme and app support them. A real `<input type="radio">` and `<select>` are accessible by default and do not regress on browser updates. Patch the custom widget only when the app gives you no native option. The native route is less code and more stable.

**My subscription app vendor says the widget is WCAG compliant. Should I trust that?**

Test it yourself first. Run the QA checklist with a keyboard and a screen reader. Many widgets pass automated scanners but fail manual testing, because scanners cannot tell whether a price change was announced or whether a custom dropdown is keyboard operable. Criteria 2.1.1, 4.1.2, and 4.1.3 are best confirmed by hand.

**The frequency selector works with a mouse but not a keyboard. Is that a real failure?**

Yes, and it is a Level A failure under WCAG 2.1.1. Any control that can be operated with a mouse must also be operable with a keyboard. A custom dropdown that only opens on click locks out keyboard and many screen reader users entirely. Replace it with a native `<select>` or add full keyboard handling.

**How often should I re-audit subscription widgets?**

After every app update and after any theme change that affects script loading. Subscription widgets re-render on the client, so a widget that passed last month can regress when the vendor ships a new version. Set a reminder to re-run the checklist on each update.
