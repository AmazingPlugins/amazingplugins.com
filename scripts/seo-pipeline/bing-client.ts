import { loadSeoPipelineEnv } from './env-bootstrap';

type BingJson = Record<string, any>;

export interface BingSite {
  Url: string;
  IsVerified: boolean;
  AuthenticationCode?: string;
  DnsVerificationCode?: string;
}

export interface BingRankAndTrafficStat {
  Date: string;
  Clicks: number;
  Impressions: number;
}

export interface BingUrlSubmissionQuota {
  DailyQuota: number;
  MonthlyQuota: number;
}

const BING_API_BASE = 'https://ssl.bing.com/webmaster/api.svc/json';

function getApiKey(): string {
  loadSeoPipelineEnv();

  const apiKey = process.env.BING_WEBMASTER_API_KEY?.trim();
  if (!apiKey) {
    throw new Error('BING_WEBMASTER_API_KEY environment variable not set');
  }
  return apiKey;
}

function buildUrl(method: string, query: Record<string, string> = {}): string {
  const url = new URL(`${BING_API_BASE}/${method}`);
  url.searchParams.set('apikey', getApiKey());
  for (const [key, value] of Object.entries(query)) {
    url.searchParams.set(key, value);
  }
  return url.toString();
}

async function requestJson<T>(method: string, query: Record<string, string> = {}, body?: unknown): Promise<T> {
  const res = await fetch(buildUrl(method, query), {
    method: body ? 'POST' : 'GET',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Bing API ${method} failed (${res.status}): ${text}`);
  }

  return JSON.parse(text) as T;
}

function unwrap<T>(payload: any): T {
  if (payload && typeof payload === 'object' && 'd' in payload) {
    return payload.d as T;
  }
  return payload as T;
}

export async function getUserSites(): Promise<BingSite[]> {
  const payload = await requestJson<{ d: BingSite[] }>('GetUserSites');
  return unwrap<BingSite[]>(payload) || [];
}

export async function submitFeed(siteUrl: string, feedUrl: string): Promise<void> {
  await requestJson('SubmitFeed', {}, { siteUrl, feedUrl });
}

export async function submitUrlBatch(siteUrl: string, urlList: string[]): Promise<void> {
  await requestJson('SubmitUrlBatch', {}, { siteUrl, urlList });
}

export async function getRankAndTrafficStats(siteUrl: string): Promise<BingRankAndTrafficStat[]> {
  const payload = await requestJson<{ d: BingRankAndTrafficStat[] }>('GetRankAndTrafficStats', { siteUrl });
  return unwrap<BingRankAndTrafficStat[]>(payload) || [];
}

export async function getUrlSubmissionQuota(siteUrl: string): Promise<BingUrlSubmissionQuota | null> {
  const payload = await requestJson<{ d: BingUrlSubmissionQuota }>('GetUrlSubmissionQuota', { siteUrl });
  return unwrap<BingUrlSubmissionQuota>(payload) || null;
}
