const db = require('../data')
const { setStartProcessing } = require('./set-start-processing')

const minutesToGoBack = 5
const secondsInMinute = 60
const millisecondsInSecond = 1000
const publishingLimit = 500

const getPendingStatements = async () => {
  const fiveMinutesAgo = new Date(Date.now() - minutesToGoBack * secondsInMinute * millisecondsInSecond)
  const transaction = await db.sequelize.transaction()
  try {
    const pendingStatements = await db.publishedStatement.findAll({
      where: {
        published: null,
        [db.sequelize.Op.or]: [
          { startProcessing: null },
          { startProcessing: { [db.sequelize.Op.lt]: fiveMinutesAgo } }
        ]
      },
      limit: publishingLimit,
      lock: transaction.LOCK.UPDATE,
      transaction
    })

    await setStartProcessing(pendingStatements, transaction)

    await transaction.commit()

    return pendingStatements
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

module.exports = {
  getPendingStatements
}
