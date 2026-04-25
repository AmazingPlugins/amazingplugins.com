# amazingplugins.com

Marketing site for AmazingPlugins — accessibility compliance tools for WooCommerce and Shopify.

**Stack:** Astro 6 · Cloudflare Pages · CI/CD via GitHub Actions  
**URL:** https://amazingplugins.com

---

## Quick Start

```bash
# Clone
git clone https://github.com/AmazingPlugins/amazingplugins.com.git
cd amazingplugins.com

# Install dependencies
npm install

# Local development
npm run dev

# Production build
npm run build

# Preview build locally
npm run preview
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/plugins` | All plugins listing |
| `/plugins/woocommerce-accessibility-fixer` | WooCommerce plugin details |
| `/plugins/shopify-accessibility-fixer` | Shopify plugin details |
| `/pricing` | Pricing page |
| `/faq` | FAQ |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |
| `/blog` | Blog |

## Project Structure

```
src/
├── pages/           → Astro pages (file-based routing)
├── components/     → Reusable UI components
├── layouts/         → Page layouts
├── styles/          → Global CSS
└── content/         → Blog posts
```

## Deployment

Deployed automatically via GitHub Actions on push to `main`.

1. Merge to `main` → GitHub Actions builds → Deploys to Cloudflare Pages
2. Cloudflare Pages → Settings → Domain Management → Add `amazingplugins.com`

**Required Cloudflare token** (stored in repo secrets):
- `CLOUDFLARE_API_TOKEN` — User API token with Pages edit permission

## Tech Stack

- **Framework:** Astro 6
- **Hosting:** Cloudflare Pages
- **CI/CD:** GitHub Actions
- **Fonts:** Google Fonts (Inter)
- **Icons:** Inline SVGs

## Related Projects

| Project | Description |
|---------|-------------|
| [app.amazingplugins.com](https://github.com/AmazingPlugins/app.amazingplugins.com) | Laravel + React backend / dashboard |
| [shopify-accessibility-fixer](https://github.com/AmazingPlugins/shopify-accessibility-fixer) | Shopify app (embedded in Shopify Admin) |
| [woocommerce-accessibility-fixer](https://github.com/AmazingPlugins/woocommerce-accessibility-fixer) | WordPress plugin |
