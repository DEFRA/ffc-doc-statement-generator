const { getSender, sendMessage: sendServiceBusMessage, closeSender: closeServiceBusSender } = require('../service-bus')
const config = require('../../config')
const MESSAGE_SOURCE = require('../../constants/message-source')

const closeSender = async () => {
  await closeServiceBusSender(config.statementRetentionTopic)
}

const sendRetentionMessages = async (generations) => {
  try {
    for (const generation of generations) {
      const message = {
        body: {
          documentReference: generation.documentReference,
          filename: generation.filename
        },
        type: 'uk.gov.doc.statement.retention',
        source: MESSAGE_SOURCE
      }
      await sendServiceBusMessage(getSender(config.statementRetentionTopic), message)
    }
  } catch (error) {
    console.error('Error sending statement retention message:', error)
  }
}

module.exports = sendRetentionMessages
module.exports.closeSender = closeSender
