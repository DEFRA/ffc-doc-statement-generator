const config = require('../../config')
const { MessageSender } = require('ffc-messaging')
const createMessage = require('./create-message')
const { createAlerts } = require('../create-alerts')

let sender = null

const getSender = () => {
  if (!sender) {
    sender = new MessageSender(config.publishTopic)
  }
  return sender
}

const closeSender = async () => {
  if (sender) {
    await sender.closeConnection()
    sender = null
  }
}

const sendPublishMessage = async (statement, filename, typeId) => {
  try {
    const message = await createMessage(statement, filename, typeId)
    await getSender().sendMessage(message)
  } catch (error) {
    console.error('Error sending publish message:', error)
    await createAlerts([{ file: filename, message: error.message }])
    throw error
  }
}

module.exports = sendPublishMessage
module.exports.closeSender = closeSender
