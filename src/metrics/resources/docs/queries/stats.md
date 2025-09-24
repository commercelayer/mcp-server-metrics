---
description: How to perform a stats query and how it works
---

# Stats

**Stats** are numeric computations (based on specific [operators](./#query-operators)) calculated over values extracted from a specific field of the selected resource. When performing a stats query on the Metrics API endpoint you get in the [response](stats.md#response) the value of the computation (based on the selected `operator`) on the selected `field`.

### Request

To perform a date breakdown query send a `POST` request to the `/{{resource_name}}/stats` endpoint specifying the [query keys](stats.md#query-keys) and [filter](../filters.md) parameters:

<pre class="language-json"><code class="lang-json">{
<strong>  "stats": {
</strong>    "field": "...",
    "operator": "..."
  },
  "filter": { ... },
  "meta": { ... }
}
</code></pre>

#### Query keys

<table><thead><tr><th>Key</th><th>Type</th><th data-type="checkbox">Required</th><th>Description</th><th>Values</th></tr></thead><tbody><tr><td><strong><code>field</code></strong></td><td>String</td><td>true</td><td>The field you want the metrics or statistics computed on.</td><td>The available values for this key depend on the resource you're doing statistics on (see <a href="https://app.gitbook.com/s/lhTYC557IzGiJNS84RKD/resources/orders/stats#operators-and-field-values">orders</a>, <a href="https://app.gitbook.com/s/lhTYC557IzGiJNS84RKD/resources/returns/stats#operators-and-field-values">returns</a>, or <a href="https://app.gitbook.com/s/lhTYC557IzGiJNS84RKD/resources/carts/stats#operators-and-field-values">carts</a> for the related lists).</td></tr><tr><td><strong><code>operator</code></strong></td><td>String</td><td>true</td><td>The computing operator.</td><td>The available operators depend on the <code>field</code> key value (see <a href="https://app.gitbook.com/s/lhTYC557IzGiJNS84RKD/resources/orders/stats#operators-and-field-values">orders</a>, <a href="https://app.gitbook.com/s/lhTYC557IzGiJNS84RKD/resources/returns/stats#operators-and-field-values">returns</a>, or <a href="https://app.gitbook.com/s/lhTYC557IzGiJNS84RKD/resources/carts/stats#operators-and-field-values">carts</a> for the related lists).</td></tr></tbody></table>

### Response

The response of a stats query returns the value of the computation (based on the operator specified in the `operator` key) on the field specified in the `field` key. The value type depends on the [operator](./#query-operators) itself — it can be an object made of multiple numeric values (`stats`) or a simple integer/float number (any other operator):

<pre class="language-json"><code class="lang-json">{
  "data": {
<strong>    "value": ...
</strong>  },
  "meta": { ... }
}
</code></pre>

### Example

{% hint style="info" %}
The following example will be focused on the [query](../api-specification.md#query) part of the request. So no specific [filter](../api-specification.md#filter) or [meta](../api-specification.md#meta) options will be defined (i.e. all the results will be filtered by the [default filter](../filters.md#default-filter) and the response won't include the request payload). See the [use cases](../use-cases/) section for more complex combinations of queries and filters.
{% endhint %}

{% tabs %}
{% tab title="Request" %}
The following request performs a stats query to get the average order total amount:

<pre class="language-sh"><code class="lang-sh">curl -g -X POST \
  'https://{{your_domain}}.commercelayer.io/metrics/orders/stats' \
  -H 'Accept: application/vnd.api.v1+json' \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Authorization: Bearer {{your_access_token}}' \
  -d '{
<strong>    "stats": {
</strong>      "field": "order.total_amount_with_taxes",
      "operator": "avg"
    }
  }'
</code></pre>
{% endtab %}

{% tab title="Response" %}
On success, the API responds with a `200 OK` status code, returning the computed value in the `data` object and additional information in the `meta` object:

```json
{
  "data": {
    "value": 123.45
  },
  "meta": {
    "type": "stats",
    "trace_id": "f9df8a29-b5fe-4b4b-9a4d-f51017abb13b",
    "mode": "test",
    "organization_id": "xYZkjABcde",
    "market_ids": [ "yzXKjYzaCx", "..." ]
  }
}
```
{% endtab %}
{% endtabs %}