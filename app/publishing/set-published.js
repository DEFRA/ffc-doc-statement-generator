const db = require('../data')

const setPublished = async (publishedStatementId, published) => {
  await db.publishedStatement.update({
    processed: new Date(),
    published
  }, {
    where: {
      publishedStatementId
    }
  })
}

module.exports = {
  setPublished
}
