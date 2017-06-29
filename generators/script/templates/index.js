const path = require('path')

module.exports = (robot) => {
  const scriptsPath = path.resolve(__dirname, 'src')
  robot.loadFile(scriptsPath, '<%= scriptName %>.js')
}
