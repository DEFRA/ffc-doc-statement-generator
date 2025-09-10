const validateFilename = require('../../../../app/messaging/schemas/filename-regex-validation')

describe('validateFilename', () => {
  test('should return true for valid filenames', () => {
    expect(validateFilename('ABC_DocumentName_ABC_2023_1234567890_2023101012000000.pdf')).toBe(true)
  })

  test('should return false for invalid team name', () => {
    expect(validateFilename('AB_DocumentName_ABC_2023_1234567890_2023101012000000.pdf')).toBe(false)
    expect(validateFilename('123_Valid_Document_2023_1234567890_2023101012000000.pdf')).toBe(false)
  })

  test('should return false for invalid document prefix', () => {
    expect(validateFilename('ABC_1InvalidDocument_2023_1234567890_2023101012000000.pdf')).toBe(false)
    expect(validateFilename('ABC_InvalidDocName_2023_1234567890_2023101012000000.pdf')).toBe(false)
  })

  test('should return false for invalid scheme short name', () => {
    expect(validateFilename('ABC_DocumentName_1234_2023_1234567890_2023101012000000.pdf')).toBe(false)
    expect(validateFilename('ABC_DocumentName_A_2023_1234567890_2023101012000000.pdf')).toBe(false)
  })

  test('should return false for invalid scheme year', () => {
    expect(validateFilename('ABC_DocumentName_ABC_23_1234567890_2023101012000000.pdf')).toBe(false)
    expect(validateFilename('ABC_DocumentName_ABC_20223_1234567890_2023101012000000.pdf')).toBe(false)
  })

  test('should return false for invalid FRN number', () => {
    expect(validateFilename('ABC_DocumentName_ABC_2023_123456789_2023101012000000.pdf')).toBe(false)
    expect(validateFilename('ABC_DocumentName_ABC_2023_12345678901_2023101012000000.pdf')).toBe(false)
  })

  test('should return false for invalid timestamp', () => {
    expect(validateFilename('ABC_DocumentName_ABC_2023_1234567890_20231010120000.pdf')).toBe(false)
    expect(validateFilename('ABC_DocumentName_ABC_2023_1234567890_abcdger.pdf')).toBe(false)
  })

  test('should return false for invalid file extension', () => {
    expect(validateFilename('ABC_DocumentName_ABC_2023_1234567890_2023101012000000.txt')).toBe(false)
    expect(validateFilename('ABC_DocumentName_ABC_2023_1234567890_2023101012000000.doc')).toBe(false)
  })
})
