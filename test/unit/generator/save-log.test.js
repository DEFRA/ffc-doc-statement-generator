const moment = require('moment')
const { mockGeneration } = require('../../mocks/modules/data')
const saveLog = require('../../../app/generator/save-log')

let statement
let timestamp

describe('create log', () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date(2022, 7, 5, 15, 30, 10, 12))
    timestamp = moment(new Date()).format('YYYYMMDDHHmmssSS')
    statement = JSON.parse(JSON.stringify(require('../../mocks/mock-delinked-statement')))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('creates log with statement data', async () => {
    delete statement.documentReference
    await saveLog(statement, 'test.pdf', timestamp)

    const {
      address,
      scheme,
      businessName,
      frn,
      sbi,
      email,
      documentReference,
      ...expectedStatementData
    } = statement

    expect(mockGeneration.create.mock.calls[0][0].statementData).toMatchObject(expectedStatementData)
  })

  test('creates log with statement data with no documentReference', async () => {
    await saveLog(statement, 'test.pdf', timestamp)

    expect(Object.keys(statement)).toContain('documentReference')
    expect(Object.keys(mockGeneration.create.mock.calls[0][0].statementData)).not.toContain('documentReference')
  })

  test('creates log with documentReference', async () => {
    await saveLog(statement, 'test.pdf', timestamp)
    expect(mockGeneration.create.mock.calls[0][0].documentReference).toBe(statement.documentReference)
  })

  test('creates log with generation time', async () => {
    await saveLog(statement, 'test.pdf', timestamp)
    expect(mockGeneration.create.mock.calls[0][0].dateGenerated).toStrictEqual(timestamp)
  })

  test('creates log with filename', async () => {
    await saveLog(statement, 'test.pdf', timestamp)
    expect(mockGeneration.create.mock.calls[0][0].filename).toBe('test.pdf')
  })

  test('creates log with extracted fields from statementData', async () => {
    await saveLog(statement, 'test.pdf', timestamp)

    const callArgs = mockGeneration.create.mock.calls[0][0]

    expect(callArgs.businessName).toBe(statement.businessName)
    expect(callArgs.frn).toBe(statement.frn)
    expect(callArgs.sbi).toBe(statement.sbi)
    expect(callArgs.email).toBe(statement.email)

    // Address fields
    expect(callArgs.addressLine1).toBe(statement.address.line1)
    expect(callArgs.addressLine2).toBe(statement.address.line2)
    expect(callArgs.addressLine3).toBe(statement.address.line3)
    expect(callArgs.addressLine4).toBe(statement.address.line4)
    expect(callArgs.addressLine5).toBe(statement.address.line5)
    expect(callArgs.postcode).toBe(statement.address.postcode)

    // Scheme fields
    expect(callArgs.schemeName).toBe(statement.scheme.name)
    expect(callArgs.schemeShortName).toBe(statement.scheme.shortName)
    expect(callArgs.schemeYear).toBe(statement.scheme.year)
    expect(callArgs.schemeFrequency).toBe(statement.scheme.frequency)
  })

  test('handles missing address gracefully', async () => {
    delete statement.address
    await saveLog(statement, 'test.pdf', timestamp)

    const callArgs = mockGeneration.create.mock.calls[0][0]

    expect(callArgs.addressLine1).toBeUndefined()
    expect(callArgs.addressLine2).toBeUndefined()
    expect(callArgs.addressLine3).toBeUndefined()
    expect(callArgs.addressLine4).toBeUndefined()
    expect(callArgs.addressLine5).toBeUndefined()
    expect(callArgs.postcode).toBeUndefined()
  })

  test('handles missing scheme gracefully', async () => {
    delete statement.scheme
    await saveLog(statement, 'test.pdf', timestamp)

    const callArgs = mockGeneration.create.mock.calls[0][0]

    expect(callArgs.schemeName).toBeUndefined()
    expect(callArgs.schemeShortName).toBeUndefined()
    expect(callArgs.schemeYear).toBeUndefined()
    expect(callArgs.schemeFrequency).toBeUndefined()
  })
})
