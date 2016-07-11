# Description
#   <%= scriptDescription %>
#
# Configuration:
#   LIST_OF_ENV_VARS_TO_SET
#
# Commands:
#   hubot hello - <what the respond trigger does>
#   orly - <what the hear trigger does>
#
# Notes:
#   <optional notes required for the script>
#
# Author:
#   <%= scriptOwner %>

module.exports = (robot) ->
  #check if hubot-enterprise is loaded
  if not robot.enterprise
    robot.logger.error 'hubot-enterprise not present, <%= scriptName %> cannot run'
    return
  robot.logger.info '<%= scriptName %> initialized'

  #register some functions
  robot.enterprise.create {action: 'create',
  help: 'create ticket', type: 'respond'}, (msg, _robot)->
    _robot.logger.debug  'in <%= scriptName %> create'
    msg.reply 'in <%= scriptName %> create'

  robot.enterprise.create {action: 'update',
  help: 'update ticket', type: 'hear'}, (msg, _robot)->
    _robot.logger.debug  'in <%= scriptName %> update'
    msg.send 'in <%= scriptName %> update'