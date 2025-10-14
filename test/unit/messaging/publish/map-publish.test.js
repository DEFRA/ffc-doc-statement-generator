const { SFI23QUARTERLYSTATEMENT: SFI23QUARTERLYSTATEMENT_TYPE, DELINKED: DELINKED_TYPE } = require('../../../../app/constants/document-types')
const { SFI23QUARTERLYSTATEMENT_MESSAGE, DELINKEDSTATEMENT_MESSAGE } = require('../../../mocks/messages/mock-process-message')
const { SFI23QUARTERLYSTATEMENT_MESSAGE: SFI23QUARTERLYSTATEMENT_MESSAGE_MAPPED, DELINKEDSTATEMENT_MESSAGE: DELINKEDSTATEMENT_MESSAGE_MAPPED } = require('../../../mocks/messages/publish')
const { SFI23QUARTERLYSTATEMENT: SFI23QUARTERLYSTATEMENT_FILENAME, DELINKED_STATEMENT: DELINKEDSTATEMENT_FILENAME } = require('../../../mocks/components/filename')

const mapPublish = require('../../../../app/messaging/publish/map-publish')

let document
let filename
let type
let mappedPublish
let expected

describe('map publish', () => {
  describe('when document is an sfi23 statement', () => {
    beforeEach(() => {
      filename = SFI23QUARTERLYSTATEMENT_FILENAME
      type = SFI23QUARTERLYSTATEMENT_TYPE.id
    })

    describe('when document is valid', () => {
      beforeEach(() => {
        document = SFI23QUARTERLYSTATEMENT_MESSAGE.body
        mappedPublish = {
          ...SFI23QUARTERLYSTATEMENT_MESSAGE_MAPPED,
          body: {
            ...SFI23QUARTERLYSTATEMENT_MESSAGE_MAPPED.body,
            filename
          }
        }
        expected = {
          ...mappedPublish
        }
        delete expected.body.agreementNumber
      })

      test('returns an object', () => {
        const result = mapPublish(document, filename, type)
        expect(result).toEqual(expected)
      })

      test('returns an object with 3 keys', () => {
        const result = mapPublish(document, filename, type)
        expect(Object.keys(result)).toHaveLength(3)
      })
    })

    describe('when document has null documentReference', () => {
      beforeEach(() => {
        document = {
          ...SFI23QUARTERLYSTATEMENT_MESSAGE.body,
          documentReference: null
        }
        mappedPublish = {
          ...SFI23QUARTERLYSTATEMENT_MESSAGE_MAPPED,
          body: {
            ...SFI23QUARTERLYSTATEMENT_MESSAGE_MAPPED.body,
            documentReference: null,
            filename
          }
        }
        expected = {
          ...mappedPublish
        }
        delete expected.body.agreementNumber
      })

      test('returns an object', () => {
        const result = mapPublish(document, filename, type)
        expect(result).toEqual(expected)
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
