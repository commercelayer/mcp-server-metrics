---
description: >-
  A comprehensive list of the search query keys and allowed fields values for the return resource
---

# Search

To perform a search query on the return resource send a `POST` request to the `/returns/search` endpoint specifying in the payload the [query keys](search.md#query-keys) and [filter](filters.md) parameters like in the generic example below:

```json
{
  "search": {
    "limit": ...,
    "sort": "...",
    "sort_by": "...",
    "fields": [ "...", "...", ... ],
    "cursor": "..."
  },
  "filter": { ... }
}
```

{% hint style="info" %}
Please find more information on how search queries work [here](https://app.gitbook.com/o/-Lfu_B3DKew-kvoEWzTk/s/ASSiAvbL4nFnkl8plQy2/queries/search).
{% endhint %}

### Query keys

These are the keys you need to set when performing a search query:

<table><thead><tr><th>Key</th><th>Type</th><th data-type="checkbox">Required</th><th>Description</th><th>Values</th></tr></thead><tbody><tr><td><strong><code>limit</code></strong></td><td>Integer</td><td>false</td><td>The maximum number of records shown in the response.</td><td>Default is <code>50</code>, max is <code>100</code>.</td></tr><tr><td><strong><code>sort</code></strong></td><td>String</td><td>false</td><td>The way you want the results of the query to be sorted.</td><td>One of <code>asc</code> or <code>desc</code> (default is <code>desc</code>).</td></tr><tr><td><strong><code>sort_by</code></strong></td><td>String</td><td>false</td><td>The date field you want the results of the query sorted by.</td><td><a href="search.md#sort_by-values">Here</a> the full list of valid values for this key. Default is <code>return.current_date</code>.</td></tr><tr><td><strong><code>fields</code></strong></td><td>Array</td><td>true</td><td>The list of fields you want to be returned for each record in the response.</td><td><a href="search.md#field-values">Here</a> the full list of valid values for this key. Cannot be empty. Use the <code>.*</code> syntax to request all the attribute for a specific field.</td></tr><tr><td><strong><code>cursor</code></strong></td><td>String</td><td>false</td><td>The cursor pointing to a specific page in the paginated search results.</td><td>Every time you perform a search query you get the cursor to the next page in the <code>pagination</code> object.</td></tr></tbody></table>

### `sort_by` values

These are the valid values you can specify for the `sort_by` key of the search query:

[](SORT-BY-TABLE_START)

- `return.approved_at`
- `return.archived_at`
- `return.cancelled_at`
- `return.created_at`
- `return.current_date`
- `return.received_at`
- `return.rejected_at`
- `return.restocked_at`
- `return.shipped_at`
- `return.updated_at`


[](SORT-BY-TABLE_END)

### `field` values

These are the valid values you can specify for the `field` key of the search query:

[](FIELD-TABLE_START)

- `customer.*`
- `customer.email`
- `customer.group_name`
- `customer.id`
- `destination_address.*`
- `destination_address.business`
- `destination_address.city`
- `destination_address.country_code`
- `destination_address.geocoded`
- `destination_address.localized`
- `destination_address.state_code`
- `destination_address.zip_code`
- `market.*`
- `market.id`
- `market.name`
- `market.number`
- `origin_address.*`
- `origin_address.business`
- `origin_address.city`
- `origin_address.country_code`
- `origin_address.geocoded`
- `origin_address.localized`
- `origin_address.state_code`
- `origin_address.zip_code`
- `return.*`
- `return.aggregated_details`
- `return.approved_at`
- `return.archived`
- `return.archived_at`
- `return.cancelled_at`
- `return.created_at`
- `return.current_date`
- `return.id`
- `return.number`
- `return.order_id`
- `return.received_at`
- `return.reference`
- `return.reference_origin`
- `return.rejected_at`
- `return.shipped_at`
- `return.skus_count`
- `return.status`
- `return.updated_at`
- `return_line_items.*`
- `return_line_items.created_at`
- `return_line_items.line_item_code`
- `return_line_items.line_item_id`
- `return_line_items.line_item_item_type`
- `return_line_items.line_item_tax_amount`
- `return_line_items.line_item_tax_rate`
- `return_line_items.line_item_total_amount`
- `return_line_items.line_item_updated_at`
- `return_line_items.quantity`
- `return_line_items.restocked_at`
- `return_line_items.updated_at`
- `stock_location.*`
- `stock_location.id`
- `stock_location.name`
- `stock_location.reference`
- `stock_location.reference_origin`
- `tags.*`
- `tags.id`
- `tags.name`


[](FIELD-TABLE_END)