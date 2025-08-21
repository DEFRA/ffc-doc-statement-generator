const db = require('../data')

const setPublished = async (publishedStatementId, sentToPublisher) => {
  await db.publishedStatement.update({
    published: new Date(),
    sentToPublisher
  }, {
    where: {
      publishedStatementId
    }
  })
}

module.exports = {
  setPublished
}
