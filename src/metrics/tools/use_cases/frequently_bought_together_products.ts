import { z } from 'zod'
import type { McpServerTool } from '../../../server/types.js'
import type { MetricsFilterFbt, MetricsQueryFbt } from '../../common.js'
import { execMetricsTool } from '../util.js'
import { callToolResult } from '../../../utils/tools.js'



function buildQuery(payload?: any, filter?: any): MetricsQueryFbt {

  const fbtFilter: MetricsFilterFbt = {
    line_items: {
      item_ids: {
        in: filter.item_ids
      }
    }
  }

  const query: MetricsQueryFbt = {
    filter: fbtFilter
  }

  return query

}


const useCaseTool: McpServerTool = {
  name: 'frequently-bought-together-products',
  description: 'How to use the Metrics API to get the products that have been most frequently bought together with other ones',
  inputSchema: {
    filter: z.strictObject({
      item_ids: z.array(z.string()).describe('A list of SKU or bundle IDs associated as line items to one or more orders'),
    }).describe('Narrow the results of the query by date or any other parameter available for filtering the selected resource')
  },
  callback: async ({ payload, filter }, { authInfo }) => {
    const query = buildQuery(payload, filter)
    return callToolResult(await execMetricsTool(authInfo, 'fbt', query))
  }
}


export default useCaseTool
