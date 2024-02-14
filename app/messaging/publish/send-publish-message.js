const config = require('../../config')
const { MessageSender } = require('ffc-messaging')
const createMessage = require('./create-message')

const sendPublishMessage = async (statement, filename, typeId) => {
  const message = createMessage(statement, filename, typeId)
  const sender = new MessageSender(config.publishTopic)
  await sender.sendMessage(message)
  await sender.closeConnection()
}

module.exports = sendPublishMessage
