---
description: How to use the Metrics API to get the most recently archived orders
---

# Latest archived orders

### The problem

You want to get the latest 100 orders that have been recently archived, over a selected date and time range, chronologically ordered by date of archival.

### The solution

#### Query

You need to perform a [search query](../queries/search.md) setting the required query keys as follows and adding the optional ones based on your needs:

<table><thead><tr><th width="367">Key</th><th>Value</th></tr></thead><tbody><tr><td><strong><code>limit</code></strong></td><td><code>100</code></td></tr><tr><td><strong><code>sort_by</code></strong></td><td><code>order.archived_at</code></td></tr></tbody></table>

{% hint style="info" %}
If you want to focus on some specific information about the carts you're searching for, just fill in the `fields` array with the list of attributes you want to get in the response.
{% endhint %}

#### Filter

Set the desired date and time range using the `date_from` and `date_to` keys and add an additional [filter](../filters.md) on the [line items](https://app.gitbook.com/s/lhTYC557IzGiJNS84RKD/resources/carts/filters#line\_items-field) field to restrict the related search on carts that contain the desired SKU only:

| Attribute      | Operator |
| -------------- | -------- |
| **`archived`** | `true`   |

As shown in the example below, use `archived_at` as the `date_field` in the [date filter](../filters.md#date-filters) if you want the results to count all the orders that were archived in the selected date and time range ([read more](../filters.md#how-date\_field-works) about this).

### [Try it on Postman](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-c8d3c3b4-dc19-40ac-98c4-5152687b461b) :rocket:

### Example

{% tabs %}
{% tab title="Request" %}
The following request uses the Metrics API to get the latest archived orders:

<pre class="language-shell"><code class="lang-shell">curl -g -X POST \
  'https://{{your_domain}}.commercelayer.io/metrics/orders/search' \
  -H 'Accept: application/vnd.api.v1+json' \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Authorization: Bearer {{your_access_token}}' \
  -d '{
    "search": {
<strong>      "limit": 100,
</strong>      "sort": "desc",
<strong>      "sort_by": "order.archived_at",
</strong><strong>      "fields": [ "order.id", "order.number", "order.archived_at" ]
</strong>    },
    "filter": {
      "order": {
        "date_from": "2021-01-01T00:00:00Z",
        "date_to": "2021-12-31T23:59:00Z",
<strong>        "date_field": "archived_at",
</strong><strong>        "archived": true
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
      "id": "NrnYhAdVXO",
      "number": "2434779",
      "archived_at": "2021-07-15T15:00:49.154Z"
    },
    {
      "id": "NEBrhvrjRO",
      "number": "2431839",
      "archived_at": "2021-04-16T14:29:29.350Z"
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
* [Latest placed orders from customer with specific email domains](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-b26fe7ba-e32b-4b44-8077-32833046838b)
* [Latest created carts containing a specific SKU and associated with a specific market](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-86ed9b2b-7d46-4950-8646-fb07ccb1fc5e)