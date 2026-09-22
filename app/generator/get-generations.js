const { generations } = require('../database')

const getGenerations = async (documentReference) => {
  return generations()
    .where({ documentReference })
    .whereNotNull('documentReference')
    .first()
}

module.exports = getGenerations
