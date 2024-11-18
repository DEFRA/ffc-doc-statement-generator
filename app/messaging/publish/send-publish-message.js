const config = require('../../config')
const { MessageSender } = require('ffc-messaging')
const createMessage = require('./create-message')

const sendPublishMessage = async (statement, filename, typeId) => {
  let sender
  try {
    const message = createMessage(statement, filename, typeId)
    sender = new MessageSender(config.publishTopic)
    await sender.sendMessage(message)
  } catch (error) {
    console.error('Error sending publish message:', error)
    throw error
  } finally {
    if (sender) {
      try {
        await sender.closeConnection()
      } catch (closeError) {
        console.error('Error closing message sender connection:', closeError)
      }
    }
  }
}

module.exports = sendPublishMessage
