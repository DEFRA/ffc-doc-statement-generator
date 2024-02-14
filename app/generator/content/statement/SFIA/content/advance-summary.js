const rpaLogo = require('../../../rpa-logo')
const getBusinessName = require('./get-business-name')
const getSBI = require('./get-sbi')
const getAgreementNumber = require('./get-agreement-number')

const summary = (document) => {
  return {
    stack: [
      rpaLogo(),
      getSBI(document.sbi),
      getBusinessName(document.businessName),
      getAgreementNumber(document.scheme.agreementNumber),
      { text: 'Our ref: SFI 23 Accelerated payment v1.0' },
      '\n',
      { text: 'Dear Sir / Madam' }
    ]
  }
}

module.exports = summary
