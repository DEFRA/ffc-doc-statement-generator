const db = require('../data')

const setStartProcessing = async (pendingStatements, transaction) => {
  const outboxIds = pendingStatements.map(statement => statement.outboxId)
  await db.outbox.update({
    startProcessing: new Date()
  }, {
    where: {
      outboxId: {
        [db.Sequelize.Op.in]: outboxIds
      }
    },
    transaction
  })
}

module.exports = {
  setStartProcessing
}
