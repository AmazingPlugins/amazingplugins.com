import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getAllKeywords, getTopKeywords } from './keywords';
import { updatePostState, loadState } from './state-store';

interface GenerateOptions {
  title: string;
  keywords: string[];
  category: string;
  targetSlug?: string;
}

/**
 * Generate a new blog post from keywords
 */
export async function generatePost(options: GenerateOptions): Promise<string> {
  const { title, keywords, category, targetSlug } = options;
  
  const slug = targetSlug || title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  
  const date = new Date().toISOString().split('T')[0];
  const filename = `${date}-${slug}.md`;
  const filePath = path.join(process.cwd(), 'src/content/blog', filename);
  
  const frontmatter = {
    title,
    description: `${title} - A comprehensive guide`,
    pubDate: new Date().toISOString(),
    author: 'Harun Ray',
    tags: [category],
    seoKeywords: keywords,
    seoCategory: category,
    gscSubmitted: false,
  };
  
  const content = `---
${Object.entries(frontmatter).map(([k, v]) => {
  if (Array.isArray(v)) return `${k}:\n  ${v.map(item => `- ${item}`).join('\n  ')}`;
  return `${k}: ${v}`;
}).join('\n')}
---

# ${title}

## Introduction

This guide covers ${keywords.slice(0, 3).join(', ')} and more.

## Key Points

${keywords.slice(0, 5).map((kw, i) => `### ${i + 1}. ${kw.charAt(0).toUpperCase() + kw.slice(1)}\n\nDetailed content about ${kw}...`).join('\n\n')}

## Conclusion

For more information, explore our related resources on ${category}.
`;
  
  // Check if file already exists
  if (fs.existsSync(filePath)) {
    console.log(`Post already exists: ${filename}`);
    // Update existing post keywords
    const existing = matter(filePath);
    const updated = {
      ...existing.data,
      seoKeywords: keywords,
      seoCategory: category,
    };
    const updatedContent = matter.stringify(existing.content, updated);
    fs.writeFileSync(filePath, updatedContent);
  } else {
    fs.writeFileSync(filePath, content);
    console.log(`Created new post: ${filename}`);
  }
  
  // Update state
  updatePostState(slug, {
    slug,
    title,
    seoKeywords: keywords,
    seoCategory: category,
    gscSubmitted: false,
  });
  
  // Update total generated count
  const state = loadState();
  state.totalGenerated++;
  fs.writeFileSync(path.join(process.cwd(), 'post-state.json'), JSON.stringify(state, null, 2));
  
  return filename;
}

/**
 * Generate posts for all categories
 */
export async function generateAllCategoryPosts(): Promise<string[]> {
  const keywords = getAllKeywords();
  const categories = ['woocommerce', 'shopify', 'accessibility', 'ada compliance'];
  const generated: string[] = [];
  
  for (const category of categories) {
    const categoryKeywords = getTopKeywords(category, 10);
    if (categoryKeywords.length > 0) {
      const title = `Complete Guide to ${category.charAt(0).toUpperCase() + category.slice(1)}: ${categoryKeywords[0]}`;
      const filename = await generatePost({
        title,
        keywords: categoryKeywords,
        category,
      });
      generated.push(filename);
    }
  }
  
  return generated;
}
