const getAgreementNumber = require('../summary/get-agreement-number')
const getStartDate = require('./start-date')
const getEndDate = require('./end-date')
// const getTable = require('./get-table')

const part2 = (sfi23QuarterlyStatement) => {
  return {
    stack: [
      { text: 'Your SFI 2023 agreement', style: 'header2' },
      getAgreementNumber(sfi23QuarterlyStatement.scheme.agreementNumber),
      getStartDate(sfi23QuarterlyStatement.scheme.startDate),
      getEndDate(sfi23QuarterlyStatement.scheme.endDate)
    ],
    unbreakable: true
  }
}

module.exports = part2
