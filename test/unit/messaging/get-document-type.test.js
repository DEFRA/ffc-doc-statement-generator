const { getDocumentType } = require('../../../app/messaging/get-document-type')
const { STATEMENT, SCHEDULE } = require('../../../app/constants/document-types')

describe('get document type', () => {
  test('returns statement type', async () => {
    expect(getDocumentType(STATEMENT.type)).toBe(STATEMENT)
  })

  test('returns schedule type', async () => {
    expect(getDocumentType(SCHEDULE.type)).toBe(SCHEDULE)
  })

  test('throws on unknown type', async () => {
    expect(() => getDocumentType('unknown')).toThrow()
  })

  test('throws on undefined type', async () => {
    expect(() => getDocumentType(undefined)).toThrow()
  })

  test('throws on missing type', async () => {
    expect(() => getDocumentType()).toThrow()
  })

  test('throws on empty type', async () => {
    expect(() => getDocumentType('')).toThrow()
  })

  test('throws on array type', async () => {
    expect(() => getDocumentType([])).toThrow()
  })

  test('throws on true type', async () => {
    expect(() => getDocumentType(true)).toThrow()
  })

  test('throws on false type', async () => {
    expect(() => getDocumentType(false)).toThrow()
  })

  test('throws on 0 type', async () => {
    expect(() => getDocumentType(0)).toThrow()
  })

  test('throws on 1 type', async () => {
    expect(() => getDocumentType(1)).toThrow()
  })

  test('throws on empty string type', async () => {
    expect(() => getDocumentType('')).toThrow()
  })
})
