import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { INDEXNOW_KEY, INDEXNOW_KEY_URL, SITE_ORIGIN } from './policy.ts';
import { listArticles, listPublicPages } from './render-ai-files.ts';

export function indexNowPayload(): {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
} {
  const urls = [
    ...listPublicPages().map((page) => page.url),
    ...listArticles().map((article) => article.url),
    `${SITE_ORIGIN}/llms.txt`,
    `${SITE_ORIGIN}/llms-full.txt`,
  ];
  return {
    host: 'amazingplugins.com',
    key: INDEXNOW_KEY,
    keyLocation: INDEXNOW_KEY_URL,
    urlList: [...new Set(urls)],
  };
}

export async function submitIndexNow(fetchImpl: typeof fetch = fetch): Promise<{ ok: boolean; detail: string }> {
  const keyResponse = await fetchImpl(INDEXNOW_KEY_URL);
  const keyBody = (await keyResponse.text()).trim();
  if (!keyResponse.ok || keyBody !== INDEXNOW_KEY) {
    return {
      ok: false,
      detail: `IndexNow key is not live at ${INDEXNOW_KEY_URL} (${keyResponse.status}). Deploy first, then rerun.`,
    };
  }

  const payload = indexNowPayload();
  const response = await fetchImpl('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });
  const body = await response.text();
  if (!response.ok) {
    return { ok: false, detail: `IndexNow HTTP ${response.status}: ${body.slice(0, 300)}` };
  }
  return { ok: true, detail: `Submitted ${payload.urlList.length} URLs to IndexNow.` };
}

const invokedDirectly = process.argv[1]
  && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;

if (invokedDirectly) {
  submitIndexNow().then((result) => {
    console.log(result.detail);
    if (!result.ok) process.exit(1);
  }).catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  });
}
