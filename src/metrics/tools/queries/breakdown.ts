import { z } from 'zod'
import type { McpServerTool, NonEmptyStringArray } from '../../../server/types.js'
import type { MetricsFilter, MetricsQueryBreakdown, MetricsQuery, MetricsResource } from '../../common.js'
import { metricsFilter, operatorValues, sortValues } from '../../common.js'
import { execMetricsTool } from '../util.js'
import { callToolResult } from '../../../utils/tools.js'



export default function breakdownTool(resource: MetricsResource, values: {
  byValues: Readonly<NonEmptyStringArray>,
  fieldValues: Readonly<NonEmptyStringArray>
}): McpServerTool {

  const { byValues, fieldValues } = values

  const breakdownTool: McpServerTool = {
    name: `${resource}-breakdown`,
    description: `Run the breakdown function on ${resource}`,
    inputSchema: {
      payload: z.strictObject({
        by: z.enum(byValues).describe('The field you want the results of the query aggragated by'),
        field: z.enum(fieldValues).describe('The field you want the metrics or statistics computed on'),
        operator: z.enum(operatorValues).describe('The computing operator'),
        condition: z.any().optional().describe('An additional constraint to fine-tune the set of records shown in the response, applied to the computed results of the query. It is available for operators that return single numeric (float or integer) values'),
        sort: z.enum(sortValues).optional().describe('The way you want the results of the query to be sorted'),
        limit: z.number().int().min(1).max(100).optional().describe('The maximum number of records shown in the response'),
        breakdown: z.any().optional().describe('The optional nested breakdown')
      }).describe('The body payload to use for the request'),
      filter: metricsFilter(resource)
    },
    callback: async ({ payload, filter }, { authInfo }) => {

      const query: MetricsQuery = {
        breakdown: payload as MetricsQueryBreakdown,
        filter: filter as MetricsFilter
      }

      return callToolResult(await execMetricsTool(authInfo, 'breakdown', query, resource))

    }
  }


  return breakdownTool

}
