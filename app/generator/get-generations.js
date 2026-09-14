const { generations } = require('../data')

const getGenerations = async (documentReference) => {
  return generations()
    .where({ documentReference })
    .whereNotNull('documentReference')
    .first()
}

module.exports = getGenerations
