const { generations } = require('../data')

// #>> extracts JSON as text, so both operands are bound as text. The Sequelize
// equivalent inlined frn as a bare number, which PostgreSQL rejected — there is
// no text = bigint operator. See PR description.
const findGenerations = async (queryable, agreementNumber, frn) => {
  return generations(queryable)
    .select('generationId', 'documentReference', 'filename')
    .whereRaw('"statementData" #>> \'{applicationId}\' = ?', [String(agreementNumber)])
    .whereRaw('"statementData" #>> \'{frn}\' = ?', [String(frn)])
}

module.exports = {
  findGenerations
}
