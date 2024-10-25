const getPaymentSummary = require('../../../../../../app/generator/content/delinked-statement/payment-summary/get-payment-summary')
const paymentSummary = require('../../../../../../app/generator/content/delinked-statement/payment-summary/index')

jest.mock('../../../../../../app/generator/content/delinked-statement/payment-summary/get-payment-summary')

describe('paymentSummary', () => {
  test('should correctly generate paymentSummary content', () => {
    const mockDelinkedStatement = {
      // mock statement data
    }
    const mockPaymentSummary = [{ text: 'Payment summary content' }]
    getPaymentSummary.mockReturnValue(mockPaymentSummary)

    const paymentSummaryResult = paymentSummary(mockDelinkedStatement)

    expect(paymentSummaryResult).toHaveProperty('stack')
    expect(paymentSummaryResult.stack).toContain('\n\n')
    expect(paymentSummaryResult.stack).toContainEqual({
      layout: {
        hLineStyle: expect.any(Function),
        vLineStyle: expect.any(Function)
      },
      table: {
        widths: ['*'],
        body: [
          [{
            stack: mockPaymentSummary
          }]
        ]
      }
    })
    expect(paymentSummaryResult).toHaveProperty('unbreakable', true)
    expect(paymentSummaryResult.stack[1].layout.hLineStyle()).toBe('solid')
    expect(paymentSummaryResult.stack[1].layout.vLineStyle()).toBe('solid')
  })
})
