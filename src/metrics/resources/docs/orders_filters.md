---
description: >-
  A comprehensive list of the allowed fields values you can use to filter the results of the queries on the order resource
---

# Filters

To filter the results of a query on the order resource add the `filter` object to the request payload specifying the fields (and related attributes) you want to filter by and the operators you want to apply on each of them (see the [related tables](filters.md#filterable-fields-and-allowed-operators) for the full list), like in the generic example below:

```json
{
  "{{query_type}}": { ... },
  "filter": {
    "order": {
      "date_from": "...",
      "date_to": "...",
      "date_field": "...",
      "total_amount_with_taxes": {
        "gte": ...
      }

      // ...

    },
    "line_items": {
      "types": {
        "in": [
          "...",
          "..."

          // ...

        ]
      },
      "codes": {
        "in": [
          "...",
          "..."

          // ...

        ]
      },
      "options": {
        "names": {
          "in": [
            "...",
            "..."

            // ...

          ]
        },

        // ...

      }
    },
    "customer": {
      "email": {
        "not_in": [
          "...",
          "..."

          // ...

        ]
      }

      // ...

    }

    // ...

  }
}
```

{% hint style="info" %}
Please find more information on how filters work [here](https://app.gitbook.com/o/-Lfu_B3DKew-kvoEWzTk/s/ASSiAvbL4nFnkl8plQy2/filters).
{% endhint %}

## Filterable fields and allowed operators

Please find below the full list of the fields (and related attributes) you can filter the results of the queries on the order resource by, and the associated allowed values and valid operators.

[](FIELD-OPERATORS-WITH-KEY-TABLE_START)



#### `billing_address` field
| Attribute | Type | Values |
| ---- | --- | ------ |
|**`business`** | Boolean | <p>One of:</p><p>`true`</p><p>`false`</p> |
|**`cities`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`country_codes`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`geocoded`** | Boolean | <p>One of:</p><p>`true`</p><p>`false`</p> |
|**`localized`** | Boolean | <p>One of:</p><p>`true`</p><p>`false`</p> |
|**`state_codes`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`zip_codes`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`companies`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`first_names`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`last_names`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |

#### `customer` field
| Attribute | Type | Values |
| ---- | --- | ------ |
|**`ids`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`emails`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`group_names`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |

#### `line_items` field
| Attribute | Type | Values |
| ---- | --- | ------ |
|**`codes`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`discount`** | Object | <p>One of:</p><p>`"eq": ...`</p><p>`"ne": ...`</p><p>`"gt": ...`</p><p>`"gte": ...`</p><p>`"lt": ...`</p><p>`"lte": ...`</p><p>`"gt_lt": [...]`</p><p>`"gte_lte": [...]`</p><p>`"gte_lt": [...]`</p><p>`"gt_lte": [...]`</p> |
|**`ids`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`item_ids`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`types`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`names`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`options_amount`** | Object | <p>One of:</p><p>`"eq": ...`</p><p>`"ne": ...`</p><p>`"gt": ...`</p><p>`"gte": ...`</p><p>`"lt": ...`</p><p>`"lte": ...`</p><p>`"gt_lt": [...]`</p><p>`"gte_lte": [...]`</p><p>`"gte_lt": [...]`</p><p>`"gt_lte": [...]`</p> |
|**`quantity`** | Object | <p>One of:</p><p>`"eq": ...`</p><p>`"ne": ...`</p><p>`"gt": ...`</p><p>`"gte": ...`</p><p>`"lt": ...`</p><p>`"lte": ...`</p><p>`"gt_lt": [...]`</p><p>`"gte_lte": [...]`</p><p>`"gte_lt": [...]`</p><p>`"gt_lte": [...]`</p> |
|**`tax_amount`** | Object | <p>One of:</p><p>`"eq": ...`</p><p>`"ne": ...`</p><p>`"gt": ...`</p><p>`"gte": ...`</p><p>`"lt": ...`</p><p>`"lte": ...`</p><p>`"gt_lt": [...]`</p><p>`"gte_lte": [...]`</p><p>`"gte_lt": [...]`</p><p>`"gt_lte": [...]`</p> |
|**`tax_rate`** | Object | <p>One of:</p><p>`"eq": ...`</p><p>`"ne": ...`</p><p>`"gt": ...`</p><p>`"gte": ...`</p><p>`"lt": ...`</p><p>`"lte": ...`</p><p>`"gt_lt": [...]`</p><p>`"gte_lte": [...]`</p><p>`"gte_lt": [...]`</p><p>`"gt_lte": [...]`</p> |
|**`total_amount`** | Object | <p>One of:</p><p>`"eq": ...`</p><p>`"ne": ...`</p><p>`"gt": ...`</p><p>`"gte": ...`</p><p>`"lt": ...`</p><p>`"lte": ...`</p><p>`"gt_lt": [...]`</p><p>`"gte_lte": [...]`</p><p>`"gte_lt": [...]`</p><p>`"gt_lte": [...]`</p> |
|**`unit_amount`** | Object | <p>One of:</p><p>`"eq": ...`</p><p>`"ne": ...`</p><p>`"gt": ...`</p><p>`"gte": ...`</p><p>`"lt": ...`</p><p>`"lte": ...`</p><p>`"gt_lt": [...]`</p><p>`"gte_lte": [...]`</p><p>`"gte_lt": [...]`</p><p>`"gt_lte": [...]`</p> |
|**`updated_at`** | Object | <p>One of:</p><p>`"eq": "..."`</p><p>`"ne": "..."`</p><p>`"gt": "..."`</p><p>`"gte": "..."`</p><p>`"lt": "..."`</p><p>`"lte": "..."`</p><p>`"gt_lt": ["..."]`</p><p>`"gte_lte": ["..."]`</p><p>`"gte_lt": ["..."]`</p><p>`"gt_lte": ["..."]`</p> |
| **`options`** | Object | The line item options (see the [related table](#line-item-options) for all the single option objects attributes).

#### Line item `options` field
| Attribute | Type | Values |
| ---- | --- | ------ |
|**`ids`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`names`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`quantity`** | Object | <p>One of:</p><p>`"eq": ...`</p><p>`"ne": ...`</p><p>`"gt": ...`</p><p>`"gte": ...`</p><p>`"lt": ...`</p><p>`"lte": ...`</p><p>`"gt_lt": [...]`</p><p>`"gte_lte": [...]`</p><p>`"gte_lt": [...]`</p><p>`"gt_lte": [...]`</p> |
|**`total_amount`** | Object | <p>One of:</p><p>`"eq": ...`</p><p>`"ne": ...`</p><p>`"gt": ...`</p><p>`"gte": ...`</p><p>`"lt": ...`</p><p>`"lte": ...`</p><p>`"gt_lt": [...]`</p><p>`"gte_lte": [...]`</p><p>`"gte_lt": [...]`</p><p>`"gt_lte": [...]`</p> |
|**`unit_amount`** | Object | <p>One of:</p><p>`"eq": ...`</p><p>`"ne": ...`</p><p>`"gt": ...`</p><p>`"gte": ...`</p><p>`"lt": ...`</p><p>`"lte": ...`</p><p>`"gt_lt": [...]`</p><p>`"gte_lte": [...]`</p><p>`"gte_lt": [...]`</p><p>`"gt_lte": [...]`</p> |

#### `market` field
| Attribute | Type | Values |
| ---- | --- | ------ |
|**`ids`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`names`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`numbers`** | Object | <p>One of:</p><p>`"in": [...]`</p><p>`"not_in": [...]`</p> |

#### `order` field
| Attribute | Type | Values |
| ---- | --- | ------ |
|**`date_from`** | String | e.g.: `2022-07-06T21:41:03Z`<br/><br/>No more than 365 days before `date_to`. Default is 30 day before the current day, beginning of day. |
|**`date_to`** | String | e.g.: `2022-07-06T21:41:03Z`<br/><br/>No more than 365 days after `date_from`. Default is the current day, end of day. |
|**`date_field`** | String | <p>One of:</p><p>`current_date`</p><p>`approved_at`</p><p>`cancelled_at`</p><p>`created_at`</p><p>`placed_at`</p><p>`archived_at`</p><p>`updated_at`</p><p>`fulfillment_updated_at`</p><p>`payment_updated_at`</p><br/>Default is `current_date`. |
|**`discounted`** | Boolean | <p>One of:</p><p>`true`</p><p>`false`</p> |
|**`refunded`** | Boolean | <p>One of:</p><p>`true`</p><p>`false`</p> |
|**`gift_card`** | Boolean | <p>One of:</p><p>`true`</p><p>`false`</p> |
|**`coupon`** | Boolean | <p>One of:</p><p>`true`</p><p>`false`</p> |
|**`returned`** | Boolean | <p>One of:</p><p>`true`</p><p>`false`</p> |
|**`options`** | Boolean | <p>One of:</p><p>`true`</p><p>`false`</p> |
|**`adjustment_amount`** | Object | <p>One of:</p><p>`"eq": ...`</p><p>`"ne": ...`</p><p>`"gt": ...`</p><p>`"gte": ...`</p><p>`"lt": ...`</p><p>`"lte": ...`</p><p>`"gt_lt": [...]`</p><p>`"gte_lte": [...]`</p><p>`"gte_lt": [...]`</p><p>`"gt_lte": [...]`</p> |
|**`adjustment_tax_amount`** | Object | <p>One of:</p><p>`"eq": ...`</p><p>`"ne": ...`</p><p>`"gt": ...`</p><p>`"gte": ...`</p><p>`"lt": ...`</p><p>`"lte": ...`</p><p>`"gt_lt": [...]`</p><p>`"gte_lte": [...]`</p><p>`"gte_lt": [...]`</p><p>`"gt_lte": [...]`</p> |
|**`adjustment_taxable_amount`** | Object | <p>One of:</p><p>`"eq": ...`</p><p>`"ne": ...`</p><p>`"gt": ...`</p><p>`"gte": ...`</p><p>`"lt": ...`</p><p>`"lte": ...`</p><p>`"gt_lt": [...]`</p><p>`"gte_lte": [...]`</p><p>`"gte_lt": [...]`</p><p>`"gt_lte": [...]`</p> |
|**`approved_at`** | Object | <p>One of:</p><p>`"eq": "..."`</p><p>`"ne": "..."`</p><p>`"gt": "..."`</p><p>`"gte": "..."`</p><p>`"lt": "..."`</p><p>`"lte": "..."`</p><p>`"gt_lt": ["..."]`</p><p>`"gte_lte": ["..."]`</p><p>`"gte_lt": ["..."]`</p><p>`"gt_lte": ["..."]`</p> |
|**`archived_at`** | Object | <p>One of:</p><p>`"eq": "..."`</p><p>`"ne": "..."`</p><p>`"gt": "..."`</p><p>`"gte": "..."`</p><p>`"lt": "..."`</p><p>`"lte": "..."`</p><p>`"gt_lt": ["..."]`</p><p>`"gte_lte": ["..."]`</p><p>`"gte_lt": ["..."]`</p><p>`"gt_lte": ["..."]`</p> |
|**`archived`** | Boolean | <p>One of:</p><p>`true`</p><p>`false`</p> |
|**`cancelled_at`** | Object | <p>One of:</p><p>`"eq": "..."`</p><p>`"ne": "..."`</p><p>`"gt": "..."`</p><p>`"gte": "..."`</p><p>`"lt": "..."`</p><p>`"lte": "..."`</p><p>`"gt_lt": ["..."]`</p><p>`"gte_lte": ["..."]`</p><p>`"gte_lt": ["..."]`</p><p>`"gt_lte": ["..."]`</p> |
|**`country_codes`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`coupon_codes`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`created_at`** | Object | <p>One of:</p><p>`"eq": "..."`</p><p>`"ne": "..."`</p><p>`"gt": "..."`</p><p>`"gte": "..."`</p><p>`"lt": "..."`</p><p>`"lte": "..."`</p><p>`"gt_lt": ["..."]`</p><p>`"gte_lte": ["..."]`</p><p>`"gte_lt": ["..."]`</p><p>`"gt_lte": ["..."]`</p> |
|**`currency_codes`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`discount_amount`** | Object | <p>One of:</p><p>`"eq": ...`</p><p>`"ne": ...`</p><p>`"gt": ...`</p><p>`"gte": ...`</p><p>`"lt": ...`</p><p>`"lte": ...`</p><p>`"gt_lt": [...]`</p><p>`"gte_lte": [...]`</p><p>`"gte_lt": [...]`</p><p>`"gt_lte": [...]`</p> |
|**`duty_amount`** | Object | <p>One of:</p><p>`"eq": ...`</p><p>`"ne": ...`</p><p>`"gt": ...`</p><p>`"gte": ...`</p><p>`"lt": ...`</p><p>`"lte": ...`</p><p>`"gt_lt": [...]`</p><p>`"gte_lte": [...]`</p><p>`"gte_lt": [...]`</p><p>`"gt_lte": [...]`</p> |
|**`freight_taxable`** | Boolean | <p>One of:</p><p>`true`</p><p>`false`</p> |
|**`fulfillment_statuses`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`fulfillment_updated_at`** | Object | <p>One of:</p><p>`"eq": "..."`</p><p>`"ne": "..."`</p><p>`"gt": "..."`</p><p>`"gte": "..."`</p><p>`"lt": "..."`</p><p>`"lte": "..."`</p><p>`"gt_lt": ["..."]`</p><p>`"gte_lte": ["..."]`</p><p>`"gte_lt": ["..."]`</p><p>`"gt_lte": ["..."]`</p> |
|**`gift_card_codes`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`gift_card_amount`** | Object | <p>One of:</p><p>`"eq": ...`</p><p>`"ne": ...`</p><p>`"gt": ...`</p><p>`"gte": ...`</p><p>`"lt": ...`</p><p>`"lte": ...`</p><p>`"gt_lt": [...]`</p><p>`"gte_lte": [...]`</p><p>`"gte_lt": [...]`</p><p>`"gt_lte": [...]`</p> |
|**`guest`** | Boolean | <p>One of:</p><p>`true`</p><p>`false`</p> |
|**`ids`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`language_codes`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`line_item_options_count`** | Object | <p>One of:</p><p>`"eq": ...`</p><p>`"ne": ...`</p><p>`"gt": ...`</p><p>`"gte": ...`</p><p>`"lt": ...`</p><p>`"lte": ...`</p><p>`"gt_lt": [...]`</p><p>`"gte_lte": [...]`</p><p>`"gte_lt": [...]`</p><p>`"gt_lte": [...]`</p> |
|**`numbers`** | Object | <p>One of:</p><p>`"in": [...]`</p><p>`"not_in": [...]`</p> |
|**`payment_method_amount`** | Object | <p>One of:</p><p>`"eq": ...`</p><p>`"ne": ...`</p><p>`"gt": ...`</p><p>`"gte": ...`</p><p>`"lt": ...`</p><p>`"lte": ...`</p><p>`"gt_lt": [...]`</p><p>`"gte_lte": [...]`</p><p>`"gte_lt": [...]`</p><p>`"gt_lte": [...]`</p> |
|**`payment_method_tax_amount`** | Object | <p>One of:</p><p>`"eq": ...`</p><p>`"ne": ...`</p><p>`"gt": ...`</p><p>`"gte": ...`</p><p>`"lt": ...`</p><p>`"lte": ...`</p><p>`"gt_lt": [...]`</p><p>`"gte_lte": [...]`</p><p>`"gte_lt": [...]`</p><p>`"gt_lte": [...]`</p> |
|**`payment_method_taxable_amount`** | Object | <p>One of:</p><p>`"eq": ...`</p><p>`"ne": ...`</p><p>`"gt": ...`</p><p>`"gte": ...`</p><p>`"lt": ...`</p><p>`"lte": ...`</p><p>`"gt_lt": [...]`</p><p>`"gte_lte": [...]`</p><p>`"gte_lt": [...]`</p><p>`"gt_lte": [...]`</p> |
|**`payment_statuses`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`payment_updated_at`** | Object | <p>One of:</p><p>`"eq": "..."`</p><p>`"ne": "..."`</p><p>`"gt": "..."`</p><p>`"gte": "..."`</p><p>`"lt": "..."`</p><p>`"lte": "..."`</p><p>`"gt_lt": ["..."]`</p><p>`"gte_lte": ["..."]`</p><p>`"gte_lt": ["..."]`</p><p>`"gt_lte": ["..."]`</p> |
|**`placed_at`** | Object | <p>One of:</p><p>`"eq": "..."`</p><p>`"ne": "..."`</p><p>`"gt": "..."`</p><p>`"gte": "..."`</p><p>`"lt": "..."`</p><p>`"lte": "..."`</p><p>`"gt_lt": ["..."]`</p><p>`"gte_lte": ["..."]`</p><p>`"gte_lt": ["..."]`</p><p>`"gt_lte": ["..."]`</p> |
|**`references`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`reference_origins`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`shipments_count`** | Object | <p>One of:</p><p>`"eq": ...`</p><p>`"ne": ...`</p><p>`"gt": ...`</p><p>`"gte": ...`</p><p>`"lt": ...`</p><p>`"lte": ...`</p><p>`"gt_lt": [...]`</p><p>`"gte_lte": [...]`</p><p>`"gte_lt": [...]`</p><p>`"gt_lte": [...]`</p> |
|**`shipping_amount`** | Object | <p>One of:</p><p>`"eq": ...`</p><p>`"ne": ...`</p><p>`"gt": ...`</p><p>`"gte": ...`</p><p>`"lt": ...`</p><p>`"lte": ...`</p><p>`"gt_lt": [...]`</p><p>`"gte_lte": [...]`</p><p>`"gte_lt": [...]`</p><p>`"gt_lte": [...]`</p> |
|**`shipping_taxable_amount`** | Object | <p>One of:</p><p>`"eq": ...`</p><p>`"ne": ...`</p><p>`"gt": ...`</p><p>`"gte": ...`</p><p>`"lt": ...`</p><p>`"lte": ...`</p><p>`"gt_lt": [...]`</p><p>`"gte_lte": [...]`</p><p>`"gte_lt": [...]`</p><p>`"gt_lte": [...]`</p> |
|**`skus_count`** | Object | <p>One of:</p><p>`"eq": ...`</p><p>`"ne": ...`</p><p>`"gt": ...`</p><p>`"gte": ...`</p><p>`"lt": ...`</p><p>`"lte": ...`</p><p>`"gt_lt": [...]`</p><p>`"gte_lte": [...]`</p><p>`"gte_lt": [...]`</p><p>`"gt_lte": [...]`</p> |
|**`statuses`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`subtotal_amount`** | Object | <p>One of:</p><p>`"eq": ...`</p><p>`"ne": ...`</p><p>`"gt": ...`</p><p>`"gte": ...`</p><p>`"lt": ...`</p><p>`"lte": ...`</p><p>`"gt_lt": [...]`</p><p>`"gte_lte": [...]`</p><p>`"gte_lt": [...]`</p><p>`"gt_lte": [...]`</p> |
|**`subtotal_tax_amount`** | Object | <p>One of:</p><p>`"eq": ...`</p><p>`"ne": ...`</p><p>`"gt": ...`</p><p>`"gte": ...`</p><p>`"lt": ...`</p><p>`"lte": ...`</p><p>`"gt_lt": [...]`</p><p>`"gte_lte": [...]`</p><p>`"gte_lt": [...]`</p><p>`"gt_lte": [...]`</p> |
|**`subtotal_taxable_amount`** | Object | <p>One of:</p><p>`"eq": ...`</p><p>`"ne": ...`</p><p>`"gt": ...`</p><p>`"gte": ...`</p><p>`"lt": ...`</p><p>`"lte": ...`</p><p>`"gt_lt": [...]`</p><p>`"gte_lte": [...]`</p><p>`"gte_lt": [...]`</p><p>`"gt_lte": [...]`</p> |
|**`tax_included`** | Boolean | <p>One of:</p><p>`true`</p><p>`false`</p> |
|**`total_amount`** | Object | <p>One of:</p><p>`"eq": ...`</p><p>`"ne": ...`</p><p>`"gt": ...`</p><p>`"gte": ...`</p><p>`"lt": ...`</p><p>`"lte": ...`</p><p>`"gt_lt": [...]`</p><p>`"gte_lte": [...]`</p><p>`"gte_lt": [...]`</p><p>`"gt_lte": [...]`</p> |
|**`total_amount_with_taxes`** | Object | <p>One of:</p><p>`"eq": ...`</p><p>`"ne": ...`</p><p>`"gt": ...`</p><p>`"gte": ...`</p><p>`"lt": ...`</p><p>`"lte": ...`</p><p>`"gt_lt": [...]`</p><p>`"gte_lte": [...]`</p><p>`"gte_lt": [...]`</p><p>`"gt_lte": [...]`</p> |
|**`total_tax_amount`** | Object | <p>One of:</p><p>`"eq": ...`</p><p>`"ne": ...`</p><p>`"gt": ...`</p><p>`"gte": ...`</p><p>`"lt": ...`</p><p>`"lte": ...`</p><p>`"gt_lt": [...]`</p><p>`"gte_lte": [...]`</p><p>`"gte_lt": [...]`</p><p>`"gt_lte": [...]`</p> |
|**`total_taxable_amount`** | Object | <p>One of:</p><p>`"eq": ...`</p><p>`"ne": ...`</p><p>`"gt": ...`</p><p>`"gte": ...`</p><p>`"lt": ...`</p><p>`"lte": ...`</p><p>`"gt_lt": [...]`</p><p>`"gte_lte": [...]`</p><p>`"gte_lt": [...]`</p><p>`"gt_lte": [...]`</p> |
|**`updated_at`** | Object | <p>One of:</p><p>`"eq": "..."`</p><p>`"ne": "..."`</p><p>`"gt": "..."`</p><p>`"gte": "..."`</p><p>`"lt": "..."`</p><p>`"lte": "..."`</p><p>`"gt_lt": ["..."]`</p><p>`"gte_lte": ["..."]`</p><p>`"gte_lt": ["..."]`</p><p>`"gt_lte": ["..."]`</p> |
|**`current_date`** | Object | <p>One of:</p><p>`"eq": "..."`</p><p>`"ne": "..."`</p><p>`"gt": "..."`</p><p>`"gte": "..."`</p><p>`"lt": "..."`</p><p>`"lte": "..."`</p><p>`"gt_lt": ["..."]`</p><p>`"gte_lte": ["..."]`</p><p>`"gte_lt": ["..."]`</p><p>`"gt_lte": ["..."]`</p> |
|**`seconds_in_draft`** | Object | <p>One of:</p><p>`"eq": ...`</p><p>`"ne": ...`</p><p>`"gt": ...`</p><p>`"gte": ...`</p><p>`"lt": ...`</p><p>`"lte": ...`</p><p>`"gt_lt": [...]`</p><p>`"gte_lte": [...]`</p><p>`"gte_lt": [...]`</p><p>`"gt_lte": [...]`</p> |
|**`seconds_in_approved`** | Object | <p>One of:</p><p>`"eq": ...`</p><p>`"ne": ...`</p><p>`"gt": ...`</p><p>`"gte": ...`</p><p>`"lt": ...`</p><p>`"lte": ...`</p><p>`"gt_lt": [...]`</p><p>`"gte_lte": [...]`</p><p>`"gte_lt": [...]`</p><p>`"gt_lte": [...]`</p> |
|**`seconds_in_placed`** | Object | <p>One of:</p><p>`"eq": ...`</p><p>`"ne": ...`</p><p>`"gt": ...`</p><p>`"gte": ...`</p><p>`"lt": ...`</p><p>`"lte": ...`</p><p>`"gt_lt": [...]`</p><p>`"gte_lte": [...]`</p><p>`"gte_lt": [...]`</p><p>`"gt_lte": [...]`</p> |
|**`placed_day_of_week`** | Object | <p>One of:</p><p>`"eq": ...`</p><p>`"ne": ...`</p><p>`"gt": ...`</p><p>`"gte": ...`</p><p>`"lt": ...`</p><p>`"lte": ...`</p><p>`"gt_lt": [...]`</p><p>`"gte_lte": [...]`</p><p>`"gte_lt": [...]`</p><p>`"gt_lte": [...]`</p> |
|**`refunds_total_amount_with_taxes`** | Object | <p>One of:</p><p>`"eq": ...`</p><p>`"ne": ...`</p><p>`"gt": ...`</p><p>`"gte": ...`</p><p>`"lt": ...`</p><p>`"lte": ...`</p><p>`"gt_lt": [...]`</p><p>`"gte_lte": [...]`</p><p>`"gte_lt": [...]`</p><p>`"gt_lte": [...]`</p> |
|**`total_amount_with_taxes_net_of_refunds`** | Object | <p>One of:</p><p>`"eq": ...`</p><p>`"ne": ...`</p><p>`"gt": ...`</p><p>`"gte": ...`</p><p>`"lt": ...`</p><p>`"lte": ...`</p><p>`"gt_lt": [...]`</p><p>`"gte_lte": [...]`</p><p>`"gte_lt": [...]`</p><p>`"gt_lte": [...]`</p> |
|**`aggregated_details`** | Object | <p>`"query": "..."`</p> |
|**`link_ids`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`user_ids`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`store_ids`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`affiliate_codes`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |

#### `payment_method` field
| Attribute | Type | Values |
| ---- | --- | ------ |
|**`ids`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`source_types`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`names`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`moto`** | Boolean | <p>One of:</p><p>`true`</p><p>`false`</p> |
|**`issuer`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`issuer_type`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`card_type`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |

#### `refunds` field
| Attribute | Type | Values |
| ---- | --- | ------ |
|**`ids`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`amount`** | Object | <p>One of:</p><p>`"eq": ...`</p><p>`"ne": ...`</p><p>`"gt": ...`</p><p>`"gte": ...`</p><p>`"lt": ...`</p><p>`"lte": ...`</p><p>`"gt_lt": [...]`</p><p>`"gte_lte": [...]`</p><p>`"gte_lt": [...]`</p><p>`"gt_lte": [...]`</p> |
|**`numbers`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |

#### `shipping_address` field
| Attribute | Type | Values |
| ---- | --- | ------ |
|**`business`** | Boolean | <p>One of:</p><p>`true`</p><p>`false`</p> |
|**`cities`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`country_codes`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`geocoded`** | Boolean | <p>One of:</p><p>`true`</p><p>`false`</p> |
|**`localized`** | Boolean | <p>One of:</p><p>`true`</p><p>`false`</p> |
|**`state_codes`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`zip_codes`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |

#### `shipments` field
| Attribute | Type | Values |
| ---- | --- | ------ |
|**`ids`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`numbers`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`statuses`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`cancelled_at`** | Object | <p>One of:</p><p>`"eq": "..."`</p><p>`"ne": "..."`</p><p>`"gt": "..."`</p><p>`"gte": "..."`</p><p>`"lt": "..."`</p><p>`"lte": "..."`</p><p>`"gt_lt": ["..."]`</p><p>`"gte_lte": ["..."]`</p><p>`"gte_lt": ["..."]`</p><p>`"gt_lte": ["..."]`</p> |
|**`on_hold_at`** | Object | <p>One of:</p><p>`"eq": "..."`</p><p>`"ne": "..."`</p><p>`"gt": "..."`</p><p>`"gte": "..."`</p><p>`"lt": "..."`</p><p>`"lte": "..."`</p><p>`"gt_lt": ["..."]`</p><p>`"gte_lte": ["..."]`</p><p>`"gte_lt": ["..."]`</p><p>`"gt_lte": ["..."]`</p> |
|**`picking_at`** | Object | <p>One of:</p><p>`"eq": "..."`</p><p>`"ne": "..."`</p><p>`"gt": "..."`</p><p>`"gte": "..."`</p><p>`"lt": "..."`</p><p>`"lte": "..."`</p><p>`"gt_lt": ["..."]`</p><p>`"gte_lte": ["..."]`</p><p>`"gte_lt": ["..."]`</p><p>`"gt_lte": ["..."]`</p> |
|**`packing_at`** | Object | <p>One of:</p><p>`"eq": "..."`</p><p>`"ne": "..."`</p><p>`"gt": "..."`</p><p>`"gte": "..."`</p><p>`"lt": "..."`</p><p>`"lte": "..."`</p><p>`"gt_lt": ["..."]`</p><p>`"gte_lte": ["..."]`</p><p>`"gte_lt": ["..."]`</p><p>`"gt_lte": ["..."]`</p> |
|**`ready_to_ship_at`** | Object | <p>One of:</p><p>`"eq": "..."`</p><p>`"ne": "..."`</p><p>`"gt": "..."`</p><p>`"gte": "..."`</p><p>`"lt": "..."`</p><p>`"lte": "..."`</p><p>`"gt_lt": ["..."]`</p><p>`"gte_lte": ["..."]`</p><p>`"gte_lt": ["..."]`</p><p>`"gt_lte": ["..."]`</p> |
|**`shipped_at`** | Object | <p>One of:</p><p>`"eq": "..."`</p><p>`"ne": "..."`</p><p>`"gt": "..."`</p><p>`"gte": "..."`</p><p>`"lt": "..."`</p><p>`"lte": "..."`</p><p>`"gt_lt": ["..."]`</p><p>`"gte_lte": ["..."]`</p><p>`"gte_lt": ["..."]`</p><p>`"gt_lte": ["..."]`</p> |
|**`created_at`** | Object | <p>One of:</p><p>`"eq": "..."`</p><p>`"ne": "..."`</p><p>`"gt": "..."`</p><p>`"gte": "..."`</p><p>`"lt": "..."`</p><p>`"lte": "..."`</p><p>`"gt_lt": ["..."]`</p><p>`"gte_lte": ["..."]`</p><p>`"gte_lt": ["..."]`</p><p>`"gt_lte": ["..."]`</p> |
|**`updated_at`** | Object | <p>One of:</p><p>`"eq": "..."`</p><p>`"ne": "..."`</p><p>`"gt": "..."`</p><p>`"gte": "..."`</p><p>`"lt": "..."`</p><p>`"lte": "..."`</p><p>`"gt_lt": ["..."]`</p><p>`"gte_lte": ["..."]`</p><p>`"gte_lt": ["..."]`</p><p>`"gt_lte": ["..."]`</p> |
|**`references`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`reference_origins`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`seconds_in_picking`** | Object | <p>One of:</p><p>`"eq": ...`</p><p>`"ne": ...`</p><p>`"gt": ...`</p><p>`"gte": ...`</p><p>`"lt": ...`</p><p>`"lte": ...`</p><p>`"gt_lt": [...]`</p><p>`"gte_lte": [...]`</p><p>`"gte_lt": [...]`</p><p>`"gt_lte": [...]`</p> |
|**`seconds_in_ready_to_ship`** | Object | <p>One of:</p><p>`"eq": ...`</p><p>`"ne": ...`</p><p>`"gt": ...`</p><p>`"gte": ...`</p><p>`"lt": ...`</p><p>`"lte": ...`</p><p>`"gt_lt": [...]`</p><p>`"gte_lte": [...]`</p><p>`"gte_lt": [...]`</p><p>`"gt_lte": [...]`</p> |

#### Shipment `stock_location` field
| Attribute | Type | Values |
| ---- | --- | ------ |
|**`ids`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`names`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`references`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`reference_origins`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |

#### Shipment `shipping_method` field
| Attribute | Type | Values |
| ---- | --- | ------ |
|**`ids`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`names`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`references`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`reference_origins`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`currency_codes`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |

#### Shipment `shipping_category` field
| Attribute | Type | Values |
| ---- | --- | ------ |
|**`ids`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`names`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`references`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`reference_origins`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |

#### Shipment `tags` field
| Attribute | Type | Values |
| ---- | --- | ------ |
|**`ids`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`names`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |

#### `tags` field
| Attribute | Type | Values |
| ---- | --- | ------ |
|**`ids`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`names`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |

#### `resource_errors` field
| Attribute | Type | Values |
| ---- | --- | ------ |
|**`codes`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`names`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`ids`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`messages`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`created_at`** | Object | <p>One of:</p><p>`"eq": "..."`</p><p>`"ne": "..."`</p><p>`"gt": "..."`</p><p>`"gte": "..."`</p><p>`"lt": "..."`</p><p>`"lte": "..."`</p><p>`"gt_lt": ["..."]`</p><p>`"gte_lte": ["..."]`</p><p>`"gte_lt": ["..."]`</p><p>`"gt_lte": ["..."]`</p> |
|**`updated_at`** | Object | <p>One of:</p><p>`"eq": "..."`</p><p>`"ne": "..."`</p><p>`"gt": "..."`</p><p>`"gte": "..."`</p><p>`"lt": "..."`</p><p>`"lte": "..."`</p><p>`"gt_lt": ["..."]`</p><p>`"gte_lte": ["..."]`</p><p>`"gte_lt": ["..."]`</p><p>`"gt_lte": ["..."]`</p> |

[](FIELD-OPERATORS-WITH-KEY-TABLE_END)