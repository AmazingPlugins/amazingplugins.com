import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

const SITE_URL = process.env.SITE_URL || 'https://amazingplugins.com';
const REPORT_FILE = path.join(process.cwd(), 'broken-links-report.md');

export interface BrokenLink {
  sourcePage: string;
  brokenURL: string;
  statusCode: number;
  suggestedFix?: string;
}

/**
 * Get all blog posts
 */
export function getAllPosts(): string[] {
  const blogDir = path.join(process.cwd(), 'src/content/blog');
  return fs.readdirSync(blogDir)
    .filter(f => f.endsWith('.md'))
    .map(f => path.join(blogDir, f));
}

/**
 * Extract URLs from markdown content
 */
function extractURLs(content: string): string[] {
  const urlRegex = /https?:\/\/[^\s\)"\']+/g;
  return content.match(urlRegex) || [];
}

/**
 * Check if a URL returns a valid response
 */
async function checkURL(url: string): Promise<{ url: string; statusCode: number; valid: boolean }> {
  try {
    // Skip external URLs - only check internal links
    if (!url.includes('amazingplugins.com')) {
      return { url, statusCode: 0, valid: true };
    }
    
    const response = await fetch(url, { 
      method: 'HEAD',
      redirect: 'follow',
    });
    
    return {
      url,
      statusCode: response.status,
      valid: response.status >= 200 && response.status < 400,
    };
  } catch (error: any) {
    return { url, statusCode: 0, valid: false };
  }
}

/**
 * Get pages with 404s from GSC data
 */
export async function getGSC404Pages(): Promise<string[]> {
  const keyBase64 = process.env.GSC_SERVICE_ACCOUNT_KEY;
  if (!keyBase64) {
    console.warn('GSC credentials not available, skipping GSC 404 check');
    return [];
  }
  
  try {
    const credentials = JSON.parse(Buffer.from(keyBase64, 'base64').toString());
    
    const auth = new JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    });
    
    const gsc = google.webmasters({ version: 'v3', auth });
    const siteUrl = process.env.GSC_SITE_URL || 'sc-domain:amazingplugins.com';
    
    // Query for 404 pages
    const response = await gsc.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate: '2026-01-01',
        endDate: new Date().toISOString().split('T')[0],
        dimensions: ['page'],
        dimensionFilterGroups: [{
          filters: [{
            dimension: 'query',
            operator: 'contains',
            expression: '404',
          }],
        }],
        rowLimit: 100,
      },
    });
    
    const pages404: string[] = [];
    for (const row of response.data.rows || []) {
      if (row.keys && row.keys[0] && row.clicks && row.clicks > 0) {
        pages404.push(row.keys[0]);
      }
    }
    
    return pages404;
  } catch (error: any) {
    console.error('Error fetching GSC 404 pages:', error.message);
    return [];
  }
}

/**
 * Check all internal links in blog posts
 */
export async function checkAllInternalLinks(): Promise<BrokenLink[]> {
  const posts = getAllPosts();
  const brokenLinks: BrokenLink[] = [];
  
  for (const postPath of posts) {
    const content = fs.readFileSync(postPath, 'utf-8');
    const urls = extractURLs(content);
    
    for (const url of urls) {
      if (url.includes('amazingplugins.com')) {
        const result = await checkURL(url);
        if (!result.valid) {
          brokenLinks.push({
            sourcePage: path.basename(postPath),
            brokenURL: url,
            statusCode: result.statusCode,
          });
        }
      }
    }
  }
  
  return brokenLinks;
}

/**
 * Generate broken links report
 */
export async function generateBrokenLinksReport(): Promise<BrokenLink[]> {
  console.log('Checking for broken internal links...');
  const brokenLinks = await checkAllInternalLinks();
  
  console.log('Checking for 404 pages from GSC...');
  const gsc404Pages = await getGSC404Pages();
  
  // Merge GSC 404s into broken links
  for (const url of gsc404Pages) {
    const existing = brokenLinks.find(b => b.brokenURL === url);
    if (!existing) {
      brokenLinks.push({
        sourcePage: 'GSC Data',
        brokenURL: url,
        statusCode: 404,
      });
    }
  }
  
  // Generate markdown report
  let report = '# Broken Links Report\n\n';
  report += `Generated: ${new Date().toISOString()}\n\n`;
  
  if (brokenLinks.length === 0) {
    report += 'No broken links found! ✅\n';
  } else {
    report += `## Found ${brokenLinks.length} broken link(s)\n\n`;
    report += '| Source Page | Broken URL | Status |\n';
    report += '|-------------|------------|--------|\n';
    
    for (const link of brokenLinks) {
      report += `| ${link.sourcePage} | ${link.brokenURL} | ${link.statusCode} |\n`;
    }
    
    report += '\n## Recommended Actions\n\n';
    report += '1. Review each broken URL above\n';
    report += '2. Either fix the URL or remove the link if the page no longer exists\n';
    report += '3. Consider setting up redirects for moved content\n';
    report += '4. Re-submit fixed URLs to Google Search Console\n';
  }
  
  fs.writeFileSync(REPORT_FILE, report);
  console.log(`\nReport saved to: ${REPORT_FILE}`);
  
  return brokenLinks;
}
