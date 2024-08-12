const config = require('../../config')
const { MessageSender } = require('ffc-messaging')
const createMessage = require('./create-message')

const sendPublishMessage = async (statement, filename, typeId) => {
  const featureFlags = [
    'SFI23QUARTERLYSTATEMENT_ENABLED',
    'SCHEDULE_ENABLED',
    'SEND_CRM_MESSAGE_ENABLED',
    'SAVE_LOG_ENABLED'
  ]

  for (const flag of featureFlags) {
    if (!config[flag]) {
      console.log(`Feature flag has disabled publishing: ${flag}`)
      return
    }
  }

  const message = createMessage(statement, filename, typeId)
  const sender = new MessageSender(config.publishTopic)
  await sender.sendMessage(message)
  await sender.closeConnection()
  console.log('Published message successfully')
}

module.exports = sendPublishMessage
