const toCurrencyString = require('../../../../generator/to-currency-string')
const getPeriod = require('./get-payment-period')
const getPayment = require('./get-payment')
const getPaymentReference = require('./get-payment-reference')

const part2 = (sfi23QuarterlyStatement) => {
  return {
    stack: [
      { text: 'What you\'ve been paid', style: 'header2' },
      getPeriod(sfi23QuarterlyStatement.scheme.paymentPeriod),
      getPayment(toCurrencyString(sfi23QuarterlyStatement.scheme.paymentAmount)),
      { text: 'This is usually paid into your account within 2 working days of 8 April 2024.' },
      getPaymentReference(sfi23QuarterlyStatement.scheme.paymentReference)
    ],
    unbreakable: true
  }
}

module.exports = part2
