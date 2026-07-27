---
title: 'Why Most WooCommerce Stores Fail a Screen Reader Test (And How to Fix Yours)'
description: >-
  94% of websites fail WCAG 2.1. I ran a screen reader over a dozen
  WooCommerce stores and found the same failures every time. Here's the
  15-minute test, what it catches, and how to fix what it finds.
pubDate: 2026-07-24T00:00:00.000Z
author: Harun Ray
tags:
  - WooCommerce
  - Accessibility
  - Screen Readers
  - WCAG
  - Testing
---

I turned on NVDA and opened a client's WooCommerce store for the first time last month. Within about 40 seconds I'd already found three dealbreakers: a hero carousel that got announced as eleven identical unlabeled links, a product grid where every "Add to Cart" button read as just "button," and a checkout page where the screen reader skipped straight from the cart summary to a payment iframe with no warning. The store looked great. It converted fine for sighted mouse users. For anyone navigating by ear, it was close to unusable.

I wish I could say that store was unusual. It wasn't. I've run this same test on a dozen or so WooCommerce sites over the past year, and the pattern barely changes. According to the WebAIM Million report, which audits the homepages of the top million sites on the web every year, roughly 94 percent of pages fail basic WCAG 2.1 checks. Not "could be better." Fail. And WooCommerce stores, with their carousels, sliders, quantity pickers, and AJAX-driven carts, tend to land on the worse end of that curve, not the better end.

There are around 1 billion people globally living with some form of disability, and a meaningful chunk of that group relies on a screen reader to get through a normal day online, whether that's checking email, paying a bill, or buying a gift for someone. If your store doesn't work for them, you're not losing a rounding error. You're losing real customers who never show up in your analytics because they never got far enough to convert.

Here's the good news. You don't need a certification or a consultant to find most of this. You need about 15 minutes and either NVDA or VoiceOver, both of which are free.

## What Screen Readers Actually Do

Before you run the test, it helps to understand what you're actually testing. A screen reader doesn't "read the page" the way you'd read it visually. It reads the underlying HTML, in the order the HTML puts it, and it depends entirely on that HTML being structured and labeled correctly.

If a button has no accessible name, the screen reader says "button" and nothing else. It doesn't infer meaning from an icon, a color, or a position on the page, because it has no access to any of that. If a heading tag is used purely to make text look bigger, the screen reader treats it as a genuine section heading, and a user navigating by headings gets a completely wrong mental map of the page. If an image has no alt attribute, it either gets skipped silently or read out as the filename, "product-img-2847.jpg," which tells a shopper nothing about what they're looking at.

This is the part that trips people up. Your store can look completely normal and still be structurally broken underneath. A screen reader doesn't care about your design. It cares about your markup. That's why visual QA misses so much of this, and why you actually have to listen to the page instead of just looking at it.

## The 15-Minute Testing Workflow

I run the same sequence every time, in the same order, because it mirrors how a real shopper actually moves through a store: land on a page, find a product, add it to the cart, check out.

Start on the homepage and just listen for 60 seconds without touching anything. Then move to a product listing page, pick a single product, add it to the cart, go to the cart page, and walk through checkout to the point right before you'd submit a real order. That's the whole workflow. It takes most people under 15 minutes once they know the keyboard shortcuts, and it surfaces the vast majority of what actually blocks a screen reader user from buying something.

The key is to genuinely stop using your mouse. Not "mostly." Entirely. The moment you reach for it out of habit, you've skipped past exactly the kind of friction a real screen reader user hits constantly.

## Testing With NVDA on Windows

NVDA is worth learning first, and not just because it's free. In surveys of screen reader users, NVDA consistently comes out as the most widely used desktop screen reader by a wide margin, ahead of JAWS and every other option combined in a lot of recent survey years. If you're only going to test with one tool on desktop, this is the one.

Grab it from nvaccess.org, install it, and it starts automatically. A few commands you'll actually use during this test:

Press Insert plus Down Arrow to have it start reading continuously from your current position. Press H to jump to the next heading, and Shift plus H to go backward. Press Tab to move between interactive elements the normal way, which is really what you want for testing forms and buttons, since it mirrors real keyboard-only navigation. Press Insert plus F7 to pull up a full list of every link, heading, and form field on the page at once, which is a fast way to spot missing labels without tabbing through everything one at a time.

Don't try to memorize every NVDA command before you start. Learn these five, run the workflow above, and you'll already catch most of what matters.

## Testing With VoiceOver on Mac

If NVDA leads on desktop, VoiceOver leads on mobile, largely because it's built into every iPhone and a huge share of online shopping now happens on phones. It's already installed if you own a Mac, an iPhone, or an iPad, which means there's genuinely no excuse not to run this one at least once.

On a Mac, turn it on with Command plus F5, and turn it back off the same way. On an iPhone, it's under Settings, then Accessibility, then VoiceOver.

The gestures work a little differently than NVDA's keyboard shortcuts. Swipe right or left to move between elements one at a time. Double tap to activate whatever's currently selected, since a direct single tap does something different in VoiceOver mode. Use the rotor, which you access with a two-finger twist gesture, to jump quickly between headings, links, or form fields, similar to what Insert plus F7 gives you in NVDA.

I'd genuinely encourage testing your checkout flow on an actual iPhone with VoiceOver on, not just the desktop version in Safari. Mobile checkout has its own set of problems, mainly around tiny tap targets and custom-styled form fields that don't behave the way a native input would, and those problems mostly don't show up until you test them on a real phone.

## The 5 Things to Check on Every WooCommerce Page

Whatever page you're on, these five things tell you almost everything you need to know.

First, does the page announce a clear title and a single main heading when you land on it? If the first thing you hear is a wall of navigation links before any actual content, that's a real problem for anyone trying to orient themselves.

Second, can you reach every interactive element using only Tab, and does each one announce something specific? "Button" alone tells a user nothing. "Add Blue Ceramic Mug to cart" tells them exactly what's about to happen.

Third, does every image that matters have real alt text? Not every image needs a description, decorative background images genuinely don't, but every product photo absolutely does.

Fourth, when something changes on the page without a full reload, like a product getting added to the cart, does the screen reader say anything about it? Silent AJAX updates are one of the most common failures I run into on WooCommerce specifically, because so much of the cart and checkout experience depends on it.

Fifth, if you trigger an error, like submitting a form with a required field empty, does the screen reader announce what went wrong and where? Or does the page just silently show red text that only a sighted user would ever notice?

## Common WooCommerce Accessibility Failures

After running this test enough times, you start to see the same handful of issues over and over, almost like the platform and its themes have a shared blind spot.

Product image galleries built with a JavaScript slider plugin are a big one. They often work fine with a mouse and completely lock out keyboard and screen reader users, because the slider intercepts arrow key presses for its own navigation instead of letting focus move normally.

Quantity selectors are another repeat offender. A lot of themes build these as a pair of unlabeled plus and minus buttons next to a number field, and none of the three pieces gets properly announced as being related to each other.

Variant selectors, the color swatches and size buttons you see on a lot of product pages, frequently render as plain divs with a click handler instead of actual buttons or radio inputs, which means they're invisible to keyboard and screen reader navigation entirely.

Checkout forms are the worst offender by a wide margin. Placeholder text standing in for a real label is everywhere, which means the label disappears the moment you start typing and was never actually tied to the field for a screen reader in the first place.

And then there's the classic silent cart update I mentioned above. You click "Add to Cart," the mini-cart count changes in the corner of the screen, and if you're not looking at that exact spot, you have zero indication anything happened at all.

## Quick Fixes That Take Under 5 Minutes Each

None of this requires a rebuild. Here's what actually moves the needle fast.

Add a real, specific label to your "Add to Cart" button using an aria-label, something like "Add [product name] to cart" instead of a generic label everywhere. Most themes let you do this with a small template edit.

Go through your ten best-selling products and rewrite their alt text to actually describe what's in the photo. You don't need to do your whole catalog today, just start with what actually drives revenue.

Add an aria-live region around your cart total so that adding an item gets announced out loud. This single change fixes one of the most disorienting moments in the whole shopping flow, and it's usually a small addition to your cart template.

Swap placeholder-only form fields for real label elements tied to their inputs with a matching for and id attribute. This is often a five-minute find-and-replace across your checkout template.

Check your image gallery or slider plugin's settings for a "keyboard navigation" or "accessibility" toggle. A surprising number of them have one, and it's off by default.

## Where This Gets Faster

Running the manual test teaches you what's actually broken and why, and I'd genuinely recommend doing it at least once yourself before you touch anything else. But going through every product, every template file, and every form field by hand across a full catalog is a lot of repetitive work, especially past a few hundred products.

That's the gap the <a href="/plugins/woocommerce-accessibility-fixer/">WooCommerce Accessibility Fixer</a> plugin is built for. It scans your store for the exact issues covered above, unlabeled buttons, missing alt text, silent cart updates, and fixes what it can automatically from your WordPress dashboard, so you're not hand-editing hundreds of products one at a time.

## Your Screen Reader Testing Checklist

- [ ] Turn on NVDA (Windows) or VoiceOver (Mac/iPhone) and put the mouse away
- [ ] Land on your homepage and listen for a clear title and main heading
- [ ] Jump through headings and confirm a logical, single-H1 structure
- [ ] Open a product page and confirm name, price, and description are all announced
- [ ] Tab to "Add to Cart" and confirm it announces a specific, useful label
- [ ] Check your best-selling products for real, descriptive alt text
- [ ] Add an item to the cart and listen for an audio confirmation it worked
- [ ] Tab through checkout and confirm every field has a real, connected label
- [ ] Submit the form with something missing and confirm the error gets announced
- [ ] Test your checkout on an actual phone with VoiceOver, not just desktop
- [ ] Write down every issue you find and fix your checkout and product pages first

Run it once, and you'll understand exactly why 94 percent of sites fail this. Run it every month, and you'll be one of the few stores that doesn't.

## Related Reading

- [Screen Reader Testing for WooCommerce: The 15-Minute Guide](/blog/screen-reader-testing-woocommerce-guide/)
- [How to Fix Keyboard Navigation in WooCommerce](/blog/keyboard-navigation-woocommerce-fix-guide/)
- [10 Common Accessibility Issues on E-commerce Sites](/blog/10-common-accessibility-issues-on-e-commerce-sites/)
- [WooCommerce Checkout Accessibility: Fix the 5 Issues That Kill Sales](/blog/woocommerce-checkout-accessibility-fix-sales/)
- [WooCommerce Accessibility Fixer](/plugins/woocommerce-accessibility-fixer/)
