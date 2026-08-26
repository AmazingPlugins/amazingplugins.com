import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import { loadSeoPipelineEnv } from './env-bootstrap';

// Initialize GSC API client
let gscClient: any = null;

export async function getGSCClient(): Promise<any> {
  loadSeoPipelineEnv();

  if (gscClient) return gscClient;
  
  // Get credentials from environment variable (base64 encoded JSON)
  const keyBase64 = process.env.GSC_SERVICE_ACCOUNT_KEY;
  if (!keyBase64) {
    throw new Error('GSC_SERVICE_ACCOUNT_KEY environment variable not set');
  }
  
  const credentials = JSON.parse(Buffer.from(keyBase64, 'base64').toString());
  
  const auth = new JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ['https://www.googleapis.com/auth/webmasters'],
  });
  
  gscClient = google.searchconsole({ version: 'v1', auth });
  return gscClient;
}

export interface URLStatus {
  url: string;
  /** True when Search Analytics returned at least one row. Not URL Inspection / index coverage. */
  hasSearchData: boolean;
  impressions: number;
  clicks: number;
  position: number;
}

/**
 * Check whether a URL has Search Analytics rows.
 * This is not an index-coverage check.
 */
export async function checkURLStatus(url: string): Promise<URLStatus> {
  const client = await getGSCClient();
  const siteUrl = process.env.GSC_SITE_URL || 'sc-domain:amazingplugins.com';
  
  try {
    const response = await client.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate: '2026-01-01',
        endDate: new Date().toISOString().split('T')[0],
        dimensions: ['query'],
        dimensionFilterGroups: [{
          filters: [{
            dimension: 'page',
            operator: 'equals',
            expression: url,
          }],
        }],
        rowLimit: 1,
      },
    });
    
    const row = response.data.rows?.[0];
    return {
      url,
      hasSearchData: Boolean(row),
      impressions: row?.impressions || 0,
      clicks: row?.clicks || 0,
      position: row?.position || 0,
    };
  } catch (error: any) {
    console.error(`Error checking URL status for ${url}:`, error.message);
    return {
      url,
      hasSearchData: false,
      impressions: 0,
      clicks: 0,
      position: 0,
    };
  }
}

/**
 * Get all indexed pages for the site
 */
export async function getIndexedPages(): Promise<string[]> {
  const client = await getGSCClient();
  const siteUrl = process.env.GSC_SITE_URL || 'sc-domain:amazingplugins.com';
  const pages: string[] = [];
  
  try {
    const response = await client.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate: '2026-01-01',
        endDate: new Date().toISOString().split('T')[0],
        dimensions: ['page'],
        rowLimit: 1000,
      },
    });
    
    for (const row of response.data.rows || []) {
      if (row.keys && row.keys[0]) {
        pages.push(row.keys[0]);
      }
    }
  } catch (error: any) {
    console.error('Error getting indexed pages:', error.message);
  }
  
  return pages;
}

/**
 * Submit URL to Google for indexing via URL Inspection API
 */
export async function submitURLForIndexing(url: string): Promise<boolean> {
  const client = await getGSCClient();
  const siteUrl = process.env.GSC_SITE_URL || 'sc-domain:amazingplugins.com';
  
  try {
    await client.urlInspection.index().inspect({
      siteUrl,
      inspectionUrl: url,
      languageCode: 'en-US',
    });
    console.log(`Inspected URL (does not request indexing): ${url}`);
    return true;
  } catch (error: any) {
    console.error(`Error submitting URL ${url}:`, error.message);
    return false;
  }
}
