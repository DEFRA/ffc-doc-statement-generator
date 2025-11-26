const { SFI23QUARTERLYSTATEMENT, DELINKED } = require('../../../app/constants/document-types')
const { VALIDATION } = require('../../../app/constants/errors')
const { validateRequest } = require('../../../app/messaging/validate-request')
const { DATA_PUBLISHING_ERROR } = require('../../../app/constants/alerts')

jest.mock('ffc-alerting-utils', () => ({
  dataProcessingAlert: jest.fn()
}))

const { dataProcessingAlert } = require('ffc-alerting-utils')

const getMockForType = (type) => {
  if (type === SFI23QUARTERLYSTATEMENT) {
    return JSON.parse(JSON.stringify(require('../../mocks/mock-statement-sfi23-quarterly')))
  }
  if (type === DELINKED) {
    return JSON.parse(JSON.stringify(require('../../mocks/mock-delinked-statement')))
  }
  return undefined
}

describe('validateRequest', () => {
  const documentTypes = [SFI23QUARTERLYSTATEMENT, DELINKED]
  const invalidValues = [undefined, {}, [], true, false, 0, 1, '', 'statement']

  describe.each(documentTypes)('for type %p', (type) => {
    beforeEach(() => dataProcessingAlert.mockClear())

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

      expect(calledPayload.type).toBe(value?.type)

      expect(calledPayload.sbi).toBe(value?.sbi)
      expect(calledPayload.scheme).toBe(value?.scheme)
      expect(typeof calledPayload.message).toBe('string')
      expect(calledPayload.message.length).toBeGreaterThan(0)
    })
  })

  describe('unknown/missing type handling', () => {
    beforeEach(() => dataProcessingAlert.mockClear())

    test.each([
      [undefined, undefined, /^Unknown request type: unknown type/],
      [{ type: 'some-string-type', sbi: 'SBI1', scheme: { id: 'X' } }, undefined, /Unknown request type: some-string-type/],
      [{}, { id: 'MY_ID', name: 'My Friendly Type' }, /Unknown request type: My Friendly Type/]
    ])(
      'throws and alerts when request=%p, type=%p',
      async (request, type, errorRegex) => {
        await expect(validateRequest(request, type)).rejects.toThrow(errorRegex)
      }
    )
  })
})

describe('validation message composition', () => {
  test.each([
    [{ details: [{ message: 'err1' }, { message: 'err2' }], message: 'err1; err2' }, 'err1; err2'],
    [{ message: 'simple validation error' }, 'simple validation error'],
    [{ message: 'Validation failed' }, 'Validation failed']
  ])('generates validation message: %p', async (_, expectedMessage) => {
    jest.resetModules()

    const mockDataProcessingAlert = jest.fn()
    jest.doMock('ffc-alerting-utils', () => ({
      dataProcessingAlert: mockDataProcessingAlert
    }))

    jest.doMock('../../../app/messaging/schemas/sfi-23-quarterly-statement', () => ({
      validate: () => ({
        error: {
          details: [{ message: 'err1' }, { message: 'err2' }],
          message: 'err1; err2'
        }
      })
    }))

    jest.doMock('../../../app/messaging/schemas/delinked-statement', () => ({
      validate: () => ({})
    }))

    const { SFI23QUARTERLYSTATEMENT: FRESH_STATEMENT } =
      require('../../../app/constants/document-types')
    const { validateRequest: validateRequestWithMockedSchemas } =
      require('../../../app/messaging/validate-request')

    await expect(
      validateRequestWithMockedSchemas({}, FRESH_STATEMENT)
    ).rejects.toMatchObject({ category: VALIDATION })

    expect(mockDataProcessingAlert).toHaveBeenCalledTimes(1)
    const [calledPayload, calledType] = mockDataProcessingAlert.mock.calls[0]

    expect(calledType).toBe(DATA_PUBLISHING_ERROR)
    expect(calledPayload.message).toBe('err1; err2')
    expect(calledPayload.process).toBe('validate-request')
  })

  test.each([
    [{ message: 'simple validation error' }, 'simple validation error'],
    [{ message: 'Validation failed' }, 'Validation failed']
  ])(
    'uses plain error.message when there are no details: %p',
    async (mockError, expectedMessage) => {
      jest.resetModules()

      const mockDataProcessingAlert = jest.fn()
      jest.doMock('ffc-alerting-utils', () => ({
        dataProcessingAlert: mockDataProcessingAlert
      }))

      jest.doMock('../../../app/messaging/schemas/sfi-23-quarterly-statement', () => ({
        validate: () => ({ error: mockError })
      }))

      jest.doMock('../../../app/messaging/schemas/delinked-statement', () => ({
        validate: () => ({})
      }))

      const { SFI23QUARTERLYSTATEMENT: FRESH_STATEMENT } =
        require('../../../app/constants/document-types')
      const { validateRequest: validateRequestWithMockedSchemas } =
        require('../../../app/messaging/validate-request')

      if (expectedMessage === 'Validation failed') {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
        await expect(
          validateRequestWithMockedSchemas({}, FRESH_STATEMENT)
        ).rejects.toMatchObject({ category: VALIDATION })
        consoleSpy.mockRestore()
      } else {
        await expect(
          validateRequestWithMockedSchemas({}, FRESH_STATEMENT)
        ).rejects.toMatchObject({ category: VALIDATION })
      }

      expect(mockDataProcessingAlert).toHaveBeenCalledTimes(1)
      const [calledPayload] = mockDataProcessingAlert.mock.calls[0]

      expect(calledPayload.message).toBe(expectedMessage)
      expect(calledPayload.process).toBe('validate-request')
    }
  )
})
