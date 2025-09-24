---
description: >-
  How to use the Metrics API to get the Top 5 best-selling products for each of
  your organization's market
---

# Best-selling products by market

### The problem

You want to get the total number of orders over a selected date and time range, grouped by the different markets of your organization. For each market, you also want to know what the best-selling SKUs are.

### The solution

#### Query

You need to perform a [breakdown query](../queries/breakdown.md) setting the required query keys as follows and adding the optional ones based on your needs:

<table><thead><tr><th width="367">Key</th><th>Value</th></tr></thead><tbody><tr><td><strong><code>by</code></strong></td><td><code>market.name</code></td></tr><tr><td><strong><code>field</code></strong></td><td><code>order.id</code></td></tr><tr><td><strong><code>operator</code></strong></td><td><code>value_count</code></td></tr></tbody></table>

You also need to add a [nested breakdown](../queries/breakdown.md#nesting-breakdowns) setting the related query keys as follows:

<table><thead><tr><th width="367">Key</th><th>Value</th></tr></thead><tbody><tr><td><strong><code>by</code></strong></td><td><code>line_items.name</code></td></tr><tr><td><strong><code>field</code></strong></td><td><code>order.id</code></td></tr><tr><td><strong><code>operator</code></strong></td><td><code>value_count</code></td></tr><tr><td><strong><code>limit</code></strong></td><td><code>5</code></td></tr></tbody></table>

#### Filter

Set the desired date and time range using the `date_from` and `date_to` keys and add an additional [filter](../filters.md) on the [line items](https://app.gitbook.com/s/lhTYC557IzGiJNS84RKD/resources/orders/filters#line_items-field) field to restrict the related computation on SKUs only:

| Attribute   | Operator           |
| ----------- | ------------------ |
| **`types`** | `"in": [ "skus" ]` |

As shown in the example below, use `placed_at` as the `date_field` in the [date filter](../filters.md#date-filters) if you want the results to count all the orders that were placed in the selected date and time range ([read more](../filters.md#how-date_field-works) about this).

### [Try it on Postman](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-a3aac79d-645d-4471-8a6b-cdc97ff6c87e) :rocket:

### Example

{% tabs %}
{% tab title="Request" %}
The following request uses the Metrics API to get the total number of orders, grouped by market name and, for each market, the Top 5 best-selling SKUs:

<pre class="language-shell"><code class="lang-shell">curl -g -X POST \
  'https://{{your_domain}}.commercelayer.io/metrics/orders/breakdown' \
  -H 'Accept: application/vnd.api.v1+json' \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Authorization: Bearer {{your_access_token}}' \
  --data-raw '{
    "breakdown": {
<strong>      "by": "market.name",
</strong><strong>      "field": "order.id",
</strong><strong>      "operator": "value_count",
</strong>      "sort": "desc",
      "limit": 100,
      "breakdown": {
<strong>        "by": "line_items.name",
</strong><strong>        "field": "order.id",
</strong><strong>        "operator": "value_count",
</strong>        "sort": "desc",
<strong>        "limit": 5
</strong>      }
    },
    "filter": {
      "order": {
        "date_from": "2021-01-01T00:00:00Z",
        "date_to": "2021-12-31T23:59:00Z",
        "date_field": "placed_at"
      },
<strong>      "line_items": {
</strong><strong>        "types": {
</strong><strong>          "in": ["skus"]
</strong><strong>        }
</strong><strong>      }
</strong>    }
  }'
</code></pre>
{% endtab %}

{% tab title="Response" %}
On success, the API responds with a `200 OK` status code, returning the aggregated, nested values in the `data` object and extra information in the `meta` object:

```json
{
  "data": {
    "market.name": [
      {
        "label": "UK",
        "value": 545904,
        "line_items.name": [
          {
            "label": "Blue T-shirt",
            "value": 25281
          },
          {
            "label": "Red T-shirt",
            "value": 23923
          },
          {
            "label": "Green T-shirt",
            "value": 13413
          },
          {
            "label": "Black T-shirt",
            "value": 13206
          },
          {
            "label": "White T-shirt",
            "value": 11814
          }
        ]
      },
      {
        "label": "Italy",
        "value": 164862,
        "line_items.name": [
          {
            "label": "Black T-shirt",
            "value": 98244
          },
          {
            "label": "White T-shirt",
            "value": 28799
          },
          {
            "label": "Yellow T-shirt",
            "value": 19833
          },
          {
            "label": "Blue T-shirt",
            "value": 13942
          },
          {
            "label": "Red T-shirt",
            "value": 524
          }
        ]
      },
      { ... }
    ]
  },
  "meta": {
    "type": "breakdown",
    "trace_id": "fe571ea2-8a4f-4a5e-bd26-ac54651bb2e4",
    "mode": "test",
    "organization_id": "xYZkjABcde",
    "market_ids": [ "yzXKjYzaCx", "..." ]
  }
}
```
{% endtab %}
{% endtabs %}

### Similar cases

Just changing a couple of query keys and/or filter parameters you can address lots of very similar use cases, such as:

* [Total number of orders by market and payment method name](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-964bdc6f-a5d5-4d91-80e3-beba6866a13c)
* [Average order total amount by currency and country code](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-a92975e5-e80e-424e-80d7-7bcd75f01cb2)
* [Total number of orders by status and payment status](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-e53340bf-3799-42a1-b316-3f2c6a20a785)
* [Top 5 best-selling countries for the best-selling products](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-0d6a426a-1dcb-4e0d-a5d4-164d7e5ae13a)
* [Top 10 spenders by currencies](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-6f2183c6-b5fd-4d6b-9cb9-b201ea64a16d)
* [Total number of refunds by country and currency code](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-1c793071-2d81-47ed-a088-520072a835ed)
* [Total number of orders by customer email associated with a specific coupon](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-3e64b409-1e8b-4eda-af49-d7456773be1d)
* [Total number of active returns by market name and return status](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-e4671c3d-17b4-4be3-9261-0fbcc8933408)
* [Total number of carts by status and related amount stats by currency code](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-a948ab86-4e2d-4954-99b2-d1eb319de05a)
* [Total number of pending carts by customer email and payment method name](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-3a498993-83df-41de-ba40-5a1ebc38cdb4)
* [Total number of orders by shipment status and shipping method name](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-11194-acee0b06-91e5-4087-b830-0f570d3b8b47)
* [Total number of orders by resource errors code and message](https://www.postman.com/commercelayer/commerce-layer-public-workspace/documentation/ontyt81/commerce-layer-metrics-api-2024-06-11?entity=request-19711194-d94f6190-02ca-499f-8d0e-af0ce7f5e1ce)