const schema = require('../../../../app/messaging/schemas/frn')

describe('frn schema', () => {
  const validFRNs = [1000000000, '1000000000']
  const invalidFRNs = [
    10000000000, // too high
    100, // too low
    null, // null
    undefined, // undefined
    '', // empty string
    '100000000a' // unparseable string
  ]

  test.each(validFRNs)('validates success for valid FRN: %s', (frn) => {
    const result = schema.validate(frn)
    expect(result.error).toBeUndefined()
  })

  test.each(invalidFRNs)('validates failure for invalid FRN: %s', (frn) => {
    const result = schema.validate(frn)
    expect(result.error).toBeDefined()
  })
})
