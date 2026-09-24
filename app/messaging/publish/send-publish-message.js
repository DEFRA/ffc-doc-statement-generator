const config = require('../../config')
const { getSender, sendMessage: sendServiceBusMessage, closeSender: closeServiceBusSender } = require('../service-bus')
const createMessage = require('./create-message')
const { createAlerts } = require('../create-alerts')

const closeSender = async () => {
  await closeServiceBusSender(config.publishTopic)
}

const sendPublishMessage = async (statement, filename, typeId) => {
  try {
    const message = await createMessage(statement, filename, typeId)
    await sendServiceBusMessage(getSender(config.publishTopic), message)
  } catch (error) {
    console.error('Error sending publish message:', error)
    await createAlerts([{ file: filename, message: error.message }])
    throw error
  }
}

module.exports = sendPublishMessage
module.exports.closeSender = closeSender
