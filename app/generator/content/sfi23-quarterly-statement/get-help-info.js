const config = require('../../../config')
const getPaymentPeriodsTable = require('./part3/get-payment-periods-table')
const getPeriodStartDateFromPeriod = require('./get-period-start-date-from-period')
const number2 = 2
const number10 = 10
const number15 = 15
const number20 = 20

const getHelpInfo = (sfi23QuarterlyStatement) => {
  const helpInfo = [
    { text: 'If you think your payments are wrong', style: 'header2' },
    { text: 'You can:' },
    {
      ul: [{
        text: [
          { text: 'log into Rural Payments service at ' }, '\n',
          { text: 'https://www.ruralpayments.service.gov.uk/customer-account/login', link: 'https://www.ruralpayments.service.gov.uk/customer-account/login', decoration: 'underline', unbreakable: true },
          ' to check your SFI agreement'
        ]
      },
      {
        text: [
          { text: 'review the SFI scheme information at ' }, '\n',
          { text: 'https://www.gov.uk/government/collections/sustainable-farming-incentive-guidance', link: 'https://www.gov.uk/government/collections/sustainable-farming-incentive-guidance', decoration: 'underline', unbreakable: true }
        ]
      },
      {
        text: [
          { text: 'check statements and letters you\'ve received from us ' }
        ]
      }],
      listStyle: 'square',
      margin: [number15, number2, number10, number20]
    }
  ]
  if (config.showSfi23PaymentPeriod) {
    const periodStart = getPeriodStartDateFromPeriod(sfi23QuarterlyStatement.paymentPeriod)
    helpInfo.push({ text: 'When your next payments will be paid', style: 'header2' })
    helpInfo.push(getPaymentPeriodsTable(periodStart, sfi23QuarterlyStatement.agreementEnd))
  }
  helpInfo.push({ text: 'If you\'ve any questions about this statement', style: 'header2' })
  helpInfo.push(
    {
      text: [
        'You can email ',
        { text: 'ruralpayments@defra.gov.uk', link: 'mailto:ruralpayments@defra.gov.uk', decoration: 'underline' },
        ' or call 03000 200 301 (Monday to Friday, 8.30am to 5pm). You\'ll need your SBI and SFI 2023 agreement number.'
      ]
    }
  )

  return {
    stack: helpInfo,
    unbreakable: true
  }
}

module.exports = getHelpInfo
