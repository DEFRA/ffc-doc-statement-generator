const schema = require('../../../../app/messaging/schemas/frn')

describe('frn schema', () => {
  test('validates success if frn valid', () => {
    const result = schema.validate(1000000000)
    expect(result.error).toBeUndefined()
  })

  test('validates fail if frn too high', () => {
    const result = schema.validate(10000000000)
    expect(result.error).toBeDefined()
  })

  test('validates fail if frn too low', () => {
    const result = schema.validate(100)
    expect(result.error).toBeDefined()
  })

  test('validates fail if null frn', () => {
    const result = schema.validate(null)
    expect(result.error).toBeDefined()
  })

  test('validates fail if undefined frn', () => {
    const result = schema.validate(undefined)
    expect(result.error).toBeDefined()
  })

  test('validates fail if empty frn', () => {
    const result = schema.validate('')
    expect(result.error).toBeDefined()
  })

  test('validates success if frn is a string that can be parsed', () => {
    const result = schema.validate('1000000000')
    expect(result.error).not.toBeDefined()
  })

  test('validates fail if frn is a string that cannot be parsed', () => {
    const result = schema.validate('100000000a')
    expect(result.error).toBeDefined()
  })
})
