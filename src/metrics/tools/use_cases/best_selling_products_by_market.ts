import { z } from 'zod'
import type { McpServerTool } from '../../../server/types.js'
import type { MetricsFilter, MetricsQuery, MetricsQueryBreakdown } from '../../common.js'
import { execMetricsTool } from '../util.js'
import { callToolResult } from '../../../utils/tools.js'



function buildQuery(payload?: any, filter?: any): MetricsQuery {

  const queryBreakdown: MetricsQueryBreakdown = {
    by: 'market.name',
    field: 'order.id',
    operator: 'value_count',
    breakdown: {
      by: 'line_items.name',
      field: 'order.id',
      operator: 'value_count',
      limit: payload?.limit || 5
    }
  }

  const filterBreakdown: MetricsFilter = {
    line_items: {
      types: {
        in: ['skus']
      }
    }
  }

  if (filter) {
    if (filter.date_from || filter.date_to) {
      filterBreakdown.order = {
        date_from: filter.date_from,
        date_to: filter.date_to,
        date_field: 'placed_at'
      }
    }
  }

  const query: MetricsQuery = {
    breakdown: queryBreakdown,
    filter: filterBreakdown
  }

  return query

}


const useCaseTool: McpServerTool = {
  name: 'best-selling-products-by-market',
  description: 'How to use the Metrics API to get the Top N best-selling products for each of your organization\'s market',
  inputSchema: {
    // accessToken: z.string().describe('Access token to use with the API'),
    payload: z.strictObject({
      limit: z.number().int().min(1).max(20).optional().describe('The maximum number of records shown in the response'),
    }).optional().describe('The body payload to use for the request'),
    filter: z.strictObject({
      date_from: z.string().datetime().describe('The lower limit of the date and time range used to filter the collected records (required if you specified date_to)'),
      date_to: z.string().datetime().describe('The upper limit of the date and time range used to filter the collected records (required if you specified date_from)')
    }).optional().describe('Narrow the results of the query by date or any other parameter available for filtering the selected resource')
  },
  callback: async ({ payload, filter }, { authInfo }) => {
    const query = buildQuery(payload, filter)
    return callToolResult(await execMetricsTool(authInfo, 'breakdown', query, 'orders'))
  }
}


export default useCaseTool
