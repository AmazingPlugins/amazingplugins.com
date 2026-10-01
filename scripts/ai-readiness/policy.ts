export const SITE_ORIGIN = 'https://amazingplugins.com';
export const SITEMAP_URL = `${SITE_ORIGIN}/sitemap-index.xml`;
export const CONTENT_SIGNAL = 'Content-Signal: search=yes, ai-input=yes, ai-train=yes';

export const INDEXNOW_KEY = '08a6cbc38c7089613bf5a19a62d4cd72';
export const INDEXNOW_KEY_URL = `${SITE_ORIGIN}/${INDEXNOW_KEY}.txt`;

/** Background crawlers. Crawl-delay is a courtesy; only some clients honor it. */
export const CRAWL_DELAY_SECONDS = 1;

export const RETRIEVAL_AGENTS = [
  'OAI-SearchBot',
  'ChatGPT-User',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Googlebot',
  'Bingbot',
  'Applebot',
  'Amazonbot',
] as const;

export const LEARNING_AGENTS = [
  'GPTBot',
  'ClaudeBot',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
  'Meta-ExternalAgent',
  'Bytespider',
] as const;

/** User-triggered fetchers and major search engines. Do not delay these. */
export const NO_CRAWL_DELAY = new Set<string>([
  'ChatGPT-User',
  'Claude-User',
  'Perplexity-User',
  'Googlebot',
  'Bingbot',
  'Applebot',
]);

export const ALL_AGENTS = [...RETRIEVAL_AGENTS, ...LEARNING_AGENTS];

/**
 * Cloudflare Free allows one rate-limit rule, a 10 second period, IP counting,
 * and path matching. User-agent matching needs a paid plan.
 * 15 document requests / 10 seconds is enough to read the site and too low for a tight loop.
 */
export const RATE_LIMIT = {
  description: 'Cap HTML fetches per IP',
  period: 10,
  requestsPerPeriod: 15,
  mitigationTimeout: 10,
  characteristics: ['ip.src'] as const,
  skippedPrefixes: ['/_astro/', '/fonts/', '/images/', '/favicon'],
};

export const PRODUCT_SUMMARY = [
  'Free WooCommerce plugins for storefront accessibility fixes, shipping checks, and stale order cleanup.',
  'Product pages are the source of truth.',
  'AP Accessibility Fixer has nine free fixers and no Pro version. It does not make a store fully accessible.',
  'Shipping Rules Tester only reads shipping settings.',
  'Stale Order Cleaner can delete old orders after a dry run. Deletion is permanent.',
].join(' ');

export const FIXERS = [
  ['Alt text for product images', 'Fills empty product-image alt text from the image or product title. Review the result for meaning and context.'],
  ['Keyboard trap escape', 'Adds an Escape-key handler for selected WooCommerce modals. Test tab order separately.'],
  ['Focus indicators', 'Adds focus styles to selected WooCommerce controls. Theme controls outside those selectors still need checking.'],
  ['Form labels', 'Adds accessible names to some unlabeled inputs in post content. Checkout templates need separate testing.'],
  ['Focus and error contrast styles', 'Adds focus outlines and error borders to selected fields. It does not measure text contrast ratios.'],
  ['Skip links', 'Adds a skip-to-content link through a small inline script.'],
  ['Error message associations', 'Associates selected WooCommerce error messages with nearby form fields through a small inline script.'],
  ['Heading hierarchy', 'Adjusts heading levels in post content when they skip a level. Check the resulting structure manually.'],
  ['Main landmark', 'Adds a main landmark to a matching content wrapper when the page does not already have one.'],
] as const;

/** Claims the live product pages no longer make. The generated summary must not reintroduce them. */
export const BANNED_PRODUCT_CLAIMS = [
  '10 fixers',
  'ten fixers',
  'achieve WCAG 2.1 AA',
  'Fixes contrast ratio',
  'Color Contrast - Fixes',
];

export function rateLimitExpression(): string {
  const skips = RATE_LIMIT.skippedPrefixes
    .map((prefix) => `not starts_with(http.request.uri.path, "${prefix}")`)
    .join(' and ');
  return `(${skips})`;
}

export function rateLimitRule(): {
  description: string;
  expression: string;
  action: 'block';
  enabled: true;
  ratelimit: {
    characteristics: string[];
    period: number;
    requests_per_period: number;
    mitigation_timeout: number;
  };
} {
  return {
    description: RATE_LIMIT.description,
    expression: rateLimitExpression(),
    action: 'block',
    enabled: true,
    ratelimit: {
      characteristics: [...RATE_LIMIT.characteristics],
      period: RATE_LIMIT.period,
      requests_per_period: RATE_LIMIT.requestsPerPeriod,
      mitigation_timeout: RATE_LIMIT.mitigationTimeout,
    },
  };
}
