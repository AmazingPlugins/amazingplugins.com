# Directory Submissions — Indexing Notes
**Last Updated:** 2026-04-21

---

## Directory Submission Status

| Directory | Status | Submitted | Live | Notes |
|-----------|--------|-----------|------|-------|
| WordPress.org | Draft | No | Yes | GitHub repo is public: github.com/AmazingPlugins/woocommerce-accessibility-fixer |
| Shopify App Store | Draft | No | TBD | Needs Partner Dashboard app created |
| AlternativeTo | Draft | No | TBD | Free to list, auto-approve |
| WebAIM Resources | Draft | No | TBD | High-priority, trusted directory |
| Accessibility.com Vendor | Draft | No | No | Site not yet live (2026-04-14 check) |
| G2.com | Draft | No | TBD | Free listing available; product submission at g2.com/products/new |
| Knowbility | Not started | No | TBD | Respected nonprofit; no public vendor form found |
| A11yProject | Not started | No | TBD | Community resource; no formal plugin listing found |

---

## Indexing / Search Console Notes

### amazingplugins.com
- **Domain registered:** TBD (check with Rayass)
- **Google Search Console:** TBD
- **Sitemap:** TBD — needs /wp-sitemap.xml or custom sitemap
- **robots.txt:** TBD
- **Indexing status:** Site not accessible as of 2026-04-14 (fetch returned error)
- **GitHub:** Public repo confirmed — https://github.com/AmazingPlugins/woocommerce-accessibility-fixer

### Key pages to index (when live):
1. https://amazingplugins.com/ (home)
2. https://amazingplugins.com/woocommerce-accessibility-fixer/
3. https://amazingplugins.com/shopify-accessibility-fixer/
4. https://amazingplugins.com/pricing/
5. https://amazingplugins.com/blog/ (when SEO blog is live)

### Pre-launch SEO checklist:
- [ ] Set up Google Search Console
- [ ] Submit XML sitemap to Search Console
- [ ] Verify all pages are crawlable (no robots.txt blocks)
- [ ] Submit to Bing Webmaster Tools
- [ ] Set up Google Analytics 4
- [ ] Configure structured data (Product schema) on pricing pages
- [ ] Set up canonical URLs

---

## Technical Notes

### Domain / Hosting
- **Domain:** amazingplugins.com
- **Hosting:** TBD — WordPress.com? Cloudflare Pages? Self-hosted?
- **SSL:** Required (always-on HTTPS)

### WordPress.org SVN
- **Repo URL:** https://plugins.svn.wordpress.org/woocommerce-accessibility-fixer/
- **Setup:** Create trunk/, tags/, assets/ directories
- **Sync:** GitHub Actions → SVN on version tags

### GitHub → WordPress.org Sync (recommended)
Use `grunt-wp-deploy` or GitHub Actions workflow:
- Trigger on version tag push
- Build production asset files
- Commit to SVN trunk
- Tag in SVN

---

## Next Steps (Priority Order)

1. **Site must go live first** — amazingplugins.com not accessible (2026-04-14)
2. **WordPress.org** — GitHub repo is public ✓; set up SVN trunk at WordPress.org (blocking: site needs to be live)
3. **Shopify Partner Dashboard** — https://partners.shopify.com/
4. **AlternativeTo** — auto-approve, free; can submit once site is live
5. **Accessibility.com Vendor Directory** — new draft added; submit at vendors.accessibility.com/add-listing/vendor/
6. **WebAIM resources** — submit at webaim.org/resources/ (blocking: site needs to be live)
7. **Set up Google Search Console** for amazingplugins.com

---

## 2026-04-21 Night #6/? — Directory Submissions
- **Task:** Directory submissions
- **awesome-shopify PR submitted:** https://github.com/LeCoupa/awesome-shopify/pull/3 — Added AmazingPlugins Shopify Accessibility Fixer under `Shopify apps > Useful tools`. GitHub-based listing, no live site required.
- **WordPress.org:** Not yet listed (submission ~April 11 in review queue, 2-4 week typical). GitHub repo public ✓, readme.txt properly formatted ✓.
- **Site status:** amazingplugins.com still returns HTTP 000 (connection error). All directory submissions requiring a live site remain blocked.
- **Remaining blocked:** AlternativeTo, G2, WebAIM, Accessibility.com, Shopify App Store, Product Hunt — all require live site.
- **Action items once site goes live:** (1) Submit to AlternativeTo, (2) Submit to G2, (3) Submit to Product Hunt, (4) Monitor WordPress.org approval, (5) Submit PR to lukecav/awesome-woocommerce if WooCommerce repo goes public.

## 2026-04-20 Night #5/? — Off-page SEO / Backlink Outreach
- **Task:** Off-page SEO — contextual backlink opportunities
- **Guest post target #4:** Smashing Magazine (smashingmagazine.com) — high-DA (~90) dev blog, strong accessibility coverage. Draft pitch saved to outreach/smashingmagazine-pitch.md. Proposed article: "Why WooCommerce Stores Fail WCAG 2.1 AA (And How to Fix the Real Problems)" — code-forward, genuinely helpful, one AmazingPlugins mention in bio only.
- **Prior guest post pitches (3 total):** A11Y Project (night #1), Ecommerce Root (night #2), CSS-Tricks (night #3) — all drafts complete in outreach/.
- **New directory identified:** SaaSHub (saashub.com) — software alternative/discovery platform with web accessibility category. Draft submission saved to directories/saashub-submission.md. Free to list; goes through approval.
- **Site status:** amazingplugins.com still returns connection error (HTTP 000). All directory submissions requiring a live site remain blocked. This is the critical blocker.
- **Action items once site goes live:** (1) Submit to SaaSHub, (2) Submit to AlternativeTo (auto-approve), (3) Submit PR to LeCoupa/awesome-shopify (GitHub repo already public), (4) Submit to Product Hunt, (5) Submit WordPress.org plugin (1-2 week review).

## 2026-04-19 Night #4/4 — Directory Submissions + Indexing Check
- **Site status:** amazingplugins.com still not accessible (fetch returns connection error). All major directory submissions requiring a live site remain blocked.
- **WordPress.org check:** Searched wordpress.org/plugins for "amazingplugins" and "woocommerce-accessibility-fixer" — AmazingPlugins WooCommerce Accessibility Fixer is NOT yet listed. The submission from ~April 11 (per docs/wordpress-org-plugin-submission.md) has not been approved or may not have been successfully submitted.
- **New directories identified:**
  - `LeCoupa/awesome-shopify` (GitHub awesome list) — PR draft saved to directories/awesome-shopify-pr.md. Shopify Accessibility Fixer GitHub repo (github.com/AmazingPlugins/shopify-accessibility-fixer) is public and eligible for submission.
  - `friends-of-shopify/Awesome-Shopify` (GitHub awesome list) — Developer-focused, no app section; not a good fit.
  - Product Hunt — Draft submission saved to directories/producthunt-submission.md. Submit at producthunt.com/posts/new once site is live.
  - lukecav/awesome-woocommerce — WooCommerce plugin GitHub repo not yet public; draft PR not created yet.
- **Site remains the critical blocker** for: AlternativeTo, G2, WebAIM, Accessibility.com, Shopify App Store, WordPress.org, Product Hunt.
- **Action items once site goes live:** (1) Submit PR to LeCoupa/awesome-shopify, (2) Submit to Product Hunt, (3) Submit to AlternativeTo (auto-approve), (4) Submit WordPress.org plugin (1-2 week review), (5) Submit to G2.

## 2026-04-17 Night #3/4 — Off-page SEO
- **Guest post pitch:** CSS-Tricks (css-tricks.com) — high-DA (~90) web development blog covering accessibility extensively. Draft saved to outreach/csstricks-pitch.md. Proposed article: "10 Common Accessibility Issues on E-Commerce Sites (And What Actually Fixes Them)" — genuinely helpful, code-forward, not promotional. CSS-Tricks accepts contributions via their contact form.
- **Prior guest post targets:** A11Y Project (a11yproject-pitch.md, night #1/4), Ecommerce Root (ecommerceroot-pitch.md, night #2/4).
- **Directory status:** Site still not accessible (amazingplugins.com). All directory submissions requiring live site remain blocked.
- **Actionable once live:** AlternativeTo (auto-approve, free) → G2 → WebAIM resources → WordPress.org (1-2 week review)
- **Recommendation:** Site launch is the critical blocker. Focus on getting amazingplugins.com live.

## 2026-04-16 Night #4/4 — Directory Submissions
- **Status:** Site still not accessible (amazingplugins.com fetch returned connection error). All directory submissions requiring a live site remain blocked.
- **New directory identified:** G2.com (g2.com/categories/website-accessibility-plugins) — free basic listing available, products submitted at g2.com/products/new. Draft saved to directories/g2-submission.md.
- **G2 listing priority:** High — G2 has strong B2B SEO presence and a dedicated Website Accessibility Plugins category.
- **Existing drafts reviewed:** All directory drafts (WordPress.org, Shopify App Store, AlternativeTo, Capterra, Accessibility.com, accessibility-directories) are complete but blocked by live site requirement.
- **Recommendation:** Site launch is the critical blocker for all major directories. Once live: (1) Submit to AlternativeTo immediately (auto-approve, free), (2) Submit to G2, (3) Submit to WebAIM resources, (4) Submit WordPress.org plugin (1-2 week review).

## 2026-04-15 Night #2/4 — Off-page SEO
- **Guest post pitch:** ecommerceroot.com (ecommerceroot.com/write-us/) — accepts e-commerce guest posts, topics include "Ecommerce Solution" and "Ecommerce Design & development". Draft saved to outreach/ecommerceroot-pitch.md.
- **Directory status:** Site still not live (amazingplugins.com fetch returned error). All directory submissions requiring live site remain blocked. AlternativeTo is the best candidate for pre-live submission.
- **Recommendation:** Once site is live, submit to: AlternativeTo (auto-approve), vendors.accessibility.com (vendor directory), WebAIM resources (high-DA, trusted).

## 2026-04-21 Night #7/? — Off-page SEO / Backlink Outreach
- **Guest post pitch #5:** Ecommerce Fastlane (ecommercefastlane.com) — Shopify/WooCommerce-focused blog with WooCommerce category, accepts guest contributions. Pitch saved to outreach/ecommercefastlane-pitch.md. Proposed article: "Why WooCommerce Stores Are Getting ADA Demand Letters — And Why Overlays Won't Save You" — genuinely helpful, code-literate, not promotional.
- **Prior guest post targets (4 total):** A11Y Project (night #1), Ecommerce Root (night #2), CSS-Tricks (night #3), Smashing Magazine (night #5).
- **Directory submission:** PR submitted to lukecav/awesome-woocommerce — https://github.com/lukecav/awesome-woocommerce/pull/9 — Adds AmazingPlugins WooCommerce Accessibility Fixer to a new Accessibility section. GitHub-based listing, no live site required.
- **Site status:** amazingplugins.com still returns HTTP 522 (origin server unreachable). All directory submissions requiring a live site remain blocked.
- **WooCommerce repo status:** github.com/AmazingPlugins/woocommerce-accessibility-fixer is now public (HTTP 200) — enables GitHub-based listings.
- **Action items once site goes live:** (1) Submit to AlternativeTo (auto-approve, free), (2) Submit to SaaSHub (draft in directories/saashub-submission.md), (3) Monitor lukecav/awesome-woocommerce PR #9, (4) Submit WordPress.org plugin (in review since ~April 11, 2-4 week typical).
