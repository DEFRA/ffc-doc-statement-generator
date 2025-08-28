const db = require('../data')

const getGenerationById = async (generationId) => {
  return db.generation.findOne({
    where: {
      generationId
    },
    raw: true
  })
}

module.exports = getGenerationById
