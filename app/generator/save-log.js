const db = require('../data')

const saveLog = async (statementData, filename, dateGenerated) => {
  await db.generation.create({ statementData, filename, dateGenerated })
}

module.exports = saveLog
