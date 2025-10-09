const moment = require('moment')
const getFilename = require('../../../app/generator/create-filename')

const { SFI23QUARTERLYSTATEMENT, DELINKED } = require('../../../app/constants/document-types')

const SFI23QUARTERLYSTATEMENT_PREFIX = 'FFC_PaymentSfi23QuarterlyStatement_'
const DELINKEDSTATEMENT_PREFIX = 'FFC_PaymentDelinkedStatement_'
const DOCUMENT_PREFIX = 'FFC_PaymentDocument_'
const EXTENSION = '.pdf'

let mockSfi23QuarterlyStatement
let mockDelinkedStatement
let timestamp

describe('create filename', () => {
  beforeEach(() => {
    mockDelinkedStatement = require('../../mocks/mock-delinked-statement')
    mockSfi23QuarterlyStatement = require('../../mocks/mock-statement-sfi23-quarterly')
    jest.useFakeTimers().setSystemTime(new Date(2022, 7, 5, 15, 30, 10, 120))
    timestamp = moment(new Date()).format('YYYYMMDDHHmmssSS')
  })

  test('writes full filename if delinked statement', () => {
    const result = getFilename(mockDelinkedStatement, timestamp, DELINKED)
    expect(result).toBe(`${DELINKEDSTATEMENT_PREFIX}DP_2025_1100016529_2022080515301012${EXTENSION}`)
  })

  test('writes full filename if SFI23 quarterly statement', () => {
    const result = getFilename(mockSfi23QuarterlyStatement, timestamp, SFI23QUARTERLYSTATEMENT)
    expect(result).toBe(`${SFI23QUARTERLYSTATEMENT_PREFIX}SFI_2023_1104376954_2022080515301012${EXTENSION}`)
  })

  test('starts with SFI23 quarterly statement prefix if SFI23 quarterly statement', () => {
    const result = getFilename(mockSfi23QuarterlyStatement, timestamp, SFI23QUARTERLYSTATEMENT)
    expect(result.startsWith(SFI23QUARTERLYSTATEMENT_PREFIX)).toBeTruthy()
  })

  test('starts with document prefix if unknown type', () => {
    const result = getFilename(mockDelinkedStatement, timestamp, 'unknown')
    expect(result.startsWith(DOCUMENT_PREFIX)).toBeTruthy()
  })

  test('has PDF extension if delinked statement', () => {
    const result = getFilename(mockDelinkedStatement, timestamp, DELINKED)
    expect(result.endsWith(EXTENSION)).toBeTruthy()
  })

  test('has PDF extension if SFI23 quarterly statement', () => {
    const result = getFilename(mockSfi23QuarterlyStatement, timestamp, SFI23QUARTERLYSTATEMENT)
    expect(result.endsWith(EXTENSION)).toBeTruthy()
  })

  test('includes scheme short name if delinked statement', () => {
    mockDelinkedStatement.scheme.shortName = 'DP'
    const result = getFilename(mockDelinkedStatement, timestamp, DELINKED)
    expect(result).toContain('DP')
  })

  test('includes scheme short name if SFI23 quarterly statement', () => {
    mockSfi23QuarterlyStatement.scheme.shortName = 'SFI'
    const result = getFilename(mockSfi23QuarterlyStatement, timestamp, SFI23QUARTERLYSTATEMENT)
    expect(result).toContain('SFI')
  })

  test('includes scheme short name with underscore prefix and suffix if SFI23 quarterly statement', () => {
    mockSfi23QuarterlyStatement.scheme.shortName = 'SFI'
    const result = getFilename(mockSfi23QuarterlyStatement, timestamp, SFI23QUARTERLYSTATEMENT)
    expect(result).toContain('_SFI_')
  })

  test('includes FRN if delinked statement', () => {
    mockDelinkedStatement.frn = 1104376955
    const result = getFilename(mockDelinkedStatement, timestamp, DELINKED)
    expect(result).toContain('1104376955')
  })

  test('includes FRN if SFI23 quarterly statement', () => {
    mockSfi23QuarterlyStatement.frn = 1104376954
    const result = getFilename(mockSfi23QuarterlyStatement, timestamp, SFI23QUARTERLYSTATEMENT)
    expect(result).toContain('1104376954')
  })

  test('includes FRN with underscore prefix and suffix if SFI23 quarterly statement', () => {
    mockSfi23QuarterlyStatement.frn = 1104376954
    const result = getFilename(mockSfi23QuarterlyStatement, timestamp, SFI23QUARTERLYSTATEMENT)
    expect(result).toContain('_1104376954_')
  })

  test('includes timestamp if delinked statement', () => {
    const result = getFilename(mockDelinkedStatement, timestamp, DELINKED)
    expect(result).toContain('2022080515301012')
  })

  test('includes timestamp if SFI23 quarterly statement', () => {
    const result = getFilename(mockSfi23QuarterlyStatement, timestamp, SFI23QUARTERLYSTATEMENT)
    expect(result).toContain('2022080515301012')
  })

  test('includes timestamp with underscore prefix if SFI23 quarterly statement', () => {
    const result = getFilename(mockSfi23QuarterlyStatement, timestamp, SFI23QUARTERLYSTATEMENT)
    expect(result).toContain('_2022080515301012')
  })

  test('removes spaces if SFI23 quarterly statement', () => {
    const result = getFilename(mockSfi23QuarterlyStatement, timestamp, SFI23QUARTERLYSTATEMENT)
    expect(result).toBe('FFC_PaymentSfi23QuarterlyStatement_SFI_2023_1104376954_2022080515301012.pdf')
  })
})
