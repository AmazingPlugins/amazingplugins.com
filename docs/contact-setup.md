# Contact email protection

The About and Contact pages are static Astro pages. The blog keeps its existing article URLs. Email disclosure runs in a Cloudflare Pages Worker, copied to `dist/client/_worker.js` by `npm run build`. The Pages `_routes.json` limits Worker execution to the contact API. Other pages remain static.

## Runtime configuration

Set these bindings in the Cloudflare Pages project's production and preview environments. Store secret values through the Cloudflare dashboard or the existing secret-management tooling, never in repository files or shell history.

| Binding | Purpose |
| --- | --- |
| `TURNSTILE_SITE_KEY` | Public key for the contact widget |
| `TURNSTILE_SECRET_KEY` | Secret used for Siteverify |
| `CONTACT_HOSTNAMES` | Comma-separated exact hostnames allowed to reveal email; no schemes or paths |
| `CONTACT_SUPPORT_EMAIL` | Existing plugin support address |
| `CONTACT_GENERAL_EMAIL` | Existing general/privacy address |
| `CONTACT_ACCESSIBILITY_EMAIL` | Existing accessibility address |

Configure a managed Turnstile widget for the same exact hostnames. The action is `contact_email`. The server requires the returned hostname to match both the request hostname and the allowlist. Do not allow arbitrary Pages preview hosts in production. Use a separately configured preview hostname/widget when preview verification is needed.

No credentials or addresses are baked into the static build. `/api/contact/config/` returns only the public site key. `/api/contact/` accepts a same-origin JSON POST containing `topic` and a Turnstile `token`; only a successful Siteverify response with the correct hostname/action reveals the selected address. Responses are not cached. Invalid configuration and verification failures return errors without an email fallback.

## Local checks

```sh
npm ci
npm run test:contact
npm run build
npx wrangler pages dev "$PWD/dist/client" --port 8788 --compatibility-date=2026-04-21 --cwd /private/tmp
```

Pass an absolute asset directory to Wrangler when changing its working directory. Running outside this repository avoids loading the existing Astro Workers config as a Pages config. With no runtime bindings, Contact deliberately shows its unavailable state. Use Cloudflare's official test keys and synthetic addresses for an isolated integration test; inject them into the process at runtime rather than writing secret files here.

The test suite covers endpoint success, rejected/expired/reused tokens, mismatched hostnames/actions, cross-origin requests, malformed and oversized bodies, missing configuration, upstream failure, and static asset forwarding. Test keys and mocked verification do not establish production readiness.

## Before release

1. Set all bindings and verify the Turnstile domain settings.
2. Run the production build and contact tests. Inspect public output for exposed addresses.
3. Deploy the full `dist/client` directory, including `_worker.js` and `_routes.json`. The existing Pages upload workflow does this; it now runs contact tests first.
4. On the canonical domain, verify a real challenge, email disclosure for all three topics, rejection of an unverified POST, navigation, and mobile layout.

Turnstile reduces automated harvesting. It cannot stop someone who passes verification from copying an address or remove addresses from old crawls. Public forum links provide an alternative if the challenge cannot be used; those links should never solicit private information.

Implementation references: [Turnstile server verification](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/) and [Pages advanced mode](https://developers.cloudflare.com/pages/functions/advanced-mode/).
