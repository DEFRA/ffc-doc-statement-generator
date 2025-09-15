const { DATA_PUBLISHING_ERROR } = require('../../constants/alerts')
const { dataProcessingAlert } = require('../processing-alerts')
const mapPublish = require('./map-publish')
const validatePublishModule = require('./validate-publish')

const createMessage = async (document, filename, type) => {
  try {
    const mappedPublish = mapPublish(document, filename, type)
    const validatedPublish = validatePublishModule.validatePublish(mappedPublish, type)
    return validatedPublish
  } catch (error) {
    const alertPayload = {
      process: 'createMessage' + (filename ? ' - ' + filename : ''),
      type,
      sbi: document?.sbi,
      documentReference: document?.documentReference,
      scheme: document?.scheme,
      error: error instanceof Error ? { message: error.message, stack: error.stack } : error,
      message: error?.message ?? `Failed to create message for ${filename ?? 'unknown file'}`
    }

    try {
      await dataProcessingAlert(alertPayload, DATA_PUBLISHING_ERROR)
    } catch (alertErr) {
      console.error('Failed to publish processing alert for createMessage', {
        originalError: error?.message,
        alertError: alertErr?.message ?? alertErr
      })
    }

    throw error
  }
}

module.exports = createMessage
