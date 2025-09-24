---
description: >-
  How to use the Metrics API to get the total number of refunds of your
  organization, grouped by the different countries and currencies
---

# Refunds by country and currency

### The problem

You want to get the total number of refunds associated with your orders over a selected date and time range, grouped by the different countries your organization sells in. For each country, you also want to group the results by currency.

### The solution

#### Query

You need to perform a [breakdown query](../queries/breakdown.md) setting the required query keys as follows and adding the optional ones based on your needs:

<table><thead><tr><th width="367">Key</th><th>Value</th></tr></thead><tbody><tr><td><strong><code>by</code></strong></td><td><code>order.country_code</code></td></tr><tr><td><strong><code>field</code></strong></td><td><code>refunds.id</code></td></tr><tr><td><strong><code>operator</code></strong></td><td><code>value_count</code></td></tr></tbody></table>

You also need to add a [nested breakdown](../queries/breakdown.md#nesting-breakdowns) setting the related query keys as follows:

<table><thead><tr><th width="367">Key</th><th>Value</th></tr></thead><tbody><tr><td><strong><code>by</code></strong></td><td><code>order.currency_code</code></td></tr><tr><td><strong><code>field</code></strong></td><td><code>refunds.id</code></td></tr><tr><td><strong><code>operator</code></strong></td><td><code>value_count</code></td></tr></tbody></table>

#### Filter

Make sure to set the desired date and time range using the `date_from` and `date_to` keys in the [filter](../filters.md).&#x20;

In the example below, since the `date_field` isn't specified in the [date filter](../filters.md#date-filters), the default value `current_date` will be used, meaning that the results will count all the orders that changed their status within the selected date and time range ([read more](../filters.md#how-date_field-works) about this).

### [Try it on Postman](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-1c793071-2d81-47ed-a088-520072a835ed) :rocket:

### Example

{% tabs %}
{% tab title="Request" %}
The following request uses the Metrics API to get the total number of refunds, grouped by country and currency:

<pre class="language-shell"><code class="lang-shell"> curl -g -X POST \
  'https://{{your_domain}}.commercelayer.io/metrics/orders/breakdown' \
  -H 'Accept: application/vnd.api.v1+json' \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Authorization: Bearer {{your_access_token}}' \
  -d '{
    "breakdown": {
<strong>      "by": "order.country_code",
</strong><strong>      "field": "refunds.id",
</strong><strong>      "operator": "value_count",
</strong>      "sort": "desc",
      "limit": 20,
      "breakdown": {
<strong>        "by": "order.currency_code",
</strong><strong>        "field": "refunds.id",
</strong><strong>        "operator": "value_count",
</strong>        "sort": "desc",
        "limit": 20
      }
    },
    "filter": {
      "order": {
        "date_from": "2021-01-01T00:00:00Z",
        "date_to": "2021-12-31T23:59:00Z"
      }
    }
  }'
</code></pre>
{% endtab %}

{% tab title="Response" %}
On success, the API responds with a `200 OK` status code, returning the aggregated, nested values in the `data` object and extra information in the `meta` object:

```json
{
  "data": {
    "order.country_code": [
      {
        "label": "GB",
        "value": 8957,
        "order.currency_code": [
          {
            "label": "GBP",
            "value": 8905
          },
          {
            "label": "USD",
            "value": 43
          },
          {
            "label": "EUR",
            "value": 9
          }
        ]
      },
      {
        "label": "DE",
        "value": 1576,
        "order.currency_code": [
          {
            "label": "EUR",
            "value": 1576
          }
        ]
      },
      {
        "label": "US",
        "value": 749,
        "order.currency_code": [
          {
            "label": "USD",
            "value": 746
          },
          {
            "label": "EUR",
            "value": 2
          },
          {
            "label": "GBP",
            "value": 1
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
* [Top 5 best-selling products in the best-selling markets](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-a3aac79d-645d-4471-8a6b-cdc97ff6c87e)
* [Top 5 best-selling countries for the best-selling products](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-0d6a426a-1dcb-4e0d-a5d4-164d7e5ae13a)
* [Total number of orders by status and payment status](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-e53340bf-3799-42a1-b316-3f2c6a20a785)
* [Top 10 spenders by currencies](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-6f2183c6-b5fd-4d6b-9cb9-b201ea64a16d)
* [Total number of active returns by market name and return status](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-e4671c3d-17b4-4be3-9261-0fbcc8933408)
* [Total number of orders by customer email associated with a specific coupon](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-3e64b409-1e8b-4eda-af49-d7456773be1d)
* [Total number of carts by status and related amount stats by currency code](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-a948ab86-4e2d-4954-99b2-d1eb319de05a)
* [Total number of pending carts by customer email and payment method name](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-3a498993-83df-41de-ba40-5a1ebc38cdb4)
* [Total number of orders by shipment status and shipping method name](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-11194-acee0b06-91e5-4087-b830-0f570d3b8b47)
* [Total number of orders by resource errors code and message](https://www.postman.com/commercelayer/commerce-layer-public-workspace/documentation/ontyt81/commerce-layer-metrics-api-2024-06-11?entity=request-19711194-d94f6190-02ca-499f-8d0e-af0ce7f5e1ce)