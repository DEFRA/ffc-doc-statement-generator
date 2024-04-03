const moment = require('moment')
const rpaLogo = require('../rpa-logo')
const getAddress = require('../get-address')

const summary = (sfi23QuarterlyStatement) => {
  moment.locale('en-gb')
  return {
    stack: [
      rpaLogo(),
      getAddress(sfi23QuarterlyStatement.businessName, sfi23QuarterlyStatement.address),
      '\n\n\n',
      { text: [{ text: 'Single Business Identifier (SBI): ', bold: true, lineBreak : false }, `${ sfi23QuarterlyStatement.sbi }`] },
      { text: [{ text: 'Business name: ', bold: true, lineBreak : false }, `${ sfi23QuarterlyStatement.businessName }`] },
      { text: [{ text: 'Statement date: ', bold: true, lineBreak : false }, `${ moment(sfi23QuarterlyStatement.transactionDate).format('LL') }`] },
      '\n'
    ],
    unbreakable: true
  }
}

module.exports = summary



