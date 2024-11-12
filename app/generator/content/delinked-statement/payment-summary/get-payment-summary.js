const moment = require('moment')
const toCurrencyString = require('../../../to-currency-string')

const getPaymentSummary = (delinkedStatement) => {
  moment.locale('en-gb')
  const paymentSummary = [{ text: 'What you\'ve been paid \n', style: 'tableHeader2' }]
  paymentSummary.push({ text: [{ text: 'Payment: ', bold: true, lineBreak: false, style: 'separator' }, `${toCurrencyString(delinkedStatement.paymentAmount).toString()}`] })
  paymentSummary.push({ text: `This is usually paid into your account within 2 working days of ${moment(delinkedStatement.transactionDate).format('LL')}.` })
  paymentSummary.push({ text: [{ text: 'Payment reference: ', bold: true, lineBreak: false }, `${delinkedStatement.paymentReference}`] })

  return paymentSummary
}

module.exports = getPaymentSummary
