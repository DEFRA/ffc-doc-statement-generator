const moment = require('moment')

const part1 = (sfi23QuarterlyStatement) => {
  moment.locale('en-gb')
  return {
    stack: [
      { text: `${sfi23QuarterlyStatement.scheme.name} (${sfi23QuarterlyStatement.scheme.shortName}) ${sfi23QuarterlyStatement.scheme.year} agreement: quarterly payment statement `, style: 'header1' },
      { text: `This statement explains your quarterly payment for your ${sfi23QuarterlyStatement.scheme.shortName} ${sfi23QuarterlyStatement.scheme.year} agreement.` },
      { text: `Your ${sfi23QuarterlyStatement.scheme.shortName} ${sfi23QuarterlyStatement.scheme.year} agreement`, style: 'header2' },
      { text: [{ text: 'Agreement number: ', bold: true, lineBreak : false }, `${ sfi23QuarterlyStatement.agreementNumber }`] },
      { text: [{ text: 'Start date: ', bold: true, lineBreak : false }, `${ moment(sfi23QuarterlyStatement.agreementStart).format('LL') }`] },
      { text: [{ text: 'End date: ', bold: true, lineBreak : false }, `${ moment(sfi23QuarterlyStatement.agreementEnd).format('LL') }`] }
    ],
    unbreakable: true
  }
}

module.exports = part1
