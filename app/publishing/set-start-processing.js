const db = require('../data')

const setStartProcessing = async (pendingStatements, transaction) => {
  const pendingStatementIds = pendingStatements.map(statement => statement.publishedStatementId)
  await db.publishedStatement.update({
    startProcessing: new Date()
  }, {
    where: {
      publishedStatementId: {
        [db.Sequelize.Op.in]: pendingStatementIds
      }
    },
    transaction
  })
}

module.exports = {
  setStartProcessing
}
