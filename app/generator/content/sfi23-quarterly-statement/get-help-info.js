const { getPaymentPeriods } = require('./part3/get-payment-periods')

const getHelpInfo = (sfi23Statement) => {
  return {
    stack: [
      'If you think your payments are wrong\n',
      { text: 'You can:' },
      {
        ul: [{
          text: [
            'log into the Rural Payments service ',
            { text: 'https://www.ruralpayments.service.gov.uk/customer-account/login', link: 'https://www.ruralpayments.service.gov.uk/customer-account/login', decoration: 'underline' },
            ' to check your SFI standard agreement'
          ]
        },
        'check statements and letters you\'ve received from us',
        {
          text: [
            'review the SFI scheme information at ',
            { text: 'https://www.gov.uk/government/collections/sustainable-farming-incentive-guidance', link: 'https://www.gov.uk/government/collections/sustainable-farming-incentive-guidance', decoration: 'underline' }
          ]
        }],
        listStyle: 'square'
      },
      { text: 'When your next payments will be paid', style: 'header3' },
      getPaymentPeriods(sfi23Statement.sfi23Statement),
      { text: 'If you\'ve any questions about this statement', style: 'header3' },
      {
        text: [
          'You can email ',
          { text: 'ruralpayments@defra.gov.uk', link: 'mailto:ruralpayments@defra.gov.uk', decoration: 'underline' },
          ' or call us on 03000 200 301 (Monday to Friday, 8.30am to 5pm). You\'ll need  your SBI and SFI 2023 Agreement number.'
        ]
      }
    ],
    unbreakable: true
  }
}

module.exports = getHelpInfo
