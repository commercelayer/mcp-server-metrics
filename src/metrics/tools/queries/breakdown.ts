import { z, ZodRawShape } from 'zod'
import type { McpServerTool, NonEmptyStringArray } from '../../../server/types.js'
import type { MetricsFilter, MetricsQueryBreakdown, MetricsQuery, MetricsResource } from '../../common.js'
import { operatorValues, sortValues } from '../../common.js'
import { execMetricsTool } from '../util.js'
import { callToolResult } from '../../../utils/tools.js'
import inflector from '../../../utils/inflector.js'
import { ZodObject } from 'zod/v4'

const resourceFields = ['order', 'return', 'cart'] as const
type FilterResourceField = typeof resourceFields[number]

const resourceDates: Record<FilterResourceField, string[]> = {
  order: ['approved_at', 'cancelled_at', 'created_at', 'placed_at', 'archived_at', 'updated_at', 'fulfillment_updated_at', 'payment_updated_at'],
  return: ['approved_at', 'archived_at', 'cancelled_at', 'created_at', 'received_at', 'rejected_at', 'shipped_at', 'updated_at', 'restocked_at'],
  cart: ['created_at', 'updated_at']
}


const metricsDateFilter = (resourceField: FilterResourceField): ZodRawShape => {
  const dateFilter = {
    [resourceField]: z.object({
      date_from: z.string().optional().describe(
        `The lower limit of the date and time range used to filter the collected records (required if you specified date_to).
        Format: YYYY-MM-DDTHH:MM:SSZ (ISO 8601) (e.g.: 2022-07-06T21:41:03Z)
        Default value: 30 days before the current day, beginning of day (e.g. 2021-08-19T00:00:00Z)
        Limits: must be before date_to and no more than 365 days before date_to`),
      date_to: z.string().optional().describe(
        `The upper limit of the date and time range used to filter the collected records (required if you specified date_from).
        Format: YYYY-MM-DDTHH:MM:SSZ (ISO 8601) (e.g.: 2022-07-06T21:41:03Z)
        Default value: the current day, end of day (e.g. 2022-09-19T23:59:59Z)
        Limits: must be after date_from and no more than 365 days after date_from`),
      date_field: z.enum(['current_date', ...resourceDates[resourceField]]).optional().describe(
        `The date field where to apply the date and time range filter.
        Default value: current_date
        Limits: the available values for this key depend on the resource you're doing statistics on (see orders, returns, or carts for the related lists)`)
    })
  }

    const dfo = z.object(dateFilter)
  type DFO = z.infer<typeof dfo>

  return dateFilter

}


const metricsFilter = (resource: MetricsResource) => {
  const dateFilter = metricsDateFilter(inflector.singularize(resource) as FilterResourceField)
  return z.object(dateFilter).extend({}).optional().describe(`Narrow the results of the query by date or any other parameter available for filtering ${resource}`)
}




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
