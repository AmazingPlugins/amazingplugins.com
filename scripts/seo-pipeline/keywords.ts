import fs from 'fs';
import path from 'path';

export interface KeywordEntry {
  keyword: string;
  intent?: string;
  competition?: string;
  notes?: string;
}

interface KeywordFile {
  date: string;
  keywords: KeywordEntry[];
}

/**
 * Parse keyword harvest markdown files
 */
export function parseKeywordFile(filePath: string): KeywordFile | null {
  if (!fs.existsSync(filePath)) {
    console.error(`Keyword file not found: ${filePath}`);
    return null;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  
  const dateMatch = content.match(/\*\*Research date:\*\* (\d{4}-\d{2}-\d{2})/);
  const date = dateMatch ? dateMatch[1] : path.basename(filePath, '.md').replace('keyword-harvest-', '');
  
  const keywords: KeywordEntry[] = [];
  let inKeywordTable = false;
  
  for (const line of lines) {
    if (line.includes('| Keyword |')) {
      inKeywordTable = true;
      continue;
    }
    if (inKeywordTable && line.includes('---|')) {
      continue;
    }
    if (inKeywordTable && line.trim() === '') {
      inKeywordTable = false;
      continue;
    }
    if (inKeywordTable && line.includes('|')) {
      const parts = line.split('|').map(p => p.trim()).filter(Boolean);
      if (parts.length >= 2) {
        keywords.push({
          keyword: parts[0],
          intent: parts[1] || undefined,
          competition: parts[2] || undefined,
          notes: parts[3] || undefined,
        });
      }
    }
  }
  
  return { date, keywords };
}

/**
 * Get all keyword files sorted by date
 */
export function getKeywordFiles(): string[] {
  const communityDir = '/Users/ray/Work/amazingplugins/community';
  const files = fs.readdirSync(communityDir)
    .filter(f => f.startsWith('keyword-harvest-') && f.endsWith('.md'))
    .map(f => path.join(communityDir, f))
    .sort()
    .reverse(); // Most recent first
  return files;
}

/**
 * Extract top keywords by category
 */
export function getTopKeywords(category: string, limit: number = 10): string[] {
  const files = getKeywordFiles();
  const categoryKeywords: KeywordEntry[] = [];
  
  for (const file of files) {
    const parsed = parseKeywordFile(file);
    if (!parsed) continue;
    
    for (const kw of parsed.keywords) {
      if (kw.notes?.toLowerCase().includes(category.toLowerCase()) ||
          kw.keyword.toLowerCase().includes(category.toLowerCase())) {
        categoryKeywords.push(kw);
      }
    }
    
    if (categoryKeywords.length >= limit) break;
  }
  
  return categoryKeywords.slice(0, limit).map(k => k.keyword);
}

/**
 * Get all unique keywords
 */
export function getAllKeywords(): KeywordEntry[] {
  const files = getKeywordFiles();
  const allKeywords = new Map<string, KeywordEntry>(); // dedupe by keyword string

  for (const file of files) {
    const parsed = parseKeywordFile(file);
    if (!parsed) continue;
    for (const kw of parsed.keywords) {
      if (!allKeywords.has(kw.keyword.toLowerCase())) {
        allKeywords.set(kw.keyword.toLowerCase(), kw);
      }
    }
  }

  return Array.from(allKeywords.values());
}
