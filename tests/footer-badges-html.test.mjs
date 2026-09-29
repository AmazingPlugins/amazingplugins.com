import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const html = await readFile(new URL('../dist/client/index.html', import.meta.url), 'utf8');
const footerHtml = html.match(/<footer-logo-slider\b[^>]*>([\s\S]*?)<\/footer-logo-slider>/i)?.[1] ?? '';
assert.ok(footerHtml, 'homepage footer badge strip should exist');
const anchors = [...footerHtml.matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/gi)].map(([anchor]) => anchor);

const attributeOf = (tag, name) => {
  const openingTag = tag.match(/^<[a-z][^>]*>/i)?.[0] ?? '';
  return openingTag.match(new RegExp(`\\b${name}\\s*=\\s*["']([^"']*)["']`, 'i'))?.[1]
    ?.replace(/&(?:amp|#38|#x26);/gi, '&') ?? '';
};

const hrefOf = (anchor) => attributeOf(anchor, 'href');
const imgTagOf = (anchor) => anchor.match(/<img\b[^>]*>/i)?.[0] ?? '';

const imageBadges = [
  { domain: 'whatsthebigdata.com', href: 'https://whatsthebigdata.com/ai-tools/', src: 'https://whatsthebigdata.com/badges/featured-on-whatsthebigdata-dark.png', alt: 'Listed on Whatsthebigdata', width: '240', height: '78', title: 'Whatsthebigdata' },
  { domain: 'toolcurio.com', href: 'https://toolcurio.com', src: 'https://toolcurio.com/badge-light.png', alt: 'Featured on Toolcurio', width: '200', height: '54' },
  { domain: 'huzzler.so', href: 'https://huzzler.so/products/419PZlEAMk/amazingplugins?utm_source=huzzler_product_website&utm_medium=badge&utm_campaign=free_listing', src: 'https://huzzler.so/assets/images/embeddable-badges/featured.png', alt: 'Huzzler Embed Badge', width: '159', height: '55' },
  { domain: 'aitoolsmarketer.com', href: 'https://aitoolsmarketer.com/', src: 'https://aitoolsmarketer.com/badges/badge-dark.svg', alt: 'Listed on AI Tools for Marketers', width: '153', height: '44' },
  { domain: 'sumodir.com', href: 'https://sumodir.com', src: 'https://sumodir.com/badge.png', alt: 'Featured on SumoDir', width: '200', height: '54' },
  { domain: 'mydentify.com', href: 'https://mydentify.com/', src: 'https://mydentify.com/badges/listed-on-mydentify.svg', alt: 'Listed on Mydentify', width: '176', height: '32', ariaLabel: 'Listed on Mydentify' },
  { domain: 'vantaige.io', href: 'https://vantaige.io/?utm_source=badge&utm_medium=embed', src: 'https://vantaige.io/badges/vantaige-badge-dark.svg', alt: 'Featured on Vantaige.io', width: '200', height: '56' },
  { domain: 'findly.tools', href: 'https://findly.tools/amazingplugins?utm_source=amazingplugins', src: 'https://findly.tools/badges/findly-tools-badge-light.svg', alt: 'Featured on Findly.tools', width: '175', height: '55', loading: null, decoding: null },
  { domain: 'codehype.ai', href: 'https://codehype.ai/product/amazingplugins?utm_source=codehype_badge', src: 'https://codehype.ai/badges/amazingplugins.svg?variant=find-us&v=20', alt: 'Featured on CodeHype', width: '180', height: '65', loading: 'lazy', decoding: 'async', style: 'display:inline-block;border:0;width:100%;max-width:180px;height:auto;max-height:65px;' },
  { domain: 'startuptrusted.com', href: 'https://startuptrusted.com?ref=amazingplugins.com', src: 'https://startuptrusted.com/api/badge?type=featured&style=light', alt: 'AmazingPlugins on StartupTrusted', width: '240', height: '54', rel: 'noopener', loading: null, decoding: null },
  { domain: 'saasfame.com', href: 'https://saasfame.com/item/amazingplugins', src: 'https://saasfame.com/badge-light.svg', alt: 'Featured on saasfame.com', style: 'height: 54px; width: auto;', rel: 'noopener noreferrer', loading: null, decoding: null },
  { domain: 'uno.directory', href: 'https://uno.directory', src: 'https://uno.directory/uno-directory.svg', alt: 'Listed on Uno Directory', width: '120', height: '30', rel: 'noopener', loading: null, decoding: null },
];

const textBadges = [
  { domain: 'dofollow.tools', href: 'https://dofollow.tools', label: 'Dofollow.Tools' },
  { domain: 'aitoolzdir.com', href: 'https://www.aitoolzdir.com', label: 'AI Toolz Dir' },
  { domain: 'aitop10.tools', href: 'https://aitop10.tools/', label: 'AiTop10 Tools' },
];

test('renders every requested directory as exactly one homepage link', () => {
  for (const { domain } of imageBadges) {
    assert.equal(anchors.filter((anchor) => hrefOf(anchor).includes(domain)).length, 1, `${domain} should have exactly one homepage link`);
  }
  for (const domain of ['topaitools4u.site', 'agenthunter.io']) {
    assert.equal(anchors.filter((anchor) => hrefOf(anchor).includes(domain)).length, 1, `${domain} should have exactly one homepage link`);
  }
  for (const { domain } of textBadges) {
    assert.equal(anchors.filter((anchor) => hrefOf(anchor).includes(domain)).length, 1, `${domain} should have exactly one homepage link`);
  }
});

test('preserves each supplied image URL, alt text, and dimensions', () => {
  for (const expected of imageBadges) {
    const anchor = anchors.find((item) => hrefOf(item).includes(expected.domain));
    assert.ok(anchor, `${expected.domain} anchor should exist`);
    assert.equal(hrefOf(anchor), expected.href);
    assert.equal(attributeOf(anchor, 'target'), '_blank');
    assert.equal(attributeOf(anchor, 'rel'), expected.rel ?? 'noopener noreferrer');
    if (expected.title) assert.equal(attributeOf(anchor, 'title'), expected.title);
    if (expected.ariaLabel) assert.equal(attributeOf(anchor, 'aria-label'), expected.ariaLabel);
    const img = imgTagOf(anchor);
    assert.equal(attributeOf(img, 'src'), expected.src);
    assert.equal(attributeOf(img, 'alt'), expected.alt);
    assert.equal(attributeOf(img, 'width'), expected.width ?? '');
    assert.equal(attributeOf(img, 'height'), expected.height ?? '');
    assert.equal(attributeOf(img, 'style'), expected.style ?? '');
    assert.equal(attributeOf(img, 'loading'), expected.loading === null ? '' : (expected.loading ?? 'lazy'));
    assert.equal(attributeOf(img, 'decoding'), expected.decoding === null ? '' : (expected.decoding ?? 'async'));
  }
});

test('preserves the two verification cards and three plain text links', () => {
  const topAi = anchors.find((anchor) => hrefOf(anchor).includes('topaitools4u.site')) ?? '';
  assert.equal(hrefOf(topAi), 'https://www.topaitools4u.site');
  assert.equal(attributeOf(topAi, 'target'), '_blank');
  assert.equal(attributeOf(topAi, 'rel'), 'noopener');
  assert.match(topAi, /data-topaitools4u-badge="verified-listing"/);
  assert.equal(attributeOf(topAi, 'aria-label'), 'Listed on TopAITools4U');
  assert.match(imgTagOf(topAi), /src="https:\/\/www\.topaitools4u\.site\/logo\.svg"/);
  assert.match(topAi, /TopAITools4U/);

  const agentHunter = anchors.find((anchor) => hrefOf(anchor).includes('agenthunter.io')) ?? '';
  assert.equal(hrefOf(agentHunter), 'https://www.agenthunter.io');
  assert.equal(attributeOf(agentHunter, 'target'), '_blank');
  assert.equal(attributeOf(agentHunter, 'rel'), 'noopener noreferrer');
  assert.match(imgTagOf(agentHunter), /src="https:\/\/www\.agenthunter\.io\/logo-light\.svg"/);
  assert.match(agentHunter, /Featured AI Agent/);

  for (const { domain, href, label } of textBadges) {
    const anchor = anchors.find((item) => hrefOf(item).includes(domain)) ?? '';
    assert.equal(hrefOf(anchor), href);
    assert.equal(attributeOf(anchor, 'target'), '_blank');
    assert.equal(attributeOf(anchor, 'rel'), 'noopener noreferrer');
    assert.equal(anchor.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim(), label);
    assert.equal(imgTagOf(anchor), '', `${domain} should remain a text link`);
  }
});
