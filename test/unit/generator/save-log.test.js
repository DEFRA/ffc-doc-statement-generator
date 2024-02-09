const moment = require('moment')

const { mockGeneration } = require('../../mocks/modules/data')
const saveLog = require('../../../app/generator/save-log')

let statement
let timestamp

describe('create log', () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date(2022, 7, 5, 15, 30, 10, 12))
    timestamp = moment(new Date()).format('YYYYMMDDHHmmssSS')
    statement = JSON.parse(JSON.stringify(require('../../mocks/mock-statement')))
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
})
