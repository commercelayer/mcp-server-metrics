import { z } from 'zod'
import type { McpServerTool } from '../../../server/types.js'
import type { MetricsFilter, MetricsQuery, MetricsQueryBreakdown } from '../../common.js'
import { checkFilter, execMetricsTool } from '../util.js'
import { callToolResult } from '../../../utils/tools.js'



function buildQuery(payload?: any, filter?: any): MetricsQuery {

  const queryBreakdown: MetricsQueryBreakdown = {
    by: 'shipments.status',
    field: 'order.id',
    operator: 'value_count',
    limit: payload?.limit || 20,
    breakdown: {
      by: 'shipments.shipping_method.name',
      field: 'order.id',
      operator: 'value_count',
      limit: payload?.limit || 10,
    }
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
  name: 'orders-by-shipment-status-and-shipping-method-name',
  description: 'How to use the Metrics API to get the total number of orders of your organization, grouped by the associated shipment status and the related shipping method name',
  inputSchema: {
    // accessToken: z.string().describe('Access token to use with the API'),
    payload: z.strictObject({
      limit: z.number().int().min(1).max(20).optional().describe('The maximum number of records shown in the response')
    }).optional().describe('The body payload to use for the request'),
    filter: z.strictObject({
      date_from: z.string().datetime().optional().describe('The lower limit of the date and time range used to filter the collected records (required if you specified date_to)'),
      date_to: z.string().datetime().optional().describe('The upper limit of the date and time range used to filter the collected records (required if you specified date_from)')
    }).optional().describe('Narrow the results of the query by date or any other parameter available for filtering the selected resource')
  },
  callback: async ({ payload, filter }) => {
    const query = buildQuery(payload, filter)
    return callToolResult(await execMetricsTool('breakdown', query, 'orders'))
  }
}


export default useCaseTool
