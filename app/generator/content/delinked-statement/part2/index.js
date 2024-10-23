const getPaymentSummary = require('./get-payment-summary')

const part2 = (delinkedStatement) => {
  return {
    stack: [
      '\n\n',
      {
        layout: {
          hLineStyle: () => 'solid',
          vLineStyle: () => 'solid'
        },
        table: {
          widths: ['*'],
          body: [
            [{
              stack: getPaymentSummary(delinkedStatement)
            }]
          ]
        }
      }
    ],
    unbreakable: true
  }
}

module.exports = part2
