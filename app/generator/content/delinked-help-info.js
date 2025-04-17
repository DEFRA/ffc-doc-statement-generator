const topMargin = 2
const rightMargin = 10
const leftMargin = 15
const bottomMargin = 20

const delinkedHelpInfo = (_delinkedStatement) => {
  return {
    stack: [
      { text: 'If you\'ve any questions about this statement', style: 'header2' },
      { text: 'You can:' },
      {
        ul: [
          {
            text: [
              { text: 'find more information about delinked payments at ' },
              '\n',
              { text: 'www.gov.uk/guidance/delinked-payments-replacing-the-basic-payment-scheme.', link: 'https://www.gov.uk/guidance/delinked-payments-replacing-the-basic-payment-scheme', decoration: 'underline', unbreakable: true }
            ]
          },
          {
            text: [
              { text: 'log in to the Rural Payments service at ' },
              '\n',
              { text: 'www.ruralpayments.service.gov.uk/customer-account/login.', link: 'https://www.ruralpayments.service.gov.uk/customer-account/login', decoration: 'underline', unbreakable: true },
              { text: ' to send a query - this is the quickest way to get a reply' }
            ]
          },
          {
            text: [
              { text: 'email ', unbreakable: true },
              { text: 'ruralpayments@defra.gov.uk', link: 'mailto:ruralpayments@defra.gov.uk', decoration: 'underline' },
              { text: ' - use Delinked payments statement query\' as the subject of your email' }
            ]
          },
          {
            text: [
              { text: 'call 03000 200 301 (Monday to Friday, 8:30am to 5pm) - you\'ll need your SBI number ' }
            ]
          }
        ],
        listStyle: 'square',
        margin: [leftMargin, topMargin, rightMargin, bottomMargin]
      },
      {
        text: [
          { text: 'If you think your payment is wrong', style: 'header2' },
          '\n\n',
          { text: 'Read how to submit an appeal and the deadlines that apply at ' },
          { text: 'www.gov.uk/government/organisations/rural-payments-agency/about/complaints-procedure', link: 'https://www.gov.uk/government/organisations/rural-payments-agency/about/complaints-procedure', decoration: 'underline' }
        ]
      }
    ],
    unbreakable: true
  }
}

module.exports = delinkedHelpInfo
