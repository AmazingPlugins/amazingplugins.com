import { getRankAndTrafficStats, getUrlSubmissionQuota, getUserSites } from './bing-client';

const SITE_URL = process.env.BING_SITE_URL || 'https://amazingplugins.com/';

function toDateString(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toISOString().slice(0, 10);
}

async function main() {
  const sites = await getUserSites();
  const currentSite = sites.find(site => site.Url === SITE_URL || site.Url === SITE_URL.replace(/\/$/, ''));
  const stats = await getRankAndTrafficStats(SITE_URL);
  const quota = await getUrlSubmissionQuota(SITE_URL);

  const totalImpressions = stats.reduce((sum, row) => sum + (row.Impressions || 0), 0);
  const totalClicks = stats.reduce((sum, row) => sum + (row.Clicks || 0), 0);
  const latest = [...stats].sort((a, b) => (a.Date < b.Date ? 1 : -1))[0];

  console.log('=== Bing Webmaster Health ===');
  console.log(`Site: ${SITE_URL}`);
  console.log(`Verified: ${currentSite ? (currentSite.IsVerified ? 'yes' : 'no') : 'not found in account'}`);
  console.log(`Known sites: ${sites.length}`);
  console.log(`Rank rows: ${stats.length}`);
  console.log(`Total impressions: ${totalImpressions}`);
  console.log(`Total clicks: ${totalClicks}`);
  if (latest) {
    console.log(`Latest row: ${toDateString(latest.Date)} impressions=${latest.Impressions || 0} clicks=${latest.Clicks || 0}`);
  }
  if (quota) {
    console.log(`URL submission quota: daily=${quota.DailyQuota} monthly=${quota.MonthlyQuota}`);
  }
}

main().catch(error => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
