/**
 * SEO Content Pipeline
 * 
 * Orchestrates the complete SEO content workflow:
 * 1. Parse keywords from harvest files
 * 2. Generate/update blog posts
 * 3. Submit to Google Search Console
 * 4. Generate health reports
 */

import { generateAllCategoryPosts } from './generate-post';
import { submitAllPosts } from './gsc-submit';
import { getGSCHealth, logHealthReport, saveHealthReport } from './gsc-health';
import { generateBrokenLinksReport } from './fix-404s';
import { setLastRun } from './state-store';
import fs from 'fs';
import path from 'path';

export interface PipelineResult {
  success: boolean;
  generated: number;
  submitted: number;
  health: any;
  brokenLinks: number;
  errors: string[];
}

export async function runPipeline(): Promise<PipelineResult> {
  const result: PipelineResult = {
    success: false,
    generated: 0,
    submitted: 0,
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
    
    // Step 2: Submit to GSC
    console.log('Step 2: Submitting to Google Search Console...');
    try {
      const { submitted } = await submitAllPosts();
      result.submitted = submitted;
      console.log(`Submitted ${submitted} posts\n`);
    } catch (error: any) {
      result.errors.push(`Submit error: ${error.message}`);
      console.error('Submit error:', error.message);
    }
    
    // Step 3: Check health
    console.log('Step 3: Checking GSC health...');
    try {
      const health = await getGSCHealth();
      result.health = health;
      logHealthReport(health);
      saveHealthReport(health, path.join(process.cwd(), 'gsc-health-report.json'));
      console.log('');
    } catch (error: any) {
      result.errors.push(`Health check error: ${error.message}`);
      console.error('Health check error:', error.message);
    }
    
    // Step 4: Check for broken links
    console.log('Step 4: Checking for broken links...');
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
    console.log(`Submitted: ${result.submitted}`);
    console.log(`Broken Links: ${result.brokenLinks}`);
    console.log(`Errors: ${result.errors.length}`);
    
  } catch (error: any) {
    result.errors.push(`Pipeline error: ${error.message}`);
    console.error('Pipeline error:', error.message);
  }
  
  return result;
}

// Run if called directly
if (require.main === module) {
  runPipeline()
    .then(result => {
      process.exit(result.success ? 0 : 1);
    })
    .catch(error => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}
