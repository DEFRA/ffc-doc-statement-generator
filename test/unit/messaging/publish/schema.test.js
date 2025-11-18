const { SFI23QUARTERLYSTATEMENT_MESSAGE, DELINKEDSTATEMENT_MESSAGE } = require('../../../mocks/messages/publish')
const sfi23Schema = require('../../../../app/messaging/publish/sfi23-schema')
const delinkedSchema = require('../../../../app/messaging/publish/delinked-schema')

describe('publish schema validation', () => {
  const sfi23Cases = [
    {
      desc: 'valid SFI23 message',
      publish: SFI23QUARTERLYSTATEMENT_MESSAGE,
      expectedKeys: ['value'],
      expectedValue: { ...SFI23QUARTERLYSTATEMENT_MESSAGE, body: { ...SFI23QUARTERLYSTATEMENT_MESSAGE.body } },
      error: false
    },
    {
      desc: 'SFI23 message with no body',
      publish: { ...SFI23QUARTERLYSTATEMENT_MESSAGE, body: undefined },
      expectedKeys: ['value', 'error'],
      expectedValue: { ...SFI23QUARTERLYSTATEMENT_MESSAGE, body: undefined },
      error: true,
      errorDetail: {
        type: 'any.required',
        message: 'The publish message requires a message with a body.'
      }
    },
    {
      desc: 'publish is null',
      publish: null,
      expectedKeys: ['value', 'error'],
      expectedValue: null,
      error: true,
      errorDetail: {
        type: 'object.base',
        message: 'The publish message must be an object.'
      }
    },
    {
      desc: 'publish is undefined',
      publish: undefined,
      expectedKeys: ['value', 'error'],
      expectedValue: undefined,
      error: true,
      errorDetail: {
        type: 'any.required',
        message: 'The publish message requires a message with a body.'
      }
    }
  ]

  test.each(sfi23Cases)('$desc', ({ publish, expectedKeys, expectedValue, error, errorDetail }) => {
    const result = sfi23Schema.validate(publish)
    expect(result).toBeInstanceOf(Object)
    expect(Object.keys(result)).toEqual(expectedKeys)
    expect(result.value).toStrictEqual(expectedValue)

    if (error) {
      expect(result.error).toBeInstanceOf(Error)
      const detail = result.error.details[0]
      expect(Object.keys(detail)).toEqual(expect.arrayContaining(['message', 'type', 'path', 'context']))
      expect(detail.type).toBe(errorDetail.type)
      expect(detail.message).toBe(errorDetail.message)
    } else {
      expect(result.error).toBeUndefined()
    }
  })

  test('delinked message validation', () => {
    const result = delinkedSchema.validate(DELINKEDSTATEMENT_MESSAGE)
    expect(result).toBeInstanceOf(Object)
    expect(Object.keys(result)).toEqual(['value'])
    expect(result.value).toStrictEqual({
      ...DELINKEDSTATEMENT_MESSAGE,
      body: { ...DELINKEDSTATEMENT_MESSAGE.body, transactionDate: expect.any(Date) }
    })
  })
})
