---
description: How to perform a search query and how it works
---

# Search

**Searches** are a type of query a bit different from the other ones ([breakdowns](breakdown.md), [date breakdowns](date-breakdown.md), and [stats](stats.md)). A search is not an aggregation and doesn't involve any computation based on operators, but an actual _search_. When performing a search query on the Metrics API endpoint you get in the [response](search.md#undefined) the list of the requested `fields` (sorted, filtered, and [paginated](search.md#pagination)) of the actual records that match the query.

### Request

To perform a search query send a `POST` request to the `/{{resource_name}}/search` endpoint specifying the [query keys](search.md#query-keys) and [filter](../filters.md) parameters:

<pre class="language-json"><code class="lang-json">{
<strong>  "search": {
</strong>    "limit": ...,
    "sort": "...",
    "sort_by": "...",
    "fields": [ ... ],
    "cursor": "..."
  },
  "filter": { ... },
  "meta": { ... }
}
</code></pre>

#### Query keys

<table><thead><tr><th>Key</th><th>Type</th><th data-type="checkbox">Required</th><th>Description</th><th>Values</th></tr></thead><tbody><tr><td><strong><code>limit</code></strong></td><td>Integer</td><td>false</td><td>The maximum number of records shown in the response.</td><td>Default is <code>50</code>, max is <code>100</code>.</td></tr><tr><td><strong><code>sort</code></strong></td><td>String</td><td>false</td><td>The way you want the results of the query to be sorted.</td><td>One of <code>asc</code> or <code>desc</code> (default is <code>desc</code>).</td></tr><tr><td><strong><code>sort_by</code></strong></td><td>String</td><td>false</td><td>The date field you want the results of the query sorted by.</td><td>The available values for this key depend on the resource you're searching (see <a href="https://app.gitbook.com/s/lhTYC557IzGiJNS84RKD/resources/orders/search#sort_by-values">orders</a>, <a href="https://app.gitbook.com/s/lhTYC557IzGiJNS84RKD/resources/returns/search#sort_by-values">returns</a>, or <a href="https://app.gitbook.com/s/lhTYC557IzGiJNS84RKD/resources/carts/search#sort_by-values">carts</a> for the related lists). Default is <code>{{resource_name}}.current_date</code> (i.e. the datetime of the resource's latest status change).</td></tr><tr><td><strong><code>fields</code></strong></td><td>Array</td><td>true</td><td>The list of fields you want to be returned for each record in the response.</td><td>The available values for this key depend on the resource you're searching (see <a href="https://app.gitbook.com/s/lhTYC557IzGiJNS84RKD/resources/orders/search#field-values">orders</a>, <a href="https://app.gitbook.com/s/lhTYC557IzGiJNS84RKD/resources/returns/search#field-values">returns</a>, or <a href="https://app.gitbook.com/s/lhTYC557IzGiJNS84RKD/resources/carts/search#field-values">carts</a> for the related lists). Cannot be empty. Use <code>{{field_name}}.*</code> to <a href="search.md#requesting-all-the-fields-attributes">request all the field's attributes</a>.</td></tr><tr><td><strong><code>cursor</code></strong></td><td>String</td><td>false</td><td>The cursor pointing to a specific page in the <a href="search.md#pagination">paginated</a> search results.</td><td>Every time you perform a search query you get the cursor to the next page in the <code>pagination</code> object.</td></tr></tbody></table>

#### Requesting all the field's attributes

In some cases, you may need to get in the search results all the attributes of some fields for each record. If so, you can use the `.*` syntax in the request. Just add `{{field_name}}.*` to the `field` array for each field you want to fully detail (see [example](search.md#requesting-all-the-attributes-for-some-fields)).

### Response

The response of a search query returns an array of objects containing a number of records equal to (or less than) the one specified in the `limit` key, sorted by the date field specified in the `sort_by` key. For each record all the fields requested in the `fields` array are returned:

<pre class="language-json"><code class="lang-json">{
  "data": [
    { 
      "...": "...", // requested fields
      "...": "...",
      "...": { ... }
      "...": ...
    },
    { 
      "...": "...", // requested fields
      "...": "...",
      "...": { ... }
      "...": ...
    },
    { 
      "...": "...", // requested fields
      "...": "...",
      "...": { ... }
      "...": ...
    },
    { ... }
  ],
  "meta": {
<strong>    "pagination": {
</strong>      "record_count": ...,
      "cursor": "..."
    },
    ...
  }
}
</code></pre>

#### Pagination

Unlike the other types of queries ([breakdowns](breakdown.md), [date breakdowns](date-breakdown.md), and [stats](stats.md)) when performing a search query on the Metrics API endpoint you get paginated results. You can find the info you need to navigate through the pages in the `pagination` object of the response's `meta`:

| Field              | Type    | Description                                                              |
| ------------------ | ------- | ------------------------------------------------------------------------ |
| **`record_count`** | Integer | The total number of records that match the query.                        |
| **`cursor`**       | String  | The cursor pointing to the next page (`null` if `record_count < limit`). |

{% hint style="info" %}
The value of the `cursor` can be added to the request payload to get that specific page's records in the response (see [example](search.md#requesting-a-specific-page-from-the-paginated-results)).
{% endhint %}

### Examples

{% hint style="info" %}
The following examples will be focused on the [query](../api-specification.md#query) part of the request. So no specific [filter](../api-specification.md#filter) or [meta](../api-specification.md#meta) options will be defined (i.e. all the results will be filtered by the [default filter](../filters.md#default-filter) and the response won't include the request payload). See the [use cases](../use-cases/) section for more complex combinations of queries and filters.
{% endhint %}

#### Requesting specific fields

{% tabs %}
{% tab title="Request" %}
The following request performs a search query to get information about the orders total amount, currency, alongside the associated customer email and shipping address information, sorted by the time when they were placed:

<pre class="language-sh"><code class="lang-sh">curl -g -X POST \
  'https://{{your_domain}}.commercelayer.co/metrics/orders/search' \
  -H 'Accept: application/vnd.api.v1+json' \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Authorization: Bearer {{your_access_token}}' \
  -d '{
<strong>    "search": {
</strong>      "limit": 5,
      "sort": "desc",
      "sort_by": "order.placed_at",
<strong>      "fields": [
</strong>        "order.id",
        "order.number",
        "order.placed_at",
        "order.total_amount_with_taxes",
        "order.currency_code",
        "customer.email",
        "shipping_address.state_code",
        "shipping_address.zip_code"
      ]
    }
  }'
</code></pre>
{% endtab %}

{% tab title="Response" %}
On success, the API responds with a `200 OK` status code, returning the requested fields in the `data` object and additional information alongside pagination in the `meta` object

```json
{
  "data": [
    {
      "id": "qjobhrmrDV",
      "number": "2438491",
      "placed_at": "2022-06-27T06:01:32.361Z",
      "total_amount_with_taxes": 205.0,
      "currency_code": "USD",
      "customer": {
        "email": "jess@example.net"
      },
      "shipping_address": {
        "state_code": "CA",
        "zip_code": "94102"
      }
    },
    {
      "id": "qdyBhGZGXz",
      "number": "2438489",
      "placed_at": "2022-06-26T06:00:58.093Z",
      "total_amount_with_taxes": 1500.0,
      "currency_code": "BRL",
      "customer": {
        "email": "pedro@example.net"
      },
      "shipping_address": {
        "state_code": "SP",
        "zip_code": "13240"
      }
    },
    {
      "id": "wLmohdKdGe",
      "number": "2438487",
      "placed_at": "2022-06-25T06:01:11.090Z",
      "total_amount_with_taxes": 122.0,
      "currency_code": "EUR",
      "customer": {
        "email": "mario@example.org"
      },
      "shipping_address": {
        "state_code": "FI",
        "zip_code": "55100"
      }
    },
    {
      "id": "PoKkhYJYzL",
      "number": "2438485",
      "placed_at": "2022-06-24T06:00:42.317Z",
      "total_amount_with_taxes": 150.0,
      "currency_code": "EUR",
      "customer": {
        "email": "jacques@example.net"
      },
      "shipping_address": {
        "state_code": "IDF",
        "zip_code": "75001"
      }
    },
    {
      "id": "wkykhjYjgp",
      "number": "2438484",
      "placed_at": "2022-06-23T14:35:02.929Z",
      "total_amount_with_taxes": 199.0,
      "currency_code": "USD",
      "customer": {
        "email": "john@example.org"
      },
      "shipping_address": {
        "state_code": "NY",
        "zip_code": "10003"
      }
    }
  ],
  "meta": {
    "pagination": {
      "record_count": 123,
      "cursor": "LS0tCi0gIi0yOTIyNzUwNTUtMDUtMTZUMTY6NDc6MD=="
    },
    "type": "search",
    "trace_id": "3dfe518f-2348-4d53-940a-0c4a66eb6265",
    "mode": "test",
    "organization_id": "xYZkjABcde",
    "market_ids": [ "yzXKjYzaCx", "..." ]
  }
}
```
{% endtab %}
{% endtabs %}

#### Requesting all the attributes for some fields

{% tabs %}
{% tab title="Request" %}
The following request performs a search query to get all the available fields for the last two orders placed and the associated customers:

<pre class="language-sh"><code class="lang-sh">curl -g -X POST \
  'https://{{your_domain}}.commercelayer.co/metrics/orders/search' \
  -H 'Accept: application/vnd.api.v1+json' \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Authorization: Bearer {{your_access_token}}' \
  -d '{
<strong>      "search": {
</strong>        "limit": 2,
        "sort": "desc",
        "sort_by": "order.placed_at",
        "fields": [
<strong>          "order.*",
</strong><strong>          "customer.*"
</strong>        ]
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
      "id": "PbQLhypyEE",
      "fulfillment_status": "in_progress",
      "discount_amount": 0.0,
      "tax_included": true,
      "payment_method_amount": 0.0,
      "payment_updated_at": "2022-06-28T06:01:39.854Z",
      "mode": "test",
      "language_code": "en",
      "number": "2438494",
      "seconds_in_draft": 9,
      "payment_method_taxable_amount": 0.0,
      "options": false,
      "total_taxable_amount": 100.0,
      "discounted": false,
      "total_amount_with_taxes_net_of_refunds": 122.0,
      "adjustment_taxable_amount": 0.0,
      "line_item_options_count": 0,
      "placed_day_of_week": 2,
      "payment_method_tax_amount": 0.0,
      "placed_at": "2022-06-28T06:01:38.254Z",
      "shipping_taxable_amount": 8.2,
      "adjustment_tax_amount": 0.0,
      "country_code": "IT",
      "current_date": "2022-06-28T06:01:39.671Z",
      "skus_count": 4,
      "total_amount": 122.0,
      "adjustment_amount": 0.0,
      "guest": true,
      "status": "approved",
      "freight_taxable": true,
      "gift_card": false,
      "created_at": "2022-06-28T06:01:29.452Z",
      "subtotal_taxable_amount": 91.8,
      "currency_code": "EUR",
      "updated_at": "2022-06-28T06:01:40.118Z",
      "approved_at": "2022-06-28T06:01:39.671Z",
      "total_tax_amount": 22.0,
      "refunded": false,
      "total_amount_with_taxes": 122.0,
      "subtotal_tax_amount": 20.2,
      "coupon": false,
      "fulfillment_updated_at": "2022-06-28T06:01:39.861Z",
      "payment_status": "paid",
      "gift_card_amount": 0.0,
      "subtotal_amount": 112.0,
      "shipping_amount": 10.0,
      "seconds_in_approved": 1,
      "shipments_count": 1,
      "returned": false,
      "refunds_total_amount_with_taxes": 0,
      "customer": {
        "id": "kNXNhZBPWO",
        "email": "andrea@example.org"
      }
    },
    {
      "id": "PWYOhJzJLx",
      "freight_taxable": false,
      "fulfillment_status": "not_required",
      "gift_card": false,
      "discount_amount": 0.0,
      "created_at": "2022-06-22T19:44:04.450Z",
      "tax_included": false,
      "subtotal_taxable_amount": 15.0,
      "payment_method_amount": 10.0,
      "payment_updated_at": "2022-06-22T19:44:16.037Z",
      "currency_code": "USD",
      "mode": "test",
      "language_code": "en",
      "number": "2438469",
      "seconds_in_draft": 12,
      "payment_method_taxable_amount": 10.0,
      "updated_at": "2022-06-22T19:44:16.086Z",
      "options": false,
      "total_tax_amount": 3.3,
      "refunded": false,
      "total_amount_with_taxes": 28.3,
      "subtotal_tax_amount": 3.3,
      "total_taxable_amount": 25.0,
      "discounted": false,
      "total_amount_with_taxes_net_of_refunds": 28.3,
      "adjustment_taxable_amount": 0.0,
      "line_item_options_count": 0,
      "coupon": false,
      "payment_status": "authorized",
      "placed_day_of_week": 3,
      "payment_method_tax_amount": 0.0,
      "placed_at": "2022-06-22T19:44:16.080Z",
      "shipping_taxable_amount": 0.0,
      "adjustment_tax_amount": 0.0,
      "gift_card_amount": 0.0,
      "subtotal_amount": 15.0,
      "shipping_amount": 0.0,
      "country_code": "US",
      "current_date": "2022-06-22T19:44:16.080Z",
      "shipments_count": 0,
      "skus_count": 1,
      "total_amount": 25.0,
      "adjustment_amount": 0.0,
      "guest": true,
      "returned": false,
      "refunds_total_amount_with_taxes": 0,
      "status": "placed",
      "customer": {
        "id": "QBrBhVDYJQ",
        "email": "john@example.com"
      }
    }
  ],
  "meta": {
    "pagination": {
      "record_count": 123,
      "cursor": "LS0tCi0gIi0yOTIyNzUwNTUtMDUtMTZUMTY6ND=="
    },
    "type": "search",
    "trace_id": "3dfe518f-2348-4d53-940a-0c4a66eb6265",
    "mode": "test",
    "organization_id": "xYZkjABcde",
    "market_ids": [ "yzXKjYzaCx", "..." ]
  }
}
```
{% endtab %}
{% endtabs %}

#### Requesting a specific page from the paginated results

{% tabs %}
{% tab title="Request" %}
The following request performs a search query to get information about the number of shipments associated with the orders and their fulfillment status, sorted by the time of the last fulfillment status update. A specific page in the paginated results is requested:

<pre class="language-sh"><code class="lang-sh">curl -g -X POST \
  'https://{{your_domain}}.commercelayer.co/metrics/orders/search' \
  -H 'Accept: application/vnd.api.v1+json' \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Authorization: Bearer {{your_access_token}}' \
  -d '{
<strong>      "search": {
</strong>        "limit": 5,
        "sort": "desc",
        "sort_by": "order.fulfillment_updated_at",
        "fields": [
          "order.id",
          "order.number",
          "order.shipments_count",
          "order.fulfillment_status",
          "order.fulfillment_updated_at"
        ],
<strong>        "cursor": "LS0tCi0gJzIwMjItMDYtMjZUMDY6MD=="
</strong>      }
  }'
</code></pre>
{% endtab %}

{% tab title="Response" %}
On success, the API responds with a `200 OK` status code, returning the requested fields in the `data` object and additional information alongside pagination (see the cursor to the next page) in the `meta` object:

```json
{
  "data": [
    {
      "id": "wLmohdKdGe",
      "number": "2438487",
      "fulfillment_status": "in_progress",
      "shipments_count": 1,
      "fulfillment_updated_at": "2022-06-25T06:01:13.810Z"
    },
    {
      "id": "PoKkhYJYzL",
      "number": "2438485",
      "fulfillment_status": "unfulfilled",
      "shipments_count": 3,
      "fulfillment_updated_at": "2022-06-24T06:00:45.408Z"
    },
    {
      "id": "wkykhjYjgp",
      "number": "2438484",
      "fulfillment_status": "in_progress",
      "shipments_count": 1,
      "fulfillment_updated_at": "2022-06-23T14:35:04.711Z"
    },
    {
      "id": "qJZYhBMBpG",
      "number": "2438483",
      "fulfillment_status": "fulfilled",
      "shipments_count": 1,
      "fulfillment_updated_at": "2022-06-23T14:20:21.399Z"
    },
    {
      "id": "wnlKhmrmam",
      "number": "2438481",
      "fulfillment_status": "in_progress",
      "shipments_count": 2,
      "fulfillment_updated_at": "2022-06-23T06:00:50.478Z"
    }
  ],
  "meta": {
    "pagination": {
      "record_count": 123,
      "cursor": "LS0lDi0kDzIwMjItMDYtMjMUMCY7LD=="
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