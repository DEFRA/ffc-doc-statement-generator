const schema = require('./schema')
const delinkedSchema = require('./delinked-schema')
const dataProcessingAlert = require('../processing-alerts')
const { PUBLISH_ERROR } = require('../../constants/alerts')

const validatePublish = async (publish, type) => {
  let result
  if (type === 'delinked-statement') {
    result = delinkedSchema.validate(publish, { abortEarly: false })
  } else {
    result = schema.validate(publish, { abortEarly: false })
  }

  if (result.error) {
    const alertPayload = {
      process: 'validatePublish',
      type,
      sbi: publish?.sbi,
      documentReference: publish?.documentReference,
      scheme: publish?.scheme,
      error: result.error,
      message: result.error?.message ?? `unable to validate ${type} publish data`
    }

    try {
      await dataProcessingAlert(alertPayload, PUBLISH_ERROR)
    } catch (alertErr) {
      console.error(`${type} does not have the required details: ${result.error?.message}`, {
        originalError: result.error?.message,
        alertError: alertErr?.message ?? alertErr
      })
    }
    throw new Error(`${type} does not have the required details: ${result.error?.message}`)
  }

  return result.value
}

module.exports = {
  validatePublish
}
