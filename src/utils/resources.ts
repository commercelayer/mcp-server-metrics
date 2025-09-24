import { readFileSync } from "node:fs"
import type { McpServerResource, McpServerResourceDynamic, McpServerResourceStatic, ResourceDocumentation } from "../server/types.js"
import { resolve } from "node:path"



export function isStaticResource(resource: McpServerResource): resource is McpServerResourceStatic {
  return Object.hasOwn(resource, 'uri')
}


export function isDynamicResource(resource: McpServerResource): resource is McpServerResourceDynamic {
  return Object.hasOwn(resource, 'template')
}



function localDocumentPath(uri: URL): string {

  const docType = uri.protocol.slice(0, -1) // guide / resource

  const api = uri.hostname  // metrics / core
  const [resType, docName] = uri.pathname.substring(1).split('/')

  let path: string

  switch (docType) {
    case 'resource': {
      path = `${resType}_${docName}`
      break
    }
    case 'guide': {
      path = `${resType}/${docName}`
      break
    }
    default: throw new Error(`Unsupported protocol: ${docType}`)
  }

  const docPath = resolve(import.meta.dirname, '../', api, 'resources/docs', path.replace(/-/g, '_'))

  return docPath

}


/*
function remoteDocumentPath(uri: URL): string {
  
  const type = uri.protocol.replace(':', '')

  const origin = uri.hostname
  const resource = uri.pathname?.substring(1)

  let path: string

  switch (type) {
    case 'resource': {
    }
    case 'guide': {
    }
    default: throw new Error(`Unsupported protocol: ${type}`)
  }

  const docPath = resolve(import.meta.dirname, path)

  return docPath

}
  */


//  { name: 'orders_search', uri: 'resource://carts/search.md' },
export async function fetchResourceContent(uri: URL): Promise<string> {

  let content: string

  try {
    if (['http:', 'https:'].includes(uri.protocol)) {
      const response = await fetch(uri)
      if (response.ok) content = await response.text()
      else throw new Error(response.statusText)
    } else {
      const docPath = localDocumentPath(uri)
      content = readFileSync(docPath, 'utf-8')
    }
  } catch (error: any) {
    throw new Error(`Failed to fetch resource: ${error.message}`)
  }

  return content

}



export const createServerToolStaticResource = (resDoc: ResourceDocumentation): McpServerResourceStatic => {

  const { name, uri } = resDoc

  const resource: McpServerResourceStatic = {
    name,
    uri,
    readCallback: async (uri: URL) => ({
      contents: [{
        uri: uri.href,
        text: await fetchResourceContent(uri)
      }]
    })
  }

  return resource

}



/*
// Static resource
server.resource(
  "config",
  "config://app",
  async (uri) => ({
    contents: [{
      uri: uri.href,
      text: "App configuration here"
    }]
  })
);

// Dynamic resource with parameters
server.resource(
  "user-profile",
  new ResourceTemplate("users://{userId}/profile", { list: undefined }),
  async (uri, { userId }) => ({
    contents: [{
      uri: uri.href,
      text: `Profile data for user ${userId}`
    }]
  })
);
*/
