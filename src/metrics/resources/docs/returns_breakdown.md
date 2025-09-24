---
description: >-
  A comprehensive list of the breakdown query keys, allowed fields values, and operators for the return resource
---

# Breakdown

To perform a breakdown query on the return resource send a `POST` request to the `/returns/breakdown` endpoint specifying in the payload the [query keys](breakdown.md#query-keys) and [filter](filters.md) parameters like in the generic example below:

```json
{
  "breakdown": {
    "by": "...",
    "field": "...",
    "operator": "...",
    "condition": { ... },
    "sort": "...",
    "limit": ...,
    "breakdown": {
      "by": "...",
      "field": "...",
      "operator": "...",
      "condition": { ... },
      "sort": "...",
      "limit": ...
    }
  },
  "filter": { ... }
}
```

{% hint style="info" %}
Please find more information on how breakdown queries work [here](https://app.gitbook.com/o/-Lfu_B3DKew-kvoEWzTk/s/ASSiAvbL4nFnkl8plQy2/queries/breakdown).
{% endhint %}

### Query keys

These are the keys you need to set when performing a breakdown query:

<table><thead><tr><th>Key</th><th>Type</th><th data-type="checkbox">Required</th><th>Description</th><th>Values</th></tr></thead><tbody><tr><td><strong><code>by</code></strong></td><td>String</td><td>true</td><td>The field you want the results of the query aggragated by.</td><td>See the <a href="breakdown.md#nestable-breakdowns-and-by-values">related table</a> to check the full list of valid values for this key.</td></tr><tr><td><strong><code>field</code></strong></td><td>String</td><td>true</td><td>The field you want the metrics or statistics computed on.</td><td>See the <a href="breakdown.md#operators-and-field-values">related table</a> to check the full list of valid values for this key.</td></tr><tr><td><strong><code>operator</code></strong></td><td>String</td><td>true</td><td>The computing operator.</td><td>See the <a href="breakdown.md#operators-and-field-values">related table</a> to check the full list of valid operators based on the value you assigned to the <code>field</code> key.</td></tr><tr><td><strong><code>condition</code></strong></td><td>Object</td><td>false</td><td>An additional constraint to fine-tune the set of records shown in the response, applied to the computed results of the query. It is available for operators that return single numeric (float or integer) values. </td><td><p>One of:<br><code>"eq": ...</code></p><p><code>"ne": ...</code></p><p><code>"gt": ...</code></p><p><code>"gte": ...</code></p><p><code>"lt": ...</code></p><p><code>"lte": ...</code></p><p><code>"gt_lt": [...]</code></p><p><code>"gte_lte": [...]</code></p><p><code>"gte_lt": [...]</code></p><p><code>"gt_lte": [...]</code><br>(default is no condition).</p></td></tr><tr><td><strong><code>sort</code></strong></td><td>String</td><td>false</td><td>The way you want the results of the query to be sorted.</td><td>One of <code>asc</code> or <code>desc</code> (default is <code>desc</code>).</td></tr><tr><td><strong><code>limit</code></strong></td><td>Integer</td><td>false</td><td>The maximum number of records shown in the response.</td><td>Default is <code>10</code>, max is <code>100</code>.</td></tr><tr><td><strong><code>breakdown</code></strong></td><td>Object</td><td>false</td><td>The optional nested breakdown.</td><td>See the <a href="breakdown.md#nestable-breakdowns-and-by-values">related table</a> to check full list of fobidden values for the nested breakdown <code>by</code> key, based on the value you assigned to the parent breakdown <code>by</code> key.</td></tr></tbody></table>

### Operators and `field` values

These are the valid values you can specify for the `field` key of the breakdown query and the related valid operators, based on that key:

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

### Nestable breakdowns and `by` values

These are the valid values you can specify for the `by` key of the breakdown query and the related _forbidden_ values for the `by` key of the nested breakdown, based on the `by` key of the parent breakdown (i.e. for each row of the table below the full list of the _valid_ values for the `by` key of the nested breakdown is given by all the values in the "Value" column except the values in the row's "Forbidden nesting" cell):

[](NESTABLE-BY-TABLE_START)

| Value | Forbidden nesting |
| --- | ------ |
|**`customer.email`** | |
|**`customer.group_name`** | |
|**`destination_address.business`** | <p>`destination_address.geocoded`</p> <p>`destination_address.localized`</p> <p>`customer.*`</p> <p>`origin_address.*`</p> |
|**`destination_address.city`** | <p>`destination_address.country_code`</p> <p>`destination_address.state_code`</p> <p>`customer.*`</p> <p>`origin_address.*`</p> |
|**`destination_address.country_code`** | <p>`customer.*`</p> <p>`origing_address.*`</p> |
|**`destination_address.geocoded`** | <p>`destination_address.*`</p> <p>`customer.*`</p> <p>`origing_address.*`</p> |
|**`destination_address.localized`** | <p>`destination_address.*`</p> <p>`customer.*`</p> <p>`origing_address.*`</p> |
|**`destination_address.state_code`** | <p>`destination_address.country_code`</p> <p>`customer.*`</p> <p>`origing_address.*`</p> |
|**`destination_address.zip_code`** | <p>`destination_address.country_code`</p> <p>`destination_address.city`</p> <p>`destination_address.geocoded`</p> <p>`destination_address.localized`</p> <p>`customer.*`</p> <p>`origing_address.*`</p> |
|**`origin_address.business`** | <p>`origin_address.geocoded`</p> <p>`origin_address.localized`</p> <p>`customer.*`</p> <p>`destination_address.*`</p> |
|**`origin_address.city`** | <p>`origin_address.country_code`</p> <p>`origin_address.state_code`</p> <p>`customer.*`</p> <p>`destination_address.*`</p> |
|**`origin_address.country_code`** | <p>`customer.*`</p> <p>`destrintation_address.*`</p> |
|**`origin_address.geocoded`** | <p>`destination_address.*`</p> <p>`customer.*`</p> <p>`origing_address.*`</p> |
|**`origin_address.localized`** | <p>`destination_address.*`</p> <p>`customer.*`</p> <p>`origing_address.*`</p> |
|**`origin_address.state_code`** | <p>`origin_address.country_code`</p> <p>`customer.*`</p> <p>`destination_address.*`</p> |
|**`origin_address.zip_code`** | <p>`origin_address.country_code`</p> <p>`origin_address.city`</p> <p>`origin_address.geocoded`</p> <p>`origin_address.localized`</p> <p>`customer.*`</p> <p>`destination_address.*`</p> |
|**`market.id`** | |
|**`market.name`** | |
|**`market.number`** | |
|**`return.reference`** | |
|**`return.reference_origin`** | |
|**`return.status`** | |
|**`return_line_items.line_item_item_type`** | |
|**`stock_location.name`** | |
|**`stock_location.reference`** | |
|**`stock_location.reference_origin`** | |
|**`tags.id`** | |
|**`tags.name`** | |


[](NESTABLE-BY-TABLE_END)

{% hint style="info" %}
Remember also that you cannot group the nested breakdown by the same field by which you're already grouping the parent breakdown.
{% endhint %}