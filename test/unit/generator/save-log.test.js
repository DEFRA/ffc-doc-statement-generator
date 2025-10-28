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
    expect(mockGeneration.create.mock.calls[0][0].statementData).toStrictEqual(statement)
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

    expect(callArgs.businessName).toBe(statement.BusinessName)
    expect(callArgs.frn).toBe(statement.Frn)
    expect(callArgs.sbi).toBe(statement.Sbi)
    expect(callArgs.addressLine1).toBe(statement.AddressLine1)
    expect(callArgs.addressLine2).toBe(statement.AddressLine2)
    expect(callArgs.addressLine3).toBe(statement.AddressLine3)
    expect(callArgs.addressLine4).toBe(statement.AddressLine4)
    expect(callArgs.addressLine5).toBe(statement.AddressLine5)
    expect(callArgs.postcode).toBe(statement.Postcode)
    expect(callArgs.email).toBe(statement.Email)
    expect(callArgs.schemeName).toBe(statement.SchemeName)
    expect(callArgs.schemeShortName).toBe(statement.SchemeShortName)
    expect(callArgs.schemeYear).toBe(statement.SchemeYear)
    expect(callArgs.schemeFrequency).toBe(statement.SchemeFrequency)
  })
})
