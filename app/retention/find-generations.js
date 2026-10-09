const { generations } = require('../database')

const findGenerations = async (queryable, agreementNumber, frn) => {
  return generations(queryable)
    .select('generationId', 'documentReference', 'filename')
    .whereRaw('"statementData" #>> \'{applicationId}\' = ?', [String(agreementNumber)])
    .whereRaw('"statementData" #>> \'{frn}\' = ?', [String(frn)])
}

module.exports = {
  findGenerations
}
