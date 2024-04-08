const moment = require('moment')
const getPaymentPeriodsFromPaymentPeriodStart = require('../../../../app/generator/content/sfi23-quarterly-statement/part3/get-payment-periods-from-payment-period-start')

jest.mock('moment', () => {
  const originalMoment = jest.requireActual('moment')
  const mockMoment = jest.fn().mockImplementation((date, format) => {
    const momentObject = originalMoment(date, format)
    return momentObject
  })
  mockMoment.locale = jest.fn()
  return mockMoment
})

describe('getPaymentPeriodsFromPaymentPeriodStart', () => {
  test('should correctly generate payment periods', () => {
    const paymentPeriodStart = '2024-01-01'
    const agreementEnd = '2025-01-01'
    const paymentPeriods = getPaymentPeriodsFromPaymentPeriodStart(paymentPeriodStart, agreementEnd)

    paymentPeriods.forEach((paymentPeriod, index) => {
      const quarter = index + 2 // start from the second quarter
      const month = quarter * 3
      const periodStart = moment(paymentPeriodStart).add(month, 'months').startOf('month')
      const periodEnd = moment(periodStart).add(3, 'months').subtract(1, 'day').endOf('month')
      const payDue = moment(periodStart).add(3, 'months')

      expect(paymentPeriod).toEqual({ quarter, periodStart, periodEnd, payDue })
    })
  })
})
