import assert from 'node:assert/strict';
import { test } from 'node:test';
import { checkAPIAccess, completedPeriods } from './gsc-health';
import { interpretInspectionResult } from './gsc-client';
import { submitSitemap } from './gsc-submit';

test('API access fails when a health report contains errors', async () => {
  assert.equal(await checkAPIAccess(async () => ({ errors: ['API Error: denied'] }) as any), false);
  assert.equal(await checkAPIAccess(async () => ({ errors: [] }) as any), true);
  assert.equal(await checkAPIAccess(async () => { throw new Error('denied'); }), false);
});

test('completed periods exclude recent incomplete days and have equal length', () => {
  assert.deepEqual(completedPeriods(new Date('2026-09-28T14:00:00Z')), {
    current: { startDate: '2026-08-29', endDate: '2026-09-25' },
    prior: { startDate: '2026-08-01', endDate: '2026-08-28' },
  });
});

test('inspection verdict is separate from Search Analytics rows', () => {
  assert.equal(interpretInspectionResult({ indexStatusResult: { verdict: 'PASS' } }), 'indexed');
  assert.equal(interpretInspectionResult({ indexStatusResult: { verdict: 'NEUTRAL', coverageState: 'Discovered - currently not indexed' } }), 'discovered');
  assert.equal(interpretInspectionResult({ indexStatusResult: { verdict: 'NEUTRAL', coverageState: 'Crawled - currently not indexed' } }), 'crawled-not-indexed');
  assert.equal(interpretInspectionResult({}), 'unknown');
});

test('sitemap submission makes one sitemap API call without claiming URL indexing', async () => {
  const calls: unknown[] = [];
  const client = { sitemaps: { submit: async (request: unknown) => { calls.push(request); } } };
  const sitemap = await submitSitemap(client);
  assert.equal(sitemap, 'https://amazingplugins.com/sitemap-index.xml');
  assert.deepEqual(calls, [{ siteUrl: 'sc-domain:amazingplugins.com', feedpath: sitemap }]);
});
