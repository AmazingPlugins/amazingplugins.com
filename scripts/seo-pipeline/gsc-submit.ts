import { fileURLToPath } from 'url';
import { getGSCClient } from './gsc-client';

const SITEMAP_URL = process.env.SITEMAP_URL || 'https://amazingplugins.com/sitemap-index.xml';

/**
 * Submit the live sitemap index after deployment.
 * This does not submit individual post URLs or confirm discovery or indexing.
 */
export async function submitSitemap(client?: any): Promise<string> {
  const gsc = client || await getGSCClient();
  const siteUrl = process.env.GSC_SITE_URL || 'sc-domain:amazingplugins.com';
  await gsc.sitemaps.submit({ siteUrl, feedpath: SITEMAP_URL });
  console.log(`Sitemap submitted: ${SITEMAP_URL}`);
  console.log('Individual URL discovery and indexing remain unverified.');
  return SITEMAP_URL;
}

const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {
  submitSitemap().catch((error: any) => {
    console.error(`Sitemap submission failed: ${error.message}`);
    process.exitCode = 1;
  });
}
