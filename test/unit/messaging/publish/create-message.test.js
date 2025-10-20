const { SFI23QUARTERLYSTATEMENT: SFI23QUARTERLYSTATEMENT_TYPE } = require('../../../../app/constants/document-types')

const { SFI23QUARTERLYSTATEMENT_MESSAGE } = require('../../../mocks/messages/mock-process-message')
const { SFI23QUARTERLYSTATEMENT_MESSAGE: SFI23QUARTERLYSTATEMENT_MESSAGE_PUBLISH } = require('../../../mocks/messages/publish')
const { SFI23QUARTERLYSTATEMENT: SFI23QUARTERLYSTATEMENT_FILENAME } = require('../../../mocks/components/filename')

jest.mock('ffc-alerting-utils', () => ({ dataProcessingAlert: jest.fn() }))
const { dataProcessingAlert } = require('ffc-alerting-utils')

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

    describe('when document is valid', () => {
      beforeEach(() => {
        document = SFI23QUARTERLYSTATEMENT_MESSAGE.body
        mappedPublish = SFI23QUARTERLYSTATEMENT_MESSAGE_PUBLISH
      })

      test('returns an object', async () => {
        const result = await createMessage(document, filename, type)
        expect(result).toBeInstanceOf(Object)
      })

      test('returns an object with 3 keys', async () => {
        const result = await createMessage(document, filename, type)
        expect(Object.keys(result)).toHaveLength(3)
      })

      test('returns an object with "body" key', async () => {
        const result = await createMessage(document, filename, type)
        expect(Object.keys(result)).toContain('body')
      })

      test('returns mappedPublish.body for key "body"', async () => {
        const result = await createMessage(document, filename, type)
        expect(result.body).toStrictEqual(mappedPublish.body)
      })

      test('returns an object with "type" key', async () => {
        const result = await createMessage(document, filename, type)
        expect(Object.keys(result)).toContain('type')
      })

      test('returns mappedPublish.type for key "type"', async () => {
        const result = await createMessage(document, filename, type)
        expect(result.type).toStrictEqual(mappedPublish.type)
      })

      test('returns an object with "source" key', async () => {
        const result = await createMessage(document, filename, type)
        expect(Object.keys(result)).toContain('source')
      })

      test('returns mappedPublish.source for key "source"', async () => {
        const result = await createMessage(document, filename, type)
        expect(result.source).toStrictEqual(mappedPublish.source)
      })

      test('returns mappedPublish', async () => {
        const result = await createMessage(document, filename, type)
        expect(result).toStrictEqual(mappedPublish)
      })
    })

    describe('when document has null documentReference', () => {
      beforeEach(() => {
        document = {
          ...SFI23QUARTERLYSTATEMENT_MESSAGE.body,
          documentReference: null
        }
        mappedPublish = {
          ...SFI23QUARTERLYSTATEMENT_MESSAGE_PUBLISH,
          body: {
            ...SFI23QUARTERLYSTATEMENT_MESSAGE_PUBLISH.body,
            documentReference: null
          }
        }
      })

      test('returns an object', async () => {
        const result = await createMessage(document, filename, type)
        expect(result).toBeInstanceOf(Object)
      })

      test('returns an object with 3 keys', async () => {
        const result = await createMessage(document, filename, type)
        expect(Object.keys(result)).toHaveLength(3)
      })

      test('returns an object with "body" key', async () => {
        const result = await createMessage(document, filename, type)
        expect(Object.keys(result)).toContain('body')
      })

      test('returns null for key "body.documentReference"', async () => {
        const result = await createMessage(document, filename, type)
        expect(result.body.documentReference).toBeNull()
      })

      test('returns mappedPublish.body for key "body"', async () => {
        const result = await createMessage(document, filename, type)
        expect(result.body).toStrictEqual(mappedPublish.body)
      })

      test('returns an object with "type" key', async () => {
        const result = await createMessage(document, filename, type)
        expect(Object.keys(result)).toContain('type')
      })

      test('returns mappedPublish.type for key "type"', async () => {
        const result = await createMessage(document, filename, type)
        expect(result.type).toStrictEqual(mappedPublish.type)
      })

      test('returns an object with "source" key', async () => {
        const result = await createMessage(document, filename, type)
        expect(Object.keys(result)).toContain('source')
      })

      test('returns mappedPublish.source for key "source"', async () => {
        const result = await createMessage(document, filename, type)
        expect(result.source).toStrictEqual(mappedPublish.source)
      })

      test('returns mappedPublish', async () => {
        const result = await createMessage(document, filename, type)
        expect(result).toStrictEqual(mappedPublish)
      })
    })

    describe('when document has undefined documentReference', () => {
      beforeEach(() => {
        document = {
          ...SFI23QUARTERLYSTATEMENT_MESSAGE.body,
          documentReference: undefined
        }
        mappedPublish = {
          ...SFI23QUARTERLYSTATEMENT_MESSAGE_PUBLISH,
          body: {
            ...SFI23QUARTERLYSTATEMENT_MESSAGE_PUBLISH.body,
            documentReference: null
          }
        }
      })

      test('returns an object', async () => {
        const result = await createMessage(document, filename, type)
        expect(result).toBeInstanceOf(Object)
      })

      test('returns an object with 3 keys', async () => {
        const result = await createMessage(document, filename, type)
        expect(Object.keys(result)).toHaveLength(3)
      })

      test('returns an object with "body" key', async () => {
        const result = await createMessage(document, filename, type)
        expect(Object.keys(result)).toContain('body')
      })

      test('returns null for key "body.documentReference"', async () => {
        const result = await createMessage(document, filename, type)
        expect(result.body.documentReference).toBeNull()
      })

      test('returns mappedPublish.body for key "body"', async () => {
        const result = await createMessage(document, filename, type)
        expect(result.body).toStrictEqual(mappedPublish.body)
      })

      test('returns an object with "type" key', async () => {
        const result = await createMessage(document, filename, type)
        expect(Object.keys(result)).toContain('type')
      })

      test('returns mappedPublish.type for key "type"', async () => {
        const result = await createMessage(document, filename, type)
        expect(result.type).toStrictEqual(mappedPublish.type)
      })

      test('returns an object with "source" key', async () => {
        const result = await createMessage(document, filename, type)
        expect(Object.keys(result)).toContain('source')
      })

      test('returns mappedPublish.source for key "source"', async () => {
        const result = await createMessage(document, filename, type)
        expect(result.source).toStrictEqual(mappedPublish.source)
      })

      test('returns mappedPublish', async () => {
        const result = await createMessage(document, filename, type)
        expect(result).toStrictEqual(mappedPublish)
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

    test('when validatePublish throws, an alert is attempted and original error is rethrown', async () => {
      jest.spyOn(validatePublishModule, 'validatePublish').mockImplementation(() => { throw validationError })

      dataProcessingAlert.mockResolvedValue()

      await expect(createMessage(sampleDoc, sampleFilename, sampleType)).rejects.toBe(validationError)
      expect(dataProcessingAlert).toHaveBeenCalledTimes(1)

      const payload = dataProcessingAlert.mock.calls[0][0]
      expect(payload.process).toMatch(/createMessage/)
      expect(payload.message).toContain('validation failed')
      expect(payload.error).toEqual({ message: validationError.message, stack: expect.any(String) })
      expect(payload.type).toBe(sampleType)

      validatePublishModule.validatePublish.mockRestore()
    })

    test('when validatePublish throws a string value, alert contains the string and original string is rethrown', async () => {
      const stringErr = 'string error'
      jest.spyOn(validatePublishModule, 'validatePublish').mockImplementation(() => { throw stringErr })

      dataProcessingAlert.mockResolvedValue()

      await expect(createMessage(sampleDoc, sampleFilename, sampleType)).rejects.toBe(stringErr)
      expect(dataProcessingAlert).toHaveBeenCalledTimes(1)

      const payload = dataProcessingAlert.mock.calls[0][0]
      expect(payload.process).toMatch(/createMessage/)
      // string error is preserved in payload.error, but message falls back to generic because error?.message is undefined for primitive strings
      expect(payload.error).toBe(stringErr)
      expect(payload.message).toBe(`Failed to create message for ${sampleFilename}`)
      expect(payload.type).toBe(sampleType)

      validatePublishModule.validatePublish.mockRestore()
    })

    test('when validatePublish throws a plain object with message, alert contains the object and message equals the object.message', async () => {
      const objErr = { message: 'obj error', code: 123 }
      jest.spyOn(validatePublishModule, 'validatePublish').mockImplementation(() => { throw objErr })

      dataProcessingAlert.mockResolvedValue()

      await expect(createMessage(sampleDoc, sampleFilename, sampleType)).rejects.toMatchObject({ message: 'obj error' })
      expect(dataProcessingAlert).toHaveBeenCalledTimes(1)

      const payload = dataProcessingAlert.mock.calls[0][0]
      expect(payload.process).toMatch(/createMessage/)
      expect(payload.error).toBe(objErr)
      expect(payload.message).toBe('obj error')
      expect(payload.type).toBe(sampleType)

      validatePublishModule.validatePublish.mockRestore()
    })

    test('when filename is omitted process label does not include filename', async () => {
      jest.spyOn(validatePublishModule, 'validatePublish').mockImplementation(() => { throw validationError })

      dataProcessingAlert.mockResolvedValue()

      await expect(createMessage(sampleDoc, undefined, sampleType)).rejects.toBe(validationError)

      const payload = dataProcessingAlert.mock.calls[0][0]
      expect(payload.process).toBe('createMessage')
      expect(payload.message).toContain('validation failed')
      expect(payload.type).toBe(sampleType)

      validatePublishModule.validatePublish.mockRestore()
    })

    test('when alert publish fails, the failure is logged and the original error is rethrown', async () => {
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
