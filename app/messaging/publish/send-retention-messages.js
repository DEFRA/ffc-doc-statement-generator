const { MessageSender } = require('ffc-messaging')
const config = require('../../config')
const MESSAGE_SOURCE = require('../../constants/message-source')

const sendRetentionMessages = async (generations) => {
  let sender
  try {
    for (const generation in generations) {
      const message = {
        body: {
          documentReference: generation.documentReference,
          filename: generation.filename
        },
        type: 'uk.gov.doc.statement.retention',
        source: MESSAGE_SOURCE
      }
      sender = new MessageSender(config.statementRetentionTopic)
      await sender.sendMessage(message)
    }
  } catch (error) {
    console.error('Error sending statement retention message:', error)
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

module.exports = sendRetentionMessages
