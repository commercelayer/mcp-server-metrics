import { z } from 'zod'
import type { McpServerTool, NonEmptyStringArray } from '../../../server/types.js'
import type { MetricsFilter, MetricsQueryDateBreakdown, MetricsQuery, MetricsResource } from '../../common.js'
import { intervalValues, metricsFilter, operatorValues } from '../../common.js'
import { execMetricsTool } from '../util.js'
import { callToolResult } from '../../../utils/tools.js'



export default function dateBreakdownTool(resource: MetricsResource, values: {
  byValues: Readonly<NonEmptyStringArray>,
  fieldValues: Readonly<NonEmptyStringArray>
}): McpServerTool {

  const { byValues, fieldValues } = values

  const dateBreakdownTool: McpServerTool = {
    name: `${resource}-date-breakdown`,
    description: `Run the date-breakdown function on ${resource}`,
    inputSchema: {
        payload: z.strictObject({
        by: z.enum(byValues).describe('The field you want the results of the query aggragated by'),
        field: z.enum(fieldValues).describe('The field you want the metrics or statistics computed on'),
        operator: z.enum(operatorValues).describe('The computing operator'),
        interval: z.enum(intervalValues).optional().describe('The time interval over which the metrics / stats are computed. The results will be aggregated by date accordingly'),
      }).describe('The body payload to use for the request'),
      filter: metricsFilter(resource)
    },
    callback: async ({ payload, filter }, { authInfo }) => {

      const query: MetricsQuery = {
        date_breakdown: payload as MetricsQueryDateBreakdown,
        filter: filter as MetricsFilter
      }

      return callToolResult(await execMetricsTool(authInfo, 'date_breakdown', query, resource))

    }
  }


  return dateBreakdownTool

}
