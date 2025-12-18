import type { McpServerTool } from '../../server/types.js'
import statsTool from './queries/stats.js'



const fieldValues = [
  'customer.email',
  'customer.group_name',
  'customer.id',
  'line_items.code',
  'line_items.discount',
  'line_items.id',
  'line_items.item_id',
  'line_items.options.id',
  'line_items.options.quantity',
  'line_items.options.total_amount',
  'line_items.options.unit_amount',
  'line_items.options_amount',
  'line_items.quantity',
  'line_items.tax_amount',
  'line_items.tax_rate',
  'line_items.total_amount',
  'line_items.unit_amount',
  'market.id',
  'market.number',
  'order.adjustment_amount',
  'order.adjustment_tax_amount',
  'order.adjustment_taxable_amount',
  'order.discount_amount',
  'order.duty_amount',
  'order.gift_card_amount',
  'order.gift_card_code',
  'order.id',
  'order.line_item_options_count',
  'order.number',
  'order.payment_method_amount',
  'order.payment_method_tax_amount',
  'order.payment_method_taxable_amount',
  'order.reference',
  'order.reference_origin',
  'order.shipments_count',
  'order.shipping_amount',
  'order.shipping_taxable_amount',
  'order.skus_count',
  'order.subtotal_amount',
  'order.subtotal_tax_amount',
  'order.subtotal_taxable_amount',
  'order.total_amount',
  'order.total_amount_with_taxes',
  'order.total_tax_amount',
  'order.total_taxable_amount',
  'resource_errors.code',
  'resource_errors.id',
  'resource_errors.message'
] as const



const cartsStats: McpServerTool = statsTool('carts', { fieldValues })


export default cartsStats
