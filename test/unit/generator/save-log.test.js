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

    expect(callArgs.businessName).toBe(statement.businessName)
    expect(callArgs.frn).toBe(statement.frn)
    expect(callArgs.sbi).toBe(statement.sbi)
    expect(callArgs.addressLine1).toBe(statement.addressLine1)
    expect(callArgs.addressLine2).toBe(statement.addressLine2)
    expect(callArgs.addressLine3).toBe(statement.addressLine3)
    expect(callArgs.addressLine4).toBe(statement.addressLine4)
    expect(callArgs.addressLine5).toBe(statement.addressLine5)
    expect(callArgs.postcode).toBe(statement.postcode)
    expect(callArgs.email).toBe(statement.email)
    expect(callArgs.schemeName).toBe(statement.schemeName)
    expect(callArgs.schemeShortName).toBe(statement.schemeShortName)
    expect(callArgs.schemeYear).toBe(statement.schemeYear)
    expect(callArgs.schemeFrequency).toBe(statement.schemeFrequency)
  })
})
