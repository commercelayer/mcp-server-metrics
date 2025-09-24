import type { McpServerTool } from '../../server/types.js'
import ordersBreakdown from './orders_breakdown.js'
import ordersDateBreakdown from './orders_date_breakdown.js'
import ordersSearch from './orders_search.js'
import ordersStats from './orders_stats.js'
import cartsBreakdown from './carts_breakdown.js'
import cartsDateBreakdown from './carts_date_breakdown.js'
import cartsSearch from './carts_search.js'
import cartsStats from './carts_stats.js'
import returnsBreakdown from './returns_breakdown.js'
import returnsDateBreakdown from './returns_date_breakdown.js'
import returnsSearch from './returns_search.js'
import returnsStats from './returns_stats.js'



export const queriesTools: McpServerTool[] = [
   // Orders Tools
  ordersBreakdown,
  ordersDateBreakdown,
  ordersSearch,
  ordersStats,
  // Carts Tools
  cartsBreakdown,
  cartsDateBreakdown,
  cartsSearch,
  cartsStats,
  // Returns Tools
  returnsBreakdown,
  returnsDateBreakdown,
  returnsSearch,
  returnsStats,
]



export default queriesTools
