import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { loadSeoPipelineEnv } from '../seo-pipeline/env-bootstrap.ts';
import { RATE_LIMIT, rateLimitRule } from './policy.ts';

const ZONE_NAME = 'amazingplugins.com';
const API = 'https://api.cloudflare.com/client/v4';

interface CloudflareResult<T> {
  success: boolean;
  errors?: Array<{ message?: string }>;
  result?: T;
}

interface Zone {
  id: string;
  name: string;
}

interface Ruleset {
  id: string;
  rules?: Array<{ description?: string }>;
}

export interface ApplyResult {
  status: 'applied' | 'already-present' | 'missing-token' | 'refused';
  detail: string;
}

function authHeaders(token: string): HeadersInit {
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}

async function readJson<T>(response: Response): Promise<CloudflareResult<T>> {
  const text = await response.text();
  if (!text) return { success: response.ok };
  try {
    return JSON.parse(text) as CloudflareResult<T>;
  } catch {
    return { success: false, errors: [{ message: text.slice(0, 300) }] };
  }
}

function errorText(payload: CloudflareResult<unknown>, status: number): string {
  const message = payload.errors?.map((error) => error.message).filter(Boolean).join('; ');
  return message || `Cloudflare HTTP ${status}`;
}

export async function applyRateLimit(fetchImpl: typeof fetch = fetch): Promise<ApplyResult> {
  loadSeoPipelineEnv();
  const token = process.env.CLOUDFLARE_API_TOKEN?.trim();
  if (!token) {
    return {
      status: 'missing-token',
      detail: 'CLOUDFLARE_API_TOKEN is not set. Add a zone token with Zone Read and Zone WAF Write to .secrets/ap.env. The rule is not applied.',
    };
  }

  const zoneResponse = await fetchImpl(`${API}/zones?name=${ZONE_NAME}`, { headers: authHeaders(token) });
  const zonePayload = await readJson<Zone[]>(zoneResponse);
  if (!zoneResponse.ok || !zonePayload.success) {
    return { status: 'refused', detail: errorText(zonePayload, zoneResponse.status) };
  }
  const zone = zonePayload.result?.find((item) => item.name === ZONE_NAME);
  if (!zone) return { status: 'refused', detail: `No Cloudflare zone named ${ZONE_NAME}` };

  const entryUrl = `${API}/zones/${zone.id}/rulesets/phases/http_ratelimit/entrypoint`;
  const entryResponse = await fetchImpl(entryUrl, { headers: authHeaders(token) });
  const rule = rateLimitRule();

  if (entryResponse.status === 404) {
    const createResponse = await fetchImpl(`${API}/zones/${zone.id}/rulesets`, {
      method: 'POST',
      headers: authHeaders(token),
      body: JSON.stringify({
        name: 'AmazingPlugins crawl cap',
        kind: 'zone',
        phase: 'http_ratelimit',
        rules: [rule],
      }),
    });
    const created = await readJson<Ruleset>(createResponse);
    if (!createResponse.ok || !created.success) {
      return { status: 'refused', detail: errorText(created, createResponse.status) };
    }
    return {
      status: 'applied',
      detail: `${RATE_LIMIT.requestsPerPeriod} document requests / ${RATE_LIMIT.period}s per IP, then block for ${RATE_LIMIT.mitigationTimeout}s.`,
    };
  }

  const entryPayload = await readJson<Ruleset>(entryResponse);
  if (!entryResponse.ok || !entryPayload.success || !entryPayload.result?.id) {
    return { status: 'refused', detail: errorText(entryPayload, entryResponse.status) };
  }
  const existing = entryPayload.result.rules ?? [];
  if (existing.some((item) => item.description === RATE_LIMIT.description)) {
    return { status: 'already-present', detail: 'The crawl cap is already on the zone.' };
  }
  if (existing.length > 0) {
    return {
      status: 'refused',
      detail: 'The zone already has a rate-limit rule. Free plans allow one. This script will not replace it.',
    };
  }

  const addResponse = await fetchImpl(`${API}/zones/${zone.id}/rulesets/${entryPayload.result.id}/rules`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify(rule),
  });
  const added = await readJson<unknown>(addResponse);
  if (!addResponse.ok || !added.success) {
    return { status: 'refused', detail: errorText(added, addResponse.status) };
  }
  return {
    status: 'applied',
    detail: `${RATE_LIMIT.requestsPerPeriod} document requests / ${RATE_LIMIT.period}s per IP, then block for ${RATE_LIMIT.mitigationTimeout}s.`,
  };
}

const invokedDirectly = process.argv[1]
  && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;

if (invokedDirectly) {
  applyRateLimit().then((result) => {
    console.log(`${result.status}: ${result.detail}`);
    if (result.status === 'refused') process.exit(1);
    if (result.status === 'missing-token') process.exit(2);
  }).catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  });
}
