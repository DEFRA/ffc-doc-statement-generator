const { generations } = require('../database')

const getGenerationById = async (generationId) => {
  return await generations()
    .where({ generationId })
    .first() ?? null
}

module.exports = getGenerationById
