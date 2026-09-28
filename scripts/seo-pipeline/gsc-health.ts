import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { loadSeoPipelineEnv } from './env-bootstrap';

export interface HealthReport {
  timestamp: string;
  siteUrl: string;
  currentPeriod: { startDate: string; endDate: string };
  priorPeriod: { startDate: string; endDate: string };
  /** Pages that had Search Analytics rows in the window. Not index coverage. */
  pagesWithSearchData: number;
  totalImpressions: number;
  totalClicks: number;
  avgPosition: number;
  priorImpressions: number;
  priorClicks: number;
  priorAvgPosition: number;
  errors: string[];
  topPages: Array<{ url: string; impressions: number; clicks: number; position: number }>;
}

/** Compare two completed 28-day UTC windows, allowing three days for GSC data to settle. */
export function completedPeriods(now = new Date()) {
  const day = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const shifted = (days: number) => new Date(day.getTime() + days * 86_400_000).toISOString().slice(0, 10);
  return {
    current: { startDate: shifted(-30), endDate: shifted(-3) },
    prior: { startDate: shifted(-58), endDate: shifted(-31) },
  };
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

  const { current, prior } = completedPeriods();

  const emptyReport = (): HealthReport => ({
    timestamp: new Date().toISOString(),
    siteUrl,
    currentPeriod: current,
    priorPeriod: prior,
    pagesWithSearchData: 0,
    totalImpressions: 0,
    totalClicks: 0,
    avgPosition: 0,
    priorImpressions: 0,
    priorClicks: 0,
    priorAvgPosition: 0,
    errors,
    topPages: [],
  });

  try {
    const [totalsResponse, pagesResponse, priorResponse] = await Promise.all([
      gsc.searchanalytics.query({
        siteUrl,
        requestBody: {
          ...current,
        },
      }),
      gsc.searchanalytics.query({
        siteUrl,
        requestBody: {
          ...current,
          dimensions: ['page'],
          rowLimit: 250,
        },
      }),
      gsc.searchanalytics.query({ siteUrl, requestBody: { ...prior } }),
    ]);

    const totals = totalsResponse.data.rows?.[0];
    const priorTotals = priorResponse.data.rows?.[0];
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
      currentPeriod: current,
      priorPeriod: prior,
      pagesWithSearchData: pageRows.length,
      totalImpressions: totals?.impressions || 0,
      totalClicks: totals?.clicks || 0,
      avgPosition: totals?.position || 0,
      priorImpressions: priorTotals?.impressions || 0,
      priorClicks: priorTotals?.clicks || 0,
      priorAvgPosition: priorTotals?.position || 0,
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
export async function checkAPIAccess(getHealth: () => Promise<Pick<HealthReport, 'errors'>> = getGSCHealth): Promise<boolean> {
  try {
    const report = await getHealth();
    return report.errors.length === 0;
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
  console.log(`Current completed period: ${report.currentPeriod.startDate} to ${report.currentPeriod.endDate}`);
  console.log(`Prior completed period: ${report.priorPeriod.startDate} to ${report.priorPeriod.endDate}`);
  console.log(`Pages with search data (current period): ${report.pagesWithSearchData}`);
  console.log(`Impressions: ${report.totalImpressions} (prior: ${report.priorImpressions})`);
  console.log(`Clicks: ${report.totalClicks} (prior: ${report.priorClicks})`);
  console.log(`Average Position: ${report.avgPosition.toFixed(2)} (prior: ${report.priorAvgPosition.toFixed(2)})`);

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
