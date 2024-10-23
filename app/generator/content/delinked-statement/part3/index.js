const getProgressiveReductionTable = require('./get-progressive-reduction-table')
const { DELINKED } = require('../../../../constants/document-types')

const part3 = (delinkedStatement) => {
  const marginTop = 2
  const marginRight = 10
  const marginLeft = 15
  const marginDown = 20

  const reductionCalculationMessage = DELINKED.showCalculation === true
    ? {
        stack: [
          { text: 'How your reference amount was calculated', style: 'header2' },
          { text: 'Your \'reference data\' is your BPS payment amounts for the 2020, 2021 and 2022 scheme years (before some reductions and penalties). The \'reference amount\' is the sum of the reference data divided by 3. You were sent information about this in the delinked payments information statement. ' },
          { text: 'This amount will have changed if reference data has either: ' },
          {
            ul: [
              { text: 'been transferred into or out of your business ' },
              { text: 'changed following a payment query  ' }
            ],
            listStyle: 'square',
            margin: [marginLeft, marginTop, marginRight, marginDown]
          },
          {
            text: [
              { text: `Your current reference amount is £${parseFloat(delinkedStatement.referenceAmount).toFixed(2)}. You can view your current reference amount and any data transfers in the Rural Payments service at ` },
              { text: 'www.ruralpayments.service.gov.uk/customer-account/login', link: 'https://www.ruralpayments.service.gov.uk/customer-account/login', decoration: 'underline' },
              '\n',
              { text: 'Find out about data transfers at ' },
              { text: 'www.gov.uk/guidance/delinked-payments-replacing-the-basic-payment-scheme', link: 'https://www.gov.uk/guidance/delinked-payments-replacing-the-basic-payment-scheme', decoration: 'underline' },
              '\n\n'
            ]
          },
          {
            text: [
              { text: 'How your progressive reduction was calculated', style: 'header2' },
              '\n',
              { text: `Your progressive reduction is the amount your annual delinked payment has been reduced. To calculate your reduction, we split your reference amount of £${parseFloat(delinkedStatement.referenceAmount).toFixed(2)} into one or more payment bands, which work like income tax bands. ` },
              '\n'
            ]
          }
        ]
      }
    : null

  const stack = [
    getProgressiveReductionTable(delinkedStatement)
  ]

  if (reductionCalculationMessage) {
    stack.unshift(reductionCalculationMessage)
  }

  return {
    stack
  }
}

module.exports = part3
