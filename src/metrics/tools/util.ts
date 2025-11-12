import type { MetricsFilter, MetricsOperation, MetricsQuery, MetricsResource } from "../common.js"
import { metricsRequest } from "../request.js"
import type { McpServerToolTextResponse } from "../../server/types.js"
import { errorTextResponse, getAccessToken, mcpError } from "../../utils/tools.js"
import { jwtVerify } from "@commercelayer/js-auth"
import type { AuthInfo } from "@modelcontextprotocol/sdk/server/auth/types.js"



let currentToken: string = ''


export async function execMetricsTool(authInfo: AuthInfo | undefined, operation: MetricsOperation, query: MetricsQuery, resource?: MetricsResource): Promise<McpServerToolTextResponse> {

  let accessToken: string

  try {

    if (authInfo?.token) {  // If authInfo is provided, use its token
      accessToken = authInfo.token
      await jwtVerify(accessToken).catch( () => { mcpError('invalid access token') })
      currentToken = '' // Reset currentToken to force re-fetching next time
    } else {
      accessToken = currentToken
      if (accessToken) await jwtVerify(accessToken).catch( () => { mcpError('invalid access token') })  // Verify current token
      else { // Get a new token if none is stored
        accessToken = await getAccessToken().catch( () => { mcpError('error getting new access token') })
        currentToken = accessToken  // Store the new token for future use
      }
    }

  } catch (error: any) {
    return errorTextResponse(error.message as string)
  }


  const token = accessToken
  if (!token) return errorTextResponse('access token is empty or invalid')


  let contentText: string
  let errorResponse = false

  if (query.filter) query.filter = checkFilter(query.filter)

  try {
    const response: Response = await metricsRequest(token, operation, query, resource)
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
