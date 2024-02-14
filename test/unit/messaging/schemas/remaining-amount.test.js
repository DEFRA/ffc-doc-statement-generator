const { topUpRemainingAmount: REMAINING_AMOUNT } = require('../../../mocks/components/remaining-amount')
const schema = require('../../../../app/messaging/schemas/remaining-amount')

let remainingAmount

describe('remaining amount schema', () => {
  describe('when remaining amount is present and valid', () => {
    test('validates success if remainingAmount valid', () => {
      const result = schema.validate(REMAINING_AMOUNT)
      expect(result.error).toBeUndefined()
    })

    test('validates fail if null remainingAmount', () => {
      const result = schema.validate(null)
      expect(result.error).toBeDefined()
    })

    test('validates fail if undefined remainingAmount', () => {
      const result = schema.validate(undefined)
      expect(result.error).toBeDefined()
    })

    test('validates fail if empty remainingAmount', () => {
      const result = schema.validate('')
      expect(result.error).toBeDefined()
    })

    test('validates success if remainingAmount is a string that can be parsed', () => {
      const result = schema.validate('400')
      expect(result.error).not.toBeDefined()
    })

    test('validates fail if remainingAmount is a string that cannot be parsed', () => {
      const result = schema.validate('400a')
      expect(result.error).toBeDefined()
    })
  })

  describe('when remaining amount is REMAINING_AMOUNT', () => {
    beforeEach(() => {
      remainingAmount = REMAINING_AMOUNT
    })

    test('returns an object', () => {
      const result = schema.validate(remainingAmount)
      expect(result).toBeInstanceOf(Object)
    })

    test('returns an object with 1 key', () => {
      const result = schema.validate(remainingAmount)
      expect(Object.keys(result)).toHaveLength(1)
    })

    test('returns an object with "value" key', () => {
      const result = schema.validate(remainingAmount)
      expect(Object.keys(result)).toContain('value')
    })

    test('returns remainingAmount for key "value"', () => {
      const result = schema.validate(remainingAmount)
      expect(result.value).toBe(remainingAmount)
    })
  })

  describe('when remaining amount is string REMAINING_AMOUNT', () => {
    beforeEach(() => {
      remainingAmount = String(REMAINING_AMOUNT)
    })

    test('returns an object', () => {
      const result = schema.validate(remainingAmount)
      expect(result).toBeInstanceOf(Object)
    })

    test('returns an object with 1 key', () => {
      const result = schema.validate(remainingAmount)
      expect(Object.keys(result)).toHaveLength(1)
    })

    test('returns an object with "value" key', () => {
      const result = schema.validate(remainingAmount)
      expect(Object.keys(result)).toContain('value')
    })

    test('returns Number(remainingAmount) for key "value"', () => {
      const result = schema.validate(remainingAmount)
      expect(result.value).toBe(Number(remainingAmount))
    })
  })

  describe('when remaining amount is "a"', () => {
    beforeEach(() => {
      remainingAmount = 'a'
    })

    test('returns an object', () => {
      const result = schema.validate(remainingAmount)
      expect(result).toBeInstanceOf(Object)
    })

    test('returns an object with 2 keys', () => {
      const result = schema.validate(remainingAmount)
      expect(Object.keys(result)).toHaveLength(2)
    })

    test('returns an object with "value" key', () => {
      const result = schema.validate(remainingAmount)
      expect(Object.keys(result)).toContain('value')
    })

    test('returns remainingAmount for key "value"', () => {
      const result = schema.validate(remainingAmount)
      expect(result.value).toBe(remainingAmount)
    })

    test('returns an object with "error" key', () => {
      const result = schema.validate(remainingAmount)
      expect(Object.keys(result)).toContain('error')
    })

    test('returns an Error for key "error"', () => {
      const result = schema.validate(remainingAmount)
      expect(result.error).toBeInstanceOf(Error)
    })

    test('returns an object with 4 keys for key "error.details[0]"', () => {
      const result = schema.validate(remainingAmount)
      expect(Object.keys(result.error.details[0])).toHaveLength(4)
    })

    test('returns an object with "type" key for key "error.details[0]"', () => {
      const result = schema.validate(remainingAmount)
      expect(Object.keys(result.error.details[0])).toContain('type')
    })

    test('returns "number.base" for key "error.details[0].type"', () => {
      const result = schema.validate(remainingAmount)
      expect(result.error.details[0].type).toBe('number.base')
    })

    test('returns an object with "message" key for key "error.details[0]"', () => {
      const result = schema.validate(remainingAmount)
      expect(Object.keys(result.error.details[0])).toContain('message')
    })

    test('returns "The remaining amount must be a number." for key "error.details[0].message"', () => {
      const result = schema.validate(remainingAmount)
      expect(result.error.details[0].message).toBe('The remaining amount must be a number.')
    })
  })

  describe('when remaining amount is {}', () => {
    beforeEach(() => {
      remainingAmount = {}
    })

    test('returns an object', () => {
      const result = schema.validate(remainingAmount)
      expect(result).toBeInstanceOf(Object)
    })

    test('returns an object with 2 keys', () => {
      const result = schema.validate(remainingAmount)
      expect(Object.keys(result)).toHaveLength(2)
    })

    test('returns an object with "value" key', () => {
      const result = schema.validate(remainingAmount)
      expect(Object.keys(result)).toContain('value')
    })

    test('returns remainingAmount for key "value"', () => {
      const result = schema.validate(remainingAmount)
      expect(result.value).toBe(remainingAmount)
    })

    test('returns an object with "error" key', () => {
      const result = schema.validate(remainingAmount)
      expect(Object.keys(result)).toContain('error')
    })

    test('returns an Error for key "error"', () => {
      const result = schema.validate(remainingAmount)
      expect(result.error).toBeInstanceOf(Error)
    })

    test('returns an object with 4 keys for key "error.details[0]"', () => {
      const result = schema.validate(remainingAmount)
      expect(Object.keys(result.error.details[0])).toHaveLength(4)
    })

    test('returns an object with "type" key for key "error.details[0]"', () => {
      const result = schema.validate(remainingAmount)
      expect(Object.keys(result.error.details[0])).toContain('type')
    })

    test('returns "number.base" for key "error.details[0].type"', () => {
      const result = schema.validate(remainingAmount)
      expect(result.error.details[0].type).toBe('number.base')
    })

    test('returns an object with "message" key for key "error.details[0]"', () => {
      const result = schema.validate(remainingAmount)
      expect(Object.keys(result.error.details[0])).toContain('message')
    })

    test('returns "The remaining amount must be a number." for key "error.details[0].message"', () => {
      const result = schema.validate(remainingAmount)
      expect(result.error.details[0].message).toBe('The remaining amount must be a number.')
    })
  })

  describe('when remaining amount is []', () => {
    beforeEach(() => {
      remainingAmount = []
    })

    test('returns an object', () => {
      const result = schema.validate(remainingAmount)
      expect(result).toBeInstanceOf(Object)
    })

    test('returns an object with 2 keys', () => {
      const result = schema.validate(remainingAmount)
      expect(Object.keys(result)).toHaveLength(2)
    })

    test('returns an object with "value" key', () => {
      const result = schema.validate(remainingAmount)
      expect(Object.keys(result)).toContain('value')
    })

    test('returns remainingAmount for key "value"', () => {
      const result = schema.validate(remainingAmount)
      expect(result.value).toBe(remainingAmount)
    })

    test('returns an object with "error" key', () => {
      const result = schema.validate(remainingAmount)
      expect(Object.keys(result)).toContain('error')
    })

    test('returns an Error for key "error"', () => {
      const result = schema.validate(remainingAmount)
      expect(result.error).toBeInstanceOf(Error)
    })

    test('returns an object with 4 keys for key "error.details[0]"', () => {
      const result = schema.validate(remainingAmount)
      expect(Object.keys(result.error.details[0])).toHaveLength(4)
    })

    test('returns an object with "type" key for key "error.details[0]"', () => {
      const result = schema.validate(remainingAmount)
      expect(Object.keys(result.error.details[0])).toContain('type')
    })

    test('returns "number.base" for key "error.details[0].type"', () => {
      const result = schema.validate(remainingAmount)
      expect(result.error.details[0].type).toBe('number.base')
    })

    test('returns an object with "message" key for key "error.details[0]"', () => {
      const result = schema.validate(remainingAmount)
      expect(Object.keys(result.error.details[0])).toContain('message')
    })

    test('returns "The remaining amount must be a number." for key "error.details[0].message"', () => {
      const result = schema.validate(remainingAmount)
      expect(result.error.details[0].message).toBe('The remaining amount must be a number.')
    })
  })
})
