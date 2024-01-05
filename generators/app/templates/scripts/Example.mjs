'use strict'

// Description:
//   Example scripts for you to examine and try out.
//
// Notes:
//   They are commented out by default, because most of them are pretty silly and
//   wouldn't be useful and amusing enough for day to day huboting.
//   Uncomment the ones you want to try and experiment with.
//
//   These are from the scripting documentation: https://github.com/github/hubot/blob/master/docs/scripting.md

export default async robot => {

  // robot.hear(/badger/i, async (res) => {
  //   await res.send('Badgers? BADGERS? WE DON’T NEED NO STINKIN BADGERS')
  // })
  //
  // robot.respond(/open the (.*) doors/i, async (res) => {
  //   const doorType = res.match[1]
  //
  //   if (doorType === 'pod bay') {
  //     await res.reply('I’m afraid I can’t let you do that.')
  //     return
  //   }
  //
  //   await res.reply('Opening #{doorType} doors')
  // })
  //
  // robot.hear(/I like pie/i, async (res) => {
  //   await res.emote('makes a freshly baked pie')
  // })
  //
  // const lulz = ['lol', 'rofl', 'lmao']
  //
  // robot.respond(`/${lulz.join('|')}/i`, async (res) => {
  //   await res.send(res.random(lulz))
  // })
  //
  // robot.topic(async (res) => {
  //   await res.send(`${res.message.text}? That’s a Paddlin`)
  // })
  //
  // const enterReplies = ['Hi', 'Target Acquired', 'Firing', 'Hello friend.', 'Gotcha', 'I see you']
  // const leaveReplies = ['Are you still there?', 'Target lost', 'Searching']
  //
  // robot.enter(async (res) => {
  //   await res.send(res.random(enterReplies))
  // })
  // robot.leave(async (res) => {
  //   await res.send(res.random(leaveReplies))
  // })
  //
  // const answer = process.env.HUBOT_ANSWER_TO_THE_ULTIMATE_QUESTION_OF_LIFE_THE_UNIVERSE_AND_EVERYTHING
  //
  // robot.respond(/what is the answer to the ultimate question of life/, async (res) => {
  //   if (answer) {
  //     await res.send(`${answer}, but what is the question?`)
  //     return
  //   }
  //
  //   await res.send('Missing HUBOT_ANSWER_TO_THE_ULTIMATE_QUESTION_OF_LIFE_THE_UNIVERSE_AND_EVERYTHING in environment: please set and try again')
  // })
  //
  // robot.respond(/you are a little slow/, async (res) => {
  //   setTimeout(async () => await res.send('Who you calling "slow"?'), 60 * 1000)
  // })
  //
  // let annoyIntervalId = null
  //
  // robot.respond(/annoy me/, async (res) => {
  //   if (annoyIntervalId) {
  //     await res.send('AAAAAAAAAAAEEEEEEEEEEEEEEEEEEEEEEEEIIIIIIIIHHHHHHHHHH')
  //     return
  //   }
  //
  //   await res.send('Hey, want to hear the most annoying sound in the world?')
  //   annoyIntervalId = setInterval(async () => await res.send('AAAAAAAAAAAEEEEEEEEEEEEEEEEEEEEEEEEIIIIIIIIHHHHHHHHHH'), 1000)
  // })
  //
  // robot.respond(/unannoy me/, async (res) => {
  //   if (!annoyIntervalId) {
  //     await res.send('Not annoying you right now, am I?')
  //     return
  //   }
  //
  //   await res.send('OKAY, OKAY, OKAY!')
  //   clearInterval(annoyIntervalId)
  //   annoyIntervalId = null
  // })
  //
  //
  // robot.router.post('/hubot/chatsecrets/:room', async (req, res) => {
  //   const room = req.params.room
  //   const data = JSON.parse(req.body.payload)
  //   const secret = data.secret
  //
  //   await robot.messageRoom(room, `I have a secret: ${secret}`)
  //
  //   await res.send('OK')
  // })
  //
  // robot.error(async (error, response) => {
  //   const message = `DOES NOT COMPUTE: ${error.toString()}`
  //   robot.logger.error(message)
  //
  //   if (response) {
  //     await response.reply(message)
  //   }
  // })
  //
  // robot.respond(/have a soda/i, async (response) => {
  //   // Get number of sodas had (coerced to a number).
  //   const sodasHad = +robot.brain.get('totalSodas') || 0
  //
  //   if (sodasHad > 4) {
  //     await response.reply('I’m too fizzy…')
  //     return
  //   }
  //
  //   await response.reply('Sure!')
  //   robot.brain.set('totalSodas', sodasHad + 1)
  // })
  //
  // robot.respond(/sleep it off/i, async (res) => {
  //   robot.brain.set('totalSodas', 0)
  //   await res.reply('zzzzz')
  // })
}
