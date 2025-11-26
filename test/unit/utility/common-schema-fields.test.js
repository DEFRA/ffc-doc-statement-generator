const { numberSchema, stringSchema, emailSchema, dateSchema, precisionSchema } = require('../../../app/utility/common-schema-fields')

describe('validationSchemaTests', () => {
  describe('numberSchema', () => {
    const schemaName = 'testNumber'
    const schema = numberSchema(schemaName)

    test('should validate a valid integer', () => {
      const result = schema.validate(100)
      expect(result.error).toBeUndefined()
    })

    test.each([
      { value: 100.5, expectedMessage: `${schemaName} should be an integer` },
      { value: undefined, expectedMessage: `The field ${schemaName} is not present but it is required` }
    ])('should return error for invalid number %#', ({ value, expectedMessage }) => {
      const result = schema.validate(value)
      expect(result.error).toBeDefined()
      expect(result.error.message).toBe(expectedMessage)
    })
  })

  describe('stringSchema', () => {
    test('should validate a valid string', () => {
      const schema = stringSchema('testString', 10)
      const result = schema.validate('valid')
      expect(result.error).toBeUndefined()
    })

    test.each([
      { name: 'testString', value: 'exceeding', maxLength: 5, expectedMessage: 'testString should have a maximum length of 5' },
      { name: 'testString', value: undefined, expectedMessage: 'The field testString is not present but it is required' },
      { name: 'testPattern', value: 'InvalidString123', pattern: /^[a-z]+$/, expectedMessage: 'testPattern is not in the correct format' }
    ])('should return error for invalid or missing string %#', ({ name, value, maxLength, pattern, expectedMessage }) => {
      const schema = stringSchema(name, maxLength, pattern)
      const result = schema.validate(value)
      expect(result.error).toBeDefined()
      expect(result.error.message).toBe(expectedMessage)
    })

    test('should validate string matching pattern', () => {
      const schema = stringSchema('testPattern', undefined, /^[a-z]+$/)
      const result = schema.validate('validstring')
      expect(result.error).toBeUndefined()
    })
  })

  describe('emailSchema', () => {
    test('should validate a valid email', () => {
      const schema = emailSchema('testEmail', 50)
      const result = schema.validate('test@example.com')
      expect(result.error).toBeUndefined()
    })

    test('should return no error for null email', () => {
      const schema = emailSchema('testEmail')
      const result = schema.validate(null)
      expect(result.error).toBeUndefined()
    })
  })

  describe('dateSchema', () => {
    const schemaName = 'testDate'
    const schema = dateSchema(schemaName)

    test('should validate a valid date', () => {
      const result = schema.validate(new Date('2024-01-01'))
      expect(result.error).toBeUndefined()
    })

    test.each([
      { value: 'not-a-date', expectedMessage: `${schemaName} should be a valid date` },
      { value: undefined, expectedMessage: `The field ${schemaName} is not present but it is required` }
    ])('should return error for invalid or missing date %#', ({ value, expectedMessage }) => {
      const result = schema.validate(value)
      expect(result.error).toBeDefined()
      expect(result.error.message).toBe(expectedMessage)
    })
  })

  describe('precisionSchema', () => {
    const schemaName = 'testPrecision'
    const schema = precisionSchema(schemaName, 2)

    test('should validate a number with correct precision', () => {
      const result = schema.validate(123.45)
      expect(result.error).toBeUndefined()
    })

    test('should return error for missing precision', () => {
      const result = schema.validate()
      expect(result.error).toBeDefined()
      expect(result.error.message).toBe(`The field ${schemaName} is not present but it is required`)
    })
  })
})
