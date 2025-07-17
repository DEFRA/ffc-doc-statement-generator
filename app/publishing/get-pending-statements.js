const db = require('../data')

const getPendingStatements = async () => {
  return db.publishedStatement.findAll({
    where: {
      published: null
    }
  })
}

module.exports = {
  getPendingStatements
}
