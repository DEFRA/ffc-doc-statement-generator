const getReductionsCalculationsTable = require('./get-reduction-calculations-table')
const { DELINKED } = require('../../../../constants/document-types')

const reductionsCalculations = (delinkedStatement) => {
  const reductionsCalculationMessage = DELINKED.showCalculation === true
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

  if (reductionsCalculationMessage) {
    stack.unshift(reductionsCalculationMessage)
  }

  return {
    stack
  }
}

module.exports = reductionsCalculations
