const { getDocumentType } = require('../../../app/messaging/get-document-type')
const { SFI23QUARTERLYSTATEMENT, DELINKED } = require('../../../app/constants/document-types')

describe('getDocumentType', () => {
  test('returns SFI23QUARTERLYSTATEMENT type', () => {
    expect(getDocumentType(SFI23QUARTERLYSTATEMENT.type)).toBe(SFI23QUARTERLYSTATEMENT)
  })

  test('returns DELINKED type', () => {
    expect(getDocumentType(DELINKED.type)).toBe(DELINKED)
  })

  test.each([
    'unknown',
    undefined,
    null,
    '',
    [],
    true,
    false,
    0,
    1
  ])('throws on invalid type: %p', (invalidType) => {
    expect(() => getDocumentType(invalidType)).toThrow()
  })
})
