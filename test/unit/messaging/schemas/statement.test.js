const schema = require('../../../../app/messaging/schemas/statement')
let mockStatement

describe('statement schema', () => {
  beforeEach(() => {
    mockStatement = JSON.parse(JSON.stringify(require('../../../mocks/mock-statement')))
  })
  test('validates success if all present', () => {
    const result = schema.validate(mockStatement)
    expect(result.error).toBeUndefined()
  })

  test('validates fail if missing frn', () => {
    delete mockStatement.frn
    const result = schema.validate(mockStatement)
    expect(result.error).toBeDefined()
  })

  test('validates fail if frn too high', () => {
    mockStatement.frn = 10000000000
    const result = schema.validate(mockStatement)
    expect(result.error).toBeDefined()
  })

  test('validates fail if frn too low', () => {
    mockStatement.frn = 100
    const result = schema.validate(mockStatement)
    expect(result.error).toBeDefined()
  })

  test('validates fail if missing sbi', () => {
    delete mockStatement.sbi
    const result = schema.validate(mockStatement)
    expect(result.error).toBeDefined()
  })

  test('validates fail if sbi too high', () => {
    mockStatement.sbi = 10000000000
    const result = schema.validate(mockStatement)
    expect(result.error).toBeDefined()
  })

  test('validates fail if sbi too low', () => {
    mockStatement.sbi = 100
    const result = schema.validate(mockStatement)
    expect(result.error).toBeDefined()
  })

  test('validates fail if missing business name', () => {
    delete mockStatement.businessName
    const result = schema.validate(mockStatement)
    expect(result.error).toBeDefined()
  })

  test('validates fail if missing address', () => {
    delete mockStatement.address
    const result = schema.validate(mockStatement)
    expect(result.error).toBeDefined()
  })

  test('validates fail if missing payments', () => {
    delete mockStatement.payments
    const result = schema.validate(mockStatement)
    expect(result.error).toBeDefined()
  })

  test('validates fail if missing funding', () => {
    delete mockStatement.funding
    const result = schema.validate(mockStatement)
    expect(result.error).toBeDefined()
  })

  test('validates fail if missing funding row', () => {
    delete mockStatement.funding[4]
    const result = schema.validate(mockStatement)
    expect(result.error).toBeDefined()
  })

  test('validates fail if missing scheme', () => {
    delete mockStatement.scheme
    const result = schema.validate(mockStatement)
    expect(result.error).toBeDefined()
  })

  test('validates success if missing email', () => {
    delete mockStatement.email
    const result = schema.validate(mockStatement)
    expect(result.error).toBeUndefined()
  })

  test('validates success if invalid email', () => {
    mockStatement.email = 'This is not an email'
    const result = schema.validate(mockStatement)
    expect(result.error).toBeUndefined()
  })
})
