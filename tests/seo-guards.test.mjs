// Guards the intentional SEO choices that were code-only: canonicals, sitemap contents, and the
// pre-launch Ironlatch hold. Reads dist/, so run `npm run build` first.
import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import test from 'node:test';

const dist = new URL('../dist/client/', import.meta.url);
const held = [
  '/plugins/ironlatch-security-scanner/',
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

test('sitemap lists slash-terminated URLs and leaves out the held Ironlatch pages', async () => {
  const locs = [...(await read('sitemap-0.xml')).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  assert.ok(locs.length > 50, 'expected the sitemap to list the site');
  for (const loc of locs) assert.ok(loc.startsWith('https://amazingplugins.com/') && loc.endsWith('/'), loc);
  for (const path of held) assert.ok(!locs.includes(`https://amazingplugins.com${path}`), `${path} must stay out of the sitemap`);
  assert.ok(locs.some((loc) => loc.includes('/blog/')), 'expected blog posts in the sitemap');
  assert.match(await read('sitemap-index.xml'), /<loc>https:\/\/amazingplugins\.com\/sitemap-0\.xml<\/loc>/);
});

test('held Ironlatch pages are noindex, nofollow and no other page is', async () => {
  for (const path of held) {
    assert.match(await read(`${path.slice(1)}index.html`), /<meta name="robots" content="noindex, nofollow"/, path);
  }
  for (const path of await pagePaths()) {
    if (held.includes(`/${path}`)) continue;
    assert.doesNotMatch(await read(`${path}index.html`), /<meta name="robots" content="[^"]*noindex/, `${path || '/'} must stay indexable`);
  }
});
