const SOURCE = require('../../../../app/constants/message-source')

const schema = require('../../../../app/messaging/schemas/source')

let source

describe('source schema', () => {
  describe('when source is SOURCE', () => {
    beforeEach(() => {
      source = SOURCE
    })

    test('returns an object', () => {
      const result = schema.validate(source)
      expect(result).toBeInstanceOf(Object)
    })

    test('returns an object with 1 key', () => {
      const result = schema.validate(source)
      expect(Object.keys(result)).toHaveLength(1)
    })

    test('returns an object with "value" key', () => {
      const result = schema.validate(source)
      expect(Object.keys(result)).toContain('value')
    })

    test('returns source for key "value"', () => {
      const result = schema.validate(source)
      expect(result.value).toBe(source)
    })
  })

  describe('when source is "a"', () => {
    beforeEach(() => {
      source = 'a'
    })

    test('returns an object', () => {
      const result = schema.validate(source)
      expect(result).toBeInstanceOf(Object)
    })

    test('returns an object with 2 keys', () => {
      const result = schema.validate(source)
      expect(Object.keys(result)).toHaveLength(2)
    })

    test('returns an object with "value" key', () => {
      const result = schema.validate(source)
      expect(Object.keys(result)).toContain('value')
    })

    test('returns source for key "value"', () => {
      const result = schema.validate(source)
      expect(result.value).toBe(source)
    })

    test('returns an object with "error" key', () => {
      const result = schema.validate(source)
      expect(Object.keys(result)).toContain('error')
    })

    test('returns an Error for key "error"', () => {
      const result = schema.validate(source)
      expect(result.error).toBeInstanceOf(Error)
    })

    test('returns an object with 4 keys for key "error.details[0]"', () => {
      const result = schema.validate(source)
      expect(Object.keys(result.error.details[0])).toHaveLength(4)
    })

    test('returns an object with "type" key for key "error.details[0]"', () => {
      const result = schema.validate(source)
      expect(Object.keys(result.error.details[0])).toContain('type')
    })

    test('returns "any.only" for key "error.details[0].type"', () => {
      const result = schema.validate(source)
      expect(result.error.details[0].type).toBe('any.only')
    })

    test('returns an object with "message" key for key "error.details[0]"', () => {
      const result = schema.validate(source)
      expect(Object.keys(result.error.details[0])).toContain('message')
    })

    test('returns "The source must be SOURCE" for key "error.details[0].message"', () => {
      const result = schema.validate(source)
      expect(result.error.details[0].message).toBe(`The source must be ${SOURCE}.`)
    })
  })

  describe('when source is 0', () => {
    beforeEach(() => {
      source = 0
    })

    test('returns an object', () => {
      const result = schema.validate(source)
      expect(result).toBeInstanceOf(Object)
    })

    test('returns an object with 2 keys', () => {
      const result = schema.validate(source)
      expect(Object.keys(result)).toHaveLength(2)
    })

    test('returns an object with "value" key', () => {
      const result = schema.validate(source)
      expect(Object.keys(result)).toContain('value')
    })

    test('returns source for key "value"', () => {
      const result = schema.validate(source)
      expect(result.value).toBe(source)
    })

    test('returns an object with "error" key', () => {
      const result = schema.validate(source)
      expect(Object.keys(result)).toContain('error')
    })

    test('returns an Error for key "error"', () => {
      const result = schema.validate(source)
      expect(result.error).toBeInstanceOf(Error)
    })

    test('returns an object with 4 keys for key "error.details[0]"', () => {
      const result = schema.validate(source)
      expect(Object.keys(result.error.details[0])).toHaveLength(4)
    })

    test('returns an object with "type" key for key "error.details[0]"', () => {
      const result = schema.validate(source)
      expect(Object.keys(result.error.details[0])).toContain('type')
    })

    test('returns "any.only" for key "error.details[0].type"', () => {
      const result = schema.validate(source)
      expect(result.error.details[0].type).toBe('any.only')
    })

    test('returns an object with "message" key for key "error.details[0]"', () => {
      const result = schema.validate(source)
      expect(Object.keys(result.error.details[0])).toContain('message')
    })

    test('returns "The source must be SOURCE" for key "error.details[0].message"', () => {
      const result = schema.validate(source)
      expect(result.error.details[0].message).toBe(`The source must be ${SOURCE}.`)
    })
  })

  describe('when source is {}', () => {
    beforeEach(() => {
      source = {}
    })

    test('returns an object', () => {
      const result = schema.validate(source)
      expect(result).toBeInstanceOf(Object)
    })

    test('returns an object with 2 keys', () => {
      const result = schema.validate(source)
      expect(Object.keys(result)).toHaveLength(2)
    })

    test('returns an object with "value" key', () => {
      const result = schema.validate(source)
      expect(Object.keys(result)).toContain('value')
    })

    test('returns source for key "value"', () => {
      const result = schema.validate(source)
      expect(result.value).toBe(source)
    })

    test('returns an object with "error" key', () => {
      const result = schema.validate(source)
      expect(Object.keys(result)).toContain('error')
    })

    test('returns an Error for key "error"', () => {
      const result = schema.validate(source)
      expect(result.error).toBeInstanceOf(Error)
    })

    test('returns an object with 4 keys for key "error.details[0]"', () => {
      const result = schema.validate(source)
      expect(Object.keys(result.error.details[0])).toHaveLength(4)
    })

    test('returns an object with "type" key for key "error.details[0]"', () => {
      const result = schema.validate(source)
      expect(Object.keys(result.error.details[0])).toContain('type')
    })

    test('returns "any.only" for key "error.details[0].type"', () => {
      const result = schema.validate(source)
      expect(result.error.details[0].type).toBe('any.only')
    })

    test('returns an object with "message" key for key "error.details[0]"', () => {
      const result = schema.validate(source)
      expect(Object.keys(result.error.details[0])).toContain('message')
    })

    test('returns The source must be SOURCE for key "error.details[0].message"', () => {
      const result = schema.validate(source)
      expect(result.error.details[0].message).toBe(`The source must be ${SOURCE}.`)
    })
  })

  describe('when source is []', () => {
    beforeEach(() => {
      source = []
    })

    test('returns an object', () => {
      const result = schema.validate(source)
      expect(result).toBeInstanceOf(Object)
    })

    test('returns an object with 2 keys', () => {
      const result = schema.validate(source)
      expect(Object.keys(result)).toHaveLength(2)
    })

    test('returns an object with "value" key', () => {
      const result = schema.validate(source)
      expect(Object.keys(result)).toContain('value')
    })

    test('returns source for key "value"', () => {
      const result = schema.validate(source)
      expect(result.value).toBe(source)
    })

    test('returns an object with "error" key', () => {
      const result = schema.validate(source)
      expect(Object.keys(result)).toContain('error')
    })

    test('returns an Error for key "error"', () => {
      const result = schema.validate(source)
      expect(result.error).toBeInstanceOf(Error)
    })

    test('returns an object with 4 keys for key "error.details[0]"', () => {
      const result = schema.validate(source)
      expect(Object.keys(result.error.details[0])).toHaveLength(4)
    })

    test('returns an object with "type" key for key "error.details[0]"', () => {
      const result = schema.validate(source)
      expect(Object.keys(result.error.details[0])).toContain('type')
    })

    test('returns "any.only" for key "error.details[0].type"', () => {
      const result = schema.validate(source)
      expect(result.error.details[0].type).toBe('any.only')
    })

    test('returns an object with "message" key for key "error.details[0]"', () => {
      const result = schema.validate(source)
      expect(Object.keys(result.error.details[0])).toContain('message')
    })

    test('returns "The source must be SOURCE" for key "error.details[0].message"', () => {
      const result = schema.validate(source)
      expect(result.error.details[0].message).toBe(`The source must be ${SOURCE}.`)
    })
  })

  describe('when source is true', () => {
    beforeEach(() => {
      source = true
    })

    test('returns an object', () => {
      const result = schema.validate(source)
      expect(result).toBeInstanceOf(Object)
    })

    test('returns an object with 2 keys', () => {
      const result = schema.validate(source)
      expect(Object.keys(result)).toHaveLength(2)
    })

    test('returns an object with "value" key', () => {
      const result = schema.validate(source)
      expect(Object.keys(result)).toContain('value')
    })

    test('returns source for key "value"', () => {
      const result = schema.validate(source)
      expect(result.value).toBe(source)
    })

    test('returns an object with "error" key', () => {
      const result = schema.validate(source)
      expect(Object.keys(result)).toContain('error')
    })

    test('returns an Error for key "error"', () => {
      const result = schema.validate(source)
      expect(result.error).toBeInstanceOf(Error)
    })

    test('returns an object with 4 keys for key "error.details[0]"', () => {
      const result = schema.validate(source)
      expect(Object.keys(result.error.details[0])).toHaveLength(4)
    })

    test('returns an object with "type" key for key "error.details[0]"', () => {
      const result = schema.validate(source)
      expect(Object.keys(result.error.details[0])).toContain('type')
    })

    test('returns "any.only" for key "error.details[0].type"', () => {
      const result = schema.validate(source)
      expect(result.error.details[0].type).toBe('any.only')
    })

    test('returns an object with "message" key for key "error.details[0]"', () => {
      const result = schema.validate(source)
      expect(Object.keys(result.error.details[0])).toContain('message')
    })

    test('returns "The source must be SOURCE" for key "error.details[0].message"', () => {
      const result = schema.validate(source)
      expect(result.error.details[0].message).toBe(`The source must be ${SOURCE}.`)
    })
  })

  describe('when source is null', () => {
    beforeEach(() => {
      source = null
    })

    test('returns an object', () => {
      const result = schema.validate(source)
      expect(result).toBeInstanceOf(Object)
    })

    test('returns an object with 2 keys', () => {
      const result = schema.validate(source)
      expect(Object.keys(result)).toHaveLength(2)
    })

    test('returns an object with "value" key', () => {
      const result = schema.validate(source)
      expect(Object.keys(result)).toContain('value')
    })

    test('returns source for key "value"', () => {
      const result = schema.validate(source)
      expect(result.value).toBe(source)
    })

    test('returns an object with "error" key', () => {
      const result = schema.validate(source)
      expect(Object.keys(result)).toContain('error')
    })

    test('returns an Error for key "error"', () => {
      const result = schema.validate(source)
      expect(result.error).toBeInstanceOf(Error)
    })

    test('returns an object with 4 keys for key "error.details[0]"', () => {
      const result = schema.validate(source)
      expect(Object.keys(result.error.details[0])).toHaveLength(4)
    })

    test('returns an object with "type" key for key "error.details[0]"', () => {
      const result = schema.validate(source)
      expect(Object.keys(result.error.details[0])).toContain('type')
    })

    test('returns "any.only" for key "error.details[0].type"', () => {
      const result = schema.validate(source)
      expect(result.error.details[0].type).toBe('any.only')
    })

    test('returns an object with "message" key for key "error.details[0]"', () => {
      const result = schema.validate(source)
      expect(Object.keys(result.error.details[0])).toContain('message')
    })

    test('returns "The source must be SOURCE" for key "error.details[0].message"', () => {
      const result = schema.validate(source)
      expect(result.error.details[0].message).toBe(`The source must be ${SOURCE}.`)
    })
  })

  describe('when source is undefined', () => {
    beforeEach(() => {
      source = undefined
    })

    test('returns an object', () => {
      const result = schema.validate(source)
      expect(result).toBeInstanceOf(Object)
    })

    test('returns an object with 2 keys', () => {
      const result = schema.validate(source)
      expect(Object.keys(result)).toHaveLength(2)
    })

    test('returns an object with "value" key', () => {
      const result = schema.validate(source)
      expect(Object.keys(result)).toContain('value')
    })

    test('returns source for key "value"', () => {
      const result = schema.validate(source)
      expect(result.value).toBe(source)
    })

    test('returns an object with "error" key', () => {
      const result = schema.validate(source)
      expect(Object.keys(result)).toContain('error')
    })

    test('returns an Error for key "error"', () => {
      const result = schema.validate(source)
      expect(result.error).toBeInstanceOf(Error)
    })

    test('returns an object with 4 keys for key "error.details[0]"', () => {
      const result = schema.validate(source)
      expect(Object.keys(result.error.details[0])).toHaveLength(4)
    })

    test('returns an object with "type" key for key "error.details[0]"', () => {
      const result = schema.validate(source)
      expect(Object.keys(result.error.details[0])).toContain('type')
    })

    test('returns "any.required" for key "error.details[0].type"', () => {
      const result = schema.validate(source)
      expect(result.error.details[0].type).toBe('any.required')
    })

    test('returns an object with "message" key for key "error.details[0]"', () => {
      const result = schema.validate(source)
      expect(Object.keys(result.error.details[0])).toContain('message')
    })

    test('returns "The source is required." for key "error.details[0].message"', () => {
      const result = schema.validate(source)
      expect(result.error.details[0].message).toBe('The source is required.')
    })
  })
})
