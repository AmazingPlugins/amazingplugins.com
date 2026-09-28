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
  searchDataStatus: 'available' | 'no-data' | 'error';
  error?: string;
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
      searchDataStatus: row ? 'available' : 'no-data',
      impressions: row?.impressions || 0,
      clicks: row?.clicks || 0,
      position: row?.position || 0,
    };
  } catch (error: any) {
    console.error(`Error checking URL status for ${url}:`, error.message);
    return {
      url,
      hasSearchData: false,
      searchDataStatus: 'error',
      error: error.message,
      impressions: 0,
      clicks: 0,
      position: 0,
    };
  }
}

/**
 * Get pages with Search Analytics rows. This is not an index coverage list.
 */
export async function getPagesWithSearchData(): Promise<string[]> {
  const client = await getGSCClient();
  const siteUrl = process.env.GSC_SITE_URL || 'sc-domain:amazingplugins.com';
  const pages: string[] = [];
  
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
  
  return pages;
}

/** Possible stored URL Inspection states; errors remain distinct from unknown URLs. */
export type InspectionStatus = 'indexed' | 'discovered' | 'crawled-not-indexed' | 'unknown' | 'error';

/** Interpret a URL Inspection result. Search Analytics data is never an index verdict. */
export function interpretInspectionResult(data: any): Exclude<InspectionStatus, 'error'> {
  const result = data?.indexStatusResult;
  if (result?.verdict === 'PASS') return 'indexed';
  if (result?.coverageState?.startsWith('Discovered')) return 'discovered';
  if (result?.coverageState?.startsWith('Crawled')) return 'crawled-not-indexed';
  return 'unknown';
}

/** Inspect a URL's stored Google index status; this does not request indexing. */
export async function inspectURLIndexStatus(url: string): Promise<{ url: string; status: InspectionStatus; error?: string }> {
  try {
    const client = await getGSCClient();
    const siteUrl = process.env.GSC_SITE_URL || 'sc-domain:amazingplugins.com';
    const response = await client.urlInspection.index.inspect({
      requestBody: { siteUrl, inspectionUrl: url, languageCode: 'en-US' },
    });
    return { url, status: interpretInspectionResult(response.data.inspectionResult) };
  } catch (error: any) {
    return { url, status: 'error', error: error.message };
  }
}
