const db = require('../data')

const setPublished = async (publishedStatementId, sentToNotify) => {
  await db.publishedStatement.update({
    published: new Date(),
    sentToNotify
  }, {
    where: {
      publishedStatementId
    }
  })
}

module.exports = {
  setPublished
}
