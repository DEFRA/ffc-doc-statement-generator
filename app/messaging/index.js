const { MessageReceiver } = require('ffc-messaging')

const config = require('../config')

const processStatementMessage = require('./process-statement-message')
const { processRetentionMessage } = require('./process-retention-message')

let statementReceiver
let retentionReceiver

const start = async () => {
  const action = message => processStatementMessage(message, statementReceiver)
  statementReceiver = new MessageReceiver(config.statementSubscription, action)
  await statementReceiver.subscribe()
  console.info('Ready to generate payment statements')

  const retentionAction = message => processRetentionMessage(message, retentionReceiver)
  retentionReceiver = new MessageReceiver(config.retentionSubscription, retentionAction)
  await retentionReceiver.subscribe()
  console.info('Retention receiver ready')
}

const stop = async () => {
  await statementReceiver.closeConnection()
  await retentionReceiver.closeConnection()
}

module.exports = { start, stop }
