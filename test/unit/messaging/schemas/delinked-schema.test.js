const schema = require('../../../../app/messaging/schemas/delinked-scheme')

describe('Scheme Validator', () => {
  test('should validate a correct scheme object', () => {
    const validScheme = {
      name: 'Valid Scheme Name',
      shortName: 'ShortName',
      year: 2023
    }

    const { error } = schema.validate(validScheme)
    expect(error).toBeUndefined()
  })

  test('should invalidate if name is missing', () => {
    const invalidScheme = {
      shortName: 'ShortName',
      year: 2023
    }

    const { error } = schema.validate(invalidScheme)
    expect(error).toBeDefined()
    expect(error.details[0].message).toBe('Scheme name is required')
  })

  test('should invalidate if name is not a string', () => {
    const invalidScheme = {
      name: 123,
      shortName: 'ShortName',
      year: 2023
    }

    const { error } = schema.validate(invalidScheme)
    expect(error).toBeDefined()
    expect(error.details[0].message).toBe('Scheme name must be a string')
  })

  test('should invalidate if name exceeds max length', () => {
    const invalidScheme = {
      name: 'A'.repeat(101),
      shortName: 'ShortName',
      year: 2023
    }

    const { error } = schema.validate(invalidScheme)
    expect(error).toBeDefined()
    expect(error.details[0].message).toBe('Scheme name must be at most 100 characters')
  })

  test('should invalidate if shortName is missing', () => {
    const invalidScheme = {
      name: 'Valid Scheme Name',
      year: 2023
    }

    const { error } = schema.validate(invalidScheme)
    expect(error).toBeDefined()
    expect(error.details[0].message).toBe('Scheme short name is required')
  })

  test('should invalidate if shortName is not a string', () => {
    const invalidScheme = {
      name: 'Valid Scheme Name',
      shortName: 123,
      year: 2023
    }

    const { error } = schema.validate(invalidScheme)
    expect(error).toBeDefined()
    expect(error.details[0].message).toBe('Scheme short name must be a string')
  })

  test('should invalidate if shortName exceeds max length', () => {
    const invalidScheme = {
      name: 'Valid Scheme Name',
      shortName: 'A'.repeat(11),
      year: 2023
    }

    const { error } = schema.validate(invalidScheme)
    expect(error).toBeDefined()
    expect(error.details[0].message).toBe('Scheme short name must be at most 10 characters')
  })

  test('should invalidate if year is missing', () => {
    const invalidScheme = {
      name: 'Valid Scheme Name',
      shortName: 'ShortName'
    }

    const { error } = schema.validate(invalidScheme)
    expect(error).toBeDefined()
    expect(error.details[0].message).toBe('year is missing but it is required.')
  })

  test('should invalidate if year is not an integer', () => {
    const invalidScheme = {
      name: 'Valid Scheme Name',
      shortName: 'ShortName',
      year: 2023.5
    }

    const { error } = schema.validate(invalidScheme)
    expect(error).toBeDefined()
    expect(error.details[0].message).toBe('The year must be an integer.')
  })

  test('should invalidate if year is below minimum', () => {
    const invalidScheme = {
      name: 'Valid Scheme Name',
      shortName: 'ShortName',
      year: 999
    }

    const { error } = schema.validate(invalidScheme)
    expect(error).toBeDefined()
    expect(error.details[0].message).toBe('The year must be at least 1000.')
  })

  test('should invalidate if year is above maximum', () => {
    const invalidScheme = {
      name: 'Valid Scheme Name',
      shortName: 'ShortName',
      year: 10000
    }

    const { error } = schema.validate(invalidScheme)
    expect(error).toBeDefined()
    expect(error.details[0].message).toBe('The year must be at most 9999.')
  })
})
