
import type { McpServerTool } from '../../../server/types.js'
import bestSellingProductsByMarket from './best_selling_products_by_market.js'
import customersThatBoughtASpecificProduct from './customers_that_bought_a_specific_product.js'
import frequentlyBoughtTogetherProducts from './frequently_bought_together_products.js'
import lastCartsWithASpecificProductFromASpecificMarket from './last_carts_with_a_specific_product_from_a_specific_market.js'
import latestArchivedOrders from './latest_archived_orders.js'
import latestPlacedOrdersFromCustomersWithSpecificEmailDomains from './latest_placed_orders_from_customers_with_specific_email_domains.js'
import numberOfProductsPerOrderByCountry from './number_of_products_per_order_by_country.js'
import ordersAssociatedWithASpecificPromotion from './orders_associated_with_a_specific_promotion.js'
import ordersByBundle from './orders_by_bundle.js'
import ordersByCurrency from './orders_by_currency.js'
import ordersByDay from './orders_by_day.js'
import ordersByRepeatCustomer from './orders_by_repeat_customer.js'
import ordersByResourceErrorCodeAndMessage from './orders_by_resource_error_code_and_message.js'
import ordersByShipmentStatusAndShippingMethodName from './orders_by_shipment_status_and_shipping_method_name.js'
import ordersByStatusAndPaymentStatus from './orders_by_status_and_payment_status.js'
import ordersPaidWithGiftCards from './orders_paid_with_gift_cards.js'
import refundsByCountryAndCurrency from './refunds_by_country_and_currency.js'
import returnsPerYearByDestinationCity from './returns_per_year_by_destination_city.js'
import shipmentsAverageTimeInPicking from './shipments_average_time_in_picking.js'
import top10SpendersByCurrency from './top_10_spenders_by_currency.js'



const useCasesTools: McpServerTool[] = [
  bestSellingProductsByMarket,
  customersThatBoughtASpecificProduct,
  frequentlyBoughtTogetherProducts,
  lastCartsWithASpecificProductFromASpecificMarket,
  latestArchivedOrders,
  latestPlacedOrdersFromCustomersWithSpecificEmailDomains,
  numberOfProductsPerOrderByCountry,
  ordersAssociatedWithASpecificPromotion,
  ordersByBundle,
  ordersByCurrency,
  ordersByDay,
  ordersByRepeatCustomer,
  ordersByResourceErrorCodeAndMessage,
  ordersByShipmentStatusAndShippingMethodName,
  ordersByStatusAndPaymentStatus,
  ordersPaidWithGiftCards,
  refundsByCountryAndCurrency,
  returnsPerYearByDestinationCity,
  shipmentsAverageTimeInPicking,
  top10SpendersByCurrency
]


export default useCasesTools
