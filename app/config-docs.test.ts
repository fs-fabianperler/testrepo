// @vitest-environment node
import { readdirSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const appDir = fileURLToPath(new URL('.', import.meta.url))
const docsFile = fileURLToPath(
  new URL('../docs/technical/configuration.md', import.meta.url),
)

function optionsInCode(): string[] {
  const files = [
    `${appDir}vite.config.ts`,
    ...readdirSync(`${appDir}src`, { recursive: true, encoding: 'utf8' })
      .filter((file) => /\.tsx?$/.test(file))
      .map((file) => `${appDir}src/${file}`),
  ]
  const names = new Set<string>()
  for (const file of files) {
    const source = readFileSync(file, 'utf8')
    for (const match of source.matchAll(
      /import\.meta\.env\.(VITE_\w+)|process\.env\.(\w+)/g,
    )) {
      names.add(match[1] ?? match[2])
    }
  }
  const runtimeConfig: Record<string, unknown> = JSON.parse(
    readFileSync(`${appDir}public/config.json`, 'utf8'),
  )
  for (const name of Object.keys(runtimeConfig)) {
    names.add(name)
  }
  return [...names].sort()
}

function optionsInDocs(): string[] {
  const rows = readFileSync(docsFile, 'utf8').matchAll(/^\| `(\w+)` \|/gm)
  return Array.from(rows, (row) => row[1]).sort()
}

describe('docs/technical/configuration.md', () => {
  it('documents exactly the options the app reads', () => {
    expect(optionsInDocs()).toEqual(optionsInCode())
  })
})
