const db = require('../data')

const removeOutbox = async (generationIds, transaction) => {
  await db.outbox.destroy({
    where: {
      generationId: {
        [db.Sequelize.Op.in]: generationIds
      }
    },
    transaction
  })
}

module.exports = {
  removeOutbox
}
