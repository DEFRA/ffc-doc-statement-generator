const part3 = () => {
  return {
    stack: [
      { text: 'Part 3. More support', style: 'header2' },
      'If you think your payment is wrong, you should:\n\n',
      {
        ul: [
          {
            text: [
              'check your land parcel information in the Rural Payments service at ',
              { text: 'www.gov.uk/claim-rural-payments', link: 'https://www.gov.uk/claim-rural-payments', style: 'link' }
            ]
          }, {
            text: [
              'review the SFI scheme information at ',
              { text: 'www.gov.uk/government/collections/sustainable-farming-incentive-guidance', link: 'https://www.gov.uk/government/collections/sustainable-farming-incentive-guidance', style: 'link' },
              '\n\n'
            ]
          }
        ]
      },
      {
        text: [
          'If you still have questions, you can ',
          { text: 'use the query form', link: 'https://www.gov.uk/government/publications/contact-the-rpa-about-sfi', style: 'link' },
          ' to contact us. You should contact us within 3 months of receiving your payment.\n\n'
        ]
      },
      {
        text: [
          'Find other ways to get in touch at ',
          { text: 'www.gov.uk/guidance/contacting-the-rpa-about-sfi', link: 'https://www.gov.uk/guidance/contacting-the-rpa-about-sfi', style: 'link' }
        ]
      }
    ],
    unbreakable: true
  }
}

module.exports = part3
