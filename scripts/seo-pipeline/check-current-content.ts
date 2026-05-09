import * as fs from 'node:fs';
import * as path from 'node:path';
import { validateGeneratedArticle } from './content-quality';

const posts = [
  ['shopify-alt-text-missing-product-images.md', 'shopify product images alt text missing', 'Shopify'],
  ['why-shopify-stores-get-sued-for-ada.md', 'why do Shopify stores get sued for ADA accessibility', 'Shopify'],
  ['woocommerce-ada-compliance-checklist-2026.md', 'woocommerce ADA compliance checklist 2026', 'WooCommerce'],
] as const;

for (const [file, keyword, platform] of posts) {
  const raw = fs.readFileSync(path.join(process.cwd(), 'src/content/blog', file), 'utf-8');
  const [, fm = '', body = ''] = raw.split('---');
  const title = fm.match(/^title:\s*"([^"]+)"/m)?.[1] || '';
  const description = fm.match(/^description:\s*"([^"]+)"/m)?.[1] || '';
  const result = validateGeneratedArticle({ title, description, body }, { keyword, platform, angle: 'manual-upgrade' });
  console.log(`${file}: ${result.ok ? 'PASS' : 'FAIL'} (${result.wordCount} words)`);
  for (const error of result.errors) console.log(`  error: ${error}`);
  for (const warning of result.warnings) console.log(`  warning: ${warning}`);
}
