import type { MetricsFilter, MetricsOperation, MetricsQuery, MetricsResource } from "../common.js"
import { metricsRequest } from "../request.js"
import type { McpServerToolTextResponse } from "../../server/types.js"
import { getAccessToken } from "../../utils/tools.js"
import { jwtVerify } from "@commercelayer/js-auth"


let currentToken: string = ''


export async function execMetricsTool(operation: MetricsOperation, query: MetricsQuery, resource?: MetricsResource): Promise<McpServerToolTextResponse> {

  let errorMessage = ''

  if (currentToken) await jwtVerify(currentToken).catch(() => { currentToken = '' })
  if (!currentToken) currentToken = await getAccessToken().catch(error => { errorMessage = error.message; return '' })
  const token = currentToken

  if (!token) {
    return {
      content: [
        {
          error: true,
          type: 'text',
          text: `access token is empty or invalid${errorMessage ? ` [${errorMessage}]` : ''}`
        }
      ]
    }
  }


  let contentText: string
  let errorResponse = false

  if (query.filter) query.filter = checkFilter(query.filter)

  try {
    const response: Response = await metricsRequest(String(token), operation, query, resource)
    contentText = JSON.stringify(await response.json())
    if (!response.ok) errorResponse = true
  } catch (error: any) {
    contentText = error.message || String(error)
    errorResponse = true
  }

  if (errorResponse) contentText += `\nQUERY\n${JSON.stringify(query, null, 2)}`


  return {
    content: [
      {
        error: errorResponse,
        type: 'text',
        text: contentText
      }
    ]
  }

}


export function checkFilter(filter: MetricsFilter): MetricsFilter | undefined {
  return (Object.keys(filter).length > 0) ? filter : undefined
}
