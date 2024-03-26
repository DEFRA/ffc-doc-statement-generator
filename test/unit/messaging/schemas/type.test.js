const { STATEMENT, SCHEDULE, SFI23QUARTERLYSTATEMENT } = require('../../../../app/constants/document-types')
const TYPES = [`uk.gov.doc.${STATEMENT.id}.publish`, `uk.gov.doc.${SCHEDULE.id}.publish`, `uk.gov.doc.${SFI23QUARTERLYSTATEMENT.id}.publish`]

const schema = require('../../../../app/messaging/schemas/type')

let type

describe('type schema', () => {
  describe('when type is TYPES[0]', () => {
    beforeEach(() => {
      type = TYPES[0]
    })

    test('returns an object', () => {
      const result = schema.validate(type)
      expect(result).toBeInstanceOf(Object)
    })

    test('returns an object with 1 key', () => {
      const result = schema.validate(type)
      expect(Object.keys(result)).toHaveLength(1)
    })

    test('returns an object with "value" key', () => {
      const result = schema.validate(type)
      expect(Object.keys(result)).toContain('value')
    })

    test('returns type for key "value"', () => {
      const result = schema.validate(type)
      expect(result.value).toBe(type)
    })
  })

  describe('when type is TYPES[1]', () => {
    beforeEach(() => {
      type = TYPES[1]
    })

    test('returns an object', () => {
      const result = schema.validate(type)
      expect(result).toBeInstanceOf(Object)
    })

    test('returns an object with 1 key', () => {
      const result = schema.validate(type)
      expect(Object.keys(result)).toHaveLength(1)
    })

    test('returns an object with "value" key', () => {
      const result = schema.validate(type)
      expect(Object.keys(result)).toContain('value')
    })

    test('returns type for key "value"', () => {
      const result = schema.validate(type)
      expect(result.value).toBe(type)
    })
  })

  describe('when type is "a"', () => {
    beforeEach(() => {
      type = 'a'
    })

    test('returns an object', () => {
      const result = schema.validate(type)
      expect(result).toBeInstanceOf(Object)
    })

    test('returns an object with 2 keys', () => {
      const result = schema.validate(type)
      expect(Object.keys(result)).toHaveLength(2)
    })

    test('returns an object with "value" key', () => {
      const result = schema.validate(type)
      expect(Object.keys(result)).toContain('value')
    })

    test('returns type for key "value"', () => {
      const result = schema.validate(type)
      expect(result.value).toBe(type)
    })

    test('returns an object with "error" key', () => {
      const result = schema.validate(type)
      expect(Object.keys(result)).toContain('error')
    })

    test('returns an Error for key "error"', () => {
      const result = schema.validate(type)
      expect(result.error).toBeInstanceOf(Error)
    })

    test('returns an object with 4 keys for key "error.details[0]"', () => {
      const result = schema.validate(type)
      expect(Object.keys(result.error.details[0])).toHaveLength(4)
    })

    test('returns an object with "type" key for key "error.details[0]"', () => {
      const result = schema.validate(type)
      expect(Object.keys(result.error.details[0])).toContain('type')
    })

    test('returns "any.only" for key "error.details[0].type"', () => {
      const result = schema.validate(type)
      expect(result.error.details[0].type).toBe('any.only')
    })

    test('returns an object with "message" key for key "error.details[0]"', () => {
      const result = schema.validate(type)
      expect(Object.keys(result.error.details[0])).toContain('message')
    })

    test('returns "The type must be one of TYPES" for key "error.details[0].message"', () => {
      const result = schema.validate(type)
      expect(result.error.details[0].message).toBe(`The type must be one of ${TYPES}.`)
    })
  })

  describe('when type is 0', () => {
    beforeEach(() => {
      type = 0
    })

    test('returns an object', () => {
      const result = schema.validate(type)
      expect(result).toBeInstanceOf(Object)
    })

    test('returns an object with 2 keys', () => {
      const result = schema.validate(type)
      expect(Object.keys(result)).toHaveLength(2)
    })

    test('returns an object with "value" key', () => {
      const result = schema.validate(type)
      expect(Object.keys(result)).toContain('value')
    })

    test('returns type for key "value"', () => {
      const result = schema.validate(type)
      expect(result.value).toBe(type)
    })

    test('returns an object with "error" key', () => {
      const result = schema.validate(type)
      expect(Object.keys(result)).toContain('error')
    })

    test('returns an Error for key "error"', () => {
      const result = schema.validate(type)
      expect(result.error).toBeInstanceOf(Error)
    })

    test('returns an object with 4 keys for key "error.details[0]"', () => {
      const result = schema.validate(type)
      expect(Object.keys(result.error.details[0])).toHaveLength(4)
    })

    test('returns an object with "type" key for key "error.details[0]"', () => {
      const result = schema.validate(type)
      expect(Object.keys(result.error.details[0])).toContain('type')
    })

    test('returns "any.only" for key "error.details[0].type"', () => {
      const result = schema.validate(type)
      expect(result.error.details[0].type).toBe('any.only')
    })

    test('returns an object with "message" key for key "error.details[0]"', () => {
      const result = schema.validate(type)
      expect(Object.keys(result.error.details[0])).toContain('message')
    })

    test('returns "The type must be one of TYPES" for key "error.details[0].message"', () => {
      const result = schema.validate(type)
      expect(result.error.details[0].message).toBe(`The type must be one of ${TYPES}.`)
    })
  })

  describe('when type is {}', () => {
    beforeEach(() => {
      type = {}
    })

    test('returns an object', () => {
      const result = schema.validate(type)
      expect(result).toBeInstanceOf(Object)
    })

    test('returns an object with 2 keys', () => {
      const result = schema.validate(type)
      expect(Object.keys(result)).toHaveLength(2)
    })

    test('returns an object with "value" key', () => {
      const result = schema.validate(type)
      expect(Object.keys(result)).toContain('value')
    })

    test('returns type for key "value"', () => {
      const result = schema.validate(type)
      expect(result.value).toBe(type)
    })

    test('returns an object with "error" key', () => {
      const result = schema.validate(type)
      expect(Object.keys(result)).toContain('error')
    })

    test('returns an Error for key "error"', () => {
      const result = schema.validate(type)
      expect(result.error).toBeInstanceOf(Error)
    })

    test('returns an object with 4 keys for key "error.details[0]"', () => {
      const result = schema.validate(type)
      expect(Object.keys(result.error.details[0])).toHaveLength(4)
    })

    test('returns an object with "type" key for key "error.details[0]"', () => {
      const result = schema.validate(type)
      expect(Object.keys(result.error.details[0])).toContain('type')
    })

    test('returns "any.only" for key "error.details[0].type"', () => {
      const result = schema.validate(type)
      expect(result.error.details[0].type).toBe('any.only')
    })

    test('returns an object with "message" key for key "error.details[0]"', () => {
      const result = schema.validate(type)
      expect(Object.keys(result.error.details[0])).toContain('message')
    })

    test('returns "The type must be one of TYPES" for key "error.details[0].message"', () => {
      const result = schema.validate(type)
      expect(result.error.details[0].message).toBe(`The type must be one of ${TYPES}.`)
    })
  })

  describe('when type is []', () => {
    beforeEach(() => {
      type = []
    })

    test('returns an object', () => {
      const result = schema.validate(type)
      expect(result).toBeInstanceOf(Object)
    })

    test('returns an object with 2 keys', () => {
      const result = schema.validate(type)
      expect(Object.keys(result)).toHaveLength(2)
    })

    test('returns an object with "value" key', () => {
      const result = schema.validate(type)
      expect(Object.keys(result)).toContain('value')
    })

    test('returns type for key "value"', () => {
      const result = schema.validate(type)
      expect(result.value).toBe(type)
    })

    test('returns an object with "error" key', () => {
      const result = schema.validate(type)
      expect(Object.keys(result)).toContain('error')
    })

    test('returns an Error for key "error"', () => {
      const result = schema.validate(type)
      expect(result.error).toBeInstanceOf(Error)
    })

    test('returns an object with 4 keys for key "error.details[0]"', () => {
      const result = schema.validate(type)
      expect(Object.keys(result.error.details[0])).toHaveLength(4)
    })

    test('returns an object with "type" key for key "error.details[0]"', () => {
      const result = schema.validate(type)
      expect(Object.keys(result.error.details[0])).toContain('type')
    })

    test('returns "any.only" for key "error.details[0].type"', () => {
      const result = schema.validate(type)
      expect(result.error.details[0].type).toBe('any.only')
    })

    test('returns an object with "message" key for key "error.details[0]"', () => {
      const result = schema.validate(type)
      expect(Object.keys(result.error.details[0])).toContain('message')
    })

    test('returns "The type must be one of TYPES" for key "error.details[0].message"', () => {
      const result = schema.validate(type)
      expect(result.error.details[0].message).toBe(`The type must be one of ${TYPES}.`)
    })
  })

  describe('when type is true', () => {
    beforeEach(() => {
      type = true
    })

    test('returns an object', () => {
      const result = schema.validate(type)
      expect(result).toBeInstanceOf(Object)
    })

    test('returns an object with 2 keys', () => {
      const result = schema.validate(type)
      expect(Object.keys(result)).toHaveLength(2)
    })

    test('returns an object with "value" key', () => {
      const result = schema.validate(type)
      expect(Object.keys(result)).toContain('value')
    })

    test('returns type for key "value"', () => {
      const result = schema.validate(type)
      expect(result.value).toBe(type)
    })

    test('returns an object with "error" key', () => {
      const result = schema.validate(type)
      expect(Object.keys(result)).toContain('error')
    })

    test('returns an Error for key "error"', () => {
      const result = schema.validate(type)
      expect(result.error).toBeInstanceOf(Error)
    })

    test('returns an object with 4 keys for key "error.details[0]"', () => {
      const result = schema.validate(type)
      expect(Object.keys(result.error.details[0])).toHaveLength(4)
    })

    test('returns an object with "type" key for key "error.details[0]"', () => {
      const result = schema.validate(type)
      expect(Object.keys(result.error.details[0])).toContain('type')
    })

    test('returns "any.only" for key "error.details[0].type"', () => {
      const result = schema.validate(type)
      expect(result.error.details[0].type).toBe('any.only')
    })

    test('returns an object with "message" key for key "error.details[0]"', () => {
      const result = schema.validate(type)
      expect(Object.keys(result.error.details[0])).toContain('message')
    })

    test('returns "The type must be one of TYPES" for key "error.details[0].message"', () => {
      const result = schema.validate(type)
      expect(result.error.details[0].message).toBe(`The type must be one of ${TYPES}.`)
    })
  })

  describe('when type is null', () => {
    beforeEach(() => {
      type = null
    })

    test('returns an object', () => {
      const result = schema.validate(type)
      expect(result).toBeInstanceOf(Object)
    })

    test('returns an object with 2 keys', () => {
      const result = schema.validate(type)
      expect(Object.keys(result)).toHaveLength(2)
    })

    test('returns an object with "value" key', () => {
      const result = schema.validate(type)
      expect(Object.keys(result)).toContain('value')
    })

    test('returns type for key "value"', () => {
      const result = schema.validate(type)
      expect(result.value).toBe(type)
    })

    test('returns an object with "error" key', () => {
      const result = schema.validate(type)
      expect(Object.keys(result)).toContain('error')
    })

    test('returns an Error for key "error"', () => {
      const result = schema.validate(type)
      expect(result.error).toBeInstanceOf(Error)
    })

    test('returns an object with 4 keys for key "error.details[0]"', () => {
      const result = schema.validate(type)
      expect(Object.keys(result.error.details[0])).toHaveLength(4)
    })

    test('returns an object with "type" key for key "error.details[0]"', () => {
      const result = schema.validate(type)
      expect(Object.keys(result.error.details[0])).toContain('type')
    })

    test('returns "any.only" for key "error.details[0].type"', () => {
      const result = schema.validate(type)
      expect(result.error.details[0].type).toBe('any.only')
    })

    test('returns an object with "message" key for key "error.details[0]"', () => {
      const result = schema.validate(type)
      expect(Object.keys(result.error.details[0])).toContain('message')
    })

    test('returns "The type must be one of TYPES" for key "error.details[0].message"', () => {
      const result = schema.validate(type)
      expect(result.error.details[0].message).toBe(`The type must be one of ${TYPES}.`)
    })
  })

  describe('when type is undefined', () => {
    beforeEach(() => {
      type = undefined
    })

    test('returns an object', () => {
      const result = schema.validate(type)
      expect(result).toBeInstanceOf(Object)
    })

    test('returns an object with 2 keys', () => {
      const result = schema.validate(type)
      expect(Object.keys(result)).toHaveLength(2)
    })

    test('returns an object with "value" key', () => {
      const result = schema.validate(type)
      expect(Object.keys(result)).toContain('value')
    })

    test('returns type for key "value"', () => {
      const result = schema.validate(type)
      expect(result.value).toBe(type)
    })

    test('returns an object with "error" key', () => {
      const result = schema.validate(type)
      expect(Object.keys(result)).toContain('error')
    })

    test('returns an Error for key "error"', () => {
      const result = schema.validate(type)
      expect(result.error).toBeInstanceOf(Error)
    })

    test('returns an object with 4 keys for key "error.details[0]"', () => {
      const result = schema.validate(type)
      expect(Object.keys(result.error.details[0])).toHaveLength(4)
    })

    test('returns an object with "type" key for key "error.details[0]"', () => {
      const result = schema.validate(type)
      expect(Object.keys(result.error.details[0])).toContain('type')
    })

    test('returns "any.required" for key "error.details[0].type"', () => {
      const result = schema.validate(type)
      expect(result.error.details[0].type).toBe('any.required')
    })

    test('returns an object with "message" key for key "error.details[0]"', () => {
      const result = schema.validate(type)
      expect(Object.keys(result.error.details[0])).toContain('message')
    })

    test('returns "The type is required." for key "error.details[0].message"', () => {
      const result = schema.validate(type)
      expect(result.error.details[0].message).toBe('The type is required.')
    })
  })
})
