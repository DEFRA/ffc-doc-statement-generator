const { MessageSender } = require('ffc-messaging')
const config = require('../../config')
const MESSAGE_SOURCE = require('../../constants/message-source')

let sender = null

const getSender = () => {
  if (!sender) {
    sender = new MessageSender(config.statementRetentionTopic)
  }
  return sender
}

const closeSender = async () => {
  if (sender) {
    await sender.closeConnection()
    sender = null
  }
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
      await getSender().sendMessage(message)
    }
  } catch (error) {
    console.error('Error sending statement retention message:', error)
  }
}

module.exports = sendRetentionMessages
module.exports.closeSender = closeSender
