const moment = require('moment')
const toCurrencyString = require('../../../to-currency-string')
const zeroMargin = 0
const fiveMargin = 5
const fifteenMargin = 15

const getPaymentSummary = (delinkedStatement) => {
  moment.locale('en-gb')
  const paymentSummary = [{ text: 'What you\'ve been paid', style: 'tableHeader2', margin: [zeroMargin, fiveMargin, zeroMargin, zeroMargin] }]
  paymentSummary.push({ text: [{ text: 'Payment amount: ', bold: true, lineBreak: false, style: 'separator' }, `${toCurrencyString(delinkedStatement.paymentAmount).toString()}`], margin: [zeroMargin, fifteenMargin, zeroMargin, fiveMargin] })
  paymentSummary.push({ text: `This is usually paid into your account within 2 working days of ${moment(delinkedStatement.transactionDate).format('LL')}.`, margin: [zeroMargin, fiveMargin, zeroMargin, fiveMargin] })
  paymentSummary.push({ text: [{ text: 'Payment reference: ', bold: true, lineBreak: false }, `${delinkedStatement.paymentReference}`], margin: [zeroMargin, fiveMargin, zeroMargin, fiveMargin] })

  return paymentSummary
}

module.exports = getPaymentSummary
