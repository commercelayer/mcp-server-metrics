---
description: >-
  How to use the Metrics API to get the products that have been most frequently
  bought together with other ones
---

# Frequently bought together products

### The problem

You want to get the list of products that, over your order history, have been added as line items to the same orders as two specific other products (SKUs or bundles).

### The solution

#### Filter

You need to perform an [FBT query](../analysis/fbt.md) setting the required filter on the [line items](https://app.gitbook.com/s/lhTYC557IzGiJNS84RKD/resources/orders/filters#line\_items-field) field to specify the array containing the IDs of the two products with which you're searching the correlation:

<table><thead><tr><th width="359">Attribute</th><th>Operator</th></tr></thead><tbody><tr><td><strong><code>item_ids</code></strong></td><td><code>"in": [ "BmDzSVkXAW", "ZrxeSRgOmB" ]</code></td></tr></tbody></table>

### [Try it on Postman](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-5c703670-609a-4c25-939a-1212bf66a1dd) :rocket:

### Example

{% tabs %}
{% tab title="Request" %}
The following request uses the Metrics API to get the list of products that have been most frequently bought together with the items identified by the IDs "BmDzSVkXAW" and "ZrxeSRgOmB":

<pre class="language-shell"><code class="lang-shell">curl -g -X POST \
  'https://{{your_domain}}.commercelayer.io/metrics/analysis/fbt' \
  -H 'Accept: application/vnd.api.v1+json' \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Authorization: Bearer {{your_access_token}}' \
  -d '{
    "filter": {
<strong>      "line_items": {
</strong><strong>        "item_ids": {
</strong><strong>          "in": [ "BmDzSVkXAW", "ZrxeSRgOmB" ]
</strong><strong>        }
</strong><strong>      }
</strong>    }
  }'
</code></pre>
{% endtab %}

{% tab title="Response" %}
On success, the API responds with a `200 OK` status code, returning the aggregated values in the `data` object and additional information in the `meta` object:

<pre class="language-json"><code class="lang-json">{
  "data": [
    {
<strong>      "item_id": "nprzSARKeW",
</strong><strong>      "value": 103,
</strong>      "type": "skus",
      "name": "Black T-Shirt, Men, Size L"
    },
    {
<strong>      "item_id": "ZNRJSQXkjZ",
</strong><strong>      "value": 99,
</strong>      "type": "skus",
      "name": "Pink T-Shirt, Women, Size XXS"
    },
    {
<strong>      "item_id": "BxAkSrDODn",
</strong><strong>      "value": 41,
</strong>      "type": "skus",
      "name": "Pink Short Pants, Women, Size XS"
    },
    { ... }
  ],
  "meta": {
    "type": "fbt",
    "trace_id": "fe571ea2-8a4f-4a5e-bd26-ac54651bb2e4",
    "mode": "test",
    "organization_id": "xYZkjABcde",
    "market_ids": [ "yzXKjYzaCx", "..." ]
  }
}
</code></pre>
{% endtab %}
{% endtabs %}