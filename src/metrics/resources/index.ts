import type { McpServerResource, ResourceDocumentation } from '../../server/types.js'
import { createServerToolStaticResource } from '../../utils/resources.js'



// Orders
const ordersResources: ResourceDocumentation[] = [
  { name: 'orders-breakdown', uri: 'resource://metrics/orders/breakdown.md' },
  { name: 'orders-date_breakdown', uri: 'resource://metrics/orders/date-breakdown.md' },
  { name: 'orders-filters', uri: 'resource://metrics/orders/filters.md' },
  { name: 'orders-search', uri: 'resource://metrics/orders/search.md' },
  { name: 'orders-stats', uri: 'resource://metrics/orders/stats.md' }
]


// Carts
const cartsResources: ResourceDocumentation[] = [
  { name: 'carts-breakdown', uri: 'resource://metrics/carts/breakdown.md' },
  { name: 'carts-date-breakdown', uri: 'resource://metrics/carts/date-breakdown.md' },
  { name: 'carts-filters', uri: 'resource://metrics/carts/filters.md' },
  { name: 'carts-search', uri: 'resource://metrics/carts/search.md' },
  { name: 'carts-stats', uri: 'resource://metrics/carts/stats.md' }
]


// Returns
const returnsResources: ResourceDocumentation[] = [
  { name: 'returns-breakdown', uri: 'resource://metrics/returns/breakdown.md' },
  { name: 'returns-date-breakdown', uri: 'resource://metrics/returns/date-breakdown.md' },
  { name: 'returns-filters', uri: 'resource://metrics/returns/filters.md' },
  { name: 'returns-search', uri: 'resource://metrics/returns/search.md' },
  { name: 'returns-stats', uri: 'resource://metrics/returns/stats.md' }
]


// Analysis
const analysisResources: ResourceDocumentation[] = [
  { name: 'fbt', uri: 'guide://metrics/analysis/fbt.md' }
]


// Use Cases
const useCasesResources: ResourceDocumentation[] = [
  { name: 'best-selling-products-by-market', uri: 'guide://metrics/use-cases/best-selling-products-by-market.md' },
  { name: 'customers-that-bought-a-specific-product', uri: 'guide://metrics/use-cases/customers-that-bought-a-specific-product.md' },
  { name: 'frequently-bought-together-products', uri: 'guide://metrics/use-cases/frequently-bought-together-products.md' },
  { name: 'last-carts-with-a-specific-product-from-a-specific-market', uri: 'guide://metrics/use-cases/last-carts-with-a-specific-product-from-a-specific-market.md' },
  { name: 'latest-archived-orders', uri: 'guide://metrics/use-cases/latest-archived-orders.md' },
  { name: 'latest-placed-orders-from-customers-with-specific-email-domains', uri: 'guide://metrics/use-cases/latest-placed-orders-from-customers-with-specific-email-domains.md' },
  { name: 'number-of-products-per-order-by-country', uri: 'guide://metrics/use-cases/number-of-products-per-order-by-country.md' },
  { name: 'orders-associated-with-a-specific-promotion', uri: 'guide://metrics/use-cases/orders-associated-with-a-specific-promotion.md' },
  { name: 'orders-by-bundle', uri: 'guide://metrics/use-cases/orders-by-bundle.md' },
  { name: 'orders-by-currency', uri: 'guide://metrics/use-cases/orders-by-currency.md' },
  { name: 'orders-by-day', uri: 'guide://metrics/use-cases/orders-by-day.md' },
  { name: 'orders-by-repeat-customer', uri: 'guide://metrics/use-cases/orders-by-repeat-customer.md' },
  { name: 'orders-by-resource-error-code-and-message', uri: 'guide://metrics/use-cases/orders-by-resource-error-code-and-message.md' },
  { name: 'orders-by-shipment-status-and-shipping-method-name', uri: 'guide://metrics/use-cases/orders-by-shipment-status-and-shipping-method-name.md' },
  { name: 'orders-by-status-and-payment-status', uri: 'guide://metrics/use-cases/orders-by-status-and-payment-status.md' },
  { name: 'orders-paid-with-gift-cards', uri: 'guide://metrics/use-cases/orders-paid-with-gift-cards.md' },
  { name: 'refunds-by-country-and-currency', uri: 'guide://metrics/use-cases/refunds-by-country-and-currency.md' },
  { name: 'returns-per-year-by-destination-city', uri: 'guide://metrics/use-cases/returns-per-year-by-destination-city.md' },
  { name: 'shipments-average-time-in-picking', uri: 'guide://metrics/use-cases/shipments-average-time-in-picking.md' },
  { name: 'top-10-spenders-by-currency', uri: 'guide://metrics/use-cases/top-10-spenders-by-currency.md' }
]



export const resources: McpServerResource[] = [
  ...ordersResources.map(createServerToolStaticResource),
  ...cartsResources.map(createServerToolStaticResource),
  ...returnsResources.map(createServerToolStaticResource),
  ...analysisResources.map(createServerToolStaticResource),
  ...useCasesResources.map(createServerToolStaticResource)
]

export default resources
