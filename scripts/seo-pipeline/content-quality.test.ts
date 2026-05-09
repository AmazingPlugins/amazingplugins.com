import * as assert from 'node:assert/strict';
import { validateGeneratedArticle, getProductContextForPlatform } from './content-quality';

function makeArticle(body: string) {
  return {
    title: 'Shopify product image alt text checklist for accessibility',
    description: 'A practical Shopify accessibility guide for product image alt text, WCAG checks, and fixing missing descriptions before they become risk.',
    tags: ['Accessibility', 'Shopify', 'WCAG'],
    category: 'shopify',
    body,
  };
}

const shallowBody = `# Shopify alt text

Alt text matters for accessibility.

## What to do

Add alt text to every product image.
`;

const strongBody = `# Shopify product image alt text checklist

Missing alt text blocks blind shoppers from understanding what you sell. For a Shopify store, fix product image alt text first because it is easy to miss during CSV imports, theme changes, and variant setup.

## Quick answer

Audit your product images, write useful descriptions, and keep the workflow in your product upload checklist.

## People also ask

### Do Shopify product images need alt text for ADA compliance?

Yes. WCAG 2.1 Success Criterion 1.1.1 requires text alternatives for meaningful images. Product photos are meaningful because shoppers use them to decide what to buy.

### What should Shopify alt text include?

Describe the product, variant, color, material, and purpose. Do not write keyword-stuffed descriptions.

### Can I bulk fix missing Shopify alt text?

Yes. You can export products by CSV, edit image alt text, and import them again. You can also use AmazingPlugins for Shopify to scan the catalog and flag missing product image descriptions.

## Manual fix steps

1. Open Products in Shopify admin.
2. Select a product.
3. Open each image.
4. Add descriptive alt text.
5. Save and test with a screen reader.

## Good and bad examples

Bad: product image.
Good: Blue cotton t-shirt with crew neck and short sleeves on white background.

## How AmazingPlugins helps

AmazingPlugins for Shopify scans product pages, flags missing alt text, checks keyboard access, detects weak focus indicators, and creates an accessibility report. It is not an overlay. It focuses on real storefront issues that affect WCAG checks.

## Related checks

After alt text, check keyboard navigation, color contrast, form labels, skip links, empty button labels, language attributes, and accessible input names.

## FAQ

### How often should I audit product alt text?

Run a check whenever you import products, change themes, or install apps that render product images.

### Is generated alt text enough?

Generated text is a starting point. Review it for accuracy before publishing.

### Does alt text help SEO too?

Sometimes, but accessibility is the main reason. Accurate descriptions help image search only when they describe the image honestly.
`.repeat(4);

const shallow = validateGeneratedArticle(makeArticle(shallowBody), {
  keyword: 'shopify product images alt text missing',
  platform: 'Shopify',
  angle: 'full-guide',
});
assert.equal(shallow.ok, false, 'shallow article should fail quality gate');
assert.ok(shallow.errors.some((e) => e.includes('word count')), 'shallow article should fail word count');
assert.ok(shallow.errors.some((e) => e.includes('People also ask') || e.includes('FAQ')), 'shallow article should require PAA/FAQ coverage');
assert.ok(shallow.errors.some((e) => e.includes('AmazingPlugins')), 'shallow article should require product tie-in');

const strong = validateGeneratedArticle(makeArticle(strongBody), {
  keyword: 'shopify product images alt text missing',
  platform: 'Shopify',
  angle: 'full-guide',
});
assert.equal(strong.ok, true, `strong article should pass: ${strong.errors.join('; ')}`);

const shopifyContext = getProductContextForPlatform('Shopify');
assert.match(shopifyContext, /Alt Text for Product Images/);
assert.match(shopifyContext, /not an overlay/i);
assert.match(shopifyContext, /PDF compliance report/i);

console.log('content-quality tests passed');
