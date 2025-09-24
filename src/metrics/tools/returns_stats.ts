import type { McpServerTool } from '../../server/types.js'
import statsTool from './queries/stats.js'



const fieldValues = [
  'customer.email',
  'customer.group_name',
  'customer.id',
  'destination_address.business',
  'destination_address.city',
  'destination_address.country_code',
  'destination_address.geocoded',
  'destination_address.localized',
  'destination_address.state_code',
  'destination_address.zip_code',
  'market.id',
  'market.number',
  'origin_address.business',
  'origin_address.city',
  'origin_address.country_code',
  'origin_address.geocoded',
  'origin_address.localized',
  'origin_address.state_code',
  'origin_address.zip_code',
  'return.id',
  'return.number',
  'return.order_id',
  'return.reference',
  'return.reference_origin',
  'return.skus_count',
  'return.status',
  'return_line_items.line_item_code',
  'return_line_items.line_item_id',
  'return_line_items.line_item_item_type',
  'return_line_items.line_item_tax_amount',
  'return_line_items.line_item_tax_rate',
  'return_line_items.line_item_total_amount',
  'return_line_items.quantity',
  'stock_location.id',
  'stock_location.name',
  'stock_location.reference',
  'stock_location.reference_origin'
] as const



const returnsStats: McpServerTool = statsTool('returns', { fieldValues })


export default returnsStats
