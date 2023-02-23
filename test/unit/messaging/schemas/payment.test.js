const schema = require('../../../../app/messaging/schemas/payment')
let mockPayment

describe('payment schema', () => {
  beforeEach(() => {
    mockPayment = JSON.parse(JSON.stringify(require('../../../mocks/statement-data').payments[0]))
  })
  test('validates success if all present', () => {
    const result = schema.validate(mockPayment)
    expect(result.error).toBeUndefined()
  })

  test('validates fail if missing invoice number', () => {
    delete mockPayment.invoiceNumber
    const result = schema.validate(mockPayment)
    expect(result.error).toBeDefined()
  })

  test('validates fail if empty invoice number', () => {
    mockPayment.invoiceNumber = ''
    const result = schema.validate(mockPayment)
    expect(result.error).toBeDefined()
  })

  test('validates fail if missing reference', () => {
    delete mockPayment.reference
    const result = schema.validate(mockPayment)
    expect(result.error).toBeDefined()
  })

  test('validates fail if empty reference', () => {
    mockPayment.reference = ''
    const result = schema.validate(mockPayment)
    expect(result.error).toBeDefined()
  })

  test('validates fail if missing due date', () => {
    delete mockPayment.dueDate
    const result = schema.validate(mockPayment)
    expect(result.error).toBeDefined()
  })

  test('validates fail if empty due date', () => {
    mockPayment.dueDate = ''
    const result = schema.validate(mockPayment)
    expect(result.error).toBeDefined()
  })

  test('validates fail if missing settled', () => {
    delete mockPayment.settled
    const result = schema.validate(mockPayment)
    expect(result.error).toBeDefined()
  })

  test('validates fail if empty settled', () => {
    mockPayment.settled = ''
    const result = schema.validate(mockPayment)
    expect(result.error).toBeDefined()
  })

  test('validates fail if missing calculated', () => {
    delete mockPayment.calculated
    const result = schema.validate(mockPayment)
    expect(result.error).toBeDefined()
  })

  test('validates fail if empty calculated', () => {
    mockPayment.calculated = ''
    const result = schema.validate(mockPayment)
    expect(result.error).toBeDefined()
  })

  test('validates fail if missing value', () => {
    delete mockPayment.value
    const result = schema.validate(mockPayment)
    expect(result.error).toBeDefined()
  })

  test('validates fail if empty value', () => {
    mockPayment.value = ''
    const result = schema.validate(mockPayment)
    expect(result.error).toBeDefined()
  })

  test('validates fail if missing period', () => {
    delete mockPayment.period
    const result = schema.validate(mockPayment)
    expect(result.error).toBeDefined()
  })

  test('validates fail if empty period', () => {
    mockPayment.period = ''
    const result = schema.validate(mockPayment)
    expect(result.error).toBeDefined()
  })
})
