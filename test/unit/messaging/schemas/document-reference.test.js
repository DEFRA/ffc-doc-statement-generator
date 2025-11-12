const DOCUMENT_REFERENCE = require('../../../mocks/components/document-reference')
const schema = require('../../../../app/messaging/schemas/document-reference')

describe('documentReferenceSchema', () => {
  const cases = [
    { value: DOCUMENT_REFERENCE, valueOutput: DOCUMENT_REFERENCE, errorType: null, errorMessage: null, keysLength: 1 },
    { value: String(DOCUMENT_REFERENCE), valueOutput: Number(DOCUMENT_REFERENCE), errorType: null, errorMessage: null, keysLength: 1 },
    { value: null, valueOutput: null, errorType: null, errorMessage: null, keysLength: 1 },
    { value: 0, valueOutput: 0, errorType: 'number.positive', errorMessage: 'The document reference must be a number greater than 0.', keysLength: 2 },
    { value: '0', valueOutput: 0, errorType: 'number.positive', errorMessage: 'The document reference must be a number greater than 0.', keysLength: 2 },
    { value: -1, valueOutput: -1, errorType: 'number.positive', errorMessage: 'The document reference must be a number greater than 0.', keysLength: 2 },
    { value: '-1', valueOutput: -1, errorType: 'number.positive', errorMessage: 'The document reference must be a number greater than 0.', keysLength: 2 },
    { value: 'a', valueOutput: 'a', errorType: 'number.base', errorMessage: 'The document reference must be a number.', keysLength: 2 },
    { value: {}, valueOutput: {}, errorType: 'number.base', errorMessage: 'The document reference must be a number.', keysLength: 2 },
    { value: [], valueOutput: [], errorType: 'number.base', errorMessage: 'The document reference must be a number.', keysLength: 2 }
  ]

  test.each(cases)(
    'validates document reference: %p',
    ({ value, valueOutput, errorType, errorMessage, keysLength }) => {
      const result = schema.validate(value)
      expect(result).toBeInstanceOf(Object)
      expect(Object.keys(result)).toHaveLength(keysLength)
      expect(result.value).toBe(valueOutput)

      if (errorType) {
        expect(result.error).toBeInstanceOf(Error)
        const detail = result.error.details[0]
        expect(Object.keys(detail)).toHaveLength(4)
        expect(detail.type).toBe(errorType)
        expect(detail.message).toBe(errorMessage)
      } else {
        expect(result.error).toBeUndefined()
      }
    }
  )
})
