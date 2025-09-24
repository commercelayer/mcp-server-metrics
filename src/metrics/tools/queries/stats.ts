import { z } from 'zod'
import type { McpServerTool, NonEmptyStringArray } from '../../../server/types.js'
import type { MetricsFilter, MetricsQueryStats, MetricsQuery, MetricsResource } from '../../common.js'
import { operatorValues } from '../../common.js'
import { execMetricsTool } from '../util.js'
import { callToolResult } from '../../../utils/tools.js'



export default function statsTool(resource: MetricsResource, values: {
  fieldValues: Readonly<NonEmptyStringArray>
}): McpServerTool {

  const { fieldValues } = values

  const statsTool: McpServerTool = {
    name: `${resource}-stats`,
    description: `Run the stats function on ${resource}`,
    inputSchema: {
      // accessToken: z.string().describe('Access token to use with the API'),
      payload: z.strictObject({
        field: z.enum(fieldValues).describe('The field you want the metrics or statistics computed on'),
        operator: z.enum(operatorValues).describe('The computing operator')
      }).describe('The body payload to use for the request'),
      filter: z.any().optional().describe('Narrow the results of the query by date or any other parameter available for filtering the selected resource')
    },
    callback: async ({ payload, filter }) => {

      const query: MetricsQuery = {
        stats: payload as MetricsQueryStats,
        filter: filter as MetricsFilter
      }

      return callToolResult(await execMetricsTool('stats', query, resource))

    }
  }

  return statsTool

}
