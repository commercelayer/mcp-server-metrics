import { z } from 'zod'
import type { McpServerTool } from '../../../server/types.js'
import type { MetricsFilter, MetricsQuery, MetricsQuerySearch } from '../../common.js'
import { execMetricsTool } from '../util.js'
import { callToolResult } from '../../../utils/tools.js'



function buildQuery(payload?: any, filter?: any): MetricsQuery {

  const querySearch: MetricsQuerySearch = {
    limit: payload?.limit || 100,
    fields: ['order.id', 'order.number', 'order.archived_at'],
    sort_by: 'order.archived_at'
  }


  const filterSearch: MetricsFilter = {
    order: {
      archived: true
    }
  }

  if (filter) {
    if (filter.date_from || filter.date_to) {
      filterSearch.order = {
        ...filterSearch.order,
        date_field: 'archived_at',
        date_from: filter.date_from,
        date_to: filter.date_to
      }
    }
  }


  const query: MetricsQuery = {
    search: querySearch,
    filter: filterSearch
  }

  return query

}


const useCaseTool: McpServerTool = {
  name: 'latest-archived-orders',
  description: 'How to use the Metrics API to get the most recently archived orders',
  inputSchema: {
    payload: z.strictObject({
      limit: z.number().int().min(1).max(100).optional().describe('The maximum number of records shown in the response')
    }).optional().describe('The body payload to use for the request'),
    filter: z.strictObject({
      date_from: z.string().datetime().optional().describe('The lower limit of the date and time range used to filter the collected records (required if you specified date_to)'),
      date_to: z.string().datetime().optional().describe('The upper limit of the date and time range used to filter the collected records (required if you specified date_from)')
    }).optional().describe('Narrow the results of the query by date or any other parameter available for filtering the selected resource')
  },
  callback: async ({ payload, filter }, { authInfo }) => {
    const query = buildQuery(payload, filter)
    return callToolResult(await execMetricsTool(authInfo, 'search', query, 'orders'))
  }
}


export default useCaseTool
