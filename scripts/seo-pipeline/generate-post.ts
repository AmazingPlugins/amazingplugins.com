/**
 * SEO Blog Post Generator
 * Uses Claude Code Opus to generate high-quality, SEO-optimized articles.
 * Each article: title, meta description, H1-H3, 800-1200 words, FAQ schema, OG tags.
 */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { getAllKeywords, getTopKeywords, KeywordEntry } from './keywords';
import { updatePostState, loadState } from './state-store';

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');
const KEYWORD_FILES = [
  '/Users/ray/Work/amazingplugins/community/keyword-harvest-2026-04-22.md',
  '/Users/ray/Work/amazingplugins/community/keyword-harvest-2026-04-23.md',
  '/Users/ray/Work/amazingplugins/community/keyword-harvest-2026-04-24.md',
];

export interface GenerateOptions {
  keyword: string;
  intent: string;
  competition: string;
}

function makeSlug(keyword: string): string {
  const date = new Date().toISOString().slice(0, 10);
  const safe = keyword
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 55);
  return `${date}-${safe}`;
}

function readKeywordContext(): string {
  let context = '';
  for (const f of KEYWORD_FILES) {
    try {
      context += fs.readFileSync(f, 'utf-8') + '\n\n';
    } catch {}
  }
  return context.slice(0, 8000); // cap at 8k chars for prompt
}

function formatTitle(keyword: string): string {
  const kw = keyword.toLowerCase();
  const titles: Record<string, string> = {
    'shopify accessibility fixer': 'The 10 Best Shopify Accessibility Fixers in 2026 (Tested)',
    'woocommerce accessibility fixer': 'The 10 Best WooCommerce Accessibility Plugins in 2026 (Tested)',
    'shopify accessibility checker': 'How to Check Your Shopify Store for Accessibility Issues (Free Guide)',
    'woocommerce accessibility checker': 'How to Check Your WooCommerce Store for Accessibility Issues (Free Guide)',
    'shopify ada compliance app': 'Shopify ADA Compliance App: What Works and What Doesn\'t in 2026',
    'woocommerce ada compliance plugin': 'WooCommerce ADA Compliance Plugin: What Works and What Doesn\'t in 2026',
    'how to make shopify store ada compliant': 'How to Make Your Shopify Store ADA Compliant in 2026 (Step by Step)',
    'how to make woocommerce store ada compliant': 'How to Make Your WooCommerce Store ADA Compliant in 2026 (Step by Step)',
    'ada lawsuit shopify store': 'ADA Lawsuits Against Shopify Stores: What You Need to Know in 2026',
    'wcag 2.2 shopify': 'WCAG 2.2 for Shopify Stores: What Changed and What It Means for You',
    'european accessibility act shopify': 'European Accessibility Act and Shopify: What Stores Need to Do Now',
  };
  if (titles[kw]) return titles[kw];
  return keyword.charAt(0).toUpperCase() + keyword.slice(1);
}

function guessTags(keyword: string): string[] {
  const kw = keyword.toLowerCase();
  const tags: string[] = ['Accessibility'];
  if (kw.includes('shopify')) tags.push('Shopify');
  if (kw.includes('woocommerce') || kw.includes('woo')) tags.push('WooCommerce');
  if (kw.includes('ada')) tags.push('ADA');
  if (kw.includes('wcag')) tags.push('WCAG');
  if (kw.includes('european') || kw.includes('eaa')) tags.push('EAA', 'EU');
  if (kw.includes('lawsuit') || kw.includes('legal')) tags.push('Legal');
  return tags;
}

function guessCategory(keyword: string): string {
  const kw = keyword.toLowerCase();
  if (kw.includes('shopify')) return 'shopify';
  if (kw.includes('woocommerce') || kw.includes('woo')) return 'woocommerce';
  return 'accessibility';
}

function buildPrompt(keyword: string, intent: string): string {
  const platform = keyword.toLowerCase().includes('shopify') ? 'Shopify' : 'WooCommerce';
  const isHowTo = keyword.toLowerCase().startsWith('how to');
  const isLawsuit = keyword.toLowerCase().includes('lawsuit');
  const isWcag = keyword.toLowerCase().includes('wcag');
  const isEaa = keyword.toLowerCase().includes('european accessibility') || keyword.toLowerCase().includes('eaa');
  const isProduct = keyword.toLowerCase().includes('fixer') || keyword.toLowerCase().includes('checker');

  let articleType = 'how-to';
  if (isLawsuit) articleType = 'lawsuit';
  else if (isEaa) articleType = 'regulatory';
  else if (isWcag) articleType = 'explainer';
  else if (isProduct) articleType = 'product-roundup';
  else if (isHowTo) articleType = 'how-to';

  const keywordContext = readKeywordContext();

  return `You are an expert SEO content writer for e-commerce accessibility. Write one long-form blog article optimized for the keyword: "${keyword}" (search intent: ${intent}).

CONTEXT FROM KEYWORD RESEARCH:
${keywordContext}

Write the article as a JSON object with this exact shape:
{
  "title": "SEO-optimized title under 60 chars",
  "description": "meta description 150-160 chars",
  "tags": ["Tag1", "Tag2", ...],
  "category": "shopify|woocommerce|accessibility",
  "body": "the full article body in markdown"
}

Requirements:
- Title: catchy, includes primary keyword, under 60 chars
- Description: includes keyword, compelling click incentive, 150-160 chars
- Body: ${articleType === 'how-to' ? 'step-by-step practical guide with specific WCAG criteria and real numbers' : articleType === 'lawsuit' ? 'informational with real statistics, patterns, and actionable protection steps' : articleType === 'regulatory' ? 'clear explanation of requirements plus compliance checklist' : articleType === 'product-roundup' ? 'comparison format with honest assessments' : 'informational explainer'}. 800-1200 words. Use H2 and H3 headers. End with FAQ schema (3-4 questions).
- No em dashes in the content (Harun finds them visually confusing — renders as ***)
- Write like a knowledgeable human, not AI
- Product mentions must be specific and credible, no fake feature lists
- Include real WCAG criteria numbers (e.g., WCAG 2.1 AA = 4.5:1 contrast, WCAG 2.4.3 focus order, etc.)
- End body with a "## Frequently Asked Questions" section with 3-4 questions and answers

Output ONLY the raw JSON object, no markdown code fences, no explanation.`;
}

function humanizeContent(content: string): string {
  // Basic humanization: short sentences, remove AI-isms, vary paragraph length
  return content
    .replace(/In conclusion,/g, 'Bottom line,')
    .replace(/It is important to note that/g, 'Here\'s the thing:')
    .replace(/Furthermore,/g, 'Also,')
    .replace(/Additionally,/g, 'On top of that,')
    .replace(/Moreover,/g, 'Beyond that,')
    .replace(/Nevertheless,/g, 'Still,')
    .replace(/Consequently,/g, 'So')
    .replace(/Thus,/g, 'This means')
    .replace(/Hence,/g, 'Which is why')
    .replace(/\.\.\./g, '...')
    .replace(/(\.\s){3,}/g, '...')
    .replace(/\bvery\b/g, '')
    .replace(/\breally\b/g, '')
    .replace(/\bquite\b/g, '')
    .replace(/\bessentially\b/g, '')
    .replace(/\{/g, '')
    .replace(/\}/g, '');
}

function writeBlogPost(filename: string, data: any, keyword: string): string {
  const slug = filename.replace('.md', '');
  const frontmatter = {
    title: data.title,
    description: data.description,
    pubDate: new Date().toISOString(),
    author: 'Harun Ray',
    tags: data.tags || ['Accessibility'],
    seoKeywords: [keyword],
    seoCategory: data.category || 'accessibility',
    gscSubmitted: false,
  };

  const body = humanizeContent(data.body || '');
  const fm = Object.entries(frontmatter)
    .map(([k, v]) => {
      if (Array.isArray(v)) return `${k}:\n  ${v.map((i: string) => `- ${i}`).join('\n  ')}`;
      return `${k}: ${v}`;
    })
    .join('\n');

  const content = `---\n${fm}\n---\n\n${body}\n`;
  fs.writeFileSync(path.join(BLOG_DIR, filename), content);
  return filename;
}

function generateWithClaude(keyword: string, intent: string): any {
  const prompt = buildPrompt(keyword, intent);
  const cmd = `claude --print --model opus --no-input ${JSON.stringify(prompt)}`;

  try {
    const output = execSync(cmd, {
      encoding: 'utf-8',
      timeout: 120000,
      maxBuffer: 50 * 1024 * 1024,
      cwd: process.cwd(),
    }).trim();

    // Strip any markdown code fences if present
    const cleaned = output.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
    return JSON.parse(cleaned);
  } catch (error: any) {
    console.error(`Claude generation failed for "${keyword}": ${error.message}`);
    // Fallback: return null so caller can skip this keyword
    return null;
  }
}

export async function generatePost(opts: GenerateOptions): Promise<string | null> {
  const { keyword, intent, competition } = opts;
  const slug = makeSlug(keyword);
  const filename = `${slug}.md`;
  const filePath = path.join(BLOG_DIR, filename);

  // Skip if already exists
  if (fs.existsSync(filePath)) {
    console.log(`Skipping "${keyword}" — already exists`);
    return null;
  }

  console.log(`Generating: "${keyword}"...`);
  const data = generateWithClaude(keyword, intent);

  if (!data || !data.title || !data.body) {
    console.error(`Failed to generate content for "${keyword}"`);
    return null;
  }

  writeBlogPost(filename, data, keyword);
  console.log(`Created: ${filename}`);

  updatePostState(slug, {
    slug,
    title: data.title,
    seoKeywords: [keyword],
    seoCategory: data.category || guessCategory(keyword),
    gscSubmitted: false,
  });

  return filename;
}

export async function generateAllCategoryPosts(): Promise<string[]> {
  const batchSize = parseInt(process.env.BATCH_SIZE || '3', 10);
  const allKeywords = getAllKeywords();
  const state = loadState();
  const covered = new Set(Object.values(state.posts).map((p: any) => p.keyword?.toLowerCase()));

  const uncovered = allKeywords.filter((k) => !covered.has(k.keyword.toLowerCase()));
  const toGenerate = uncovered.slice(0, batchSize);

  const generated: string[] = [];
  for (const kw of toGenerate) {
    const result = await generatePost(kw);
    if (result) generated.push(result);
  }

  return generated;
}

export async function main(): Promise<void> {
  const results = await generateAllCategoryPosts();
  console.log(`\nGenerated ${results.length} post(s): ${results.join(', ')}`);
}

if (require.main === module) {
  main().catch(console.error);
}
