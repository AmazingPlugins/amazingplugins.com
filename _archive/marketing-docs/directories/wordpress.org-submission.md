# WordPress.org Plugin Directory — Submission Draft
**Product:** WooCommerce Accessibility Auto-Fixer
**Date:** 2026-04-12
**Status:** Draft — not yet submitted

---

## Submission Details

**Plugin Name:** WooCommerce Accessibility Auto-Fixer
**Short Description:** One-click WCAG 2.1 AA compliance fixes for WooCommerce. Automatically detects and fixes missing alt text, keyboard navigation traps, focus indicators, form labels, color contrast, heading hierarchy, and ARIA landmark issues.
**Plugin URL:** https://github.com/your-github/woocommerce-accessibility-fixer (TBD — needs GitHub repo public)
**Support URL:** https://amazingplugins.com/support/
**Requires at Least:** 5.8
**Tested Up To:** 6.4
**Requires PHP:** 7.4
**License:** GPL-2.0-or-later

---

## Sections

### Description (55 chars max for title; 100 char description for directory)

One-click WCAG 2.1 AA compliance fixes for WooCommerce. Automatically detects and fixes missing alt text, keyboard navigation traps, focus indicators, form labels, color contrast, heading hierarchy, and ARIA landmark issues. Free tier includes 3 fixes. Pro unlocks all 9 fixes from $19/mo.

### Installation

1. Upload the plugin to `/wp-content/plugins/woocommerce-accessibility-fixer/`
2. Activate through the WordPress Plugins screen
3. Navigate to **WooCommerce → WCAG Auto-Fix**
4. Run your first scan and apply fixes

### FAQ

**What is WCAG 2.1 AA?**
WCAG (Web Content Accessibility Guidelines) 2.1 Level AA is the accessibility standard required by the ADA, European Accessibility Act (EAA), and most major accessibility laws worldwide. It covers perceivable, operable, understandable, and robust content.

**Is this an overlay?**
No. Unlike overlay widgets (AccessiBe, UserWay), this plugin fixes accessibility issues at the source code level inside your WooCommerce templates. Courts have rejected overlays as evidence of compliance.

**Does this guarantee WCAG compliance?**
No plugin can guarantee 100% compliance. This plugin automatically fixes the 9 most common WooCommerce accessibility issues. A full accessibility audit is recommended for complete compliance.

**What fixes are free?**
Skip link, focus indicator, and product image alt text are free forever. Pro ($19/mo) unlocks keyboard trap fixes, form labels, error messages, color contrast, heading hierarchy, and landmark roles.

### Changelog

**1.0.0** (TBD)
- Initial release
- 3 free fixes: skip link, focus indicator, product alt text
- 9 pro fixes: keyboard trap, form labels, error messages, color contrast, heading hierarchy, landmark roles
- WooCommerce HPOS compatible

---

## Pre-Submission Checklist

- [ ] GitHub repository is public with a clean README
- [ ] `Stable tag` in readme.txt matches plugin version
- [ ] Assets (banner, icon) are 772×250 and 512×512 PNG respectively
- [ ] PHP version tested (8.x recommended)
- [ ] No nulled or encoded code
- [ ] No external API calls on plugin activation (defer to admin_init)
- [ ] WordPress coding standards pass (composer cs)
- [ ] PHPStan level 5 passes
- [ ] Unit tests pass
- [ ] Plugin SVN trunk created at https://plugins.svn.wordpress.org/woocommerce-accessibility-fixer/

---

## Notes

- WordPress.org approval typically takes 1-2 weeks
- Reviewers check: readme.txt formatting, stable tag, assets, PHP quality
- After approval, updates go through SVN commits
- Need to set up GitHub Actions or similar to sync to SVN on tags
