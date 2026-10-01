const reply = (body, status = 200) => Response.json(body, {
  status,
  headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' },
});

export async function handleRequest(request, env, verifyFetch = fetch) {
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/$/, '');
  if (path !== '/api/contact' && path !== '/api/contact/config') return env.ASSETS.fetch(request);

  const configured = env.TURNSTILE_SITE_KEY && env.TURNSTILE_SECRET_KEY && env.CONTACT_HOSTNAMES;
  if (!configured) return reply({ error: 'Email contact is temporarily unavailable. Please try again later.' }, 503);
  if (path === '/api/contact/config') {
    if (request.method !== 'GET') return reply({ error: 'Method not allowed.' }, 405);
    return reply({ siteKey: env.TURNSTILE_SITE_KEY });
  }
  if (request.method !== 'POST') return reply({ error: 'Method not allowed.' }, 405);
  if (request.headers.get('Origin') !== url.origin) return reply({ error: 'Please use the contact page to reveal an email address.' }, 403);
  if (!request.headers.get('Content-Type')?.startsWith('application/json')) return reply({ error: 'Expected JSON.' }, 415);

  // Read a bounded stream, including requests without a Content-Length header.
  const reader = request.body?.getReader();
  if (!reader) return reply({ error: 'Choose a topic and complete verification.' }, 400);
  const chunks = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 4096) {
      await reader.cancel();
      return reply({ error: 'Request too large.' }, 413);
    }
    chunks.push(value);
  }
  let body;
  try { body = JSON.parse(await new Blob(chunks).text()); }
  catch { return reply({ error: 'Invalid request.' }, 400); }
  const addresses = new Map([
    ['support', env.CONTACT_SUPPORT_EMAIL],
    ['general', env.CONTACT_GENERAL_EMAIL],
    ['accessibility', env.CONTACT_ACCESSIBILITY_EMAIL],
  ]);
  if (!body || typeof body.token !== 'string' || !body.token.trim() || body.token.length > 2048 || !addresses.has(body.topic)) {
    return reply({ error: 'Choose a topic and complete verification.' }, 400);
  }
  const email = addresses.get(body.topic);
  if (typeof email !== 'string' || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)) {
    return reply({ error: 'This contact address is temporarily unavailable. Please try again later.' }, 503);
  }
  try {
    const response = await verifyFetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: env.TURNSTILE_SECRET_KEY, response: body.token }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error('Verification service unavailable');
    const result = await response.json();
    const hostnames = env.CONTACT_HOSTNAMES.split(',').map(host => host.trim()).filter(Boolean);
    if (result?.success !== true || result.action !== 'contact_email' || result.hostname !== url.hostname || !hostnames.includes(result.hostname)) {
      return reply({ error: 'Verification failed or expired. Please verify again.' }, 403);
    }
    return reply({ email });
  } catch {
    return reply({ error: 'Verification is temporarily unavailable. Please try again.' }, 503);
  }
}

export default {
  fetch(request, env) { return handleRequest(request, env); },
};
