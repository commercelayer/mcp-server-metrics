---
description: >-
  How to use the Metrics API to get the total number of orders that triggered a
  specific promotion
---

# Orders associated with a specific promotion

### The problem

You want to get the total number of orders to which a specific promotion (identified by its type and name) was applied, over a selected date and time range.

### The solution

#### Query

You need to perform a [stats query](../queries/stats.md) setting the required query keys as follows and adding the optional ones based on your needs:

<table><thead><tr><th width="367">Key</th><th>Value</th></tr></thead><tbody><tr><td><strong><code>field</code></strong></td><td><code>order.id</code></td></tr><tr><td><strong><code>operator</code></strong></td><td><code>value_count</code></td></tr></tbody></table>

#### Filter

Set the desired date and time range using the `date_from` and `date_to` keys and add additional [filters](../filters.md) on the [line items](https://app.gitbook.com/s/lhTYC557IzGiJNS84RKD/resources/orders/filters#line\_items-field) field to restrict the related computation to the orders that triggered the desired promotion:

| Attribute   | Operator                                     |
| ----------- | -------------------------------------------- |
| **`types`** | `"in": [ "percentage_discount_promotions" ]` |
| **`names`** | `"in": [ "Percentage 50" ]`                  |

As shown in the example below, use `placed_at` as the `date_field` in the [date filter](../filters.md#date-filters) if you want the results to count all the orders that were placed in the selected date and time range ([read more](../filters.md#how-date\_field-works) about this).

### [Try it on Postman](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-7565bb88-0d19-407b-81c8-48948d3ba170) :rocket:

### Example

{% tabs %}
{% tab title="Request" %}
The following request uses the Metrics API to get the total number of orders that triggered a specific promotion:

<pre class="language-shell"><code class="lang-shell">curl -g -X POST \
  'https://{{your_domain}}.commercelayer.io/metrics/orders/stats' \
  -H 'Accept: application/vnd.api.v1+json' \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Authorization: Bearer {{your_access_token}}' \
  -d '{
    "stats": {
<strong>      "field": "order.id",
</strong><strong>      "operator": "value_count"
</strong>    },
    "filter": {
      "order": {
        "date_from": "2021-01-01T00:00:00Z",
        "date_to": "2021-12-31T23:59:00Z",
        "date_field": "placed_at"
      },
<strong>      "line_items": {
</strong><strong>        "types": {
</strong><strong>          "in": [ "percentage_discount_promotions" ]
</strong><strong>        },
</strong><strong>        "names": {
</strong><strong>          "in": [ "Percentage 50" ]
</strong><strong>        }
</strong><strong>      }
</strong>    }
  }'
</code></pre>
{% endtab %}

{% tab title="Response" %}
On success, the API responds with a `200 OK` status code, returning the computed value in the `data` object and additional information in the `meta` object:

```json
{
  "data": {
    "value": 234
  },
  "meta": {
    "type": "stats",
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

* [Total number of orders over a specific period of time](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-93bb1bee-3c17-41e6-a607-e44338da0af5)
* [Total number of orders paid with a coupon](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-54509017-dee7-4f23-b446-56f76089ccf8)
* [Total number of orders paid with a specific coupon code](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-82148a2d-bdbe-4d22-b214-ba6ce1e88f7b)
* [Total number of orders paid with a gift card](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-1d063d88-ce7e-4882-838a-4218370af66d)
* [Total number of orders that took more than 5 minutes to be placed](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-cba9a5f0-0604-407a-a424-895f3357df3a)
* [Total number of refunded orders](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-b94b2043-0b0a-400f-a0c4-d30a733dda7d)
* [Total number of returned orders](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-61009f69-1030-454a-b336-7c89ec0d4d64)
* [Total number of orders to which a discount was applied](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-41eec32c-4d1a-4ee8-9230-aa0625c3e7f3)
* [Total orders with a personalization option](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-6700fd9d-06e3-4307-93c3-7610f63b1cf5)
* [Mixed stats about the number of products per order](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-03005620-06ed-4b4b-ad77-070fb6b9b836)
* [Total number of orders containing a specific list of products](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-3a1a48cf-6d7d-434c-bb1e-43c5c4f42eb5)
* [Total number of orders with amounts greater than $100](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-2010fe8b-ac4b-4b6d-9434-dade4f79623f)
* [Total number of customers over a specific period of time](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-1fe910da-5025-4ce2-8de4-b39ef4f99987)
* [Total number of customers who bought a specific product or bundle](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-b81acc2a-1aec-4d8c-b36f-36ab623668a6)
* [Mixed stats about returns that contain more than one product](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-c19a728e-fe16-4135-850f-e1a83f418f7c)
* [Total number of pending carts with more than one product](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-c62d9eb4-1521-4dcf-b59a-6223b44e688b)
* [Total amount lost due to potentially abandoned carts over a specific period of time](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-4e9dfa90-6e88-4fef-a326-4a06632cabcc)
* [Total number of pending carts with amount greater than 100€](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-182afd85-874e-4c8c-b56c-58438021c82e)
* [Shipments average time in picking](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-cecca701-8d12-4027-aff3-232f222319da)