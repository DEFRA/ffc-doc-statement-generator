const Joi = require('joi')
const { PRODUCTION } = require('./environments')

const mqSchema = Joi.object({
  messageQueue: {
    host: Joi.string(),
    username: Joi.string(),
    password: Joi.string(),
    useCredentialChain: Joi.bool().default(false),
    appInsights: Joi.object()
  },
  statementSubscription: {
    address: Joi.string(),
    topic: Joi.string(),
    type: Joi.string().default('subscription')
  },
  publishTopic: {
    address: Joi.string()
  },
  crmTopic: {
    address: Joi.string()
  }
})

const mqConfig = {
  messageQueue: {
    host: process.env.MESSAGE_QUEUE_HOST,
    username: process.env.MESSAGE_QUEUE_USER,
    password: process.env.MESSAGE_QUEUE_PASSWORD,
    useCredentialChain: process.env.NODE_ENV === PRODUCTION,
    appInsights: process.env.NODE_ENV === PRODUCTION ? require('applicationinsights') : undefined
  },
  statementSubscription: {
    address: process.env.STATEMENT_SUBSCRIPTION_ADDRESS,
    topic: process.env.STATEMENT_TOPIC_ADDRESS,
    type: 'subscription'
  },
  publishTopic: {
    address: process.env.PUBLISH_TOPIC_ADDRESS
  },
  crmTopic: {
    address: process.env.CRM_TOPIC_ADDRESS
  }
}

const mqResult = mqSchema.validate(mqConfig, {
  abortEarly: false
})

// Throw if config is invalid
if (mqResult.error) {
  throw new Error(`The message queue config is invalid. ${mqResult.error.message}`)
}

const statementSubscription = { ...mqResult.value.messageQueue, ...mqResult.value.statementSubscription }
const publishTopic = { ...mqResult.value.messageQueue, ...mqResult.value.publishTopic }
const crmTopic = { ...mqResult.value.messageQueue, ...mqResult.value.crmTopic }

module.exports = {
  statementSubscription,
  publishTopic,
  crmTopic
}
