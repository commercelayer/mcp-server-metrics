---
description: >-
  A comprehensive list of the date breakdown query keys, allowed fields values, and operators for the return resource
---

# Date breakdown

To perform a date breakdown query on the return resource send a `POST` request to the `/returns/date_breakdown` endpoint specifying in the payload the [query keys](date-breakdown.md#query-keys) and [filter](filters.md) parameters like in the generic example below:

```json
{
  "date_breakdown": {
    "by": "...",
    "field": "...",
    "operator": "...",
    "interval": "...",
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
    }
  },
  "filter": { ... }
}
```

{% hint style="info" %}
Please find more information on how date breakdown queries work [here](https://app.gitbook.com/s/ASSiAvbL4nFnkl8plQy2/getting-started/queries/date-breakdown).
{% endhint %}

### Query keys

These are the keys you need to set when performing a date breakdown query:

<table><thead><tr><th>Key</th><th>Type</th><th data-type="checkbox">Required</th><th>Description</th><th>Values</th></tr></thead><tbody><tr><td><strong><code>by</code></strong></td><td>String</td><td>true</td><td>The date field you want the results of the query aggragated by.</td><td>See the <a href="date-breakdown.md#by-values">related table</a> to check the full list of valid values for this key.</td></tr><tr><td><strong><code>field</code></strong></td><td>String</td><td>true</td><td>The field you want the metrics or statistics computed on.</td><td>See the <a href="date-breakdown.md#operators-and-field-values">related table</a> to check the full list of valid values for this key.</td></tr><tr><td><strong><code>operator</code></strong></td><td>String</td><td>true</td><td>The computing operator.</td><td>See the <a href="date-breakdown.md#operators-and-field-values">related table</a> to check the full list of valid operators based on the value you assigned to the <code>field</code> key.</td></tr><tr><td><strong><code>interval</code></strong></td><td>String</td><td>false</td><td>The time interval over which the metrics / stats are computed. The results will be aggregated by date accordingly.</td><td>One of <code>hour</code>, <code>day</code>, <code>week</code>, <code>month</code>, or <code>year</code> (default is <code>month</code>).</td></tr><tr><td><strong><code>breakdown</code></strong></td><td>Object</td><td>false</td><td>The optional breakdown (eventually nested). </td><td>See the <a href="breakdown.md">related section</a> for any information about the breakdown query.</td></tr></tbody></table>

### `by` values

These are the valid values you can specify for the `by` key of the date breakdown query:

[](BY-FIELD-TABLE_START)

| Value | Description |
| --- | ------ |
|**`return.approved_at`** | The date and time at which the return was approved (complete date plus hours, minutes and seconds — according to the [ISO 8601](https://www.w3.org/TR/NOTE-datetime) standard). |
|**`return.archived_at`** | The date and time at which the return was archived (complete date plus hours, minutes and seconds — according to the [ISO 8601](https://www.w3.org/TR/NOTE-datetime) standard). |
|**`return.cancelled_at`** | The date and time at which the return was cancelled (complete date plus hours, minutes and seconds — according to the [ISO 8601](https://www.w3.org/TR/NOTE-datetime) standard). |
|**`return.created_at`** | The date and time at which the return was created (complete date plus hours, minutes and seconds — according to the [ISO 8601](https://www.w3.org/TR/NOTE-datetime) standard). |
|**`return.received_at`** | The date and time at which the return was received (complete date plus hours, minutes and seconds — according to the [ISO 8601](https://www.w3.org/TR/NOTE-datetime) standard). |
|**`return.rejected_at`** | The date and time at which the return was rejected (complete date plus hours, minutes and seconds — according to the [ISO 8601](https://www.w3.org/TR/NOTE-datetime) standard). |
|**`return.shipped_at`** | The date and time at which the return was shipped (complete date plus hours, minutes and seconds — according to the [ISO 8601](https://www.w3.org/TR/NOTE-datetime) standard). |
|**`return.updated_at`** | The date and time at which the return was last updated (complete date plus hours, minutes and seconds — according to the [ISO 8601](https://www.w3.org/TR/NOTE-datetime) standard). |
|**`return.current_date`** | The date and time of the return's latest status change, regardless of the return's status (complete date plus hours, minutes and seconds — according to the [ISO 8601](https://www.w3.org/TR/NOTE-datetime) standard). |


[](BY-FIELD-TABLE_END)

### Operators and `field` values

These are the valid values you can specify for the `field` key of the date breakdown query and the related valid operators, based on that key:

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