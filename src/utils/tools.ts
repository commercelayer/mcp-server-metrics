import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js"
import type { McpServerToolTextResponse } from "../server/types.js"
import { authenticate } from "@commercelayer/js-auth"



export function callToolResult(response: McpServerToolTextResponse | CallToolResult): CallToolResult {
  const result: CallToolResult = response
  if (!Object.hasOwn(result, 'isError')) result.isError = response.content.some(c => c.error)
  return result
}


export async function getAccessToken(): Promise<string> {

  const clientId = process.env.CL_CLIENT_ID
  const clientSecret = process.env.CL_CLIENT_SECRET

  if (clientId && clientSecret) {
    const domain = process.env.CL_DOMAIN
    const auth = await authenticate('client_credentials', { clientId, clientSecret, domain })
    return auth.accessToken
  }
  else throw new Error('Empty env clientId or clientSecret')

}


export async function getSalesChannelAccessToken(): Promise<string> {

  const clientId = process.env.MCPC_CL_CLIENT_ID
  const scope = process.env.MCPC_CL_SCOPE

  if (clientId && scope) {
    const auth = await authenticate('client_credentials', { clientId, scope })
    return auth.accessToken
  }
  else throw new Error('Empty env clientId or scope')

}
