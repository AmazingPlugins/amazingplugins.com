import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import fs from 'fs';
import path from 'path';

const SERVICE_ACCOUNT_EMAIL = 'gsc-agent@crontinel.iam.gserviceaccount.com';

export interface HealthReport {
  timestamp: string;
  siteUrl: string;
  totalIndexed: number;
  totalImpressions: number;
  totalClicks: number;
  avgPosition: number;
  errors: string[];
  topPages: Array<{ url: string; impressions: number; clicks: number; position: number }>;
}

/**
 * Get GSC health metrics for the site
 */
export async function getGSCHealth(): Promise<HealthReport> {
  const siteUrl = process.env.GSC_SITE_URL || 'sc-domain:amazingplugins.com';
  const errors: string[] = [];
  
  // Get credentials
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
  
  const gsc = google.webmasters({ version: 'v3', auth });
  
  const endDate = new Date().toISOString().split('T')[0];
  const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // 30 days ago
  
  try {
    // Get overall site stats
    const response = await gsc.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['page'],
        rowLimit: 10,
      },
    });
    
    const rows = response.data.rows || [];
    let totalImpressions = 0;
    let totalClicks = 0;
    let totalPosition = 0;
    const topPages: HealthReport['topPages'] = [];
    
    for (const row of rows) {
      const impressions = row.impressions || 0;
      const clicks = row.clicks || 0;
      const position = row.position || 0;
      
      totalImpressions += impressions;
      totalClicks += clicks;
      totalPosition += position;
      
      if (row.keys && row.keys[0]) {
        topPages.push({
          url: row.keys[0],
          impressions,
          clicks,
          position,
        });
      }
    }
    
    const avgPosition = rows.length > 0 ? totalPosition / rows.length : 0;
    
      return {
        timestamp: new Date().toISOString(),
        siteUrl,
        totalIndexed: rows.length,
        totalImpressions,
        totalClicks,
        avgPosition,
        errors,
        topPages,
      };
  } catch (error: any) {
    errors.push(`API Error: ${error.message}`);
    return {
      timestamp: new Date().toISOString(),
      siteUrl,
      totalIndexed: 0,
      totalImpressions: 0,
      totalClicks: 0,
      avgPosition: 0,
      errors,
      topPages: [],
    };
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
  console.log(`Total Indexed Pages: ${report.totalIndexed}`);
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
