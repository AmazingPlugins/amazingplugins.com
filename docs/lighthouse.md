# Lighthouse checks

Target: at least 99 in Performance, Accessibility, Best Practices, and SEO on mobile and desktop.

## Run the audits

```bash
npm run build
npm run preview -- --host 127.0.0.1 --port 4321
```

In another terminal:

```bash
node scripts/lighthouse-audit.mjs http://127.0.0.1:4321 .lighthouse/local
node scripts/lighthouse-audit.mjs https://amazingplugins.com .lighthouse/production
```

The runner pins Lighthouse 13.5.0 and uses its standard mobile and desktop presets. Runs are sequential, with fresh Chrome profiles. It saves full JSON reports and a summary. An optional third argument limits pages, for example `home,shipping`.

The six pages are the homepage, catalog, Accessibility Fixer, Shipping Rules Tester, FAQ, and shipping test article. Production scores need a separate check after deployment: local preview doesn't include Cloudflare's injected scripts or real network latency. Avoid builds and other browser work during performance runs.

## Production baseline

Measured September 25, 2026, before these changes. Numbers are Performance / Accessibility / Best Practices / SEO.

- Homepage: mobile **62 / 90 / 77 / 100**; desktop **90 / 90 / 77 / 100**.
- Catalog: mobile **65 / 94 / 77 / 100**; desktop **97 / 94 / 77 / 100**.
- Accessibility Fixer: mobile **64 / 94 / 77 / 100**; desktop **97 / 94 / 77 / 100**.
- Shipping Rules Tester: mobile **65 / 95 / 77 / 100**; desktop **72 / 95 / 77 / 100**.
- FAQ: mobile **65 / 94 / 77 / 100**; desktop **94 / 94 / 77 / 100**.
- Shipping article: mobile **69 / 91 / 77 / 100**; desktop **95 / 91 / 77 / 100**.

An earlier homepage mobile run scored 55 for Performance and reported a slow-CPU warning. Use repeated runs to judge performance stability.

## Local verification

Every tested page reached 99 for mobile Performance and 100 for the other three categories. Desktop scored 100 in all four categories. Repeat runs weren't consistently above 99: mobile Performance ranged from 84 to 99, with variable layout/main-thread timings. The CPU benchmark also varied substantially. These are local results, not proof of production scores.

Reports are saved in the gitignored `.lighthouse/` directory. `baseline/` contains production before these changes. `verified/` and `verified-repeat/` contain the final local runs, including the low scores.

The production build and existing SEO checks passed. Browser checks covered all six pages at 320, 390, 768, and 1440 pixels in light and dark themes, with no horizontal overflow. Axe found no violations in either theme after transitions settled. Keyboard theme selection, mobile navigation, FAQ disclosures, badge loading, and reduced-motion behavior passed. A separate browser check confirmed a worker-based GA4 `page_view` received HTTP 204.

The owner approved deployment and production verification on September 25, 2026. Production results are pending.

## What changed

Fonts are served locally, with smaller Latin subsets and preloads for the main text faces. Critical styles are inlined. The page no longer fades in from invisible on each navigation. Google Analytics runs through Partytown in a worker.

Footer badge artwork is served locally and lazy-loaded. Directory links stay intact. This removes badge requests that set third-party cookies. The badge slider only animates while visible, and stops for reduced motion or a hidden tab.

The slider's duplicate is created on first view. Creating it during page startup caused Chrome to fetch offscreen badges despite their lazy-loading attributes. The shipping hero now has responsive image sizes, and the favicon uses a real 32-pixel image.

Theme controls have valid ARIA and keyboard menu controls. Footer headings use `h2`. Accent text and buttons have readable contrast in both themes. The mobile menu's scoped display rule now overrides its desktop default.

## Refresh bundled assets

```bash
node scripts/prepare-badges.mjs
node scripts/prepare-images.mjs
python -m pip install 'fonttools[woff]'
python scripts/prepare-fonts.py
```

Run Python tooling in a virtual environment. Font sources are versioned in the script; their OFL licenses ship in `public/fonts/`. Badge source URLs are in `src/data/footer-badges.mjs`. Asset refreshes are manual, so builds don't depend on those external hosts.
