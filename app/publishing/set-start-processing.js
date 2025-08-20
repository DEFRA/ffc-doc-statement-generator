const db = require('../data')

const setStartProcessing = async (publishedStatementId) => {
  await db.publishedStatement.update({
    startProcessing: new Date()
  }, {
    where: {
      publishedStatementId
    }
  })
}

module.exports = {
  setStartProcessing
}
