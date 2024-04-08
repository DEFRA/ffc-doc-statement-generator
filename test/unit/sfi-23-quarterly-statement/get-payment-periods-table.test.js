const moment = require('moment')
const getPaymentPeriods = require('../../../app/generator/content/sfi23-quarterly-statement/part3/get-payment-periods-table')
const getPaymentPeriodsFromPaymentPeriodStart = require('../../../app/generator/content/sfi23-quarterly-statement/part3/get-payment-periods-from-payment-period-start')

jest.mock('../../../app/generator/content/sfi23-quarterly-statement/part3/get-payment-periods-from-payment-period-start')

describe('getPaymentPeriods', () => {
  test('should return a table with the correct structure', () => {
    const paymentPeriodStart = moment()
    const agreementEnd = moment().add(1, 'year')
    const mockPaymentPeriods = [
      {
        periodStart: moment(),
        periodEnd: moment().add(1, 'month'),
        payDue: moment().add(1, 'month')
      },
      {
        periodStart: moment().add(1, 'month'),
        periodEnd: moment().add(2, 'months'),
        payDue: moment().add(2, 'months')
      }
    ]

    getPaymentPeriodsFromPaymentPeriodStart.mockReturnValue(mockPaymentPeriods)

    const result = getPaymentPeriods(paymentPeriodStart, agreementEnd)

    expect(result).toHaveProperty('layout')
    expect(result).toHaveProperty('style', 'table')
    expect(result).toHaveProperty('table')
    expect(result.table).toHaveProperty('headerRows', 1)
    expect(result.table).toHaveProperty('widths', ['*', '*'])
    expect(result.table).toHaveProperty('body')
    expect(result.table.body.length).toBe(mockPaymentPeriods.length + 1) // +1 for the header row
  })
})

describe('getPaymentPeriodsFromPaymentPeriodStart', () => {
  test('should return the correct number of payment periods', () => {
    const paymentPeriodStart = moment()
    const agreementEnd = moment().add(1, 'year')

    const result = getPaymentPeriodsFromPaymentPeriodStart(paymentPeriodStart, agreementEnd)

    expect(result.length).toBe(2)
  })

  test('should return payment periods with the correct structure', () => {
    const paymentPeriodStart = moment()
    const agreementEnd = moment().add(1, 'year')

    const result = getPaymentPeriodsFromPaymentPeriodStart(paymentPeriodStart, agreementEnd)

    for (const paymentPeriod of result) {
      expect(paymentPeriod).toHaveProperty('periodStart')
      expect(paymentPeriod).toHaveProperty('periodEnd')
      expect(paymentPeriod).toHaveProperty('payDue')
    }
  })
})
