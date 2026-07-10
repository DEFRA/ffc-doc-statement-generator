const db = require('../data')
const { setStartProcessing } = require('./set-start-processing')

const minutesToGoBack = 15
const secondsInMinute = 60
const millisecondsInSecond = 1000
const publishingLimit = 500

const getPendingStatements = async () => {
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
    lock: true
  })

  await setStartProcessing(pendingStatements)

  return pendingStatements
}

module.exports = {
  getPendingStatements
}
