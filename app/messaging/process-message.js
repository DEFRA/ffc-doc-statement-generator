const util = require('util')
const { getDocumentType } = require('./get-document-type')
const { validateRequest } = require('./validate-request')
const { generateDocument } = require('../generator')
const { VALIDATION } = require('../errors')

const processMessage = async (message, receiver) => {
  try {
    const request = message.body
    console.log('Generation request received:', util.inspect(request, false, null, true))
    const documentType = getDocumentType(message.applicationProperties.type)
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
