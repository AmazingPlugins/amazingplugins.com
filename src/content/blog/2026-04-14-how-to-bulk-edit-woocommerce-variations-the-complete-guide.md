---
title: "How to Bulk Edit WooCommerce Variations (The Complete Guide)"
description: "Everything you need to know about bulk editing variable product variations in WooCommerce — including attributes, prices, stock, and shipping classes across hundreds of variants at once."
pubDate: 2026-04-14
author: Harun Ray
tags:
  - WooCommerce
  - Bulk Edit
  - Variations
---

|---|---|
| `_price` | The variation's current price (sale or regular) |
| `_regular_price` | The variation's regular price |
| `_sale_price` | The variation's sale price (if active) |
| `_stock` | Stock quantity for this variation |
| `_weight` | Variation weight |
| `_dimensions` | Length, width, height |
| `attribute_pa_color` | The "color" attribute value (e.g., "blue") |
| `attribute_pa_size` | The "size" attribute value (e.g., "large") |

Each attribute is stored as a separate meta row. So a single variation might have 8-10 rows in `wp_postmeta` in addition to its main product record.

This is why CSV imports for variations are error-prone and why direct database edits for variations are particularly dangerous — you're touching multiple related rows per variation.

---

## What to Look for in a Variation-Friendly Bulk Editor

If you're going to use a bulk edit tool, it needs to handle variations properly. Here's what to check before you commit:

### 1. Variations visible as rows in the grid

The tool should show each variation as its own row in the editing grid — not buried in a modal or hidden behind a product expand. You should be able to see all 30 variations for your t-shirt product simultaneously, scroll through them, and edit them inline.

### 2. Attribute-based filtering

The filter system should let you filter by attribute value. "Show me all variations where attribute_size = Large" is the most basic operation you need. Without this, you're manually clicking through every variation to find the ones you want.

### 3. Inline editing at the variation level

You should be able to click any cell in any variation's row and type the new value directly — no modal, no "Edit Variation" form, no page reload. It should work like a spreadsheet.

### 4. Batch operations with formula support

Beyond individual cell edits, you need bulk formulas: "multiply all selected prices by 1.10," "add $2 to all stock quantities," "set sale price to regular price minus 20%."

### 5. Preview and undo

Preview shows old vs new values before committing. Undo lets you roll back the last operation. Both are non-negotiable for variation editing — the complexity is too high for operations without a safety net.

---

## Method 1: Manual (The Baseline)

Before using any tool, understand what the native WooCommerce UI actually provides.

To edit variations individually:

1. Go to Products → All Products
2. Click the variable product
3. Scroll to the Product Data panel, select "Variable product"
4. Click "Variations" in the left sidebar of the product data panel
5. Click "Expand all" — this shows all 30 variations at once
6. Click the arrow next to each variation to expand its fields
7. Edit the fields you need to change
8. Click "Save changes"

|---|---|---|---|---|
| TSHIRT-Blue-L | Large | Blue | $24.99 | $26.99 |
| TSHIRT-Black-L | Large | Black | $24.99 | $26.99 |
| TSHIRT-Red-L | Large | Red | $26.99 | $29.15 |
| ... | ... | ... | ... | ... |

Review this. If it looks right, click Commit. The changes go live immediately.

