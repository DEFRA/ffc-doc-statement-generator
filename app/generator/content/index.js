const { createContent: createStatementContent } = require('./statement/SFI')
const { createContent: createSFI23AdvancedStatementContent } = require('./statement/SFIA')
const { createContent: createScheduleContent } = require('./schedule')
const { createContent: createSFI23Content } = require('./sfi23-quarterly-statement')
const { createContent: createDelinkedContent } = require('./delinked-statement')
const { STATEMENT, SCHEDULE, SFI23QUARTERLYSTATEMENT, SFI23ADVANCEDSTATEMENT, DELINKED } = require('../../constants/document-types')
const { dataProcessingAlert } = require('../../messaging/processing-alerts')
const { PUBLISH_ERROR } = require('../../constants/alerts')

const alertDefault = async (type, request) => {
  const alertPayload = {
    process: 'generateContent',
    type: request?.type?.name || request?.type?.type || 'unknown',
    sbi: request?.sbi,
    scheme: request?.scheme,
    message: `Failed to generate content for ${type?.name || type?.type || type || 'unknown'}`
  }
  await dataProcessingAlert(alertPayload, PUBLISH_ERROR)
  throw new Error(`Unknown request type: ${type?.name || type?.type || type || 'unknown'}`)
}

const generateContent = async (request, type) => {
  switch (type) {
    case STATEMENT:
      return createStatementContent(request)
    case SCHEDULE:
      return createScheduleContent(request)
    case SFI23QUARTERLYSTATEMENT:
      return createSFI23Content(request)
    case SFI23ADVANCEDSTATEMENT:
      return createSFI23AdvancedStatementContent(request)
    case DELINKED:
      return createDelinkedContent(request)
    default:
      await alertDefault(type, request)
  }
}

module.exports = {
  generateContent
}
