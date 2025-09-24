---
description: >-
  A comprehensive list of the stats query keys, allowed fields values, and operators for the return resource
---

# Stats

To perform a stats query on the return resource send a `POST` request to the `/returns/stats` endpoint specifying in the payload the [query keys](stats.md#query-keys) and [filter](filters.md) parameters like in the generic example below:

```json
{
  "stats": {
    "field": "...",
    "operator": "..."
  },
  "filter": { ... }
}
```

{% hint style="info" %}
Please find more information on how stats queries work [here](https://app.gitbook.com/s/ASSiAvbL4nFnkl8plQy2/getting-started/queries/stats).
{% endhint %}

### Query keys

These are the keys you need to set when performing a stats query:

<table><thead><tr><th>Key</th><th>Type</th><th data-type="checkbox">Required</th><th>Description</th><th>Values</th></tr></thead><tbody><tr><td><strong><code>field</code></strong></td><td>String</td><td>true</td><td>The field you want the metrics or statistics computed on.</td><td>See the <a href="stats.md#operators-and-field-values">table below</a> to check the full list of valid values for this key.</td></tr><tr><td><strong><code>operator</code></strong></td><td>String</td><td>true</td><td>The computing operator.</td><td>See the <a href="breakdown.md#operators-and-field-values">table below</a> to check the full list of valid operators based on the value you assigned to the <code>field</code> key.</td></tr></tbody></table>

### Operators and `field` values

These are the valid values you can specify for the `field` key of the stats query and the related valid operators, based on that key:

[](FIELD-OPERATORS-TABLE_START)

| Value | Operators |
| --- | --------- |
|**`customer.id`** | <p>`value_count`</p>|
|**`customer.email`** | <p>`value_count`</p>|
|**`customer.group_name`** | <p>`value_count`</p>|
|**`destination_address.business`** | <p>`value_count`</p>|
|**`destination_address.city`** | <p>`value_count`</p>|
|**`destination_address.country_code`** | <p>`value_count`</p>|
|**`destination_address.geocoded`** | <p>`value_count`</p>|
|**`destination_address.localized`** | <p>`value_count`</p>|
|**`destination_address.state_code`** | <p>`value_count`</p>|
|**`destination_address.zip_code`** | <p>`value_count`</p>|
|**`origin_address.business`** | <p>`value_count`</p>|
|**`origin_address.city`** | <p>`value_count`</p>|
|**`origin_address.country_code`** | <p>`value_count`</p>|
|**`origin_address.geocoded`** | <p>`value_count`</p>|
|**`origin_address.localized`** | <p>`value_count`</p>|
|**`origin_address.state_code`** | <p>`value_count`</p>|
|**`origin_address.zip_code`** | <p>`value_count`</p>|
|**`market.id`** | <p>`cardinality`</p><p>`value_count`</p>|
|**`market.number`** | <p>`cardinality`</p><p>`value_count`</p>|
|**`return.number`** | <p>`value_count`</p>|
|**`return.reference`** | <p>`value_count`</p>|
|**`return.reference_origin`** | <p>`value_count`</p>|
|**`return.status`** | <p>`value_count`</p>|
|**`return.id`** | <p>`cardinality`</p><p>`value_count`</p>|
|**`return.order_id`** | <p>`value_count`</p>|
|**`return.skus_count`** | <p>`avg`</p><p>`max`</p><p>`min`</p><p>`sum`</p><p>`stats`</p>|
|**`return_line_items.quantity`** | <p>`avg`</p><p>`max`</p><p>`min`</p><p>`sum`</p><p>`stats`</p>|
|**`return_line_items.line_item_id`** | <p>`value_count`</p>|
|**`return_line_items.line_item_code`** | <p>`value_count`</p>|
|**`return_line_items.line_item_item_type`** | <p>`value_count`</p>|
|**`return_line_items.line_item_total_amount`** | <p>`avg`</p><p>`max`</p><p>`min`</p><p>`sum`</p><p>`stats`</p>|
|**`return_line_items.line_item_tax_amount`** | <p>`avg`</p><p>`max`</p><p>`min`</p><p>`sum`</p><p>`stats`</p>|
|**`return_line_items.line_item_tax_rate`** | <p>`avg`</p><p>`max`</p><p>`min`</p><p>`sum`</p><p>`stats`</p>|
|**`stock_location.id`** | <p>`value_count`</p>|
|**`stock_location.name`** | <p>`value_count`</p>|
|**`stock_location.reference`** | <p>`value_count`</p>|
|**`stock_location.reference_origin`** | <p>`value_count`</p>|


[](FIELD-OPERATORS-TABLE_END)