# Shopify App Store Submission Requirements

**Product:** AmazingPlugins WooCommerce Accessibility Fixer (Shopify App)
**Status:** Frontend not built — need to build before submission
**Last updated:** 2026-04-13

---

## Submission Process Overview

1. Build Shopify App Bridge React frontend (frontend/ is currently empty)
2. Set up Shopify Partner account + Partner Dashboard
3. Configure app in Partner Dashboard (app name, icon, URLs)
4. Subscribe to compliance webhooks
5. Implement OAuth authentication (required before any other step)
6. Build and test billing integration (Shopify Billing API)
7. Run automated checks in Partner Dashboard
8. Submit for review (2-4 weeks typical)
9. Respond to reviewer feedback if rejected

---

## Key Technical Requirements

### 1. App Icon
- **Size:** 1200 x 1200 pixels
- **Format:** JPEG or PNG
- **Style:** Bold colors, simple recognizable patterns, no text, no screenshots, no Shopify trademarks
- **Corners:** Square (Shopify rounds them automatically)
- **Padding:** Include padding so logo doesn't touch edges

### 2. App URLs
- **Must NOT include:** "Shopify" or any misspelling/abbreviation
- **App URL:** Where the app lives (must be HTTPS)
- **Redirect URLs:** OAuth callback URLs

### 3. Compliance Webhooks
All Shopify App Store apps must subscribe to these compliance webhooks:
- `customers/data_request`
- `customers/redact`
- `shop/redact`

These are mandatory per Shopify's Partner Program Agreement for apps in the App Store.

### 4. OAuth Authentication
- App must authenticate via OAuth before any other steps
- Must work even if merchant previously installed and uninstalled
- No pop-up windows for OAuth (use redirects instead — pop-up blockers interfere)

### 5. Access Scopes
Request only necessary access scopes. For the accessibility fixer:
- `read_products` — to scan products for accessibility issues
- `write_script_tags` — to inject accessibility fixes
- `read_themes` — to access theme files for fixes
- `write_themes` — to modify theme files (if auto-fix mode)

### 6. Billing (Shopify Billing API)
- Must bill through Shopify's Billing API (cannot use external payment for in-app charges)
- Must support upgrade/downgrade without reinstall
- Must handle failed charges gracefully
- Need to set up at least one pricing plan (Free + Pro recommended)

### 7. Performance Requirements
- App must not reduce Lighthouse performance score by more than 10 points
- Shopify tests on: Home (17%), Product details (40%), Collection (43%)
- Test before and after app installation

### 8. Functionality Requirements
- App must function correctly (obvious, but automated tests check this)
- App must not break existing Shopify functionality
- Uninstall must clean up properly (remove script tags, restore modified files)

---

## App Listing Requirements

### App Name
- Unique, starts with brand name (not a generic descriptor)
- Example: "AmazingPlugins - WooCommerce Accessibility Fixer" (not "Accessibility Fixer - AmazingPlugins")
- Max 30 characters
- Must match in TOML config and App Store listing

### Feature Media (Video + Images)
- **Video:** 2-3 minutes, promotional not instructional, max 25% screencast
- **Feature images:** 1600x900px, 16:9, simple with one focal point, solid backgrounds with good contrast (4.5:1), include alt text, no Shopify logos
- Download templates: https://www.shopify.com/zip/SubmissionTemplates.zip

### Screenshots
- **Size:** 1600x900px (16:9)
- **Count:** 3-6 desktop screenshots
- At least one must show the app's actual UI
- Crop out browser chrome and sensitive info
- Provide alt text
- No pricing, reviews, or outcome guarantees
- Include mobile screenshots if responsive

### Demo Store URL
- Link to a development store that showcases the app
- Link directly to the page that best demonstrates functionality
- Include contextual instructions for reviewers

### App Introduction (100 characters max)
- Clearly highlight merchant benefits
- Tie unique offering to measurable business outcomes
- No keyword stuffing, no data claims, no incomplete sentences

### App Details (500 characters max)
- Describe functional elements and uniqueness
- No excessive marketing language
- Keep support info, links, testimonials in designated fields

### Feature List
- Up to 6 features
- Max 80 characters per feature
- Describe what merchants care about, not how it's built
- Be specific and concrete

---

## Automated Checks (Must Pass Before Submission)

These run in the Partner Dashboard before you can submit:

1. **App build verification** — app must be a valid build that loads
2. **OAuth flow** — authentication must work correctly
3. **Webhook subscription** — compliance webhooks must be subscribed
4. **Billing verification** — billing API must work (if paid app)
5. **Lighthouse performance** — score impact must be < 10 points
6. **Security扫描** — basic security checks on the app

---

## Common Rejection Reasons

1. **Pop-up windows used for OAuth** — use redirect instead
2. **Missing compliance webhooks** — must subscribe to all 3
3. **Billing not through Shopify API** — all in-app charges must use Shopify Billing
4. **Performance impact too high** — app slows store significantly
5. **App icon has text or Shopify trademarks**
6. **App name includes "Shopify"**
7. **Missing or incomplete screenshots**
8. **Unclear value proposition in app introduction**
9. **Requesting too many access scopes**
10. **No free trial or unclear pricing**

---

## Review Timeline

- **Typical:** 2-4 weeks for first submission
- **If rejected:** Resubmission adds another 1-2 weeks
- **If suspended:** Cannot resubmit until suspension period expires

Shopify reviews during business hours (US time). Expedited review is not available for most apps.

---

## What Needs to Be Built (Frontend)

The `plugins/shopify-accessibility-fixer/frontend/` directory is currently empty. Needs:

1. **React app with Shopify App Bridge** — embeds in Shopify admin
2. **Dashboard UI** — shows scan results, fixed issues, usage stats
3. **Settings page** — configure auto-fix vs scan-only, notification preferences
4. **Billing integration** — Shopify Billing API for plan management
5. **Installation/OAuth flow** — handles Shopify OAuth redirect
6. **Script tag management** — injects accessibility fix scripts into storefront

---

## Resources

- [Shopify Dev Docs: Submit app for review](https://shopify.dev/docs/apps/launch/app-store-review/submit-app-for-review)
- [Shopify Dev Docs: App Store requirements](https://shopify.dev/docs/apps/launch/shopify-app-store/app-store-requirements)
- [App Design Guidelines](https://shopify.dev/docs/apps/design)
- [Shopify Billing API](https://shopify.dev/docs/apps/billing)
- [App Bridge React](https://shopify.dev/docs/api/app-bridge)
