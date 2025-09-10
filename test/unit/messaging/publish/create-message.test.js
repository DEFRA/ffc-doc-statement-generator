const { STATEMENT: STATEMENT_TYPE, SCHEDULE: SCHEDULE_TYPE } = require('../../../../app/constants/document-types')

const { STATEMENT_MESSAGE, SCHEDULE_MESSAGE } = require('../../../mocks/messages/mock-process-message')
const { STATEMENT_MESSAGE: STATEMENT_MESSAGE_MAPPED, SCHEDULE_MESSAGE: SCHEDULE_MESSAGE_MAPPED } = require('../../../mocks/messages/publish')
const { STATEMENT: STATEMENT_FILENAME, SCHEDULE: SCHEDULE_FILENAME } = require('../../../mocks/components/filename')

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

  describe('when document is a statement', () => {
    beforeEach(() => {
      filename = STATEMENT_FILENAME
      type = STATEMENT_TYPE.id
    })

    describe('when document is valid', () => {
      beforeEach(() => {
        document = STATEMENT_MESSAGE.body
        mappedPublish = STATEMENT_MESSAGE_MAPPED
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
          ...STATEMENT_MESSAGE.body,
          documentReference: null
        }
        mappedPublish = {
          ...STATEMENT_MESSAGE_MAPPED,
          body: {
            ...STATEMENT_MESSAGE_MAPPED.body,
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
          ...STATEMENT_MESSAGE.body,
          documentReference: undefined
        }
        mappedPublish = {
          ...STATEMENT_MESSAGE_MAPPED,
          body: {
            ...STATEMENT_MESSAGE_MAPPED.body,
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

  describe('when document is a schedule', () => {
    beforeEach(() => {
      filename = SCHEDULE_FILENAME
      type = SCHEDULE_TYPE.id
    })

    describe('when document is valid', () => {
      beforeEach(() => {
        document = SCHEDULE_MESSAGE.body
        mappedPublish = SCHEDULE_MESSAGE_MAPPED
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
          ...SCHEDULE_MESSAGE.body,
          documentReference: null
        }
        mappedPublish = {
          ...SCHEDULE_MESSAGE_MAPPED,
          body: {
            ...SCHEDULE_MESSAGE_MAPPED.body,
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
          ...SCHEDULE_MESSAGE.body,
          documentReference: undefined
        }
        mappedPublish = {
          ...SCHEDULE_MESSAGE_MAPPED,
          body: {
            ...SCHEDULE_MESSAGE_MAPPED.body,
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
    const sampleDoc = STATEMENT_MESSAGE.body
    const sampleFilename = STATEMENT_FILENAME
    const sampleType = STATEMENT_TYPE.id

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
