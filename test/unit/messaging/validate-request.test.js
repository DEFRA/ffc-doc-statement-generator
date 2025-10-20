const { SFI23QUARTERLYSTATEMENT, DELINKED } = require('../../../app/constants/document-types')
const { VALIDATION } = require('../../../app/constants/errors')
const { validateRequest } = require('../../../app/messaging/validate-request')
const { DATA_PUBLISHING_ERROR } = require('../../../app/constants/alerts')

jest.mock('ffc-alerting-utils', () => ({
  dataProcessingAlert: jest.fn()
}))

const { dataProcessingAlert } = require('ffc-alerting-utils')

const getMockForType = (type) => {
  if (type === SFI23QUARTERLYSTATEMENT) return JSON.parse(JSON.stringify(require('../../mocks/mock-statement-sfi23-quarterly')))
  if (type === DELINKED) return JSON.parse(JSON.stringify(require('../../mocks/mock-delinked-statement')))
  return undefined
}

describe('validateRequest', () => {
  const documentTypes = [SFI23QUARTERLYSTATEMENT, DELINKED]
  const invalidValues = [undefined, {}, [], true, false, 0, 1, '', 'statement']

  documentTypes.forEach(type => {
    describe(`for type ${type.id}`, () => {
      beforeEach(() => {
        dataProcessingAlert.mockClear()
      })

      test('resolves for a valid request and does not call alert', async () => {
        const mockRequest = getMockForType(type)
        await expect(validateRequest(mockRequest, type)).resolves.toBeUndefined()
        expect(dataProcessingAlert).not.toHaveBeenCalled()
      })

      test.each(invalidValues)('rejects and alerts for invalid request: %p', async (value) => {
        dataProcessingAlert.mockClear()

        if (value === undefined && type === DELINKED) {
          await expect(validateRequest(value, type)).resolves.toBeUndefined()
          expect(dataProcessingAlert).not.toHaveBeenCalled()
          return
        }

        await expect(validateRequest(value, type)).rejects.toMatchObject({ category: VALIDATION })
        expect(dataProcessingAlert).toHaveBeenCalledTimes(1)
        const [calledPayload, calledType] = dataProcessingAlert.mock.calls[0]

        expect(calledType).toBe(DATA_PUBLISHING_ERROR)
        expect(calledPayload.process).toBe('validate-request')
        expect(calledPayload.type).toBe(type?.id ?? value?.type)
        expect(calledPayload.sbi).toBe(value?.sbi)
        expect(calledPayload.scheme).toBe(value?.scheme)
        expect(typeof calledPayload.message).toBe('string')
        expect(calledPayload.message.length).toBeGreaterThan(0)
      })
    })
  })

  describe('unknown/missing type handling', () => {
    beforeEach(() => {
      dataProcessingAlert.mockClear()
    })

    test('throws and alerts when no type provided and no request provided', async () => {
      await expect(validateRequest()).rejects.toThrow(/^Unknown request type: unknown type/)
      expect(dataProcessingAlert).toHaveBeenCalledWith(
        {
          process: 'validate-request',
          type: undefined,
          sbi: undefined,
          scheme: undefined,
          message: 'Failed to generate content for unknown type'
        },
        DATA_PUBLISHING_ERROR
      )
    })

    test('when type is undefined but request has a type string, alert uses request.type', async () => {
      dataProcessingAlert.mockClear()
      const request = { type: 'some-string-type', sbi: 'SBI1', scheme: { id: 'X' } }
      await expect(validateRequest(request)).rejects.toThrow(/Unknown request type: some-string-type/)
      expect(dataProcessingAlert).toHaveBeenCalledWith(
        {
          process: 'validate-request',
          type: request.type,
          sbi: request.sbi,
          scheme: request.scheme,
          message: `Failed to generate content for ${request.type}`
        },
        DATA_PUBLISHING_ERROR
      )
    })

    test('alertDefault uses provided type.id and type.name when object type passed', async () => {
      dataProcessingAlert.mockClear()
      const providedType = { id: 'MY_ID', name: 'My Friendly Type' }
      await expect(validateRequest({}, providedType)).rejects.toThrow(/Unknown request type: My Friendly Type/)
      expect(dataProcessingAlert).toHaveBeenCalledTimes(1)
      const [calledPayload] = dataProcessingAlert.mock.calls[0]
      expect(calledPayload.process).toBe('validate-request')
      expect(calledPayload.type).toBe(providedType.id)
      expect(calledPayload.message).toBe(`Failed to generate content for ${providedType.name}`)
    })
  })
})

describe('validation message composition', () => {
  test('combines messages from Joi-style details into a single message', async () => {
    jest.resetModules()

    const mockDataProcessingAlert = jest.fn()
    jest.doMock('../../../app/messaging/processing-alerts', () => ({ dataProcessingAlert: mockDataProcessingAlert }))
    jest.doMock('../../../app/messaging/schemas/sfi-23-quarterly-statement', () => ({
      validate: () => ({
        error: {
          details: [{ message: 'err1' }, { message: 'err2' }],
          message: 'err1; err2'
        }
      })
    }))

    jest.doMock('../../../app/messaging/schemas/delinked-statement', () => ({ validate: () => ({}) }))

    const { SFI23QUARTERLYSTATEMENT: FRESH_STATEMENT } = require('../../../app/constants/document-types')
    const { validateRequest: validateRequestWithMockedSchemas } = require('../../../app/messaging/validate-request')

    await expect(validateRequestWithMockedSchemas({}, FRESH_STATEMENT)).rejects.toMatchObject({ category: VALIDATION })

    expect(mockDataProcessingAlert).toHaveBeenCalledTimes(1)
    const [calledPayload, calledType] = mockDataProcessingAlert.mock.calls[0]

    expect(calledType).toBe(DATA_PUBLISHING_ERROR)
    expect(calledPayload.message).toBe('err1; err2')
    expect(calledPayload.process).toBe('validate-request')
  })

  test('uses plain error.message when there are no details', async () => {
    jest.resetModules()

    const mockDataProcessingAlert = jest.fn()
    jest.doMock('../../../app/messaging/processing-alerts', () => ({ dataProcessingAlert: mockDataProcessingAlert }))
    jest.doMock('../../../app/messaging/schemas/sfi-23-quarterly-statement', () => ({
      validate: () => ({
        error: {
          message: 'simple validation error'
        }
      })
    }))
    jest.doMock('../../../app/messaging/schemas/delinked-statement', () => ({ validate: () => ({}) }))

    const { SFI23QUARTERLYSTATEMENT: FRESH_STATEMENT } = require('../../../app/constants/document-types')
    const { validateRequest: validateRequestWithMockedSchemas } = require('../../../app/messaging/validate-request')

    await expect(validateRequestWithMockedSchemas({}, FRESH_STATEMENT)).rejects.toMatchObject({ category: VALIDATION })

    expect(mockDataProcessingAlert).toHaveBeenCalledTimes(1)
    const [calledPayload] = mockDataProcessingAlert.mock.calls[0]
    expect(calledPayload.message).toBe('simple validation error')
  })

  test('falls back to "Validation failed" when the error cannot be stringified', async () => {
    jest.resetModules()

    const mockDataProcessingAlert = jest.fn()
    jest.doMock('../../../app/messaging/processing-alerts', () => ({ dataProcessingAlert: mockDataProcessingAlert }))

    const circular = {}
    circular.self = circular

    jest.doMock('../../../app/messaging/schemas/sfi-23-quarterly-statement', () => ({
      validate: () => ({
        error: circular
      })
    }))
    jest.doMock('../../../app/messaging/schemas/delinked-statement', () => ({ validate: () => ({}) }))

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { })
    const { SFI23QUARTERLYSTATEMENT: FRESH_STATEMENT } = require('../../../app/constants/document-types')
    const { validateRequest: validateRequestWithMockedSchemas } = require('../../../app/messaging/validate-request')

    await expect(validateRequestWithMockedSchemas({}, FRESH_STATEMENT)).rejects.toMatchObject({ category: VALIDATION })

    expect(mockDataProcessingAlert).toHaveBeenCalledTimes(1)
    const [calledPayload] = mockDataProcessingAlert.mock.calls[0]
    expect(calledPayload.message).toBe('Validation failed')

    consoleSpy.mockRestore()
  })
})
