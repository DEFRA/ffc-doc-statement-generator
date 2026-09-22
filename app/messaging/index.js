const config = require('../config')
const { createServiceBusClient, createReceiver, subscribeReceiver, closeSenders } = require('./service-bus')
const processStatementMessage = require('./process-statement-message')
const { processRetentionMessage } = require('./process-retention-message')
const errorHandler = (error) => {
  console.error('Error occurred:', error)
}

let sbClient
let statementReceiver
let retentionReceiver

const start = async () => {
  sbClient = createServiceBusClient(config.statementSubscription)
  statementReceiver = createReceiver(sbClient, config.statementSubscription)
  await subscribeReceiver(statementReceiver, processStatementMessage, errorHandler, config.statementSubscription)
  console.info('Ready to generate payment statements')

  retentionReceiver = createReceiver(sbClient, config.retentionSubscription)
  await subscribeReceiver(retentionReceiver, processRetentionMessage, errorHandler, config.retentionSubscription)
  console.info('Retention receiver ready')
}

const stop = async () => {
  await closeSenders()
  if (statementReceiver) {
    await statementReceiver.close()
    statementReceiver = null
  }
  if (retentionReceiver) {
    await retentionReceiver.close()
    retentionReceiver = null
  }
  if (sbClient) {
    try {
      await sbClient.close()
    } catch (error) {
      console.error('Error closing Service Bus client:', error)
    }
    sbClient = null
  }
}

module.exports = { start, stop }
