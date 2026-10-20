const { generations } = require('../database')

const removeGenerations = async (queryable, generationIds) => {
  await generations(queryable)
    .whereIn('generationId', generationIds)
    .del()
}

module.exports = {
  removeGenerations
}
