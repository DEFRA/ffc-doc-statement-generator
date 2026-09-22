const { crmTopic } = require('../../config')
const { getSender, sendMessage: sendServiceBusMessage, closeSender: closeServiceBusSender } = require('../../messaging/service-bus')
const createCrmMessage = require('./create-crm-message')

const closeSender = async () => {
  await closeServiceBusSender(crmTopic)
}

const sendCrmMessage = async (statement, filename, type) => {
  const message = createCrmMessage(statement, filename, type)
  await sendServiceBusMessage(getSender(crmTopic), message)
  return message?.body?.apiLink
}

module.exports = sendCrmMessage
module.exports.closeSender = closeSender
