path = require 'path'

module.exports = (robot, scripts) ->
  scriptsPath = path.resolve(__dirname, 'src')
  robot.loadFile(scriptsPath, '<%= scriptName %>.coffee')
