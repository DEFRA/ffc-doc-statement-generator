const db = require('../data')

const saveLog = async (statementData, filename, dateGenerated) => {
  const { documentReference: documentRef, ...data } = statementData

  await db.generation.create({
    statementData: data,
    documentReference: documentRef,
    filename,
    dateGenerated
  })
}

module.exports = saveLog
