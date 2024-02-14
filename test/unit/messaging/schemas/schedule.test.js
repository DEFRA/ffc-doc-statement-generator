const schema = require('../../../../app/messaging/schemas/schedule')

let mockSchedule

describe('schedule schema', () => {
  beforeEach(() => {
    mockSchedule = JSON.parse(JSON.stringify(require('../../../mocks/mock-schedule').topUpSchedule))
  })

  test('validates success if all present', () => {
    const result = schema.validate(mockSchedule)
    expect(result.error).toBeUndefined()
  })

  test('validates fail if missing frn', () => {
    delete mockSchedule.frn
    const result = schema.validate(mockSchedule)
    expect(result.error).toBeDefined()
  })

  test('validates fail if frn too high', () => {
    mockSchedule.frn = 10000000000
    const result = schema.validate(mockSchedule)
    expect(result.error).toBeDefined()
  })

  test('validates fail if frn too low', () => {
    mockSchedule.frn = 100
    const result = schema.validate(mockSchedule)
    expect(result.error).toBeDefined()
  })

  test('validates fail if missing sbi', () => {
    delete mockSchedule.sbi
    const result = schema.validate(mockSchedule)
    expect(result.error).toBeDefined()
  })

  test('validates fail if sbi too high', () => {
    mockSchedule.sbi = 10000000000
    const result = schema.validate(mockSchedule)
    expect(result.error).toBeDefined()
  })

  test('validates fail if sbi too low', () => {
    mockSchedule.sbi = 100
    const result = schema.validate(mockSchedule)
    expect(result.error).toBeDefined()
  })

  test('validates fail if missing business name', () => {
    delete mockSchedule.businessName
    const result = schema.validate(mockSchedule)
    expect(result.error).toBeDefined()
  })

  test('validates fail if missing address', () => {
    delete mockSchedule.address
    const result = schema.validate(mockSchedule)
    expect(result.error).toBeDefined()
  })

  test('validates fail if missing adjustment', () => {
    delete mockSchedule.adjustment
    const result = schema.validate(mockSchedule)
    expect(result.error).toBeDefined()
  })

  test('validates fail if missing payment schedule', () => {
    delete mockSchedule.schedule
    const result = schema.validate(mockSchedule)
    expect(result.error).toBeDefined()
  })

  test('validates fail if payment schedule is object', () => {
    mockSchedule.schedule = {}
    const result = schema.validate(mockSchedule)
    expect(result.error).toBeDefined()
  })

  test('validates fail if missing scheme', () => {
    delete mockSchedule.scheme
    const result = schema.validate(mockSchedule)
    expect(result.error).toBeDefined()
  })

  test('validates success if missing email', () => {
    delete mockSchedule.email
    const result = schema.validate(mockSchedule)
    expect(result.error).toBeUndefined()
  })

  test('validates success if invalid email', () => {
    mockSchedule.email = 'This is not an email'
    const result = schema.validate(mockSchedule)
    expect(result.error).toBeUndefined()
  })
})
