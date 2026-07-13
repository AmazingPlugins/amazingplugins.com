---
title: How to Delete Old WooCommerce Orders in Bulk (Complete Guide)
description: >-
  Learn how to safely delete old WooCommerce orders - pending, failed, cancelled,
  and draft orders - in bulk, with and without plugins.
pubDate: 2026-07-14T00:00:00.000Z
author: Harun Ray
tags:
  - WooCommerce
  - Orders
  - Database Cleanup
  - Store Management
gscSubmitted: false
---

If your WooCommerce orders list is cluttered with old pending payments, failed checkouts, and cancelled requests, you are not alone. Every WooCommerce store accumulates junk orders over time. The real orders you need to manage get buried, and your database grows with records that will never be completed.

Here is how to safely delete old WooCommerce orders in bulk - manually, via SQL, and with a free plugin.

## Why Delete Old Orders?

| Reason | Detail |
|--------|--------|
| Cleaner admin | Find real orders faster without scrolling through junk |
| Database performance | Fewer records means faster queries on the orders table and related meta tables |
| Accurate reporting | Old pending orders that will never complete skew your conversion rate and revenue reports |
| GDPR/Privacy | Removing old abandoned carts containing customer data reduces compliance risk |

**Important:** This guide is for permanently deleting orders. Make a full database backup before proceeding.

## Which Order Statuses Are Safe to Delete?

Not all orders should be deleted. Here is a quick reference:

| Status | Safe to Delete? | Notes |
|--------|----------------|-------|
| Completed | No | These are legitimate sales records |
| Processing | No | Active orders being fulfilled |
| On Hold | No | May be awaiting payment or review |
| Pending Payment | Yes, after 30 days | Most pending payments never complete |
| Failed | Yes, after 30 days | Payment failed and customer never retried |
| Cancelled | Yes, after 7 days | Order was cancelled intentionally |
| Draft | Yes, at any time | Incomplete orders, never submitted |
| Trashed | Yes, at any time | Already in the trash, permanent delete is safe |

## Method 1: Manual Deletion via WooCommerce Admin (Small Batches)

If you only have 10-20 old orders, the built-in bulk action works:

1. Go to WooCommerce > Orders
2. Use the date filter to show orders older than a certain date
3. Check the boxes for the orders you want to remove
4. Select "Move to Trash" from the Bulk Actions dropdown
5. Click Apply
6. To permanently delete, go to the Trash tab and repeat the process

This is slow for more than 20 orders because WooCommerce paginates at 20 orders per page.

## Method 2: SQL Query (Advanced Users)

If you are comfortable with SQL, you can delete orders directly from the database. The safest approach handles both the main order posts and their related metadata:

```sql
-- First, find the IDs of orders older than 90 days with stale statuses
SELECT ID FROM wp_posts
WHERE post_type = 'shop_order'
  AND post_status IN ('wc-pending', 'wc-failed', 'wc-cancelled', 'wc-draft')
  AND post_date < DATE_SUB(NOW(), INTERVAL 90 DAY);
```

**Run these queries one at a time, not together:**

```sql
-- Delete order items
DELETE oi FROM wp_woocommerce_order_items oi
INNER JOIN wp_posts p ON oi.order_id = p.ID
WHERE p.post_type = 'shop_order'
  AND p.post_status IN ('wc-pending', 'wc-failed', 'wc-cancelled', 'wc-draft')
  AND p.post_date < DATE_SUB(NOW(), INTERVAL 90 DAY);

-- Delete order item meta
DELETE oim FROM wp_woocommerce_order_itemmeta oim
INNER JOIN wp_woocommerce_order_items oi ON oim.order_item_id = oi.order_item_id
INNER JOIN wp_posts p ON oi.order_id = p.ID
WHERE p.post_type = 'shop_order'
  AND p.post_status IN ('wc-pending', 'wc-failed', 'wc-cancelled', 'wc-draft');

-- Delete order meta
DELETE pm FROM wp_postmeta pm
INNER JOIN wp_posts p ON pm.post_id = p.ID
WHERE p.post_type = 'shop_order'
  AND p.post_status IN ('wc-pending', 'wc-failed', 'wc-cancelled', 'wc-draft');

-- Delete the orders themselves
DELETE FROM wp_posts
WHERE post_type = 'shop_order'
  AND post_status IN ('wc-pending', 'wc-failed', 'wc-cancelled', 'wc-draft')
  AND post_date < DATE_SUB(NOW(), INTERVAL 90 DAY);
```

**Warning:** If your WP table prefix is not `wp_`, replace it with your actual prefix. Always test on a staging site first.

## Method 3: WP-CLI (For Developers)

If you have command line access, WP-CLI is the fastest manual method:

```bash
# Delete all pending orders older than 90 days
wp post delete $(wp post list --post_type=shop_order --post_status=wc-pending \
  --posts_per_page=-1 --format=ids \
  --year="<$(date -d '-90 days' +%Y)") --force
```

## Method 4: Free Plugin (Easiest for Most Store Owners)

The <a href="https://github.com/AmazingPlugins/stale-order-cleaner-for-woocommerce">Stale Order Cleaner for WooCommerce</a> plugin gives you a visual interface under WooCommerce > Order Cleaner. It shows exactly how many stale orders you have, lets you filter by status and minimum age, previews which orders will be deleted, and removes them in one click.

**What it includes:**
- Summary cards showing pending, failed, cancelled, draft, and trashed order counts
- Status checkboxes to select which types to clean
- Age filter (7, 14, 30, 60, 90, 180, or 365 days)
- Dry-run preview before any deletion happens
- One-click bulk delete with confirmation
- HPOS compatible (works with High-Performance Order Storage)

It is 100% free with no upsells.

## How Often Should You Clean Old Orders?

| Store Volume | Recommended Frequency |
|-------------|---------------------|
| Small (<50 orders/month) | Every 6 months |
| Medium (50-500 orders/month) | Every 3 months |
| Large (500+ orders/month) | Monthly |

## Does Deleting Orders Affect WooCommerce Reports?

Yes. Deleting old pending and failed orders can change your WooCommerce analytics:
- **Conversion rate goes up** because pending orders that will never complete are removed from the denominator
- **Revenue reports become more accurate** because only completed orders remain
- **Customer counts may decrease** if deleted orders were the customer's only interaction

This is a good thing - your reports become a more accurate reflection of actual sales.

## The Safe Way

The safest workflow is always: scan first (dry run), verify what will be deleted, then delete. This is exactly how the <a href="https://github.com/AmazingPlugins/stale-order-cleaner-for-woocommerce">Stale Order Cleaner for WooCommerce</a> works. Scan, preview, confirm, done. No SQL, no WP-CLI, no risk of deleting the wrong orders.

**Related reading:** <a href="/plugins/">All AmazingPlugins WordPress Plugins</a> - free tools for WooCommerce store owners.
