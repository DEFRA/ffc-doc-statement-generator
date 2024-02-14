const statementSchema = require('./schemas/statement')
const scheduleSchema = require('./schemas/schedule')
const { VALIDATION } = require('../errors')
const { STATEMENT, SCHEDULE } = require('../constants/document-types')

const validateRequest = (request, type) => {
  let validationResult
  switch (type) {
    case STATEMENT:
      validationResult = statementSchema.validate(request, { abortEarly: false, allowUnknown: true })
      break
    case SCHEDULE:
      validationResult = scheduleSchema.validate(request, { abortEarly: false, allowUnknown: true })
      break
    default:
      throw new Error(`Unknown request type: ${type}`)
  }
  if (validationResult.error) {
    const error = new Error(`Request content is invalid for ${type}, ${validationResult.error.message}`)
    error.category = VALIDATION
    throw error
  }
}

module.exports = {
  validateRequest
}
