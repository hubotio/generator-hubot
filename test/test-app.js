'use strict'

/* global describe, before, it */

var path = require('path')
var assert = require('yeoman-generator').assert
var helpers = require('yeoman-generator').test
var os = require('os')

describe('hubot:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .withPrompt({
        someOption: true
      })
      .on('end', done)
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
      'scripts/example.js'
    ])
  })
})
