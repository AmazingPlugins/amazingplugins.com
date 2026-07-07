# Community Outreach Plan — AmazingPlugins

**Purpose:** Pre-outreach research and prep (non-promotional, helpful participation)
**Date:** 2026-04-13
**Note:** This is for genuine helpful participation. NOT spam. Not promotional posts.

---

## Communities to Participate In

### Reddit

| Subreddit | Audience | How to Help | What NOT To Do |
|---|---|---|---|
| r/woocommerce | WooCommerce merchants + developers | Answer questions about bulk editing, accessibility | Don't drop links without context |
| r/WordPress | WordPress users + developers | Answer questions about accessibility, plugin dev | No self-promo |
| r/shopify | Shopify merchants + developers | Help with accessibility compliance questions | No spam |
| r/webdev | Web developers | Share accessibility knowledge | No promotional links |
| r/Accessibility | General a11y community | Answer technical questions, share WCAG knowledge | No marketing |

**Reddit posting rules:**
- No "shameless self-promotion" — 10% rule (1 in 10 posts can be yours)
- Always add value first, mention product naturally only when relevant
- Never drop links in new posts without being an active community member first
- Use imgur/redd.it for screenshots, not your own site

**Good Reddit contributions (non-promotional):**
- Answer "how do I fix accessibility on my WooCommerce store?" with useful info (mention our guide as a resource)
- Comment on "best bulk edit plugin?" threads with genuine analysis, mention AmazingPlugins only if asked directly
- Share the blog post about ADA compliance when relevant to someone's question
- Help with technical questions in r/webdev about WCAG implementation

**What to avoid:**
- Posting "I made this" posts to r/WordPress or r/woocommerce
- Commenting with just "try my plugin" on every related thread
- Creating threads that are thinly veiled product announcements

### Facebook Groups

| Group | Audience | How to Help |
|---|---|---|
| WooCommerce Community | Merchants + developers | Answer product management questions |
| WordPress Freelancers / Developers | WP developers | Share accessibility tips |
| Shopify Merchants Group | Shopify store owners | Answer accessibility compliance questions |
| E-commerce Accessibility | Niche but relevant | Purely helpful, share knowledge |

**Facebook rules:**
- Facebook groups are more tolerant of helpful links than Reddit
- Always lead with helpful info, not "I made a plugin"
- Don't post the same comment in 10 groups (spam flag)
- Groups with 10K+ members: check if they have spam rules

### Dev.to (Article Platform)

**Strategy:** Write genuinely helpful articles that happen to mention AmazingPlugins naturally.

Good article ideas:
- "The accessibility issues that get WooCommerce stores sued (and how to fix them)"
- "Why overlays don't make your site ADA compliant"
- "10-minute WooCommerce accessibility audit anyone can do"
- "WCAG 2.1 AA for e-commerce: what actually matters"

These articles can:
- Include a link to the blog or plugin (natural, not spammy)
- Be published on dev.to, then mirrored to amazingplugins.com/blog
- Build backlinks over time

---

## Accessibility Directories to Submit To

Once site is live, submit to:

### WordPress/Accessibility Directories

| Directory | URL | Notes |
|---|---|---|
| A11Y Project Resources | https://github.com/a11yproject/a11yproject.com (PR to resources.json) | Open source, submit via GitHub PR |
| InclusionHub | https://www.inclusionhub.com/submit-resource | Community-driven, free listing |
| A11Y Directory | https://a11y.directory | Accessibility tools directory |
| Product Hunt | https://producthunt.com (when ready) | For launch day buzz |

### How to Submit to A11Y Project (GitHub)

The A11Y Project resources are in a JSON file on GitHub. To add AmazingPlugins:
1. Fork the repo: https://github.com/a11yproject/a11yproject.com
2. Add entry to `src/_data/resources.json`
3. Submit PR with explanation of why the tool is useful
4. Category would be "WordPress Plugins" or "WooCommerce Tools"

**Format in resources.json:**
```json
{
  "name": "AmazingPlugins WooCommerce Accessibility Fixer",
  "url": "https://amazingplugins.com/plugins/woocommerce-accessibility-fixer",
  "description": "Automatically fixes WCAG 2.1 AA issues in WooCommerce stores...",
  "categories": ["WordPress Plugins", "WooCommerce", "Accessibility"]
}
```

---

## Blogger Outreach (Backlinks + Reviews)

### Accessibility Bloggers / Advocates to Potentially Reach

**Approach:** Email introducing the free plugin, asking if they'd be interested in a genuine review. Be honest that it's a new product — bloggers prefer products with some legitimacy first.

| Blogger | Platform | Reach | Notes |
|---|---|---|---|
| Marcy Sutton | https://marcy.codes | High | Accessibility engineer, influential |
| Rob Del小野 | @robdel on Twitter | High | Accessibility advocate |
| Sara Soueidan | https://www.sarasoueidan.com | High | Freelance accessibility consultant |
| Steve Faulkner | @stevefaulkner | High | HTML5 accessibility expert |
| WP Accessibility plugin team | make.wordpress.org | High | WordPress core accessibility |

**Note:** These people get 50+ outreach emails per week. Cold outreach with a free plugin and no audience may not get responses. Better approach: wait until the product has 10+ reviews and some social proof, then reach out.

### Alternative: Guest Posts

| Blog | DA | Topic Ideas |
|---|---|---|
| WebAIM | https://webaim.org/articles | Technical a11y, very high DA |
| The A11y Project | https://a11yproject.com | Accessibility community hub |
| CSS-Tricks | https://css-tricks.com | Frontend/web dev, accepts guest posts |
| Smashing Magazine | https://www.smashingmagazine.com | Frontend/web dev |

---

## Outreach Template (Non-Promotional Reddit Comment)

**Use when someone asks about accessibility compliance:**
```
If you're worried about ADA demand letters (they're up significantly for WooCommerce stores), the real fix is actually changing your code, not just adding an overlay widget.

Here's a practical starting point:
1. Run WAVE or axe on your site to see what fails
2. Focus on the basics: alt text, form labels, contrast, keyboard nav
3. For WooCommerce specifically, the tricky parts are variations, checkout forms, and product image grids

We wrote a guide on this specifically for WooCommerce stores → [link to blog post, not product page]

Happy to answer specific questions too.
```

---

## Outreach Template (Email to Blogger — After Social Proof)

**Subject:** Quick question — AmazingPlugins WooCommerce accessibility fixer

```
Hi [Name],

I built a free WordPress plugin specifically for WooCommerce accessibility compliance. Happy to send over a free Pro license if you're interested in taking a look.

The plugin actually fixes WCAG 2.1 AA issues in the underlying HTML (not just an overlay), which is why I think it's different from tools like AccessiBe.

Not sure if this is in your wheelhouse, but if you'd ever consider writing about it, I'd genuinely appreciate a look.

Link: https://amazingplugins.com/woocommerce-accessibility-fixer

Thanks,
[Name]
```

---

## Launch Day Outreach (Once Site Is Live)

**Priority 1 (Day 1):**
- Submit to Product Hunt
- Post in r/woocommerce (genuinely interesting launch, not spam)
- Post in r/WordPress

**Priority 2 (Week 1):**
- Submit to A11Y Project via GitHub PR
- Submit to InclusionHub directory
- Submit to a11y.directory
- Email accessibility bloggers

**Priority 3 (Ongoing):**
- Genuine helpful participation in Reddit/Facebook communities
- Guest post pitches to CSS-Tricks, WebAIM
- Monthly backlink outreach to relevant blogs
