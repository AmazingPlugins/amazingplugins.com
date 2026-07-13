/**
 * GSC Cleanup Script
 * - Gets all indexed pages from Google Search Console
 * - Cross-references against Shopify redirect URLs from _redirects
 * - Reports which old URLs are still in the index
 * - Submits sitemap to speed up re-crawling of 301s
 */
import fs from 'fs';
import path from 'path';
import { getGSCClient, getIndexedPages } from './gsc-client';
import { loadSeoPipelineEnv } from './env-bootstrap';

loadSeoPipelineEnv();

const SITE_URL = process.env.SITE_URL || 'https://amazingplugins.com';
const SITEMAP_URL = 'https://amazingplugins.com/sitemap-0.xml';

/**
 * Parse Shopify redirect URLs from _redirects
 */
function getShopifyRedirectUrls(): string[] {
  const redirectsPath = path.join(process.cwd(), 'public/_redirects');
  if (!fs.existsSync(redirectsPath)) {
    const altPath = path.join(process.cwd(), '..', 'public/_redirects');
    if (!fs.existsSync(altPath)) {
      console.error('Could not find _redirects');
      return [];
    }
    return parseRedirects(fs.readFileSync(altPath, 'utf-8'));
  }
  return parseRedirects(fs.readFileSync(redirectsPath, 'utf-8'));
}

function parseRedirects(content: string): string[] {
  const urls: string[] = [];
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    // Format: /old-path /new-path 301
    const parts = trimmed.split(/\s+/);
    if (parts.length >= 2) {
      const fromPath = parts[0];
      const toPath = parts[1];
      // Only collect Shopify → /shopify/ redirects (not existing content redirects)
      if (toPath === '/shopify/' && (fromPath.includes('shopify') || fromPath.includes('shopify'))) {
        urls.push(fromPath);
      }
    }
  }
  return urls;
}

/**
 * Build full URLs from paths
 */
function toFullUrls(paths: string[]): string[] {
  return paths.map(p => `${SITE_URL}${p}`);
}

/**
 * Submit sitemap to help Google recrawl 301s
 */
async function submitSitemap(): Promise<boolean> {
  const client = await getGSCClient();
  const siteUrl = process.env.GSC_SITE_URL || 'sc-domain:amazingplugins.com';
  try {
    await client.sitemaps.submit({ siteUrl, feedpath: SITEMAP_URL });
    console.log(`  Sitemap submitted: ${SITEMAP_URL}`);
    return true;
  } catch (e: any) {
    console.error(`  Sitemap error: ${e.message}`);
    return false;
  }
}

async function main() {
  console.log('=== GSC Cleanup: Shopify 301 URLs ===\n');

  // Step 1: Get Shopify redirect paths
  const shopifyPaths = getShopifyRedirectUrls();
  console.log(`Shopify redirect paths found: ${shopifyPaths.length}`);

  // Step 2: Get all indexed pages from GSC
  console.log('\nFetching indexed pages from GSC...');
  let indexedPages: string[] = [];
  try {
    indexedPages = await getIndexedPages();
    console.log(`  Total indexed pages found: ${indexedPages.length}`);
  } catch (e: any) {
    console.error(`  Could not get indexed pages: ${e.message}`);
  }

  // Step 3: Cross-reference — check which Shopify URLs are still in the index
  const shopifyFullUrls = toFullUrls(shopifyPaths);
  const stillIndexed: string[] = [];

  console.log('\nChecking Shopify URLs against GSC index...');
  if (indexedPages.length > 0) {
    for (const url of shopifyFullUrls) {
      const matched = indexedPages.filter(ip => ip.includes(url) || url.includes(ip));
      if (matched.length > 0) {
        stillIndexed.push(url);
      }
    }
  }

  console.log(`\n  Old Shopify URLs still in index: ${stillIndexed.length}`);
  for (const url of stillIndexed.slice(0, 10)) {
    console.log(`    ${url}`);
  }
  if (stillIndexed.length > 10) {
    console.log(`    ... and ${stillIndexed.length - 10} more`);
  }

  // Step 4: Submit sitemap to speed up re-crawling
  console.log('\nSubmitting sitemap to help Google recrawl 301s...');
  await submitSitemap();

  // Step 5: Summary
  console.log(`\n=== Results ===`);
  console.log(`Total Shopify redirects:   ${shopifyPaths.length}`);
  console.log(`Still in GSC index:        ${stillIndexed.length}`);
  console.log(`Not yet found by GSC:      ${shopifyPaths.length - stillIndexed.length}`);
  console.log(``);
  
  if (stillIndexed.length > 0) {
    console.log(`Next steps:`);
    console.log(`1. Sitemap submitted — Google will recrawl and discover 301s`);
    console.log(`2. Old URLs will drop from index within 1-4 weeks`);
    console.log(`3. If urgently needed, use GSC web UI → Removals → Temporary Removals`);
  } else {
    console.log(`All Shopify URLs have already dropped from the index.`);
  }

  // Export the list for potential further use
  if (stillIndexed.length > 0) {
    fs.writeFileSync(
      path.join(process.cwd(), 'scripts/seo-pipeline/old-shopify-urls.json'),
      JSON.stringify(stillIndexed, null, 2)
    );
    console.log(`\nStill-indexed URLs exported: scripts/seo-pipeline/old-shopify-urls.json`);
  }
}

main().then(() => process.exit(0)).catch(e => {
  console.error('Fatal:', e);
  process.exit(1);
});
