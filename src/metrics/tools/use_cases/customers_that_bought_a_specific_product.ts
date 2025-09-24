import { z } from 'zod'
import type { McpServerTool } from '../../../server/types.js'
import type { MetricsFilter, MetricsQuery, MetricsQueryStats } from '../../common.js'
import { checkFilter, execMetricsTool } from '../util.js'
import { callToolResult } from '../../../utils/tools.js'



function buildQuery(payload?: any, filter?: any): MetricsQuery {

  const queryStats: MetricsQueryStats = {
    field: 'customer.email',
    operator: 'cardinality'
  }

  const filterStats: MetricsFilter = {
    ...filter
  }

  const query: MetricsQuery = {
    stats: queryStats,
    filter: checkFilter(filterStats)
  }

  return query

}


const useCaseTool: McpServerTool = {
  name: 'customers_that_bought_a_specific_product',
  description: 'How to use the Metrics API to get the total number of customers that bought a specific product or bundle',
  inputSchema: {
    // accessToken: z.string().describe('Access token to use with the API'),
    filter: z.any().optional().describe('Narrow the results of the query by date or any other parameter available for filtering the selected resource')
  },
  callback: async ({ payload, filter }) => {
    const query = buildQuery(payload, filter)
    return callToolResult(await execMetricsTool('stats', query, 'orders'))
  }
}


export default useCaseTool
