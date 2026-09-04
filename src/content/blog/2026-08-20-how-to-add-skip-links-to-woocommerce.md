---
title: "How to Add Skip Links to WooCommerce (And Why Most Themes Get It Wrong)"
description: "Add a working skip link to your WooCommerce store so keyboard and screen reader users can bypass the header and jump straight to content."
pubDate: 2026-08-20T00:00:00.000Z
author: "Harun Ray"
tags:
  - woocommerce accessibility
  - skip links
  - keyboard navigation
  - WCAG compliance
gscSubmitted: true
---

Tab through your own WooCommerce store right now. Logo, then main nav, then the search icon, then the cart icon, then maybe a top announcement bar, then finally the page content. That's 10, sometimes 20, key presses before a keyboard user reaches anything they actually came for.

A skip link fixes this in one sentence of markup. Most WooCommerce themes either don't ship one, or ship one that's broken. Here's how to check which category yours falls into, and how to fix it either way.

## What a Skip Link Actually Does

A skip link is a hidden link at the very top of the page, invisible until it receives keyboard focus, that jumps straight to the main content area. Press Tab once on page load, and instead of landing on the first nav item, you land on a link that says "Skip to main content." Press Enter, and focus moves past the header entirely.

It costs sighted mouse users nothing. They never see it unless they tab into it by accident. For keyboard and screen reader users, it's the difference between reaching your product grid in one keystroke or twenty.

This is WCAG 2.4.1, Bypass Blocks, and it's a Level A requirement. That's the baseline tier, not an edge case.

## Why This Matters More on WooCommerce Than a Regular Site

A blog homepage has a header and then an article. Skipping the header saves a few tab presses. A WooCommerce store stacks more on top: a top bar with currency or shipping info, a full nav with dropdown mega-menus, a search bar, an account icon, and a cart icon that often opens a mini-cart on focus.

On a theme with a mega-menu, I've counted over 30 tab stops before reaching the shop page's first product. Someone using a switch device or a screen reader on a slow connection is not going to sit through that on every single page load, and WooCommerce reloads the full header on every page.

## How to Check If Your Store Already Has One

1. Click anywhere in your browser's address bar to make sure focus isn't already inside the page.
2. Press Tab once.
3. Look for a link that appears, usually top-left, with text like "Skip to content" or "Skip to main content."

Three outcomes:

| What you see | What it means |
|---|---|
| A visible "Skip to content" link appears | You have one. Press Enter and confirm it actually moves focus past the header. |
| Nothing visible happens, but you can still press Enter and the page jumps | The link exists but is invisible even on focus. Still broken. Sighted keyboard users can't see where they are. |
| Focus moves straight to the first nav item with no skip option | No skip link at all. |

That middle case is more common than you'd think. A lot of themes include a skip link in the markup because a WordPress theme review checklist requires it, then style it with `display: none` instead of hiding it off-screen. `display: none` removes it from the accessibility tree entirely, so screen readers skip right over it too. The link exists in the HTML and does nothing for anyone.

## Method 1: Check If Your Theme's Skip Link Is Just Styled Wrong

Before writing new code, open your browser's DevTools and search the page source for `skip-link` or `screen-reader-text`. If you find a link but it never becomes visible on focus, the fix is almost always the CSS, not the HTML.

Broken (hides the link everywhere, focus included):

```css
.skip-link {
  display: none;
}
```

Working (hides it visually until it's focused, but keeps it in the accessibility tree):

```css
.skip-link {
  position: absolute;
  left: -9999px;
  top: 0;
  z-index: 999999;
  padding: 12px 16px;
  background: #000;
  color: #fff;
  text-decoration: none;
}

.skip-link:focus {
  left: 8px;
  top: 8px;
}
```

If your theme already has the markup, adding this to Appearance > Customize > Additional CSS is often the entire fix.

## Method 2: Add a Skip Link From Scratch

If there's no skip link markup at all, you need two pieces: the link itself, placed as the very first focusable element in the page, and a matching `id` on your main content wrapper.

In your theme's `header.php`, right after the opening `<body>` tag:

```php
<a class="skip-link screen-reader-text" href="#main-content">
    <?php esc_html_e( 'Skip to content', 'your-theme' ); ?>
</a>
```

Then find your main content wrapper, usually in `header.php` or the start of a page template, and give it a matching id:

```html
<main id="main-content">
```

Add the CSS from Method 1 above so the link is hidden until focused. Test it the same way: click the address bar, press Tab, confirm the link appears and Enter jumps you past the header.

## Common Mistakes That Break Skip Links

- **Linking to an id that doesn't exist.** If `href="#main-content"` doesn't match any element's `id="main-content"` on the page, the link does nothing when activated.
- **Putting the link after the header in the DOM.** It needs to be the first focusable element on the page, before the logo, before the nav.
- **Forgetting `tabindex="-1"` on older browsers.** Some older Safari and Firefox versions won't move visual focus to a target element unless it's programmatically focusable. Adding `tabindex="-1"` to the `#main-content` element fixes this without making it a normal tab stop.
- **Only testing with a mouse.** A skip link that looks fine in the customizer preview but was never actually tabbed to is not tested.

## Editing a Child Theme Safely

If you're not comfortable editing `header.php` directly, hook into `wp_body_open` instead of touching template files:

```php
add_action( 'wp_body_open', function () {
    echo '<a class="skip-link screen-reader-text" href="#main-content">Skip to content</a>';
} );
```

This runs on any theme that calls `wp_body_open()`, which is every theme built since WordPress 5.2. It survives theme updates, since it lives in your child theme's `functions.php` instead of a template file.

## How the Accessibility Fixer Plugin Handles This

Auditing and patching skip links by hand means checking `header.php`, confirming the target id exists, and testing the CSS in every browser your customers use. The [WooCommerce Accessibility Fixer](/plugins/woocommerce-accessibility-fixer/) does this automatically: it inserts a correctly hidden, correctly targeted skip link at the top of every page, without touching your theme files, so it survives theme and WooCommerce updates.

It also checks that the link actually lands somewhere useful. A skip link that jumps to an empty `<div>` technically passes an automated scanner but fails a real user. The fixer targets your actual content wrapper, tested against the WooCommerce templates your store is running.

## Related Reading

- [How to Fix Keyboard Navigation in WooCommerce](/blog/keyboard-navigation-woocommerce-fix-guide/)
- [10 Common Accessibility Issues on E-commerce Sites](/blog/10-common-accessibility-issues-on-e-commerce-sites/)
- [WooCommerce ADA Compliance Checklist for 2026](/blog/woocommerce-ada-compliance-checklist-2026/)

## Quick Checklist

- [ ] Click the address bar, press Tab once, confirm a skip link appears
- [ ] Confirm the link is visible on focus, not just present in the HTML
- [ ] Press Enter and confirm focus actually lands past the header
- [ ] Check the link's `href` matches a real `id` on the page
- [ ] Test on your shop page, a single product page, and checkout, not just the homepage
- [ ] Consider the [WooCommerce Accessibility Fixer](/plugins/woocommerce-accessibility-fixer/) if you'd rather not hand-edit theme files

Ten minutes with the Tab key tells you more about your store's accessibility than most audits. If your skip link doesn't show up on the first press, that's not a minor bug. It's the first thing a keyboard user hits on every page of your store.
