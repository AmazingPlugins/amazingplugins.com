import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { loadSeoPipelineEnv } from './env-bootstrap';

export interface HealthReport {
  timestamp: string;
  siteUrl: string;
  /** Pages that had Search Analytics rows in the window. Not index coverage. */
  pagesWithSearchData: number;
  totalImpressions: number;
  totalClicks: number;
  avgPosition: number;
  errors: string[];
  topPages: Array<{ url: string; impressions: number; clicks: number; position: number }>;
}

/**
 * Get GSC health metrics for the site.
 * Site totals come from a Search Analytics query with no dimensions.
 * Top pages are a separate page-dimension query. Neither is index coverage.
 */
export async function getGSCHealth(): Promise<HealthReport> {
  loadSeoPipelineEnv();

  const siteUrl = process.env.GSC_SITE_URL || 'sc-domain:amazingplugins.com';
  const errors: string[] = [];

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

  const gsc = google.searchconsole({ version: 'v1', auth });

  const endDate = new Date().toISOString().split('T')[0];
  const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const emptyReport = (): HealthReport => ({
    timestamp: new Date().toISOString(),
    siteUrl,
    pagesWithSearchData: 0,
    totalImpressions: 0,
    totalClicks: 0,
    avgPosition: 0,
    errors,
    topPages: [],
  });

  try {
    const [totalsResponse, pagesResponse] = await Promise.all([
      gsc.searchanalytics.query({
        siteUrl,
        requestBody: {
          startDate,
          endDate,
        },
      }),
      gsc.searchanalytics.query({
        siteUrl,
        requestBody: {
          startDate,
          endDate,
          dimensions: ['page'],
          rowLimit: 250,
        },
      }),
    ]);

    const totals = totalsResponse.data.rows?.[0];
    const pageRows = pagesResponse.data.rows || [];
    const topPages: HealthReport['topPages'] = [];

    for (const row of pageRows) {
      if (row.keys && row.keys[0]) {
        topPages.push({
          url: row.keys[0],
          impressions: row.impressions || 0,
          clicks: row.clicks || 0,
          position: row.position || 0,
        });
      }
    }

    return {
      timestamp: new Date().toISOString(),
      siteUrl,
      pagesWithSearchData: pageRows.length,
      totalImpressions: totals?.impressions || 0,
      totalClicks: totals?.clicks || 0,
      avgPosition: totals?.position || 0,
      errors,
      topPages,
    };
  } catch (error: any) {
    errors.push(`API Error: ${error.message}`);
    return emptyReport();
  }
}

/**
 * Check if GSC API is accessible
 */
export async function checkAPIAccess(): Promise<boolean> {
  try {
    await getGSCHealth();
    return true;
  } catch (error: any) {
    console.error('GSC API Health Check Failed:', error.message);
    return false;
  }
}

/**
 * Save health report to file
 */
export function saveHealthReport(report: HealthReport, outputPath: string): void {
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
  console.log(`Health report saved to: ${outputPath}`);
}

/**
 * Log health report to console
 */
export function logHealthReport(report: HealthReport): void {
  console.log('\n=== GSC Health Report ===');
  console.log(`Timestamp: ${report.timestamp}`);
  console.log(`Site URL: ${report.siteUrl}`);
  console.log(`Pages with search data (30d): ${report.pagesWithSearchData}`);
  console.log(`Total Impressions: ${report.totalImpressions}`);
  console.log(`Total Clicks: ${report.totalClicks}`);
  console.log(`Average Position: ${report.avgPosition.toFixed(2)}`);

  if (report.errors.length > 0) {
    console.log('\nErrors:');
    for (const error of report.errors) {
      console.log(`  - ${error}`);
    }
  }

  if (report.topPages.length > 0) {
    console.log('\nTop Pages:');
    for (const page of report.topPages.slice(0, 5)) {
      console.log(`  - ${page.url}`);
      console.log(`    Impressions: ${page.impressions}, Clicks: ${page.clicks}, Position: ${page.position.toFixed(1)}`);
    }
  }
}

const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {
  getGSCHealth()
    .then((report) => {
      logHealthReport(report);
      process.exit(report.errors.length > 0 ? 2 : 0);
    })
    .catch((error: any) => {
      console.error(error?.message || String(error));
      process.exit(1);
    });
}
