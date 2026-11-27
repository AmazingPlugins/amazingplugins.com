// Guards the intentional SEO choices that were code-only: canonicals, sitemap contents, and the
// pre-launch holds (Ironlatch, Tablewright). Reads dist/, so run `npm run build` first.
import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import test from 'node:test';

const dist = new URL('../dist/client/', import.meta.url);
const held = [
  '/plugins/ironlatch-security-scanner/',
  '/plugins/tablewright-database-manager/',
  '/compare/ironlatch-security-scanner-vs-wordfence/',
  '/compare/ironlatch-security-scanner-vs-custonis/',
];

const pagePaths = async (dir = '') => {
  const out = [];
  for (const entry of await readdir(new URL(dir, dist), { withFileTypes: true })) {
    if (entry.name.startsWith('~') || entry.name === '_astro') continue;
    if (entry.isDirectory()) out.push(...(await pagePaths(`${dir}${entry.name}/`)));
    else if (entry.name === 'index.html') out.push(dir);
  }
  return out;
};
const read = (path) => readFile(new URL(path, dist), 'utf8');
const tag = (html, re) => html.match(re)?.[1];

test('every page has one trailing-slash canonical on the apex that matches og:url', async () => {
  const paths = await pagePaths();
  assert.ok(paths.length > 50, 'expected the built site to have its pages');
  for (const path of paths) {
    const html = await read(`${path}index.html`);
    assert.equal((html.match(/<link rel="canonical"/g) ?? []).length, 1, `${path || '/'} canonical count`);
    const canonical = tag(html, /<link rel="canonical" href="([^"]+)"/);
    assert.equal(canonical, `https://amazingplugins.com/${path}`, `${path || '/'} canonical`);
    assert.equal(tag(html, /<meta property="og:url" content="([^"]+)"/), canonical, `${path || '/'} og:url`);
  }
});

test('sitemap lists slash-terminated URLs and leaves out the held pre-launch pages', async () => {
  const locs = [...(await read('sitemap-0.xml')).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  assert.ok(locs.length > 50, 'expected the sitemap to list the site');
  for (const loc of locs) assert.ok(loc.startsWith('https://amazingplugins.com/') && loc.endsWith('/'), loc);
  for (const path of held) assert.ok(!locs.includes(`https://amazingplugins.com${path}`), `${path} must stay out of the sitemap`);
  assert.ok(locs.some((loc) => loc.includes('/blog/')), 'expected blog posts in the sitemap');
  assert.match(await read('sitemap-index.xml'), /<loc>https:\/\/amazingplugins\.com\/sitemap-0\.xml<\/loc>/);
});

// The 23 URLs Google reported as "Not found (404)" when validation started on 2026-11-26.
// Every one must keep resolving through public/_redirects rather than 404 again.
const retired = [
  '/blog/2026-06-02-fix-shopify-app-accessibility-errors-without-uninstalling/',
  '/blog/2026-05-07-free-shopify-accessibility-checker/',
  '/blog/2026-05-26-shopify-checkout-accessibility-fixes/',
  '/blog/shopify-overlay-alternatives/',
  '/blog/how-to-make-your-shopify-store-eaa-compliant/',
  '/blog/shopify-wcag-2-2-compliance-checklist/',
  '/blog/wcag-22-compliance-shopify-deadline/',
  '/blog/wcag-22-compliance-shopify-checklist/',
  '/blog/shopify-accessibility-audit/',
  '/blog/how-to-audit-your-shopify-store-for-accessibility/',
  '/blog/accessible-product-data-for-ai-shopping/',
  '/blog/how-to-avoid-ada-lawsuits-shopify-woocommerce/',
  '/blog/shopify-accessibility-app-vs-userway/',
  '/blog/shopify-cart-drawer-accessibility-fixes/',
  '/blog/shopify-accessibility-app-comparison-widget-vs-checker-vs-code-level-fix/',
  '/plugins/shopify-accessibility-fixer/',
  '/plugins/shopify-accessibility-fixer',
  '/woocommerce-accessibility-fixer/',
  '/pricing',
  '/products/shopify-accessibility-scanner',
  '/~partytown/',
];

test('every retired URL redirects to a built page instead of 404ing', async () => {
  const lines = (await readFile(new URL('../public/_redirects', import.meta.url), 'utf8')).split('\n');
  const exact = new Map();
  const wildcards = [];
  for (const line of lines) {
    const [from, to] = line.trim().split(/\s+/);
    if (!from?.startsWith('/') || !to?.startsWith('/')) continue;
    if (from.endsWith('*')) wildcards.push({ prefix: from.slice(0, -1), to });
    else exact.set(from.replace(/\/$/, ''), to);
  }
  const target = (path) => {
    const bare = path.replace(/\/$/, '');
    if (exact.has(bare)) return exact.get(bare);
    const hit = wildcards.find((rule) => bare.startsWith(rule.prefix));
    return hit ? hit.to.replace(':splat', bare.slice(hit.prefix.length)) : undefined;
  };
  for (const path of retired) {
    const to = target(path);
    assert.ok(to, `${path} must have a redirect rule instead of answering 404`);
    assert.ok(!to.includes('~partytown'), `${path} must not redirect into the Partytown asset directory`);
    const built = `${to.replace(/^\//, '')}index.html`;
    assert.equal((await read(built)).length > 0, true, `${path} must point at a built page (${to})`);
  }
});

test('held pre-launch pages are noindex, nofollow and no other page is', async () => {
  for (const path of held) {
    assert.match(await read(`${path.slice(1)}index.html`), /<meta name="robots" content="noindex, nofollow"/, path);
  }
  for (const path of await pagePaths()) {
    if (held.includes(`/${path}`)) continue;
    assert.doesNotMatch(await read(`${path}index.html`), /<meta name="robots" content="[^"]*noindex/, `${path || '/'} must stay indexable`);
  }
});

test('every checkbox on a blog page has an accessible name', async () => {
  const posts = (await pagePaths()).filter((path) => path.startsWith('blog/') && path !== 'blog/');
  let boxes = 0;
  for (const path of posts) {
    // Quote-aware: a label may contain ">" (for example "<html lang>").
    for (const [input] of (await read(`${path}index.html`)).matchAll(/<input\b(?:[^>"]|"[^"]*")*>/g)) {
      if (!input.includes('type="checkbox"')) continue;
      boxes++;
      assert.match(input, /aria-label="[^"]+"/, `${path} checkbox has no aria-label`);
    }
  }
  assert.ok(boxes > 50, 'expected the checklist posts to render task-list checkboxes');
});
