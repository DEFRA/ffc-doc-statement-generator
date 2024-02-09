const DOCUMENT_REFERENCE = require('../../../mocks/components/document-reference')

const schema = require('../../../../app/messaging/schemas/document-reference')

let documentReference

describe('document reference schema', () => {
  describe('when document reference is DOCUMENT_REFERENCE', () => {
    beforeEach(() => {
      documentReference = DOCUMENT_REFERENCE
    })

    test('returns an object', () => {
      const result = schema.validate(documentReference)
      expect(result).toBeInstanceOf(Object)
    })

    test('returns an object with 1 key', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result)).toHaveLength(1)
    })

    test('returns an object with "value" key', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result)).toContain('value')
    })

    test('returns documentReference for key "value"', () => {
      const result = schema.validate(documentReference)
      expect(result.value).toBe(documentReference)
    })
  })

  describe('when document reference is string DOCUMENT_REFERENCE', () => {
    beforeEach(() => {
      documentReference = String(DOCUMENT_REFERENCE)
    })

    test('returns an object', () => {
      const result = schema.validate(documentReference)
      expect(result).toBeInstanceOf(Object)
    })

    test('returns an object with 1 key', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result)).toHaveLength(1)
    })

    test('returns an object with "value" key', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result)).toContain('value')
    })

    test('returns Number(documentReference) for key "value"', () => {
      const result = schema.validate(documentReference)
      expect(result.value).toBe(Number(documentReference))
    })
  })

  describe('when document reference is null', () => {
    beforeEach(() => {
      documentReference = null
    })

    test('returns an object', () => {
      const result = schema.validate(documentReference)
      expect(result).toBeInstanceOf(Object)
    })

    test('returns an object with 1 key', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result)).toHaveLength(1)
    })

    test('returns an object with "value" key', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result)).toContain('value')
    })

    test('returns documentReference for key "value"', () => {
      const result = schema.validate(documentReference)
      expect(result.value).toBe(documentReference)
    })

    test('returns documentReference for key "value"', () => {
      const result = schema.validate(documentReference)
      expect(result.value).toBe(documentReference)
    })
  })

  describe('when document reference is undefined', () => {
    beforeEach(() => {
      documentReference = undefined
    })

    test('returns an object', () => {
      const result = schema.validate(documentReference)
      expect(result).toBeInstanceOf(Object)
    })

    test('returns an object with 1 key', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result)).toHaveLength(1)
    })

    test('returns an object with "value" key', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result)).toContain('value')
    })

    test('returns documentReference for key "value"', () => {
      const result = schema.validate(documentReference)
      expect(result.value).toBe(documentReference)
    })
  })

  describe('when document reference is 0', () => {
    beforeEach(() => {
      documentReference = 0
    })

    test('returns an object', () => {
      const result = schema.validate(documentReference)
      expect(result).toBeInstanceOf(Object)
    })

    test('returns an object with 2 keys', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result)).toHaveLength(2)
    })

    test('returns an object with "value" key', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result)).toContain('value')
    })

    test('returns documentReference for key "value"', () => {
      const result = schema.validate(documentReference)
      expect(result.value).toBe(documentReference)
    })

    test('returns an object with "error" key', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result)).toContain('error')
    })

    test('returns an Error for key "error"', () => {
      const result = schema.validate(documentReference)
      expect(result.error).toBeInstanceOf(Error)
    })

    test('returns an object with 4 keys for key "error.details[0]"', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result.error.details[0])).toHaveLength(4)
    })

    test('returns an object with "type" key for key "error.details[0]"', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result.error.details[0])).toContain('type')
    })

    test('returns "number.positive" for key "error.details[0].type"', () => {
      const result = schema.validate(documentReference)
      expect(result.error.details[0].type).toBe('number.positive')
    })

    test('returns an object with "message" key for key "error.details[0]"', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result.error.details[0])).toContain('message')
    })

    test('returns "The document reference must be a number greater than 0." for key "error.details[0].message"', () => {
      const result = schema.validate(documentReference)
      expect(result.error.details[0].message).toBe('The document reference must be a number greater than 0.')
    })
  })

  describe('when document reference is "0"', () => {
    beforeEach(() => {
      documentReference = '0'
    })

    test('returns an object', () => {
      const result = schema.validate(documentReference)
      expect(result).toBeInstanceOf(Object)
    })

    test('returns an object with 2 keys', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result)).toHaveLength(2)
    })

    test('returns an object with "value" key', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result)).toContain('value')
    })

    test('returns Number(documentReference) for key "value"', () => {
      const result = schema.validate(documentReference)
      expect(result.value).toBe(Number(documentReference))
    })

    test('returns an object with "error" key', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result)).toContain('error')
    })

    test('returns an Error for key "error"', () => {
      const result = schema.validate(documentReference)
      expect(result.error).toBeInstanceOf(Error)
    })

    test('returns an object with 4 keys for key "error.details[0]"', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result.error.details[0])).toHaveLength(4)
    })

    test('returns an object with "type" key for key "error.details[0]"', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result.error.details[0])).toContain('type')
    })

    test('returns "number.positive" for key "error.details[0].type"', () => {
      const result = schema.validate(documentReference)
      expect(result.error.details[0].type).toBe('number.positive')
    })

    test('returns an object with "message" key for key "error.details[0]"', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result.error.details[0])).toContain('message')
    })

    test('returns "The document reference must be a number greater than 0." for key "error.details[0].message"', () => {
      const result = schema.validate(documentReference)
      expect(result.error.details[0].message).toBe('The document reference must be a number greater than 0.')
    })
  })

  describe('when document reference is -1', () => {
    beforeEach(() => {
      documentReference = -1
    })

    test('returns an object', () => {
      const result = schema.validate(documentReference)
      expect(result).toBeInstanceOf(Object)
    })

    test('returns an object with 2 keys', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result)).toHaveLength(2)
    })

    test('returns an object with "value" key', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result)).toContain('value')
    })

    test('returns documentReference for key "value"', () => {
      const result = schema.validate(documentReference)
      expect(result.value).toBe(documentReference)
    })

    test('returns an object with "error" key', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result)).toContain('error')
    })

    test('returns an Error for key "error"', () => {
      const result = schema.validate(documentReference)
      expect(result.error).toBeInstanceOf(Error)
    })

    test('returns an object with 4 keys for key "error.details[0]"', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result.error.details[0])).toHaveLength(4)
    })

    test('returns an object with "type" key for key "error.details[0]"', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result.error.details[0])).toContain('type')
    })

    test('returns "number.positive" for key "error.details[0].type"', () => {
      const result = schema.validate(documentReference)
      expect(result.error.details[0].type).toBe('number.positive')
    })

    test('returns an object with "message" key for key "error.details[0]"', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result.error.details[0])).toContain('message')
    })

    test('returns "The document reference must be a number greater than 0." for key "error.details[0].message"', () => {
      const result = schema.validate(documentReference)
      expect(result.error.details[0].message).toBe('The document reference must be a number greater than 0.')
    })
  })

  describe('when document reference is "-1"', () => {
    beforeEach(() => {
      documentReference = '-1'
    })

    test('returns an object', () => {
      const result = schema.validate(documentReference)
      expect(result).toBeInstanceOf(Object)
    })

    test('returns an object with 2 keys', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result)).toHaveLength(2)
    })

    test('returns an object with "value" key', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result)).toContain('value')
    })

    test('returns Number(documentReference) for key "value"', () => {
      const result = schema.validate(documentReference)
      expect(result.value).toBe(Number(documentReference))
    })

    test('returns an object with "error" key', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result)).toContain('error')
    })

    test('returns an Error for key "error"', () => {
      const result = schema.validate(documentReference)
      expect(result.error).toBeInstanceOf(Error)
    })

    test('returns an object with 4 keys for key "error.details[0]"', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result.error.details[0])).toHaveLength(4)
    })

    test('returns an object with "type" key for key "error.details[0]"', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result.error.details[0])).toContain('type')
    })

    test('returns "number.positive" for key "error.details[0].type"', () => {
      const result = schema.validate(documentReference)
      expect(result.error.details[0].type).toBe('number.positive')
    })

    test('returns an object with "message" key for key "error.details[0]"', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result.error.details[0])).toContain('message')
    })

    test('returns "The document reference must be a number greater than 0." for key "error.details[0].message"', () => {
      const result = schema.validate(documentReference)
      expect(result.error.details[0].message).toBe('The document reference must be a number greater than 0.')
    })
  })

  describe('when document reference is "a"', () => {
    beforeEach(() => {
      documentReference = 'a'
    })

    test('returns an object', () => {
      const result = schema.validate(documentReference)
      expect(result).toBeInstanceOf(Object)
    })

    test('returns an object with 2 keys', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result)).toHaveLength(2)
    })

    test('returns an object with "value" key', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result)).toContain('value')
    })

    test('returns documentReference for key "value"', () => {
      const result = schema.validate(documentReference)
      expect(result.value).toBe(documentReference)
    })

    test('returns an object with "error" key', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result)).toContain('error')
    })

    test('returns an Error for key "error"', () => {
      const result = schema.validate(documentReference)
      expect(result.error).toBeInstanceOf(Error)
    })

    test('returns an object with 4 keys for key "error.details[0]"', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result.error.details[0])).toHaveLength(4)
    })

    test('returns an object with "type" key for key "error.details[0]"', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result.error.details[0])).toContain('type')
    })

    test('returns "number.base" for key "error.details[0].type"', () => {
      const result = schema.validate(documentReference)
      expect(result.error.details[0].type).toBe('number.base')
    })

    test('returns an object with "message" key for key "error.details[0]"', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result.error.details[0])).toContain('message')
    })

    test('returns "The document reference must be a number." for key "error.details[0].message"', () => {
      const result = schema.validate(documentReference)
      expect(result.error.details[0].message).toBe('The document reference must be a number.')
    })
  })

  describe('when document reference is {}', () => {
    beforeEach(() => {
      documentReference = {}
    })

    test('returns an object', () => {
      const result = schema.validate(documentReference)
      expect(result).toBeInstanceOf(Object)
    })

    test('returns an object with 2 keys', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result)).toHaveLength(2)
    })

    test('returns an object with "value" key', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result)).toContain('value')
    })

    test('returns documentReference for key "value"', () => {
      const result = schema.validate(documentReference)
      expect(result.value).toBe(documentReference)
    })

    test('returns an object with "error" key', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result)).toContain('error')
    })

    test('returns an Error for key "error"', () => {
      const result = schema.validate(documentReference)
      expect(result.error).toBeInstanceOf(Error)
    })

    test('returns an object with 4 keys for key "error.details[0]"', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result.error.details[0])).toHaveLength(4)
    })

    test('returns an object with "type" key for key "error.details[0]"', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result.error.details[0])).toContain('type')
    })

    test('returns "number.base" for key "error.details[0].type"', () => {
      const result = schema.validate(documentReference)
      expect(result.error.details[0].type).toBe('number.base')
    })

    test('returns an object with "message" key for key "error.details[0]"', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result.error.details[0])).toContain('message')
    })

    test('returns "The document reference must be a number." for key "error.details[0].message"', () => {
      const result = schema.validate(documentReference)
      expect(result.error.details[0].message).toBe('The document reference must be a number.')
    })
  })

  describe('when document reference is []', () => {
    beforeEach(() => {
      documentReference = []
    })

    test('returns an object', () => {
      const result = schema.validate(documentReference)
      expect(result).toBeInstanceOf(Object)
    })

    test('returns an object with 2 keys', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result)).toHaveLength(2)
    })

    test('returns an object with "value" key', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result)).toContain('value')
    })

    test('returns documentReference for key "value"', () => {
      const result = schema.validate(documentReference)
      expect(result.value).toBe(documentReference)
    })

    test('returns an object with "error" key', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result)).toContain('error')
    })

    test('returns an Error for key "error"', () => {
      const result = schema.validate(documentReference)
      expect(result.error).toBeInstanceOf(Error)
    })

    test('returns an object with 4 keys for key "error.details[0]"', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result.error.details[0])).toHaveLength(4)
    })

    test('returns an object with "type" key for key "error.details[0]"', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result.error.details[0])).toContain('type')
    })

    test('returns "number.base" for key "error.details[0].type"', () => {
      const result = schema.validate(documentReference)
      expect(result.error.details[0].type).toBe('number.base')
    })

    test('returns an object with "message" key for key "error.details[0]"', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result.error.details[0])).toContain('message')
    })

    test('returns "The document reference must be a number." for key "error.details[0].message"', () => {
      const result = schema.validate(documentReference)
      expect(result.error.details[0].message).toBe('The document reference must be a number.')
    })
  })
})
