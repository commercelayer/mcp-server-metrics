---
description: How to perform a date breakdown query and how it works
---

# Date breakdown

**Date breakdowns** are aggregations that show the frequency of occurrence of a specific date value within a dataset and let you apply a specific [operator](./#query-operators) over a selected field of the records that are present on that date. When performing a date breakdown query on the Metrics API endpoint you get in the [response](date-breakdown.md#response) the list by date of the values of the computation (based on the selected `operator`) on the selected `field`, over the selected time `interval`, aggregated `by` another field.

### Request

To perform a date breakdown query send a `POST` request to the `/{{resource_name}}/date_breakdown` endpoint specifying the [query keys](date-breakdown.md#query-keys) and [filter](../filters.md) parameters:

<pre class="language-json"><code class="lang-json">{
<strong>  "date_breakdown": {
</strong>    "by": "...",
    "field": "...",
    "operator": "...",
    "interval": "...",
    "breakdown": { ... }
  },
  "filter": { ... },
  "meta": { ... }
}
</code></pre>

#### Query keys

<table><thead><tr><th>Key</th><th>Type</th><th data-type="checkbox">Required</th><th>Description</th><th>Values</th></tr></thead><tbody><tr><td><strong><code>by</code></strong></td><td>String</td><td>true</td><td>The date field you want the results of the query aggragated by.</td><td>The available values for this key depend on the resource you're doing statistics on (see <a href="https://app.gitbook.com/s/lhTYC557IzGiJNS84RKD/resources/orders/date-breakdown#by-values">orders</a>, returns, or <a href="https://app.gitbook.com/s/lhTYC557IzGiJNS84RKD/resources/carts/date-breakdown#by-values">carts</a> for the related lists).</td></tr><tr><td><strong><code>field</code></strong></td><td>String</td><td>true</td><td>The field you want the metrics or statistics computed on.</td><td>The available values for this key depend on the resource you're doing statistics on (see <a href="https://app.gitbook.com/s/lhTYC557IzGiJNS84RKD/resources/orders/date-breakdown#operators-and-field-values">orders</a>, <a href="https://app.gitbook.com/s/lhTYC557IzGiJNS84RKD/resources/returns/date-breakdown#operators-and-field-values">returns</a>, or <a href="https://app.gitbook.com/s/lhTYC557IzGiJNS84RKD/resources/carts/date-breakdown#operators-and-field-values">carts</a> for the related lists).</td></tr><tr><td><strong><code>operator</code></strong></td><td>String</td><td>true</td><td>The computing operator.</td><td>The available operators depend on the <code>field</code> key value (see <a href="https://app.gitbook.com/s/lhTYC557IzGiJNS84RKD/resources/orders/date-breakdown#operators-and-field-values">orders</a>, <a href="https://app.gitbook.com/s/lhTYC557IzGiJNS84RKD/resources/returns/date-breakdown#operators-and-field-values">returns</a>, or <a href="https://app.gitbook.com/s/lhTYC557IzGiJNS84RKD/resources/carts/date-breakdown#operators-and-field-values">carts</a> for the related lists).</td></tr><tr><td><strong><code>interval</code></strong></td><td>String</td><td>false</td><td>The time interval over which the metrics / stats are computed. The results will be aggregated by date accordingly (<a href="date-breakdown.md#date-intervals">read how</a>).</td><td>One of <code>hour</code>, <code>day</code>, <code>week</code>, <code>month</code>, or <code>year</code> (default is <code>month</code>).</td></tr><tr><td><strong>breakdown</strong></td><td><code>object</code></td><td>false</td><td>The optional <a href="breakdown.md">breakdown</a> (eventually <a href="date-breakdown.md#nesting-breakdowns">nested</a>).</td><td>The nested breakdown <code>by</code> key available values depend of the parent breakdown <code>by</code> key value (see <a href="https://app.gitbook.com/s/lhTYC557IzGiJNS84RKD/resources/orders/breakdown#nestable-breakdowns-and-by-values">orders</a>, <a href="https://app.gitbook.com/s/lhTYC557IzGiJNS84RKD/resources/returns/breakdown#nestable-breakdowns-and-by-values">returns</a>, or <a href="https://app.gitbook.com/s/lhTYC557IzGiJNS84RKD/resources/carts/breakdown#nestable-breakdowns-and-by-values">carts</a> for the related lists).</td></tr></tbody></table>

#### Nesting breakdowns

You can nest a breakdown query into a date breakdown one. This means you can request each aggregation by date over the selected time interval to be in turn aggregated `by` another field. Since the nested breakdown is a full-fledged [breakdown](breakdown.md) query, it supports its own [nesting](breakdown.md#nesting-breakdowns) (up to **one** level), as shown in the [following example](date-breakdown.md#date-breakdown-with-nested-breakdown).

{% hint style="warning" %}
You cannot group the nested breakdown by the same field by which you're already grouping the parent breakdown.
{% endhint %}

### Response

The response of a date breakdown query returns an aggregation by date over the time interval specified in the `interval` key, containing the value of the computation (based on the operator specified in the `operator` key) on the field specified in the `field` key. If the query contains a [nested breakdown](date-breakdown.md#nesting-breakdowns), it is also detailed for each item of the array:

<pre class="language-json"><code class="lang-json">{
  "data": [
    {
<strong>      "date": "...",
</strong>      "value": ...,
      "...": [ // breakdown by
        {
          "label": "...",
          "value": ...,
          "...": [ // nested breakdown by
            {
              "label": "...",
              "value": ...
            },
            { ... }
          ]
        },
        { ... }
      ]
    },
    {
<strong>      "date": "...",
</strong>      "value": ...,
      "...": [ // breakdown by
        {
          "label": "...",
          "value": ...,
          "...": [ // nested breakdown by
            {
              "label": "...",
              "value": ...
            },
            { ... }
          ]
        },
        { ... }
      ]
    },
    { ... } 
  ],
  "meta": { ... }
}
</code></pre>

#### Date intervals

The results of a date breakdown query are aggregated over the specified time intervals. You can identify them in the response by looking at the `date` keys:

<pre class="language-json"><code class="lang-json">{
  "data": [
    {
<strong>      "date": "2021-04-01T00:00:00.000Z",
</strong>      "value": { ... }
    },
    {
<strong>      "date": "2021-05-01T00:00:00.000Z",
</strong>      "value": { ... }
    },
    { ... },
    {
<strong>      "date": "2021-09-01T00:00:00.000Z",
</strong>      "value": { ... }
    }
  ],
  "meta": { ... }
}
</code></pre>

{% hint style="info" %}
Please note that those key values are only a reference to identify the related interval. In fact, each `date` key refers to the very beginning of the interval, regardless of the range specified in the [date filter](../filters.md#date-filters) which instead will still be honored for the actual computation (e.g. if you set a date filter that starts on April 15th, 2021 and ends on September 7th, 2021 for a date breakdown by month on the order resource, the first date key will be `2021-04-01T00:00:00.000Z` and the last `2021-09-01T00:00:00.000Z`, but the stats computation will still count the orders from April 15th to September 7th).
{% endhint %}

| Interval    | Date key values            |
| ----------- | -------------------------- |
| **`year`**  | `YYYY-01-01T00:00:00.000Z` |
| **`month`** | `YYYY-MM-01T00:00:00.000Z` |
| **`day`**   | `YYYY-MM-DDT00:00:00.000Z` |
| **`hour`**  | `YYYY-MM-DDTHH:00:00.000Z` |

### Examples

{% hint style="info" %}
The following examples will be focused on the [query](../api-specification.md#query) part of the request. So no specific [filter](../api-specification.md#filter) or [meta](../api-specification.md#meta) options will be defined (i.e. all the results will be filtered by the [default filter](../filters.md#default-filter) and the response won't include the request payload). See the [use cases](../use-cases/) section for more complex combinations of queries and filters.
{% endhint %}

#### Date breakdown

{% tabs %}
{% tab title="Request" %}
The following request performs a date breakdown query to get the stats about the orders placed by month:

<pre class="language-sh"><code class="lang-sh">curl -g -X POST \
  'https://{{your_domain}}.commercelayer.io/metrics/orders/date_breakdown' \
  -H 'Accept: application/vnd.api.v1+json' \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Authorization: Bearer {{your_access_token}}' \
  -d '{
<strong>    "date_breakdown": {
</strong>      "by": "order.placed_at",
      "field": "order.total_amount_with_taxes",
      "operator": "stats",
      "interval": "month"
    }
}'
</code></pre>
{% endtab %}

{% tab title="Response" %}
On success, the API responds with a `200 OK` status code, returning the aggregated values over the selected time intervals in the `data` object and extra information in the `meta` object:

```json
{
  "data": [
    {
      "date": "2022-05-01T00:00:00.000Z",
      "value": {
        "count": 6,
        "min": 65.0,
        "max": 243.0,
        "avg": 128.87,
        "sum": 773.2
      }
    },
    {
      "date": "2022-06-01T00:00:00.000Z",
      "value": {
        "count": 132,
        "min": 0.0,
        "max": 325.0,
        "avg": 78.33,
        "sum": 10340.09
      }
    }
  ],
  "meta": {
    "type": "date_breakdown",
    "trace_id": "b666478b-9c50-497b-a5e4-c7ed4dd7d7f3",
    "mode": "test",
    "organization_id": "xYZkjABcde",
    "market_ids": [ "yzXKjYzaCx", "..." ]
  }
}
```
{% endtab %}
{% endtabs %}

#### Date breakdown with nested breakdown

{% tabs %}
{% tab title="Request" %}
The following request performs a date breakdown query to get the stats about the orders placed by month. Over each time interval, a breakdown of the orders' total amounts to check the maximum by country code is also requested. For each country code, a breakdown of the orders' total amounts to check the maximum by currency code (as long as it's over a specific threshold) is then requested:

<pre class="language-sh"><code class="lang-sh">curl -g -X POST \
  'https://{{your_domain}}.commercelayer.io/metrics/orders/date_breakdown' \
  -H 'Accept: application/vnd.api.v1+json' \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Authorization: Bearer {{your_access_token}}' \
  -d '{
<strong>    "date_breakdown": {
</strong>      "by": "order.placed_at",
      "field": "order.total_amount_with_taxes",
      "operator": "stats",
      "interval": "month",
<strong>      "breakdown": {
</strong>        "by": "order.country_code",
        "field": "order.total_amount_with_taxes",
        "operator": "max",
        "sort": "desc",
        "limit": 3,
<strong>        "breakdown": {
</strong>          "by": "order.currency_code",
          "field": "order.total_amount_with_taxes",
          "operator": "max",
          "condition": {
            "gt": 100
          }
          "sort": "desc",
          "limit": 2
        }
      }
    }
  }'
</code></pre>
{% endtab %}

{% tab title="Response" %}
On success, the API responds with a `200 OK` status code, returning the aggregated values over the selected time intervals (nested accordingly) in the `data` object and extra information in the `meta` object:

```json
{
  "data": [
    {
      "date": "2022-05-01T00:00:00.000Z",
      "value": {
        "count": 6,
        "min": 65.0,
        "max": 243.0,
        "avg": 128.87,
        "sum": 773.2
      },
      "order.country_code": [
        {
          "label": "IT",
          "value": 243.0,
          "order.currency_code": [
            {
              "label": "EUR",
              "value": 243.0
            }
          ]
        }
      ]
    },
    {
      "date": "2022-06-01T00:00:00.000Z",
      "value": {
        "count": 132,
        "min": 0.0,
        "max": 925.0,
        "avg": 78.33,
        "sum": 10340.09
      },
      "order.country_code": [
        {
          "label": "IT",
          "value": 925.0,
          "order.currency_code": [
              {
                "label": "EUR",
                "value": 925.0
              }
          ]
        },
        {
          "label": "NO",
          "value": 855.0,
          "order.currency_code": [
            {
              "label": "NOK",
              "value": 855.0
            },
            {
              "label": "EUR",
              "value": 105.0
            }
          ]
        },
        {
          "label": "US",
          "value": 278.72,
          "order.currency_code": [
            {
              "label": "USD",
              "value": 278.72
            }
          ]
        }
      ]
    }
  ],
  "meta": {
    "type": "date_breakdown",
    "trace_id": "0e8e8b2c-4d13-444e-bf5a-1501061b3010",
    "mode": "test",
    "organization_id": "xYZkjABcde",
    "market_ids": [ "yzXKjYzaCx", "..." ]
  }
}
```
{% endtab %}
{% endtabs %}