/**
 * GSC Cleanup Script
 * - Gets pages with Search Analytics data from Google Search Console
 * - Cross-references against Shopify redirect URLs from _redirects
 * - Reports which old URLs still have search impressions; this is not index coverage
 */
import fs from 'fs';
import path from 'path';
import { getPagesWithSearchData } from './gsc-client';
import { loadSeoPipelineEnv } from './env-bootstrap';

loadSeoPipelineEnv();

const SITE_URL = process.env.SITE_URL || 'https://amazingplugins.com';

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

async function main() {
  console.log('=== GSC Cleanup: Shopify 301 URLs ===\n');

  // Step 1: Get Shopify redirect paths
  const shopifyPaths = getShopifyRedirectUrls();
  console.log(`Shopify redirect paths found: ${shopifyPaths.length}`);

  // Step 2: Get pages with search data. This does not establish index status.
  console.log('\nFetching pages with Search Analytics rows...');
  let pagesWithSearchData: string[] = [];
  try {
    pagesWithSearchData = await getPagesWithSearchData();
    console.log(`  Pages with search data: ${pagesWithSearchData.length}`);
  } catch (e: any) {
    console.error(`  Could not get Search Analytics pages: ${e.message}`);
    process.exitCode = 1;
    return;
  }

  // Step 3: Cross-reference exact old URLs with Search Analytics rows.
  const shopifyFullUrls = toFullUrls(shopifyPaths);
  const stillSeenInSearch: string[] = [];

  console.log('\nChecking Shopify URLs against search data...');
  if (pagesWithSearchData.length > 0) {
    for (const url of shopifyFullUrls) {
      if (pagesWithSearchData.includes(url)) {
        stillSeenInSearch.push(url);
      }
    }
  }

  console.log(`\n  Old Shopify URLs with search data: ${stillSeenInSearch.length}`);
  for (const url of stillSeenInSearch.slice(0, 10)) {
    console.log(`    ${url}`);
  }
  if (stillSeenInSearch.length > 10) {
    console.log(`    ... and ${stillSeenInSearch.length - 10} more`);
  }

  // Step 5: Summary
  console.log(`\n=== Results ===`);
  console.log(`Total Shopify redirects:   ${shopifyPaths.length}`);
  console.log(`With search data:          ${stillSeenInSearch.length}`);
  console.log(`Without search data:       ${shopifyPaths.length - stillSeenInSearch.length}`);
  console.log(``);
  
  console.log('Use URL Inspection to check whether a specific old URL remains indexed.');

  // Export the list for potential further use
  if (stillSeenInSearch.length > 0) {
    fs.writeFileSync(
      path.join(process.cwd(), 'scripts/seo-pipeline/old-shopify-urls.json'),
      JSON.stringify(stillSeenInSearch, null, 2)
    );
    console.log(`\nURLs with search data exported: scripts/seo-pipeline/old-shopify-urls.json`);
  }
}

main().then(() => process.exit(0)).catch(e => {
  console.error('Fatal:', e);
  process.exit(1);
});
