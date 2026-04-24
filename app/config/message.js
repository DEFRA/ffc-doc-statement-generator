const Joi = require('joi')
const { PRODUCTION } = require('./environments')

const mqSchema = Joi.object({
  messageQueue: {
    host: Joi.string(),
    username: Joi.string(),
    password: Joi.string(),
    useCredentialChain: Joi.bool().default(false),
    appInsights: Joi.object(),
    managedIdentityClientId: Joi.string().optional()
  },
  statementSubscription: {
    address: Joi.string(),
    topic: Joi.string(),
    type: Joi.string().default('subscription')
  },
  retentionSubscription: {
    address: Joi.string().required(),
    topic: Joi.string().required(),
    type: Joi.string().default('subscription')
  },
  statementRetentionTopic: {
    address: Joi.string()
  },
  publishTopic: {
    address: Joi.string()
  },
  crmTopic: {
    address: Joi.string()
  },
  alertTopic: {
    address: Joi.string()
  }
})

const mqConfig = {
  messageQueue: {
    host: process.env.MESSAGE_QUEUE_HOST,
    username: process.env.MESSAGE_QUEUE_USER,
    password: process.env.MESSAGE_QUEUE_PASSWORD,
    useCredentialChain: process.env.NODE_ENV === PRODUCTION,
    appInsights: process.env.NODE_ENV === PRODUCTION ? require('applicationinsights') : undefined,
    managedIdentityClientId: process.env.AZURE_CLIENT_ID
  },
  statementSubscription: {
    address: process.env.STATEMENT_SUBSCRIPTION_ADDRESS,
    topic: process.env.STATEMENT_TOPIC_ADDRESS,
    type: 'subscription'
  },
  retentionSubscription: {
    address: process.env.RETENTION_SUBSCRIPTION_ADDRESS,
    topic: process.env.RETENTION_TOPIC_ADDRESS,
    type: 'subscription'
  },
  statementRetentionTopic: {
    address: process.env.STATEMENT_RETENTION_TOPIC_ADDRESS
  },
  publishTopic: {
    address: process.env.PUBLISH_TOPIC_ADDRESS
  },
  crmTopic: {
    address: process.env.CRM_TOPIC_ADDRESS
  },
  alertTopic: {
    address: process.env.ALERT_TOPIC_ADDRESS
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
const retentionSubscription = { ...mqResult.value.messageQueue, ...mqResult.value.retentionSubscription }
const statementRetentionTopic = { ...mqResult.value.messageQueue, ...mqResult.value.statementRetentionTopic }
const publishTopic = { ...mqResult.value.messageQueue, ...mqResult.value.publishTopic }
const crmTopic = { ...mqResult.value.messageQueue, ...mqResult.value.crmTopic }
const alertTopic = { ...mqResult.value.messageQueue, ...mqResult.value.alertTopic }

module.exports = {
  statementSubscription,
  retentionSubscription,
  statementRetentionTopic,
  publishTopic,
  crmTopic,
  alertTopic
}
