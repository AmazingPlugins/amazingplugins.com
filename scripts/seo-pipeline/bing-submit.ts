import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { submitFeed, submitUrlBatch } from './bing-client';

const SITE_URL = process.env.BING_SITE_URL || 'https://amazingplugins.com/';
export const DEFAULT_SITEMAP_URL = 'https://amazingplugins.com/sitemap-index.xml';
const SITEMAP_URL = process.env.BING_SITEMAP_URL || DEFAULT_SITEMAP_URL;

const DEFAULT_URLS = [
  'https://amazingplugins.com/',
  'https://amazingplugins.com/pricing/',
  'https://amazingplugins.com/plugins/',
  'https://amazingplugins.com/blog/',
  'https://amazingplugins.com/plugins/shopify-accessibility-fixer/',
  'https://amazingplugins.com/plugins/woocommerce-accessibility-fixer/',
];

async function main() {
  await submitFeed(SITE_URL, SITEMAP_URL);
  console.log(`Submitted sitemap/feed: ${SITEMAP_URL}`);

  if (process.env.BING_SUBMIT_URLS !== '0') {
    const urls = process.env.BING_URLS
      ? process.env.BING_URLS.split(',').map(value => value.trim()).filter(Boolean)
      : DEFAULT_URLS;

    await submitUrlBatch(SITE_URL, urls);
    console.log(`Submitted ${urls.length} URLs to Bing URL submission API`);
  }
}

const invokedDirectly = process.argv[1]
  && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;

if (invokedDirectly) {
  main().catch(error => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  });
}
