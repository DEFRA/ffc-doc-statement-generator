const { STATEMENT, SCHEDULE, SFI23QUARTERLYSTATEMENT, SFI23ADVANCEDSTATEMENT, DELINKED } = require('../../../app/constants/document-types')
const { VALIDATION } = require('../../../app/errors')
const { validateRequest } = require('../../../app/messaging/validate-request')
const { PUBLISH_ERROR } = require('../../../app/constants/alerts')

jest.mock('../../../app/messaging/processing-alerts', () => ({
  dataProcessingAlert: jest.fn()
}))

const { dataProcessingAlert } = require('../../../app/messaging/processing-alerts')

const getMockForType = (type) => {
  if (type === STATEMENT) return JSON.parse(JSON.stringify(require('../../mocks/mock-statement')))
  if (type === SCHEDULE) return JSON.parse(JSON.stringify(require('../../mocks/mock-schedule').topUpSchedule))
  if (type === SFI23QUARTERLYSTATEMENT) return JSON.parse(JSON.stringify(require('../../mocks/mock-statement-sfi23-quarterly')))
  if (type === SFI23ADVANCEDSTATEMENT) return JSON.parse(JSON.stringify(require('../../mocks/mock-statement-sfia')))
  if (type === DELINKED) return JSON.parse(JSON.stringify(require('../../mocks/mock-delinked-statement')))
  return undefined
}

describe('validateRequest', () => {
  const documentTypes = [STATEMENT, SCHEDULE, SFI23QUARTERLYSTATEMENT, SFI23ADVANCEDSTATEMENT, DELINKED]
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

        const expectedPayload = {
          process: 'validate-request',
          type: type?.id ?? value?.type,
          sbi: value?.sbi,
          scheme: value?.scheme,
          message: `Failed to generate content for ${type?.name ?? value?.type ?? 'unknown type'}`
        }
        expect(dataProcessingAlert).toHaveBeenCalledWith(expectedPayload, PUBLISH_ERROR)
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
        PUBLISH_ERROR
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
        PUBLISH_ERROR
      )
    })
  })
})
