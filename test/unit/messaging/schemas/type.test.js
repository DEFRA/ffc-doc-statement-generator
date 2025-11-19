const { SFI23QUARTERLYSTATEMENT, DELINKED } = require('../../../../app/constants/document-types')
const TYPES = [
  `uk.gov.doc.${SFI23QUARTERLYSTATEMENT.id}.publish`,
  `uk.gov.doc.${DELINKED.id}.publish`
]

const schema = require('../../../../app/messaging/schemas/type')

describe('type schema', () => {
  test.each(TYPES)('validates success if type is %s', (type) => {
    const result = schema.validate(type)
    expect(result.error).toBeUndefined()
    expect(result.value).toBe(type)
    expect(Object.keys(result)).toHaveLength(1)
  })

  const invalidTypes = [
    { value: 'a', type: 'any.only', message: `The type must be one of ${TYPES}.` },
    { value: 0, type: 'any.only', message: `The type must be one of ${TYPES}.` },
    { value: {}, type: 'any.only', message: `The type must be one of ${TYPES}.` },
    { value: [], type: 'any.only', message: `The type must be one of ${TYPES}.` },
    { value: true, type: 'any.only', message: `The type must be one of ${TYPES}.` },
    { value: null, type: 'any.only', message: `The type must be one of ${TYPES}.` },
    { value: undefined, type: 'any.required', message: 'The type is required.' }
  ]

  test.each(invalidTypes)('validates fail if type is $value', ({ value, type: errorType, message }) => {
    const result = schema.validate(value)
    expect(result.error).toBeInstanceOf(Error)
    expect(result.value).toBe(value)
    expect(Object.keys(result)).toContain('error')
    expect(Object.keys(result.error.details[0])).toEqual(expect.arrayContaining(['message', 'type', 'path', 'context']))
    expect(result.error.details[0].type).toBe(errorType)
    expect(result.error.details[0].message).toBe(message)
  })
})
