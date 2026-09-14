const { generations } = require('../data')

const getGenerationById = async (generationId) => {
  return await generations()
    .where({ generationId })
    .first() ?? null
}

module.exports = getGenerationById
