const moment = require('moment')
const getFilename = require('../../../app/generator/create-filename')
const PREFIX = 'FFC_PaymentStatement_'
const EXTENSION = '.pdf'
let mockStatement
let timestamp

describe('create filename', () => {
  beforeEach(() => {
    mockStatement = require('../../mocks/statement-data')
    jest.useFakeTimers().setSystemTime(new Date(2022, 7, 5, 15, 30, 10, 120))
    timestamp = moment(new Date()).format('YYYYMMDDHHmmssSS')
  })

  test('writes full filename', () => {
    const result = getFilename(mockStatement, timestamp)
    expect(result).toBe(`${PREFIX}SFI_2022_1234567890_2022080515301012${EXTENSION}`)
  })

  test('starts filename prefix', () => {
    const result = getFilename(mockStatement, timestamp)
    expect(result.startsWith(PREFIX)).toBeTruthy()
  })

  test('has PDF extension', () => {
    const result = getFilename(mockStatement, timestamp)
    expect(result.endsWith(EXTENSION)).toBeTruthy()
  })

  test('includes scheme short name', () => {
    mockStatement.scheme.shortName = 'SFI'
    const result = getFilename(mockStatement, timestamp)
    expect(result).toContain('SFI')
  })

  test('includes scheme short name with underscore prefix and suffix', () => {
    mockStatement.scheme.shortName = 'SFI'
    const result = getFilename(mockStatement, timestamp)
    expect(result).toContain('_SFI_')
  })

  test('includes FRN', () => {
    mockStatement.frn = 1234567890
    const result = getFilename(mockStatement, timestamp)
    expect(result).toContain('1234567890')
  })

  test('includes FRN with underscore prefix and suffix', () => {
    mockStatement.frn = 1234567890
    const result = getFilename(mockStatement, timestamp)
    expect(result).toContain('_1234567890_')
  })

  test('includes timestamp', () => {
    const result = getFilename(mockStatement, timestamp)
    expect(result).toContain('2022080515301012')
  })

  test('includes timestamp with underscore prefix', () => {
    const result = getFilename(mockStatement, timestamp)
    expect(result).toContain('_2022080515301012')
  })

  test('removes spaces', () => {
    mockStatement.scheme.shortName = 'My Scheme'
    const result = getFilename(mockStatement, timestamp)
    expect(result).toContain('MyScheme')
  })
})
