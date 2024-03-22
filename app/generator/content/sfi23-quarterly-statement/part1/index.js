const getAgreementNumber = require('../../summary/get-agreement-number')
const getStartDate = require('../start-date')
const getEndDate = require('../end-date')

const part1 = (sfi23QuarterlyStatement) => {
  return {
    stack: [
      { text: `${sfi23QuarterlyStatement.scheme.name} (${sfi23QuarterlyStatement.scheme.shortName}) agreement: quarterly payment statement `, style: 'header3' },
      { text: 'This statement explains your quarterly payment for your SFI 2023 agreement.' },
      { text: 'Your SFI 2023 agreement', style: 'header2' },
      getAgreementNumber(sfi23QuarterlyStatement.scheme.agreementNumber),
      getStartDate(sfi23QuarterlyStatement.scheme.startDate),
      getEndDate(sfi23QuarterlyStatement.scheme.endDate)
    ],
    unbreakable: true
  }
}

module.exports = part1
