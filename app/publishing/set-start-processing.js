const db = require('../data')

const setStartProcessing = async (publishedStatementId, transaction) => {
  await db.publishedStatement.update({
    startProcessing: new Date()
  }, {
    where: {
      publishedStatementId
    }
  },
  {
    transaction
  })
}

module.exports = {
  setStartProcessing
}
