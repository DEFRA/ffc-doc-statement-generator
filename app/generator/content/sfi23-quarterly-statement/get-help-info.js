const getPaymentPeriodsTable = require('./part3/get-payment-periods-table')

const getHelpInfo = (sfi23QuarterlyStatement) => {
  return {
    stack: [
      { text: `If you think your payments are wrong`, style: 'header3' },
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
            { text: 'https://www.gov.uk/government/collections/sustainable-farming-incentive-guidance', link: 'https://www.gov.uk/government/collections/sustainable-farming-incentive-guidance', decoration: 'underline', unbreakable: true  }
          ]
        },
        {
          text: [
            { text: `check statements and letters you've received from us ` }
          ]
        }],
        listStyle: 'square'
      },
      '\n',
      { text: 'When your next payments will be paid', style: 'header3' },

      getPaymentPeriodsTable(sfi23QuarterlyStatement.agreementStart, sfi23QuarterlyStatement.agreementEnd, sfi23QuarterlyStatement.previousPaymentCount),

      { text: 'If you\'ve any questions about this statement', style: 'header3' },
      {
        text: [
          'You can email ',
          { text: 'ruralpayments@defra.gov.uk', link: 'mailto:ruralpayments@defra.gov.uk', decoration: 'underline' },
          ' or call 03000 200 301 (Monday to Friday, 8.30am to 5pm). You\'ll need  your SBI and SFI 2023 agreement number.'
        ]
      }
    ],
    unbreakable: true
  }
}

module.exports = getHelpInfo
