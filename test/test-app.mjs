'use strict'
import { describe, it, before } from 'node:test'
import path from 'node:path'
import helpers from 'yeoman-test'
import assert from 'yeoman-assert'

const __dirname = path.dirname(new URL(import.meta.url).pathname)

describe('hubot:app', function () {
  before(async () => {
    await helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({ 'skip-install': true })
  })

  it('creates files', function () {
    assert.file([
      'bin/hubot',
      'bin/hubot.cmd',
      'Procfile',
      'README.md',
      'external-scripts.json',
      '.gitignore',
      'package.json',
      'scripts/Example.mjs'
    ])
  })
})
