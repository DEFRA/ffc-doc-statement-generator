const schema = require('../../../../app/messaging/schemas/business-name')

describe('businessNameSchema', () => {
  test('validates success if business name valid', () => {
    const result = schema.validate('Mr Farmer')
    expect(result.error).toBeUndefined()
  })

  test('validates fail if business name is too long', () => {
    const longName = 'vnaodnvenrnrankanlsnanvrarnrnvkrsnvrnvrnvrnkv'.repeat(7)
    const result = schema.validate(longName)
    expect(result.error).toBeDefined()
  })

  test.each([null, undefined, ''])('validates fail if business name is %s', (value) => {
    const result = schema.validate(value)
    expect(result.error).toBeDefined()
  })
})
