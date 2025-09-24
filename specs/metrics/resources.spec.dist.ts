import resources from '../../dist/server/metrics/resources/index.js'
import test, { suite } from 'node:test'
import assert from 'node:assert/strict'
import { fetchResourceContent, isStaticResource } from '../../dist/server/utils/resources.js'



suite('Metrics Resources', () => {

  test('Static Resources', async (t) => {

    resources.forEach(async resource => {

      if (isStaticResource(resource)) {
        const text = await fetchResourceContent(new URL(resource.uri))
        // console.log(`${resource.name} - ${text.length} characters`)
        assert.ok(text.length > 0, `${resource.name} should have content`)
      }

    })

  })

})
