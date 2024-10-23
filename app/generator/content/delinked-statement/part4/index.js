const getReductionsCalculationsTable = require('./get-reduction-calculations-table')
const { DELINKED } = require('../../../../constants/document-types')

const part4 = (delinkedStatement) => {
  const paymentCalculationMessage = DELINKED.showCalculation === true
    ? {
        stack: [
          { text: 'How your payment was calculated', style: 'header2' },
          { text: 'Your annual delinked payment is your reference amount minus the progressive reduction that applies for that year ' }
        ]
      }
    : null

  const stack = [
    getReductionsCalculationsTable(delinkedStatement)
  ]

  if (paymentCalculationMessage) {
    stack.unshift(paymentCalculationMessage)
  }

  return {
    stack
  }
}

module.exports = part4
