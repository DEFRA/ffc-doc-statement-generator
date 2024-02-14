const rpaLogo = require('../rpa-logo')
const getAddress = require('../get-address')
const getBusinessName = require('../get-business-name')
const getSBI = require('./get-sbi')
const getAgreementNumber = require('./get-agreement-number')

const summary = (document) => {
  return {
    stack: [
      rpaLogo(),
      getAddress(document.businessName, document.address),
      getSBI(document.sbi),
      getBusinessName(document.businessName),
      getAgreementNumber(document.scheme.agreementNumber),
      '\n\n'
    ],
    unbreakable: true
  }
}

module.exports = summary
