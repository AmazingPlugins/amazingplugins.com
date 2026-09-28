/**
 * SEO Content Pipeline
 * 
 * Orchestrates the complete SEO content workflow:
 * 1. Parse keywords from harvest files
 * 2. Generate/update blog posts
 * 3. Generate health reports
 * Submit the live sitemap separately, after deployment, with seo:submit.
 */

import { generateAllCategoryPosts } from './generate-post';
import { getGSCHealth, logHealthReport, saveHealthReport } from './gsc-health';
import { generateBrokenLinksReport } from './fix-404s';
import { setLastRun } from './state-store';
import path from 'path';

export interface PipelineResult {
  success: boolean;
  generated: number;
  health: any;
  brokenLinks: number;
  errors: string[];
}

export async function runPipeline(): Promise<PipelineResult> {
  const result: PipelineResult = {
    success: false,
    generated: 0,
    health: null,
    brokenLinks: 0,
    errors: [],
  };
  
  console.log('=== SEO Content Pipeline ===\n');
  
  try {
    // Step 1: Generate posts
    console.log('Step 1: Generating blog posts from keywords...');
    try {
      const generated = await generateAllCategoryPosts();
      result.generated = generated.length;
      console.log(`Generated ${generated.length} posts\n`);
    } catch (error: any) {
      result.errors.push(`Generate error: ${error.message}`);
      console.error('Generate error:', error.message);
    }
    
    // Step 2: Check health. New posts are still local at this point.
    console.log('Step 2: Checking GSC health...');
    try {
      const health = await getGSCHealth();
      result.health = health;
      result.errors.push(...health.errors.map(error => `Health check error: ${error}`));
      logHealthReport(health);
      saveHealthReport(health, path.join(process.cwd(), 'gsc-health-report.json'));
      console.log('');
    } catch (error: any) {
      result.errors.push(`Health check error: ${error.message}`);
      console.error('Health check error:', error.message);
    }
    
    // Step 3: Check for broken links
    console.log('Step 3: Checking for broken links...');
    try {
      const brokenLinks = await generateBrokenLinksReport();
      result.brokenLinks = brokenLinks.length;
      console.log(`Found ${brokenLinks.length} broken links\n`);
    } catch (error: any) {
      result.errors.push(`Broken links check error: ${error.message}`);
      console.error('Broken links check error:', error.message);
    }
    
    // Update last run timestamp
    setLastRun();
    
    result.success = result.errors.length === 0;
    
    console.log('\n=== Pipeline Complete ===');
    console.log(`Generated: ${result.generated}`);
    console.log(`Broken Links: ${result.brokenLinks}`);
    console.log(`Errors: ${result.errors.length}`);
    
  } catch (error: any) {
    result.errors.push(`Pipeline error: ${error.message}`);
    console.error('Pipeline error:', error.message);
  }
  
  return result;
}

// Run if called directly
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {
  runPipeline()
    .then(result => {
      process.exit(result.success ? 0 : 1);
    })
    .catch(error => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}
