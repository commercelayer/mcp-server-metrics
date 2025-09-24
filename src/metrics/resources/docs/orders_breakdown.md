---
description: >-
  A comprehensive list of the breakdown query keys, allowed fields values, and operators for the order resource
---

# Breakdown

To perform a breakdown query on the order resource send a `POST` request to the `/orders/breakdown` endpoint specifying in the payload the [query keys](breakdown.md#query-keys) and [filter](filters.md) parameters like in the generic example below:

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

### Nestable breakdowns and `by` values

These are the valid values you can specify for the `by` key of the breakdown query and the related _forbidden_ values for the `by` key of the nested breakdown, based on the `by` key of the parent breakdown (i.e. for each row of the table below the full list of the _valid_ values for the `by` key of the nested breakdown is given by all the values in the "Value" column except the values in the row's "Forbidden nesting" cell):

[](NESTABLE-BY-TABLE_START)

| Value | Forbidden nesting |
| --- | ------ |
|**`billing_address.business`** | <p>`billing_address.geocoded`</p> <p>`billing_address.localized`</p> <p>`customer.*`</p> <p>`shipping_address.*`</p> <p>`line_items.item_type`</p> <p>`order.freight_taxable`</p> <p>`order.fulfillment_status`</p> <p>`order.payment_status`</p> <p>`order.status`</p> |
|**`billing_address.city`** | <p>`billing_address.country_code`</p> <p>`billing_address.state_code`</p> <p>`customer.*`</p> <p>`shipping_address.*`</p> <p>`line_items.item_type`</p> |
|**`billing_address.country_code`** | <p>`customer.*`</p> <p>`shipping_address.*`</p> <p>`line_items.item_type`</p> |
|**`billing_address.geocoded`** | <p>`billing_address.*`</p> <p>`customer.*`</p> <p>`shipping_address.*`</p> <p>`line_items.item_type`</p> |
|**`billing_address.localized`** | <p>`billing_address.*`</p> <p>`customer.*`</p> <p>`shipping_address.*`</p> <p>`line_items.item_type`</p> |
|**`billing_address.state_code`** | <p>`billing_address.country_code`</p> <p>`customer.*`</p> <p>`shipping_address.*`</p> <p>`line_items.item_type`</p> |
|**`billing_address.zip_code`** | <p>`billing_address.country_code`</p> <p>`billing_address.city`</p> <p>`billing_address.geocoded`</p> <p>`billing_address.localized`</p> <p>`customer.*`</p> <p>`shipping_address.*`</p> <p>`line_items.item_type`</p> |
|**`customer.id`** | |
|**`customer.email`** | |
|**`customer.group_name`** | |
|**`line_items.code`** | |
|**`line_items.id`** | |
|**`line_items.item_id`** | |
|**`line_items.item_type`** | |
|**`line_items.name`** | |
|**`line_items.options.id`** | <p>`line_items.*`</p> <p>`shipments.*`</p> |
|**`line_items.options.name`** | <p>`line_items.*`</p> <p>`shipments.*`</p> |
|**`market.id`** | <p>`billing_address.geocoded`</p> <p>`billing_address.localized`</p> <p>`shipping_address.geocoded`</p> <p>`shipping_address.localized`</p> <p>`line_items.item_type`</p> |
|**`market.name`** | |
|**`market.number`** | |
|**`order.country_code`** | |
|**`order.coupon_code`** | |
|**`order.currency_code`** | |
|**`order.freight_taxable`** | |
|**`order.fulfillment_status`** | |
|**`order.gift_card_code`** | |
|**`order.guest`** | |
|**`order.language_code`** | |
|**`order.payment_status`** | |
|**`order.reference`** | |
|**`order.reference_origin`** | |
|**`order.status`** | |
|**`order.tax_included`** | |
|**`order.placed_day_of_week`** | |
|**`order.link_id`** | |
|**`order.user_id`** | |
|**`order.store_id`** | |
|**`order.affiliate_code`** | |
|**`payment_method.source_type`** | |
|**`payment_method.name`** | |
|**`payment_method.moto`** | |
|**`payment_method.issuer`** | |
|**`payment_method.issuer_type`** | |
|**`payment_method.card_type`** | |
|**`shipping_address.business`** | <p>`shipping_address.geocoded`</p> <p>`shipping_address.localized`</p> <p>`customer.*`</p> <p>`billing_address.*`</p> <p>`line_items.item_type`</p> <p>`order.freight_taxable`</p> <p>`order.fulfillment_status`</p> <p>`order.payment_status`</p> <p>`order.status`</p> |
|**`shipping_address.city`** | <p>`shipping_address.country_code`</p> <p>`shipping_address.state_code`</p> <p>`customer.*`</p> <p>`billing_address.*`</p> <p>`line_items.item_type`</p> |
|**`shipping_address.country_code`** | <p>`customer.*`</p> <p>`billing_address.*`</p> <p>`line_items.item_type`</p> |
|**`shipping_address.geocoded`** | <p>`billing_address.*`</p> <p>`customer.*`</p> <p>`shipping_address.*`</p> <p>`line_items.item_type`</p> |
|**`shipping_address.localized`** | <p>`billing_address.*`</p> <p>`customer.*`</p> <p>`shipping_address.*`</p> <p>`line_items.item_type`</p> |
|**`shipping_address.state_code`** | <p>`shipping_address.country_code`</p> <p>`customer.*`</p> <p>`billing_address.*`</p> <p>`line_items.item_type`</p> |
|**`shipping_address.zip_code`** | <p>`shipping_address.country_code`</p> <p>`shipping_address.city`</p> <p>`shipping_address.geocoded`</p> <p>`shipping_address.localized`</p> <p>`customer.*`</p> <p>`billing_address.*`</p> <p>`line_items.item_type`</p> |
|**`shipments.status`** | |
|**`shipments.reference`** | |
|**`shipments.reference_origin`** | |
|**`shipments.stock_location.name`** | |
|**`shipments.stock_location.reference`** | |
|**`shipments.stock_location.reference_origin`** | |
|**`shipments.shipping_method.name`** | |
|**`shipments.shipping_method.reference`** | |
|**`shipments.shipping_method.reference_origin`** | |
|**`shipments.shipping_method.currency_code`** | |
|**`shipments.shipping_category.name`** | |
|**`shipments.shipping_category.reference`** | |
|**`shipments.shipping_category.reference_origin`** | |
|**`shipments.tags.id`** | |
|**`shipments.tags.name`** | |
|**`tags.id`** | |
|**`tags.name`** | |
|**`resource_errors.code`** | |
|**`resource_errors.name`** | |
|**`resource_errors.id`** | |
|**`resource_errors.message`** | |


[](NESTABLE-BY-TABLE_END)

{% hint style="info" %}
Remember also that you cannot group the nested breakdown by the same field by which you're already grouping the parent breakdown.
{% endhint %}