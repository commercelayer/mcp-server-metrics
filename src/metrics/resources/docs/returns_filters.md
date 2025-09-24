---
description: >-
  A comprehensive list of the allowed fields values you can use to filter the results of the queries on the return resource
---

# Filters

To filter the results of a query on the return resource add the `filter` object to the request payload specifying the fields (and related attributes) you want to filter by and the operators you want to apply on each of them (see the [related tables](filters.md#filterable-fields-and-allowed-operators) for the full list), like in the generic example below:

```json
{
  "{{query_type}}": { ... },
  "filter": {
    "return": {
      "date_from": "...",
      "date_to": "...",
      "date_field": "...",
      "skus_count": {
        "gte": ...
      }

      // ...

    },
    "return_line_items": {
      "quantity": {
        "lt": ...
      },
      "restocked_at": {
        "gt": "..."
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

Please find below the full list of the fields (and related attributes) you can filter the results of the queries on the return resource by, and the associated allowed values and valid operators.

[](FIELD-OPERATORS-WITH-KEY-TABLE_START)



#### `customer` field
| Attribute | Type | Values |
| ---- | --- | ------ |
|**`ids`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`emails`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`group_names`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |

#### `destination_address` field
| Attribute | Type | Values |
| ---- | --- | ------ |
|**`business`** | Boolean | <p>One of:</p><p>`true`</p><p>`false`</p> |
|**`cities`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`country_codes`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`geocoded`** | Boolean | <p>One of:</p><p>`true`</p><p>`false`</p> |
|**`localized`** | Boolean | <p>One of:</p><p>`true`</p><p>`false`</p> |
|**`state_codes`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`zip_codes`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |

#### `origin_address` field
| Attribute | Type | Values |
| ---- | --- | ------ |
|**`business`** | Boolean | <p>One of:</p><p>`true`</p><p>`false`</p> |
|**`cities`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`country_codes`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`geocoded`** | Boolean | <p>One of:</p><p>`true`</p><p>`false`</p> |
|**`localized`** | Boolean | <p>One of:</p><p>`true`</p><p>`false`</p> |
|**`state_codes`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`zip_codes`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |

#### `market` field
| Attribute | Type | Values |
| ---- | --- | ------ |
|**`ids`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`names`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`numbers`** | Object | <p>One of:</p><p>`"in": [...]`</p><p>`"not_in": [...]`</p> |

#### `return` field
| Attribute | Type | Values |
| ---- | --- | ------ |
|**`date_from`** | String | e.g.: `2022-07-06T21:41:03Z`<br/><br/>No more than 365 days before `date_to`. Default is 30 day before the current day, beginning of day. |
|**`date_to`** | String | e.g.: `2022-07-06T21:41:03Z`<br/><br/>No more than 365 days after `date_from`. Default is the current day, end of day. |
|**`date_field`** | String | <p>One of:</p><p>`current_date`</p><p>`approved_at`</p><p>`archived_at`</p><p>`cancelled_at`</p><p>`created_at`</p><p>`received_at`</p><p>`rejected_at`</p><p>`shipped_at`</p><p>`updated_at`</p><p>`restocked_at`</p><br/>Default is `current_date`. |
|**`aggregated_details`** | Object | <p>`"query": "..."`</p> |
|**`approved_at`** | Object | <p>One of:</p><p>`"eq": "..."`</p><p>`"ne": "..."`</p><p>`"gt": "..."`</p><p>`"gte": "..."`</p><p>`"lt": "..."`</p><p>`"lte": "..."`</p><p>`"gt_lt": ["..."]`</p><p>`"gte_lte": ["..."]`</p><p>`"gte_lt": ["..."]`</p><p>`"gt_lte": ["..."]`</p> |
|**`archived_at`** | Object | <p>One of:</p><p>`"eq": "..."`</p><p>`"ne": "..."`</p><p>`"gt": "..."`</p><p>`"gte": "..."`</p><p>`"lt": "..."`</p><p>`"lte": "..."`</p><p>`"gt_lt": ["..."]`</p><p>`"gte_lte": ["..."]`</p><p>`"gte_lt": ["..."]`</p><p>`"gt_lte": ["..."]`</p> |
|**`archived`** | Boolean | <p>One of:</p><p>`true`</p><p>`false`</p> |
|**`cancelled_at`** | Object | <p>One of:</p><p>`"eq": "..."`</p><p>`"ne": "..."`</p><p>`"gt": "..."`</p><p>`"gte": "..."`</p><p>`"lt": "..."`</p><p>`"lte": "..."`</p><p>`"gt_lt": ["..."]`</p><p>`"gte_lte": ["..."]`</p><p>`"gte_lt": ["..."]`</p><p>`"gt_lte": ["..."]`</p> |
|**`created_at`** | Object | <p>One of:</p><p>`"eq": "..."`</p><p>`"ne": "..."`</p><p>`"gt": "..."`</p><p>`"gte": "..."`</p><p>`"lt": "..."`</p><p>`"lte": "..."`</p><p>`"gt_lt": ["..."]`</p><p>`"gte_lte": ["..."]`</p><p>`"gte_lt": ["..."]`</p><p>`"gt_lte": ["..."]`</p> |
|**`numbers`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`received_at`** | Object | <p>One of:</p><p>`"eq": "..."`</p><p>`"ne": "..."`</p><p>`"gt": "..."`</p><p>`"gte": "..."`</p><p>`"lt": "..."`</p><p>`"lte": "..."`</p><p>`"gt_lt": ["..."]`</p><p>`"gte_lte": ["..."]`</p><p>`"gte_lt": ["..."]`</p><p>`"gt_lte": ["..."]`</p> |
|**`references`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`reference_origins`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`rejected_at`** | Object | <p>One of:</p><p>`"eq": "..."`</p><p>`"ne": "..."`</p><p>`"gt": "..."`</p><p>`"gte": "..."`</p><p>`"lt": "..."`</p><p>`"lte": "..."`</p><p>`"gt_lt": ["..."]`</p><p>`"gte_lte": ["..."]`</p><p>`"gte_lt": ["..."]`</p><p>`"gt_lte": ["..."]`</p> |
|**`shipped_at`** | Object | <p>One of:</p><p>`"eq": "..."`</p><p>`"ne": "..."`</p><p>`"gt": "..."`</p><p>`"gte": "..."`</p><p>`"lt": "..."`</p><p>`"lte": "..."`</p><p>`"gt_lt": ["..."]`</p><p>`"gte_lte": ["..."]`</p><p>`"gte_lt": ["..."]`</p><p>`"gt_lte": ["..."]`</p> |
|**`statuses`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`updated_at`** | Object | <p>One of:</p><p>`"eq": "..."`</p><p>`"ne": "..."`</p><p>`"gt": "..."`</p><p>`"gte": "..."`</p><p>`"lt": "..."`</p><p>`"lte": "..."`</p><p>`"gt_lt": ["..."]`</p><p>`"gte_lte": ["..."]`</p><p>`"gte_lt": ["..."]`</p><p>`"gt_lte": ["..."]`</p> |
|**`current_date`** | Object | <p>One of:</p><p>`"eq": "..."`</p><p>`"ne": "..."`</p><p>`"gt": "..."`</p><p>`"gte": "..."`</p><p>`"lt": "..."`</p><p>`"lte": "..."`</p><p>`"gt_lt": ["..."]`</p><p>`"gte_lte": ["..."]`</p><p>`"gte_lt": ["..."]`</p><p>`"gt_lte": ["..."]`</p> |
|**`ids`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`order_ids`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`skus_count`** | Object | <p>One of:</p><p>`"eq": ...`</p><p>`"ne": ...`</p><p>`"gt": ...`</p><p>`"gte": ...`</p><p>`"lt": ...`</p><p>`"lte": ...`</p><p>`"gt_lt": [...]`</p><p>`"gte_lte": [...]`</p><p>`"gte_lt": [...]`</p><p>`"gt_lte": [...]`</p> |

#### `return_line_items` field
| Attribute | Type | Values |
| ---- | --- | ------ |
|**`created_at`** | Object | <p>One of:</p><p>`"eq": "..."`</p><p>`"ne": "..."`</p><p>`"gt": "..."`</p><p>`"gte": "..."`</p><p>`"lt": "..."`</p><p>`"lte": "..."`</p><p>`"gt_lt": ["..."]`</p><p>`"gte_lte": ["..."]`</p><p>`"gte_lt": ["..."]`</p><p>`"gt_lte": ["..."]`</p> |
|**`quantity`** | Object | <p>One of:</p><p>`"eq": ...`</p><p>`"ne": ...`</p><p>`"gt": ...`</p><p>`"gte": ...`</p><p>`"lt": ...`</p><p>`"lte": ...`</p><p>`"gt_lt": [...]`</p><p>`"gte_lte": [...]`</p><p>`"gte_lt": [...]`</p><p>`"gt_lte": [...]`</p> |
|**`restocked_at`** | Object | <p>One of:</p><p>`"eq": "..."`</p><p>`"ne": "..."`</p><p>`"gt": "..."`</p><p>`"gte": "..."`</p><p>`"lt": "..."`</p><p>`"lte": "..."`</p><p>`"gt_lt": ["..."]`</p><p>`"gte_lte": ["..."]`</p><p>`"gte_lt": ["..."]`</p><p>`"gt_lte": ["..."]`</p> |
|**`updated_at`** | Object | <p>One of:</p><p>`"eq": "..."`</p><p>`"ne": "..."`</p><p>`"gt": "..."`</p><p>`"gte": "..."`</p><p>`"lt": "..."`</p><p>`"lte": "..."`</p><p>`"gt_lt": ["..."]`</p><p>`"gte_lte": ["..."]`</p><p>`"gte_lt": ["..."]`</p><p>`"gt_lte": ["..."]`</p> |
|**`line_item_ids`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`line_item_codes`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`line_item_item_types`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`line_item_total_amount`** | Object | <p>One of:</p><p>`"eq": ...`</p><p>`"ne": ...`</p><p>`"gt": ...`</p><p>`"gte": ...`</p><p>`"lt": ...`</p><p>`"lte": ...`</p><p>`"gt_lt": [...]`</p><p>`"gte_lte": [...]`</p><p>`"gte_lt": [...]`</p><p>`"gt_lte": [...]`</p> |
|**`line_item_tax_amount`** | Object | <p>One of:</p><p>`"eq": ...`</p><p>`"ne": ...`</p><p>`"gt": ...`</p><p>`"gte": ...`</p><p>`"lt": ...`</p><p>`"lte": ...`</p><p>`"gt_lt": [...]`</p><p>`"gte_lte": [...]`</p><p>`"gte_lt": [...]`</p><p>`"gt_lte": [...]`</p> |
|**`line_item_tax_rate`** | Object | <p>One of:</p><p>`"eq": ...`</p><p>`"ne": ...`</p><p>`"gt": ...`</p><p>`"gte": ...`</p><p>`"lt": ...`</p><p>`"lte": ...`</p><p>`"gt_lt": [...]`</p><p>`"gte_lte": [...]`</p><p>`"gte_lt": [...]`</p><p>`"gt_lte": [...]`</p> |
|**`line_item_updated_at`** | Object | <p>One of:</p><p>`"eq": "..."`</p><p>`"ne": "..."`</p><p>`"gt": "..."`</p><p>`"gte": "..."`</p><p>`"lt": "..."`</p><p>`"lte": "..."`</p><p>`"gt_lt": ["..."]`</p><p>`"gte_lte": ["..."]`</p><p>`"gte_lt": ["..."]`</p><p>`"gt_lte": ["..."]`</p> |

#### `stock_location` field
| Attribute | Type | Values |
| ---- | --- | ------ |
|**`ids`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`names`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`references`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`reference_origins`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |

#### `tags` field
| Attribute | Type | Values |
| ---- | --- | ------ |
|**`ids`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |
|**`names`** | Object | <p>One of:</p><p>`"in": ["..."]`</p><p>`"not_in": ["..."]`</p> |

[](FIELD-OPERATORS-WITH-KEY-TABLE_END)