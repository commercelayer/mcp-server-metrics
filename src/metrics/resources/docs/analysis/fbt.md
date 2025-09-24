---
description: How to perform an FBT query and how it works
---

# FBT

Also known as _Frequently Bought Together_, **FBTs** are a type of analysis query that, based on your entire order history, allows you to retrieve the items that most frequently have been added as line items in the same [orders](https://app.gitbook.com/s/lhTYC557IzGiJNS84RKD/resources/orders) as a specified item ([SKU](https://app.gitbook.com/s/RWJeylueWkzLadK710XZ/skus) or [bundle](https://app.gitbook.com/s/RWJeylueWkzLadK710XZ/bundles)) or array of items.

### Request

To perform an FBT query send a `POST` request to the `/analysis/fbt` endpoint specifying the item ID(s) in the [filter](https://app.gitbook.com/s/lhTYC557IzGiJNS84RKD/resources/orders#line\_items-field) without any extra query keys:

```json
{
  "filter": {
    "line_items": {
      "item_ids": {
        "in": [
          "...",
          "..."

          // ...

        ]
      }
    }
  },
  "meta": { ... }
}
```

| Operator | Type  | Description                                                                                                                                                                                                                         | Example                                               |
| -------- | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| **`in`** | Array | A list of SKU or bundle IDs associated as [line items](https://app.gitbook.com/s/lhTYC557IzGiJNS84RKD/resources/orders#line\_items-field) to one or more [orders](https://app.gitbook.com/s/lhTYC557IzGiJNS84RKD/resources/orders). | `"item_ids": { "in": [ "xYZkjABcde", "yzXKjYzaCx"] }` |

{% hint style="warning" %}
Please note that while the attribute value of the `in` operator used in the standard filters matches _any_ (logic `OR`) of the specified array's values, the attribute value of the `in` operator used in the FBT filters matches _all_ (logic `AND`) of the specified array's values.
{% endhint %}

The `filter` object is required (if missing the API will respond with a `400 Bad request` [error](../errors.md#400-bad-request)). You can optionally add the meta object for any useful information about the query itself (learn more [here](../api-specification.md#meta)).

### Response

The response of an FBT query returns an aggregation by item ID ordered by value (e.g. from the most frequently bought together item to the less frequently bought together item), with some additional information:

```json
{
  "data": [
    {
      "item_id": "...",
      "value": ...,
      "type": "...",
      "name": "..."
    },
    { ... }
  ],
  "meta": { ... }
}
```

<table><thead><tr><th width="250.33333333333331">Key</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><strong><code>item_id</code></strong></td><td>String</td><td>The ID of the item associated with the line item.</td></tr><tr><td><strong><code>value</code></strong></td><td>Integer</td><td>The number of orders containing both the item identified by the <code>item_id</code> and the item(s) identified by the ID(s) specified in the request body.</td></tr><tr><td><strong><code>type</code></strong></td><td>String</td><td>The type of the item identified by the <code>item_id</code> (one of <code>sku</code> or <code>bundle</code>).</td></tr><tr><td><strong><code>name</code></strong></td><td>String</td><td>The name of the line item (as in the first created order among the ones counted in the <code>value</code>). When missing, it gets populated with the name of the associated item (if present).</td></tr></tbody></table>

{% hint style="info" %}
The FBT query returns a maximum of **10** records (i.e. the 10 most frequently bought together items).
{% endhint %}

### Example

{% tabs %}
{% tab title="Request" %}
The following request performs an FBT query to get the items most frequently bought together with the item identified by the ID "BmDzSVkXAW":

```sh
curl -g -X POST \
  'https://{{your_domain}}.commercelayer.io/metrics/analysis/fbt' \
  -H 'Accept: application/vnd.api.v1+json' \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Authorization: Bearer {{your_access_token}}' \
  -d '{
    "filter": {
      "line_items": {
        "item_ids": {
          "in": [ "BmDzSVkXAW" ]
        }
      }
    }
  }'
```
{% endtab %}

{% tab title="Response" %}
On success, the API responds with a `200 OK` status code, returning the aggregated values in the `data` object and additional information in the `meta` object:

```json
{
  "data": [
    {
      "item_id": "ZrxeSRgOmB",
      "value": 789,
      "type": "skus",
      "name": "Black T-Shirt, Men, Size M"
    },
    {
      "item_id": "nLgbSeMxpB",
      "value": 456,
      "type": "skus",
      "name": "White T-Shirt, Women, Size XS"
    },
    {
      "item_id": "nprzSARKeW",
      "value": 123,
      "type": "skus",
      "name": "Red Baseball Cap, Limited edition, One size"
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
```
{% endtab %}
{% endtabs %}