
const getPaymentSummary = require('./get-payment-summary')

const part2 = (sfi23QuarterlyStatement) => {
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
              stack: getPaymentSummary(sfi23QuarterlyStatement)
            }]
          ]
        }
      }
    ],
    unbreakable: true
  }
}

module.exports = part2
