import test, { suite } from 'node:test'
import { checkTestResult, skipToolTest } from '../../util.js'
import assert from 'node:assert'



const modulesRoot = '../../../src/metrics/tools'
const toolsGroup = 'resource_queries'

const tools = (await import(`${modulesRoot}/${toolsGroup}.js`)).default


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
  carts_breakdown: {
    payload: {
      by: 'order.link_id',
      field: 'order.id',
      operator: 'value_count',
      sort: 'desc',
      limit: 10
    },
    filter: { order: defaultFilter }
  },
  carts_date_breakdown: {
    payload: {
      by: 'order.current_date',
      field: 'order.id',
      operator: 'value_count',
      interval: 'day'
    },
    filter: { order: defaultFilter }
  },
  carts_search: {
    payload: {
      fields: ['order.id']
    },
    filter: { order: defaultFilter }
  },
  carts_stats: {
    payload: {
      field: 'order.id',
      operator: 'value_count'
    },
    filter: { order: defaultFilter }
  },
  orders_breakdown: {
    payload: {
      by: 'payment_method.name',
      field: 'order.id',
      operator: 'value_count',
      sort: 'desc',
      limit: 100,
      breakdown: {
        by: 'payment_method.card_type',
        field: 'order.id',
        operator: 'value_count',
        sort: 'desc',
        limit: 100
      }
    },
    filter: { order: defaultFilter }
  },
  orders_date_breakdown: {
    payload: {
      by: 'order.placed_at',
      field: 'order.total_amount_with_taxes',
      operator: 'stats',
      interval: 'month',
      breakdown: {
        by: 'order.country_code',
        field: 'line_items.total_amount',
        operator: 'sum',
        sort: 'desc',
        limit: 20,
        breakdown: {
          by: 'order.currency_code',
          field: 'line_items.total_amount',
          operator: 'sum',
          sort: 'desc',
          limit: 21
        }
      }
    },
    filter: { order: defaultFilter }
  },
  orders_search: {
    payload: {
      limit: 10,
      sort: 'desc',
      sort_by: 'order.created_at',
      fields: ['order.aggregated_details']
    },
    filter: {
      order: {
        ...defaultFilter,
        date_field: 'created_at',
        aggregated_details: { 'query': '*cancelled OR duccio*' }
      }
    }
  },
  orders_stats: {
    payload: {
      field: 'market.id',
      operator: 'cardinality'
    },
    filter: { order: defaultFilter }
  },
  returns_breakdown: {
    payload: {
      by: 'organization.id',
      field: 'return.id',
      operator: 'value_count',
      sort: 'desc',
      limit: 5
    },
    filter: {
      return: {
        ...defaultFilter,
        date_field: 'created_at',
        skus_count: { gte: 1 }
      }
    }
  },
  returns_date_breakdown: {
    payload: {
      by: 'return.approved_at',
      field: 'return.id',
      operator: 'value_count',
      interval: 'month'
    },
    filter: { return: defaultFilter }
  },
  returns_search: {
    payload: {
      limit: 20,
      sort: 'asc',
      sort_by: 'return.approved_at',
      fields: ['return.id', 'return.approved_at']
    },
    filter: { return: defaultFilter }
  },
  returns_stats: {
    payload: {
      field: 'return.id',
      operator: 'value_count'
    },
    filter: { return: defaultFilter }
  },
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
        const result = await tool.callback(toolData, {})
        checkTestResult(result)
      } catch (error: any) {
        assert.fail(`Error in tool ${tool.name}: ${error.message || error}`)
      }

    })
  }

})
