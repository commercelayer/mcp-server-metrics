---
description: >-
  How to use the Metrics API to get the total number of returns requested for
  your orders, grouped by year and destination city
---

# Returns per year by destination city

### The problem

You want to get the total number of returns requested for your orders, over a selected date and time range, grouped by year. For each year, you also want to group the results by the city where the stock location to which the items were returned is located and know the average number of SKUs the were included in the returns.

### The solution

#### Query

You need to perform a [date breakdown query](../queries/date-breakdown.md) setting the required query keys as follows and adding the optional ones based on your needs:

| Key            | Value                 |
| -------------- | --------------------- |
| **`by`**       | `return.current_date` |
| **`field`**    | `return.id`           |
| **`operator`** | `value_count`         |
| **`interval`** | `year`                |

{% hint style="info" %}
Change the `interval` key if you want to group the results differently (e.g. by `day` or `hour` — default is `month`).
{% endhint %}

You also need to add a [nested breakdown](../queries/breakdown.md#nesting-breakdowns) setting the related query keys as follows:

| Key            | Value                      |
| -------------- | -------------------------- |
| **`by`**       | `destination_address.city` |
| **`field`**    | `return.skus_count`        |
| **`operator`** | `avg`                      |

#### Filter

Make sure to set the desired date and time range using the `date_from` and `date_to` keys in the [filter](../filters.md).&#x20;

In this example, since the `date_field` isn't specified, the default value `current_date` will be used. Being the same date time field used in the `by` key of the query, you'll get in the response all the returns that actually changed their status each day within the selected date and time range ([read more](../filters.md#combining-date-filters-and-date-breakdown-queries) about this).

{% hint style="info" %}
Since the `interval` key is set to `year` and the date and time range specified in the date filter is also exactly one year the response will contain only one time interval (the one referring to that specific year).
{% endhint %}

### [Try it on Postman](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-441630dc-df89-4439-a1f6-f8a1068f3d15) :rocket:

### Example

{% tabs %}
{% tab title="Request" %}
The following request uses the Metrics API to get the total number of returns, grouped by year and destination city:

<pre class="language-shell"><code class="lang-shell">curl -g -X POST \
  'https://{{your_domain}}.commercelayer.io/metrics/returns/date_breakdown' \
  -H 'Accept: application/vnd.api.v1+json' \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Authorization: Bearer {{your_access_token}}' \
  -d '{
    "date_breakdown": {
<strong>      "by": "return.current_date",
</strong><strong>      "field": "return.id",
</strong><strong>      "operator": "value_count",
</strong><strong>      "interval": "year",
</strong>      "breakdown": {
<strong>        "by": "destination_address.city",
</strong><strong>        "field": "return.skus_count",
</strong><strong>        "operator": "avg"
</strong>      }
    },
    "filter": {
      "return": {
        "date_from": "2021-01-01T00:00:00Z",
        "date_to": "2021-12-31T23:59:00Z"
      }
    }
  }'</code></pre>
{% endtab %}

{% tab title="Response" %}
On success, the API responds with a `200 OK` status code, returning the aggregated values in the `data` object and extra information in the `meta` object:

<pre class="language-json"><code class="lang-json">{
  "data": [
    {
<strong>      "date": "2021-01-01T00:00:00.000Z",
</strong>      "value": 123,
      "destination_address.city": [
        {
          "label": "London",
          "value": 2.75
        },
        {
          "label": "New York",
          "value": 1.67
        },
        {
          "label": "Los Angeles",
          "value": 1.5
        },
        {
          "label": "Paris",
          "value": 1.23
        },
        {
          "label": "Milan",
          "value": 1.11
        },
        { ... }
      ]
    }
  ],
  "meta": {
    "type": "date_breakdown",
    "trace_id": "fe571ea2-8a4f-4a5e-bd26-ac54651bb2e4",
    "mode": "test",
    "organization_id": "xYZkjABcde",
    "market_ids": [ "yzXKjYzaCx", "..." ]
  }
}</code></pre>
{% endtab %}
{% endtabs %}