import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { McpServerBase } from './server.js'
import type { McpServerConfig } from './types.js'



export class McpLocalServer extends McpServerBase {

  constructor(config?: McpServerConfig) {
    super({
      name: config?.name || 'mcp-local-server',
      version: config?.version || '1.0.0',
      title: config?.title || 'MCP Local Server',
      capabilities: config?.capabilities
    })
  }

  

  public async start(): Promise<void> {
    const transport = new StdioServerTransport()
    await this.server.connect(transport)
  }

}
