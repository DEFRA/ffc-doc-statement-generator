const getPaymentTypeRowSpan = require('../../../../../../app/generator/content/schedule/part3/get-payment-type-row-span')
const { IMMEDIATE, QUARTERLY } = require('../../../../../../app/constants/payment-types')

describe('get payment type row span', () => {
  test('must return 1 if paymentType is IMMEDIATE', () => {
    const rowsCount = 5
    const order = 2
    const result = getPaymentTypeRowSpan(IMMEDIATE, rowsCount, order)
    expect(result).toBe(1)
  })

  test('must return rowCount-order if paymentType is QUARTERLY', () => {
    const rowsCount = 5
    const order = 2
    const rowCountLessOrder = 5 - 2
    const result = getPaymentTypeRowSpan(QUARTERLY, rowsCount, order)
    expect(result).toBe(rowCountLessOrder)
  })

  test('where x is greater than 3, must not return 1 if rowCount is greater than x, order is at least 2 less than rowCount and paymentType is QUARTERLY', () => {
    const rowsCount = 4
    const order = 2
    const result = getPaymentTypeRowSpan(QUARTERLY, rowsCount, order)
    expect(result).not.toBe(1)
  })
})
