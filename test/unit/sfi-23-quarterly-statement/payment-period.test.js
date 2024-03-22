const getpaymentPeriod = require('../../../app/generator/content/sfi23-quarterly-statement/part2/get-payment-period')
const paymentPeriod = '1st January to 31 March 2024'

describe('get payment period date', () => {
  test('returns two columns', () => {
    const result = getpaymentPeriod(paymentPeriod)
    expect(result.columns.length).toBe(2)
  })

  test('returns title column text', () => {
    const result = getpaymentPeriod(paymentPeriod)
    expect(result.columns[0].text).toBe('Period: ')
  })

  test('returns title column width', () => {
    const result = getpaymentPeriod(paymentPeriod)
    expect(result.columns[0].width).toBe(200)
  })

  test('returns payment period column text', () => {
    const result = getpaymentPeriod(paymentPeriod)
    expect(result.columns[1].text).toBe('1st January to 31 March 2024')
  })

  test('returns payment period column width', () => {
    const result = getpaymentPeriod(paymentPeriod)
    expect(result.columns[1].width).toBe('*')
  })

  test('returns column style', () => {
    const result = getpaymentPeriod(paymentPeriod)
    expect(result.style).toBe('column')
  })

  test('returns column gap', () => {
    const result = getpaymentPeriod(paymentPeriod)
    expect(result.columnGap).toBe(10)
  })
})
