---
description: >-
  How to use the Metrics API to get mixed stats about the number of SKUs
  included in the orders of your organization, grouped by different countries
---

# Number of products per order by country

### The problem

You want to get some common statistics about the number of SKUs present in your organization's orders over a selected date and time range, grouped by the different countries you're selling in. Specifically:

| Stat        | Description                                                                    |
| ----------- | ------------------------------------------------------------------------------ |
| **`count`** | The total number of orders considered for the computation.                     |
| **`max`**   | The minimum number of SKUs included in a single order.                         |
| **`min`**   | The maximum number of SKUs included in a single order.                         |
| **`avg`**   | The average number of SKUs included in a single order.                         |
| **`sum`**   | The sum of all the SKUs included in the orders considered for the computation. |

### The solution

#### Query

You need to perform a [breakdown query](../queries/breakdown.md) setting the required query keys as follows and adding the optional ones based on your needs:

| Key            | Value                |
| -------------- | -------------------- |
| **`by`**       | `order.country_code` |
| **`field`**    | `order.skus_count`   |
| **`operator`** | `stats`              |

#### Filter

Make sure to set the desired date and time range using the `date_from` and `date_to` keys in the [filter](../filters.md).&#x20;

In the example below, since the `date_field` isn't specified in the [date filter](../filters.md#date-filters), the default value `current_date` will be used, meaning that the results will count all the orders that changed their status within the selected date and time range ([read more](../filters.md#how-date\_field-works) about this).

### [Try it on Postman](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-4715d00c-f087-478a-bd38-94988736534f) :rocket:

### Example

{% tabs %}
{% tab title="Request" %}
The following request uses the Metrics API to get mixed stats about the number of SKUs included in your orders, groped by country:

<pre class="language-shell"><code class="lang-shell">curl -g -X POST \
  'https://{{your_domain}}.commercelayer.io/metrics/orders/stats' \
  -H 'Accept: application/vnd.api.v1+json' \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Authorization: Bearer {{your_access_token}}' \
  -d '{
    "breakdown": {
<strong>      "by": "order.country_code",
</strong><strong>      "field": "order.skus_count",
</strong><strong>      "operator": "stats",
</strong>      "sort": "desc",
      "limit": 20
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
        "label": "US",
        "value": {
          "count": 1993,
          "min": 1.0,
          "max": 23,
          "avg": 3.51,
          "sum": 6998.0
        }
      },
      {
        "label": "GB",
        "value": {
          "count": 8991,
          "min": 1.0,
          "max": 14,
          "avg": 2.1,
          "sum": 18881.0
        }
      },
      {
        "label": "IT",
        "value": {
          "count": 25676,
          "min": 1.0,
          "max": 10.0,
          "avg": 1.87,
          "sum": 48270.0
        }
      },
      { ... }
    ]
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

* [Total number of orders by country code](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-45966f92-6bd9-4553-9be9-a6ce3f72d547)
* [Total number of tagged orders by tag name](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-d33279f4-8af0-4b36-b605-daf569804f30)
* [Total number of orders by market name](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-23271bfb-c23d-42f6-b543-5ae48221cb08)
* [Total number of orders by shipping address city](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-977df72f-2676-4a51-a2e9-2b9778eb420d)
* [Total number of orders by repeat customer](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-897253a9-13e8-434b-be48-71f10148dc8a)
* [Total number of orders by bundle name](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-142444a4-06f5-4625-97fd-6af7a8d046a3)
* [Total number of orders by customer email associated with a specific coupon](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-3e64b409-1e8b-4eda-af49-d7456773be1d)
* [Total number of orders with a specific personalization option](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-fae82b71-4e79-4ad0-947f-2b3aba14a248)
* [Total number of orders by currency code](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-646ba0ce-5e3f-4298-a629-1cd3f14ca0dc)