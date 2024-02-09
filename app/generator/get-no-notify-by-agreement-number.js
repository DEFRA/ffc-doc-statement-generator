const db = require('../data')

const getNoNotifyByAgreementNumber = async (agreementNumber) => {
  return db.noNotify.findOne({
    attributes: [
      'agreementNumber'
    ],
    where: {
      agreementNumber
    },
    raw: true
  })
}

module.exports = getNoNotifyByAgreementNumber
