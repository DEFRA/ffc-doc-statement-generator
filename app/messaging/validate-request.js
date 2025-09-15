const statementSchema = require('./schemas/statement')
const scheduleSchema = require('./schemas/schedule')
const sfi23QuarterlyStatementSchema = require('./schemas/sfi-23-quarterly-statement')
const delinkedStatementSchema = require('./schemas/delinked-statement')
const { VALIDATION } = require('../errors')
const { STATEMENT, SCHEDULE, SFI23QUARTERLYSTATEMENT, SFI23ADVANCEDSTATEMENT, DELINKED } = require('../constants/document-types')
const { DATA_PUBLISHING_ERROR } = require('../constants/alerts')
const { dataProcessingAlert } = require('../messaging/processing-alerts')

const alertDefault = async (type, request) => {
  const payloadType = type?.id ?? request?.type
  const prettyName = type?.name ?? request?.type ?? 'unknown type'

  const alertPayload = {
    process: 'validate-request',
    type: payloadType,
    sbi: request?.sbi,
    scheme: request?.scheme,
    message: `Failed to generate content for ${prettyName}`
  }

  await dataProcessingAlert(alertPayload, DATA_PUBLISHING_ERROR)
  throw new Error(`Unknown request type: ${prettyName}`)
}

const validateRequest = async (request, type) => {
  let validationResult
  switch (type) {
    case STATEMENT:
    case SFI23ADVANCEDSTATEMENT:
      validationResult = statementSchema.validate(request, { abortEarly: false, allowUnknown: true })
      break
    case SCHEDULE:
      validationResult = scheduleSchema.validate(request, { abortEarly: false, allowUnknown: true })
      break
    case SFI23QUARTERLYSTATEMENT:
      validationResult = sfi23QuarterlyStatementSchema.validate(request, { abortEarly: false, allowUnknown: true })
      break
    case DELINKED:
      validationResult = delinkedStatementSchema.validate(request, { abortEarly: false, allowUnknown: true })
      break
    default:
      await alertDefault(type, request)
  }

  const buildValidationMessage = (joiError) => {
    if (!joiError) {
      return undefined
    }

    if (Array.isArray(joiError.details) && joiError.details.length) {
      return joiError.details.map(d => d.message).join('; ')
    }

    if (typeof joiError.message === 'string' && joiError.message.trim().length) {
      return joiError.message
    }
    try {
      return JSON.stringify(joiError)
    } catch (err) {
      console.error('Error stringifying joiError:', err)
      return 'Validation failed'
    }
  }

  if (validationResult?.error) {
    const prettyName = type?.name ?? request?.type ?? 'unknown type'
    const error = new Error(`Request content is invalid for ${prettyName}, ${validationResult.error.message}`)
    error.category = VALIDATION
    const payloadType = type?.id ?? request?.type

    const combinedMessage = buildValidationMessage(validationResult.error)

    const alertPayload = {
      process: 'validate-request',
      type: payloadType,
      sbi: request?.sbi,
      scheme: request?.scheme,
      message: combinedMessage ?? `Failed to generate content for ${prettyName}`
    }
    await dataProcessingAlert(alertPayload, DATA_PUBLISHING_ERROR)
    throw error
  }
}

module.exports = {
  validateRequest
}
