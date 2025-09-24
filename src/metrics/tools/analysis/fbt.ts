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


const fbtTool: McpServerTool = {
  name: 'fbt',
  description: 'Frequently Bought Together, FBTs are a type of analysis query that allows to retrieve the items that most frequently have been added as line items in the same orders as a specified item (SKU or bundle) or array of items',
  inputSchema: {
    // accessToken: z.string().describe('Access token to use with the API'),
    filter: z.strictObject({
      item_ids: z.array(z.string()).describe('A list of SKU or bundle IDs associated as line items to one or more orders'),
    }).describe('Narrow the results of the query by date or any other parameter available for filtering the selected resource')
  },
  callback: async ({ payload, filter }) => {
    const query = buildQuery(payload, filter)
    return callToolResult(await execMetricsTool('fbt', query))
  }
}


export default fbtTool
