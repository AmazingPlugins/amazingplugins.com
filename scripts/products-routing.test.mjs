import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const rules = readFileSync(new URL('../public/_redirects', import.meta.url), 'utf8')
  .split('\n').map(line => line.trim()).filter(line => line && !line.startsWith('#'));

test('the products page is not shadowed by a legacy redirect', () => {
  for (const path of ['/products', '/products/']) {
    for (const rule of rules) {
      const [source] = rule.split(/\s+/);
      const pattern = source.split('*').map(part => part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('.*');
      assert.equal(new RegExp(`^${pattern}$`).test(path), false, `${path} is shadowed by ${rule}`);
    }
  }
});

test('redirects stay under the Cloudflare Pages limit of 100 dynamic rules', () => {
  // Pages counts every rule after the first wildcard as dynamic and skips the rest past 100.
  const first = rules.findIndex(rule => /[*:]/.test(rule.split(/\s+/)[0]));
  const dynamic = first === -1 ? 0 : rules.length - first;
  assert.ok(dynamic <= 100, `${dynamic} rules at or after the first wildcard`);
});
