const db = require('../data')

const findGenerations = async (agreementNumber, frn, transaction) => {
  return db.generation.findAll({
    attributes: ['generationId', 'documentReference', 'filename'],
    where: {
      [db.Sequelize.Op.and]: [
        db.Sequelize.where(db.sequelize.json('statementData.applicationId'), agreementNumber),
        db.Sequelize.where(db.sequelize.json('statementData.frn'), frn)
      ]
    },
    transaction
  })
}

module.exports = {
  findGenerations
}
