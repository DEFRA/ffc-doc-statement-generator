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
    jest.resetModules()
    mockDelinkedStatement = require('../../mocks/mock-delinked-statement')
    mockSfi23QuarterlyStatement = require('../../mocks/mock-statement-sfi23-quarterly')
    jest.useFakeTimers().setSystemTime(new Date(2022, 7, 5, 15, 30, 10, 120))
    timestamp = moment(new Date()).format('YYYYMMDDHHmmssSS')
  })

  test.each([
    ['delinked', DELINKED, DELINKEDSTATEMENT_PREFIX, 'DP', 1100016529, () => ({ ...mockDelinkedStatement, scheme: { ...mockDelinkedStatement.scheme } })],
    ['sfi23', SFI23QUARTERLYSTATEMENT, SFI23QUARTERLYSTATEMENT_PREFIX, 'SFI', 1104376954, () => ({ ...mockSfi23QuarterlyStatement, scheme: { ...mockSfi23QuarterlyStatement.scheme } })]
  ])(
    'generates correct filename for type %s',
    (name, type, prefix, schemeShortName, frn, statementFactory) => {
      const statement = statementFactory()
      statement.scheme.shortName = schemeShortName
      statement.frn = frn
      const result = getFilename(statement, timestamp, type)

      expect(result.startsWith(prefix)).toBeTruthy()
      expect(result.endsWith(EXTENSION)).toBeTruthy()
      expect(result).toContain(schemeShortName)
      expect(result).toContain(frn.toString())
      expect(result).toContain(timestamp)
    }
  )

  test('falls back to document prefix for unknown type', () => {
    const statement = { ...mockDelinkedStatement, scheme: { ...mockDelinkedStatement.scheme } }
    const result = getFilename(statement, timestamp, 'unknown')
    expect(result.startsWith(DOCUMENT_PREFIX)).toBeTruthy()
  })

  test('removes spaces for SFI23 quarterly statement', () => {
    const statement = { ...mockSfi23QuarterlyStatement, scheme: { ...mockSfi23QuarterlyStatement.scheme }, frn: 1104376954 }
    statement.scheme.shortName = 'SFI'
    const result = getFilename(statement, timestamp, SFI23QUARTERLYSTATEMENT)
    expect(result).toBe('FFC_PaymentSfi23QuarterlyStatement_SFI_2023_1104376954_2022080515301012.pdf')
  })
})
