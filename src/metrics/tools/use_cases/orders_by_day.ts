import { z } from 'zod'
import type { McpServerTool } from '../../../server/types.js'
import type { MetricsFilter, MetricsQuery, MetricsQueryDateBreakdown } from '../../common.js'
import { checkFilter, execMetricsTool } from '../util.js'
import { callToolResult } from '../../../utils/tools.js'



function buildQuery(payload?: any, filter?: any): MetricsQuery {

  const queryDateBreakdown: MetricsQueryDateBreakdown = {
    by: 'order.current_date',
    field: 'order.id',
    operator: 'value_count',
    interval: 'day'
  }


  const filterDateBreakdown: MetricsFilter = {}

  if (filter) {
    if (filter.date_from || filter.date_to) {
      filterDateBreakdown.order = {
        date_from: filter.date_from,
        date_to: filter.date_to
      }
    }
  }


  const query: MetricsQuery = {
    date_breakdown: queryDateBreakdown,
    filter: checkFilter(filterDateBreakdown)
  }

  return query

}


const useCaseTool: McpServerTool = {
  name: 'orders-by-day',
  description: 'How to use the Metrics API to get the total number of orders of your organization, grouped by day',
  inputSchema: {
    // accessToken: z.string().describe('Access token to use with the API'),
    filter: z.strictObject({
      date_from: z.string().datetime().optional().describe('The lower limit of the date and time range used to filter the collected records (required if you specified date_to)'),
      date_to: z.string().datetime().optional().describe('The upper limit of the date and time range used to filter the collected records (required if you specified date_from)')
    }).optional().describe('Narrow the results of the query by date or any other parameter available for filtering the selected resource')
  },
  callback: async ({ payload, filter }) => {
    const query = buildQuery(payload, filter)
    return callToolResult(await execMetricsTool('date_breakdown', query, 'orders'))
  }
}


export default useCaseTool
