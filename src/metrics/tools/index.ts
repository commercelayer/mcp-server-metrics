import type { McpServerTool } from '../../server/types.js'
import queriesTools from './resource_queries.js'
import analysisTools from './analysis/index.js'
import useCasesTools from './use_cases/index.js'



export const tools: McpServerTool[] = [
  ...queriesTools,
  ...analysisTools,
  ...useCasesTools
]


export default tools
