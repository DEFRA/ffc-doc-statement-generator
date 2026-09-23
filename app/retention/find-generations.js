const { generations } = require('../database')

// #>> yields text, so frn must be bound as text: there is no text = bigint operator
const findGenerations = async (queryable, agreementNumber, frn) => {
  return generations(queryable)
    .select('generationId', 'documentReference', 'filename')
    .whereRaw('"statementData" #>> \'{applicationId}\' = ?', [String(agreementNumber)])
    .whereRaw('"statementData" #>> \'{frn}\' = ?', [String(frn)])
}

module.exports = {
  findGenerations
}
