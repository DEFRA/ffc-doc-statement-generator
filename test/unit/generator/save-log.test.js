const moment = require('moment')
const { mockGeneration } = require('../../mocks/modules/data')
const saveLog = require('../../../app/generator/save-log')

let statement
let timestamp

describe('saveLog', () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date(2022, 7, 5, 15, 30, 10, 12))
    timestamp = moment(new Date()).format('YYYYMMDDHHmmssSS')
    statement = JSON.parse(JSON.stringify(require('../../mocks/mock-delinked-statement')))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const getCallArgs = async (stmt = statement, filename = 'test.pdf', ts = timestamp) => {
    await saveLog(stmt, filename, ts)
    return mockGeneration.create.mock.calls[0][0]
  }

  test('creates log with statement data (excluding some fields)', async () => {
    delete statement.documentReference
    const callArgs = await getCallArgs()

    const { address, scheme, businessName, frn, sbi, email, documentReference, ...expectedStatementData } = statement

    expect(callArgs.statementData).toMatchObject(expectedStatementData)
  })

  test('creates log with documentReference', async () => {
    const callArgs = await getCallArgs()
    expect(callArgs.documentReference).toBe(statement.documentReference)
  })

  test('creates log with generation timestamp', async () => {
    const callArgs = await getCallArgs()
    expect(callArgs.dateGenerated).toStrictEqual(timestamp)
  })

  test('creates log with filename', async () => {
    const callArgs = await getCallArgs()
    expect(callArgs.filename).toBe('test.pdf')
  })

  test('extracts fields from statementData', async () => {
    const callArgs = await getCallArgs()

    expect(callArgs.businessName).toBe(statement.businessName)
    expect(callArgs.frn).toBe(statement.frn)
    expect(callArgs.sbi).toBe(statement.sbi)
    expect(callArgs.email).toBe(statement.email)

    if (statement.address) {
      expect(callArgs.addressLine1).toBe(statement.address.line1)
      expect(callArgs.addressLine2).toBe(statement.address.line2)
      expect(callArgs.addressLine3).toBe(statement.address.line3)
      expect(callArgs.addressLine4).toBe(statement.address.line4)
      expect(callArgs.addressLine5).toBe(statement.address.line5)
      expect(callArgs.postcode).toBe(statement.address.postcode)
    }

    if (statement.scheme) {
      expect(callArgs.schemeName).toBe(statement.scheme.name)
      expect(callArgs.schemeShortName).toBe(statement.scheme.shortName)
      expect(callArgs.schemeYear).toBe(statement.scheme.year)
      expect(callArgs.schemeFrequency).toBe(statement.scheme.frequency)
    }
  })

  test('handles missing address gracefully', async () => {
    delete statement.address
    const callArgs = await getCallArgs()

    expect(callArgs.addressLine1).toBeUndefined()
    expect(callArgs.addressLine2).toBeUndefined()
    expect(callArgs.addressLine3).toBeUndefined()
    expect(callArgs.addressLine4).toBeUndefined()
    expect(callArgs.addressLine5).toBeUndefined()
    expect(callArgs.postcode).toBeUndefined()
  })

  test('handles missing scheme gracefully', async () => {
    delete statement.scheme
    const callArgs = await getCallArgs()

    expect(callArgs.schemeName).toBeUndefined()
    expect(callArgs.schemeShortName).toBeUndefined()
    expect(callArgs.schemeYear).toBeUndefined()
    expect(callArgs.schemeFrequency).toBeUndefined()
  })
})
