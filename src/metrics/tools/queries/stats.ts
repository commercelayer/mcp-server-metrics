import { z } from 'zod'
import type { McpServerTool, NonEmptyStringArray } from '../../../server/types.js'
import type { MetricsFilter, MetricsQueryStats, MetricsQuery, MetricsResource } from '../../common.js'
import { metricsFilter, operatorValues } from '../../common.js'
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
      payload: z.strictObject({
        field: z.enum(fieldValues).describe(`The field you want the metrics or statistics computed on. Possible values are: ${fieldValues.join(', ')}`),
        operator: z.enum(operatorValues).describe(`The computing operator. Possible values are: ${operatorValues.join(', ')}`)
      }).describe('The body payload to use for the request'),
      filter: metricsFilter(resource)
    },
    callback: async ({ payload, filter }, { authInfo }) => {

      const query: MetricsQuery = {
        stats: payload as MetricsQueryStats,
        filter: filter as MetricsFilter
      }

      return callToolResult(await execMetricsTool(authInfo, 'stats', query, resource))

    }
  }

  return statsTool

}
