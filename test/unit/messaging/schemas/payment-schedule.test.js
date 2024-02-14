const schema = require('../../../../app/messaging/schemas/payment-schedule')

let mockPaymentSchedule

describe('payment schedule schema', () => {
  beforeEach(() => {
    mockPaymentSchedule = JSON.parse(JSON.stringify(require('../../../mocks/objects/schedule')[0]))
  })

  test('validates success if all present', () => {
    const result = schema.validate(mockPaymentSchedule)
    expect(result.error).toBeUndefined()
  })

  test('validates success if missing due date', () => {
    delete mockPaymentSchedule.dueDate
    const result = schema.validate(mockPaymentSchedule)
    expect(result.error).toBeUndefined()
  })

  test('validates success if empty due date', () => {
    mockPaymentSchedule.dueDate = ''
    const result = schema.validate(mockPaymentSchedule)
    expect(result.error).toBeUndefined()
  })

  test('validates success if missing period', () => {
    delete mockPaymentSchedule.period
    const result = schema.validate(mockPaymentSchedule)
    expect(result.error).toBeUndefined()
  })

  test('validates success if empty period', () => {
    mockPaymentSchedule.period = ''
    const result = schema.validate(mockPaymentSchedule)
    expect(result.error).toBeUndefined()
  })

  test('validates fail if missing value', () => {
    delete mockPaymentSchedule.value
    const result = schema.validate(mockPaymentSchedule)
    expect(result.error).toBeDefined()
  })

  test('validates fail if empty value', () => {
    mockPaymentSchedule.value = ''
    const result = schema.validate(mockPaymentSchedule)
    expect(result.error).toBeDefined()
  })
})
