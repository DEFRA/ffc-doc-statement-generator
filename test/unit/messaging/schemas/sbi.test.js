const schema = require('../../../../app/messaging/schemas/sbi')

describe('sbi schema', () => {
  test('validates success if sbi valid', () => {
    const result = schema.validate(105000000)
    expect(result.error).toBeUndefined()
  })

  test('validates fail if sbi too high', () => {
    const result = schema.validate(10000000000)
    expect(result.error).toBeDefined()
  })

  test('validates fail if sbi too low', () => {
    const result = schema.validate(100)
    expect(result.error).toBeDefined()
  })

  test('validates fail if null sbi', () => {
    const result = schema.validate(null)
    expect(result.error).toBeDefined()
  })

  test('validates fail if undefined sbi', () => {
    const result = schema.validate(undefined)
    expect(result.error).toBeDefined()
  })

  test('validates fail if empty sbi', () => {
    const result = schema.validate('')
    expect(result.error).toBeDefined()
  })

  test('validates success if sbi is a string that can be parsed', () => {
    const result = schema.validate('105000000')
    expect(result.error).not.toBeDefined()
  })

  test('validates fail if sbi is a string that cannot be parsed', () => {
    const result = schema.validate('105000000a')
    expect(result.error).toBeDefined()
  })
})
