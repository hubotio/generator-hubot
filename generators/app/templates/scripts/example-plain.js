// Description:
//   Example scripts for you to examine and try out.
//
// Notes:
//   They are commented out by default, because most of them are pretty silly and
//   wouldn't be useful and amusing enough for day to day huboting.
//   Uncomment the ones you want to try and experiment with.
//
//   These are from the scripting documentation: https://github.com/github/hubot/blob/master/docs/scripting.md
//   They have been ported over to regular JavaScript from the CoffeeScript original.
module.exports = function (robot) {

/*
  // hear responds to any message, even if it's not directed at hubot
  robot.hear(/badger/i, function (res) {
    res.send("Badgers? BADGERS? WE DON'T NEED NO STINKIN BADGERS");
  });
*/

/*
  // respond only works if the hubot has been addressed directly
  robot.respond(/open the (.*) doors/i, function (res) {
    var doorType = res.match[1];
    if (doorType === "pod bay") {
      res.reply("I'm afraid I can't let you do that.");
    } else {
      res.reply("Opening " + doorType + " doors")
    }
  });
*/

/*
  // hubot can send "emotes" instead of regular messages.
  robot.hear(/I like pie/i, function (res) {
    res.emote("makes a freshly baked pie");
  });
*/

/*
  // we can reply with a random message from a list
  var lulz = ['lol', 'rofl', 'lmao'];

  robot.respond(/lulz/i, function (res) {
    res.send(res.random(lulz));
  });
*/

/*
  // it may also react to topic changes. Please note: not all adapters support this.
  robot.topic(function (res) {
    res.send(res.message.text + "? That's a Paddlin'");
  });
*/

/*
  // hubot will get notified of people entering and leaving the chat. It can
  // react in those cases, for example, with a greeting.
  var enterReplies = ['Hi', 'Target Acquired', 'Firing', 'Hello friend.', 'Gotcha', 'I see you']
  var leaveReplies = ['Are you still there?', 'Target lost', 'Searching']

  robot.enter(function (res) {
    res.send(res.random(enterReplies));
  });
  robot.leave(function (res) {
    res.send(res.random(leaveReplies));
  });
*/

/*
  // Hubot can access the environment he's running in, just like any other
  // node program, using process.env. This can be used to configure how scripts
  // are run, with the convention being to use the HUBOT_ prefix.
  var answer = process.env.HUBOT_ANSWER_TO_THE_ULTIMATE_QUESTION_OF_LIFE_THE_UNIVERSE_AND_EVERYTHING

  robot.respond(/what is the answer to the ultimate question of life/, function (res){
    if (answer) {
      res.send(answer + ", but what is the question?");
    } else {
      res.send("Missing HUBOT_ANSWER_TO_THE_ULTIMATE_QUESTION_OF_LIFE_THE_UNIVERSE_AND_EVERYTHING in environment: please set and try again");
    }
  });
*/

/*
  // delaying a response is also possible
  robot.respond(/you are a little slow/, function (res) {
    setTimeout (function () {
      res.send("Who you calling 'slow'?");
    }, 15 * 1000);
  });
*/

/*
  // setting and unsetting an interval with two seperate messages to hubot:
  var annoyIntervalId = null

  robot.respond(/annoy me/, function (res) {
    if (annoyIntervalId) {
      res.send("AAAAAAAAAAAEEEEEEEEEEEEEEEEEEEEEEEEIIIIIIIIHHHHHHHHHH");
      return
    }

    res.send("Hey, want to hear the most annoying sound in the world?");
    annoyIntervalId = setInterval(function () {
      res.send("AAAAAAAAAAAEEEEEEEEEEEEEEEEEEEEEEEEIIIIIIIIHHHHHHHHHH");
    }, 1000);
  });

  robot.respond(/unannoy me/, function (res) {
    if (annoyIntervalId) {
      res.send("GUYS, GUYS, GUYS!");
      clearInterval(annoyIntervalId);
      annoyIntervalId = null
    } else {
      res.send("Not annoying you right now, am I?");
    }
  });
*/

/*
  // hubot can react on http-messages. Start your hubot and try it out with this:
  //   curl -H "Content-Type: application/json" --data '{"secret":"I love you"}' http://localhost:8080/hubot/chatsecrets/default
  robot.router.post('/hubot/chatsecrets/:room', function (httpreq, httpres) {
    var room = httpreq.params.room;
    var secret = httpreq.body.secret;

    robot.messageRoom(room, "I have a secret: " + secret);

    httpres.send('OK');
  });
*/

/*
  // hubot has an error-listener in case anything goes wrong.
  robot.error(function (err, res) {
    robot.logger.error("DOES NOT COMPUTE");

    if (res) {
      res.reply("DOES NOT COMPUTE");
    }
  });

  robot.hear(/crash/, function (res) {
    res.fuckup(); // there's no function called "fuckup", this is an intentional error.
  });
*/

/*
  // example on how to use hubot's brain (usually a redis database)
  robot.respond(/have a soda/i, function (res) {
    // Get number of sodas had (coerced to a number).
    var sodasHad = robot.brain.get('totalSodas') || 0;

    if (sodasHad > 4) {
      res.reply("I'm too fizzy..");
    } else {
      res.reply('Sure!');
      robot.brain.set('totalSodas', sodasHad + 1);
    }
  });

  robot.respond(/sleep it off/i, function (res) {
    robot.brain.set('totalSodas', 0);
    res.reply('zzzzz');
  });
*/

};
