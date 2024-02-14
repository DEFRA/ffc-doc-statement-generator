const schema = require('../../../../app/messaging/schemas/email')

describe('email schema', () => {
  test('validates success if email valid', () => {
    const result = schema.validate('test@email.com')
    expect(result.error).toBeUndefined()
  })

  test('validates success if null email', () => {
    const result = schema.validate(null)
    expect(result.error).toBeUndefined()
  })

  test('validates success if undefined email', () => {
    const result = schema.validate(undefined)
    expect(result.error).toBeUndefined()
  })

  test('validates success if invalid email', () => {
    const result = schema.validate('This is not an email')
    expect(result.error).toBeUndefined()
  })

  test('validates success if empty email', () => {
    const result = schema.validate('')
    expect(result.error).toBeUndefined()
  })
})
