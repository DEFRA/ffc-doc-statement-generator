const { STATEMENT: STATEMENT_TYPE, SCHEDULE: SCHEDULE_TYPE } = require('../../../../app/constants/document-types')

const { STATEMENT_MESSAGE, SCHEDULE_MESSAGE, SFI23QUARTERLYSTATEMENT_MESSAGE } = require('../../../mocks/messages/mock-process-message')
const { STATEMENT_MESSAGE: STATEMENT_MESSAGE_MAPPED, SCHEDULE_MESSAGE: SCHEDULE_MESSAGE_MAPPED, SFI23QUARTERLYSTATEMENT_MESSAGE: SFI23QUARTERLYSTATEMENT_MESSAGE_MAPPED } = require('../../../mocks/messages/publish')
const { STATEMENT: STATEMENT_FILENAME, SCHEDULE: SCHEDULE_FILENAME } = require('../../../mocks/components/filename')

const mapPublish = require('../../../../app/messaging/publish/map-publish')

let document
let filename
let type

let mappedPublish

describe('map publish', () => {
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

      test('returns an object', () => {
        const result = mapPublish(document, filename, type)
        expect(result).toBeInstanceOf(Object)
      })

      test('returns an object with 3 keys', () => {
        const result = mapPublish(document, filename, type)
        expect(Object.keys(result)).toHaveLength(3)
      })

      test('returns an object with "body" key', () => {
        const result = mapPublish(document, filename, type)
        expect(Object.keys(result)).toContain('body')
      })

      test('returns mappedPublish.body for key "body"', () => {
        const result = mapPublish(document, filename, type)
        expect(result.body).toStrictEqual(mappedPublish.body)
      })

      test('returns an object with "type" key', () => {
        const result = mapPublish(document, filename, type)
        expect(Object.keys(result)).toContain('type')
      })

      test('returns mappedPublish.type for key "type"', () => {
        const result = mapPublish(document, filename, type)
        expect(result.type).toStrictEqual(mappedPublish.type)
      })

      test('returns an object with "source" key', () => {
        const result = mapPublish(document, filename, type)
        expect(Object.keys(result)).toContain('source')
      })

      test('returns mappedPublish.source for key "source"', () => {
        const result = mapPublish(document, filename, type)
        expect(result.source).toStrictEqual(mappedPublish.source)
      })

      test('returns mappedPublish', () => {
        const result = mapPublish(document, filename, type)
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

      test('returns an object', () => {
        const result = mapPublish(document, filename, type)
        expect(result).toBeInstanceOf(Object)
      })

      test('returns an object with 3 keys', () => {
        const result = mapPublish(document, filename, type)
        expect(Object.keys(result)).toHaveLength(3)
      })

      test('returns an object with "body" key', () => {
        const result = mapPublish(document, filename, type)
        expect(Object.keys(result)).toContain('body')
      })

      test('returns null for key "body.documentReference"', () => {
        const result = mapPublish(document, filename, type)
        expect(result.body.documentReference).toBeNull()
      })

      test('returns mappedPublish.body for key "body"', () => {
        const result = mapPublish(document, filename, type)
        expect(result.body).toStrictEqual(mappedPublish.body)
      })

      test('returns an object with "type" key', () => {
        const result = mapPublish(document, filename, type)
        expect(Object.keys(result)).toContain('type')
      })

      test('returns mappedPublish.type for key "type"', () => {
        const result = mapPublish(document, filename, type)
        expect(result.type).toStrictEqual(mappedPublish.type)
      })

      test('returns an object with "source" key', () => {
        const result = mapPublish(document, filename, type)
        expect(Object.keys(result)).toContain('source')
      })

      test('returns mappedPublish.source for key "source"', () => {
        const result = mapPublish(document, filename, type)
        expect(result.source).toStrictEqual(mappedPublish.source)
      })

      test('returns mappedPublish', () => {
        const result = mapPublish(document, filename, type)
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

      test('returns an object', () => {
        const result = mapPublish(document, filename, type)
        expect(result).toBeInstanceOf(Object)
      })

      test('returns an object with 3 keys', () => {
        const result = mapPublish(document, filename, type)
        expect(Object.keys(result)).toHaveLength(3)
      })

      test('returns an object with "body" key', () => {
        const result = mapPublish(document, filename, type)
        expect(Object.keys(result)).toContain('body')
      })

      test('returns null for key "body.documentReference"', () => {
        const result = mapPublish(document, filename, type)
        expect(result.body.documentReference).toBeNull()
      })

      test('returns mappedPublish.body for key "body"', () => {
        const result = mapPublish(document, filename, type)
        expect(result.body).toStrictEqual(mappedPublish.body)
      })

      test('returns an object with "type" key', () => {
        const result = mapPublish(document, filename, type)
        expect(Object.keys(result)).toContain('type')
      })

      test('returns mappedPublish.type for key "type"', () => {
        const result = mapPublish(document, filename, type)
        expect(result.type).toStrictEqual(mappedPublish.type)
      })

      test('returns an object with "source" key', () => {
        const result = mapPublish(document, filename, type)
        expect(Object.keys(result)).toContain('source')
      })

      test('returns mappedPublish.source for key "source"', () => {
        const result = mapPublish(document, filename, type)
        expect(result.source).toStrictEqual(mappedPublish.source)
      })

      test('returns mappedPublish', () => {
        const result = mapPublish(document, filename, type)
        expect(result).toStrictEqual(mappedPublish)
      })
    })
  })

  describe('when document has paymentPeriod', () => {
    beforeEach(() => {
      document = {
        ...SFI23QUARTERLYSTATEMENT_MESSAGE.body,
        paymentPeriod: 'some period'
      }
      mappedPublish = {
        ...SFI23QUARTERLYSTATEMENT_MESSAGE_MAPPED,
        body: {
          ...SFI23QUARTERLYSTATEMENT_MESSAGE_MAPPED.body,
          paymentPeriod: 'some period'
        }
      }
    })

    test('returns paymentPeriod in body', () => {
      const result = mapPublish(document, filename, type)
      expect(result.body.paymentPeriod).toEqual('some period')
    })
  })

  describe('when document does not have paymentPeriod', () => {
    beforeEach(() => {
      document = {
        ...SFI23QUARTERLYSTATEMENT_MESSAGE.body
      }
      delete document.paymentPeriod
      mappedPublish = {
        ...SFI23QUARTERLYSTATEMENT_MESSAGE_MAPPED
      }
    })

    test('does not return paymentPeriod in body', () => {
      const result = mapPublish(document, filename, type)
      expect(result.body).not.toHaveProperty('paymentPeriod')
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

      test('returns an object', () => {
        const result = mapPublish(document, filename, type)
        expect(result).toBeInstanceOf(Object)
      })

      test('returns an object with 3 keys', () => {
        const result = mapPublish(document, filename, type)
        expect(Object.keys(result)).toHaveLength(3)
      })

      test('returns an object with "body" key', () => {
        const result = mapPublish(document, filename, type)
        expect(Object.keys(result)).toContain('body')
      })

      test('returns mappedPublish.body for key "body"', () => {
        const result = mapPublish(document, filename, type)
        expect(result.body).toStrictEqual(mappedPublish.body)
      })

      test('returns an object with "type" key', () => {
        const result = mapPublish(document, filename, type)
        expect(Object.keys(result)).toContain('type')
      })

      test('returns mappedPublish.type for key "type"', () => {
        const result = mapPublish(document, filename, type)
        expect(result.type).toStrictEqual(mappedPublish.type)
      })

      test('returns an object with "source" key', () => {
        const result = mapPublish(document, filename, type)
        expect(Object.keys(result)).toContain('source')
      })

      test('returns mappedPublish.source for key "source"', () => {
        const result = mapPublish(document, filename, type)
        expect(result.source).toStrictEqual(mappedPublish.source)
      })

      test('returns mappedPublish', () => {
        const result = mapPublish(document, filename, type)
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

      test('returns an object', () => {
        const result = mapPublish(document, filename, type)
        expect(result).toBeInstanceOf(Object)
      })

      test('returns an object with 3 keys', () => {
        const result = mapPublish(document, filename, type)
        expect(Object.keys(result)).toHaveLength(3)
      })

      test('returns an object with "body" key', () => {
        const result = mapPublish(document, filename, type)
        expect(Object.keys(result)).toContain('body')
      })

      test('returns null for key "body.documentReference"', () => {
        const result = mapPublish(document, filename, type)
        expect(result.body.documentReference).toBeNull()
      })

      test('returns mappedPublish.body for key "body"', () => {
        const result = mapPublish(document, filename, type)
        expect(result.body).toStrictEqual(mappedPublish.body)
      })

      test('returns an object with "type" key', () => {
        const result = mapPublish(document, filename, type)
        expect(Object.keys(result)).toContain('type')
      })

      test('returns mappedPublish.type for key "type"', () => {
        const result = mapPublish(document, filename, type)
        expect(result.type).toStrictEqual(mappedPublish.type)
      })

      test('returns an object with "source" key', () => {
        const result = mapPublish(document, filename, type)
        expect(Object.keys(result)).toContain('source')
      })

      test('returns mappedPublish.source for key "source"', () => {
        const result = mapPublish(document, filename, type)
        expect(result.source).toStrictEqual(mappedPublish.source)
      })

      test('returns mappedPublish', () => {
        const result = mapPublish(document, filename, type)
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

      test('returns an object', () => {
        const result = mapPublish(document, filename, type)
        expect(result).toBeInstanceOf(Object)
      })

      test('returns an object with 3 keys', () => {
        const result = mapPublish(document, filename, type)
        expect(Object.keys(result)).toHaveLength(3)
      })

      test('returns an object with "body" key', () => {
        const result = mapPublish(document, filename, type)
        expect(Object.keys(result)).toContain('body')
      })

      test('returns null for key "body.documentReference"', () => {
        const result = mapPublish(document, filename, type)
        expect(result.body.documentReference).toBeNull()
      })

      test('returns mappedPublish.body for key "body"', () => {
        const result = mapPublish(document, filename, type)
        expect(result.body).toStrictEqual(mappedPublish.body)
      })

      test('returns an object with "type" key', () => {
        const result = mapPublish(document, filename, type)
        expect(Object.keys(result)).toContain('type')
      })

      test('returns mappedPublish.type for key "type"', () => {
        const result = mapPublish(document, filename, type)
        expect(result.type).toStrictEqual(mappedPublish.type)
      })

      test('returns an object with "source" key', () => {
        const result = mapPublish(document, filename, type)
        expect(Object.keys(result)).toContain('source')
      })

      test('returns mappedPublish.source for key "source"', () => {
        const result = mapPublish(document, filename, type)
        expect(result.source).toStrictEqual(mappedPublish.source)
      })

      test('returns mappedPublish', () => {
        const result = mapPublish(document, filename, type)
        expect(result).toStrictEqual(mappedPublish)
      })
    })
  })
})
