---
description: >-
  How to use the Metrics API to check the errors associated with the orders of
  your organization (if any) .
---

# Orders by resource error code and message

### The problem

You want to get the total number of orders over a selected date and time range, grouped by the associated resource error code. For each code, you also want to group the results by the related error message.

### The solution

#### Query

You need to perform a [breakdown query](../queries/breakdown.md) setting the required query keys as follows and adding the optional ones based on your needs:

<table><thead><tr><th width="367">Key</th><th>Value</th></tr></thead><tbody><tr><td><strong><code>by</code></strong></td><td><code>resource_errors.code</code></td></tr><tr><td><strong><code>field</code></strong></td><td><code>order.id</code></td></tr><tr><td><strong><code>operator</code></strong></td><td><code>value_count</code></td></tr></tbody></table>

You also need to add a [nested breakdown](../queries/breakdown.md#nesting-breakdowns) setting the related query keys as follows:

<table><thead><tr><th width="367">Key</th><th>Value</th></tr></thead><tbody><tr><td><strong><code>by</code></strong></td><td><code>resource_errors.message</code></td></tr><tr><td><strong><code>field</code></strong></td><td><code>order.id</code></td></tr><tr><td><strong><code>operator</code></strong></td><td><code>value_count</code></td></tr></tbody></table>

#### Filter

Make sure to set the desired date and time range using the `date_from` and `date_to` keys in the [filter](../filters.md).&#x20;

As shown in the example below, use `created_at` as the `date_field` in the [date filter](../filters.md#date-filters) if you want the results to count all the orders that were created in the selected date and time range ([read more](../filters.md#how-date_field-works) about this).

{% hint style="info" %}
If you need to narrow the response to inspect some specific error codes only, you can add additional [filters](../filters.md) on the [resource errors](https://app.gitbook.com/s/lhTYC557IzGiJNS84RKD/resources/orders#resource_errors-field) field (as shown in this [example](orders-by-resource-error-code-and-message.md#filtering-specific-error-codes)).
{% endhint %}

### [Try it on Postman](https://www.postman.com/commercelayer/commerce-layer-public-workspace/documentation/ontyt81/commerce-layer-metrics-api-2024-06-11?entity=request-19711194-d94f6190-02ca-499f-8d0e-af0ce7f5e1ce) :rocket:

### Example

{% tabs %}
{% tab title="Request" %}
The following request uses the Metrics API to get the total number of orders, grouped by the associated resource error code and message:

<pre class="language-shell"><code class="lang-shell">curl -g -X POST \
  'https://{{your_domain}}.commercelayer.io/metrics/orders/breakdown' \
  -H 'Accept: application/vnd.api.v1+json' \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Authorization: Bearer {{your_access_token}}' \
  -d '{
    "breakdown": {
<strong>      "by": "resource_errors.code",
</strong><strong>      "field": "order.id",
</strong><strong>      "operator": "value_count",
</strong><strong>      "limit": 100,
</strong>      "breakdown": {
<strong>        "by": "resource_errors.message",
</strong><strong>        "field": "order.id",
</strong><strong>        "operator": "value_count",
</strong><strong>        "limit": 10
</strong>      }
    },
    "filter": {
      "order": {
        "date_from": "2021-01-01T00:00:00Z",
        "date_to": "2022-11-31T23:59:00Z",
        "date_field": "created_at"
      }
    }
  }'
</code></pre>
{% endtab %}

{% tab title="Response" %}
On success, the API responds with a `200 OK` status code, returning the aggregated, nested values in the `data` object and extra information in the `meta` object:

<pre class="language-json"><code class="lang-json">{
  "data": {
    "resource_errors.code": [
      {
<strong>        "label": "INVALID_GIFT_CARD",
</strong><strong>        "value": 1969,
</strong>        "resource_errors.message": [
          { 
<strong>            "label": "doesn't match any active gift card", 
</strong><strong>            "value": 1969
</strong>          }
        ]
      },
      {
<strong>        "label": "ADYEN_ERROR",
</strong><strong>        "value": 218,
</strong>        "resource_errors.message": [
          { 
<strong>            "label": "Invalid card number", 
</strong><strong>            "value": 161 
</strong>          },
          { 
<strong>            "label": "Refused", 
</strong><strong>            "value": 36 
</strong>          },
          { 
<strong>            "label": "Request already processed or in progress", 
</strong><strong>            "value": 10 
</strong>          },
          { 
<strong>            "label": "Required field cvc is not provided", 
</strong><strong>            "value": 7 
</strong>          },
          { 
<strong>            "label": "Missing payment method details: issuer", 
</strong><strong>            "value": 3 
</strong>          },
          {
<strong>            "label": "Required field colorDepth missing for device channel browser",
</strong><strong>            "value": 1
</strong>          }
        ]
      },
      {
<strong>        "label": "STRIPE_ERROR",
</strong><strong>        "value": 102,
</strong>        "resource_errors.message": [
          { 
<strong>            "label": "Your card was declined", 
</strong><strong>            "value": 71 
</strong>          },
          { 
<strong>            "label": "Payment source changed on order", 
</strong><strong>            "value": 15 
</strong>          },
          {
<strong>            "label": "The provided payment method has failed authentication. You can provide payment method data or a new payment method to attempt to fulfill this payment intent again.",
</strong><strong>            "value": 11
</strong>          },
          {
<strong>            "label": "This payment intent could not be captured because it has a status of canceled. Only a payment intent with one of the following statuses may be captured: requires_capture.",
</strong><strong>            "value": 5
</strong>          }
        ]
      },
      {
<strong>        "label": "ORDER_NO_MORE_EDITABLE",
</strong><strong>        "value": 21,
</strong>        "resource_errors.message": [
          { 
<strong>            "label": "Order is no more editable", 
</strong><strong>            "value": 21 
</strong>          }
        ]
      },
      {
<strong>        "label": "CUSTOMER_TOKEN_CAN'T_BE_BLANK",
</strong>        "value": 16,
        "resource_errors.message": [
          { 
<strong>            "label": "Customer token can't be blank", 
</strong><strong>            "value": 16 
</strong>          }
        ]
      },
      {
<strong>        "label": "PAYMENT_SOURCE_TOKEN_CAN'T_BE_BLANK",
</strong><strong>        "value": 9,
</strong>        "resource_errors.message": [
          { 
<strong>            "label": "Payment source token can't be blank", 
</strong><strong>            "value": 9 
</strong>          }
        ]
      }
      {
<strong>        "label": "PAYMENT_INTENT_INVALID_STATUS",
</strong><strong>        "value": 7,
</strong>        "resource_errors.message": [
          {
<strong>            "label": "Payment intent invalid status: requires_payment_method",
</strong><strong>            "value": 7
</strong>          }
        ]
      },
      {
<strong>        "label": "MANUAL_ERROR",
</strong><strong>        "value": 4,
</strong>        "resource_errors.message": [
          {
<strong>            "label": "You cannot call create unless the parent is saved",
</strong><strong>            "value": 4
</strong>          }
        ]
      },
      {
<strong>        "label": "MISSING_SHIPPING_METHODS",
</strong><strong>        "value": 3,
</strong>        "resource_errors.message": [
          {
<strong>            "label": "Some shipments are missing the shipping method",
</strong><strong>            "value": 3
</strong>          }
        ]
      },
      {
<strong>        "label": "ORDER_AUTHORIZED",
</strong><strong>        "value": 2,
</strong>        "resource_errors.message": [
          { 
<strong>            "label": "Cannot be changed for an authorized order", 
</strong><strong>            "value": 2 
</strong>          }
        ]
      },
      {
<strong>        "label": "PAYPAL_ERROR",
</strong><strong>        "value": 1,
</strong>        "resource_errors.message": [
          { 
<strong>            "label": "ORDER_NOT_APPROVED", 
</strong><strong>            "value": 1 
</strong>          }
        ]
      }
    ]
  },
  "meta": {
    "type": "breakdown",
    "trace_id": "fe571ea2-8a4f-4a5e-bd26-ac54651bb2e4",
    "mode": "test",
    "organization_id": "xYZkjABcde",
    "market_ids": [ "yzXKjYzaCx", "..." ]
  }
}
</code></pre>
{% endtab %}
{% endtabs %}

#### Filtering specific error codes

{% tabs %}
{% tab title="Request" %}
The following request uses the Metrics API to get the total number of orders, grouped by the associated resource error code and message, filtering the ones related to some specific payment gateways only:

<pre class="language-shell"><code class="lang-shell">curl -g -X POST \
  'https://{{your_domain}}.commercelayer.io/metrics/orders/breakdown' \
  -H 'Accept: application/vnd.api.v1+json' \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Authorization: Bearer {{your_access_token}}' \
  -d '{
    "breakdown": {
      "by": "resource_errors.code",
      "field": "order.id",
      "operator": "value_count",
      "limit": 100,
      "breakdown": {
        "by": "resource_errors.message",
        "field": "order.id",
        "operator": "value_count",
        "limit": 10
      }
    },
    "filter": {
      "order": {
        "date_from": "2021-01-01T00:00:00Z",
        "date_to": "2022-11-31T23:59:00Z",
        "date_field": "created_at"
      },
<strong>      "resource_errors": {
</strong><strong>        "codes": {
</strong><strong>          "in": [
</strong><strong>            "ADYEN_ERROR",
</strong><strong>            "STRIPE_ERROR",
</strong><strong>            "PAYPAL_ERROR"
</strong><strong>          ]
</strong><strong>        }
</strong>      }
    }
  }'
</code></pre>
{% endtab %}

{% tab title="Response" %}
On success, the API responds with a `200 OK` status code, returning the aggregated, nested, and filtered values in the `data` object and extra information in the `meta` object:

<pre class="language-json"><code class="lang-json">{
  "data": {
    "resource_errors.code": [
      {
<strong>        "label": "INVALID_GIFT_CARD",
</strong><strong>        "value": 1969,
</strong>        "resource_errors.message": [
          { 
<strong>            "label": "doesn't match any active gift card", 
</strong><strong>            "value": 1969
</strong>          }
        ]
      },
      {
<strong>        "label": "ADYEN_ERROR",
</strong><strong>        "value": 218,
</strong>        "resource_errors.message": [
          { 
<strong>            "label": "Invalid card number", 
</strong><strong>            "value": 161 
</strong>          },
          { 
<strong>            "label": "Refused", 
</strong><strong>            "value": 36 
</strong>          },
          { 
<strong>            "label": "Request already processed or in progress", 
</strong><strong>            "value": 10 
</strong>          },
          { 
<strong>            "label": "Required field cvc is not provided", 
</strong><strong>            "value": 7 
</strong>          },
          { 
<strong>            "label": "Missing payment method details: issuer", 
</strong><strong>            "value": 3 
</strong>          },
          {
<strong>            "label": "Required field colorDepth missing for device channel browser",
</strong><strong>            "value": 1
</strong>          }
        ]
      },
      {
<strong>        "label": "STRIPE_ERROR",
</strong><strong>        "value": 102,
</strong>        "resource_errors.message": [
          { 
<strong>            "label": "Your card was declined", 
</strong><strong>            "value": 71 
</strong>          },
          { 
<strong>            "label": "Payment source changed on order", 
</strong><strong>            "value": 15 
</strong>          },
          {
<strong>            "label": "The provided payment method has failed authentication. You can provide payment method data or a new payment method to attempt to fulfill this payment intent again.",
</strong><strong>            "value": 11
</strong>          },
          {
<strong>            "label": "This payment intent could not be captured because it has a status of canceled. Only a payment intent with one of the following statuses may be captured: requires_capture.",
</strong><strong>            "value": 5
</strong>          }
        ]
      },
      {
<strong>        "label": "PAYPAL_ERROR",
</strong><strong>        "value": 1,
</strong>        "resource_errors.message": [
          { 
<strong>            "label": "ORDER_NOT_APPROVED", 
</strong><strong>            "value": 1 
</strong>          }
        ]
      }
    ]
  },
  "meta": {
    "type": "breakdown",
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

* [Total number of orders by market and payment method name](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-964bdc6f-a5d5-4d91-80e3-beba6866a13c)
* [Average order total amount by currency and country code](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-a92975e5-e80e-424e-80d7-7bcd75f01cb2)
* [Top 5 best-selling products in the best-selling markets](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-a3aac79d-645d-4471-8a6b-cdc97ff6c87e)
* [Top 5 best-selling countries for the best-selling products](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-0d6a426a-1dcb-4e0d-a5d4-164d7e5ae13a)
* [Top 10 spenders by currencies](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-6f2183c6-b5fd-4d6b-9cb9-b201ea64a16d)
* [Total number of refunds by country and currency code](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-1c793071-2d81-47ed-a088-520072a835ed)
* [Total number of active returns by market name and return status](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-e4671c3d-17b4-4be3-9261-0fbcc8933408)
* [Total number of carts by status and related amount stats by currency code](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-a948ab86-4e2d-4954-99b2-d1eb319de05a)
* [Total number of pending carts by customer email and payment method name](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-3a498993-83df-41de-ba40-5a1ebc38cdb4)
* [Total number of orders by status and payment status](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-19711194-e53340bf-3799-42a1-b316-3f2c6a20a785)
* [Total number of orders by shipment status and shipping method name](https://www.postman.com/commercelayer/workspace/commerce-layer-public-workspace/documentation/19711194-37a2d863-72f6-4b8f-8146-2f61d405fd3c?entity=request-11194-acee0b06-91e5-4087-b830-0f570d3b8b47)