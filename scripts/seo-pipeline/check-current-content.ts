import * as fs from 'node:fs';
import * as path from 'node:path';
import matter from 'gray-matter';
import { validateGeneratedArticle } from './content-quality';

const posts = [
  ['2026-08-25-best-wcag-wordpress-plugins-compared.md', 'best wcag wordpress plugin', 'WooCommerce'],
  ['2026-08-26-woocommerce-accessibility-widget-compared.md', 'woocommerce accessibility widget', 'WooCommerce'],
  ['woocommerce-ada-compliance-checklist-2026.md', 'woocommerce ADA compliance checklist 2026', 'WooCommerce'],
] as const;

for (const [file, keyword, platform] of posts) {
  const raw = fs.readFileSync(path.join(process.cwd(), 'src/content/blog', file), 'utf-8');
  const parsed = matter(raw);
  const result = validateGeneratedArticle({
    title: String(parsed.data.title || ''),
    description: String(parsed.data.description || ''),
    body: parsed.content,
  }, { keyword, platform, angle: 'manual-upgrade' });
  console.log(`${file}: ${result.ok ? 'PASS' : 'FAIL'} (${result.wordCount} words)`);
  for (const error of result.errors) console.log(`  error: ${error}`);
  for (const warning of result.warnings) console.log(`  warning: ${warning}`);
}
