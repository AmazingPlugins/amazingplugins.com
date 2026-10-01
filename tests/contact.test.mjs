import { test } from 'node:test';
import assert from 'node:assert/strict';
import { handleRequest } from '../server/contact-worker.js';
const worker = { fetch: handleRequest };

const env = {
  TURNSTILE_SITE_KEY: 'test-site-key', TURNSTILE_SECRET_KEY: 'test-only-secret',
  CONTACT_HOSTNAMES: 'amazingplugins.com,localhost',
  CONTACT_SUPPORT_EMAIL: 'support@example.test', CONTACT_GENERAL_EMAIL: 'general@example.test',
  CONTACT_ACCESSIBILITY_EMAIL: 'accessibility@example.test',
  ASSETS: { fetch: async () => new Response('static asset') },
};
const request = (body = { token: 'valid-token', topic: 'support' }, options = {}) => new Request('https://amazingplugins.com/api/contact/', {
  method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'https://amazingplugins.com', ...options.headers },
  body: JSON.stringify(body),
});
const valid = { success: true, hostname: 'amazingplugins.com', action: 'contact_email' };
async function respond(req, bindings = env, verification = valid) {
  return worker.fetch(req, bindings, async () => Response.json(verification));
}
test('serves existing static pages', async () => {
  assert.equal(await (await respond(new Request('https://amazingplugins.com/about/'))).text(), 'static asset');
});
test('public config returns only site key and never addresses', async () => {
  const response = await respond(new Request('https://amazingplugins.com/api/contact/config/'));
  assert.deepEqual(await response.json(), { siteKey: env.TURNSTILE_SITE_KEY });
  assert.equal(response.headers.get('Cache-Control'), 'no-store');
});
test('reveals only selected address after successful verification', async () => {
  for (const topic of ['support', 'general', 'accessibility']) {
    const response = await respond(request({ token: 'valid-token', topic }));
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { email: env[`CONTACT_${topic.toUpperCase()}_EMAIL`] });
    assert.equal(response.headers.get('Cache-Control'), 'no-store');
  }
});
test('rejects invalid, expired, reused, wrong-host and wrong-action tokens without an address', async () => {
  for (const result of [{ success: false }, { success: false, 'error-codes': ['timeout-or-duplicate'] }, { ...valid, hostname: 'evil.test' }, { ...valid, action: 'other' }, null]) {
    const response = await respond(request(), env, result);
    assert.equal(response.status, 403);
    assert.ok(!(await response.text()).includes('@'));
  }
});
test('rejects bad input and cross-origin requests before contacting verification service', async () => {
  for (const req of [request({}), request({ token: '', topic: 'support' }), request({ token: 'x'.repeat(2049), topic: 'support' }), request({ token: 'x', topic: '__proto__' }), request(undefined, { headers: { Origin: 'https://evil.test' } })]) {
    const response = await worker.fetch(req, env, () => { throw new Error('must not verify'); });
    assert.ok([400, 403].includes(response.status));
    assert.ok(!(await response.text()).includes('@'));
  }
});
test('GET cannot reveal email', async () => {
  assert.equal((await respond(new Request('https://amazingplugins.com/api/contact/'))).status, 405);
});
test('fails closed when config is missing or verification service fails', async () => {
  assert.equal((await respond(request(), { ...env, TURNSTILE_SECRET_KEY: '' })).status, 503);
  assert.equal((await worker.fetch(request(), env, async () => { throw new Error('network failure'); })).status, 503);
  assert.equal((await worker.fetch(request(), env, async () => new Response('down', { status: 500 }))).status, 503);
});
test('rejects oversized and malformed bodies', async () => {
  const oversized = request({ token: 'x'.repeat(5000), topic: 'support' });
  assert.equal((await respond(oversized)).status, 413);
  const malformed = new Request('https://amazingplugins.com/api/contact/', { method: 'POST', headers: { Origin: 'https://amazingplugins.com', 'Content-Type': 'application/json' }, body: '{' });
  assert.equal((await respond(malformed)).status, 400);
});
test('verification request goes only to Siteverify and carries the submitted token', async () => {
  const response = await worker.fetch(request(), env, async (url, options) => {
    assert.equal(url, 'https://challenges.cloudflare.com/turnstile/v0/siteverify');
    assert.equal(options.method, 'POST');
    assert.deepEqual(JSON.parse(options.body), { secret: env.TURNSTILE_SECRET_KEY, response: 'valid-token' });
    return Response.json(valid);
  });
  assert.equal(response.status, 200);
});
test('rejects a valid token whose hostname differs from the request even when allowlisted', async () => {
  assert.equal((await respond(request(), env, { ...valid, hostname: 'localhost' })).status, 403);
});
test('missing selected address never reveals another topic address', async () => {
  const response = await respond(request(), { ...env, CONTACT_SUPPORT_EMAIL: '' });
  assert.equal(response.status, 503);
  assert.ok(!(await response.text()).includes('@'));
});
