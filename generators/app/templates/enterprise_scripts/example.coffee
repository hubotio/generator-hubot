###
Copyright 2016 Hewlett-Packard Development Company, L.P.

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
###

module.exports = (robot) ->

  # #check if hubot-enterprise is loaded
  # if not robot.e
  #   robot.logger.error 'hubot-enterprise not present, cannot run'
  #   return
	#
  # robot.logger.info 'hubot-test initialized'
  #
  # #register some functions
  # robot.e.create {action: 'create',
  # help: 'create ticket', type: 'respond',
  # extra: '([0-9]+)([dDhHmMsS]) ?(.*)',}, (msg)->
  #   robot.logger.debug  'in test create'
  #   msg.reply 'in test create'
  #
  # robot.e.create {action: 'update',
  # help: 'update ticket', type: 'hear'}, (msg)->
  #   robot.logger.debug  'in test update'
  #   msg.reply 'in test update'
  #
  # robot.e.create {product: 'test', action: 'read',
  # help: 'read ticket', type: 'respond'}, (msg)->
  #   robot.logger.debug  'in test read'
  #   msg.reply 'in test read'
  #
  # robot.e.create {product: 'test', action: 'delete',
  # help: 'delete ticket', type: 'respond'}, (msg)->
  #   robot.logger.debug  'in test delete'
  #   msg.reply 'in test delete'
