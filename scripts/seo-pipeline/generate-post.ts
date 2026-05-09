/**
 * SEO Blog Post Generator — Deep Dive Model
 *
 * Strategy: ONE topic per run, MULTIPLE rich articles from different angles.
 * Each article answers one specific question people actually have about that topic.
 * No cap on articles — generate however many it takes to fully cover the topic.
 *
 * Context sources: keyword research, QA triage, Reddit discussions,
 * competitor analysis, GSC query data, community research.
 */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { getAllKeywords } from './keywords';
import type { KeywordEntry } from './keywords';
import { updatePostState, loadState } from './state-store';
import { getProductContextForPlatform, validateGeneratedArticle } from './content-quality';

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');
const COMMUNITY_DIR = '/Users/ray/Work/amazingplugins/community';

// All community research sources — each one tells us what real people are asking
const COMMUNITY_FILES = [
  'keyword-harvest-2026-04-22.md',
  'keyword-harvest-2026-04-23.md',
  'keyword-harvest-2026-04-24.md',
  'qa-triage-2026-04-22.md',
  'qa-triage-2026-04-24.md',
  'reddit-triage-2026-04-22.md',
  'reddit-triage-2026-04-23.md',
  'reddit-triage-2026-04-24.md',
  'reddit-triage-2026-04-25.md',
  'competitor-watch-2026-04-22.md',
  'competitor-watch-2026-04-23.md',
  'competitor-watch-2026-04-24.md',
  'competitor-watch-2026-04-25.md',
  'content-briefs-2026-04-24.md',
  'content-briefs-2026-04-25.md',
];

export interface GenerateOptions {
  keyword: string;
  intent: string;
  competition: string;
  // Additional context from community research
  context?: string;
  // What angle this specific article covers
  angle?: string;
}

function getCommunityContext(): string {
  let context = '';
  for (const f of COMMUNITY_FILES) {
    const filePath = path.join(COMMUNITY_DIR, f);
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      // Include headers and key content — not full files
      const lines = content.split('\n');
      const excerpt = lines.slice(0, 80).join('\n'); // First 80 lines = intro + key data
      context += `=== ${f} ===\n${excerpt}\n\n`;
    } catch { }
  }
  return context.slice(0, 12000); // Cap at 12k chars — enough for deep research
}

function makeSlug(keyword: string, angle: string): string {
  const date = new Date().toISOString().slice(0, 10);
  const safeKw = keyword.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').slice(0, 40);
  const safeAngle = angle.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').slice(0, 30);
  return `${date}-${safeKw}-${safeAngle}`;
}

function guessCategory(keyword: string): string {
  const kw = keyword.toLowerCase();
  if (kw.includes('shopify')) return 'shopify';
  if (kw.includes('woocommerce') || kw.includes('woo')) return 'woocommerce';
  return 'accessibility';
}

/**
 * Scan existing blog posts and return a list relevant to the given topic.
 * Used to build internal linking context for new articles.
 */
function findRelevantExistingPosts(topic: string, currentSlug: string): Array<{ slug: string; title: string; url: string }> {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const currentTopic = topic.toLowerCase();
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md') && f !== `${currentSlug}.md`);

  const scored: Array<{ slug: string; title: string; url: string; score: number }> = [];

  for (const file of files) {
    const filePath = path.join(BLOG_DIR, file);
    const raw = fs.readFileSync(filePath, 'utf-8');

    // Extract title from frontmatter
    const titleMatch = raw.match(/^title:\s*"?([^"\n]+)"?/m);
    const title = titleMatch ? titleMatch[1] : file.replace('.md', '');

    // Score by keyword overlap
    let score = 0;
    const lower = raw.toLowerCase();
    const topicWords = currentTopic.split(/\s+/);
    for (const word of topicWords) {
      if (word.length > 3 && lower.includes(word)) score++;
    }

    // Extract slug for URL construction
    const slug = file.replace('.md', '');
    const url = `https://amazingplugins.com/blog/${slug}`;

    if (score > 0) {
      scored.push({ slug, title, url, score });
    }
  }

  // Sort by relevance score, return top 5 for prompt context
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 5).map(({ slug, title, url }) => ({ slug, title, url }));
}

function guessTags(keyword: string, angle: string): string[] {
  const combined = (keyword + ' ' + angle).toLowerCase();
  const tags: string[] = ['Accessibility'];
  if (combined.includes('shopify')) tags.push('Shopify');
  if (combined.includes('woocommerce') || combined.includes('woo')) tags.push('WooCommerce');
  if (combined.includes('ada')) tags.push('ADA');
  if (combined.includes('wcag')) tags.push('WCAG');
  if (combined.includes('european') || combined.includes('eaa')) tags.push('EAA', 'EU');
  if (combined.includes('lawsuit') || combined.includes('legal')) tags.push('Legal');
  return tags;
}

/**
 * Given ONE topic and all available context, figure out:
 * What are the different angles/questions people have about this topic?
 * Return a list of article specs — one per angle.
 */
function planArticleAngles(keyword: string, intent: string, context: string): GenerateOptions[] {
  const platform = keyword.toLowerCase().includes('shopify') ? 'Shopify' : 'WooCommerce';
  const isHowTo = keyword.toLowerCase().startsWith('how to');
  const isLawsuit = keyword.toLowerCase().includes('lawsuit');
  const isWcag = keyword.toLowerCase().includes('wcag');
  const isEaa = keyword.toLowerCase().includes('european accessibility') || keyword.toLowerCase().includes('eaa');
  const isProduct = keyword.toLowerCase().includes('fixer') || keyword.toLowerCase().includes('checker');

  // Default angles based on topic type — these are the real sub-questions people ask
  const angles: GenerateOptions[] = [];

  if (isHowTo || isProduct) {
    // "How to make Shopify store ADA compliant" — people ask:
    angles.push({ keyword, intent, competition: '', angle: 'step-by-step-guide', context });
    angles.push({ keyword, intent, competition: '', angle: 'common-mistakes', context });
    angles.push({ keyword, intent, competition: '', angle: 'wcag-checklist', context });
  }

  if (isLawsuit) {
    // "ADA lawsuit Shopify store" — people ask:
    angles.push({ keyword, intent, competition: '', angle: 'lawsuit-explained', context });
    angles.push({ keyword, intent, competition: '', angle: 'protection-steps', context });
    angles.push({ keyword, intent, competition: '', angle: 'real-examples', context });
  }

  if (isWcag || isEaa) {
    // "WCAG 2.2 Shopify" — people ask:
    angles.push({ keyword, intent, competition: '', angle: 'what-changed', context });
    angles.push({ keyword, intent, competition: '', angle: 'checklist', context });
    angles.push({ keyword, intent, competition: '', angle: 'deadline', context });
  }

  if (isProduct) {
    // "Shopify accessibility fixer" — people ask:
    angles.push({ keyword, intent, competition: '', angle: 'what-it-actually-does', context });
    angles.push({ keyword, intent, competition: '', angle: 'how-it-compares', context });
  }

  // Fallback — just one deep article if no specific angles match
  if (angles.length === 0) {
    angles.push({ keyword, intent, competition: '', angle: 'full-guide', context });
  }

  return angles;
}

function buildPrompt(opts: GenerateOptions): string {
  const { keyword, intent, angle, context } = opts;
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
  else if (isProduct) articleType = 'product-explainer';
  else if (isHowTo) articleType = 'how-to';

  // Angle-specific instruction
  const angleInstructions: Record<string, string> = {
    'step-by-step-guide': 'This is a practical step-by-step guide. Lead with the exact steps the reader needs to take. Be specific — name the buttons they click, the numbers they need to meet, the order that matters.',
    'common-mistakes': 'This is a cautionary article. Focus on what goes wrong and why. Name the specific mistakes store owners make, the consequences, and how to avoid them. Be direct — no fluff.',
    'wcag-checklist': 'This is a checklist/reference article. Make it scannable and actionable. Each item should be something the reader can check or do right now.',
    'lawsuit-explained': 'Explain the legal situation clearly and calmly. What actually happens in an ADA lawsuit? What are the real numbers? What does the plaintiff have to prove? No fear-mongering — just facts.',
    'protection-steps': 'Focus on what store owners can actually do right now to protect themselves. Practical, specific, prioritized by impact.',
    'real-examples': 'Use real patterns from actual cases. What did those stores do wrong? What happened? What could they have done differently? Specific > general.',
    'what-changed': 'Focus on what is NEW in WCAG 2.2 or the new regulations. What did they add? What changed from 2.1? What matters most for store owners?',
    'checklist': 'Make it a practical checklist. Store owner should be able to go through it and know where they stand. Each item: what to check, what the standard is, what to do if failing.',
    'deadline': 'This is a deadline/action article. When does something need to be done? What happens if they miss it? What is the cheapest/fastest way to comply?',
    'what-it-actually-does': 'Explain clearly what an accessibility fixer actually does under the hood. What does it change in the code? What does it NOT fix? Be honest about limitations.',
    'how-it-compares': 'Compare honestly. What are the options? What are the tradeoffs? Name real differences — not fake feature lists. Help the reader decide.',
    'full-guide': 'Comprehensive guide. Cover the topic fully — definition, implications, action steps, FAQ. The reader should feel they got everything they needed in one article.',
  };

  const angleInstruction = angleInstructions[angle!] || angleInstructions['full-guide'];

  // Build internal links context for the prompt
  const relevantPosts = findRelevantExistingPosts(keyword, '');
  const internalLinksContext = relevantPosts.length > 0
    ? `INTERNAL LINKS — link to these existing articles where relevant:\n${relevantPosts.map(p => `- [${p.title}](${p.url})`).join('\n')}\n\nAdd 1-3 of these links naturally into the body where they add value for the reader. Use descriptive link text, not "click here".`
    : '';

  const productContext = getProductContextForPlatform(platform);

  return `You are a helpful ${platform} accessibility expert who writes for real store owners. Your job is to FULLY ANSWER one specific question the reader has. SEO is secondary — if the answer is genuinely useful, the SEO follows.

TOPIC: "${keyword}"
THIS ARTICLE'S ANGLE: "${angle}"
Search intent: ${intent}

Reader profile: ${platform} store owner. They have a question about accessibility, ADA compliance, or WCAG. They found this article because they need a real answer, not a sales pitch.

PRODUCT CONTEXT — connect the article naturally to what AmazingPlugins already sells:
${productContext}

RESEARCH CONTEXT — real questions and data from multiple sources:
${context}

${internalLinksContext}

${angleInstruction}

Write ONE article as a JSON object:
{
  "title": "clear title that matches what someone would search to find this answer, under 60 chars",
  "description": "honest meta description, 150-160 chars, no clickbait",
  "tags": ["Tag1", ...],
  "category": "shopify|woocommerce|accessibility",
  "body": "markdown body"
}

Rules:
1. ANSWER THE QUESTION IN THE FIRST PARAGRAPH. The reader should feel they got the answer immediately.
2. Include real specifics: WCAG criteria numbers, step sequences, dollar amounts, percentages, dates.
3. Do NOT use em dashes (they render as ***).
4. Write like a knowledgeable human. Short paragraphs. Real voice. No AI filler.
5. If something is nuanced or has tradeoffs, say so honestly. Do not oversimplify.
6. SEO: weave the topic keyword naturally into title, first paragraph, and 2+ subheadings. Do not stuff.
7. Include a "## Quick answer" or equivalent section near the top.
8. Include a "## People also ask" or "## Frequently asked questions" section with 3-5 real questions written as H3 headings.
9. Include at least one practical checklist, example, or step-by-step workflow.
10. Include a natural "How AmazingPlugins helps" section when relevant. Mention concrete product capabilities, not generic marketing.
11. Add 1-3 useful markdown links from the internal-links list if provided, plus product links when useful.
12. Word count: 1200-2200. Shorter articles are rejected by the quality gate.
13. Body type: ${articleType === 'how-to' ? 'step-by-step with specific WCAG criteria and exact actions' : articleType === 'lawsuit' ? 'legal patterns, real numbers, specific protection steps' : articleType === 'regulatory' ? 'requirement clarity + actionable checklist' : articleType === 'product-explainer' ? 'honest what-it-does + comparisons' : 'thorough explainer with actionable takeaways'}.

Output ONLY the raw JSON object, no markdown fences, no explanation.`;
}

function humanizeContent(content: string): string {
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

function writeBlogPost(filename: string, data: any, keyword: string, angle: string): string {
  const frontmatter = {
    title: data.title,
    description: data.description,
    pubDate: new Date().toISOString(),
    author: 'Harun Ray',
    tags: data.tags || guessTags(keyword, angle),
    seoKeywords: [keyword],
    seoCategory: guessCategory(keyword),
    articleAngle: angle,
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
  const filePath = path.join(BLOG_DIR, filename);
  fs.writeFileSync(filePath, content);
  return filename;
}

function generateWithClaude(opts: GenerateOptions): any {
  const prompt = buildPrompt(opts);
  const cmd = `claude --print --model opus --input-format text`;
  try {
    const output = execSync(cmd, {
      encoding: 'utf-8',
      timeout: 180000,
      maxBuffer: 50 * 1024 * 1024,
      cwd: process.cwd(),
      input: prompt,
    }).trim();

    const cleaned = output.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
    return JSON.parse(cleaned);
  } catch (error: any) {
    console.error(`Claude generation failed for "${opts.keyword}" (${opts.angle}): ${error.message}`);
    return null;
  }
}

/**
 * Generate articles for ONE topic — multiple angles, deep coverage.
 * No cap on how many articles. Generate however many angles the topic needs.
 */
export async function generateForTopic(topic: KeywordEntry): Promise<string[]> {
  const context = getCommunityContext();
  const angles = planArticleAngles(topic.keyword, topic.intent || 'informational', context);

  console.log(`\n=== Topic: "${topic.keyword}" ===`);
  console.log(`Planning ${angles.length} article angle(s): ${angles.map(a => a.angle).join(', ')}`);

  const generated: string[] = [];
  for (const opts of angles) {
    const slug = makeSlug(opts.keyword, opts.angle!);
    const filename = `${slug}.md`;
    const filePath = path.join(BLOG_DIR, filename);

    // Skip if already exists
    if (fs.existsSync(filePath)) {
      console.log(`Skipping "${opts.angle}" — already exists`);
      continue;
    }

    console.log(`Generating: [${opts.angle}]...`);
    const data = generateWithClaude(opts);

    if (!data || !data.title || !data.body) {
      console.error(`Failed to generate "${opts.angle}"`);
      continue;
    }

    const quality = validateGeneratedArticle(data, {
      keyword: opts.keyword,
      platform: opts.keyword.toLowerCase().includes('shopify') ? 'Shopify' : 'WooCommerce',
      angle: opts.angle!,
    });

    if (!quality.ok) {
      console.error(`Quality gate failed for "${opts.angle}" (${quality.wordCount} words):`);
      for (const error of quality.errors) console.error(`- ${error}`);
      continue;
    }

    if (quality.warnings.length > 0) {
      console.warn(`Quality warnings for "${opts.angle}":`);
      for (const warning of quality.warnings) console.warn(`- ${warning}`);
    }

    writeBlogPost(filename, data, opts.keyword, opts.angle!);
    console.log(`Created: ${filename}`);

    updatePostState(slug, {
      slug,
      title: data.title,
      topic: opts.keyword,
      angle: opts.angle,
      seoKeywords: [opts.keyword],
      seoCategory: guessCategory(opts.keyword),
      gscSubmitted: false,
    });

    generated.push(filename);
  }

  return generated;
}

/**
 * Pick ONE topic per run from the keyword queue.
 * Prioritize topics that have the most community research context available.
 * Generate multiple rich articles for that one topic.
 */
export async function generateAllCategoryPosts(): Promise<string[]> {
  const allKeywords = getAllKeywords();
  const state = loadState();
  const covered = new Set(
    Object.values(state.posts)
      .filter((p: any) => p.topic) // Only topics we've fully covered
      .map((p: any) => p.topic?.toLowerCase())
  );

  // Filter to uncovered topics
  const uncovered = allKeywords.filter(k => !covered.has(k.keyword.toLowerCase()));

  if (uncovered.length === 0) {
    console.log('All topics covered. Checking for new angles on existing topics...');
    // Check if any existing topic needs additional angle articles
    const existingTopics = new Set(Object.values(state.posts).map((p: any) => p.topic?.toLowerCase()));
    if (existingTopics.size > 0) {
      const topicToRefresh = allKeywords.find(k => existingTopics.has(k.keyword.toLowerCase()));
      if (topicToRefresh) {
        console.log(`Refreshing topic: ${topicToRefresh.keyword}`);
        return generateForTopic(topicToRefresh);
      }
    }
    return [];
  }

  // Pick the first uncovered topic — keyword files are already sorted by priority
  const selectedTopic = uncovered[0];
  console.log(`\nSelected topic: "${selectedTopic.keyword}"`);

  // Generate multiple articles for this one topic
  return generateForTopic(selectedTopic);
}

export async function main(): Promise<void> {
  const results = await generateAllCategoryPosts();
  console.log(`\nGenerated ${results.length} article(s): ${results.join(', ')}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}
