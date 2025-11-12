const validateFilename = require('../../../../app/messaging/schemas/filename-regex-validation')

describe('validateFilename', () => {
  test('should return true for valid filenames', () => {
    expect(validateFilename('ABC_DocumentName_ABC_2023_1234567890_2023101012000000.pdf')).toBe(true)
  })

  const invalidCases = [
    // Invalid team name
    'AB_DocumentName_ABC_2023_1234567890_2023101012000000.pdf',
    '123_Valid_Document_2023_1234567890_2023101012000000.pdf',
    // Invalid document prefix
    'ABC_1InvalidDocument_2023_1234567890_2023101012000000.pdf',
    'ABC_InvalidDocName_2023_1234567890_2023101012000000.pdf',
    // Invalid scheme short name
    'ABC_DocumentName_1234_2023_1234567890_2023101012000000.pdf',
    'ABC_DocumentName_A_2023_1234567890_2023101012000000.pdf',
    // Invalid scheme year
    'ABC_DocumentName_ABC_23_1234567890_2023101012000000.pdf',
    'ABC_DocumentName_ABC_20223_1234567890_2023101012000000.pdf',
    // Invalid FRN number
    'ABC_DocumentName_ABC_2023_123456789_2023101012000000.pdf',
    'ABC_DocumentName_ABC_2023_12345678901_2023101012000000.pdf',
    // Invalid timestamp
    'ABC_DocumentName_ABC_2023_1234567890_20231010120000.pdf',
    'ABC_DocumentName_ABC_2023_1234567890_abcdger.pdf',
    // Invalid file extension
    'ABC_DocumentName_ABC_2023_1234567890_2023101012000000.txt',
    'ABC_DocumentName_ABC_2023_1234567890_2023101012000000.doc'
  ]

  test.each(invalidCases)('should return false for invalid filename: %s', (filename) => {
    expect(validateFilename(filename)).toBe(false)
  })
})
