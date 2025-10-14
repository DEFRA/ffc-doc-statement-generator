const { SFI23QUARTERLYSTATEMENT_MESSAGE, DELINKEDSTATEMENT_MESSAGE } = require('../../../mocks/messages/publish')

const sfi23Schema = require('../../../../app/messaging/publish/sfi23-schema')
const delinkedSchema = require('../../../../app/messaging/publish/delinked-schema')

let publish

describe('publish schema', () => {
  beforeEach(() => {
    publish = DELINKEDSTATEMENT_MESSAGE
  })

  describe('when publish is SFI23QUARTERLYSTATEMENT_MESSAGE', () => {
    beforeEach(() => {
      publish = SFI23QUARTERLYSTATEMENT_MESSAGE
    })

    test('returns an SFI23 object', () => {
      const result = sfi23Schema.validate(publish)
      expect(result).toBeInstanceOf(Object)
    })

    test('returns an sfi23 object with 1 key', () => {
      const result = sfi23Schema.validate(publish)
      expect(Object.keys(result)).toHaveLength(1)
    })

    test('returns an sfi23 object with "value" key', () => {
      const result = sfi23Schema.validate(publish)
      expect(Object.keys(result)).toContain('value')
    })

    test('returns sfi23 publish for key "value"', () => {
      const result = sfi23Schema.validate(publish)
      expect(result.value).toStrictEqual({ ...publish, body: { ...publish.body } })
    })
  })

  test('returns a delinked object', () => {
    const result = delinkedSchema.validate(publish)
    expect(result).toBeInstanceOf(Object)
  })

  test('returns a delinked object with 1 key', () => {
    const result = delinkedSchema.validate(publish)
    expect(Object.keys(result)).toHaveLength(1)
  })

  test('returns a delinked object with "value" key', () => {
    const result = delinkedSchema.validate(publish)
    expect(Object.keys(result)).toContain('value')
  })

  test('returns delinked publish for key "value"', () => {
    const result = delinkedSchema.validate(publish)
    expect(result.value).toStrictEqual({ ...publish, body: { ...publish.body, transactionDate: expect.any(Date) } })
  })
})

describe('when publish is SFI23QUARTERLYSTATEMENT_MESSAGE with no body', () => {
  beforeEach(() => {
    delete SFI23QUARTERLYSTATEMENT_MESSAGE.body
    publish = SFI23QUARTERLYSTATEMENT_MESSAGE
  })

  test('returns an object', () => {
    const result = sfi23Schema.validate(publish)
    expect(result).toBeInstanceOf(Object)
  })

  test('returns an object with 2 keys', () => {
    const result = sfi23Schema.validate(publish)
    expect(Object.keys(result)).toHaveLength(2)
  })

  test('returns an object with "value" key', () => {
    const result = sfi23Schema.validate(publish)
    expect(Object.keys(result)).toContain('value')
  })

  test('returns publish for key "value"', () => {
    const result = sfi23Schema.validate(publish)
    expect(result.value).toStrictEqual(publish)
  })

  test('returns an object with "error" key', () => {
    const result = sfi23Schema.validate(publish)
    expect(Object.keys(result)).toContain('error')
  })

  test('returns an Error for key "error"', () => {
    const result = sfi23Schema.validate(publish)
    expect(result.error).toBeInstanceOf(Error)
  })

  test('returns an object with 4 keys for key "error.details[0]"', () => {
    const result = sfi23Schema.validate(publish)
    expect(Object.keys(result.error.details[0])).toHaveLength(4)
  })

  test('returns an object with "type" key for key "error.details[0]"', () => {
    const result = sfi23Schema.validate(publish)
    expect(Object.keys(result.error.details[0])).toContain('type')
  })

  test('returns "any.required" for key "error.details[0].type"', () => {
    const result = sfi23Schema.validate(publish)
    expect(result.error.details[0].type).toBe('any.required')
  })

  test('returns an object with "message" key for key "error.details[0]"', () => {
    const result = sfi23Schema.validate(publish)
    expect(Object.keys(result.error.details[0])).toContain('message')
  })

  test('returns "The publish message requires a message with a body" for key "error.details[0].message"', () => {
    const result = sfi23Schema.validate(publish)
    expect(result.error.details[0].message).toBe('The publish message requires a message with a body.')
  })
})

describe('when publish is null', () => {
  beforeEach(() => {
    publish = null
  })

  test('returns an object', () => {
    const result = sfi23Schema.validate(publish)
    expect(result).toBeInstanceOf(Object)
  })

  test('returns an object with 2 keys', () => {
    const result = sfi23Schema.validate(publish)
    expect(Object.keys(result)).toHaveLength(2)
  })

  test('returns an object with "value" key', () => {
    const result = sfi23Schema.validate(publish)
    expect(Object.keys(result)).toContain('value')
  })

  test('returns publish for key "value"', () => {
    const result = sfi23Schema.validate(publish)
    expect(result.value).toBe(publish)
  })

  test('returns an object with "error" key', () => {
    const result = sfi23Schema.validate(publish)
    expect(Object.keys(result)).toContain('error')
  })

  test('returns an Error for key "error"', () => {
    const result = sfi23Schema.validate(publish)
    expect(result.error).toBeInstanceOf(Error)
  })

  test('returns an object with 4 keys for key "error.details[0]"', () => {
    const result = sfi23Schema.validate(publish)
    expect(Object.keys(result.error.details[0])).toHaveLength(4)
  })

  test('returns an object with "type" key for key "error.details[0]"', () => {
    const result = sfi23Schema.validate(publish)
    expect(Object.keys(result.error.details[0])).toContain('type')
  })

  test('returns "object.base" for key "error.details[0].type"', () => {
    const result = sfi23Schema.validate(publish)
    expect(result.error.details[0].type).toBe('object.base')
  })

  test('returns an object with "message" key for key "error.details[0]"', () => {
    const result = sfi23Schema.validate(publish)
    expect(Object.keys(result.error.details[0])).toContain('message')
  })

  test('returns "The publish message must be an object" for key "error.details[0].message"', () => {
    const result = sfi23Schema.validate(publish)
    expect(result.error.details[0].message).toBe('The publish message must be an object.')
  })
})

describe('when publish is undefined', () => {
  beforeEach(() => {
    publish = undefined
  })

  test('returns an object', () => {
    const result = sfi23Schema.validate(publish)
    expect(result).toBeInstanceOf(Object)
  })

  test('returns an object with 2 keys', () => {
    const result = sfi23Schema.validate(publish)
    expect(Object.keys(result)).toHaveLength(2)
  })

  test('returns an object with "value" key', () => {
    const result = sfi23Schema.validate(publish)
    expect(Object.keys(result)).toContain('value')
  })

  test('returns publish for key "value"', () => {
    const result = sfi23Schema.validate(publish)
    expect(result.value).toBe(publish)
  })

  test('returns an object with "error" key', () => {
    const result = sfi23Schema.validate(publish)
    expect(Object.keys(result)).toContain('error')
  })

  test('returns an Error for key "error"', () => {
    const result = sfi23Schema.validate(publish)
    expect(result.error).toBeInstanceOf(Error)
  })

  test('returns an object with 4 keys for key "error.details[0]"', () => {
    const result = sfi23Schema.validate(publish)
    expect(Object.keys(result.error.details[0])).toHaveLength(4)
  })

  test('returns an object with "type" key for key "error.details[0]"', () => {
    const result = sfi23Schema.validate(publish)
    expect(Object.keys(result.error.details[0])).toContain('type')
  })

  test('returns "any.required" for key "error.details[0].type"', () => {
    const result = sfi23Schema.validate(publish)
    expect(result.error.details[0].type).toBe('any.required')
  })

  test('returns an object with "message" key for key "error.details[0]"', () => {
    const result = sfi23Schema.validate(publish)
    expect(Object.keys(result.error.details[0])).toContain('message')
  })

  test('returns "The publish message requires a message with a body" for key "error.details[0].message"', () => {
    const result = sfi23Schema.validate(publish)
    expect(result.error.details[0].message).toBe('The publish message requires a message with a body.')
  })
})
