import test, { suite } from 'node:test'
import { checkTestResult, skipToolTest } from '../../util.js'
import assert from 'node:assert'



const modulesRoot = '../../../dist/server/metrics/tools'
const toolsGroup = 'analysis'

const tools = (await import(`${modulesRoot}/${toolsGroup}/index.js`)).default


const defaultPayload = {
  limit: 10
}

const defaultFilter = {
  date_from: '2023-01-01T00:00:00Z',
  date_to: '2024-12-31T23:59:59Z'
}

const defaultData = {
  payload: defaultPayload,
  filter: defaultFilter
}


const testData = {
  fbt: {
    filter: { item_ids: ['EnzPQSpKNW'] }
  }
}



suite(`Metrics Tools: ${toolsGroup}`, async () => {

  let accessToken = ''

  // before(async () => { accessToken = await getAccessToken() })

  for (const tool of tools) {
    test(tool.name, async (t) => {

      const toolModule = tool.name.replace(/-/g, '_') as keyof typeof testData

      const toolData = testData[toolModule]
      if (!toolData) skipToolTest(tool, t)
      else
      try {
        // const { callback } = await import(`${modulesRoot}/${toolsGroup}/${toolModule}.js`)
        const result = await tool.callback(toolData, {})
        checkTestResult(result)
      } catch (error: any) {
        assert.fail(`Error in tool ${tool.name}: ${error.message || error}`)
      }

    })
  }

})
