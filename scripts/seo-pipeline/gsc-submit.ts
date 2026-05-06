import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { submitURLForIndexing } from './gsc-client';
import { markAsSubmitted, loadState } from './state-store';

const SITE_URL = process.env.SITE_URL || 'https://amazingplugins.com';

/**
 * Get all blog post files that haven't been submitted to GSC
 */
export function getUnsubmittedPosts(): string[] {
  const blogDir = path.join(process.cwd(), 'src/content/blog');
  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
  const unsubmitted: string[] = [];
  
  for (const file of files) {
    const filePath = path.join(blogDir, file);
    const { data } = matter(filePath);
    
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
 * Submit all unsubmitted posts to Google Search Console
 */
export async function submitAllPosts(): Promise<{ submitted: number; failed: number }> {
  const unsubmitted = getUnsubmittedPosts();
  let submitted = 0;
  let failed = 0;
  
  console.log(`Found ${unsubmitted.length} unsubmitted posts`);
  
  for (const filePath of unsubmitted) {
    const url = getPostURL(filePath);
    console.log(`Submitting: ${url}`);
    
    const success = await submitURLForIndexing(url);
    
    if (success) {
      // Mark as submitted in frontmatter
      const content = fs.readFileSync(filePath, 'utf-8');
      const { data, content: body } = matter(content);
      data.gscSubmitted = true;
      fs.writeFileSync(filePath, matter.stringify(body, data));
      
      // Update state
      const slug = path.basename(filePath, '.md').replace(/^\d{4}-\d{2}-\d{2}-/, '');
      markAsSubmitted(slug);
      
      submitted++;
    } else {
      failed++;
    }
    
    // Rate limiting - wait between submissions
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log(`\nSubmission complete: ${submitted} submitted, ${failed} failed`);
  return { submitted, failed };
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
      const url = getPostURL(filePath);
      
      const success = await submitURLForIndexing(url);
      
      if (success) {
        // Mark as submitted
        const content = fs.readFileSync(filePath, 'utf-8');
        const { data, content: body } = matter(content);
        data.gscSubmitted = true;
        fs.writeFileSync(filePath, matter.stringify(body, data));
        markAsSubmitted(slug);
      }
      
      return success;
    }
  }
  
  console.error(`Post not found: ${slug}`);
  return false;
}
