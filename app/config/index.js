const Joi = require('joi')
const mqConfig = require('./message')
const dbConfig = require('./database')
const storageConfig = require('./storage')

const { DEVELOPMENT, TEST, PRODUCTION } = require('./environments')

const schema = Joi.object({
  env: Joi.string().valid(DEVELOPMENT, TEST, PRODUCTION).default(DEVELOPMENT),
  statementReceiverApiVersion: Joi.string().required(),
  statementReceiverEndpoint: Joi.string().required(),
  schedulesArePublished: Joi.boolean().required().default(false)
})

const config = {
  env: process.env.NODE_ENV,
  statementReceiverApiVersion: process.env.STATEMENT_RECEIVER_API_VERSION,
  statementReceiverEndpoint: process.env.STATEMENT_RECEIVER_ENDPOINT,
  schedulesArePublished: process.env.SCHEDULES_ARE_PUBLISHED
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
