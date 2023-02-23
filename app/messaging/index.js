const config = require('../config')
const processStatementMessage = require('./process-statement-message')
const { MessageReceiver } = require('ffc-messaging')
let statementReceiver

const start = async () => {
  const statementAction = message => processStatementMessage(message, statementReceiver)
  statementReceiver = new MessageReceiver(config.statementSubscription, statementAction)
  await statementReceiver.subscribe()

  console.info('Ready to generate payment statements')
}

const stop = async () => {
  await statementReceiver.closeConnection()
}

module.exports = { start, stop }
