---
description: >-
  A comprehensive list of the search query keys and allowed fields values for the order resource
---

# Search

To perform a search query on the order resource send a `POST` request to the `/orders/search` endpoint specifying in the payload the [query keys](search.md#query-keys) and [filter](filters.md) parameters like in the generic example below:

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

<table><thead><tr><th>Key</th><th>Type</th><th data-type="checkbox">Required</th><th>Description</th><th>Values</th></tr></thead><tbody><tr><td><strong><code>limit</code></strong></td><td>Integer</td><td>false</td><td>The maximum number of records shown in the response.</td><td>Default is <code>50</code>, max is <code>100</code>.</td></tr><tr><td><strong><code>sort</code></strong></td><td>String</td><td>false</td><td>The way you want the results of the query to be sorted.</td><td>One of <code>asc</code> or <code>desc</code> (default is <code>desc</code>).</td></tr><tr><td><strong><code>sort_by</code></strong></td><td>String</td><td>false</td><td>The date field you want the results of the query sorted by.</td><td><a href="search.md#sort_by-values">Here</a> the full list of valid values for this key. Default is <code>order.current_date</code>.</td></tr><tr><td><strong><code>fields</code></strong></td><td>Array</td><td>true</td><td>The list of fields you want to be returned for each record in the response.</td><td><a href="search.md#field-values">Here</a> the full list of valid values for this key. Cannot be empty. Use the <code>.*</code> syntax to request all the attribute for a specific field.</td></tr><tr><td><strong><code>cursor</code></strong></td><td>String</td><td>false</td><td>The cursor pointing to a specific page in the paginated search results.</td><td>Every time you perform a search query you get the cursor to the next page in the <code>pagination</code> object.</td></tr></tbody></table>

### `sort_by` values

These are the valid values you can specify for the `sort_by` key of the search query:

[](SORT-BY-TABLE_START)

- `order.approved_at`
- `order.archived_at`
- `order.cancelled_at`
- `order.created_at`
- `order.current_date`
- `order.fulfillment_updated_at`
- `order.payment_updated_at`
- `order.placed_at`
- `order.updated_at`


[](SORT-BY-TABLE_END)

### `field` values

These are the valid values you can specify for the `field` key of the search query:

[](FIELD-TABLE_START)

- `billing_address.*`
- `billing_address.business`
- `billing_address.city`
- `billing_address.company`
- `billing_address.country_code`
- `billing_address.first_name`
- `billing_address.geocoded`
- `billing_address.last_name`
- `billing_address.localized`
- `billing_address.state_code`
- `billing_address.zip_code`
- `customer.*`
- `customer.email`
- `customer.group_name`
- `customer.id`
- `line_items.*`
- `line_items.code`
- `line_items.discount`
- `line_items.id`
- `line_items.item_id`
- `line_items.item_type`
- `line_items.name`
- `line_items.options.*`
- `line_items.options.id`
- `line_items.options.name`
- `line_items.options.quantity`
- `line_items.options.total_amount`
- `line_items.options.unit_amount`
- `line_items.options_amount`
- `line_items.quantity`
- `line_items.tax_amount`
- `line_items.tax_rate`
- `line_items.total_amount`
- `line_items.unit_amount`
- `line_items.updated_at`
- `market.*`
- `market.id`
- `market.name`
- `market.number`
- `order.*`
- `order.adjustment_amount`
- `order.adjustment_tax_amount`
- `order.adjustment_taxable_amount`
- `order.affiliate_code`
- `order.aggregated_details`
- `order.approved_at`
- `order.archived`
- `order.archived_at`
- `order.cancelled_at`
- `order.country_code`
- `order.coupon`
- `order.coupon_code`
- `order.created_at`
- `order.currency_code`
- `order.current_date`
- `order.discount_amount`
- `order.discounted`
- `order.duty_amount`
- `order.freight_taxable`
- `order.fulfillment_status`
- `order.fulfillment_updated_at`
- `order.gift_card`
- `order.gift_card_amount`
- `order.gift_card_code`
- `order.guest`
- `order.id`
- `order.language_code`
- `order.line_item_options_count`
- `order.link_id`
- `order.number`
- `order.options`
- `order.payment_method_amount`
- `order.payment_method_tax_amount`
- `order.payment_method_taxable_amount`
- `order.payment_status`
- `order.payment_updated_at`
- `order.placed_at`
- `order.placed_day_of_week`
- `order.reference`
- `order.reference_origin`
- `order.refunded`
- `order.refunds_total_amount_with_taxes`
- `order.returned`
- `order.seconds_in_approved`
- `order.seconds_in_draft`
- `order.seconds_in_placed`
- `order.shipments_count`
- `order.shipping_amount`
- `order.shipping_taxable_amount`
- `order.skus_count`
- `order.status`
- `order.store_id`
- `order.subtotal_amount`
- `order.subtotal_tax_amount`
- `order.subtotal_taxable_amount`
- `order.tax_included`
- `order.total_amount`
- `order.total_amount_with_taxes`
- `order.total_amount_with_taxes_net_of_refunds`
- `order.total_tax_amount`
- `order.total_taxable_amount`
- `order.updated_at`
- `order.user_id`
- `payment_method.*`
- `payment_method.card_type`
- `payment_method.id`
- `payment_method.issuer`
- `payment_method.issuer_type`
- `payment_method.moto`
- `payment_method.name`
- `payment_method.source_type`
- `refunds.*`
- `refunds.amount`
- `refunds.id`
- `refunds.number`
- `resource_errors.*`
- `resource_errors.code`
- `resource_errors.created_at`
- `resource_errors.id`
- `resource_errors.message`
- `resource_errors.name`
- `resource_errors.updated_at`
- `shipments.*`
- `shipments.cancelled_at`
- `shipments.created_at`
- `shipments.id`
- `shipments.number`
- `shipments.on_hold_at`
- `shipments.packing_at`
- `shipments.picking_at`
- `shipments.ready_to_ship_at`
- `shipments.reference`
- `shipments.reference_origin`
- `shipments.seconds_in_picking`
- `shipments.seconds_in_ready_to_ship`
- `shipments.shipped_at`
- `shipments.shipping_category.*`
- `shipments.shipping_category.id`
- `shipments.shipping_category.name`
- `shipments.shipping_category.reference`
- `shipments.shipping_category.reference_origin`
- `shipments.shipping_method.*`
- `shipments.shipping_method.currency_code`
- `shipments.shipping_method.id`
- `shipments.shipping_method.name`
- `shipments.shipping_method.reference`
- `shipments.shipping_method.reference_origin`
- `shipments.status`
- `shipments.stock_location.*`
- `shipments.stock_location.id`
- `shipments.stock_location.name`
- `shipments.stock_location.reference`
- `shipments.stock_location.reference_origin`
- `shipments.tags.*`
- `shipments.tags.id`
- `shipments.tags.name`
- `shipments.updated_at`
- `shipping_address.*`
- `shipping_address.business`
- `shipping_address.city`
- `shipping_address.country_code`
- `shipping_address.geocoded`
- `shipping_address.localized`
- `shipping_address.state_code`
- `shipping_address.zip_code`
- `tags.*`
- `tags.id`
- `tags.name`


[](FIELD-TABLE_END)