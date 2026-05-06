import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import path from 'path';

// GSC service account email from context
const SERVICE_ACCOUNT_EMAIL = 'gsc-agent@crontinel.iam.gserviceaccount.com';

// Initialize GSC API client
let gscClient: any = null;

export async function getGSCClient(): Promise<any> {
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
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });
  
  gscClient = google.webmasters({ version: 'v3', auth });
  return gscClient;
}

export interface URLStatus {
  url: string;
  indexed: boolean;
  impressions: number;
  clicks: number;
  position: number;
}

/**
 * Check if a URL is indexed in Google
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
    
    const data = response.data.rows?.[0] || {};
    return {
      url,
      indexed: true,
      impressions: data.impressions || 0,
      clicks: data.clicks || 0,
      position: data.position || 0,
    };
  } catch (error: any) {
    console.error(`Error checking URL status for ${url}:`, error.message);
    return {
      url,
      indexed: false,
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
    await client.urlInspection.index({
      siteUrl,
      requestBody: {
        inspectionUrl: url,
        languageCode: 'en-US',
      },
    });
    console.log(`Submitted URL for indexing: ${url}`);
    return true;
  } catch (error: any) {
    console.error(`Error submitting URL ${url}:`, error.message);
    return false;
  }
}
