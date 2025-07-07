const moment = require('moment')
const toCurrencyString = require('../../../to-currency-string')

const getPaymentSummary = (delinkedStatement) => {
  moment.locale('en-gb')
  const paymentSummary = [{ text: '\n What you\'ve been paid \n', style: 'tableHeader2' }]
  paymentSummary.push({ text: [{ text: 'Payment amount: ', bold: true, lineBreak: false, style: 'separator' }, `${toCurrencyString(delinkedStatement.paymentAmount).toString()}`], margin: [0, 10, 0, 5] })
  paymentSummary.push({ text: `This is usually paid into your account within 2 working days of ${moment(delinkedStatement.transactionDate).format('LL')}.`, margin: [0, 5, 0, 5] })
  paymentSummary.push({ text: [{ text: 'Payment reference: ', bold: true, lineBreak: false }, `${delinkedStatement.paymentReference}`], margin: [0, 5, 0, 5] })

  return paymentSummary
}

module.exports = getPaymentSummary
