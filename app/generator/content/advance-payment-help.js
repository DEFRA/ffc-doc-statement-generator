const advancedPaymentHelp = () => {
  return {
    style: 'govuk-body-s',
    stack: [
      '\n',
      { text: 'More information', bold: true },
      { text: 'If you think your payments are wrong, you should:' },
      {
        ul: [{
          text: [
            'log into the Rural Payments service ',
            { text: 'www.gov.uk/claim-rural-payments', link: 'https://www.gov.uk/claim-rural-payments', decoration: 'underline' },
            ' to check your SFI standard agreement'
          ]
        },
        'check statements and letters you\'ve received from us',
        {
          text: [
            'review the SFI scheme information at ',
            { text: 'www.gov.uk/government/collections/sustainable-farming-incentive-guidance', link: 'https://www.gov.uk/government/collections/sustainable-farming-incentive-guidance', decoration: 'underline' }
          ]
        }],
        listStyle: 'square'
      },
      '\n',
      { text: 'If you have any questions about this email', bold: true },
      {
        text: [
          'You can email ',
          { text: 'ruralpayments@defra.gov.uk', link: 'mailto:ruralpayments@defra.gov.uk', decoration: 'underline' },
          ', adding SFI in the subject header of your email, or call us on 03000 200 301 (Monday to Friday, 8.30am to 5pm). Please tell us your SBI and Agreement number if applicable which are at the top of this email.',
          '\n\n'
        ]
      },
      {
        text: [
          { text: 'Yours faithfully ' },
          '\n\n',
          { text: 'Karen Brash' },
          '\n',
          { text: 'Sustainable Farming Incentive Operational Delivery manager', bold: true },
          '\n\n',
          { text: 'Rural Payments Agency | PO Box 325 | WORKSOP | S95 1DE\n' },
          { text: 'ruralpayments@defra.gov.uk', link: 'mailto:ruralpayments@defra.gov.uk', decoration: 'underline' }, ' | 03000 200 301 | ',
          { text: 'gov.uk/defra/sfi', link: 'gov.uk/defra/sfi', decoration: 'underline' },
          { text: '\n Follow us on Twitter @Ruralpay' },
          '\n'
        ]
      }
    ]
  }
}

module.exports = advancedPaymentHelp
