import { authenticate } from '@commercelayer/js-auth'
import assert from "node:assert"
import type { McpServerTool, McpServerToolTextResponse } from "../src/types"
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js"

import dotenv from 'dotenv'
import { TestContext } from 'node:test'
dotenv.config()



function isTextContent(result: CallToolResult): result is McpServerToolTextResponse {
  return (result.content !== undefined) && (result.content[0].type === 'text') && (typeof result.content[0].text === 'string')
}


export function checkTestResult(result: CallToolResult): void {
  if (isTextContent(result)) {
    const textContent = result.content[0]
    if (textContent.error) console.log(textContent.text)
    assert.ok(!textContent.error, 'Response should not contain an error')
    assert.ok(textContent.text?.length > 0, 'Response should contain text')
  } else assert.fail('Response should contain text content')
}


export async function getAccessToken(): Promise<string> {

  let accessToken = process.env.CL_ACCESS_TOKEN

  if (!accessToken) {

    const clientId = process.env.CL_CLIENT_ID
    const clientSecret = process.env.CL_CLIENT_SECRET

    if (!clientId) throw new Error('No client_id provided')
    if (!clientSecret) throw new Error('No client_secret provided')

    const auth = await authenticate('client_credentials', {
      clientId,
      clientSecret,
      domain: process.env.CL_DOMAIN
    })
    .then(a => {
      console.log('Got new Commerce Layer access token')
      return a
    })
    .catch(error => {
      console.log(error.message || error)
      accessToken = undefined
  })

    accessToken = auth?.accessToken

  }

  if (!accessToken) throw new Error('No access token provided or unable to get new access token')

  return accessToken

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


export function skipToolTest(tool: McpServerTool, test: TestContext) {
  test.skip(`No test data available for tool: ${tool.name}`)
}
