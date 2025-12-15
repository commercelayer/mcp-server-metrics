import { z } from 'zod'
import type { McpServerTool } from '../../../server/types.js'
import { intervalValues, type MetricsFilter, type MetricsQuery, type MetricsQueryDateBreakdown } from '../../common.js'
import { checkFilter, execMetricsTool } from '../util.js'
import { callToolResult } from '../../../utils/tools.js'



function buildQuery(payload?: any, filter?: any): MetricsQuery {

  const queryDateBreakdown: MetricsQueryDateBreakdown = {
    by: 'return.current_date',
    field: 'return.id',
    operator: 'value_count',
    interval: payload?.interval || 'year',
    breakdown: {
      by: 'destination_address.city',
      field: 'return.skus_count',
      operator: 'avg'
    }
  }


  const filterDateBreakdown: MetricsFilter = {}

  if (filter) {
    if (filter.date_from || filter.date_to) {
      filterDateBreakdown.return = {
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
  name: 'returns-per-year-by-destination-city',
  description: 'How to use the Metrics API to get the total number of returns requested for your orders, grouped by year and destination city',
  inputSchema: {
    payload: z.strictObject({
      interval: z.enum(intervalValues).optional().describe(`The time interval over which the metrics / stats are computed. The results will be aggregated by date accordingly. Possible values are: ${intervalValues.join(', ')}`),
    }).optional().describe('The body payload to use for the request'),
    filter: z.strictObject({
      date_from: z.string().datetime().optional().describe('The lower limit of the date and time range used to filter the collected records (required if you specified date_to)'),
      date_to: z.string().datetime().optional().describe('The upper limit of the date and time range used to filter the collected records (required if you specified date_from)')
    }).optional().describe('Narrow the results of the query by date or any other parameter available for filtering the selected resource')
  },
  callback: async ({ payload, filter }, { authInfo }) => {
    const query = buildQuery(payload, filter)
    return callToolResult(await execMetricsTool(authInfo, 'date_breakdown', query, 'returns'))
  }
}


export default useCaseTool
