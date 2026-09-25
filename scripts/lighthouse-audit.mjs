import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';

const [base = 'http://localhost:4321', directory = '.lighthouse', filter = ''] = process.argv.slice(2);
const pages = {
  home: '/',
  plugins: '/plugins/',
  accessibility: '/plugins/woocommerce-accessibility-fixer/',
  shipping: '/plugins/shipping-rules-tester-for-woocommerce/',
  faq: '/faq/',
  article: '/blog/how-to-test-woocommerce-shipping-zones-and-rates/',
};
await mkdir(directory, { recursive: true });
const results = [];
for (const [page, path] of Object.entries(pages)) {
  if (filter && !filter.split(',').includes(page)) continue;
  for (const device of ['mobile', 'desktop']) {
    const output = resolve(directory, `${page}-${device}.json`);
    const args = ['exec', '--yes', '--package=lighthouse@13.5.0', '--', 'lighthouse', new URL(path, base).href,
      '--chrome-flags=--headless --no-sandbox', '--only-categories=performance,accessibility,best-practices,seo',
      '--output=json', `--output-path=${output}`, '--quiet'];
    if (device === 'desktop') args.push('--preset=desktop');
    const run = spawnSync('npm', args, { stdio: 'inherit', timeout: 180_000 });
    if (run.status !== 0) throw new Error(`Lighthouse failed: ${page} ${device}`);
    const report = JSON.parse(await readFile(output, 'utf8'));
    if (report.runtimeError) throw new Error(JSON.stringify(report.runtimeError));
    const result = { page, device, url: report.finalDisplayedUrl,
      scores: Object.fromEntries(Object.entries(report.categories).map(([key, value]) => [key, Math.round(value.score * 100)])),
      metrics: Object.fromEntries(['first-contentful-paint', 'largest-contentful-paint', 'total-blocking-time', 'cumulative-layout-shift'].map(key => [key, report.audits[key].numericValue])),
      warnings: report.runWarnings };
    results.push(result);
    console.log(JSON.stringify(result));
    await writeFile(resolve(directory, 'summary.json'), JSON.stringify(results, null, 2) + '\n');
  }
}
