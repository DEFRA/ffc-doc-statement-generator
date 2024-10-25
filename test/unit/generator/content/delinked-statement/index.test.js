const summary = require('../../../../../app/generator/content/summary')
const delinkedIntroduction = require('../../../../../app/generator/content/delinked-statement/delinked-introduction')
const paymentSummary = require('../../../../../app/generator/content/delinked-statement/payment-summary')
const prCalculations = require('../../../../../app/generator/content/delinked-statement/pr-calculations')
const paymentCalculations = require('../../../../../app/generator/content/delinked-statement/paymentCalculations')
const delinkedHelpInfo = require('../../../../../app/generator/content/delinked-help-info')
const { createContent } = require('../../../../../app/generator/content/delinked-statement/index')

jest.mock('../../../../../app/generator/content/delinked-statement/summary', () => jest.fn())
jest.mock('../../../../../app/generator/content/delinked-statement/delinked-introduction', () => jest.fn())
jest.mock('../../../../../app/generator/content/delinked-statement/payment-summary', () => jest.fn())
jest.mock('../../../../../app/generator/content/delinked-statement/pr-calculations', () => jest.fn())
jest.mock('../../../../../app/generator/content/delinked-statement/paymentCalculations', () => jest.fn())
jest.mock('../../../../../app/generator/content/delinked-help-info', () => jest.fn())

describe('createContent', () => {
  test('should call all dependencies and combine their results into an array', () => {
    const mockDelinkedStatement = {
      businessName: 'Test Business',
      address: 'Test Address',
      sbi: '123456789',
      transactionDate: '2024-01-01T00:00:00.000Z'
    }

    summary.mockReturnValue('summary')
    delinkedIntroduction.mockReturnValue('delinkedIntroduction')
    paymentSummary.mockReturnValue('paymentSummary')
    prCalculations.mockReturnValue('prCalculations')
    paymentCalculations.mockReturnValue('paymentCalculations')
    delinkedHelpInfo.mockReturnValue('delinkedHelpInfo')

    const result = createContent(mockDelinkedStatement)

    expect(summary).toHaveBeenCalledWith(mockDelinkedStatement)
    expect(delinkedIntroduction).toHaveBeenCalledWith(mockDelinkedStatement)
    expect(paymentSummary).toHaveBeenCalledWith(mockDelinkedStatement)
    expect(prCalculations).toHaveBeenCalledWith(mockDelinkedStatement)
    expect(paymentCalculations).toHaveBeenCalledWith(mockDelinkedStatement)
    expect(delinkedHelpInfo).toHaveBeenCalledWith(mockDelinkedStatement)
    expect(result).toEqual(['summary', 'delinkedIntroduction', 'paymentSummary', 'prCalculations', 'paymentCalculations', 'delinkedHelpInfo'])
  })
})
