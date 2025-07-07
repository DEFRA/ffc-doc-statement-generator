const { getProgressiveReductionTable } = require('./get-progressive-reduction-table')
const { DELINKED } = require('../../../../constants/document-types')
const marginLeft = 15
const marginRight = 2
const marginTop = 10
const marginBottom = 20

function prCalculations (delinkedStatement) {
  const { referenceAmount, percentageReduction1, percentageReduction2, percentageReduction3, percentageReduction4 } = delinkedStatement

  if (referenceAmount < 0) {
    throw new Error(`Invalid payment band value: ${referenceAmount}`)
  }

  const formatCalculationAmount = (value) => {
    const parsedValue = parseFloat(value)
    const formattedValue = parsedValue > 0
      ? parsedValue.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      : parsedValue.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
    return `£${formattedValue}`
  }

  const percentages = [percentageReduction1, percentageReduction2, percentageReduction3, percentageReduction4]
  const minMaxPercent = 100
  percentages.forEach((percentage, _index) => {
    if (percentage < -minMaxPercent || percentage > minMaxPercent) {
      throw new Error(`Invalid percentage value: ${percentage}`)
    }
  })

  const progressiveReductionTable = getProgressiveReductionTable(delinkedStatement)

  if (DELINKED.showCalculation) {
    return {
      stack: [
        {
          stack: [
            { text: 'How your reference amount was calculated', style: 'header2' },
            { text: 'Your \'reference data\' is your BPS payment amounts for the 2020, 2021 and 2022 scheme years (before some reductions and penalties). The \'reference amount\' is the sum of the reference data divided by 3. You were sent information about this in the delinked payments information statement.' },
            '\n',
            { text: 'This amount will have changed if reference data has either: ' },
            {
              ul: [
                { text: 'been transferred into or out of your business ' },
                { text: 'changed following a payment query  ' }
              ],
              listStyle: 'square',
              margin: [marginLeft, marginTop, marginRight, marginBottom]
            },
            {
              text: [
                { text: `Your current reference amount is ${formatCalculationAmount(delinkedStatement.referenceAmount)}. You can view your current reference amount and any data transfers in the Rural Payments service at ` },
                { text: 'www.ruralpayments.service.gov.uk/customer-account/login', link: 'https://www.ruralpayments.service.gov.uk/customer-account/login', decoration: 'underline' },
                '\n\n',
                { text: 'Find out about data transfers at ' },
                { text: 'www.gov.uk/guidance/delinked-payments-replacing-the-basic-payment-scheme.', link: 'https://www.gov.uk/guidance/delinked-payments-replacing-the-basic-payment-scheme', decoration: 'underline' },
                '\n\n'
              ]
            },
            {
              text: [
                { text: 'How your progressive reduction was calculated', style: 'header2' },
                '\n\n',
                { text: `Your progressive reduction is the amount your annual delinked payment has been reduced. To calculate your reduction, we split your reference amount of ${formatCalculationAmount(delinkedStatement.referenceAmount)} into one or more payment bands, which work like income tax bands. ` },
                '\n'
              ]
            }
          ]
        },
        progressiveReductionTable
      ]
    }
  } else {
    return {
      stack: [progressiveReductionTable]
    }
  }
}

module.exports = prCalculations
