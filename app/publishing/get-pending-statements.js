const db = require('../data')

const minutesToGoBack = 5
const secondsInMinute = 60
const millisecondsInSecond = 1000
const publishingLimit = 500

const getPendingStatements = async (transaction) => {
  const fiveMinutesAgo = new Date(Date.now() - minutesToGoBack * secondsInMinute * millisecondsInSecond)
  return db.publishedStatement.findAll({
    where: {
      published: null,
      [db.sequelize.Op.or]: [
        { startProcessing: null },
        { startProcessing: { [db.sequelize.Op.lt]: fiveMinutesAgo } }
      ]
    },
    limit: publishingLimit,
    lock: transaction ? transaction.LOCK.UPDATE : undefined,
    transaction
  })
}

module.exports = {
  getPendingStatements
}
