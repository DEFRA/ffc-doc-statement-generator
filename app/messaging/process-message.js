const util = require('util')
const { getDocumentType } = require('./get-document-type')
const { validateRequest } = require('./validate-request')
const { generateDocument } = require('../generator')
const { VALIDATION } = require('../errors')
const config = require('../config')

const processMessage = async (message, receiver) => {
  try {
    const request = message.body
    const messageType = message.applicationProperties.type

    if (messageType === 'SFI23QUARTERLYSTATEMENT' && config.SFI23QUARTERLYSTATEMENT_ENABLED !== 'true') {
      console.log('SFI23QUARTERLYSTATEMENT processing is disabled')
      await receiver.abandonMessage(message)
      return
    }

    if (messageType === 'SCHEDULE' && config.SCHEDULE_ENABLED !== 'true') {
      console.log('SCHEDULE processing is disabled')
      await receiver.abandonMessage(message)
      return
    }

    if (messageType === 'SEND_CRM_MESSAGE' && config.SEND_CRM_MESSAGE_ENABLED !== 'true') {
      console.log('SEND_CRM_MESSAGE processing is disabled')
      await receiver.abandonMessage(message)
      return
    }

    if (messageType === 'SAVE_LOG' && config.SAVE_LOG_ENABLED !== 'true') {
      console.log('SAVE_LOG processing is disabled')
      await receiver.abandonMessage(message)
      return
    }

    console.log('Generation request received:', util.inspect(request, false, null, true))
    const documentType = getDocumentType(messageType)
    validateRequest(request, documentType)
    await generateDocument(request, documentType)
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process request:', err)
    if (err.category === VALIDATION) {
      await receiver.deadLetterMessage(message)
    }
  }
}

module.exports = processMessage
