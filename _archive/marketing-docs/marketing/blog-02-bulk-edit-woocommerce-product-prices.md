# How to Bulk Edit WooCommerce Product Prices (Without Breaking Your Store)

*Published: 2026-05-xx*
*Target keyword: woocommerce bulk edit prices, how to bulk edit woocommerce products*
*Target length: 1,800 words*
*Status: Draft*

---

You have 300 products. It's two weeks before Black Friday. Your supplier just told you their costs went up 12%.

You open WooCommerce, select all 300 products, click "Edit," and wait.

The page freezes. Your browser tab turns beachball. You refresh. Half your products show the old prices. The other half show nothing. You have no idea which ones updated and which ones didn't.

Sound familiar?

The native WooCommerce bulk editor was not designed for this. It was designed for simple status changes — mark 50 products as "out of stock," hide 20 from the catalog. For price updates on any real scale, it breaks down fast.

This guide shows you exactly how to bulk edit WooCommerce product prices — the native method, the database method, the CSV method, and the plugin method — so you can pick the right approach for your situation and avoid the pitfalls that destroy store data.

---

## The Native WooCommerce Bulk Editor: What It Actually Does

Let's be precise about what WooCommerce can do out of the box.

When you select products in the admin and choose "Edit" from the Bulk Actions dropdown, WooCommerce gives you access to these fields:

- **Sale status** (put on sale / remove sale)
- **Catalog visibility** (catalog / search / hidden)
- **Tax status** (taxable / shipping only / none)
- **Tax class**
- **Stock status** (in stock / out of stock / on backorder)
- **Backorders** (allow / do not allow / allow, but notify customer)
- **Stock quantity** (but only if you're using stock management at the product level)

**It cannot bulk edit prices.** Not regular price. Not sale price. Not cost price. Nothing related to money.

This isn't a bug — WooCommerce deliberately excluded price fields from bulk edit because price changes are financially sensitive and the team didn't want stores accidentally wiping price data across their entire catalog with one misclick.

What this means practically: if you want to change prices in bulk, you need one of the methods below.

---

## Method 1: Direct Database Edit

**Best for:** Developers only. Seriously.

Every WooCommerce product is a custom post type. Prices are stored in the `_price` and `_sale_price` post meta fields in `wp_postmeta`. A SQL query can update prices across your entire catalog in milliseconds.

```sql
-- Increase price of all products in a specific category by 10%
UPDATE wp_postmeta
SET meta_value = ROUND(meta_value * 1.10, 2)
WHERE meta_key IN ('_price', '_regular_price')
AND post_id IN (
  SELECT ID FROM wp_posts p
  JOIN wp_term_relationships tr ON p.ID = tr.object_id
  JOIN wp_term_taxonomy tt ON tr.term_taxonomy_id = tt.term_taxonomy_id
  WHERE p.post_type = 'product'
  AND tt.term_id = 42  -- your category term_id
);
```

**The problems:**

- **No preview.** You're changing live data directly. If your math is wrong, every affected product now has the wrong price.
- **No undo.** The only way to reverse a bad SQL update is to restore from backup.
- **No formula support.** You can add 10% but you can't say "set sale price to 20% below regular price" in one query.
- **Variations are separate rows.** Updating `_price` on a variable product doesn't automatically update its children. You need a separate query for each variation.
- **Cache invalidation.** WooCommerce caches price data aggressively. After a direct SQL update, you may need to manually clear the object cache or the prices won't reflect on the frontend.

If you're not comfortable writing and debugging SQL queries, don't do this. The risk of accidental data destruction is too high.

---

## Method 2: Import/Export CSV

The WooCommerce CSV import/export tool is the official path for moving product data in bulk. It's what most store owners reach for when they need to update prices.

**How it works:**
1. Go to Products → All Products → Export. Select the products you want (by category, date range, or all).
2. Open the CSV. Find the `_price`, `_regular_price`, and `_sale_price` columns.
3. Update the values. Be careful with formatting — WooCommerce is strict about number formats.
4. Go to Products → Import. Upload your edited CSV. Map the fields. Click "Run importer."

**Where it breaks down:**

**Variations.** WooCommerce exports variations as separate rows, each tied to a parent product by SKU. If you update a variation's price in the CSV, you need to make sure the parent product's price is handled correctly — otherwise your variation shows one price in the grid and another at checkout.

**Preview is impossible.** When you upload the CSV, WooCommerce shows you a preview of what will be imported. But if you've already exported, edited, and are re-uploading, there's no "here's what will actually change" confirmation before the data goes live.

**Round-trip risk.** Export → edit → import is a one-way operation. If you export on Monday, edit on Tuesday, and import on Wednesday, any products added or changed between export and import will get overwritten.

**Error handling is poor.** If the importer hits a malformed row, it either skips the entire row or applies partial data. You won't always know which products were affected until you check the store manually.

**It's workable for small stores.** If you have 20 products and update prices quarterly, CSV is fine. For anything larger or more frequent, it becomes a liability.

---

## Method 3: Bulk Edit Plugin (Recommended)

A purpose-built bulk editor sits inside your WooCommerce admin and gives you a spreadsheet-style view of all your products — with inline editing, preview mode, undo, and formula support.

This is what the WooCommerce Smart Bulk Editor provides.

### What it looks like

Instead of WooCommerce's default products table, you get a filterable grid:

- **Filter by price range** — show only products between $20 and $50
- **Filter by category, stock status, product type** — isolate exactly the products you want to update
- **Sort by any column** — price ascending, stock descending, date modified

You edit prices directly in the grid. Type the new price. Hit Enter. Move to the next cell.

### Preview mode: the critical feature

Before you commit any changes, preview mode shows you exactly what will change:

| Product | Regular Price (old) | Regular Price (new) | Sale Price (old) | Sale Price (new) |
|---------|--------------------|--------------------|--------------------|--------------------|
| Blue T-Shirt (S) | $24.99 | $27.49 | — | $22.99 |
| Blue T-Shirt (M) | $24.99 | $27.49 | — | $22.99 |
| Red T-Shirt (L) | $29.99 | $32.99 | $19.99 | $24.99 |

This is the screen that prevents disasters. You see the old value, the new value, and the affected products — all at once, before anything goes live.

### Undo: your safety net

Made a mistake? One click rolls back the last batch operation. This isn't WooCommerce's undo — which doesn't exist in the native bulk editor. This is a genuine rollback that reverts the data to exactly what it was before the change.

### Formula support

Instead of typing each price manually, you can apply formulas:

- **Increase all selected by 10%** — multiply current `_price` by 1.10
- **Set sale price to 20% below regular** — `_sale_price = _regular_price * 0.80`
- **Round to .99** — `_price = ROUND(_price) - 0.01`

For your Black Friday scenario: select all 300 products, set a formula to `regular_price * 1.10`, set sale price to `regular_price * 0.85`, click Preview, verify the numbers look right, then commit.

### Variation support

Variable products show each variation as its own row. You can:

- Edit prices for specific variations only (e.g., all Medium sizes)
- Use attribute filters to target subgroups (all products with attribute "season:spring")
- Update variation stock across all children of a variable product in one operation

---

## Common Mistakes When Bulk Editing Prices

### Not using preview mode

The preview exists specifically so you don't have to find out what changed by checking the frontend. Always use it. Always.

### Bulk updating without checking affected products first

Before you bulk-edit, use the filter to verify you're selecting exactly the products you intend. Run the filter, count the results, confirm the list looks right — then apply the change.

### Forgetting variations

A variable product's displayed price comes from its children. If you bulk-update the parent's price but the children's prices are set differently, you'll get inconsistent behavior at checkout. Always expand variable products and check their variations before bulk editing.

### Not checking your shop after a bulk update

WooCommerce has aggressive object caching. After a bulk price update, clear the WooCommerce transient cache and verify the frontend reflects the new prices. This is especially important if you're using a caching plugin.

---

## FAQ: WooCommerce Bulk Price Editing

**Can I bulk edit sale prices in WooCommerce?**
Not natively. The built-in bulk editor does not include price fields. You need a plugin or CSV import to update sale prices.

**Will bulk editing prices affect my product variations?**
Only if the bulk edit tool is variation-aware. The native WooCommerce bulk editor does not touch variation data. CSV imports handle variations but require correct formatting. A good bulk edit plugin shows variations as rows and updates them individually.

**How do I bulk edit prices by category?**
In WooCommerce, use Products → All Products → Filter by category, then select all filtered results and apply your bulk action. If you're using a bulk edit plugin, use the category filter in the grid view to narrow down to exactly the products you want before making changes.

**Can I undo a bulk price change?**
Not in WooCommerce natively. The WooCommerce Smart Bulk Editor includes an undo function that reverts the last batch operation to its pre-change state.

**What's the fastest way to update 500 product prices?**
A bulk edit plugin with inline editing and preview mode is the fastest path for large catalogs. CSV import is viable but requires careful preparation. Direct SQL is fastest for developers but has no safety net.

**How do I add a percentage increase to all my product prices?**
In the WooCommerce Smart Bulk Editor, select the products, choose "Apply formula," enter `price * 1.10` (for a 10% increase), preview the results, then commit.

---

## Ready to Bulk Edit Without the Risk?

The native tools have real limits. SQL is powerful but dangerous without a safety net. CSV works for small stores but becomes unreliable as your catalog grows.

The [WooCommerce Smart Bulk Editor](/) gives you inline editing, preview mode, undo, formula support, and variation awareness — all inside your existing WooCommerce admin. No new tab. No import/export. Just your products, editable.

**[Try the free version](/)** — no account needed, no credit card. Or [sign up for early access](/) to get notified when the Pro features (formulas, batch operations, advanced filters) launch.

---

*Was this guide useful? Have a bulk editing problem we didn't cover? [Get in touch](/contact).*
