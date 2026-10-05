const { outbox } = require('../database')
const { setStartProcessing } = require('./set-start-processing')

const minutesToGoBack = 15
const secondsInMinute = 60
const millisecondsInSecond = 1000
const publishingLimit = 500

const getPendingStatements = async () => {
<<<<<<< HEAD
  const startProcessingLag = new Date(Date.now() - minutesToGoBack * secondsInMinute * millisecondsInSecond)
  const pendingStatements = await outbox()
    .whereNull('published')
    .where(function () {
      this.whereNull('startProcessing')
        .orWhere('startProcessing', '<', startProcessingLag)
    })
    .limit(publishingLimit)
    .forUpdate()
=======
  return db.sequelize.transaction(async (transaction) => {
    const startProcessingLag = new Date(Date.now() - minutesToGoBack * secondsInMinute * millisecondsInSecond)
    const pendingStatements = await db.outbox.findAll({
      where: {
        published: null,
        [db.Sequelize.Op.or]: [
          { startProcessing: null },
          { startProcessing: { [db.Sequelize.Op.lt]: startProcessingLag } }
        ]
      },
      limit: publishingLimit,
      lock: true,
      transaction
    })
>>>>>>> 3b4d595 (wrap lock in transaction (#117))

    await setStartProcessing(pendingStatements, transaction)

    return pendingStatements
  })
}

module.exports = {
  getPendingStatements
}
