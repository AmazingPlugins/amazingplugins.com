# 10 Common Accessibility Issues on E-commerce Sites (And How to Fix Them)

**Target keyword:** woocommerce accessibility issues / shopify accessibility problems / ecommerce accessibility WCAG
**Target length:** 1,400–1,800 words
**Target audience:** WooCommerce and Shopify store owners who want to understand and fix common accessibility violations
**Primary CTA:** Run a free accessibility scan on your store

---

## Introduction

If you sell online, there's a roughly 70% chance your store has at least one serious accessibility issue. That's not a guess — it's whataxe DevTools and WAVE consistently find when store owners run their first audit.

Accessibility isn't just about being inclusive. In the US, the ADA applies to e-commerce stores. In Europe, the European Accessibility Act is now enforceable. Store owners have faced lawsuits, demand letters, and in some cases, court orders to fix their sites — all because a few lines of HTML were missing or a button color was too light.

The good news: most accessibility issues are cheap or free to fix. They're not design problems — they're code problems. This post covers the 10 issues I see most often on WooCommerce and Shopify stores, what they break, and how to fix each one.

---

## Issue 1: Missing Alt Text on Product Images

**What it is:** Product images uploaded to a store don't automatically get alt text. Without `alt` attributes, screen readers read out the filename or just say "image."

**What it breaks:** WCAG 1.1.1 (non-text content). Screen reader users can't understand what the product looks like.

**How to fix it:**
```html
<!-- Wrong: no alt attribute -->
<img src="summer-dress-blue-2026.jpg" />

<!-- Correct: descriptive alt text -->
<img src="summer-dress-blue-2026.jpg" alt="Blue summer midi dress with white floral pattern" />
```

For WooCommerce: add alt text in the product image edit screen. For Shopify: add alt text in the product image settings. Automate it with a plugin that uses product title or description as a fallback.

---

## Issue 2: Keyboard Traps in Product Variant Pickers

**What it is:** WooCommerce variable products use dropdowns or button groups to select variants (size, color). These are often not keyboard-navigable — users get stuck and can't select an option without a mouse.

**What it breaks:** WCAG 2.1.2 (no keyboard trap). If someone uses Tab to navigate, they must be able to reach all interactive elements.

**How to fix it:**
Ensure your variant picker uses standard `<select>` elements or properly keyboard-handled custom controls. If you're using a theme with a custom variant picker, test it: press Tab from one field, can you reach and select a size option with only your keyboard? If not, that's a violation.

---

## Issue 3: Checkout Forms with Unlabeled Inputs

**What it is:** The WooCommerce and Shopify checkout forms use placeholder text as labels. Placeholders disappear when you start typing, aren't announced consistently by screen readers, and fail color contrast requirements.

**What it breaks:** WCAG 1.3.1 (info and relationships) and 3.3.2 (labels or instructions).

**How to fix it:**
```html
<!-- Wrong: placeholder as label -->
<input type="text" placeholder="First name" />

<!-- Correct: visible label, placeholder as hint -->
<label for="billing_first_name">First name</label>
<input type="text" id="billing_first_name" placeholder="As it appears on your card" />
```

WooCommerce: use a plugin that renders proper `<label>` elements alongside checkout fields. Shopify: the native checkout handles labels better than most themes — avoid themes that strip them.

---

## Issue 4: Invisible Focus Indicators

**What it is:** When you press Tab to navigate through a page, the currently focused element gets a focus ring (outline). Many themes remove this with `outline: none` because it looks "ugly" — but this leaves keyboard-only users completely lost.

**What it breaks:** WCAG 2.4.7 (focus visible). Any interactive element must show a visible focus indicator.

**How to fix it:**
```css
/* Restore visible focus — make it look good, not ugly */
*:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 2px;
  border-radius: 2px;
}
```

Avoid removing focus outlines. If the default blue ring offends your designer, replace it with a styled alternative — don't delete it.

---

## Issue 5: Missing Skip Navigation Links

**What it is:** A skip link is a hidden link at the top of the page that lets keyboard users jump past the header/navigation directly to the main content. Without it, every Tab press cycles through your entire menu before reaching the content.

**What it breaks:** WCAG 2.4.1 (bypass blocks). Users who can't use a mouse have to tab through every navigation item on every page.

**How to fix it:**
```html
<!-- First element in <body> -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<!-- Main content element -->
<main id="main-content">
```

Style the skip link so it appears only on keyboard focus:
```css
.skip-link {
  position: absolute;
  top: -100px;
}
.skip-link:focus {
  top: 0;
  background: white;
  padding: 8px 16px;
  z-index: 9999;
}
```

---

## Issue 6: Broken Heading Hierarchy

**What it is:** Headings must go in order: H1 → H2 → H3. No skips, no multiples of the same level where a section ends. Many WooCommerce themes output heading tags randomly — a product page might have three H2s, no H1, and an H4 in the middle.

**What it breaks:** WCAG 1.3.1 (info and relationships). Screen reader users navigate by heading — a broken hierarchy makes the entire page structure unreadable.

**How to fix it:**
Run your product page through a screen reader or check the heading structure in browser DevTools. A correct heading hierarchy for a product page looks like:
- H1: Product name
- H2: Description, Specifications, Reviews
- H3: subsections within those

If your theme generates bad headings, you can override them with a custom plugin or child theme.

---

## Issue 7: Missing ARIA Landmark Roles

**What it is:** Landmarks (header, main, nav, footer, aside) tell screen reader users where they are on the page. Without semantic HTML5 landmarks or ARIA roles, the entire page reads as one big block.

**What it breaks:** WCAG 1.3.6 (identify purpose) — though this is AA, the practical impact is covered by 1.3.1.

**How to fix it:**
Use standard HTML5 elements — they come with landmarks built-in:
```html
<header>...</header>
<nav aria-label="Main navigation">...</nav>
<main id="main-content">...</main>
<footer>...</footer>
```

Check that your theme wraps the right sections in the right elements. A common WooCommerce issue: the checkout form sits outside `<main>` with no landmark at all.

---

## Issue 8: Error Messages That Aren't Announced

**What it is:** Form validation errors appear as red text below a field. Screen readers often don't announce them. A user fills in a wrong credit card number, hits submit, and gets told "invalid card" with no context about which field or why.

**What it breaks:** WCAG 3.3.1 (error identification) and 4.1.3 (status messages).

**How to fix it:**
```html
<!-- Wrong: error is just styled text -->
<div class="error">Please enter a valid email</div>
<input type="email" />

<!-- Correct: error is associated via aria-describedby -->
<div id="email-error" class="error" role="alert">Please enter a valid email</div>
<input type="email" aria-describedby="email-error" aria-invalid="true" />
```

The `role="alert"` tells screen readers to announce the message immediately. `aria-invalid="true"` marks the field. Together, keyboard and screen reader users get the full context.

---

## Issue 9: Color Contrast Failures on Buttons and CTAs

**What it is:** A light gray button on a white background, or a medium blue on a light blue — these are common in WooCommerce themes and fail WCAG 1.4.3 (contrast minimum, 4.5:1 for normal text).

**What it breaks:** WCAG 1.4.3 (contrast minimum). Low contrast makes text unreadable for users with low vision or in bright sunlight on mobile.

**How to check it:**
Use the WAVE browser extension or axe DevTools. They'll highlight any text or UI component with insufficient contrast. Free, takes 2 minutes per page.

**How to fix it:**
Adjust the text color or background color until the ratio hits 4.5:1. Tools like WebAIM's Contrast Checker make this easy — just adjust sliders until the ratio is green.

---

## Issue 10: Missing Form Error Associations

**What it is:** When a form submission fails, the error message exists somewhere on the page but isn't connected to the specific field that caused it.

**What it breaks:** WCAG 3.3.1 (error identification) and 1.3.1 (info and relationships).

**How to fix it:**
Every error message must be programmatically linked to the field it refers to, using `aria-describedby` or `<label>`:
```html
<input type="text" id="address1" aria-describedby="address1-error" />
<div id="address1-error" role="alert">Address is required</div>
```

WooCommerce and Shopify both have partial implementations of this — but often miss `role="alert"` on the error text, which means screen readers don't announce the error when it appears.

---

## How to Audit Your Own Store

Pick one product page and one checkout page, then run them through:

1. **WAVE** (browser extension) — shows errors visually on the page
2. **axe DevTools** (browser extension) — more thorough, flags WCAG violations
3. **Accessibility Insights** (Microsoft, browser extension) — good for automated + guided tests
4. **Keyboard-only test** — unplug your mouse, press Tab. Can you reach every interactive element? Can you complete a purchase?

If you find more than 5 issues, your theme is likely the culprit. Consider switching themes or using a plugin that overlays proper accessibility semantics without rewriting your theme.

---

## What to Do With This List

You don't need to fix everything at once. Start with what affects the most users:

1. **Alt text** — automate it, takes 30 minutes to set up
2. **Focus indicators** — one CSS change
3. **Skip links** — one HTML + CSS change
4. **Checkout form labels** — WooCommerce plugin or Shopify theme review
5. **Color contrast** — WAVE highlights the exact elements

Set a reminder to audit again after any theme update or new app installation — both commonly reintroduce accessibility problems.

---

## FAQ

**Q: Do I need to be WCAG compliant to avoid lawsuits?**
In the US, ADA Title III applies to e-commerce sites as "places of public accommodation." Courts have ruled both ways on pure online stores, but enforcement is increasing and the legal cost of defending a demand letter is real even if you win. In the EU, the European Accessibility Act is now enforceable. Compliance is your best defense.

**Q: Will an accessibility overlay fix these issues?**
Overlays inject JavaScript that modifies the page in the browser. They cannot fix missing alt text, broken heading hierarchy, or unlabeled form fields in the underlying HTML — because that HTML is what screen readers and automated tools read. Courts have consistently rejected overlays as compliance evidence. A code-level fix is the only defensible approach.

**Q: How often should I audit my store?**
At minimum once after any theme update, any new app installation, or any major design change. Annually if your store is stable.

**Q: Can I automate these fixes?**
Some, yes — alt text generation, skip link injection, focus indicator enforcement, and form label association can all be automated via plugin. Others require theme changes or manual review.

---

*Run a free accessibility scan on your WooCommerce store → [AmazingPlugins Accessibility Fixer](https://amazingplugins.com)*
