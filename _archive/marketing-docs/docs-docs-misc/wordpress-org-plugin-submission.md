# WordPress.org Plugin Submission

**Product:** AmazingPlugins WooCommerce Accessibility Fixer
**Status:** Submitted (April 2026), awaiting approval (2-4 week queue)
**Last updated:** 2026-04-13

---

## Submission Status

Submitted: April 11, 2026 (approximately)
Queue: 2-4 weeks typical
Forum support thread: Not yet written

---

## What Was Submitted

The WooCommerce Accessibility Fixer plugin (10 fixers: AltText, ColorContrast, ErrorMessage, FocusIndicator, FormLabel, HeadingHierarchy, KeyboardTrap, Landmark, SkipLink, AltTextProduct).

---

## WordPress.org Requirements

### 1. License
- Must be GPLv2+ compatible
- The plugin is already GPLv2+

### 2. SVN Repository
- After approval, WordPress.org provides an SVN repository
- Structure:
  ```
  /trunk/           — latest development version
  /tags/1.0.0/     — each release tagged
  /assets/          — banner, icon, screenshots (top level, not in trunk)
  ```

### 3. readme.txt
Must follow WordPress.org readme format. Key sections:
- Plugin name
- Short description (150 chars max for wordpress.org display)
- Description (full)
- Installation
- Frequently Asked Questions
- Changelog
- Upgrade notice
- Screenshots
- Tags
- Requires at least / Tested up to

### 4. Plugin Header (in main PHP file)
```php
/*
Plugin Name: AmazingPlugins WooCommerce Accessibility Fixer
Plugin URI: https://amazingplugins.com/woocommerce-accessibility-fixer
Description: Automatically fixes WCAG 2.1 AA accessibility issues on your WooCommerce store. No code needed.
Version: 1.0.0
Requires at least: 5.0
Requires PHP: 7.4
Author: AmazingPlugins
Author URI: https://amazingplugins.com
License: GPLv2+
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Text Domain: amazingplugins-woo-accessibility-fixer
Domain Path: /languages
*/
```

### 5. Assets (in /assets/ at repo root, NOT in trunk)

**Banner (required):**
- `banner-772x250.png` (772px wide × 250px tall)
- `banner-1544x500.png` (2x retina version)
- Optional RTL: `banner-772x250-rtl.png`
- Max 4MB per file

**Icon (optional but recommended):**
- `icon-128x128.png` (128×128)
- `icon-256x256.png` (2x retina)
- `icon.svg` (vector, must also have PNG fallback)
- Max 1MB per file

**Screenshots:**
- `screenshot-1.png` / `screenshot-1.jpg` (numbered sequentially)
- Must match descriptions in readme.txt (line-by-line correspondence)
- Max 10MB per file
- Lowercase filenames only

---

## What to Do After SVN Access Is Granted

1. **Set up SVN locally**
   ```bash
   svn checkout https://plugins.svn.wordpress.org/amazingplugins-woo-accessibility-fixer/
   ```

2. **Add assets to /assets/** (top level, not trunk)
   - `assets/banner-772x250.png`
   - `assets/banner-1544x500.png`
   - `assets/icon-128x128.png`
   - `assets/icon-256x256.png`
   - `assets/screenshot-1.png` (and more)

3. **Commit to trunk/** with the full plugin code

4. **Tag first release:**
   ```bash
   svn cp trunk tags/1.0.0
   svn commit -m "Tag version 1.0.0"
   ```

---

## WordPress.org Review Common Rejections

1. **readme.txt format incorrect** — use the readme validator at https://wordpress.org/plugins/developers/readme-validator/
2. **Missing or incorrect plugin header** — must include all required fields
3. **Plugin name too similar to existing plugin** — must be clearly unique
4. **Description is marketing-speak, not feature description** — describe what it does, not how good it is
5. **No screenshots** — at least 1 screenshot required
6. **Code quality issues** — no `eval()`, no inline styles/scripts (use enqueue), proper escaping
7. **No PHP documentation** — functions/classes should be documented
8. **Suspicious behavior** — the plugin can't do anything unauthorized to the site

---

## Resources

- [WordPress.org Plugin Developer FAQ](https://developer.wordpress.org/plugins/wordpress-org/plugin-developer-faq/)
- [Detailed Plugin Guidelines](https://developer.wordpress.org/plugins/wordpress-org/detailed-plugin-guidelines/)
- [Common Plugin Review Issues](https://developer.wordpress.org/plugins/wordpress-org/common-issues/)
- [Readme Validator](https://wordpress.org/plugins/developers/readme-validator/)
- [Readme Standard](https://developer.wordpress.org/plugins/wordpress-org/how-your-readme-txt-works/)
