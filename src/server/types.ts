import type { ReadResourceCallback, ReadResourceTemplateCallback, ResourceMetadata, ResourceTemplate, ToolCallback } from '@modelcontextprotocol/sdk/server/mcp.js'
import type { Implementation, ServerCapabilities } from '@modelcontextprotocol/sdk/types.js'
import type { ZodRawShape } from 'zod'



type NonEmptyArray<T> = [T, ...T[]]
export type NonEmptyStringArray = NonEmptyArray<string>


export type McpServerConfig = {
  name: string,
  capabilities?: ServerCapabilities
} & Implementation


type McpServerToolType<InputArgs extends ZodRawShape, OutputArgs extends ZodRawShape> = {
  name: string,
  title?: string
  description: string,
  inputSchema: InputArgs,
  outputSchema?: OutputArgs,
  callback: ToolCallback<InputArgs>
}

export type McpServerTool = McpServerToolType<ZodRawShape, ZodRawShape>


export type McpServerToolTextResponse = {
  content: Array<{
    error: boolean
    type: 'text',
    text: string
  }>,
  structuredContent?: Record<string, any>
}


export type ResourceDocumentation = {
  name: string,
  uri: string
}


export type McpServerResourceStatic = {
  name: string,
  uri: string,
  metadata?: ResourceMetadata,
  readCallback: ReadResourceCallback
}


export type McpServerResourceDynamic = {
  name: string,
  template: ResourceTemplate,
  metadata?: ResourceMetadata,
  readCallback: ReadResourceTemplateCallback
}


export type McpServerResource = McpServerResourceStatic | McpServerResourceDynamic
