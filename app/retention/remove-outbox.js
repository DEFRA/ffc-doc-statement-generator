const { outbox } = require('../database')

const removeOutbox = async (queryable, generationIds) => {
  await outbox(queryable)
    .whereIn('generationId', generationIds)
    .del()
}

module.exports = {
  removeOutbox
}
