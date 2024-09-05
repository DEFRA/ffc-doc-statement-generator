const moment = require('moment')
const config = require('../../../../config')
const toCurrencyString = require('../../../to-currency-string')

const getPaymentSummary = (sfi23QuarterlyStatement) => {
  moment.locale('en-gb')
  const paymentSummary = [{ text: 'What you\'ve been paid', style: 'tableHeader2' }]
  if (config.showSfi23PaymentPeriod) {
    paymentSummary.push({ text: [{ text: 'Period: ', bold: true, lineBreak: false }, `${sfi23QuarterlyStatement.paymentPeriod}`] })
  }

  paymentSummary.push({ text: [{ text: 'Payment: ', bold: true, lineBreak: false }, `${toCurrencyString(sfi23QuarterlyStatement.paymentAmount).toString()}`] })
  paymentSummary.push({ text: `This is usually paid into your account within 2 working days of ${moment(sfi23QuarterlyStatement.transactionDate).format('LL')}.` })
  paymentSummary.push({ text: [{ text: 'Payment reference: ', bold: true, lineBreak: false }, `${sfi23QuarterlyStatement.paymentReference}`] })

  return paymentSummary
}

module.exports = getPaymentSummary
