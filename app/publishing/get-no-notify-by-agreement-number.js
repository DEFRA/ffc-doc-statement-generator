const { noNotifys } = require('../database')

const getNoNotifyByAgreementNumber = async (agreementNumber) => {
  return await noNotifys()
    .select('agreementNumber')
    .where({ agreementNumber })
    .first() ?? null
}

module.exports = getNoNotifyByAgreementNumber
