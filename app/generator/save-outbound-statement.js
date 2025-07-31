const db = require('../data')

const saveOutboundStatement = async (statement, filename, type) => {
  await db.publishedStatement.create({
    statement,
    filename,
    type
  })
}

module.exports = {
  saveOutboundStatement
}
