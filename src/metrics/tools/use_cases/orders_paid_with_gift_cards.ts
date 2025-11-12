import { z } from 'zod'
import type { McpServerTool } from '../../../server/types.js'
import type { MetricsFilter, MetricsQuery, MetricsQueryStats } from '../../common.js'
import { execMetricsTool } from '../util.js'
import { callToolResult } from '../../../utils/tools.js'



function buildQuery(payload?: any, filter?: any): MetricsQuery {

  const queryStats: MetricsQueryStats = {
    field: 'order.id',
    operator: 'value_count'
  }


  const filterStats: MetricsFilter = {
    order: {
      gift_card: true,
      payment_statuses: {
        in: ['paid']
      }
    }
  }

  if (filter) {
    if (filter.date_from || filter.date_to) {
      filterStats.order = {
        ...filterStats.order,
        date_from: filter.date_from,
        date_to: filter.date_to,
        date_field: 'approved_at'
      }
    }
  }


  const query: MetricsQuery = {
    stats: queryStats,
    filter: filterStats
  }

  return query

}


const useCaseTool: McpServerTool = {
  name: 'orders-paid-with-gift-cards',
  description: 'How to use the Metrics API to get the total number of orders that were paid using a gift card',
  inputSchema: {
    // accessToken: z.string().describe('Access token to use with the API'),
    filter: z.strictObject({
      date_from: z.string().datetime().optional().describe('The lower limit of the date and time range used to filter the collected records (required if you specified date_to)'),
      date_to: z.string().datetime().optional().describe('The upper limit of the date and time range used to filter the collected records (required if you specified date_from)')
    }).optional().describe('Narrow the results of the query by date or any other parameter available for filtering the selected resource')
  },
  callback: async ({ payload, filter }, { authInfo }) => {
    const query = buildQuery(payload, filter)
    return callToolResult(await execMetricsTool(authInfo, 'stats', query, 'orders'))
  }
}


export default useCaseTool
