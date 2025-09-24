import type { NonEmptyStringArray } from "../server/types.js"


// Operations
const operationList = ['search', 'stats', 'breakdown', 'date_breakdown', 'fbt'] as const
export type MetricsOperation = typeof operationList[number]

export function isAnalysisOperation(operation: MetricsOperation): boolean{
  return ['fbt'].includes(operation)
}


// Resources
const resourceValues = ['orders', 'returns', 'carts'] as const
export type MetricsResource = typeof resourceValues[number]


// Intervals
export const intervalValues = ['hour', 'day', 'week', 'month', 'year'] as const
export type MetricsInterval = typeof intervalValues[number]


// Operators
export const operatorMap = {
  avg: { type: 'Float', description: 'A single-value metrics aggregation that computes the average of numeric values extracted from specific numeric fields of the aggregated records' },
  cardinality: { type: 'Integer', description: 'A single-value metrics aggregation that calculates an approximate count of distinct values' },
  max: { type: 'Float', description: 'A single-value metrics aggregation that keeps track and returns the maximum value among the numeric values extracted from specific numeric fields of the aggregated records' },
  min: { type: 'Float', description: 'A single-value metrics aggregation that keeps track and returns the minimum value among the numeric values extracted from specific numeric fields of the aggregated records' },
  percentiles: { type: 'Float', description: 'A multi-value metrics aggregation that calculates one or more percentiles (i.e. the point at which a certain percentage of observed values occurs) over numeric values extracted from specific numeric fields of the aggregated records' },
  stats: { type: 'Object', description: 'A multi-value metrics aggregation that computes stats over numeric values extracted from specific numeric fields of the aggregated records. The stats that are returned consist of: count, min, max, avg, and sum' },
  sum: { type: 'Float', description: 'A single-value metrics aggregation that sums up numeric values extracted from specific numeric fields of the aggregated records' },
  value_count: { type: 'Integer', description: 'A single-value metrics aggregation that counts the number of values extracted from specific fields of the aggregated records' }
} as const
export type MetricsOperator = keyof typeof operatorMap
export const operatorValues = Object.keys(operatorMap) as NonEmptyStringArray


// Conditions
const conditionValues = ['eq', 'ne', 'gt', 'gte', 'lt', 'lte', 'gt_lt', 'gte_lte', 'gte_lt', 'gt_lte'] as const
export type MetricsConditionKey = typeof conditionValues[number]
export type MetricsCondition = { [key in MetricsConditionKey]?: (number | [number, number]) }

// Sorts

export const sortValues = ['asc', 'desc'] as const
export type MetricsSort = typeof sortValues[number]



export type MetricsQuerySearch = {
  limit?: number
  sort?: MetricsSort
  sort_by?: string
  fields: string[]
  cursor?: string
}


export type MetricsQueryStats = {
  field: string
  operator: MetricsOperator
}


export type MetricsQueryBreakdown = {
  by: string
  field: string
  operator: MetricsOperator
  condition?: MetricsCondition
  sort?: MetricsSort
  limit?: number
  breakdown?: MetricsQueryBreakdown
}


export type MetricsQueryBreakdownResponse = {
  label: string,
  value: string | number,
} & { key?: MetricsQueryBreakdown }


export type MetricsQueryDateBreakdown = {
  by: string
  field: string
  operator: MetricsOperator
  interval?: MetricsInterval
  breakdown?: MetricsQueryBreakdown
}


export type MetricsQueryDateBreakdownResponse = {
  date: string,
  value: any
} & { key?: MetricsQueryBreakdown }


export type MetricsFilter = Record<string, any>


export type MetricsFilterFbt = MetricsFilter & {
  line_items: {
    item_ids: {
      in: string[]
    }
  }
}
export type MetricsQueryFbt = {
  filter: MetricsFilterFbt
}


export type MetricsQuery = (({
  search: MetricsQuerySearch
} | {
  stats: MetricsQueryStats
} | {
  breakdown: MetricsQueryBreakdown
} | {
  date_breakdown: MetricsQueryDateBreakdown
}) & {
  filter?: MetricsFilter
}) | MetricsQueryFbt
