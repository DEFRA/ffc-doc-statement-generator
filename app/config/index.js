const Joi = require('joi')
const mqConfig = require('./message')
const dbConfig = require('./database')
const storageConfig = require('./storage')

const { DEVELOPMENT, TEST, PRODUCTION } = require('./environments')

const schema = Joi.object({
  env: Joi.string().valid(DEVELOPMENT, TEST, PRODUCTION).default(DEVELOPMENT),
  statementReceiverApiVersion: Joi.string().required(),
  statementReceiverEndpoint: Joi.string().required(),
  schedulesArePublished: Joi.boolean().required().default(false),
  showSfi23PaymentPeriod: Joi.boolean().optional().default(false),
  SFI23QUARTERLYSTATEMENT_ENABLED: Joi.string().valid('true', 'false').default('false'),
  SCHEDULE_ENABLED: Joi.string().valid('true', 'false').default('false'),
  SEND_CRM_MESSAGE_ENABLED: Joi.string().valid('true', 'false').default('false'),
  SAVE_LOG_ENABLED: Joi.string().valid('true', 'false').default('false')
})

const config = {
  env: process.env.NODE_ENV,
  statementReceiverApiVersion: process.env.STATEMENT_RECEIVER_API_VERSION,
  statementReceiverEndpoint: process.env.STATEMENT_RECEIVER_ENDPOINT,
  schedulesArePublished: process.env.SCHEDULES_ARE_PUBLISHED,
  showSfi23PaymentPeriod: process.env.SHOW_SFI_23_PAYMENT_PERIOD,
  SFI23QUARTERLYSTATEMENT_ENABLED: process.env.SFI23QUARTERLYSTATEMENT_ENABLED || 'false',
  SCHEDULE_ENABLED: process.env.SCHEDULE_ENABLED || 'false',
  SEND_CRM_MESSAGE_ENABLED: process.env.SEND_CRM_MESSAGE_ENABLED || 'false',
  SAVE_LOG_ENABLED: process.env.SAVE_LOG_ENABLED || 'false'
}

const result = schema.validate(config, {
  abortEarly: false
})

if (result.error) {
  throw new Error(`The server config is invalid. ${result.error.message}`)
}

const value = result.value

value.isDev = value.env === DEVELOPMENT
value.isTest = value.env === TEST
value.isProd = value.env === PRODUCTION
value.statementSubscription = mqConfig.statementSubscription
value.publishTopic = mqConfig.publishTopic
value.crmTopic = mqConfig.crmTopic
value.dbConfig = dbConfig
value.storageConfig = storageConfig
value.SFI23QUARTERLYSTATEMENT_ENABLED = value.SFI23QUARTERLYSTATEMENT_ENABLED === 'true'
value.SCHEDULE_ENABLED = value.SCHEDULE_ENABLED === 'true'
value.SEND_CRM_MESSAGE_ENABLED = value.SEND_CRM_MESSAGE_ENABLED === 'true'
value.SAVE_LOG_ENABLED = value.SAVE_LOG_ENABLED === 'true'

module.exports = value
