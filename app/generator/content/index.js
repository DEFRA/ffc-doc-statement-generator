const { createContent: createStatementContent } = require('./statement')
const { createContent: createScheduleContent } = require('./schedule')
const { STATEMENT, SCHEDULE } = require('../../constants/document-types')

const generateContent = (request, type) => {
  switch (type) {
    case STATEMENT:
      return createStatementContent(request)
    case SCHEDULE:
      return createScheduleContent(request)
    default:
      throw new Error(`Unknown request type: ${type}`)
  }
}

module.exports = {
  generateContent
}
