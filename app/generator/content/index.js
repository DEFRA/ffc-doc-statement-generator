const { createContent: createSFI23Content } = require('./sfi23-quarterly-statement')
const { createContent: createDelinkedContent } = require('./delinked-statement')
const { SFI23QUARTERLYSTATEMENT, DELINKED } = require('../../constants/document-types')
const { dataProcessingAlert } = require('ffc-alerting-utils')
const { DATA_PUBLISHING_ERROR } = require('../../constants/alerts')

const alertDefault = async (type, request) => {
  const alertPayload = {
    process: 'generateContent',
    type: request?.type?.id || 'unknown',
    sbi: request?.sbi,
    scheme: request?.scheme,
    message: `Failed to generate content for ${type?.id || type || 'unknown'}`
  }
  await dataProcessingAlert(alertPayload, DATA_PUBLISHING_ERROR)
  throw new Error(`Unknown request type: ${type?.id || type || 'unknown'}`)
}

const generateContent = async (request, type) => {
  switch (type) {
    case SFI23QUARTERLYSTATEMENT:
      return createSFI23Content(request)
    case DELINKED:
      return createDelinkedContent(request)
    default:
      return alertDefault(type, request)
  }
}

module.exports = {
  generateContent
}
