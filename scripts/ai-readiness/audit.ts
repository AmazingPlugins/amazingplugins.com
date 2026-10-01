import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import {
  ALL_AGENTS,
  BANNED_PRODUCT_CLAIMS,
  CONTENT_SIGNAL,
  INDEXNOW_KEY,
  INDEXNOW_KEY_URL,
  PRODUCT_SUMMARY,
  SITEMAP_URL,
} from './policy.ts';
import { listArticles, listPublicPages, renderLlms, renderLlmsFull, renderRobots, siteRoot } from './render-ai-files.ts';

export interface AuditCheck {
  name: string;
  ok: boolean;
  detail: string;
  level: 'fail' | 'warn';
}

export function parseRobotGroups(robots: string): Map<string, { allow: string[]; disallow: string[] }> {
  const groups = new Map<string, { allow: string[]; disallow: string[] }>();
  let agents: string[] = [];
  let allow: string[] = [];
  let disallow: string[] = [];

  const flush = () => {
    for (const agent of agents) {
      groups.set(agent.toLowerCase(), { allow: [...allow], disallow: [...disallow] });
    }
    agents = [];
    allow = [];
    disallow = [];
  };

  for (const rawLine of robots.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const separator = line.indexOf(':');
    if (separator <= 0) continue;
    const field = line.slice(0, separator).trim().toLowerCase();
    const value = line.slice(separator + 1).trim();
    if (field === 'user-agent') {
      if (allow.length || disallow.length) flush();
      agents.push(value);
    } else if (field === 'allow') allow.push(value);
    else if (field === 'disallow') disallow.push(value);
  }
  flush();
  return groups;
}

export function agentIsAllowed(robots: string, agent: string): boolean {
  const groups = parseRobotGroups(robots);
  const group = groups.get(agent.toLowerCase()) ?? groups.get('*');
  if (!group) return false;
  if (group.disallow.some((rule) => rule === '/')) return false;
  return group.allow.some((rule) => rule === '/');
}

export function auditLocalFiles(): AuditCheck[] {
  const publicDir = path.join(siteRoot, 'public');
  const robotsPath = path.join(publicDir, 'robots.txt');
  const llmsPath = path.join(publicDir, 'llms.txt');
  const fullPath = path.join(publicDir, 'llms-full.txt');
  const keyPath = path.join(publicDir, `${INDEXNOW_KEY}.txt`);
  const checks: AuditCheck[] = [];

  const robots = fs.existsSync(robotsPath) ? fs.readFileSync(robotsPath, 'utf8') : '';
  const llms = fs.existsSync(llmsPath) ? fs.readFileSync(llmsPath, 'utf8') : '';
  const llmsFull = fs.existsSync(fullPath) ? fs.readFileSync(fullPath, 'utf8') : '';
  const pages = listPublicPages();
  const articles = listArticles();
  const expectedRobots = renderRobots();
  const expectedLlms = renderLlms(pages, articles);
  const expectedFull = renderLlmsFull(pages, articles);

  checks.push({
    name: 'robots matches policy',
    ok: robots === expectedRobots,
    detail: robots === expectedRobots ? 'public/robots.txt matches the generator' : 'run npm run ai:files',
    level: 'fail',
  });
  checks.push({
    name: 'content signal allows learning',
    ok: robots.includes(CONTENT_SIGNAL) && !/ai-train\s*=\s*no/i.test(robots),
    detail: CONTENT_SIGNAL,
    level: 'fail',
  });
  for (const agent of ALL_AGENTS) {
    checks.push({
      name: `${agent} allowed`,
      ok: agentIsAllowed(robots, agent),
      detail: agentIsAllowed(robots, agent) ? 'Allow: /' : 'missing allow or Disallow: /',
      level: 'fail',
    });
  }
  checks.push({
    name: 'sitemap directive',
    ok: robots.includes(`Sitemap: ${SITEMAP_URL}`),
    detail: SITEMAP_URL,
    level: 'fail',
  });
  checks.push({
    name: 'llms.txt matches pages',
    ok: llms === expectedLlms,
    detail: llms === expectedLlms ? `${articles.length} guides referenced` : 'run npm run ai:files',
    level: 'fail',
  });
  checks.push({
    name: 'llms-full.txt matches pages',
    ok: llmsFull === expectedFull,
    detail: llmsFull === expectedFull ? `${pages.length} pages, ${articles.length} guides` : 'run npm run ai:files',
    level: 'fail',
  });
  const productBlock = llmsFull.slice(0, llmsFull.indexOf('## Pages'));
  for (const claim of BANNED_PRODUCT_CLAIMS) {
    checks.push({
      name: `product summary omits ${claim}`,
      ok: !productBlock.includes(claim) && PRODUCT_SUMMARY.includes('nine free fixers'),
      detail: claim,
      level: 'fail',
    });
  }
  for (const page of pages) {
    checks.push({
      name: `llms-full links ${page.url}`,
      ok: llmsFull.includes(page.url),
      detail: page.title,
      level: 'fail',
    });
  }
  const keyBody = fs.existsSync(keyPath) ? fs.readFileSync(keyPath, 'utf8').trim() : '';
  checks.push({
    name: 'IndexNow key file',
    ok: keyBody === INDEXNOW_KEY,
    detail: INDEXNOW_KEY_URL,
    level: 'fail',
  });
  checks.push({
    name: 'Bing verification file',
    ok: fs.existsSync(path.join(publicDir, 'BingSiteAuth.xml')),
    detail: 'public/BingSiteAuth.xml',
    level: 'fail',
  });
  return checks;
}

export async function auditLive(origin = 'https://amazingplugins.com', fetchImpl: typeof fetch = fetch): Promise<AuditCheck[]> {
  const checks: AuditCheck[] = [];
  const robotsUrl = new URL('/robots.txt', origin).href;
  const robotsResponse = await fetchImpl(robotsUrl);
  const robots = await robotsResponse.text();
  const managedBlock = robots.includes('BEGIN Cloudflare Managed content');
  checks.push({
    name: 'live robots status',
    ok: robotsResponse.ok,
    detail: `${robotsResponse.status} ${robotsUrl}`,
    level: 'fail',
  });
  checks.push({
    name: 'live robots is not a Cloudflare block',
    ok: !managedBlock || !/User-agent:\s*\*\s+Disallow:\s*\//i.test(robots),
    detail: managedBlock ? 'Cloudflare managed robots.txt is injected' : 'no managed block',
    level: 'fail',
  });
  checks.push({
    name: 'live content signal allows learning',
    ok: robots.includes('ai-train=yes') && !/ai-train\s*=\s*no/i.test(robots),
    detail: robots.includes(CONTENT_SIGNAL) ? CONTENT_SIGNAL : 'live robots.txt has no ai-train=yes signal',
    level: 'fail',
  });
  for (const agent of ['OAI-SearchBot', 'GPTBot', 'Claude-SearchBot', 'ClaudeBot', 'Bingbot']) {
    checks.push({
      name: `live ${agent} allowed`,
      ok: agentIsAllowed(robots, agent),
      detail: agent,
      level: 'fail',
    });
  }

  const paths = ['/llms.txt', '/llms-full.txt', '/sitemap-index.xml', '/BingSiteAuth.xml', `/${INDEXNOW_KEY}.txt`];
  for (const pathname of paths) {
    const url = new URL(pathname, origin).href;
    const response = await fetchImpl(url);
    const body = pathname.endsWith('.txt') || pathname.endsWith('.xml') ? await response.text() : '';
    let ok = response.ok;
    let detail = `${response.status} ${url}`;
    if (pathname === `/${INDEXNOW_KEY}.txt`) {
      ok = response.ok && body.trim() === INDEXNOW_KEY;
      detail = ok ? 'key is live' : `${response.status}, key file not deployed yet`;
    }
    if (pathname === '/llms-full.txt') {
      const stale = body.includes('Color Contrast - Fixes contrast ratio');
      ok = response.ok && !stale;
      detail = stale ? 'live summary still has the old contrast claim' : detail;
    }
    checks.push({ name: `live ${pathname}`, ok, detail, level: 'fail' });
  }

  const appResponse = await fetchImpl('https://app.amazingplugins.com/robots.txt');
  checks.push({
    name: 'app host left out of marketing crawl policy',
    ok: true,
    detail: `app.amazingplugins.com/robots.txt returned ${appResponse.status}. Do not add it to the marketing sitemap.`,
    level: 'warn',
  });
  return checks;
}

export function summarize(checks: AuditCheck[]): { failures: number; warnings: number } {
  const failures = checks.filter((check) => !check.ok && check.level === 'fail').length;
  const warnings = checks.filter((check) => !check.ok && check.level === 'warn').length;
  return { failures, warnings };
}

export function formatReport(title: string, checks: AuditCheck[]): string {
  const { failures, warnings } = summarize(checks);
  const lines = [`# ${title}`, '', `Failures: ${failures}. Warnings: ${warnings}.`, ''];
  for (const check of checks) {
    const mark = check.ok ? 'pass' : check.level;
    lines.push(`- ${mark}: ${check.name}. ${check.detail}`);
  }
  return lines.join('\n');
}

async function main() {
  const local = auditLocalFiles();
  console.log(formatReport('Local AI files', local));
  let failures = summarize(local).failures;
  if (process.argv.includes('--live')) {
    const live = await auditLive();
    console.log('');
    console.log(formatReport('Live site', live));
    failures += summarize(live).failures;
  }
  if (failures > 0) process.exit(1);
}

const invokedDirectly = process.argv[1]
  && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;

if (invokedDirectly) {
  main().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  });
}
