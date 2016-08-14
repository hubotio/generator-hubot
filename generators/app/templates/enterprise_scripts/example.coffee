###
Copyright 2016 Hewlett-Packard Development Company, L.P.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
Software distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
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
