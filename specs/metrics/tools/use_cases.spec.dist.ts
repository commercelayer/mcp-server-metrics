import test, { suite } from 'node:test'
import { checkTestResult, skipToolTest } from '../../util.js'
import assert from 'node:assert'



const modulesRoot = '../../../dist/server/metrics/tools'
const toolsGroup = 'use_cases'

const tools = (await import(`${modulesRoot}/${toolsGroup}/index.js`)).default



const defaultPayload = {
  limit: 10
}

const defaultFilter = {
  date_from: '2023-01-01T00:00:00Z',
  date_to: '2024-12-31T23:59:59Z'
}

const defaultData = {
  payload: defaultPayload,
  filter: defaultFilter
}


const testData = {
  top_10_spenders_by_currency: defaultData,
  best_selling_products_by_market: defaultData,
  customers_that_bought_a_specific_product: {},
  frequently_bought_together_products: { filter: { item_ids: ['wZeDdSrjrn'] } },
  last_carts_with_a_specific_product_from_a_specific_market: {
    payload: defaultPayload,
    filter: {
      ...defaultFilter,
      sku_code: 'TSHIRTMS000000FFFFFFLXXX',
      market_name: 'USA'
    }
  },
  latest_archived_orders: defaultData,
  latest_placed_orders_from_customers_with_specific_email_domains: defaultData,
  number_of_products_per_order_by_country: defaultData,
  orders_associated_with_a_specific_promotion: {
    payload: defaultPayload,
    filter: {
      ...defaultFilter,
      promo_type: 'percentage_discount_promotions',
      promo_name: 'Wow'
    }
  },
  orders_by_bundle: defaultData,
  orders_by_currency: {
    payload: defaultPayload,
    filter: {
      ...defaultFilter,
      currency_codes: ['EUR']
    }
  },
  orders_by_day: { filter: defaultFilter },
  orders_by_repeat_customer: defaultData,
  orders_by_resource_error_code_and_message: {
    payload: defaultPayload,
    filter: {
      ...defaultFilter,
      error_codes: ['ADYEN_ERROR', 'STRIPE_ERROR', 'PAYPAL_ERROR']
    }
  },
  orders_by_shipment_status_and_shipping_method_name: defaultData,
  orders_by_status_and_payment_status: { filter: defaultFilter },
  orders_paid_with_gift_cards: { filter: defaultFilter },
  refunds_by_country_and_currency: defaultData,
  returns_per_year_by_destination_city: {
    payload: { interval: 'day' },
    filter: defaultFilter
  },
  shipments_average_time_in_picking: { filter: defaultFilter }

}



suite(`Metrics Tools: ${toolsGroup}`, async () => {

  let accessToken = ''

  // before(async () => { accessToken = await getAccessToken() })

  for (const tool of tools) {
    test(tool.name, async (t) => {

      const toolModule = tool.name.replace(/-/g, '_') as keyof typeof testData

      const toolData = testData[toolModule]
      if (!toolData) skipToolTest(tool, t)
      else
      try {
        // const { callback } = await import(`${modulesRoot}/${toolsGroup}/${toolModule}.js`)
        const result = await tool.callback(toolData, {})
        checkTestResult(result)
      } catch (error: any) {
        assert.fail(`Error in tool ${tool.name}: ${error.message || error}`)
      }

    })
  }

})
