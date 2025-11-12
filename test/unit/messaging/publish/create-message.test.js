const { SFI23QUARTERLYSTATEMENT: SFI23QUARTERLYSTATEMENT_TYPE } = require('../../../../app/constants/document-types')
const { SFI23QUARTERLYSTATEMENT_MESSAGE } = require('../../../mocks/messages/mock-process-message')
const { SFI23QUARTERLYSTATEMENT_MESSAGE: SFI23QUARTERLYSTATEMENT_MESSAGE_PUBLISH } = require('../../../mocks/messages/publish')
const { SFI23QUARTERLYSTATEMENT: SFI23QUARTERLYSTATEMENT_FILENAME } = require('../../../mocks/components/filename')

jest.mock('../../../../app/messaging/processing-alerts', () => ({ dataProcessingAlert: jest.fn() }))
const { dataProcessingAlert } = require('../../../../app/messaging/processing-alerts')

const validatePublishModule = require('../../../../app/messaging/publish/validate-publish')
const createMessage = require('../../../../app/messaging/publish/create-message')

let document
let filename
let type
let mappedPublish

describe('create publish message', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    if (validatePublishModule.validatePublish && validatePublishModule.validatePublish.mockRestore) {
      try { validatePublishModule.validatePublish.mockRestore() } catch (e) {}
    }
  })

  describe('when document is an sfi23 statement', () => {
    beforeEach(() => {
      filename = SFI23QUARTERLYSTATEMENT_FILENAME
      type = SFI23QUARTERLYSTATEMENT_TYPE.id
    })

    describe.each([
      ['valid document', SFI23QUARTERLYSTATEMENT_MESSAGE.body, SFI23QUARTERLYSTATEMENT_MESSAGE_PUBLISH],
      ['null documentReference', { ...SFI23QUARTERLYSTATEMENT_MESSAGE.body, documentReference: null }, {
        ...SFI23QUARTERLYSTATEMENT_MESSAGE_PUBLISH,
        body: { ...SFI23QUARTERLYSTATEMENT_MESSAGE_PUBLISH.body, documentReference: null }
      }],
      ['undefined documentReference', { ...SFI23QUARTERLYSTATEMENT_MESSAGE.body, documentReference: undefined }, {
        ...SFI23QUARTERLYSTATEMENT_MESSAGE_PUBLISH,
        body: { ...SFI23QUARTERLYSTATEMENT_MESSAGE_PUBLISH.body, documentReference: null }
      }]
    ])('when %s', (desc, docInput, expectedPublish) => {
      beforeEach(() => {
        document = docInput
        mappedPublish = expectedPublish
      })

      test('returns an object with correct keys and values', async () => {
        const result = await createMessage(document, filename, type)
        expect(result).toBeInstanceOf(Object)
        expect(Object.keys(result)).toHaveLength(3)
        expect(result.body).toStrictEqual(mappedPublish.body)
        expect(result.type).toStrictEqual(mappedPublish.type)
        expect(result.source).toStrictEqual(mappedPublish.source)
        expect(result).toStrictEqual(mappedPublish)
      })

      test('body.documentReference is handled correctly', async () => {
        const result = await createMessage(document, filename, type)
        expect(result.body.documentReference).toBeNull()
      })
    })
  })

  describe('error handling and alerts', () => {
    const validationError = new Error('validation failed')
    const alertPublishError = new Error('alert publish failed')
    const sampleDoc = SFI23QUARTERLYSTATEMENT_MESSAGE.body
    const sampleFilename = SFI23QUARTERLYSTATEMENT_FILENAME
    const sampleType = SFI23QUARTERLYSTATEMENT_TYPE.id

    beforeEach(() => {
      jest.clearAllMocks()
    })

    test.each([
      ['throws an Error object', () => { throw validationError }, validationError, 'validation failed'],
      ['throws a string error wrapped in Error', () => { throw new Error('string error') }, new Error('string error'), 'string error'],
      ['throws an object error wrapped in Error', () => { throw new Error('obj error') }, new Error('obj error'), 'obj error']
    ])('when validatePublish %s, alert is attempted and original error is rethrown', async (_, mockFn, expectedError, expectedMessage) => {
      jest.spyOn(validatePublishModule, 'validatePublish').mockImplementation(mockFn)
      dataProcessingAlert.mockResolvedValue()

      await expect(createMessage(sampleDoc, sampleFilename, sampleType)).rejects.toEqual(expectedError)
      expect(dataProcessingAlert).toHaveBeenCalledTimes(1)

      const payload = dataProcessingAlert.mock.calls[0][0]
      expect(payload.process).toMatch(/createMessage/)
      expect(payload.message).toContain(expectedMessage)
      expect(payload.type).toBe(sampleType)

      validatePublishModule.validatePublish.mockRestore()
    })

    test('when alert publish fails, the failure is logged and original error is rethrown', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
      jest.spyOn(validatePublishModule, 'validatePublish').mockImplementation(() => { throw validationError })
      dataProcessingAlert.mockRejectedValue(alertPublishError)

      await expect(createMessage(sampleDoc, sampleFilename, sampleType)).rejects.toBe(validationError)
      expect(dataProcessingAlert).toHaveBeenCalledTimes(1)
      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to publish processing alert for createMessage', {
        originalError: validationError.message,
        alertError: alertPublishError.message
      })

      consoleErrorSpy.mockRestore()
      validatePublishModule.validatePublish.mockRestore()
    })
  })
})
