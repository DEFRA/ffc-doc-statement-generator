const getTable = require('./get-table')

const part3 = (statement) => {
  return {
    stack: [
      { text: 'Part 2. Calculation', style: 'header2' },
      { text: `We calculated the total ${statement.scheme.shortName} payment amount by adding together payments for all the standards which are part of your agreement, as shown in this table.` },
      getTable(statement.funding),
      {
        text: [
          'You can check which land parcels are part of each standard in the Rural Payments service at ',
          { text: 'www.gov.uk/claim-rural-payments', link: 'https://www.gov.uk/claim-rural-payments', style: 'link' },
          '.'
        ]
      }
    ],
    unbreakable: true
  }
}

module.exports = part3
