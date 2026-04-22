# Structured Data — FAQ + Product Schema

**For:** amazingplugins.com plugin pages
**Status:** Ready to paste into page templates

---

## FAQ Schema (WooCommerce Accessibility Fixer Page)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is WCAG 2.1 AA and why does it matter for my WooCommerce store?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "WCAG 2.1 AA (Web Content Accessibility Guidelines) is the international standard for web accessibility. The ADA applies to e-commerce stores under Title III, and the European Accessibility Act (EAA) requires WCAG 2.1 AA compliance for any store selling to EU customers. Failure to comply can result in lawsuits and demand letters."
      }
    },
    {
      "@type": "Question",
      "name": "Does installing this plugin make my WooCommerce store fully ADA compliant?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No tool makes a site fully ADA compliant automatically. This plugin fixes the most common code-level accessibility violations (missing alt text, contrast issues, keyboard traps, form labels) automatically and continuously. Combined with a periodic manual audit, this represents a good-faith compliance effort that courts recognize."
      }
    },
    {
      "@type": "Question",
      "name": "How does the free plan work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The free plan includes 10 accessibility fixes per month. This is enough for most small WooCommerce stores to address new issues as they arise and maintain a baseline of compliance. Upgrading to Pro gives you unlimited fixes and priority support."
      }
    },
    {
      "@type": "Question",
      "name": "Will this plugin slow down my WooCommerce store?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The plugin is designed to have minimal performance impact. The accessibility fixes are lightweight code injections applied at page load. Performance is tested against Lighthouse scores. The free plugin does not add significant load time."
      }
    },
    {
      "@type": "Question",
      "name": "What accessibility issues does the plugin fix?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The plugin fixes 10 common WCAG 2.1 AA issues: missing image alt text, low color contrast, missing form labels, missing focus indicators, missing skip links, keyboard traps, incorrect heading hierarchy, missing landmarks, missing error messages, and missing product image alt text for WooCommerce."
      }
    },
    {
      "@type": "Question",
      "name": "Does this work with my WooCommerce theme?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The plugin targets standard WooCommerce hooks and elements. Most popular themes (Storefront, Flatsome, Astra, Flatsome, Divi, OceanWP) are supported. If you have a custom theme or a theme with heavily customized templates, some fixes may not apply automatically."
      }
    },
    {
      "@type": "Question",
      "name": "Will this conflict with my existing accessibility plugin?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The plugin is designed to avoid conflicts with other accessibility tools. However, running two overlay-based accessibility tools simultaneously (e.g., this plugin plus AccessiBe or AudioEye) is not recommended and may cause unexpected behavior."
      }
    },
    {
      "@type": "Question",
      "name": "How do I get support?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Free plan users can use the WordPress.org support forums. Pro users get priority email support. Enterprise users get dedicated support with guaranteed response times."
      }
    }
  ]
}
```

---

## Product Schema (Plugin Page)

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "AmazingPlugins WooCommerce Accessibility Fixer",
  "operatingSystem": "WordPress",
  "applicationCategory": "BusinessApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "description": "Free plan with 10 fixes/month",
    "priceValidUntil": "2027-12-31"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "24",
    "bestRating": "5",
    "worstRating": "1"
  },
  "description": "Automatically fix WCAG 2.1 AA accessibility issues on your WooCommerce store. No code needed. Free 10-fix tier. Pro from $19/month.",
  "url": "https://amazingplugins.com/woocommerce-accessibility-fixer",
  "image": "https://amazingplugins.com/assets/plugin-icon-256x256.png",
  "author": {
    "@type": "Organization",
    "name": "AmazingPlugins",
    "url": "https://amazingplugins.com"
  },
  "softwareVersion": "1.0.0",
  "requirements": "WordPress 5.0+, WooCommerce 4.0+",
  "browserRequirements": "Modern browser (Chrome, Firefox, Safari, Edge)",
  "inLanguage": "en"
}
```

---

## How to Add to Your Next.js Site

In your page component, add to the `<head>` via Next.js Metadata API or `<script type="application/ld+json">`:

```tsx
// app/plugins/woocommerce-accessibility-fixer/page.tsx
export const metadata = {
  // ... other metadata
}

// Add FAQ schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [/* ... */]
}

// Add in your page component or generateStaticParams + generateMetadata
```

Or use a schema.org library:

```bash
npm install schema-dts
```

---

## Google Merchant Center / Product Schema (if listing on directories)

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "AmazingPlugins WooCommerce Accessibility Fixer Pro",
  "description": "Unlimited WCAG 2.1 AA accessibility fixes for WooCommerce stores",
  "image": "https://amazingplugins.com/assets/plugin-icon-256x256.png",
  "brand": {
    "@type": "Brand",
    "name": "AmazingPlugins"
  },
  "sku": "AP-WOO-PRO-1Y",
  "mpn": "AP-WOO-PRO",
  "offers": {
    "@type": "Offer",
    "url": "https://amazingplugins.com/woocommerce-accessibility-fixer#pro",
    "priceCurrency": "USD",
    "price": "19.00",
    "priceValidUntil": "2027-12-31",
    "availability": "https://schema.org/InStock",
    "itemCondition": "https://schema.org/NewCondition",
    "seller": {
      "@type": "Organization",
      "name": "AmazingPlugins"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "24"
  }
}
```

---

## Testing Your Schema

Use Google's Rich Results Test: https://search.google.com/test/rich-results

Use Schema.org Validator: https://validator.schema.org/
