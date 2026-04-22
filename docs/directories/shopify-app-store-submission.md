# Shopify App Store — Submission Draft
**Product:** Shopify Accessibility Auto-Fixer
**Date:** 2026-04-12
**Status:** Draft — not yet submitted

---

## Submission Details

**App Name:** Accessibility Auto-Fixer for Shopify
**App Type:** Public Shopify App (embedded + stand-alone)
**App URL:** https://amazingplugins.com/shopify-app/
**Support URL:** https://amazingplugins.com/support/

---

## App Store Listing

### App Tagline
Automatically fix WCAG 2.1 AA accessibility issues on your Shopify store — no code required.

### App Description

Your Shopify store needs to be accessible. The EU European Accessibility Act (EAA), ADA, and WCAG 2.1 AA standards affect you — and overlays don't cut it. Courts have rejected overlay widgets as evidence of compliance.

WooCommerce Accessibility Auto-Fixer by AmazingPlugins is the code-level solution. It scans your Shopify store and automatically fixes the most common accessibility violations at the source:

**Free fixes (always free):**
- Skip link injection
- Focus indicator visibility
- Product image alt text automation

**Pro fixes ($19/mo — all of the below):**
- Keyboard trap removal in product variants
- Checkout form label association
- Error message ARIA live regions
- Color contrast fixes for buttons and text
- Heading hierarchy normalization
- ARIA landmark role assignment

**Why code-level fixes matter:**
Overlays (AccessiBe, UserWay, AudioEye) sit on top of broken code. Courts in Murphy v. Eyebobs LLC rejected overlays as compliance evidence. This plugin fixes your actual HTML and CSS — the right way.

**Requirements:**
- Shopify store on any plan
- Storefront API access (free, setup in 2 minutes)
- WordPress 5.8+ site to run the plugin (Shopify hosts the app data; your WordPress site handles the fixer logic)

### App Category
Merchant Services → Store Management

### Pricing
- Free plan: 3 fixes (skip link, focus indicator, product alt text)
- Pro: $19/month — all 9 fixes, priority support
- Agency: $49/month — unlimited sites, white-label reports

---

## Shopify App Technical Requirements Checklist

### Security
- [x] OAuth 2.0 authentication
- [x] Webhook signature verification
- [x] Storefront API credentials stored securely (WP Options API)
- [x] Collection IDs validated with strict regex (`gid://shopify/Collection/\d+`)
- [x] No `eval()`, `shell_exec()`, `passthru()`
- [x] All database operations use `$wpdb->prepare()` or `dbDelta()`
- [x] Sanitised Shopify API responses

### Performance
- [ ] App response time < 500ms (to verify after deployment)
- [ ] Lighthouse score impact < 10% drop (to verify)
- [ ] App uses Shopify App SDK correctly

### Shopify Polaris Design System
- [ ] Admin UI uses Polaris components
- [ ] App feels native within Shopify Admin
- [ ] Accessible keyboard navigation

### Testing
- [ ] Functional testing across Shopify plans
- [ ] Integration testing with Shopify Storefront API
- [ ] Accessibility tested with Accessibility Insights, Lighthouse, WAVE
- [ ] Beta tested with target merchant audience

### App Store Assets
- [ ] App icon: 1024×1024 PNG
- [ ] App screenshots (minimum 3): 1200×800 PNG
- [ ] App banner (optional): 2560×1440 PNG
- [ ] Demo video (optional): < 60 seconds

---

## Submission Steps

1. Create Partner Dashboard account at https://partners.shopify.com/
2. Create new app → select "Public app"
3. Configure App Store listing info (tagline, description, category, pricing)
4. Upload assets (icon, screenshots)
5. Set up app in test store
6. Complete functional testing checklist
7. Submit for Shopify review (review typically 5-7 business days)
8. Address any review feedback

---

## Notes

- Shopify App Store requires an active Partner Dashboard account ($0 to join)
- Apps go through Shopify's review team before listing
- Need to set up billing via Partner Dashboard for paid plans (Stripe integration)
- After approval, app updates go through Partner Dashboard → App Releases
