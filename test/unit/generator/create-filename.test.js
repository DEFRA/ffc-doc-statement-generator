const moment = require('moment')
const getFilename = require('../../../app/generator/create-filename')

const { STATEMENT, SCHEDULE } = require('../../../app/constants/document-types')

const STATEMENT_PREFIX = 'FFC_PaymentStatement_'
const SCHEDULE_PREFIX = 'FFC_PaymentSchedule_'
const DOCUMENT_PREFIX = 'FFC_PaymentDocument_'
const EXTENSION = '.pdf'

let mockStatement
let mockSchedule
let timestamp

describe('create filename', () => {
  beforeEach(() => {
    mockStatement = require('../../mocks/mock-statement')
    mockSchedule = require('../../mocks/mock-schedule').topUpSchedule
    jest.useFakeTimers().setSystemTime(new Date(2022, 7, 5, 15, 30, 10, 120))
    timestamp = moment(new Date()).format('YYYYMMDDHHmmssSS')
  })

  test('writes full filename if statement', () => {
    const result = getFilename(mockStatement, timestamp, STATEMENT)
    expect(result).toBe(`${STATEMENT_PREFIX}SFI_2022_1234567890_2022080515301012${EXTENSION}`)
  })

  test('writes full filename if schedule', () => {
    const result = getFilename(mockSchedule, timestamp, SCHEDULE)
    expect(result).toBe(`${SCHEDULE_PREFIX}SFI_2022_1234567890_2022080515301012${EXTENSION}`)
  })

  test('starts with statement prefix if statement', () => {
    const result = getFilename(mockStatement, timestamp, STATEMENT)
    expect(result.startsWith(STATEMENT_PREFIX)).toBeTruthy()
  })

  test('starts with schedule prefix if schedule', () => {
    const result = getFilename(mockSchedule, timestamp, SCHEDULE)
    expect(result.startsWith(SCHEDULE_PREFIX)).toBeTruthy()
  })

  test('starts with document prefix if unknown type', () => {
    const result = getFilename(mockStatement, timestamp, 'unknown')
    expect(result.startsWith(DOCUMENT_PREFIX)).toBeTruthy()
  })

  test('has PDF extension if statement', () => {
    const result = getFilename(mockStatement, timestamp, STATEMENT)
    expect(result.endsWith(EXTENSION)).toBeTruthy()
  })

  test('has PDF extension if schedule', () => {
    const result = getFilename(mockSchedule, timestamp, SCHEDULE)
    expect(result.endsWith(EXTENSION)).toBeTruthy()
  })

  test('includes scheme short name if statement', () => {
    mockStatement.scheme.shortName = 'SFI'
    const result = getFilename(mockStatement, timestamp, SCHEDULE)
    expect(result).toContain('SFI')
  })

  test('includes scheme short name if statement', () => {
    mockSchedule.scheme.shortName = 'SFI'
    const result = getFilename(mockSchedule, timestamp, SCHEDULE)
    expect(result).toContain('SFI')
  })

  test('includes scheme short name with underscore prefix and suffix if statement', () => {
    mockStatement.scheme.shortName = 'SFI'
    const result = getFilename(mockStatement, timestamp, STATEMENT)
    expect(result).toContain('_SFI_')
  })

  test('includes scheme short name with underscore prefix and suffix if schedule', () => {
    mockSchedule.scheme.shortName = 'SFI'
    const result = getFilename(mockSchedule, timestamp, SCHEDULE)
    expect(result).toContain('_SFI_')
  })

  test('includes FRN if statement', () => {
    mockStatement.frn = 1234567890
    const result = getFilename(mockStatement, timestamp, STATEMENT)
    expect(result).toContain('1234567890')
  })

  test('includes FRN if schedule', () => {
    mockSchedule.frn = 1234567890
    const result = getFilename(mockSchedule, timestamp, SCHEDULE)
    expect(result).toContain('1234567890')
  })

  test('includes FRN with underscore prefix and suffix if statement', () => {
    mockStatement.frn = 1234567890
    const result = getFilename(mockStatement, timestamp, STATEMENT)
    expect(result).toContain('_1234567890_')
  })

  test('includes FRN with underscore prefix and suffix if schedule', () => {
    mockSchedule.frn = 1234567890
    const result = getFilename(mockSchedule, timestamp, SCHEDULE)
    expect(result).toContain('_1234567890_')
  })

  test('includes timestamp if statement', () => {
    const result = getFilename(mockStatement, timestamp, STATEMENT)
    expect(result).toContain('2022080515301012')
  })

  test('includes timestamp if schedule', () => {
    const result = getFilename(mockSchedule, timestamp, SCHEDULE)
    expect(result).toContain('2022080515301012')
  })

  test('includes timestamp with underscore prefix if statement', () => {
    const result = getFilename(mockStatement, timestamp, STATEMENT)
    expect(result).toContain('_2022080515301012')
  })

  test('includes timestamp with underscore prefix if schedule', () => {
    const result = getFilename(mockSchedule, timestamp, SCHEDULE)
    expect(result).toContain('_2022080515301012')
  })

  test('removes spaces if statement', () => {
    const result = getFilename(mockSchedule, timestamp, STATEMENT)
    expect(result).toBe('FFC_PaymentStatement_SFI_2022_1234567890_2022080515301012.pdf')
  })

  test('removes spaces if schedule', () => {
    const result = getFilename(mockSchedule, timestamp, SCHEDULE)
    expect(result).toBe('FFC_PaymentSchedule_SFI_2022_1234567890_2022080515301012.pdf')
  })
})
