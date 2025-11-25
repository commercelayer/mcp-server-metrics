import { z } from 'zod'
import type { McpServerTool } from '../../../server/types.js'
import type { MetricsFilter, MetricsQuery, MetricsQueryStats } from '../../common.js'
import { checkFilter, execMetricsTool } from '../util.js'
import { callToolResult } from '../../../utils/tools.js'



function buildQuery(payload?: any, filter?: any): MetricsQuery {

  const queryStats: MetricsQueryStats = {
    field: 'shipments.seconds_in_picking',
    operator: 'avg'
  }


  const filterStats: MetricsFilter = {}

  if (filter) {
    if (filter.date_from || filter.date_to) {
      filterStats.order = {
        date_from: filter.date_from,
        date_to: filter.date_to,
        date_field: 'placed_at'
      }
    }
  }


  const query: MetricsQuery = {
    stats: queryStats,
    filter: checkFilter(filterStats)
  }

  return query

}


const useCaseTool: McpServerTool = {
  name: 'shipments-average-time-in-picking',
  description: 'How to use the Metrics API to get the average time your shipments stay in picking status before being packed',
  inputSchema: {
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
