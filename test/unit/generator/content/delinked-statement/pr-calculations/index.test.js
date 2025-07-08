const prCalculations = require('../../../../../../app/generator/content/delinked-statement/pr-calculations/index')
const { getProgressiveReductionTable } = require('../../../../../../app/generator/content/delinked-statement/pr-calculations/get-progressive-reduction-table')
const { DELINKED } = require('../../../../../../app/constants/document-types')

jest.mock('../../../../../../app/generator/content/delinked-statement/pr-calculations/get-progressive-reduction-table')

describe('prCalculations', () => {
  const delinkedStatement = {
    referenceAmount: 100000,
    percentageReduction1: 10,
    percentageReduction2: 20,
    percentageReduction3: 30,
    percentageReduction4: 40
  }

  beforeEach(() => {
    getProgressiveReductionTable.mockReturnValue('mockedProgressiveReductionTable')
  })

  test('should return the correct structure when DELINKED.showCalculation is true', () => {
    DELINKED.showCalculation = true

    const result = prCalculations(delinkedStatement)

    expect(getProgressiveReductionTable).toHaveBeenCalledWith(delinkedStatement)

    expect(result).toEqual({
      stack: [
        {
          stack: [
            { text: 'How your reference amount was calculated', style: 'header2' },
            { text: 'Your \'reference data\' is your BPS payment amounts for the 2020, 2021 and 2022 scheme years (before some reductions and penalties). The \'reference amount\' is the sum of the reference data divided by 3. You were sent information about this in the delinked payments information statement.' },
            '\n\n\n',
            { text: 'This amount will have changed if reference data has either: ' },
            {
              ul: [
                { text: 'been transferred into or out of your business ' },
                { text: 'changed following a payment query  ' }
              ],
              listStyle: 'square',
              margin: [15, 10, 2, 20]
            },
            {
              text: [
                { text: 'Your current reference amount is £100,000.00. You can view your current reference amount and any data transfers in the Rural Payments service at ' },
                { text: 'www.ruralpayments.service.gov.uk/customer-account/login.', link: 'https://www.ruralpayments.service.gov.uk/customer-account/login', decoration: 'underline' },
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
                { text: 'Your progressive reduction is the amount your annual delinked payment has been reduced. To calculate your reduction, we split your reference amount of £100,000.00 into one or more payment bands, which work like income tax bands. ' },
                '\n'
              ]
            }
          ]
        },
        'mockedProgressiveReductionTable'
      ]
    })
  })

  test('should return the correct structure when DELINKED.showCalculation is false', () => {
    DELINKED.showCalculation = false

    const result = prCalculations(delinkedStatement)

    expect(getProgressiveReductionTable).toHaveBeenCalledWith(delinkedStatement)

    expect(result).toEqual({
      stack: ['mockedProgressiveReductionTable']
    })
  })
})
