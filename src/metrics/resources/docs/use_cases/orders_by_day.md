---
description: >-
  How to use the Metrics API to get the total number of orders of your
  organization, grouped by day
---

# Orders by day

### The problem

You want to get the total number of orders over a selected date and time range, grouped by day.

### The solution

#### Query

You need to perform a [date breakdown query](../queries/date-breakdown.md) setting the required query keys as follows and adding the optional ones based on your needs:

| Key            | Value                |
| -------------- | -------------------- |
| **`by`**       | `order.current_date` |
| **`field`**    | `order.id`           |
| **`operator`** | `value_count`        |
| **`interval`** | `day`                |

{% hint style="info" %}
Change the `interval` key if you want to group the results differently (e.g. by `year` or `hour` — default is `month`).
{% endhint %}

#### Filter

Make sure to set the desired date and time range using the `date_from` and `date_to` keys in the [filter](../filters.md).&#x20;

In this example, since the `date_field` isn't specified, the default value `current_date` will be used. Being the same date time field used in the `by` key of the query, you'll get in the response all the orders that actually changed their status each day within the selected date and time range ([read more](../filters.md#combining-date-filters-and-date-breakdown-queries) about this).

### [Try it on Postman](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-582c1d0b-78ff-4d1a-be8e-abeaefdb608b) :rocket:

### Example

{% tabs %}
{% tab title="Request" %}
The following request uses the Metrics API to get the total number of orders, grouped by day:

<pre class="language-shell"><code class="lang-shell">curl -g -X POST \
  'https://{{your_domain}}.commercelayer.io/metrics/orders/date_breakdown' \
  -H 'Accept: application/vnd.api.v1+json' \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Authorization: Bearer {{your_access_token}}' \
  -d '{
    "date_breakdown": {
<strong>      "by": "order.current_date",
</strong><strong>      "field": "order.id",
</strong><strong>      "operator": "value_count",
</strong><strong>      "interval": "day"
</strong>    },
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
On success, the API responds with a `200 OK` status code, returning the aggregated values in the `data` object and extra information in the `meta` object:

```json
{
  "data": [
    {
      "date": "2021-01-01T00:00:00.000Z",
      "value": 1196
    },
    {
      "date": "2021-01-02T00:00:00.000Z",
      "value": 1371
    },
    {
      "date": "2021-01-03T00:00:00.000Z",
      "value": 1574
    },
    {
      "date": "2021-01-04T00:00:00.000Z",
      "value": 1735
    },
    { ... },
    {
      "date": "2021-12-30T00:00:00.000Z",
      "value": 2344
    },
    {
      "date": "2021-12-31T00:00:00.000Z",
      "value": 1905
    }
  ],
  "meta": {
    "type": "date_breakdown",
    "trace_id": "fe571ea2-8a4f-4a5e-bd26-ac54651bb2e4",
    "mode": "test",
    "organization_id": "xYZkjABcde",
    "market_ids": [ "yzXKjYzaCx", "..." ]
  }
}
```
{% endtab %}
{% endtabs %}