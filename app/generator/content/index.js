const { createContent: createStatementContent } = require('./statement/SFI')
const { createContent: createSFI23AdvancedStatementContent } = require('./statement/SFIA')
const { createContent: createScheduleContent } = require('./schedule')
const { createContent: createSFI23Content } = require('./sfi23-quarterly-statement')
const { STATEMENT, SCHEDULE, SFI23QUARTERLYSTATEMENT, SFI23ADVANCEDSTATEMENT } = require('../../constants/document-types')

const generateContent = (request, type) => {
  switch (type) {
    case STATEMENT:
      return createStatementContent(request)
    case SCHEDULE:
      return createScheduleContent(request)
    case SFI23QUARTERLYSTATEMENT:
      return createSFI23Content(request)
    case SFI23ADVANCEDSTATEMENT:
      return createSFI23AdvancedStatementContent(request)
    default:
      throw new Error(`Unknown request type: ${type}`)
  }
}

module.exports = {
  generateContent
}
