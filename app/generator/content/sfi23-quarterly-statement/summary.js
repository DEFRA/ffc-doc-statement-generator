const rpaLogo = require('../rpa-logo')
const getAddress = require('../get-address')
const getSBI = require('../summary/get-sbi')
const getBusinessName = require('../get-business-name')
const getStatementDate = require('./get-statement-date')

const summary = (sfi23QuarterlyStatement) => {
  return {
    stack: [
      rpaLogo(),
      getAddress(sfi23QuarterlyStatement.businessName, sfi23QuarterlyStatement.address),
      getSBI(sfi23QuarterlyStatement.sbi),
      getBusinessName(sfi23QuarterlyStatement.businessName),
      getStatementDate(sfi23QuarterlyStatement.scheme.transactionDate),
      '\n\n'
    ],
    unbreakable: true
  }
}

module.exports = summary
