const { outbox } = require('../database')

const setStartProcessing = async (pendingStatements, transaction) => {
  const outboxIds = pendingStatements.map(statement => statement.outboxId)
<<<<<<< HEAD
  await outbox()
    .whereIn('outboxId', outboxIds)
    .update({ startProcessing: new Date() })
=======
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
>>>>>>> 3b4d595 (wrap lock in transaction (#117))
}

module.exports = {
  setStartProcessing
}
