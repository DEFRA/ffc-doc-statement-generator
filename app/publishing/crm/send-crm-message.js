const { crmTopic } = require('../../config')
const { MessageSender } = require('ffc-messaging')
const createCrmMessage = require('./create-crm-message')

let sender = null

const getSender = () => {
  if (!sender) {
    sender = new MessageSender(crmTopic)
  }
  return sender
}

const closeSender = async () => {
  if (sender) {
    await sender.closeConnection()
    sender = null
  }
}

const sendCrmMessage = async (statement, filename, type) => {
  const message = createCrmMessage(statement, filename, type)
  await getSender().sendMessage(message)
  return message?.body?.apiLink
}

module.exports = sendCrmMessage
module.exports.closeSender = closeSender
