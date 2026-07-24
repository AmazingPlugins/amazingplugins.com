---
title: 'Screen Reader Testing for WooCommerce: The 15-Minute Guide'
description: >-
  Learn how to test your WooCommerce store with a screen reader in 15 minutes.
  A practical, no-jargon walkthrough covering NVDA, VoiceOver, and JAWS, the
  issues they'll find on your store, and the fastest fixes.
pubDate: 2026-07-24T00:00:00.000Z
author: Harun Ray
tags:
  - WooCommerce
  - Accessibility
  - Screen Readers
  - Testing
  - WCAG
---

Picture this. A woman named Denise wants to buy her nephew a birthday gift. She's blind, she's been using a screen reader for over a decade, and she's good at it. She finds a WooCommerce store selling handmade wooden toys, picks one out, and gets three taps into checkout before her screen reader goes silent. Not because anything crashed. Because the "Place Order" button has no label. It's just a shape on the screen that says nothing when she lands on it.

She doesn't email the store owner. She doesn't leave a review. She closes the tab and buys from Amazon instead.

That's the part that should bother you. There's no error message, no crash log, no support ticket. The sale just quietly doesn't happen, and you never find out why. Multiply Denise by a lot of people, because there are an estimated 2.2 billion people worldwide living with some form of visual impairment, and a meaningful share of them rely on screen reading software to shop, work, and get through their day online. When 61 percent of screen reader users say they've abandoned a shopping site because it wasn't accessible, that's not a rounding error. That's real revenue walking out the door, one silent tab-close at a time.

Here's the thing though. You can catch most of what's driving that abandonment in about 15 minutes with software that's either free or already sitting on your computer. This post walks you through exactly how.

## Why Screen Reader Testing Matters

Let's deal with the objection first, because you're probably thinking it: "screen reader users are a tiny slice of my traffic, is this really worth 15 minutes of my time?"

Fair question. Screen readers account for roughly 1.7 percent of web traffic. That is a small number on paper. But run the math on your own store instead of an abstract percentage. If you're pulling 20,000 visitors a month, 1.7 percent is 340 people who are trying to use assistive technology to shop with you. If even a third of them hit a wall and leave, that's over 100 potential customers a month who never make it to checkout, and you'll never see them in your abandonment funnel because they never got far enough to trigger it.

Now stack that against this number: only about 3 percent of e-commerce sites are considered fully accessible. That means 97 percent of your competitors are failing these same customers right now. That's not a reason to shrug it off. It's the opposite. It means the store that actually works with a screen reader stands out immediately to a shopper who has spent years getting used to sites that don't.

There's also a legal angle worth mentioning briefly, since it tends to follow directly from this exact kind of testing. The same accessibility gaps that cause screen reader users to bounce are the same gaps that show up in ADA demand letters and lawsuits. Fixing them protects two things at once: the sale, and your legal exposure. But even if you set the lawsuit risk aside entirely, the plain business case holds up on its own. Testing with a screen reader isn't a compliance chore. It's closer to usability testing with a customer segment you've probably never actually watched try to use your site.

## The 3 Screen Readers You Need to Test With

You don't need every screen reader that's ever existed. Three cover the overwhelming majority of real-world usage, and testing with them will surface almost every issue that matters.

**NVDA.** This is the most popular free screen reader, and it runs on Windows. It's open source, actively maintained, and it's what a huge share of screen reader users have installed, simply because it costs nothing and works well. If you only test with one tool, make it this one. Download it from the official NVAccess site, install it, and you're ready to go in under five minutes.

**VoiceOver.** This one is already on your computer if you own a Mac, an iPhone, or an iPad, because Apple builds it directly into macOS and iOS. There's no download, no install, no excuse. On a Mac you turn it on with Command plus F5. On an iPhone it's under Settings, then Accessibility, then VoiceOver. Since a large share of mobile shopping happens on iPhones, testing your store with VoiceOver on an actual phone tells you a lot about the mobile experience specifically.

**JAWS.** This is the paid, professional-grade option, and it's common in workplace and enterprise settings, along with plenty of long-time individual users who've stuck with it for years. You don't need to buy a license to test with it. It runs in a free 40-minute demo mode that resets each time you restart it, which is more than enough time to run through your key pages.

You genuinely do not need to become fluent in all three to get value out of this. Learning the basics of NVDA and VoiceOver alone will surface the vast majority of what's broken on a typical WooCommerce store. Add JAWS as a periodic double check, not a weekly ritual.

## Step-by-Step: The 15-Minute Test Walkthrough

Set a timer for 15 minutes and actually do this, don't just read it and nod along. Reading about accessibility problems and hearing them are two completely different experiences.

**Minutes 0 to 2, homepage.** Turn on NVDA or VoiceOver and land on your homepage cold, the way a first-time visitor would. Listen to what gets read out. Does it announce a clear page title? Does the first thing you hear make sense, or does it jump straight into a wall of unlabeled navigation links? If your screen reader starts by reading a huge block of menu items before anything else, that's already a real friction point.

**Minutes 2 to 4, headings and structure.** Use the heading navigation shortcut (the H key in NVDA, or Control plus Option plus Command plus H on a Mac with VoiceOver) to jump between headings on the page. You should hear a sensible order: one main heading, then logical sub-sections underneath it. If you land on headings that are actually just bold navigation labels, or if the order jumps around in a way that doesn't match the visual layout, that's worth noting.

**Minutes 4 to 7, a product page.** Open any product page and try to answer four questions using only your ears: What is this product? What does it cost? What does the description say? How do I add it to my cart? Tab through the page using only your keyboard, no mouse, and see if you can actually reach the "Add to Cart" button. If your screen reader announces it just as "button" with no name attached, a shopper has no idea what they're about to click.

While you're here, check a product image. If it's described with something generic and unhelpful, or nothing at all, that's a gap. A shopper who can't see the photo is relying entirely on that description to know what they're buying.

**Minutes 7 to 10, cart and checkout entry.** Add the product to your cart and pay attention to what happens next. Does your screen reader say anything at all, or does the cart count silently update in a corner of the screen with zero audio feedback? A lot of WooCommerce stores update the cart through AJAX without announcing it, which means a screen reader user genuinely doesn't know if the click worked. Then move into checkout and start tabbing through the form fields.

**Minutes 10 to 13, filling out the checkout form.** This is usually where things fall apart the hardest. Tab through every field, name, address, email, payment details, and listen for whether each one is properly labeled. You're listening for something like "email address, edit text, required." If instead you hear just "edit text" with no context, that field is a guessing game for anyone who can't see the visual label next to it.

**Minutes 13 to 15, errors and confirmation.** Deliberately submit the form with something missing, like an empty email field, and see whether the error gets announced out loud or just appears as red text on screen. Then, if you're comfortable completing a real test order, do it, and listen for a clear confirmation. A shopper who submits a form and hears nothing has no way to know if their order actually went through, which is exactly the kind of moment that makes people give up and leave.

That's the full 15 minutes. Most store owners who run this for the first time find somewhere between five and fifteen real issues. Don't be discouraged by the number. Finding them is the entire point, and now you know exactly where to focus.

## Common Issues Screen Readers Find on WooCommerce

After running this kind of test across a lot of different stores, the same handful of problems show up again and again. If you found any of these during your own walkthrough, you're not alone, and none of them are unusual.

**Unlabeled buttons.** "Add to Cart" buttons, quantity selectors, and variant pickers that read out as just "button" with no name attached. This is one of the single most common issues on WooCommerce sites, largely because a lot of themes rely on icons or styling alone to communicate meaning, which a screen reader simply can't see.

**Checkout fields with no real label.** Placeholder text inside an input box, like "Enter your email," looks like a label to a sighted user but disappears the moment you start typing, and it's often not properly connected to the field for a screen reader to announce at all.

**Missing or unhelpful alt text on product images.** Either there's no alt text at all, or it's something unhelpful like "IMG-2043" or just the word "product."

**Silent cart and wishlist updates.** Actions that change something on the page, adding to cart, applying a discount code, removing an item, without any audio confirmation that anything happened.

**Broken or missing heading structure.** Headings used purely for visual size rather than actual page structure, which makes navigating by heading (a core screen reader habit) confusing or useless.

**Keyboard traps in pop-ups.** Newsletter modals, "you might also like" overlays, and size charts that open, and then can't be closed or escaped using only a keyboard, trapping the user inside the pop-up.

**Focus indicators stripped away by the theme.** Many WooCommerce themes remove the default outline shown when you tab to an element, for purely visual reasons, without adding back any other way to see where keyboard focus currently sits.

## Quick Fixes That Make a Real Difference

You don't need a total rebuild to make meaningful progress. These are the fixes that give you the most improvement for the least effort, and they map directly to the issues above.

Start by adding real, descriptive names to every button. "Add to Cart" is fine on its own, but if your theme relies on icon-only buttons, make sure each one has an accessible name describing what it does, not just what it looks like.

Go through your checkout form and make sure every input has a proper label element tied to it, not just placeholder text. This is usually a small template change, but it has an outsized impact on how usable checkout is for anyone using a screen reader.

Write real alt text for your product photos. Describe what's actually in the image, the product, the color, the relevant detail a shopper would want to know, not a generic filler phrase.

Add a live region around your cart summary so that adding or removing an item gets announced automatically. This one change alone fixes one of the most disorienting moments in the entire shopping flow.

Clean up your heading structure so it reflects the actual hierarchy of the page, one main heading, clear sub-sections underneath, nothing used purely for font size.

Make sure every pop-up and modal can be closed with the Escape key, and that keyboard focus moves into the modal when it opens and back out when it closes.

Bring back a visible focus indicator anywhere your theme removed it, even if it's just a simple outline, so keyboard and screen reader users can always tell where they are on the page.

## Where Your Accessibility Plugin Fits In

None of this requires you to become a developer. But going through every product, every theme file, and every checkout field by hand is genuinely time-consuming, especially if your catalog has more than a handful of products.

This is exactly the gap the <a href="/plugins/woocommerce-accessibility-fixer/">WooCommerce Accessibility Fixer</a> plugin is built to close. It scans your store for the issues covered in this post, missing alt text, unlabeled buttons and form fields, keyboard navigation gaps, and fixes what it can automatically from your WordPress dashboard. Running a 15-minute manual test first still matters, because it teaches you what these problems actually sound and feel like from a real user's perspective. But once you know what you're looking for, the plugin handles the repetitive, catalog-wide cleanup so you're not manually editing alt text on 800 products one at a time.

Think of the manual test as your diagnosis and the plugin as your treatment. You want both. A quick monthly test keeps you honest about what's actually happening on your live site, and the plugin keeps the baseline solid without eating your whole weekend.

## Your 15-Minute Screen Reader Testing Checklist

Save this. Run through it once a month, or after any major theme or plugin update.

- [ ] Turn on NVDA (Windows) or VoiceOver (Mac/iPhone) before you start
- [ ] Land on your homepage and confirm the page title and main heading are announced clearly
- [ ] Jump through headings and check for a logical, properly nested structure
- [ ] Open a product page and confirm the name, price, and description are all readable
- [ ] Tab to the "Add to Cart" button and confirm it announces a clear, specific label
- [ ] Check product images for real, descriptive alt text
- [ ] Add an item to the cart and listen for an audio confirmation that it worked
- [ ] Tab through the entire checkout form and confirm every field has a real label
- [ ] Submit the form with a missing field and confirm the error gets announced
- [ ] Complete a test order and confirm the confirmation message is read aloud
- [ ] Note every issue you find and prioritize checkout and product pages first

Fifteen minutes, once a month, is a small price for knowing whether your store actually works for the millions of people relying on a screen reader to shop online. Denise and everyone like her deserve to reach that "Place Order" button and hear it say something back.
