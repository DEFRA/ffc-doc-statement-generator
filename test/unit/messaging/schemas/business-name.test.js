const schema = require('../../../../app/messaging/schemas/business-name')

describe('business name schema', () => {
  test('validates success if business name valid', () => {
    const result = schema.validate('Mr Farmer')
    expect(result.error).toBeUndefined()
  })

  test('validates fail if null business name', () => {
    const result = schema.validate(null)
    expect(result.error).toBeDefined()
  })

  test('validates fail if undefined business name', () => {
    const result = schema.validate(undefined)
    expect(result.error).toBeDefined()
  })

  test('validates fail if empty business name', () => {
    const result = schema.validate('')
    expect(result.error).toBeDefined()
  })
})
