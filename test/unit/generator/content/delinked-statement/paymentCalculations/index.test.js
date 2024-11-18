const reductionsCalculations = require('../../../../../../app/generator/content/delinked-statement/paymentCalculations')
const getReductionsCalculationsTable = require('../../../../../../app/generator/content/delinked-statement/paymentCalculations/get-reduction-calculations-table')
const { DELINKED } = require('../../../../../../app/constants/document-types')

jest.mock('../../../../../../app/generator/content/delinked-statement/paymentCalculations/get-reduction-calculations-table')

describe('paymentCalculations', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should return stack with paymentCalculationMessage when DELINKED.showCalculation is true', () => {
    DELINKED.showCalculation = true
    const delinkedStatement = { /* mock statement data */ }
    const mockTable = { text: 'mock table' }
    getReductionsCalculationsTable.mockReturnValue(mockTable)

    const result = reductionsCalculations(delinkedStatement)

    expect(result).toEqual({
      stack: [
        {
          stack: [
            { text: 'How your payment was calculated', style: 'header2' },
            { text: 'Your annual delinked payment is your reference amount minus the progressive reduction that applies for that year.' }
          ]
        },
        mockTable
      ]
    })
    expect(getReductionsCalculationsTable).toHaveBeenCalledWith(delinkedStatement)
  })

  test('should return stack without paymentCalculationMessage when DELINKED.showCalculation is false', () => {
    DELINKED.showCalculation = false
    const delinkedStatement = { /* mock statement data */ }
    const mockTable = { text: 'mock table' }
    getReductionsCalculationsTable.mockReturnValue(mockTable)

    const result = reductionsCalculations(delinkedStatement)

    expect(result).toEqual({
      stack: [mockTable]
    })
    expect(getReductionsCalculationsTable).toHaveBeenCalledWith(delinkedStatement)
  })
})
