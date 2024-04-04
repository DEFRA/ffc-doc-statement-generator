const moment = require('moment')

const toCurrencyString = require('../../../../generator/to-currency-string')

const part2 = (sfi23QuarterlyStatement) => {
  moment.locale('en-gb')
  return {
    stack: [
      { text: 'What you\'ve been paid', style: 'header2' },
      {
        layout: {
          hLineStyle: () => 'solid',
          vLineStyle: () => 'solid'
        },
        table: {
          widths: ['*'],
          body: [
            [{
              stack: [
                { text: [{ text: 'Period: ', bold: true, lineBreak : false }, `${ sfi23QuarterlyStatement.paymentPeriod }`] },
                { text: [{ text: 'Payment: ', bold: true, lineBreak : false }, `${ toCurrencyString(Math.abs(sfi23QuarterlyStatement.paymentAmount).toFixed(2)) }`] },
                { text: `This is usually paid into your account within 2 working days of ${ moment(sfi23QuarterlyStatement.transactionDate).format('LL') }.` },
                { text: [{ text: 'Payment reference: ', bold: true, lineBreak : false }, `${ sfi23QuarterlyStatement.paymentReference }`] }
              ]
            }]
          ]
        }
      }
    ],
    unbreakable: true
  }
}

module.exports = part2