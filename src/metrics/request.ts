import { getCoreApiBaseEndpoint } from '@commercelayer/js-auth'
import { isAnalysisOperation, type MetricsOperation, type MetricsResource } from './common.js'


export async function metricsRequest(accessToken: string, operation: MetricsOperation, query: any, resource?: MetricsResource): Promise<Response> {

  const baseUrl = getCoreApiBaseEndpoint(accessToken, { shouldThrow: true})

  const analysisPath = isAnalysisOperation(operation)? 'analysis/' : ''
  const resourcePath = resource? `${resource}/` : ''
  const endpoint = `${baseUrl}/metrics/${resourcePath}${analysisPath}${operation}`

  const body = JSON.stringify(query)


  const headers = {
    'Accept': 'application/vnd.api.v1+json',
    'Content-Type': 'application/vnd.api+json',
    'Authorization': `Bearer ${accessToken}`
  }

  const response = fetch(endpoint, {
    method: 'POST',
    headers,
    body
  })

  return await response

}
