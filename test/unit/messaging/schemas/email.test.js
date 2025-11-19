const schema = require('../../../../app/messaging/schemas/email')

describe('emailSchema', () => {
  const validCases = [
    'test@email.com',
    null,
    undefined,
    'This is not an email',
    ''
  ]

  test.each(validCases)('validates success if email is %p', (email) => {
    const result = schema.validate(email)
    expect(result.error).toBeUndefined()
  })

  test('validates failure if email too long', () => {
    const result = schema.validate('A'.repeat(256) + '@email.com')
    expect(result.error).toBeDefined()
  })
})
