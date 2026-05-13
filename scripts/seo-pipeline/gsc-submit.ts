import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getGSCClient } from './gsc-client';
import { markAsSubmitted, loadState } from './state-store';

const SITE_URL = process.env.SITE_URL || 'https://amazingplugins.com';
const SITEMAP_URL = process.env.SITEMAP_URL || 'https://amazingplugins.com/sitemap-0.xml';

/**
 * Get all blog post files that haven't been submitted to GSC
 */
export function getUnsubmittedPosts(): string[] {
  const blogDir = path.join(process.cwd(), 'src/content/blog');
  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
  const unsubmitted: string[] = [];
  
  for (const file of files) {
    const filePath = path.join(blogDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(content);
    
    // Check if gscSubmitted is not true
    if (!data.gscSubmitted) {
      unsubmitted.push(filePath);
    }
  }
  
  return unsubmitted;
}

/**
 * Generate the full URL for a blog post
 */
export function getPostURL(filePath: string): string {
  const fileName = path.basename(filePath, '.md');
  // Extract slug from filename (remove date prefix if present)
  const slug = fileName.replace(/^\d{4}-\d{2}-\d{2}-/, '');
  return `${SITE_URL}/blog/${slug}`;
}

/**
 * Submit the site's sitemap to Google Search Console
 */
async function submitSitemap(): Promise<boolean> {
  const client = await getGSCClient();
  const siteUrl = process.env.GSC_SITE_URL || 'sc-domain:amazingplugins.com';
  
  try {
    await client.sitemaps.submit({
      siteUrl,
      feedpath: SITEMAP_URL,
    });
    console.log(`Submitted sitemap: ${SITEMAP_URL}`);
    return true;
  } catch (error: any) {
    console.error(`Error submitting sitemap:`, error.message);
    return false;
  }
}

/**
 * Submit all unsubmitted posts to Google Search Console
 * Strategy: submit the sitemap once, then mark all posts as submitted
 */
export async function submitAllPosts(): Promise<{ submitted: number; failed: number }> {
  const unsubmitted = getUnsubmittedPosts();
  
  if (unsubmitted.length === 0) {
    console.log('No unsubmitted posts');
    return { submitted: 0, failed: 0 };
  }
  
  console.log(`Found ${unsubmitted.length} unsubmitted posts`);
  for (const filePath of unsubmitted) {
    console.log(`  - ${getPostURL(filePath)}`);
  }
  
  // Submit sitemap once for all new posts
  const sitemapOk = await submitSitemap();
  
  if (!sitemapOk) {
    console.error('Sitemap submission failed — posts not marked as submitted');
    return { submitted: 0, failed: unsubmitted.length };
  }
  
  // Mark all posts as submitted
  let submitted = 0;
  for (const filePath of unsubmitted) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data, content: body } = matter(content);
    data.gscSubmitted = true;
    fs.writeFileSync(filePath, matter.stringify(body, data));
    
    const slug = path.basename(filePath, '.md').replace(/^\d{4}-\d{2}-\d{2}-/, '');
    markAsSubmitted(slug);
    submitted++;
  }
  
  console.log(`\nSubmission complete: ${submitted} posts marked as submitted`);
  return { submitted, failed: 0 };
}

/**
 * Submit a specific post by slug
 */
export async function submitPost(slug: string): Promise<boolean> {
  const blogDir = path.join(process.cwd(), 'src/content/blog');
  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
  
  for (const file of files) {
    if (file.includes(slug)) {
      const filePath = path.join(blogDir, file);
      
      // Submit sitemap
      const sitemapOk = await submitSitemap();
      if (!sitemapOk) return false;
      
      // Mark as submitted
      const content = fs.readFileSync(filePath, 'utf-8');
      const { data, content: body } = matter(content);
      data.gscSubmitted = true;
      fs.writeFileSync(filePath, matter.stringify(body, data));
      markAsSubmitted(slug);
      
      return true;
    }
  }
  
  console.error(`Post not found: ${slug}`);
  return false;
}

import { fileURLToPath } from 'url';

// Run if called directly
const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {
  const slug = process.argv[2];
  if (slug) {
    submitPost(slug)
      .then(ok => process.exit(ok ? 0 : 1))
      .catch(() => process.exit(1));
  } else {
    submitAllPosts()
      .then(({ submitted, failed }) => process.exit(failed > 0 ? 1 : 0))
      .catch(() => process.exit(1));
  }
}
