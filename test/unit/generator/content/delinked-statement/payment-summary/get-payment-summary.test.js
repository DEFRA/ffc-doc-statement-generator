const moment = require('moment')
const toCurrencyString = require('../../../../../../app/generator/to-currency-string')
const getPaymentSummary = require('../../../../../../app/generator/content/delinked-statement/payment-summary/get-payment-summary')

jest.mock('moment', () => {
  const originalMoment = jest.requireActual('moment')
  const mockMoment = jest.fn().mockImplementation((date, format) => {
    const momentObject = originalMoment(date, format)
    momentObject.format = jest.fn().mockReturnValue('January 1, 2024')
    return momentObject
  })
  mockMoment.locale = jest.fn()
  return mockMoment
})

jest.mock('../../../../../../app/generator/to-currency-string')

describe('getPaymentSummary', () => {
  test('should correctly generate paymentSummary content', () => {
    const mockDelinkedStatement = {
      paymentAmount: 1000,
      transactionDate: '2024-01-01T00:00:00.000Z',
      paymentReference: 'ABC123'
    }
    toCurrencyString.mockReturnValue('£1,000.00')

    const paymentSummaryResult = getPaymentSummary(mockDelinkedStatement)

    expect(moment.locale).toHaveBeenCalledWith('en-gb')
    expect(toCurrencyString).toHaveBeenCalledWith(mockDelinkedStatement.paymentAmount)
    expect(paymentSummaryResult).toEqual([
      { text: '\n What you\'ve been paid \n', style: 'tableHeader2' },
      { text: [{ text: 'Payment amount: ', bold: true, lineBreak: false, style: 'separator' }, '£1,000.00'], margin: [0, 10, 0, 5] },
      { text: 'This is usually paid into your account within 2 working days of January 1, 2024.', margin: [0, 5, 0, 5] },
      { text: [{ text: 'Payment reference: ', bold: true, lineBreak: false }, 'ABC123'], margin: [0, 5, 0, 5] }
    ])
  })
})
