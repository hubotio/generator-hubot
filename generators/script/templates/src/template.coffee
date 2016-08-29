# Notes:
#  Copyright <%= yearName %> <%= companyName %>
#
#  Permission is hereby granted, free of charge, to any person obtaining a
#  copy of this software and associated documentation files (the "Software"),
#  to deal in the Software without restriction, including without limitation
#  the rights to use, copy, modify, merge, publish, distribute, sublicense,
#  and/or sell copie of the Software, and to permit persons to whom the
#  Software is furnished to do so, subject to the following conditions:
#
#  The above copyright notice and this permission notice shall be included in
#  all copies or substantial portions of the Software.
#
#  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
#  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
#  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
#  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
#  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
#  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
#  SOFTWARE.

module.exports = (robot) ->
  #check if hubot-enterprise is loaded
  if not robot.e
    robot.logger.error 'hubot-enterprise not present, <%= scriptName %> cannot run'
    return
  robot.logger.info '<%= scriptName %> initialized'

  #register some functions
  robot.e.create {verb: 'create', entity: 'ticket',
  help: 'create ticket', type: 'respond'}, (msg)->
    robot.logger.debug  'in <%= scriptName %> create ticket'
    msg.reply 'in <%= scriptName %> create ticket'

  robot.e.create {verb: 'update', entity: 'ticket',
  help: 'update ticket', type: 'hear'}, (msg)->
    robot.logger.debug  'in <%= scriptName %> update ticket'
    msg.send 'in <%= scriptName %> update ticket'
