---
description: >-
  How to use the Metrics API to get the most recently created carts containing a
  specific SKU, from a specific market
---

# Latest carts with a specific product from a specific market

### The problem

You want to get the last ten created carts that contain a specific product and are associated with a specific market, over a selected date and time range, chronologically ordered by date of creation.

### The solution

#### Query

You need to perform a [search query](../queries/search.md) setting the required query keys as follows and adding the optional ones based on your needs:

<table><thead><tr><th width="367">Key</th><th>Value</th></tr></thead><tbody><tr><td><strong><code>limit</code></strong></td><td><code>10</code></td></tr><tr><td><strong><code>sort_by</code></strong></td><td><code>order.created_at</code></td></tr></tbody></table>

{% hint style="info" %}
If you want to focus on some specific information about the carts you're searching for, just fill in the `fields` array with the list of attributes you want to get in the response.
{% endhint %}

#### Filter

Set the desired date and time range using the `date_from` and `date_to` keys and add an additional [filter](../filters.md) on the [line items](https://app.gitbook.com/s/lhTYC557IzGiJNS84RKD/resources/carts/filters#line\_items-field) field to restrict the related search on carts that contain the desired SKU only:

| Attribute   | Operator                 |
| ----------- | ------------------------ |
| **`codes`** | `"in": [ "TSHIRT0001" ]` |

Then add an additional filter on the [market](https://app.gitbook.com/s/lhTYC557IzGiJNS84RKD/resources/carts/filters#market-field) field to restrict the related search on the carts associated with the selected market only:

| Attribute   | Operator                    |
| ----------- | --------------------------- |
| **`names`** | `"in": [ "North America" ]` |

In the example below, since the `date_field` isn't specified in the [date filter](../filters.md#date-filters), the default value `current_date` will be used, meaning that the results will count all the orders that changed their status within the selected date and time range ([read more](../filters.md#how-date\_field-works) about this).

### [Try it on Postman](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-86ed9b2b-7d46-4950-8646-fb07ccb1fc5e) :rocket:

### Example

{% tabs %}
{% tab title="Request" %}
The following request uses the Metrics API to get the latest carts containing a specific SKU and associated with a specific market:

<pre class="language-shell"><code class="lang-shell">curl -g -X POST \
  'https://{{your_domain}}.commercelayer.io/metrics/carts/search' \
  -H 'Accept: application/vnd.api.v1+json' \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Authorization: Bearer {{your_access_token}}' \
  -d '{
    "search": {
<strong>      "limit": 10,
</strong><strong>      "sort": "desc",
</strong>      "sort_by": "order.created_at",
<strong>      "fields": [ "order.created_at", "order.status", "order.total_amount_with_taxes", "customer.email", "market.*", "line_items.*" ]
</strong>    },
    "filter": {
      "order": {
        "date_from": "2021-01-01T00:00:00Z",
        "date_to": "2021-12-31T23:59:00Z"
      },
<strong>      "line_items": {
</strong><strong>        "codes": {
</strong><strong>          "in": [ "TSHIRT0001" ]
</strong><strong>        }
</strong><strong>      },
</strong><strong>      "market": {
</strong><strong>        "names": {
</strong><strong>          "in": [ "North America" ]
</strong><strong>        }
</strong><strong>      }
</strong>    }
  }'
</code></pre>
{% endtab %}

{% tab title="Response" %}
On success, the API responds with a `200 OK` status code, returning the requested fields in the `data` object and additional information alongside pagination in the `meta` object:

<pre class="language-json"><code class="lang-json">{
  "data": [
    {
      "id": "pjochkYMdJ",
      "created_at": "2021-12-28T18:18:18.399Z",
      "total_amount_with_taxes": 19.0,
      "status": "draft",
      "market": {
        "number": "1234",
<strong>        "name": "North America",
</strong>        "id": "yzXKjYzaCx"
      },
      "line_items": [
        {
          "tax_amount": 0.0,
          "options_amount": 0.0,
          "quantity": 1,
          "updated_at": "2022-07-08T17:00:01.857Z",
          "total_amount": -10.0,
          "item_type": "fixed_price_promotions",
          "name": "JANCAMPAIGN22",
          "discount": 0.0,
          "id": "kXCqtWXZbq",
          "unit_amount": -10.0,
          "tax_rate": 0.0
        },
        {
          "tax_amount": 0.0,
<strong>          "code": "TSHIRT0001",
</strong>          "options_amount": 0.0,
          "quantity": 1,
          "updated_at": "2022-07-08T17:00:01.775Z",
          "total_amount": 29.0,
          "item_type": "skus",
          "name": "Man T-shirt 1st Edition",
          "discount": -10.0,
          "id": "ypCptwaBlJ",
          "unit_amount": 29.0,
          "tax_rate": 0.0
        }
      ]
    },
    {
      "id": "pOCnhmEdxd",
      "created_at": "2021-12-28T13:51:05.513Z",
      "total_amount_with_taxes": 19.0,
      "status": "draft",
      "market": {
        "number": "1234",
<strong>        "name": "North America",
</strong>        "id": "yzXKjYzaCx"
      },
      "line_items": [
        {
          "tax_amount": 0.0,
          "options_amount": 0.0,
          "quantity": 1,
          "updated_at": "2022-09-14T11:30:44.134Z",
          "total_amount": -10.0,
          "item_type": "fixed_price_promotions",
          "name": "VISACAMPAIGN22",
          "discount": 0.0,
          "id": "kXbztgQVOR",
          "unit_amount": -10.0,
          "tax_rate": 0.0
        },
        {
          "tax_amount": 0.0,
<strong>          "code": "TSHIRT0001",
</strong>          "options_amount": 0.0,
          "quantity": 1,
          "updated_at": "2021-12-28T13:51:05.703Z",
          "total_amount": 29.0,
          "item_type": "skus",
          "name": "Man T-shirt 1st Edition",
          "discount": -10.0,
          "id": "NlQvtgWvBV",
          "unit_amount": 29.0,
          "tax_rate": 0.0
        }
      ]
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
</code></pre>
{% endtab %}
{% endtabs %}

### Similar cases

Just changing a couple of query keys and/or filter parameters you can address lots of very similar use cases, such as:

* [Latest approved returns over a specific period of time](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-fca00098-c2f8-45ab-b9e7-58bf3e407137)
* [Latest returns shipped from a specific country](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-05812960-f25d-482b-aaae-f723dea4d8ab)
* [Latest placed orders from customer with specific email domains](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-b26fe7ba-e32b-4b44-8077-32833046838b)
* [Latest archived orders](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-c8d3c3b4-dc19-40ac-98c4-5152687b461b)