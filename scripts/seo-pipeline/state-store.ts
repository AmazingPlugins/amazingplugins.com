import fs from 'fs';
import path from 'path';

export interface PostState {
  slug: string;
  title: string;
  seoKeywords: string[];
  seoCategory: string;
  gscSubmitted: boolean;
  lastUpdated: string;
}

export interface PipelineState {
  posts: Record<string, PostState>;
  lastRun: string;
  totalGenerated: number;
  totalSubmitted: number;
}

const STATE_FILE = path.join(process.cwd(), 'post-state.json');

export function loadState(): PipelineState {
  if (!fs.existsSync(STATE_FILE)) {
    return { posts: {}, lastRun: '', totalGenerated: 0, totalSubmitted: 0 };
  }
  const data = fs.readFileSync(STATE_FILE, 'utf-8');
  return JSON.parse(data);
}

export function saveState(state: PipelineState): void {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

export function updatePostState(slug: string, updates: Partial<PostState>): void {
  const state = loadState();
  state.posts[slug] = {
    ...state.posts[slug],
    slug,
    lastUpdated: new Date().toISOString(),
    ...updates,
  };
  saveState(state);
}

export function markAsSubmitted(slug: string): void {
  const state = loadState();
  if (state.posts[slug]) {
    state.posts[slug].gscSubmitted = true;
    state.posts[slug].lastUpdated = new Date().toISOString();
    state.totalSubmitted++;
    saveState(state);
  }
}

export function getPostState(slug: string): PostState | null {
  const state = loadState();
  return state.posts[slug] || null;
}

export function setLastRun(): void {
  const state = loadState();
  state.lastRun = new Date().toISOString();
  saveState(state);
}
