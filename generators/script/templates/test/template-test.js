'use strict'

/* global describe, beforeEach, afterEach, it */

const Helper = require('hubot-test-helper')
const chai = require('chai')

const helper = new Helper('../src/<%= scriptName %>')

const expect = chai.expect

describe('<%= scriptName %>', () => {
  let room

  beforeEach(() => {
    room = helper.createRoom()
  })

  afterEach(() => {
    room.destroy()
  })

  it('responds to hello', () => {
    room.user.say('alice', '@hubot hello').then(() => {
      expect(room.messages).to.eql([
        ['alice', '@hubot hello'],
        ['hubot', '@alice hello!']
      ])
    })
  })

  it('hears orly', () => {
    room.user.say('bob', 'just wanted to say orly').then(() => {
      expect(room.messages).to.eql([
        ['bob', 'just wanted to say orly'],
        ['hubot', 'yarly']
      ])
    })
  })
})
