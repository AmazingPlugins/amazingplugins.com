export interface GeneratedArticle {
  title?: string;
  description?: string;
  tags?: string[];
  category?: string;
  body?: string;
}

export interface QualityContext {
  keyword: string;
  platform: 'Shopify' | 'WooCommerce';
  angle: string;
}

export interface QualityResult {
  ok: boolean;
  wordCount: number;
  errors: string[];
  warnings: string[];
}

const PRODUCT_FIXES = [
  'Alt Text for Product Images',
  'Keyboard Navigation',
  'Focus Indicators',
  'ARIA Form Labels',
  'Color Contrast',
  'Skip Links',
  'Empty Button Text',
  'Lang Attribute',
  'Link Distinguishing Text',
  'Accessible Input Names',
];

export function getProductContextForPlatform(platform: 'Shopify' | 'WooCommerce'): string {
  const integration = platform === 'Shopify'
    ? 'Shopify app using Liquid/theme integration for storefront fixes'
    : 'WooCommerce plugin using WordPress hooks and WooCommerce templates';

  return `AmazingPlugins ${platform} accessibility product context:
- Product: ${platform} Accessibility Fixer
- Integration: ${integration}
- Positioning: not an overlay, no generic JavaScript widget, real HTML/CSS/accessibility fixes where possible
- Core fixes: ${PRODUCT_FIXES.join(', ')}
- Pro value: batch scanning, auto-fix mode where safe, PDF compliance report, priority support
- Useful CTA style: mention the relevant scan/fixer only after the reader understands the problem. Do not hard-sell.
- Limitations to be honest about: automated tools help with common WCAG failures, but store owners still need review for judgment-based content like meaningful alt text and complex custom flows.`;
}

function countWords(text: string): number {
  return (text.match(/[A-Za-z0-9']+/g) || []).length;
}

function countMatches(text: string, pattern: RegExp): number {
  return (text.match(pattern) || []).length;
}

function containsAny(text: string, terms: string[]): boolean {
  const lower = text.toLowerCase();
  return terms.some((term) => lower.includes(term.toLowerCase()));
}

export function validateGeneratedArticle(article: GeneratedArticle, context: QualityContext): QualityResult {
  const body = article.body || '';
  const text = `${article.title || ''}\n${article.description || ''}\n${body}`;
  const wordCount = countWords(body);
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!article.title || article.title.length > 70) {
    errors.push('title must exist and stay under 70 characters');
  }

  if (!article.description || article.description.length < 120 || article.description.length > 170) {
    errors.push('description must be a useful 120-170 character meta description');
  }

  if (wordCount < 1200) {
    errors.push(`word count must be at least 1200 words for an in-depth article, got ${wordCount}`);
  }

  if (countMatches(body, /^## /gm) < 5) {
    errors.push('article must include at least 5 useful H2 sections');
  }

  const hasPaa = /people also ask|frequently asked questions|^## faq|^## faqs/i.test(body);
  if (!hasPaa || countMatches(body, /^### .+\?/gm) < 3) {
    errors.push('article must answer at least 3 People also ask / FAQ questions');
  }

  if (!containsAny(text, ['WCAG', 'Success Criterion', 'ADA', 'EAA', 'screen reader', 'keyboard'])) {
    errors.push('article must include accessibility standards or assistive technology specifics');
  }

  if (!containsAny(text, ['AmazingPlugins', `${context.platform} Accessibility Fixer`])) {
    errors.push('article must include a natural AmazingPlugins product tie-in');
  }

  const productTerms = [
    'alt text',
    'keyboard',
    'focus',
    'form label',
    'aria',
    'color contrast',
    'skip link',
    'PDF compliance report',
    'batch scan',
    'auto-fix',
    'not an overlay',
  ];
  if (productTerms.filter((term) => text.toLowerCase().includes(term.toLowerCase())).length < 4) {
    errors.push('article must connect to at least 4 concrete product fix areas or product capabilities');
  }

  if (!/\[[^\]]+\]\([^\)]+\)/.test(body)) {
    warnings.push('article has no markdown links; add source, internal, or product links where useful');
  }

  if (/—/.test(text)) {
    errors.push('article must not use em dashes');
  }

  if (/in conclusion|let'?s dive in|it is important to note|at its core/i.test(text)) {
    warnings.push('article still has common AI-signposting phrases');
  }

  if (!new RegExp(context.keyword.split(/\s+/).filter((w) => w.length > 3).slice(0, 3).join('|'), 'i').test(text)) {
    warnings.push('article may not use enough of the target keyword language');
  }

  return {
    ok: errors.length === 0,
    wordCount,
    errors,
    warnings,
  };
}
