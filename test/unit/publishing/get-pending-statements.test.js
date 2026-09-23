const { createKnexMock } = require('../../helpers/mock-knex')

const mockDb = createKnexMock(['outbox'])

jest.mock('../../../app/database', () => ({
  client: mockDb.knex,
  transaction: mockDb.transaction,
  close: mockDb.close,
  ...mockDb.tables
}))
jest.mock('../../../app/publishing/set-start-processing')

const { getPendingStatements } = require('../../../app/publishing/get-pending-statements')
const { setStartProcessing } = require('../../../app/publishing/set-start-processing')

describe('getPendingStatements', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockDb.builder.resolves([])
  })

  test('should claim unpublished outbox rows with a row lock', async () => {
    await getPendingStatements()

    expect(mockDb.tables.outbox).toHaveBeenCalledWith()
    expect(mockDb.builder.whereNull).toHaveBeenCalledWith('published')
    expect(mockDb.builder.limit).toHaveBeenCalledWith(500)
    expect(mockDb.builder.forUpdate).toHaveBeenCalledTimes(1)
  })

  test('should group the startProcessing lag predicate', async () => {
    await getPendingStatements()

    expect(mockDb.builder.where).toHaveBeenCalledWith(expect.any(Function))

    // Run the grouped callback against the builder to confirm the OR branch.
    const group = mockDb.builder.where.mock.calls[0][0]
    group.call(mockDb.builder)

    expect(mockDb.builder.whereNull).toHaveBeenCalledWith('startProcessing')
    expect(mockDb.builder.orWhere).toHaveBeenCalledWith('startProcessing', '<', expect.any(Date))
  })

  test('should call setStartProcessing with pending statements', async () => {
    const mockStatements = [{ outboxId: 1 }, { outboxId: 2 }]
    mockDb.builder.resolves(mockStatements)

    await getPendingStatements()

    expect(setStartProcessing).toHaveBeenCalledWith(mockStatements)
  })

  test('should return the pending statements', async () => {
    const mockStatements = [{ outboxId: 1 }]
    mockDb.builder.resolves(mockStatements)

    const result = await getPendingStatements()

    expect(result).toEqual(mockStatements)
  })
})
