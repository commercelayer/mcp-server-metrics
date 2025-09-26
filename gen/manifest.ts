
import { readFileSync, writeFileSync } from 'node:fs'
import { tools } from '../src/metrics/tools/index.js'



const packagePath = new URL('../package.json', import.meta.url).pathname
const manifestPath = new URL('../dist/manifest.json', import.meta.url).pathname

const packageFile = readFileSync(packagePath, { encoding: 'utf-8' })
const packegeJson = JSON.parse(packageFile)

const manifestFile = readFileSync(manifestPath, { encoding: 'utf-8' })
const manifestJson = JSON.parse(manifestFile)

manifestJson.version = packegeJson.version
manifestJson.description = packegeJson.description

manifestJson.tools = tools.map((t) => {
  return {
    name: t.name,
    description: t.description
  }
})


writeFileSync(manifestPath, JSON.stringify(manifestJson, null, 2), { encoding: 'utf-8' })
console.log(`Manifest file updated to version ${manifestJson.version}`)
