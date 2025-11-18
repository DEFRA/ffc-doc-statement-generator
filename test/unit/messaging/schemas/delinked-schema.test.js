const schema = require('../../../../app/messaging/schemas/delinked-scheme')

describe('delinkedSchemeSchema', () => {
  const validScheme = {
    name: 'Valid Scheme Name',
    shortName: 'ShortName',
    year: 2023
  }

  test('should validate a correct scheme object', () => {
    const { error } = schema.validate(validScheme)
    expect(error).toBeUndefined()
  })

  const invalidTests = [
    { field: 'name', value: undefined, message: 'Scheme name is required' },
    { field: 'name', value: 123, message: 'Scheme name must be a string' },
    { field: 'name', value: 'A'.repeat(101), message: 'Scheme name must be at most 100 characters' },
    { field: 'shortName', value: undefined, message: 'Scheme short name is required' },
    { field: 'shortName', value: 123, message: 'Scheme short name must be a string' },
    { field: 'shortName', value: 'A'.repeat(11), message: 'Scheme short name must be at most 10 characters' },
    { field: 'year', value: undefined, message: 'year is missing but it is required.' },
    { field: 'year', value: 2023.5, message: 'The year must be an integer.' },
    { field: 'year', value: 999, message: 'The year must be at least 1000.' },
    { field: 'year', value: 10000, message: 'The year must be at most 9999.' }
  ]

  test.each(invalidTests)('should invalidate if $field is $value', ({ field, value, message }) => {
    const invalidScheme = { ...validScheme, [field]: value }
    const { error } = schema.validate(invalidScheme)
    expect(error).toBeDefined()
    expect(error.details[0].message).toBe(message)
  })
})
