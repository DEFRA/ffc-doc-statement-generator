const { outbox } = require('../database')

const setStartProcessing = async (pendingStatements, transaction) => {
  const outboxIds = pendingStatements.map(statement => statement.outboxId)
  await outbox(transaction)
    .whereIn('outboxId', outboxIds)
    .update({ startProcessing: new Date() })
}

module.exports = {
  setStartProcessing
}
