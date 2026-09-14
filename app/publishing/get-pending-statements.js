const { outbox } = require('../data')
const { setStartProcessing } = require('./set-start-processing')

const minutesToGoBack = 15
const secondsInMinute = 60
const millisecondsInSecond = 1000
const publishingLimit = 500

const getPendingStatements = async () => {
  const startProcessingLag = new Date(Date.now() - minutesToGoBack * secondsInMinute * millisecondsInSecond)
  const pendingStatements = await outbox()
    .whereNull('published')
    .where(function () {
      this.whereNull('startProcessing')
        .orWhere('startProcessing', '<', startProcessingLag)
    })
    .limit(publishingLimit)
    .forUpdate()

  await setStartProcessing(pendingStatements)

  return pendingStatements
}

module.exports = {
  getPendingStatements
}
