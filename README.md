# Commerce Layer Metrics MCP Server

This repository provides a local MCP Server implementation with a suite of metrics tools for Commerce Layer data analysis.

---

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Tools](#tools)
- [References](#references)

---

## Overview

The Metrics Local MCP Server exposes a set of tools to interact with Commerce Layer [Metrics API](https://docs.commercelayer.io/metrics) and enables you to extract almost any kind of data information from your organization order, return, or cart history.

---

## Installation

#### From GIT repository

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-org/mcp-server-metrics.git
   cd mcp-server-metrics
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Build the project:**
   ```bash
   pnpm build
   ```

4. **Create the server:**
   ```bash
   pnpm dist
   ```
   The compiled files will be available in the `dist/` directory and can be used to setup the MCP local server in the preferred AI agent ([Claude Dekstop](https://modelcontextprotocol.io/docs/develop/connect-local-servers), OpenAI Chat-GPT ...).

#### As Claude Desktop extension

Claude Dekstop makes now easy the installation of custom MCP local servers both as a prebuilt bundles or an unpacked extensions.
[Here](https://support.claude.com/en/articles/10949351-getting-started-with-local-mcp-servers-on-claude-desktop) you can find the instructions from the Anthropic's support to perform the installation.

Follow the steps as for installing from a GIT repository and then:

5. **Create the extension bundle:**
   ```bash
   npm run mcpb
   ```

6. **Install the extension:**
Upload the packed extension taking the bundle from `mcpb/commercelayer-metrics.mcpb`

When requested insert *client_id* and *client_secret* to connect to your Commerce Layer's organization.

---

## Tools

#### Queries
These tools let you retrieve metric data and statistics about *orders*, *carts* and *returns* through four types of queries:

1. **Breakdown**

- *orders-breakdown*
- *carts-breakdown*
- *returns-breakdown*

Breakdowns are aggregations that summarize your data as metrics (based on specific operators) or statistics, computed on field values. When performing a breakdown query on the Metrics API endpoint you get in the response the value of the computation (based on the selected operator) on the selected field, aggregated by another field.

2. **Date breakdown**

- *orders-date-breakdown*
- *carts-date-breakdown*
- *returns-date-breakdown*

Date breakdowns are aggregations that show the frequency of occurrence of a specific date value within a dataset and let you apply a specific operator over a selected field of the records that are present on that date. When performing a date breakdown query on the Metrics API endpoint you get in the response the list by date of the values of the computation (based on the selected operator) on the selected field, over the selected time interval, aggregated by another field.

3. **Stats**

- *orders-stats*
- *carts-stats*
- *r*eturns-stats*

Stats are numeric computations (based on specific operators) calculated over values extracted from a specific field of the selected resource. When performing a stats query on the Metrics API endpoint you get in the response the value of the computation (based on the selected operator) on the selected field.

4. **Search**

- *orders-search*
- *carts-search*
- *returns-search*

Searches are a type of query a bit different from the other ones (breakdowns, date breakdowns, and stats). A search is not an aggregation and doesn't involve any computation based on operators, but an actual search. When performing a search query on the Metrics API endpoint you get in the response the list of the requested fields (sorted, filtered, and paginated) of the actual records that match the query.

#### Use cases
Commerce Layer Metrics API lets you extract and aggregate relevant metric data from your organizations. Combining the 4 available types of queries (breakdown, date breakdown, stats, and search) on the 3 available resources (orders, returns, and carts) and adding the appropriate filters lets you cover a wide range of use cases that can fit your business needs. 

This is a list of tools that cover the most common application scenarios of Commerce Layer Metrics API:

- *best-selling-products-by-market*
get the Top N best-selling products for each of your organization's market
- *customers-that-bought-a-specific-product*
get the total number of customers that bought a specific product or bundle
- *frequently-bought-together-products*
get the products that have been most frequently bought together with other ones
- *last-carts-with-a-specific-product-from-a-specific-market*
get the most recently created carts containing a specific SKU, from a specific market
- *latest-archived-orders*
get the most recently archived orders
- *latest-placed-orders-from-customers-with-specific-email-domains*
get the last placed orders containing specific email domains in the aggregated details
- *number-of-products-per-order-by-country*
get mixed stats about the number of SKUs included in the orders of your organization, grouped by different countries
- *orders-associated-with-a-specific-promotion*
get the total number of orders that triggered a specific promotion
- *orders-by-bundle*
get the total number of orders containing a bundle, grouped by the bundle name
- *orders-by-currency*
get the total number of orders of your organization, grouped by different currencies
- *orders-by-day*
get the total number of orders of your organization, grouped by day
- *orders-by-repeat-customer*
get the total number of orders of your organization, grouped by customers that bought from you more than once
- *orders-by-resource-error-code-and-message*
check the errors associated with the orders of your organization (if any)
- *orders-by-shipment-status-and-shipping-method-name*
get the total number of orders of your organization, grouped by the associated shipment status and the related shipping method name
- *orders-by-status-and-payment-status*
get the total number of orders of your organization, grouped by their status and the related payment status
- *orders-paid-with-gift-cards*
get the total number of orders that were paid using a gift card
- *refunds-by-country-and-currency*
get the total number of refunds of your organization, grouped by the different countries and currencies
- *returns-per-year-by-destination-city*
get the total number of returns requested for your orders, grouped by year and destination city
- *shipments-average-time-in-picking*
get the average time your shipments stay in picking status before being packed
- *top-10-spenders-by-currency*
get the top spenders among your customers and know how their total purchase amount is divided by currency

#### Analysis
All the available Commerce Layer Metrics API helper endpoints.

- *FBT*
Also known as Frequently Bought Together, FBTs are a type of analysis query that, based on your entire order history, allows you to retrieve the items that most frequently have been added as line items in the same orders as a specified item (SKU or bundle) or array of items.


---

## References

- [Commerce Layer Metrics](https://docs.commercelayer.io/metrics)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Claude Desktop](https://claude.ai/download)
