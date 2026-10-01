import assert from 'node:assert/strict';
import { test } from 'node:test';
import { DEFAULT_SITEMAP_URL } from '../seo-pipeline/bing-submit.ts';
import { agentIsAllowed, auditLive, auditLocalFiles, summarize } from './audit.ts';
import { applyRateLimit } from './cloudflare-rate-limit.ts';
import { indexNowPayload, submitIndexNow } from './indexnow.ts';
import {
  ALL_AGENTS,
  CONTENT_SIGNAL,
  INDEXNOW_KEY,
  NO_CRAWL_DELAY,
  RATE_LIMIT,
  rateLimitExpression,
  rateLimitRule,
} from './policy.ts';
import { renderRobots, writeAiFiles } from './render-ai-files.ts';

test('robots.txt allows retrieval and training crawlers and points at the sitemap index', () => {
  writeAiFiles();
  const robots = renderRobots();
  assert.match(robots, new RegExp(CONTENT_SIGNAL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  assert.doesNotMatch(robots, /ai-train\s*=\s*no/i);
  assert.match(robots, new RegExp(`Sitemap: ${DEFAULT_SITEMAP_URL}`));
  for (const agent of ALL_AGENTS) {
    assert.equal(agentIsAllowed(robots, agent), true, agent);
    const block = robots.split('\n\n').find((group) => group.startsWith(`User-agent: ${agent}\n`));
    assert.ok(block, agent);
    if (NO_CRAWL_DELAY.has(agent)) assert.doesNotMatch(block, /Crawl-delay:/);
    else assert.match(block, /Crawl-delay: 1/);
  }
  assert.equal(agentIsAllowed('User-agent: GPTBot\nDisallow: /\n\nUser-agent: *\nAllow: /\n', 'GPTBot'), false);
});

test('generated files match the audit and omit retired product claims', () => {
  writeAiFiles();
  const checks = auditLocalFiles();
  const { failures } = summarize(checks);
  assert.equal(failures, 0, checks.filter((check) => !check.ok).map((check) => check.name).join(', '));
});

test('Bing submission defaults to the canonical sitemap index', () => {
  assert.equal(DEFAULT_SITEMAP_URL, 'https://amazingplugins.com/sitemap-index.xml');
});

test('free-plan rate limit counts document paths per IP for 10 seconds', () => {
  const rule = rateLimitRule();
  assert.equal(rule.ratelimit.period, 10);
  assert.equal(rule.ratelimit.mitigation_timeout, 10);
  assert.deepEqual(rule.ratelimit.characteristics, ['ip.src']);
  assert.equal(rule.ratelimit.requests_per_period, RATE_LIMIT.requestsPerPeriod);
  assert.equal(rule.expression.includes('user_agent'), false);
  for (const prefix of RATE_LIMIT.skippedPrefixes) {
    assert.match(rateLimitExpression(), new RegExp(prefix.replace('/', '\\/')));
  }
});

test('rate limit script does nothing without a token and will not replace an existing rule', async () => {
  const previous = process.env.CLOUDFLARE_API_TOKEN;
  delete process.env.CLOUDFLARE_API_TOKEN;
  const missing = await applyRateLimit(async () => {
    throw new Error('network should not be called');
  });
  assert.equal(missing.status, 'missing-token');

  process.env.CLOUDFLARE_API_TOKEN = 'test-token';
  const calls: string[] = [];
  const refused = await applyRateLimit(async (input, init) => {
    const url = String(input);
    calls.push(`${init?.method ?? 'GET'} ${url}`);
    if (url.includes('/zones?')) {
      return new Response(JSON.stringify({ success: true, result: [{ id: 'zone', name: 'amazingplugins.com' }] }));
    }
    return new Response(JSON.stringify({
      success: true,
      result: { id: 'ruleset', rules: [{ description: 'someone else' }] },
    }));
  });
  assert.equal(refused.status, 'refused');
  assert.equal(calls.some((call) => call.startsWith('POST')), false);

  if (previous === undefined) delete process.env.CLOUDFLARE_API_TOKEN;
  else process.env.CLOUDFLARE_API_TOKEN = previous;
});

test('IndexNow waits until the public key file is deployed', async () => {
  const payload = indexNowPayload();
  assert.equal(payload.key, INDEXNOW_KEY);
  assert.ok(payload.urlList.includes('https://amazingplugins.com/plugins/woocommerce-accessibility-fixer/'));
  const result = await submitIndexNow(async () => new Response('missing', { status: 404 }));
  assert.equal(result.ok, false);
  assert.match(result.detail, /not live/);
});

test('live audit flags a managed robots block and a stale summary', async () => {
  const live = await auditLive('https://amazingplugins.com', async (input) => {
    const url = String(input);
    if (url.endsWith('/robots.txt') && url.includes('amazingplugins.com') && !url.includes('app.')) {
      return new Response('User-agent: *\nDisallow: /\n', { status: 200 });
    }
    if (url.endsWith('/llms-full.txt')) {
      return new Response('Color Contrast - Fixes contrast ratio issues', { status: 200 });
    }
    if (url.includes('app.amazingplugins.com')) return new Response('{}', { status: 404 });
    return new Response('ok', { status: 200 });
  });
  const { failures } = summarize(live);
  assert.ok(failures > 0);
  assert.equal(live.find((check) => check.name === 'live GPTBot allowed')?.ok, false);
  assert.equal(live.find((check) => check.name === 'live /llms-full.txt')?.ok, false);
});
