# AmazingPlugins — Lean PRD Template

**Plugin name:**
**Date:**
**Status:** Draft / Validated / Building / Launched

---

## 1. Problem

*One to two sentences. Write in store-owner language, not developer language. The reader should immediately recognize their own pain.*

> [What does the store owner struggle with today? What is the cost of that struggle — time, money, risk, frustration?]

---

## 2. ICP (Ideal Customer Profile)

**Store profile:**
- Store size: [number of products; monthly order volume]
- Platform: WooCommerce [version range if relevant]
- Hosting: [self-hosted / managed WP — note if this affects plugin behavior]
- Tech level: [non-technical store owner / developer-adjacent / agency]

**What they do today instead:**
> [Describe the workaround they use right now. This is what you are replacing.]

**Trigger event (when they start searching):**
> [What just happened that made them type a search query today? Seasonal, operational, regulatory?]

**Buyer vs user:**
> [Is the person paying the same person using it? If not, who is each?]

---

## 3. Free Tier

*The free version must be genuinely useful for the core use case — not a demo, not a teaser. A store owner with a typical catalog should be able to solve their immediate problem without paying.*

**What ships free:**

| Feature | Why it must be free |
|---|---|
| [Feature] | [Reason — what does locking this do to the user experience?] |
| [Feature] | |
| [Feature] | |

**Free tier boundary:**
> [In one sentence: what can a free user accomplish end-to-end without needing to upgrade?]

**What is explicitly NOT in free (reserved for paid):**
- [Feature]
- [Feature]

---

## 4. Paid Tier

*Premium gates should feel like workflow acceleration or delegation — not like features that were removed to force payment. If a free user hits the gate and thinks "that's fair," the line is right.*

**What ships in premium (launch day):**

| Feature | Conversion trigger | Why users pay |
|---|---|---|
| [Feature] | [When does the free user first want this?] | [What is the time/money/risk value?] |
| [Feature] | | |
| [Feature] | | |

**Pricing:**

| Tier | Price | License | Target buyer |
|---|---|---|---|
| Personal | $[X]/yr | 1 site | Solo store owner |
| Business | $[X]/yr | [N] sites | Developer / small agency |
| Agency | $[X]/yr | Unlimited | Freelancer / larger agency |

*Launch discount: [X]% off for first [N] days / email list early-bird.*
*Money-back guarantee: 14 days, unconditional.*

---

## 5. MVP Scope

*What ships at day 30–45. Everything else is post-launch.*

**Ships at MVP:**
- [ ] [Feature — be specific]
- [ ] [Feature]
- [ ] [Feature]

**Explicitly deferred (post-launch):**
- [Feature — one line each]
- [Feature]

**Tech stack:**
- Backend: PHP [version]+, WordPress REST API, WooCommerce CRUD API
- Frontend: [library or vanilla JS]
- Data: [how data is read and written]
- Key dependencies: [external libraries, licenses]

**Build timeline:**

| Week | Deliverable |
|---|---|
| 1 | [Milestone] |
| 2 | [Milestone] |
| 3 | [Milestone] |
| 4 | [Milestone] |
| 5 | WordPress.org submission |
| 6 | Premium launch + landing page |

---

## 6. Validation Proof

*What evidence confirms real demand before writing production code? Fill in what you have found. Any row left blank is a gap.*

| Signal type | Finding | Strength |
|---|---|---|
| Search volume | [Top keyword clusters, estimated monthly volume, intent level] | High / Medium / Low |
| Competitor install base | [Combined active installs across all competing plugins] | |
| Competitor review gaps | [Top 3 complaint categories from 1-2 star reviews, with quote count] | |
| Reddit / forum threads | [Thread count, upvotes/comments on pain-related posts] | |
| Email signups | [Count at go/no-go gate] | |
| 1:1 conversations | [DMs completed; key insight from calls] | |
| Comparison article coverage | [Number of existing comparison articles ranking for target keywords] | |

**Go / no-go gate (day 14–30):**

| Metric | Go | Caution | No-go |
|---|---|---|---|
| Email signups | [X]+ | [Y]–[X] | Under [Y] |
| Community engagement (comments + upvotes) | [X]+ | [Y]–[X] | Under [Y] |
| 1:1 conversations completed | 3+ | 1–2 | 0 |
| Competitor complaint catalog | 50+ documented | 30–49 | Under 30 |

---

## 7. Build Complexity

**Size:** S / M / L
*(S = 1–2 weeks solo; M = 3–5 weeks solo; L = 6+ weeks solo)*

**Key technical risks:**

| Risk | Severity | Mitigation |
|---|---|---|
| [Risk] | High / Medium / Low | [Specific mitigation approach] |
| [Risk] | | |
| [Risk] | | |

**WooCommerce APIs / hooks needed:**

| API / Hook | Purpose | HPOS compatibility note |
|---|---|---|
| [API] | [What it does in the plugin] | [Any HPOS consideration] |
| [API] | | |

**WordPress.org submission risks:**
- [Known rejection reasons to avoid; estimated review time]

---

## 8. Launch Plan

**Pre-submission (before WordPress.org approval):**
- [ ] Landing page live at amazingplugins.com/[plugin-slug]
- [ ] Email list capture with 2 qualifying questions (store size + pain)
- [ ] Comparison blog post published and indexed
- [ ] Freemius account configured (pricing tiers, license management, SDK integrated)
- [ ] Plugin readme.txt written as marketing copy, not documentation

**WordPress.org submission:**
- [ ] Plugin meets all WordPress.org guidelines (no minified-only JS, no external API calls without disclosure, PHPCS clean)
- [ ] Submitted (allow 2–4 weeks for review)
- [ ] Plugin icon (256×256) and banner (1544×500, 772×250) created
- [ ] 5 screenshots prepared with captions

**Launch day:**
- [ ] Email list notified with early-bird discount link
- [ ] Posted in r/woocommerce (genuine mention, not spam)
- [ ] Posted in top 2 WooCommerce Facebook groups
- [ ] Comparison article authors pitched to include plugin
- [ ] WP Tavern / MasterWP / Post Status pitched for coverage

**Post-launch (days 30–60):**
- [ ] Review request trigger live (fires after first successful bulk save, not on activation)
- [ ] Freemius email sequence active (day 3, day 14, day 30)
- [ ] Premium in-context upsells placed at each gated feature
- [ ] First support tickets reviewed for UX improvements
- [ ] Comparison article outreach follow-up

---

## 9. Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| [Risk 1] | High / Medium / Low | High / Medium / Low | [Specific action to reduce likelihood or impact] |
| [Risk 2] | | | |
| [Risk 3] | | | |

---

## 10. Success Metrics

**Day 30:**
- Free installs: [target]
- Paying customers: [target]
- WordPress.org rating: [target]
- Go / no-go: [what triggers a pivot vs continue decision?]

**Day 60:**
- Free installs: [target]
- MRR: $[target]
- Review count: [target]
- Go / no-go: [threshold]

**Day 90:**
- Free installs: [target]
- MRR: $[target]
- Conversion rate (free → paid): [target %]
- Go / no-go: [threshold — below this, reconsider time allocation]

**Kill criteria:**
> [What specific result at day 90 would cause you to stop investing time in this plugin and move on?]

---

*Sources used for this PRD:*
- [ ] Competitor review mining (50+ complaints cataloged)
- [ ] Search keyword research
- [ ] Reddit / forum validation
- [ ] 1:1 conversations with store owners
- [ ] Pricing analysis (competitor pricing map)
