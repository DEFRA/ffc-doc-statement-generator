const db = require('../data')

const removeGenerations = async (generationIds, transaction) => {
  await db.generation.destroy({
    where: {
      generationId: {
        [db.Sequelize.Op.in]: generationIds
      }
    },
    transaction
  })
}

module.exports = {
  removeGenerations
}
