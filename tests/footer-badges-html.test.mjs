import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { footerBadges } from '../src/data/footer-badges.mjs';

const html = await readFile(new URL('../dist/client/index.html', import.meta.url), 'utf8');
const footerHtml = html.match(/<footer-logo-slider\b[^>]*>([\s\S]*?)<\/footer-logo-slider>/i)?.[1] ?? '';
assert.ok(footerHtml, 'homepage footer badge strip should exist');
const anchors = [...footerHtml.matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/gi)].map(([anchor]) => anchor);

const attributeOf = (tag, name) => {
  const openingTag = tag.match(/^<[a-z][^>]*>/i)?.[0] ?? '';
  return openingTag.match(new RegExp(`\\b${name}\\s*=\\s*["']([^"']*)["']`, 'i'))?.[1]
    ?.replace(/&(?:amp|#38|#x26);/gi, '&') ?? '';
};

const hasAttribute = (tag, name) => {
  const openingTag = tag.match(/^<[a-z][^>]*>/i)?.[0] ?? '';
  return new RegExp(`\\s${name}(?=\\s|=|/?>)`, 'i').test(openingTag);
};

const hrefOf = (anchor) => attributeOf(anchor, 'href');
const imgTagOf = (anchor) => anchor.match(/<img\b[^>]*>/i)?.[0] ?? '';
const anchorsIn = (markup) => [...markup.matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/gi)].map(([anchor]) => anchor);
const hasDirectoryDomain = (anchor, domain) => hrefOf(anchor).includes(domain) || attributeOf(imgTagOf(anchor), 'src').includes(domain);
const assertUniqueHomepageBadge = (markup, domain) => {
  const count = anchorsIn(markup).filter((anchor) => hasDirectoryDomain(anchor, domain)).length;
  assert.equal(count, 1, `${domain} should have exactly one homepage badge`);
};
const assertAttribute = (tag, name, expected, label) => {
  const present = hasAttribute(tag, name);
  if (expected === null || expected === undefined) {
    assert.equal(present, false, `${label} should omit ${name}`);
    return;
  }
  assert.equal(present, true, `${label} should include ${name}`);
  assert.equal(attributeOf(tag, name), expected);
};

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
    assertUniqueHomepageBadge(html, domain);
  }
  for (const domain of ['topaitools4u.site', 'agenthunter.io']) {
    assertUniqueHomepageBadge(html, domain);
  }
  for (const { domain } of textBadges) {
    assertUniqueHomepageBadge(html, domain);
  }
});

test('rejects a duplicate directory badge outside the footer slider', () => {
  const duplicateLink = `<a href="${imageBadges[0].href}">duplicate</a>`;
  const duplicateHomepage = html.replace('</body>', `${duplicateLink}</body>`);
  assert.throws(() => assertUniqueHomepageBadge(duplicateHomepage, imageBadges[0].domain), /exactly one homepage badge/);
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
    assertAttribute(img, 'width', expected.width, `${expected.domain} image`);
    assertAttribute(img, 'height', expected.height, `${expected.domain} image`);
    assertAttribute(img, 'style', expected.style, `${expected.domain} image`);
    assertAttribute(img, 'loading', expected.loading === null ? null : (expected.loading ?? 'lazy'), `${expected.domain} image`);
    assertAttribute(img, 'decoding', expected.decoding === null ? null : (expected.decoding ?? 'async'), `${expected.domain} image`);
  }
});

test('distinguishes empty attributes from omitted attributes', () => {
  const malformedImage = '<img loading="" decoding="">';
  assert.throws(() => assertAttribute(malformedImage, 'loading', null, 'test image'), /should omit loading/);
  assert.throws(() => assertAttribute(malformedImage, 'decoding', null, 'test image'), /should omit decoding/);
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

const existingHosts = [
  'agenthunter.io',
  'aitoolsmarketer.com',
  'aitoolzdir.com',
  'aitop10.tools',
  'codehype.ai',
  'dododirectory.com',
  'dofollow.tools',
  'earlyhunt.com',
  'fazier.com',
  'findly.tools',
  'huzzler.so',
  'indiehunt.io',
  'launchboosts.com',
  'launchigniter.com',
  'mydentify.com',
  'neeed.directory',
  'productfame.com',
  'saasbison.com',
  'saascity.io',
  'saasfame.com',
  'showmebest.ai',
  'startuptrusted.com',
  'sumodir.com',
  'techtrendin.com',
  'toolcurio.com',
  'tooldirs.com',
  'tools.launchllama.co',
  'topaitools4u.site',
  'twelve.tools',
  'uno.directory',
  'vantaige.io',
  'whatsthebigdata.com',
  'wired.business',
];

const rawBadges = footerBadges.filter((badge) => badge.kind === 'raw');

const countOccurrences = (haystack, needle) => {
  let count = 0;
  let from = 0;
  while (from <= haystack.length) {
    const index = haystack.indexOf(needle, from);
    if (index === -1) return count;
    count += 1;
    from = index + needle.length;
  }
  return count;
};

test('keeps one homepage badge for every directory already on the site', () => {
  assert.equal(existingHosts.length, 33);
  for (const domain of existingHosts) {
    assertUniqueHomepageBadge(html, domain);
  }
});

test('prints each supplied raw badge snippet once', () => {
  assert.equal(rawBadges.length, 17);
  for (const badge of rawBadges) {
    assert.equal(countOccurrences(html, badge.html), 1, `${badge.host} snippet should appear once`);
    assertUniqueHomepageBadge(html, badge.host);
  }
});
