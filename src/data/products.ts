// Sister products from https://binarylabssoft.com/products.
// AmazingPlugins is intentionally excluded from this collection.
export const products = [
  {
    logo: '/images/products/cloudploy.svg',
    id: 'cloudploy', name: 'CloudPloy', category: 'Cloud & AI',
    domain: 'cloudploy.com', status: 'Waitlist open',
    headline: 'Deploy from the tools you already use.',
    description: 'Connect your AI coding tools to your cloud. Deploy apps from Claude Code, Cursor, or any MCP client, on infrastructure you control.',
  },
  {
    logo: '/images/products/skaleagents.svg',
    id: 'skaleagents', name: 'SkaleAgents', category: 'Cloud & AI',
    domain: 'skaleagents.com', status: '',
    headline: 'Another set of eyes on your infrastructure.',
    description: 'Specialist AI agents for code and infrastructure reviews. Reuse prompts and bring findings into your editor through MCP.',
  },
  {
    logo: '/images/products/crontinel.png',
    id: 'crontinel', name: 'Crontinel', category: 'Developer tools',
    domain: 'crontinel.com', status: '',
    headline: 'Catch the failures an uptime check misses.',
    description: 'Monitor scheduled jobs, queues, workers, and AI agent runs with open-source SDKs and a hosted dashboard.',
  },
  {
    logo: '/images/products/toolblip.svg',
    id: 'toolblip', name: 'Toolblip', category: 'Developer tools',
    domain: 'toolblip.com', status: '',
    headline: 'Everyday tools, one browser tab away.',
    description: 'Format JSON, convert files, and work with text using free browser-based tools. Pick the tool you need and get started without signing up.',
  },
  {
    logo: '/images/products/appnary.png',
    id: 'appnary', name: 'Appnary', category: 'Commerce',
    domain: 'appnary.com', status: 'Coming soon',
    headline: 'Practical apps for Shopify merchants.',
    description: 'Starting with Pixel Tracker: connect Facebook, Google, TikTok, and other tracking pixels from one Shopify dashboard.',
  },
  {
    logo: '/images/products/harun.svg',
    id: 'harun', name: 'harun.dev', category: 'More from us',
    domain: 'harun.dev', status: '',
    headline: 'Meet the engineer behind the work.',
    description: 'Harun R. Rayhan’s home for engineering notes, cloud architecture, and DevOps consulting. Read about the work or get in touch.',
  },
] as const;

export const productCategories = [...new Set(products.map(product => product.category))];
