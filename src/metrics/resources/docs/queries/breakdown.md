---
description: How to perform a breakdown query and how it works
---

# Breakdown

**Breakdowns** are aggregations that summarize your data as metrics (based on specific [operators](./#query-operators)) or statistics, computed on field values. When performing a breakdown query on the Metrics API endpoint you get in the [response](breakdown.md#undefined) the value of the computation (based on the selected `operator`) on the selected `field`, aggregated `by` another field.

### Request

To perform a breakdown query send a `POST` request to the `/{{resource_name}}/breakdown` endpoint specifying the [query keys](breakdown.md#query-keys) and [filter](../filters.md) parameters:

<pre class="language-json"><code class="lang-json">{
<strong>  "breakdown": {
</strong>    "by": "...",
    "field": "...",
    "operator": "...",
    "condition": { ... },
    "sort": "...",
    "limit": ...,
    "breakdown": { ... }
  },
  "filter": { ... },
  "meta": { ... }
}
</code></pre>

#### Query keys

<table><thead><tr><th>Key</th><th>Type</th><th data-type="checkbox">Required</th><th>Description</th><th>Values</th></tr></thead><tbody><tr><td><strong><code>by</code></strong></td><td>String</td><td>true</td><td>The field you want the results of the query aggragated by.</td><td>The available values for this key depend on the resource you're doing statistics on (see <a href="https://app.gitbook.com/s/lhTYC557IzGiJNS84RKD/resources/orders/breakdown#nestable-breakdowns-and-by-values">orders</a>, <a href="https://app.gitbook.com/s/lhTYC557IzGiJNS84RKD/resources/returns/breakdown#nestable-breakdowns-and-by-values">returns</a>, or <a href="https://app.gitbook.com/s/lhTYC557IzGiJNS84RKD/resources/carts/breakdown#nestable-breakdowns-and-by-values">carts</a> for the related lists).</td></tr><tr><td><strong><code>field</code></strong></td><td>String</td><td>true</td><td>The field you want the metrics or statistics computed on.</td><td>The available values for this key depend on the resource you're doing statistics on (see <a href="https://app.gitbook.com/s/lhTYC557IzGiJNS84RKD/resources/orders/breakdown#operators-and-field-values">orders</a>, <a href="https://app.gitbook.com/s/lhTYC557IzGiJNS84RKD/resources/returns/breakdown#operators-and-field-values">returns</a>, or <a href="https://app.gitbook.com/s/lhTYC557IzGiJNS84RKD/resources/carts/breakdown#operators-and-field-values">carts</a> for the related lists).</td></tr><tr><td><strong><code>operator</code></strong></td><td>String</td><td>true</td><td>The computing operator.</td><td>The available operators depend on the <code>field</code> key value (see <a href="https://app.gitbook.com/s/lhTYC557IzGiJNS84RKD/resources/orders/breakdown#operators-and-field-values">orders</a>, <a href="https://app.gitbook.com/s/lhTYC557IzGiJNS84RKD/resources/returns/breakdown#operators-and-field-values">returns</a>, or <a href="https://app.gitbook.com/s/lhTYC557IzGiJNS84RKD/resources/carts/breakdown#operators-and-field-values">carts</a> for the related lists).</td></tr><tr><td><strong><code>condition</code></strong></td><td>Object</td><td>false</td><td>An additional constraint to fine-tune the set of records shown in the response, applied to the computed results of the query. It is available for <a href="./#query-operators">operators</a> that return single numeric (float or integer) values.</td><td><p>One of:<br><code>"eq": ...</code></p><p><code>"ne": ...</code></p><p><code>"gt": ...</code></p><p><code>"gte": ...</code></p><p><code>"lt": ...</code></p><p><code>"lte": ...</code></p><p><code>"gt_lt": [...]</code></p><p><code>"gte_lte": [...]</code></p><p><code>"gte_lt": [...]</code></p><p><code>"gt_lte": [...]</code><br>(default is no condition).</p></td></tr><tr><td><strong><code>sort</code></strong></td><td>String</td><td>false</td><td>The way you want the results of the query to be sorted.</td><td>One of <code>asc</code> or <code>desc</code> (default is <code>desc</code>).</td></tr><tr><td><strong><code>limit</code></strong></td><td>Integer</td><td>false</td><td>The maximum number of records shown in the response.</td><td>Default is <code>10</code>, max is <code>100</code>.</td></tr><tr><td><strong><code>breakdown</code></strong></td><td>Object</td><td>false</td><td>The optional <a href="breakdown.md#nesting-breakdowns">nested breakdown</a>.</td><td>The nested breakdown <code>by</code> key available values depend of the parent breakdown <code>by</code> key value (see <a href="https://app.gitbook.com/s/lhTYC557IzGiJNS84RKD/resources/orders/breakdown#nestable-breakdowns-and-by-values">orders</a>, <a href="https://app.gitbook.com/s/lhTYC557IzGiJNS84RKD/resources/returns/breakdown#nestable-breakdowns-and-by-values">returns</a>, or <a href="https://app.gitbook.com/s/lhTYC557IzGiJNS84RKD/resources/carts/breakdown#nestable-breakdowns-and-by-values">carts</a> for the related lists).</td></tr></tbody></table>

#### Nesting breakdowns

Breakdowns can be nested recursively one into the other, up to **one** level (see [example](breakdown.md#nested-breakdown)). The valid values allowed for the `by` key of the nested breakdown are strictly dependent on the value you specified in the `by` key of the parent breakdown. Hence, they are different for each resource you're doing statistics on (see [orders](https://app.gitbook.com/s/lhTYC557IzGiJNS84RKD/resources/orders/breakdown#nestable-breakdowns-and-by-values), [returns](https://app.gitbook.com/s/lhTYC557IzGiJNS84RKD/resources/returns/breakdown#nestable-breakdowns-and-by-values), and [carts](https://app.gitbook.com/s/lhTYC557IzGiJNS84RKD/resources/carts/breakdown#nestable-breakdowns-and-by-values) for the related lists).

{% hint style="warning" %}
You cannot group the nested breakdown by the same field by which you're already grouping the parent breakdown.
{% endhint %}

### Response

The response of a breakdown query returns an aggregation by the field specified in the `by` key, containing the value of the computation (based on the operator specified in the `operator` key) on the field specified in the `field` key. If the query contains a [nested breakdown](breakdown.md#nesting-breakdowns), it is also detailed for each item of the array:

<pre class="language-json"><code class="lang-json">{
  "data": {
    "...": [ // breakdown by
      {
<strong>        "label": "...",
</strong><strong>        "value": ...,
</strong>        "...": [ // nested breakdown by
          {
            "label": "...",
            "value": ...
          },
          {
            "label": "...",
            "value": ...
          },
          { ... }
        ]
      },
      {
<strong>        "label": "...",
</strong><strong>        "value": ...,
</strong>        "...": [ // nested breakdown by
          {
            "label": "...",
            "value": ...
          },
          {
            "label": "...",
            "value": ...
          },
          { ... }
        ]
      },
      { ... }
    ]
  }
}
</code></pre>

| Key         | Description                                                           |
| ----------- | --------------------------------------------------------------------- |
| **`label`** | The different values of the `by` field the results are aggregated by. |
| **`value`** | The result of the computation for the specific `label`.               |

### Examples

{% hint style="info" %}
The following examples will be focused on the [query](../api-specification.md#query) part of the request. So no specific [filter](../api-specification.md#filter) or [meta](../api-specification.md#meta) options will be defined (i.e. all the results will be filtered by the [default filter](../filters.md#default-filter) and the response won't include the request payload). See the [use cases](../use-cases/) section for more complex combinations of queries and filters.
{% endhint %}

#### Single breakdown

{% tabs %}
{% tab title="Request" %}
The following request performs a breakdown query to get the total count of orders by market, as long as the computed result is within a specific range:

<pre class="language-sh"><code class="lang-sh">curl -g -X POST \
  'https://{{your_domain}}.commercelayer.io/metrics/orders/breakdown' \
  -H 'Accept: application/vnd.api.v1+json' \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Authorization: Bearer {{your_access_token}}' \
  -d '{
<strong>    "breakdown": {
</strong>      "by": "market.name",
      "field": "order.id",
      "operator": "value_count",
      "condition": {
        "gte_lte": [ 10000, 100000 ]
      },
      "sort": "desc",
      "limit": 2
    }
  }'
</code></pre>
{% endtab %}

{% tab title="Response" %}
On success, the API responds with a `200 OK` status code, returning the aggregated values in the `data` object and extra information in the `meta` object:

```json
{
  "data": {
    "market.name": [
      {
        "label": "US",
        "value": 67890
      },
      {
        "label": "UK",
        "value": 12345
      }
    ]
  },
  "meta": {
    "type": "breakdown",
    "trace_id": "3e60cfb2-c0df-43c8-84e8-d9632705d2f9",
    "mode": "test",
    "organization_id": "xYZkjABcde",
    "market_ids": [ "yzXKjYzaCx", "..." ]
    }
  }
}
```
{% endtab %}
{% endtabs %}

#### Nested breakdown

{% tabs %}
{% tab title="Request" %}
The following request performs a breakdown query to get the total count of orders by market, as long as the computed result is within a specific range. For each market, a breakdown of the orders' total amounts by currency code is also requested:

<pre class="language-javascript"><code class="lang-javascript">curl -g -X POST \
  'https://{{your_domain}}.commercelayer.io/metrics/orders/breakdown' \
  -H 'Accept: application/vnd.api.v1+json' \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Authorization: Bearer {{your_access_token}}' \
  -d '{
<strong>    "breakdown": {
</strong>      "by": "market.name",
      "field": "order.id",
      "operator": "value_count",
      "condition": {
        "gte_lte": [ 10000, 100000 ]  
      },
      "sort": "desc",
      "limit": 3,
<strong>      "breakdown": {
</strong>        "by": "order.currency_code",
        "field": "order.total_amount_with_taxes",
        "operator": "sum"
        "sort": "desc",
        "limit": 2
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
    "market.name": [
      {
        "label": "US",
        "value": 67890,
        "order.currency_code": [
          {
            "label": "USD",
            "value": 1234567.89
          }
        ]
      },
      {
        "label": "UK",
        "value": 12345,
        "order.currency_code": [
          {
            "label": "GBP",
            "value": 234567.89
          },
          {
            "label": "EUR",
            "value": 9876.54
          }
        ]
      },
      {
        "label": "NO",
        "value": 11234,
        "order.currency_code": [
          {
            "label": "NOK",
            "value": 345678.90
          },
          {
            "label": "EUR",
            "value": 45678.90
          }
        ]
      }
    ]
  },
  "meta": {
    "type": "breakdown",
    "trace_id": "d0f7d8bf-1b3f-42a8-8b72-dfb158da95e7",
    "mode": "test",
    "organization_id": "xYZkjABcde",
    "market_ids": [ "yzXKjYzaCx", "..." ]
    }
  }
}
```
{% endtab %}
{% endtabs %}