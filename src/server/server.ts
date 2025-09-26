import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import type { McpServerConfig, McpServerResource, McpServerTool } from './types.js'
import { isDynamicResource, isStaticResource } from '../utils/resources.js'



export abstract class McpServerBase extends McpServer {

  protected readonly config: McpServerConfig


  constructor(config: McpServerConfig) {

    super({
      name: config?.name,
      version: config?.version,
      title: config?.title
    }, {
      capabilities: config?.capabilities
    })

    this.config = config

  }



  public registerTools(tools: McpServerTool[]): void {

    if (tools.length > 0) {
      for (const tool of tools) {
        this.registerTool(
          tool.name, {
          title: tool.title,
          description: tool.description,
          inputSchema: tool.inputSchema,
          annotations: {
            title: tool.title,
            readOnlyHint: tool.readonly,
            idempotentHint: tool.readonly
          }
        },
          tool.callback
        )
        /*
         server.tool(
           tool.name,
           tool.description,
           tool.inputSchema,
           tool.callback
         )
        */
      }
    }

  }


  public registerResources(resources: McpServerResource[]): void {

    if (resources.length > 0) {
      for (const resource of resources) {

        // let type: 'static' | 'dynamic'

        if (isStaticResource(resource)) {
          // type = 'static'
          this.registerResource(resource.name, resource.uri, resource.metadata ?? {}, resource.readCallback)
          /*
          if (resource.metadata) this.resource(resource.name, resource.uri, resource.metadata, resource.readCallback)
          else this.resource(resource.name, resource.uri, resource.readCallback)
          */
        }
        else
          if (isDynamicResource(resource)) {
            // type = 'dynamic'
            this.registerResource(resource.name, resource.template, resource.metadata ?? {}, resource.readCallback)
            /*
            if (resource.metadata) this.resource(resource.name, resource.template, resource.metadata, resource.readCallback)
            else this.resource(resource.name, resource.template, resource.readCallback)
            */
          }

      }

    }

  }

}
