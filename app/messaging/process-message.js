const util = require('util')
const { getDocumentType } = require('./get-document-type')
const { validateRequest } = require('./validate-request')
const { generateDocument } = require('../generator')
const { VALIDATION } = require('../constants/errors')

const processMessage = async (message, receiver) => {
  try {
    const request = message.body
    console.log('Generation request received:', util.inspect(request, false, null, true))

    const documentType = getDocumentType(message.applicationProperties.type)

    await validateRequest(request, documentType)
    await generateDocument(request, documentType)
    console.log('Completing message...')
    await receiver.completeMessage(message)
    console.log('Message completed successfully.')
  } catch (err) {
    console.error('Unable to process request:', err)

    if (err.category === VALIDATION) {
      console.error('Validation error:', err.message)
      await receiver.deadLetterMessage(message)
      console.log('Message moved to dead letter queue due to validation error.', err.message)
    } else {
      console.error('Processing error:', err.message)
    }
  }
}

module.exports = processMessage
