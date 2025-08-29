const { numberSchema, stringSchema, emailSchema, dateSchema, precisionSchema } = require('../../../app/utility/common-schema-fields')

describe('Validation Schema Tests', () => {
  describe('numberSchema', () => {
    test('should validate a valid integer', () => {
      const schema = numberSchema('testNumber')
      const result = schema.validate(100)
      expect(result.error).toBeUndefined()
    })

    test('should return error for non-integer value', () => {
      const schema = numberSchema('testNumber')
      const result = schema.validate(100.5)
      expect(result.error).toBeDefined()
      expect(result.error.message).toBe('testNumber should be an integer')
    })

    test('should return error for missing value', () => {
      const schema = numberSchema('testNumber')
      const result = schema.validate()
      expect(result.error).toBeDefined()
      expect(result.error.message).toBe('The field testNumber is not present but it is required')
    })
  })

  describe('stringSchema', () => {
    test('should validate a valid string', () => {
      const schema = stringSchema('testString', 10)
      const result = schema.validate('valid')
      expect(result.error).toBeUndefined()
    })

    test('should return error for string exceeding max length', () => {
      const schema = stringSchema('testString', 5)
      const result = schema.validate('exceeding')
      expect(result.error).toBeDefined()
      expect(result.error.message).toBe('testString should have a maximum length of 5')
    })

    test('should return error for missing string', () => {
      const schema = stringSchema('testString')
      const result = schema.validate()
      expect(result.error).toBeDefined()
      expect(result.error.message).toBe('The field testString is not present but it is required')
    })

    test('should validate string matching pattern', () => {
      const schema = stringSchema('testPattern', undefined, /^[a-z]+$/)
      const result = schema.validate('validstring')
      expect(result.error).toBeUndefined()
    })

    test('should return error for string not matching pattern', () => {
      const schema = stringSchema('testPattern', undefined, /^[a-z]+$/)
      const result = schema.validate('InvalidString123')
      expect(result.error).toBeDefined()
      expect(result.error.message).toBe('testPattern is not in the correct format')
    })
  })

  describe('emailSchema', () => {
    test('should validate a valid email', () => {
      const schema = emailSchema('testEmail', 50)
      const result = schema.validate('test@example.com')
      expect(result.error).toBeUndefined()
    })

    test('should return error for missing email', () => {
      const schema = emailSchema('testEmail')
      const result = schema.validate(null)
      expect(result.error).toBeUndefined()
    })
  })

  describe('dateSchema', () => {
    test('should validate a valid date', () => {
      const schema = dateSchema('testDate')
      const result = schema.validate(new Date('2024-01-01'))
      expect(result.error).toBeUndefined()
    })

    test('should return error for invalid date', () => {
      const schema = dateSchema('testDate')
      const result = schema.validate('not-a-date')
      expect(result.error).toBeDefined()
      expect(result.error.message).toBe('testDate should be a valid date')
    })

    test('should return error for missing date', () => {
      const schema = dateSchema('testDate')
      const result = schema.validate()
      expect(result.error).toBeDefined()
      expect(result.error.message).toBe('The field testDate is not present but it is required')
    })
  })

  describe('precisionSchema', () => {
    test('should validate a number with correct precision', () => {
      const schema = precisionSchema('testPrecision', 2)
      const result = schema.validate(123.45)
      expect(result.error).toBeUndefined()
    })

    test('should return error for missing precision', () => {
      const schema = precisionSchema('testPrecision', 2)
      const result = schema.validate()
      expect(result.error).toBeDefined()
      expect(result.error.message).toBe('The field testPrecision is not present but it is required')
    })
  })
})
