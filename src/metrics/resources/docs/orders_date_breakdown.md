---
description: >-
  A comprehensive list of the date breakdown query keys, allowed fields values, and operators for the order resource
---

# Date breakdown

To perform a date breakdown query on the order resource send a `POST` request to the `/orders/date_breakdown` endpoint specifying in the payload the [query keys](date-breakdown.md#query-keys) and [filter](filters.md) parameters like in the generic example below:

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
Please find more information on how date breakdown queries work [here](https://app.gitbook.com/o/-Lfu_B3DKew-kvoEWzTk/s/ASSiAvbL4nFnkl8plQy2/queries/date-breakdown).
{% endhint %}

### Query keys

These are the keys you need to set when performing a date breakdown query:

<table><thead><tr><th>Key</th><th>Type</th><th data-type="checkbox">Required</th><th>Description</th><th>Values</th></tr></thead><tbody><tr><td><strong><code>by</code></strong></td><td>String</td><td>true</td><td>The date field you want the results of the query aggragated by.</td><td>See the <a href="date-breakdown.md#by-values">related table</a> to check the full list of valid values for this key.</td></tr><tr><td><strong><code>field</code></strong></td><td>String</td><td>true</td><td>The field you want the metrics or statistics computed on.</td><td>See the <a href="date-breakdown.md#operators-and-field-values">related table</a> to check the full list of valid values for this key.</td></tr><tr><td><strong><code>operator</code></strong></td><td>String</td><td>true</td><td>The computing operator.</td><td>See the <a href="date-breakdown.md#operators-and-field-values">related table</a> to check the full list of valid operators based on the value you assigned to the <code>field</code> key.</td></tr><tr><td><strong><code>interval</code></strong></td><td>String</td><td>false</td><td>The time interval over which the metrics / stats are computed. The results will be aggregated by date accordingly.</td><td>One of <code>hour</code>, <code>day</code>, <code>week</code>, <code>month</code>, or <code>year</code> (default is <code>month</code>).</td></tr><tr><td><strong><code>breakdown</code></strong></td><td>Object</td><td>false</td><td>The optional breakdown (eventually nested). </td><td>See the <a href="breakdown.md">related section</a> for any information about the breakdown query.</td></tr></tbody></table>

### `by` values

These are the valid values you can specify for the `by` key of the date breakdown query:

[](BY-FIELD-TABLE_START)

| Value | Description |
| --- | ------ |
|**`order.approved_at`** | The date and time at which the order was approved (complete date plus hours, minutes and seconds — according to the [ISO 8601](https://www.w3.org/TR/NOTE-datetime) standard). |
|**`order.archived_at`** | The date and time at which the order was archived (complete date plus hours, minutes and seconds — according to the [ISO 8601](https://www.w3.org/TR/NOTE-datetime) standard). |
|**`order.cancelled_at`** | The date and time at which the order was cancelled (complete date plus hours, minutes and seconds — according to the [ISO 8601](https://www.w3.org/TR/NOTE-datetime) standard). |
|**`order.created_at`** | The date and time at which the order was created (complete date plus hours, minutes and seconds — according to the [ISO 8601](https://www.w3.org/TR/NOTE-datetime) standard). |
|**`order.fulfillment_updated_at`** | The date and time at which the order's fulfillment status was last updated (complete date plus hours, minutes and seconds — according to the [ISO 8601](https://www.w3.org/TR/NOTE-datetime) standard). |
|**`order.payment_updated_at`** | The date and time at which the order's payment status was last updated (complete date plus hours, minutes and seconds — according to the [ISO 8601](https://www.w3.org/TR/NOTE-datetime) standard). |
|**`order.placed_at`** | The date and time at which the order was placed (complete date plus hours, minutes and seconds — according to the [ISO 8601](https://www.w3.org/TR/NOTE-datetime) standard). |
|**`order.updated_at`** | The date and time at which the order was last updated (complete date plus hours, minutes and seconds — according to the [ISO 8601](https://www.w3.org/TR/NOTE-datetime) standard). |
|**`order.current_date`** | The date and time of the order's latest status change, regardless of the order's status (complete date plus hours, minutes and seconds — according to the [ISO 8601](https://www.w3.org/TR/NOTE-datetime) standard). |
|**`shipments.cancelled_at`** | The date and time at which the shipment status was cancelled (complete date plus hours, minutes and seconds — according to the [ISO 8601](https://www.w3.org/TR/NOTE-datetime) standard). |
|**`shipments.on_hold_at`** | The date and time at which the shipment status was put on hold (complete date plus hours, minutes and seconds — according to the [ISO 8601](https://www.w3.org/TR/NOTE-datetime) standard). |
|**`shipments.picking_at`** | The date and time at which the shipment was picked (complete date plus hours, minutes and seconds — according to the [ISO 8601](https://www.w3.org/TR/NOTE-datetime) standard). |
|**`shipments.packing_at`** | The date and time at which the shipment was packed (complete date plus hours, minutes and seconds — according to the [ISO 8601](https://www.w3.org/TR/NOTE-datetime) standard). |
|**`shipments.ready_to_ship_at`** | The date and time at which the shipment was ready to ship (complete date plus hours, minutes and seconds — according to the [ISO 8601](https://www.w3.org/TR/NOTE-datetime) standard). |
|**`shipments.shipped_at`** | The date and time at which the shipment was shipped (complete date plus hours, minutes and seconds — according to the [ISO 8601](https://www.w3.org/TR/NOTE-datetime) standard). |
|**`shipments.created_at`** | The date and time at which the shipment was created (complete date plus hours, minutes and seconds — according to the [ISO 8601](https://www.w3.org/TR/NOTE-datetime) standard). |
|**`shipments.updated_at`** | The date and time at which the shipment was updated (complete date plus hours, minutes and seconds — according to the [ISO 8601](https://www.w3.org/TR/NOTE-datetime) standard). |
|**`resource_errors.created_at`** | The date and time at which the resource error was created (complete date plus hours, minutes and seconds — according to the [ISO 8601](https://www.w3.org/TR/NOTE-datetime) standard). |
|**`resource_errors.updated_at`** | The date and time at which the resource error was updated (complete date plus hours, minutes and seconds — according to the [ISO 8601](https://www.w3.org/TR/NOTE-datetime) standard). |


[](BY-FIELD-TABLE_END)

### Operators and `field` values

These are the valid values you can specify for the `field` key of the date breakdown query and the related valid operators, based on that key:

[](FIELD-OPERATORS-TABLE_START)

| Value | Operators |
| --- | --------- |
|**`customer.id`** | <p>`cardinality`</p><p>`value_count`</p>|
|**`customer.email`** | <p>`cardinality`</p><p>`value_count`</p>|
|**`customer.group_name`** | <p>`cardinality`</p><p>`value_count`</p>|
|**`line_items.code`** | <p>`cardinality`</p><p>`value_count`</p>|
|**`line_items.discount`** | <p>`avg`</p><p>`max`</p><p>`min`</p><p>`sum`</p><p>`stats`</p>|
|**`line_items.id`** | <p>`cardinality`</p><p>`value_count`</p>|
|**`line_items.item_id`** | <p>`cardinality`</p><p>`value_count`</p>|
|**`line_items.options_amount`** | <p>`avg`</p><p>`max`</p><p>`min`</p><p>`sum`</p><p>`stats`</p>|
|**`line_items.quantity`** | <p>`avg`</p><p>`max`</p><p>`min`</p><p>`sum`</p><p>`stats`</p>|
|**`line_items.tax_amount`** | <p>`avg`</p><p>`max`</p><p>`min`</p><p>`sum`</p><p>`stats`</p>|
|**`line_items.tax_rate`** | <p>`avg`</p><p>`max`</p><p>`min`</p><p>`sum`</p><p>`stats`</p>|
|**`line_items.total_amount`** | <p>`avg`</p><p>`max`</p><p>`min`</p><p>`sum`</p><p>`stats`</p>|
|**`line_items.unit_amount`** | <p>`avg`</p><p>`max`</p><p>`min`</p><p>`sum`</p><p>`stats`</p>|
|**`line_items.options.id`** | <p>`cardinality`</p><p>`value_count`</p>|
|**`line_items.options.quantity`** | <p>`avg`</p><p>`max`</p><p>`min`</p><p>`sum`</p><p>`stats`</p>|
|**`line_items.options.total_amount`** | <p>`avg`</p><p>`max`</p><p>`min`</p><p>`sum`</p><p>`stats`</p>|
|**`line_items.options.unit_amount`** | <p>`avg`</p><p>`max`</p><p>`min`</p><p>`sum`</p><p>`stats`</p>|
|**`market.id`** | <p>`cardinality`</p>|
|**`market.number`** | <p>`cardinality`</p><p>`value_count`</p>|
|**`order.adjustment_amount`** | <p>`avg`</p><p>`max`</p><p>`min`</p><p>`sum`</p><p>`stats`</p>|
|**`order.adjustment_tax_amount`** | <p>`avg`</p><p>`max`</p><p>`min`</p><p>`sum`</p><p>`stats`</p>|
|**`order.adjustment_taxable_amount`** | <p>`avg`</p><p>`max`</p><p>`min`</p><p>`sum`</p><p>`stats`</p>|
|**`order.discount_amount`** | <p>`avg`</p><p>`max`</p><p>`min`</p><p>`sum`</p><p>`stats`</p>|
|**`order.duty_amount`** | <p>`avg`</p><p>`max`</p><p>`min`</p><p>`sum`</p><p>`stats`</p>|
|**`order.gift_card_code`** | <p>`value_count`</p>|
|**`order.gift_card_amount`** | <p>`avg`</p><p>`max`</p><p>`min`</p><p>`sum`</p><p>`stats`</p>|
|**`order.id`** | <p>`cardinality`</p><p>`value_count`</p>|
|**`order.line_item_options_count`** | <p>`avg`</p><p>`max`</p><p>`min`</p><p>`sum`</p><p>`stats`</p>|
|**`order.number`** | <p>`value_count`</p>|
|**`order.payment_method_amount`** | <p>`avg`</p><p>`max`</p><p>`min`</p><p>`sum`</p><p>`stats`</p>|
|**`order.payment_method_tax_amount`** | <p>`avg`</p><p>`max`</p><p>`min`</p><p>`sum`</p><p>`stats`</p>|
|**`order.payment_method_taxable_amount`** | <p>`avg`</p><p>`max`</p><p>`min`</p><p>`sum`</p><p>`stats`</p>|
|**`order.reference`** | <p>`cardinality`</p><p>`value_count`</p>|
|**`order.reference_origin`** | <p>`cardinality`</p><p>`value_count`</p>|
|**`order.shipments_count`** | <p>`avg`</p><p>`max`</p><p>`min`</p><p>`sum`</p><p>`stats`</p>|
|**`order.shipping_amount`** | <p>`avg`</p><p>`max`</p><p>`min`</p><p>`sum`</p><p>`stats`</p>|
|**`order.shipping_taxable_amount`** | <p>`avg`</p><p>`max`</p><p>`min`</p><p>`sum`</p><p>`stats`</p>|
|**`order.skus_count`** | <p>`avg`</p><p>`max`</p><p>`min`</p><p>`sum`</p><p>`stats`</p>|
|**`order.subtotal_amount`** | <p>`avg`</p><p>`max`</p><p>`min`</p><p>`sum`</p><p>`stats`</p>|
|**`order.subtotal_tax_amount`** | <p>`avg`</p><p>`max`</p><p>`min`</p><p>`sum`</p><p>`stats`</p>|
|**`order.subtotal_taxable_amount`** | <p>`avg`</p><p>`max`</p><p>`min`</p><p>`sum`</p><p>`stats`</p>|
|**`order.total_amount`** | <p>`avg`</p><p>`max`</p><p>`min`</p><p>`sum`</p><p>`stats`</p>|
|**`order.total_amount_with_taxes`** | <p>`avg`</p><p>`max`</p><p>`min`</p><p>`sum`</p><p>`stats`</p>|
|**`order.total_tax_amount`** | <p>`avg`</p><p>`max`</p><p>`min`</p><p>`sum`</p><p>`stats`</p>|
|**`order.total_taxable_amount`** | <p>`avg`</p><p>`max`</p><p>`min`</p><p>`sum`</p><p>`stats`</p>|
|**`order.seconds_in_draft`** | <p>`avg`</p><p>`max`</p><p>`min`</p><p>`stats`</p><p>`percentiles`</p>|
|**`order.seconds_in_approved`** | <p>`avg`</p><p>`max`</p><p>`min`</p><p>`stats`</p><p>`percentiles`</p>|
|**`order.seconds_in_placed`** | <p>`avg`</p><p>`max`</p><p>`min`</p><p>`stats`</p><p>`percentiles`</p>|
|**`order.refunds_total_amount_with_taxes`** | <p>`avg`</p><p>`max`</p><p>`min`</p><p>`sum`</p><p>`stats`</p>|
|**`order.total_amount_with_taxes_net_of_refunds`** | <p>`avg`</p><p>`max`</p><p>`min`</p><p>`sum`</p><p>`stats`</p>|
|**`refunds.id`** | <p>`value_count`</p>|
|**`refunds.amount`** | <p>`avg`</p><p>`max`</p><p>`min`</p><p>`sum`</p><p>`stats`</p>|
|**`refunds.number`** | <p>`value_count`</p>|
|**`shipments.id`** | <p>`cardinality`</p><p>`value_count`</p>|
|**`shipments.number`** | <p>`cardinality`</p><p>`value_count`</p>|
|**`shipments.reference`** | <p>`cardinality`</p><p>`value_count`</p>|
|**`shipments.reference_origin`** | <p>`cardinality`</p><p>`value_count`</p>|
|**`shipments.seconds_in_picking`** | <p>`avg`</p><p>`max`</p><p>`min`</p><p>`stats`</p><p>`percentiles`</p>|
|**`shipments.seconds_in_ready_to_ship`** | <p>`avg`</p><p>`max`</p><p>`min`</p><p>`stats`</p><p>`percentiles`</p>|
|**`shipments.stock_location.id`** | <p>`cardinality`</p><p>`value_count`</p>|
|**`shipments.stock_location.reference`** | <p>`cardinality`</p><p>`value_count`</p>|
|**`shipments.stock_location.reference_origin`** | <p>`cardinality`</p><p>`value_count`</p>|
|**`shipments.shipping_method.id`** | <p>`cardinality`</p><p>`value_count`</p>|
|**`shipments.shipping_method.reference`** | <p>`cardinality`</p><p>`value_count`</p>|
|**`shipments.shipping_method.reference_origin`** | <p>`cardinality`</p><p>`value_count`</p>|
|**`shipments.shipping_category.id`** | <p>`cardinality`</p><p>`value_count`</p>|
|**`shipments.shipping_category.reference`** | <p>`cardinality`</p><p>`value_count`</p>|
|**`shipments.shipping_category.reference_origin`** | <p>`cardinality`</p><p>`value_count`</p>|
|**`resource_errors.code`** | <p>`cardinality`</p><p>`value_count`</p>|
|**`resource_errors.id`** | <p>`cardinality`</p><p>`value_count`</p>|
|**`resource_errors.message`** | <p>`cardinality`</p><p>`value_count`</p>|


[](FIELD-OPERATORS-TABLE_END)