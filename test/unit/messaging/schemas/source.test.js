const SOURCE = require('../../../../app/constants/message-source')
const schema = require('../../../../app/messaging/schemas/source')

describe('source schema', () => {
  test('validates success if source is SOURCE', () => {
    const result = schema.validate(SOURCE)
    expect(result.error).toBeUndefined()
    expect(result.value).toBe(SOURCE)
    expect(Object.keys(result)).toHaveLength(1)
  })

  const invalidSources = [
    { value: 'a', type: 'any.only', message: `The source must be ${SOURCE}.` },
    { value: 0, type: 'any.only', message: `The source must be ${SOURCE}.` },
    { value: {}, type: 'any.only', message: `The source must be ${SOURCE}.` },
    { value: [], type: 'any.only', message: `The source must be ${SOURCE}.` },
    { value: true, type: 'any.only', message: `The source must be ${SOURCE}.` },
    { value: null, type: 'any.only', message: `The source must be ${SOURCE}.` },
    { value: undefined, type: 'any.required', message: 'The source is required.' }
  ]

  test.each(invalidSources)('validates fail if source is $value', ({ value, type, message }) => {
    const result = schema.validate(value)
    expect(result.error).toBeInstanceOf(Error)
    expect(result.value).toBe(value)
    expect(Object.keys(result)).toContain('error')
    expect(Object.keys(result.error.details[0])).toEqual(expect.arrayContaining(['message', 'type', 'path', 'context']))
    expect(result.error.details[0].type).toBe(type)
    expect(result.error.details[0].message).toBe(message)
  })
})
