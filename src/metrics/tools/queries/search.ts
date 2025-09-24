import { z } from 'zod'
import type { McpServerTool, NonEmptyStringArray } from '../../../server/types.js'
import type { MetricsFilter, MetricsQuerySearch, MetricsQuery, MetricsResource } from '../../common.js'
import { sortValues } from '../../common.js'
import { execMetricsTool } from '../util.js'
import { callToolResult } from '../../../utils/tools.js'



export default function searchTool(resource: MetricsResource, values: {
  sortByValues: Readonly<NonEmptyStringArray>,
  fieldValues: Readonly<NonEmptyStringArray>
}): McpServerTool {

  const { sortByValues, fieldValues } = values

  const searchTool: McpServerTool = {
    name: `${resource}-search`,
    description: `Run the search function on ${resource}`,
    inputSchema: {
      // accessToken: z.string().describe('Access token to use with the API'),
      payload: z.strictObject({
        limit: z.number().int().min(1).max(100).optional().describe('The maximum number of records shown in the response'),
        sort: z.enum(sortValues).optional().describe('The way you want the results of the query to be sorted'),
        sort_by: z.enum(sortByValues).optional().describe('The date field you want the results of the query sorted by'),
        fields: z.array(z.enum(fieldValues)).describe('The list of fields you want to be returned for each record in the response'),
        cursor: z.string().optional().describe('The cursor pointing to a specific page in the paginated search results')
      }).describe('The body payload to use for the request'),
      filter: z.any().optional().describe('Narrow the results of the query by date or any other parameter available for filtering the selected resource')
    },
    callback: async ({ payload, filter }) => {

      const query: MetricsQuery = {
        search: payload as MetricsQuerySearch,
        filter: filter as MetricsFilter
      }

      return callToolResult(await execMetricsTool('search', query, resource))

    }
  }


  return searchTool

}
