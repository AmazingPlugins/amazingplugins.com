import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import matter from 'gray-matter';
import { shippingTester } from '../../src/data/shipping-rules-tester.ts';
import {
  ALL_AGENTS,
  CONTENT_SIGNAL,
  CRAWL_DELAY_SECONDS,
  FIXERS,
  INDEXNOW_KEY,
  LEARNING_AGENTS,
  NO_CRAWL_DELAY,
  PRODUCT_SUMMARY,
  SITE_ORIGIN,
  SITEMAP_URL,
} from './policy.ts';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
export const siteRoot = path.resolve(scriptDir, '../..');
const pagesDir = path.join(siteRoot, 'src/pages');
const blogDir = path.join(siteRoot, 'src/content/blog');
const publicDir = path.join(siteRoot, 'public');

export interface PublicPage {
  url: string;
  title: string;
  description: string;
}

export interface ArticleLink {
  url: string;
  title: string;
  description: string;
  date: string;
}

function walkAstro(dir: string): string[] {
  const found: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) found.push(...walkAstro(full));
    else if (entry.name.endsWith('.astro')) found.push(full);
  }
  return found;
}

export function pageUrl(relativePath: string): string | null {
  const normalized = relativePath.replace(/\\/g, '/');
  if (normalized.endsWith('404.astro') || normalized.includes('[')) return null;
  let route = normalized.replace(/\.astro$/, '');
  if (route.endsWith('/index')) route = route.slice(0, -'/index'.length);
  if (route === 'index' || route === '') return `${SITE_ORIGIN}/`;
  return `${SITE_ORIGIN}/${route}/`;
}

function extractTitle(source: string, filePath: string): string {
  const match = source.match(/<BaseLayout[\s\S]*?\btitle="([^"]+)"/);
  if (!match) throw new Error(`Missing title in ${filePath}`);
  return match[1];
}

function extractDescription(source: string, filePath: string): string {
  const literal = source.match(/<BaseLayout[\s\S]*?\bdescription="([^"]+)"/);
  if (literal) return literal[1];
  if (source.includes('shipping-rules-tester') && source.includes('description={plugin.description}')) {
    return shippingTester.description;
  }
  throw new Error(`Missing description in ${filePath}`);
}

export function listPublicPages(): PublicPage[] {
  return walkAstro(pagesDir)
    .map((file) => {
      const relative = path.relative(pagesDir, file);
      const url = pageUrl(relative);
      if (!url) return null;
      const source = fs.readFileSync(file, 'utf8');
      return {
        url,
        title: extractTitle(source, relative),
        description: extractDescription(source, relative),
      };
    })
    .filter((page): page is PublicPage => page !== null)
    .sort((a, b) => a.url.localeCompare(b.url));
}

export function listArticles(): ArticleLink[] {
  return fs.readdirSync(blogDir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(blogDir, file), 'utf8');
      const { data } = matter(raw);
      const slug = file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '');
      const title = String(data.title ?? '').trim();
      const description = String(data.description ?? '').replace(/\s+/g, ' ').trim();
      if (!title || !description) throw new Error(`Article missing title or description: ${file}`);
      const dateValue = data.updatedDate ?? data.pubDate;
      const date = new Date(dateValue);
      if (Number.isNaN(date.valueOf())) throw new Error(`Article missing date: ${file}`);
      return {
        url: `${SITE_ORIGIN}/blog/${slug}/`,
        title,
        description,
        date: date.toISOString().slice(0, 10),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.url.localeCompare(b.url)));
}

export function renderRobots(): string {
  const groups = ALL_AGENTS.map((agent) => {
    const lines = [`User-agent: ${agent}`, 'Allow: /'];
    if (!NO_CRAWL_DELAY.has(agent)) lines.push(`Crawl-delay: ${CRAWL_DELAY_SECONDS}`);
    return lines.join('\n');
  });

  return [
    '# Search answers and model learning are allowed.',
    '# Crawl-delay asks background crawlers to wait. Clients that ignore it are not stopped here.',
    '',
    CONTENT_SIGNAL,
    '',
    groups.join('\n\n'),
    '',
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${SITEMAP_URL}`,
    '',
  ].join('\n');
}

function link(page: { url: string; title: string; description: string }): string {
  return `- [${page.title}](${page.url}): ${page.description}`;
}

export function renderLlms(pages: PublicPage[], articles: ArticleLink[]): string {
  const byUrl = new Map(pages.map((page) => [page.url, page]));
  const required = [
    `${SITE_ORIGIN}/`,
    `${SITE_ORIGIN}/plugins/`,
    `${SITE_ORIGIN}/plugins/woocommerce-accessibility-fixer/`,
    `${SITE_ORIGIN}/plugins/shipping-rules-tester-for-woocommerce/`,
    `${SITE_ORIGIN}/plugins/amazing-security/`,
    `${SITE_ORIGIN}/faq/`,
    `${SITE_ORIGIN}/about/`,
    `${SITE_ORIGIN}/contact/`,
    `${SITE_ORIGIN}/products/`,
    `${SITE_ORIGIN}/privacy/`,
    `${SITE_ORIGIN}/terms/`,
  ];
  for (const url of required) {
    if (!byUrl.has(url)) throw new Error(`llms.txt is missing ${url}`);
  }
  const shippingGuide = articles.find((article) => article.url.endsWith('/how-to-test-woocommerce-shipping-zones-and-rates/'));
  if (!shippingGuide) throw new Error('Missing shipping guide for llms.txt');

  const fixer = byUrl.get(`${SITE_ORIGIN}/plugins/woocommerce-accessibility-fixer/`)!;
  const shipping = byUrl.get(`${SITE_ORIGIN}/plugins/shipping-rules-tester-for-woocommerce/`)!;
  const security = byUrl.get(`${SITE_ORIGIN}/plugins/amazing-security/`)!;

  return [
    '# AmazingPlugins',
    '',
    `> ${PRODUCT_SUMMARY}`,
    '',
    `${articles.length} guides are listed in [llms-full.txt](${SITE_ORIGIN}/llms-full.txt).`,
    '',
    '## Plugins',
    '',
    link(byUrl.get(`${SITE_ORIGIN}/plugins/`)!),
    link(fixer),
    `- [Accessibility Fixer on WordPress.org](https://wordpress.org/plugins/amazingplugins-accessibility-fixer-for-woocommerce/): Install the published plugin.`,
    link(shipping),
    `- [Shipping Rules Tester source](${shippingTester.source}): Source and manual installation notes. Directory status: ${shippingTester.status}.`,
    `- [Stale Order Cleaner](${SITE_ORIGIN}/plugins/#stale-order-cleaner): Find old pending, failed, cancelled, draft, or trashed orders. Preview before deletion. Deletion is permanent.`,
    `- [Stale Order Cleaner source](https://github.com/AmazingPlugins/stale-order-cleaner-for-woocommerce): Source on GitHub.`,
    link(security),
    '',
    '## Guides and support',
    '',
    link(byUrl.get(`${SITE_ORIGIN}/blog/`)!),
    link(shippingGuide),
    link(byUrl.get(`${SITE_ORIGIN}/faq/`)!),
    link(byUrl.get(`${SITE_ORIGIN}/`)!),
    link(byUrl.get(`${SITE_ORIGIN}/about/`)!),
    link(byUrl.get(`${SITE_ORIGIN}/contact/`)!),
    link(byUrl.get(`${SITE_ORIGIN}/products/`)!),
    '',
    '## Policies',
    '',
    link(byUrl.get(`${SITE_ORIGIN}/privacy/`)!),
    link(byUrl.get(`${SITE_ORIGIN}/terms/`)!),
    '',
  ].join('\n');
}

export function renderLlmsFull(pages: PublicPage[], articles: ArticleLink[]): string {
  const fixerLines = FIXERS.map(([name, detail], index) => `${index + 1}. ${name}. ${detail}`);
  const learning = LEARNING_AGENTS.join(', ');
  return [
    '# AmazingPlugins',
    '',
    `> ${PRODUCT_SUMMARY}`,
    '',
    '## What crawlers may do',
    '',
    'Search answers and model learning are allowed. Background crawlers are asked to wait one second between requests. That wait is not a hard limit.',
    `Training crawlers named in robots.txt: ${learning}.`,
    '',
    '## Accessibility Fixer',
    '',
    'Nine free fixers. No Pro version. Some fixers add a small inline script. The plugin does not measure text contrast and does not make a store fully accessible.',
    '',
    ...fixerLines,
    '',
    'Install: https://wordpress.org/plugins/amazingplugins-accessibility-fixer-for-woocommerce/',
    `Page: ${SITE_ORIGIN}/plugins/woocommerce-accessibility-fixer/`,
    '',
    '## Other plugins',
    '',
    `${shippingTester.name}. ${shippingTester.description} Status: ${shippingTester.status}.`,
    `Page: ${SITE_ORIGIN}${shippingTester.path}`,
    `Source: ${shippingTester.source}`,
    '',
    'Stale Order Cleaner finds old pending, failed, cancelled, draft, or trashed orders and can delete them after a dry run. Deletion is permanent.',
    `Page: ${SITE_ORIGIN}/plugins/#stale-order-cleaner`,
    'Source: https://github.com/AmazingPlugins/stale-order-cleaner-for-woocommerce',
    '',
    '## Pages',
    '',
    ...pages.map(link),
    '',
    `## Guides (${articles.length})`,
    '',
    ...articles.map((article) => `- [${article.title}](${article.url}) (${article.date}): ${article.description}`),
    '',
  ].join('\n');
}

export function writeAiFiles(): { robots: string; llms: string; llmsFull: string } {
  const pages = listPublicPages();
  const articles = listArticles();
  const robots = renderRobots();
  const llms = renderLlms(pages, articles);
  const llmsFull = renderLlmsFull(pages, articles);
  fs.mkdirSync(publicDir, { recursive: true });
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots);
  fs.writeFileSync(path.join(publicDir, 'llms.txt'), llms);
  fs.writeFileSync(path.join(publicDir, 'llms-full.txt'), llmsFull);
  fs.writeFileSync(path.join(publicDir, `${INDEXNOW_KEY}.txt`), `${INDEXNOW_KEY}\n`);
  return { robots, llms, llmsFull };
}

const invokedDirectly = process.argv[1]
  && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;

if (invokedDirectly) {
  const written = writeAiFiles();
  console.log(`Wrote robots.txt (${written.robots.length} bytes), llms.txt, llms-full.txt, and IndexNow key.`);
}
