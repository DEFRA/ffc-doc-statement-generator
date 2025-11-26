const { SFI23QUARTERLYSTATEMENT, DELINKEDSTATEMENT } = require('../../../mocks/components/filename')
const schema = require('../../../../app/messaging/schemas/filename')

describe('filename schema', () => {
  const validFilenames = [
    SFI23QUARTERLYSTATEMENT,
    DELINKEDSTATEMENT
  ]

  test.each(validFilenames)('returns object with only value for valid filename: %s', (filename) => {
    const result = schema.validate(filename)
    expect(result).toBeInstanceOf(Object)
    expect(Object.keys(result)).toHaveLength(1)
    expect(result.value).toBe(filename)
  })

  const invalidPatternFilenames = ['a']
  test.each(invalidPatternFilenames)('returns error for invalid pattern filename: %s', (filename) => {
    const result = schema.validate(filename)
    expect(result).toBeInstanceOf(Object)
    expect(Object.keys(result)).toHaveLength(2)
    expect(result.value).toBe(filename)
    expect(result.error).toBeInstanceOf(Error)
    expect(result.error.details[0].type).toBe('string.pattern.base')
    expect(result.error.details[0].message).toBe('filename must match the required pattern')
  })

  const invalidTypeFilenames = [0, {}, [], true, null]
  test.each(invalidTypeFilenames)('returns error for non-string filename: %s', (filename) => {
    const result = schema.validate(filename)
    expect(result).toBeInstanceOf(Object)
    expect(Object.keys(result)).toHaveLength(2)
    expect(result.value).toBe(filename)
    expect(result.error).toBeInstanceOf(Error)
    expect(result.error.details[0].type).toBe('string.base')
    expect(result.error.details[0].message).toBe('filename must be a string')
  })

  test('returns required error for undefined filename', () => {
    const result = schema.validate(undefined)
    expect(result).toBeInstanceOf(Object)
    expect(Object.keys(result)).toHaveLength(2)
    expect(result.value).toBe(undefined)
    expect(result.error).toBeInstanceOf(Error)
    expect(result.error.details[0].type).toBe('any.required')
    expect(result.error.details[0].message).toBe('filename is missing but it is required')
  })
})
