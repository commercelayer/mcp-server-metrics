import { z } from 'zod'
import type { McpServerTool } from '../../../server/types.js'
import type { MetricsFilter, MetricsQuery, MetricsQueryBreakdown } from '../../common.js'
import { checkFilter, execMetricsTool } from '../util.js'
import { callToolResult } from '../../../utils/tools.js'



function buildQuery(payload?: any, filter?: any): MetricsQuery {

  const queryBreakdown: MetricsQueryBreakdown = {
    by: 'order.country_code',
    field: 'order.skus_count',
    operator: 'stats',
    limit: payload?.limit || 20
  }

  const filterBreakdown: MetricsFilter = {}

  if (filter) {
    if (filter.date_from || filter.date_to) {
      filterBreakdown.order = {
        date_from: filter.date_from,
        date_to: filter.date_to
      }
    }
  }

  const query: MetricsQuery = {
    breakdown: queryBreakdown,
    filter: checkFilter(filterBreakdown)
  }

  return query

}


const useCaseTool: McpServerTool = {
  name: 'number-of-products-per-order-by-country',
  description: 'How to use the Metrics API to get mixed stats about the number of SKUs included in the orders of your organization, grouped by different countries',
  inputSchema: {
    payload: z.strictObject({
      limit: z.number().int().min(1).max(100).optional().describe('The maximum number of records shown in the response (1-100)')
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
