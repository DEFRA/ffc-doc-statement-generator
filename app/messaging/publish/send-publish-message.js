const config = require('../../config')
const { MessageSender } = require('ffc-messaging')
const createMessage = require('./create-message')

const sendPublishMessage = async (statement, filename, typeId) => {
  if (config.SFI23QUARTERLYSTATEMENT_ENABLED !== 'true') {
    console.log('SFI23QUARTERLYSTATEMENT publishing is disabled')
    return
  }

  if (config.SCHEDULE_ENABLED !== 'true') {
    console.log('SCHEDULE publishing is disabled')
    return
  }

  if (config.SEND_CRM_MESSAGE_ENABLED !== 'true') {
    console.log('SEND_CRM_MESSAGE publishing is disabled')
    return
  }

  if (config.SAVE_LOG_ENABLED !== 'true') {
    console.log('SAVE_LOG publishing is disabled')
    return
  }

  const message = createMessage(statement, filename, typeId)
  const sender = new MessageSender(config.publishTopic)
  await sender.sendMessage(message)
  await sender.closeConnection()
  console.log('Published message successfully')
}

module.exports = sendPublishMessage
