const { crmTopic } = require('../../config')
const { MessageSender } = require('ffc-messaging')
const createCrmMessage = require('./create-crm-message')

const sendCrmMessage = async (statement, filename) => {
  const message = createCrmMessage(statement, filename)
  const sender = new MessageSender(crmTopic)
  await sender.sendMessage(message)
  await sender.closeConnection()
}

module.exports = sendCrmMessage
