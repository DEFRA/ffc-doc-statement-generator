const Joi = require('joi')
const mqConfig = require('./message')
const dbConfig = require('./database')
const storageConfig = require('./storage')

const { DEVELOPMENT, TEST, PRODUCTION } = require('./environments')

const schema = Joi.object({
  env: Joi.string().valid(DEVELOPMENT, TEST, PRODUCTION).default(DEVELOPMENT),
  statementReceiverApiVersion: Joi.string().required(),
  statementReceiverEndpoint: Joi.string().required(),
  showSfi23PaymentPeriod: Joi.boolean().optional().default(false),
  sfi23QuarterlyStatementEnabled: Joi.boolean().optional().default(false),
  delinkedGenerateStatementEnabled: Joi.boolean().optional().default(true),
  sendCrmMessageEnabled: Joi.boolean().optional().default(false),
  publishingFrequency: Joi.number().default(60000),
  pollWindow: Joi.object({
    start: Joi.string().default('00:00'),
    end: Joi.string().default('23:59'),
    days: Joi.array().items(
      Joi.string().valid('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat')
    ).default(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'])
  }).default({ start: '00:00', end: '23:59', days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] })
})

const config = {
  env: process.env.NODE_ENV,
  statementReceiverApiVersion: process.env.STATEMENT_RECEIVER_API_VERSION,
  statementReceiverEndpoint: process.env.STATEMENT_RECEIVER_ENDPOINT,
  showSfi23PaymentPeriod: process.env.SHOW_SFI_23_PAYMENT_PERIOD,
  sfi23QuarterlyStatementEnabled: process.env.SFI23QUARTERLYSTATEMENT_ENABLED,
  delinkedGenerateStatementEnabled: process.env.DELINKED_GENERATE_STATEMENT_ENABLED,
  sendCrmMessageEnabled: process.env.SEND_CRM_MESSAGE_ENABLED,
  publishingFrequency: process.env.PUBLISHING_FREQUENCY,
  pollWindow: {
    start: process.env.POLL_WINDOW_START,
    end: process.env.POLL_WINDOW_END,
    days: process.env.POLL_WINDOW_DAYS ? process.env.POLL_WINDOW_DAYS.split(',') : undefined
  }
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

module.exports = value
