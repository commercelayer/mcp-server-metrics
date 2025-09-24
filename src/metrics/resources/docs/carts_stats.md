---
description: >-
  A comprehensive list of the stats query keys, allowed fields values, and operators for the cart resource
---

# Stats

To perform a stats query on the cart resource send a `POST` request to the `/carts/stats` endpoint specifying in the payload the [query keys](stats.md#query-keys) and [filter](filters.md) parameters like in the generic example below:

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
Please find more information on how stats queries work [here](https://app.gitbook.com/o/-Lfu_B3DKew-kvoEWzTk/s/ASSiAvbL4nFnkl8plQy2/queries/stats).
{% endhint %}

### Query keys

These are the keys you need to set when performing a stats query:

<table><thead><tr><th>Key</th><th>Type</th><th data-type="checkbox">Required</th><th>Description</th><th>Values</th></tr></thead><tbody><tr><td><strong><code>field</code></strong></td><td>String</td><td>true</td><td>The field you want the metrics or statistics computed on.</td><td>See the <a href="stats.md#operators-and-field-values">table below</a> to check the full list of valid values for this key.</td></tr><tr><td><strong><code>operator</code></strong></td><td>String</td><td>true</td><td>The computing operator.</td><td>See the <a href="breakdown.md#operators-and-field-values">table below</a> to check the full list of valid operators based on the value you assigned to the <code>field</code> key.</td></tr></tbody></table>

### Operators and `field` values

These are the valid values you can specify for the `field` key of the stats query and the related valid operators, based on that key:

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
|**`resource_errors.code`** | <p>`cardinality`</p><p>`value_count`</p>|
|**`resource_errors.id`** | <p>`cardinality`</p><p>`value_count`</p>|
|**`resource_errors.message`** | <p>`cardinality`</p><p>`value_count`</p>|


[](FIELD-OPERATORS-TABLE_END)