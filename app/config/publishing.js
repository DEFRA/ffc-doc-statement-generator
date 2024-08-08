const Joi = require('joi')

// Define config schema
const schema = Joi.object({
  publishSFI23QuarterlyStatement: Joi.boolean().default(true),
  scheduleEnabled: Joi.boolean().default(true),
  sendCrmMessage: Joi.boolean().default(true),
  saveLogEnabled: Joi.boolean().default(true)
})

const config = {
  publishSFI23QuarterlyStatement: process.env.SFI23QUARTERLYSTATEMENT_ENABLED,
  scheduleEnabled: process.env.SCHEDULE_ENABLED,
  sendCrmMessage: process.env.SEND_CRM_MESSAGE_ENABLED,
  saveLogEnabled: process.env.SAVE_LOG_ENABLED
}

// Validate config
const result = schema.validate(config, {
  abortEarly: false
})

// Throw if config is invalid
if (result.error) {
  throw new Error(`The publishing config is invalid. ${result.error.message}`)
}

module.exports = result.value
