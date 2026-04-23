const db = require('../data')

const findGenerations = async (agreementNumber, frn, transaction) => {
  return db.generation.findAll({
    attributes: ['generationId'],
    where: {
      [db.sequelize.Op.and]: [
        db.sequelize.where(db.sequelize.json('statementData.applicationId'), agreementNumber),
        db.sequelize.where(db.sequelize.json('statementData.frn'), frn)
      ]
    },
    transaction
  })
}

module.exports = {
  findGenerations
}
