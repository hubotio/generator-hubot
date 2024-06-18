'use strict'
import { describe, it, before } from 'node:test'
import path from 'node:path'
import helpers from 'yeoman-test'
import assert from 'yeoman-assert'
import fs from 'node:fs/promises'
const __dirname = path.dirname(new URL(import.meta.url).pathname)

function getFullPath (file) {
  return path.join(__dirname, '../test/temp', file)
}
describe('hubot:app', function () {
  before(async () => {
    await helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({ 'skip-install': true, defaults: true, name: 'hubot', owner: 'temp' })
  })

  it('creates files', async function () {
    assert.file([
      getFullPath('bin/hubot'),
      getFullPath('bin/hubot.cmd'),
      getFullPath('Procfile'),
      getFullPath('README.md'),
      getFullPath('external-scripts.json'),
      getFullPath('.gitignore'),
      getFullPath('package.json'),
      getFullPath('scripts/Example.mjs')
    ])
    assert.fileContent('bin/hubot', await fs.readFile(path.join(__dirname, '../test/temp/bin/hubot'), 'utf8'))
    assert.fileContent('package.json', await fs.readFile(path.join(__dirname, '../test/temp/package.json'), 'utf8'))
  })
})
