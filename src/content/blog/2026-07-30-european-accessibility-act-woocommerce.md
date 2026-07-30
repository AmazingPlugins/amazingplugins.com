---
title: 'The European Accessibility Act Is Live: What Every WooCommerce Store Owner Needs to Know'
description: >-
  The European Accessibility Act has been enforced since June 28, 2025. Here is
  what WooCommerce stores selling into the EU need to do about it.
pubDate: 2026-07-30T00:00:00.000Z
author: Harun Ray
tags:
  - european accessibility act
  - EAA
  - WooCommerce accessibility
  - WCAG compliance
  - EU accessibility law
---

Between 80 and 90 million people in the European Union live with some form of disability. That is more people than live in Germany. And since June 28, 2025, every one of them has a legal right to use your online store.

Not a moral right. Not a nice-to-have. A legal right, backed by market surveillance authorities in 27 countries.

Here is the part most store owners missed: that deadline was not the start of a grace period. It was the end of one. The European Accessibility Act was signed into law in April 2019. Member states had until June 2022 to write it into their own national law, and businesses had until June 2025 to actually comply. That is six years of warning.

The deadline passed more than a year ago. The law is being enforced right now.

If you sell to customers in the EU through WooCommerce and you have never audited your checkout with a keyboard, this post is for you.

## What the EAA actually requires, in plain English

The formal name is Directive (EU) 2019/882. Directives are not laws you can be sued under directly. Each member state has to pass its own version, which is why the details differ depending on whether you are dealing with Germany, France, or Ireland. But the core requirement is the same everywhere.

The Act says that certain products and services sold to consumers in the EU have to be accessible to people with disabilities. For digital services, that means four things:

**Perceivable.** Images need text alternatives, video needs captions, and text needs enough contrast that someone with low vision can read it.

**Operable.** Everything you can do with a mouse, you must be able to do with a keyboard. No timeouts that punish slow users, no flashing content that can trigger seizures.

**Understandable.** Your interface has to behave predictably. Form errors need to say what went wrong and how to fix it. Labels need to describe what a field is for.

**Robust.** Screen readers, magnifiers, switch devices, and voice control software all read your HTML. If your markup is a pile of unlabeled divs, they cannot do their job.

Those are the four principles of WCAG, the Web Content Accessibility Guidelines. The EAA does not name WCAG directly, but it does something more useful. It points to a harmonised European standard called EN 301 549, which is built on WCAG 2.1 Level AA.

That matters because of a legal concept called presumption of conformity. If your store meets EN 301 549, regulators are required to presume you comply with the Act. You do not have to argue about interpretation. You point at the standard and you are done.

So the practical answer to "what does the EAA require of my store" is: WCAG 2.1 Level AA.

## Who has to comply, and the exemption you probably do not qualify for

The Act covers a specific list of products and services. On the services side it includes:

- E-commerce websites and mobile apps
- Consumer banking services
- E-books and dedicated reading software
- Passenger transport services, including ticketing and travel information
- Telephone and electronic communications services
- Access to audiovisual media services

E-commerce is on that list explicitly. There is no argument to be had about whether an online store is covered.

The Act's definition is broad: services provided at a distance, through websites and mobile apps, by electronic means, at the individual request of a consumer, with a view to concluding a consumer contract. That is a lawyer's way of describing WooCommerce.

### The microenterprise exemption

There is one carve-out, and it is narrow. Microenterprises that provide services are exempt from the accessibility requirements.

A microenterprise means a business with **fewer than 10 employees** and an **annual turnover or balance sheet total under 2 million euros**. You need to be under the headcount threshold and under the financial threshold. Ten employees and 500,000 euros in revenue does not qualify. Six employees and 3 million euros in revenue does not qualify either.

Three things worth knowing about this exemption before you rely on it:

First, it applies to services, not products. If you manufacture or sell certain physical products covered by the Act, such as e-readers or self-service terminals, the exemption does not save you.

Second, member states implemented it slightly differently in places, and some national authorities take a stricter reading than others. If you are close to the line, get local advice.

Third, being exempt from the law does not make your store usable. You are still turning away a chunk of the market, and you still have no defence if a customer decides to make noise about it publicly.

Most WooCommerce stores doing real volume are over the line. Assume you are covered unless you have specifically confirmed otherwise.

## What this means for a WooCommerce store specifically

The Act talks about services in the abstract. Here is what that translates to on a typical WooCommerce site.

**Product pages.** Every product image needs meaningful alt text. Variation swatches need accessible names, so a screen reader announces "Colour: navy" rather than "button". Price changes need to be announced, not silently swapped in the DOM.

**Search and filtering.** Filter widgets are one of the worst offenders in WooCommerce themes, often built as clickable divs with no keyboard support at all. If a customer cannot tab to a filter and activate it with Enter or Space, that is a failure.

**Cart.** Quantity steppers, remove buttons, and coupon fields all need labels. "Add to cart" buttons that only say "Add" in the accessible name are a problem when there are 20 of them on a category page. Cart updates need to be announced through a live region, otherwise a screen reader user has no idea anything happened.

**Checkout.** The highest-stakes part of the store, and where failures cost you money directly. Every field needs a programmatic label. Error messages need to be tied to the field they belong to and announced when they appear. Focus needs to move somewhere sensible after a validation error instead of dumping the user back at the top of the page.

**Your terms and conditions.** This one surprises people. The EAA uses a self-assessment mechanism for services. You assess your own compliance, and you have to publish information about how your service meets the requirements, in your general terms and conditions or an equivalent place. The compliance statement is not optional paperwork. It is part of the requirement, and it is the first thing an authority will look for.

## Why an accessibility widget will not save you

If you have ever searched for a quick fix, you have seen the ads. A little floating icon in the corner of your site, a monthly subscription, and a promise of instant compliance.

It does not work, and the reason is structural.

An overlay is JavaScript that runs after your page loads and tries to patch problems from the outside. It can bump up font sizes and invert colours, which some users appreciate. What it cannot reliably do is fix the underlying HTML. It cannot know that your unlabeled icon button is meant to be "Remove from cart". It cannot restructure a filter widget that was built without keyboard support. It cannot fix a custom checkout field that never had a label element.

Worse, overlays frequently interfere with the assistive technology people already use. Screen reader users have spent years configuring their setup, and an overlay that hijacks focus or injects its own ARIA on top of theirs makes things harder. Disability advocacy groups have said so publicly, and hundreds of accessibility practitioners have signed an open letter recommending against overlays entirely.

Then there is the legal problem. The EAA gives you presumption of conformity if you meet EN 301 549, and that standard describes the properties of the service itself, not of a script bolted onto it. If a regulator asks how your checkout meets the requirement for name, role and value, "we installed a widget" is not an answer.

Real compliance means changes at the code level. Correct semantic HTML, real labels, proper ARIA where ARIA is needed, keyboard support that works without a script layer papering over it.

## Enforcement is national, and it varies a lot

The EAA is enforced by each member state, using its own authority and its own penalty scheme. This is the part that catches multinational sellers off guard: you are not dealing with one regulator, you are potentially dealing with several.

**Germany** implemented the Act through the Barrierefreiheitsstärkungsgesetz, usually shortened to BFSG. Enforcement runs through a joint market surveillance body for the federal states, based in Magdeburg. It is one of the more concrete regimes, with fines that can reach six figures for serious or repeated non-compliance, and the authority can order a non-compliant service withdrawn from the market. Germany also has an active culture of consumer association and competitor complaints, so enforcement does not depend on a regulator noticing you unprompted.

**France** folded the EAA into an existing framework. It has required accessibility of certain online services since 2005 and already had a penalty structure, with fines per non-compliant service and higher amounts for repeat failures. Market surveillance sits with the consumer protection authority, the DGCCRF. France also expects services to publish an accessibility statement with a stated conformity level, which lines up neatly with the EAA's self-assessment requirement.

**The Netherlands** transposed the Act through its own implementation law, with supervision shared between the consumer and markets authority, the ACM, and the digital infrastructure inspectorate, the RDI. The Dutch approach leans on complaint handling, so a single customer complaint can start the process.

Other member states range from well resourced to barely staffed. Do not read a quiet regulator as a safe one. Enforcement capacity has been ramping up since the deadline, and the direction of travel is one way.

For context, the public sector has been under similar rules since 2016. The Web Accessibility Directive, (EU) 2016/2102, required government websites and apps to be accessible, to publish accessibility statements, and to offer a feedback mechanism. The EAA extends the same expectation to the private sector. The tooling, the auditors, and the standards are all mature already. Private companies are simply late to the party.

## What actually happens if you ignore it

Three things, roughly in order of likelihood.

**A complaint.** Every member state has to give consumers and consumer organisations a way to complain about a non-compliant service. This is the most common trigger. Someone cannot check out, they get annoyed, and they file. The authority contacts you and asks you to explain yourself.

**An enforcement order.** If the authority agrees there is a problem, it can require you to fix it within a set period. If you do not, it can escalate to fines or, in the more serious national regimes, an order restricting your service in that market. Penalty ceilings vary by country and can run to tens or hundreds of thousands of euros. The Directive requires penalties to be effective, proportionate, and dissuasive, which member states have interpreted with varying enthusiasm.

**Private legal action.** The Act requires member states to give consumers a route to court, and several countries also let consumer associations act on behalf of affected users. The US experience with the ADA is instructive: thousands of lawsuits a year, most settled quickly, most targeting e-commerce sites with obvious keyboard and screen reader failures. Europe is less litigious, but the exposure is real and it is new.

The quiet cost matters too. If your checkout does not work with a keyboard, a share of your traffic is abandoning at the last step and you are filing it under "cart abandonment" rather than "our form is broken".

## Practical steps to get compliant

Here is the order I would work in.

**1. Confirm your scope.** Do you sell to consumers in the EU? Are you over the microenterprise thresholds? Write the answer down with the date and the numbers you used. If a regulator ever asks, you want a record.

**2. Run an automated scan first.** Automated tools catch somewhere between 30 and 40 percent of WCAG issues, which is not enough on its own but it is the fastest way to find the obvious stuff. Missing alt text, contrast failures, and unlabeled form fields all show up immediately. Lighthouse and axe DevTools are both free and both fine for this.

**3. Do a keyboard pass by hand.** Unplug your mouse. Tab from the homepage to a completed order. Every interactive element should be reachable, every focused element should be visibly focused, and nothing should trap you. This takes 20 minutes and finds problems no scanner will.

**4. Test with a real screen reader.** NVDA on Windows is free. VoiceOver is built into macOS and iOS. Try to buy something from your own store with your eyes closed. It is uncomfortable the first time and it is the single most valuable thing on this list.

**5. Fix the code, starting with checkout.** Prioritise by revenue impact: checkout, cart, product page, category page, everything else. If you are running a standard WooCommerce setup, a lot of these fixes are repetitive and mechanical across hundreds of products, which is exactly the kind of work worth automating. The [WooCommerce Accessibility Fixer](/plugins/woocommerce-accessibility-fixer/) handles the common structural problems directly in your markup: alt text across your catalogue, accessible names on cart and product buttons, keyboard focus indicators, skip links, and ARIA labelling on the elements WooCommerce themes routinely leave bare. It is free and it works with any theme.

**6. Retest, then write your accessibility statement.** Publish it in your terms and conditions or somewhere equally findable. Say what standard you are measuring against (EN 301 549 / WCAG 2.1 AA), what conforms, what does not yet, and how someone can contact you about a problem. Honest partial compliance documented properly is a far better position than silence.

**7. Put it in your release process.** Accessibility rots. A new theme update, a new payment gateway, a new popup plugin, and you are back where you started. Run a scan before you deploy.

## How the Accessibility Fixer fits in

To be clear about what a plugin can and cannot do, because the whole point of the overlay section above was that shortcuts do not work.

The Accessibility Fixer is not an overlay. It does not inject a widget or a toolbar. It modifies the actual output of your WooCommerce store, so what changes is the HTML that screen readers, keyboards, and auditors see.

It handles the repetitive, catalogue-wide problems that are tedious to fix by hand: images with missing alt text, buttons and form controls without accessible names, missing focus indicators, absent skip links, and ARIA gaps in standard WooCommerce templates. If you have 800 products, this is the difference between an afternoon and a month.

What it will not do is redesign a custom theme, fix a third-party checkout plugin that renders its own broken markup, or write your accessibility statement for you. Nothing can. Treat it as the tool that clears out the bulk of the work so your remaining effort goes into the parts that genuinely need a human.

## Your EAA compliance checklist for WooCommerce

Work through these in order. Tick them off with dates so you have a paper trail.

1. **Confirm scope.** Selling to EU consumers, and over or under the microenterprise thresholds (10 employees, 2 million euros). Record the answer.
2. **Run an automated WCAG 2.1 AA scan** on your homepage, a category page, a product page, cart, and checkout. Fix everything it flags.
3. **Complete a keyboard-only purchase** from homepage to order confirmation. No traps, no invisible focus, no unreachable controls.
4. **Complete a screen reader purchase** using NVDA or VoiceOver. Note every point where you got stuck.
5. **Audit alt text across the whole catalogue.** Product images, gallery images, variation images, category banners.
6. **Check every form label** on checkout, registration, and account pages, including error messages tied to their fields.
7. **Verify colour contrast** at 4.5:1 for body text and 3:1 for large text and interactive components, including your sale badges and button hover states.
8. **Test at 200 percent zoom and on mobile.** Reflow matters, and mobile apps are explicitly in scope alongside websites.
9. **Publish an accessibility statement** in your terms and conditions naming EN 301 549 / WCAG 2.1 AA, listing known gaps, and giving a contact route for complaints.
10. **Schedule a re-audit** every quarter and after any theme or major plugin update.

The deadline already passed. Most WooCommerce accessibility problems are the same handful of issues repeated across thousands of pages, and a lot of the work is automatable.

Start with your checkout. That is where the law bites and where the money leaks.
