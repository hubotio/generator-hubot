# Description:
#   Utility commands surrounding Hubot uptime.
#
# Commands:
#   hubot ping - Reply with pong
#
# URLS:
#   /hubot/ping

module.exports = (robot) ->
  robot.respond /PING$/i, (msg) ->
    msg.send "PONG"

  robot.router.post "/hubot/ping", (req, res) ->
    res.end "PONG"
