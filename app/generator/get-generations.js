const db = require('../data')

const getGenerations = async (documentReference) => {
  return db.generation.findOne({
    where: {
      [db.Sequelize.Op.and]: [{ documentReference }, {
        documentReference: {
          [db.Sequelize.Op.ne]: null
        }
      }]
    }
  })
}

module.exports = getGenerations
