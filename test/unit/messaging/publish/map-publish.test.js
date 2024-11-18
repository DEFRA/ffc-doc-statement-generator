const { STATEMENT: STATEMENT_TYPE, DELINKED: DELINKED_TYPE } = require('../../../../app/constants/document-types')
const { STATEMENT_MESSAGE, DELINKEDSTATEMENT_MESSAGE } = require('../../../mocks/messages/mock-process-message')
const { STATEMENT_MESSAGE: STATEMENT_MESSAGE_MAPPED, DELINKEDSTATEMENT_MESSAGE: DELINKEDSTATEMENT_MESSAGE_MAPPED } = require('../../../mocks/messages/publish')
const { STATEMENT: STATEMENT_FILENAME, DELINKED_STATEMENT: DELINKEDSTATEMENT_FILENAME } = require('../../../mocks/components/filename')

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
        mappedPublish = {
          ...STATEMENT_MESSAGE_MAPPED,
          body: {
            ...STATEMENT_MESSAGE_MAPPED.body,
            filename
          }
        }
      })

      test('returns an object', () => {
        const result = mapPublish(document, filename, type)
        expect(result).toEqual(mappedPublish)
      })

      test('returns an object with 3 keys', () => {
        const result = mapPublish(document, filename, type)
        expect(Object.keys(result)).toHaveLength(3)
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
            documentReference: null,
            filename
          }
        }
      })

      test('returns an object', () => {
        const result = mapPublish(document, filename, type)
        expect(result).toEqual(mappedPublish)
      })
    })
  })

  describe('when document is a delinked statement', () => {
    beforeEach(() => {
      filename = DELINKEDSTATEMENT_FILENAME
      type = DELINKED_TYPE.id
    })

    describe('when document is valid', () => {
      beforeEach(() => {
        document = DELINKEDSTATEMENT_MESSAGE.body
        mappedPublish = {
          ...DELINKEDSTATEMENT_MESSAGE_MAPPED,
          body: {
            ...DELINKEDSTATEMENT_MESSAGE_MAPPED.body,
            filename
          }
        }
      })

      test('returns an object', () => {
        const result = mapPublish(document, filename, type)
        expect(result).toEqual(mappedPublish)
      })

      test('returns an object with 3 keys', () => {
        const result = mapPublish(document, filename, type)
        expect(Object.keys(result)).toHaveLength(3)
      })
    })

    describe('when document has null documentReference', () => {
      beforeEach(() => {
        document = {
          ...DELINKEDSTATEMENT_MESSAGE.body,
          documentReference: null
        }
        mappedPublish = {
          ...DELINKEDSTATEMENT_MESSAGE_MAPPED,
          body: {
            ...DELINKEDSTATEMENT_MESSAGE_MAPPED.body,
            documentReference: null,
            filename
          }
        }
      })

      test('returns an object', () => {
        const result = mapPublish(document, filename, type)
        expect(result).toEqual(mappedPublish)
      })
    })
  })
})
