---
title: 'ADA Lawsuits Hit 5,114 in 2025: What WooCommerce Store Owners Need to Know'
description: >-
  ADA website accessibility lawsuits hit a record 5,114 cases in 2025. Here's
  what the numbers mean for your WooCommerce store, why e-commerce gets hit
  hardest, and how to fix the most common violations before they become a
  lawsuit.
pubDate: 2026-07-23T00:00:00.000Z
author: Harun Ray
tags:
  - WooCommerce
  - ADA
  - Accessibility
  - Lawsuits
  - WCAG
  - E-commerce Compliance
---

A store owner in Ohio got a demand letter last spring. Not a warning. Not a
notice to fix something. A demand for $10,000, sent by a law firm on behalf of
a customer who said they couldn't use a screen reader to check out on his site.

He had never heard of WCAG. He didn't know his checkout page had a problem. He
just knew he now owed a lawyer money or he'd see a judge.

That story isn't rare anymore. It's the new normal for small e-commerce stores,
and the numbers back it up.

## ADA Lawsuits Hit a Record 5,114 Cases in 2025

In 2025, plaintiffs filed 5,114 ADA Title III web accessibility lawsuits in
federal court. That is not a typo, and it is not a slow year. It is a record.

To put that in perspective, roughly 14 lawsuits were filed every single day of
the year. Weekends included. Holidays included. While you were sleeping,
someone's website was getting served.

And this is just federal court. States like New York and California see even
more activity in their own court systems, where the same kind of accessibility
claims get filed under state civil rights laws. Those state-level filings
sometimes come with easier paths to a payout for plaintiffs. Federal numbers are
the ones we can count cleanly. The real total, including state court filings and
demand letters that got settled before reaching a judge, is almost certainly
higher.

## Why Your WooCommerce Store Is a Target

Here is the part that should grab your attention: 70 to 80 percent of these
lawsuits target e-commerce websites. Not blogs. Not portfolio sites. Not local
restaurant pages with a phone number and an address. Stores. Places where money
changes hands.

If you sell something online, you are in the crosshairs of the fastest-growing
category of ADA litigation in the country.

There are several reasons for this, and none of them are going away on their
own.

### There Is a Transaction to Point To

Lawsuits need a concrete harm. "I couldn't read your blog post" is a weak
claim. "I tried to buy a birthday gift for my kid and your checkout form was
completely unusable with my screen reader, so I had to go buy it somewhere else"
is a much stronger one.

E-commerce sites have an obvious moment where accessibility either works or it
doesn't, and that moment is easy to describe in a complaint.

### Checkout Flows Are Complex by Design

Product pages, cart pages, shipping forms, payment fields, quantity selectors,
size and color variant pickers. Every one of these is a spot where a screen
reader user, someone navigating by keyboard only, or someone with low vision can
get stuck.

More interactive elements means more chances for something to break. A static
informational site has far fewer moving parts to get wrong.

### WooCommerce Wasn't Built Accessible by Default

WooCommerce is a fantastic, flexible platform, but out of the box it doesn't
guarantee WCAG-compliant markup, proper focus management, or accessible error
messaging on forms.

Add a theme that wasn't built with accessibility in mind, and a handful of
plugins that inject their own unlabeled buttons and popups, and you've got a
store that looks fine to a sighted mouse user and is genuinely unusable to
plenty of others.

### Serial Plaintiffs Have Found a Business Model

This is the uncomfortable part. A meaningful share of these lawsuits come from a
small number of individuals working with a small number of law firms. They scan
hundreds of sites using automated tools, find the ones that fail, and send
demand letters at scale.

It's efficient for them. Automated scanners can flag a missing alt tag or a low
contrast ratio on thousands of sites in an afternoon. E-commerce sites, being
more complex, fail these scans more often and more visibly, which makes them a
more productive target.

### Store Owners Look Like They Can Pay

Fair or not, a business that's actively selling products online looks like a
business that can pay a settlement. A hobbyist blog looks like it can't. Lawyers
file where the money is.

None of this means you're being unfairly singled out. It means the risk profile
of running a store is genuinely different from running a content site, and it
deserves different attention.

## What the Lawsuits Actually Cite

When you read through ADA demand letters and lawsuit complaints against
WooCommerce stores, the same handful of issues show up again and again. Knowing
what they are lets you check your own site against the same list.

### Missing or Broken Alt Text on Product Images

This is the single most common citation. A screen reader user can't tell what a
product looks like, or even what it is, if the image has no alt text or has
something unhelpful like "IMG_4021.jpg."

### Keyboard Navigation Failures

Plenty of people don't use a mouse at all, whether due to a motor impairment
or just personal preference. They rely entirely on the keyboard to tab through
a page. If your add-to-cart button, your product filters, or your checkout
fields can't be reached or activated with a keyboard alone, that's a serious
and very citable problem.

### Poor Color Contrast

Light gray text on a white background. A "sale" badge in a color that blends
into the product image behind it. These fail WCAG contrast ratio requirements
and are trivially easy for an automated scanner to flag, which is exactly why
they show up in so many complaints.

### Unlabeled Form Fields

Checkout forms, newsletter signups, and account creation pages that don't
properly label their input fields leave screen reader users guessing what each
box is for. "Enter text here" doesn't cut it when the field is actually asking
for a billing zip code.

### No Visible Focus Indicators

When you tab through a page with a keyboard, you should be able to see where
you are. Themes that strip out the default focus outline for aesthetic reasons,
without replacing it with something visible, make keyboard navigation nearly
impossible to follow.

### Inaccessible Pop-ups and Modals

Newsletter signup modals, cart drawers, and "you might also like" overlays that
trap keyboard focus or can't be closed without a mouse are a recurring complaint.
If a user gets stuck inside a pop-up with no way out, that's a lawsuit waiting
to happen.

### Missing Skip Navigation Links and Bad Heading Structure

These are less visible to the average shopper but heavily weighted by
accessibility auditors and automated scanning tools. They show up in complaints
even though most store owners have never heard of them.

The pattern here matters. These aren't obscure, hard-to-fix technical deep
cuts. They're common, well-documented issues that show up on almost every
unaudited WooCommerce store, which is exactly why the lawsuits keep landing.

## What This Could Cost You

Most of these cases don't go to trial. They settle. Typical settlement demands
run somewhere between $25,000 and $75,000, and that is before you've paid your
own lawyer to review the demand letter and negotiate it down.

Some settle for less if you fix things fast and show good faith. Some settle for
a lot more if the plaintiff's attorney smells a business that can pay and won't
fight.

And the 94 percent stat should be the one that stays with you: a study of live
websites found that 94 percent of tested sites failed basic WCAG accessibility
checks. That means almost every store out there, including probably yours, has
something a plaintiff's lawyer could point to.

The odds aren't in your favor by default. You have to actively work to change
that.

## How to Reduce Your Risk Starting Today

You don't need to become an accessibility expert to meaningfully reduce your
risk. You need a plan, and you need to actually work through it instead of
letting it sit in a bookmark folder.

### Start With a Real Audit

Run your site through an automated tool like WAVE or axe DevTools to catch the
obvious stuff. These tools won't catch everything. Automated scans generally
only catch 30 to 40 percent of real accessibility issues. But they'll surface a
useful starting list fast and for free.

### Test With a Keyboard Only

Unplug your mouse for ten minutes and try to browse your own store, add
something to the cart, and check out. If you get stuck anywhere, so will your
customers, and so will a lawyer's automated scanner.

### Fix Your Product Images

Go through your catalog and make sure every product image has real, descriptive
alt text. If you're running hundreds or thousands of products, doing this by
hand is brutal, which is exactly the kind of task worth automating.

### Check Your Color Contrast

A contrast checker takes thirty seconds per element. Your theme's color
palette, especially sale tags, buttons, and any light gray body text, is the
most common failure point.

### Get an Accessibility Statement on Your Site

This won't stop a lawsuit by itself, but it shows good faith, documents that
you're actively working on compliance, and gives you something concrete to
point to if a demand letter shows up.

### Document Your Fixes as You Go

Keep a simple log or spreadsheet of what you've fixed and when. If you ever do
get a demand letter, being able to show a real, dated history of accessibility
improvements changes the tone of the conversation with opposing counsel
considerably.

### Don't Wait for a Perfect Fix

Perfect is the enemy of done here. Fixing your five biggest issues this month
is worth more than planning a comprehensive six-month overhaul that never gets
past the planning stage.

## Quick Wins: The Fastest Risk Reduction

If you want the fastest possible reduction in risk with the least effort, focus
on these first. They're the issues that show up most often in actual lawsuits,
and they're also the ones you can knock out without touching a line of code.

- Add real alt text to every product image in your catalog
- Make sure every button and link works with keyboard-only navigation
- Fix low-contrast text and badges, especially sale tags and pricing
- Label every checkout and account form field properly
- Restore visible focus indicators anywhere your theme removed them
- Make sure pop-ups and cart drawers can be closed with the Escape key
- Add proper heading structure (one H1, logical H2s and H3s) to product and
  category pages

Doing all of this manually across a full product catalog is a real time
investment. That is exactly the gap the
<a href="/plugins/woocommerce-accessibility-fixer/">WooCommerce Accessibility
Fixer</a> plugin is built to close. It scans your store for the most commonly
cited issues, including missing alt text, contrast failures, and keyboard
navigation gaps, and fixes what it can automatically right from your WordPress
dashboard. It is free to start, and it turns a project that might otherwise sit
on your to-do list for months into something you can knock out this weekend.

## Your ADA Compliance Checklist

Print this out or save it. Work through it one line at a time.

- [ ] Run an automated accessibility scan (WAVE or axe DevTools)
- [ ] Test your entire checkout flow using only a keyboard
- [ ] Add descriptive alt text to every product image
- [ ] Check color contrast on all text, buttons, and badges against WCAG AA
- [ ] Label every form field on checkout, account, and contact pages
- [ ] Confirm visible focus indicators exist on every interactive element
- [ ] Make sure all pop-ups and modals can be closed with a keyboard
- [ ] Fix heading structure on product and category pages
- [ ] Publish an accessibility statement page
- [ ] Set a recurring monthly reminder to re-scan your site
- [ ] Keep a dated log of every fix you make

## The Bottom Line

The lawsuits aren't slowing down, and pretending your store is too small to
notice isn't a strategy anymore.

The good news is that the actual fixes aren't mysterious or expensive. They're
specific, well-documented, and mostly things you can start today. The stores
that get hit hardest tend to be the ones that never looked.

Don't be one of them.
