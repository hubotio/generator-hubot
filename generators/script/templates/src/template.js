'use strict'

// Description
//   <%= scriptDescription %>
//
// Configuration:
//   LIST_OF_ENV_VARS_TO_SET
//
// Commands:
//   hubot hello - <what the respond trigger does>
//   orly - <what the hear trigger does>
//
// Notes:
//   <optional notes required for the script>
//
// Author:
//   <%= scriptOwner %>

module.exports = (robot) => {
  robot.respond(/hello/, (res) => {
    res.reply('hello!')
  })

  robot.hear(/orly/, (res) => {
    res.send('yarly')
  })
}
