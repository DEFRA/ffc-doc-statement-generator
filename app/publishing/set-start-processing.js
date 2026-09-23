const { outbox } = require('../database')

const setStartProcessing = async (pendingStatements) => {
  const outboxIds = pendingStatements.map(statement => statement.outboxId)
  await outbox()
    .whereIn('outboxId', outboxIds)
    .update({ startProcessing: new Date() })
}

module.exports = {
  setStartProcessing
}
