const db = require('../database')
const { setStartProcessing } = require('./set-start-processing')

const minutesToGoBack = 15
const secondsInMinute = 60
const millisecondsInSecond = 1000
const publishingLimit = 500

const getPendingStatements = async () => {
  return db.transaction(async (trx) => {
    const startProcessingLag = new Date(Date.now() - minutesToGoBack * secondsInMinute * millisecondsInSecond)
    const pendingStatements = await db.outbox(trx)
      .whereNull('published')
      .where(function () {
        this.whereNull('startProcessing')
          .orWhere('startProcessing', '<', startProcessingLag)
      })
      .limit(publishingLimit)
      .forUpdate()

    await setStartProcessing(pendingStatements, trx)

    return pendingStatements
  })
}

module.exports = {
  getPendingStatements
}
