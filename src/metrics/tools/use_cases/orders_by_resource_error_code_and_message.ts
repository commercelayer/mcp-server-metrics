import { z } from 'zod'
import type { McpServerTool } from '../../../server/types.js'
import type { MetricsFilter, MetricsQuery, MetricsQueryBreakdown } from '../../common.js'
import { checkFilter, execMetricsTool } from '../util.js'
import { callToolResult } from '../../../utils/tools.js'



function buildQuery(payload?: any, filter?: any): MetricsQuery {

  const queryBreakdown: MetricsQueryBreakdown = {
    by: 'resource_errors.code',
    field: 'order.id',
    operator: 'value_count',
    limit: 100,
    breakdown: {
      by: 'resource_errors.message',
      field: 'order.id',
      operator: 'value_count',
      limit: payload?.limit || 10,
    }
  }


  const filterBreakdown: MetricsFilter = {}

  if (filter) {

    if (filter.date_from || filter.date_to) {
      filterBreakdown.order = {
        date_from: filter.date_from,
        date_to: filter.date_to,
        date_field: 'created_at'
      }
    }

    if (filter.error_codes?.length > 0) {
      filterBreakdown.resource_errors = {
        codes: {
          in: filter.error_codes
        }
      }
    }

  }


  const query: MetricsQuery = {
    breakdown: queryBreakdown,
    filter: checkFilter(filterBreakdown)
  }

  return query

}


const useCaseTool: McpServerTool = {
  name: 'orders-by-resource-error-code-and-message',
  description: 'How to use the Metrics API to check the errors associated with the orders of your organization (if any)',
  inputSchema: {
    payload: z.strictObject({
      limit: z.number().int().min(1).max(20).optional().describe('The maximum number of records shown in the response (1-20)')
    }).optional().describe('The body payload to use for the request'),
    filter: z.strictObject({
      date_from: z.string().datetime().optional().describe('The lower limit of the date and time range used to filter the collected records (required if you specified date_to)'),
      date_to: z.string().datetime().optional().describe('The upper limit of the date and time range used to filter the collected records (required if you specified date_from)'),
      error_codes: z.array(z.string()).optional().describe('Narrow the response to inspect some specific error codes only'),
    }).optional().describe('Narrow the results of the query by date or any other parameter available for filtering the selected resource')
  },
  callback: async ({ payload, filter }, { authInfo }) => {
    const query = buildQuery(payload, filter)
    return callToolResult(await execMetricsTool(authInfo, 'breakdown', query, 'orders'))
  }
}


export default useCaseTool
