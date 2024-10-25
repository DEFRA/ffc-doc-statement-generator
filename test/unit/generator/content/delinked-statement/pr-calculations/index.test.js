const getProgressiveReductionTable = require('../../../../../../app/generator/content/delinked-statement/pr-calculations/get-progressive-reduction-table')
const prCalculations = require('../../../../../../app/generator/content/delinked-statement/pr-calculations')
const { DELINKED } = require('../../../../../../app/constants/document-types')

jest.mock('../../../../../../app/generator/content/delinked-statement/pr-calculations/get-progressive-reduction-table', () => jest.fn())

describe('prCalculations', () => {
  beforeEach(() => {
    getProgressiveReductionTable.mockClear()
  })

  test('should correctly generate the prCalculations object when showCalculation is true', () => {
    DELINKED.showCalculation = true
    const delinkedStatement = {
      referenceAmount: 100000,
      totalProgressiveReduction: 20000,
      totalDelinkedPayment: 80000,
      paymentAmountCalculated: 20000
    }

    getProgressiveReductionTable.mockReturnValue('mockedProgressiveReductionTable')

    const result = prCalculations(delinkedStatement)

    expect(getProgressiveReductionTable).toHaveBeenCalledWith(delinkedStatement)

    expect(result).toEqual({
      stack: [
        {
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
              margin: [15, 2, 10, 20]
            },
            {
              text: [
                { text: 'Your current reference amount is £100,000.00. You can view your current reference amount and any data transfers in the Rural Payments service at ' },
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

  test('should not generate calculation message when showCalculation is false', () => {
    DELINKED.showCalculation = false
    const delinkedStatement = {
      referenceAmount: 100000,
      totalProgressiveReduction: 20000,
      totalDelinkedPayment: 80000,
      paymentAmountCalculated: 20000
    }

    getProgressiveReductionTable.mockReturnValue('mockedProgressiveReductionTable')

    const result = prCalculations(delinkedStatement)

    expect(getProgressiveReductionTable).toHaveBeenCalledWith(delinkedStatement)

    expect(result).toEqual({
      stack: [
        'mockedProgressiveReductionTable'
      ]
    })
  })

  test('should throw an error for invalid reference amount value', () => {
    DELINKED.showCalculation = true
    const delinkedStatement = {
      referenceAmount: -100000,
      totalProgressiveReduction: 20000,
      totalDelinkedPayment: 80000,
      paymentAmountCalculated: 20000
    }

    expect(() => prCalculations(delinkedStatement)).toThrow('Invalid payment band value: -100000')
  })

  test('should throw an error for invalid percentage value', () => {
    DELINKED.showCalculation = true
    const delinkedStatement = {
      referenceAmount: 100000,
      totalProgressiveReduction: 20000,
      totalDelinkedPayment: 80000,
      paymentAmountCalculated: 20000,
      percentageReduction1: 105
    }

    expect(() => prCalculations(delinkedStatement)).toThrow('Invalid percentage value: 105')
  })

  test('should handle zero and negative progressive reduction values correctly', () => {
    DELINKED.showCalculation = true
    const delinkedStatement = {
      referenceAmount: 100000,
      totalProgressiveReduction: 0,
      totalDelinkedPayment: 100000,
      paymentAmountCalculated: 100000,
      percentageReduction1: 0,
      progressiveReductions1: 0,
      percentageReduction2: -10,
      progressiveReductions2: -5000
    }

    getProgressiveReductionTable.mockReturnValue('mockedProgressiveReductionTable')

    const result = prCalculations(delinkedStatement)

    expect(getProgressiveReductionTable).toHaveBeenCalledWith(delinkedStatement)

    expect(result).toEqual({
      stack: [
        {
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
              margin: [15, 2, 10, 20]
            },
            {
              text: [
                { text: 'Your current reference amount is £100,000.00. You can view your current reference amount and any data transfers in the Rural Payments service at ' },
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
})
