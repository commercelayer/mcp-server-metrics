import { tools } from './tools/index.js'
import { resources } from './resources/index.js'
import { McpLocalServer } from '../server/local.js'
import pkg from '../../package.json' with { type: 'json' }



export function startMetricsMCPServer(): void {

  const server = new McpLocalServer({
    name: 'commercelayer-metrics',
    version: pkg.version,
    title: pkg.description
  })


  // Register tools
  server.registerTools(tools)


  // Register resources
  server.registerResources(resources)


  // Register prompts
  // **********
  // **********



  // ---------- --------- ---------- ----------



  void server.start().catch((error) => {
    console.error('Fatal error during server start:', error)
    process.exit(1)
  })

}
