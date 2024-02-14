const getPaymentPeriod = require('../../../../../../../app/generator/content/statement/SFIA/content/get-payment-period')
const paymentPeriod = '1 July 2022'

describe('get payment period', () => {
  test('returns two columns', () => {
    const result = getPaymentPeriod(paymentPeriod)
    expect(result.columns.length).toBe(2)
  })

  test('returns title column text', () => {
    const result = getPaymentPeriod(paymentPeriod)
    expect(result.columns[0].text).toBe('Payment period:')
  })

  test('returns title column width', () => {
    const result = getPaymentPeriod(paymentPeriod)
    expect(result.columns[0].width).toBe(200)
  })

  test('returns payment period column text', () => {
    const result = getPaymentPeriod(paymentPeriod)
    expect(result.columns[1].text).toBe('1 July 2022')
  })

  test('returns payment period column width', () => {
    const result = getPaymentPeriod(paymentPeriod)
    expect(result.columns[1].width).toBe('*')
  })

  test('returns column style', () => {
    const result = getPaymentPeriod(paymentPeriod)
    expect(result.style).toBe('column')
  })
})
