const db = require('../data')

const setStartProcessing = async (pendingStatements) => {
  const outboxIds = pendingStatements.map(statement => statement.outboxId)
  await db.outbox.update({
    startProcessing: new Date()
  }, {
    where: {
      outboxId: {
        [db.Sequelize.Op.in]: outboxIds
      }
    }
  })
}

module.exports = {
  setStartProcessing
}
