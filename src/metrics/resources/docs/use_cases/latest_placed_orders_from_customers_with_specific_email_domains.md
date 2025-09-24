---
description: >-
  How to use the Metrics API to get the last placed orders containing specific
  email domains in the aggregated details
---

# Latest placed orders from customers with specific email domains

### The problem

You want to get the last ten placed orders that contain two specific email domain in the aggregated details full text, over a selected date and time range, chronologically ordered by date of placement.

### The solution

#### Query

You need to perform a [search query](../queries/search.md) setting the required query keys as follows and adding the optional ones based on your needs:

<table><thead><tr><th width="367">Key</th><th>Value</th></tr></thead><tbody><tr><td><strong><code>limit</code></strong></td><td><code>10</code></td></tr><tr><td><strong><code>sort_by</code></strong></td><td><code>order.placed_at</code></td></tr></tbody></table>

{% hint style="info" %}
If you want to focus on some specific information about the carts you're searching for, just fill in the `fields` array with the list of attributes you want to get in the response.
{% endhint %}

#### Filter

Set the desired date and time range using the `date_from` and `date_to` keys and add an additional [filter](../filters.md) on the [order](https://app.gitbook.com/s/lhTYC557IzGiJNS84RKD/resources/orders/filters#order-field) field to restrict the related search on orders whose aggregated details matches the query:

| Attribute                | Operator                                             |
| ------------------------ | ---------------------------------------------------- |
| **`aggregated_details`** | `"query": "(*@gmail.com \| *@hotmail.com) + placed"` |

As shown in the example below, use `placed_at` as the `date_field` in the [date filter](../filters.md#date-filters) if you want the results to count all the orders that were placed in the selected date and time range ([read more](../filters.md#how-date\_field-works) about this).

### [Try it on Postman](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-b26fe7ba-e32b-4b44-8077-32833046838b) :rocket:

### Example

{% tabs %}
{% tab title="Request" %}
The following request uses the Metrics API to search a specific query within the aggregated details of an ordert:

<pre class="language-shell"><code class="lang-shell">curl -g -X POST \
  'https://{{your_domain}}.commercelayer.io/metrics/orders/search' \
  -H 'Accept: application/vnd.api.v1+json' \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Authorization: Bearer {{your_access_token}}' \
  -d '{
    "search": {
<strong>      "limit": 10,
</strong>      "sort": "asc",
<strong>      "sort_by": "order.placed_at",
</strong><strong>      "fields": [ "order.id", "order.number", "order.status", "customer.email" ]
</strong>    },
    "filter": {
      "order": {
        "date_from": "2021-01-01T00:00:00Z",
        "date_to": "2021-12-31T23:59:00Z",
        "date_field": "placed_at",
<strong>        "aggregated_details": {"query": "(*@gmail.com | *@hotmail.com) + placed" }
</strong>      }
    }
  }'
</code></pre>
{% endtab %}

{% tab title="Response" %}
On success, the API responds with a `200 OK` status code, returning the requested fields in the `data` object and additional information alongside pagination in the `meta` object:

```json
{
  "data": [
    {
      "id": "XQehvkzvEW",
      "number": "57228640",
      "status": "placed",
      "customer": {
        "email": "jim.smith@gmail.com"
      }
    },
    {
      "id": "KaeheDObgV",
      "number": "57230928",
      "status": "placed",
      "customer": {
        "email": "rob.dusy@gmail.com"
      }
    },
    {
      "id": "FafhdDOgvK",
      "number": "57242561",
      "status": "placed",
      "customer": {
        "email": "janet.holly@hotmail.com"
      }
    },
    { ... }
  ],
  "meta": {
    "pagination": {
    "record_count": 123,
    "cursor": "LS0tCi0gJzIwMjEtMTItMzFUMjM6NDE6M=="
    },
    "type": "search",
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

* [Latest approved returns over a specific period of time](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-fca00098-c2f8-45ab-b9e7-58bf3e407137)
* [Latest returns shipped from a specific country](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-05812960-f25d-482b-aaae-f723dea4d8ab)
* [Latest created carts containing a specific SKU and associated with a specific market](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-86ed9b2b-7d46-4950-8646-fb07ccb1fc5e)
* [Latest archived orders](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-c8d3c3b4-dc19-40ac-98c4-5152687b461b)