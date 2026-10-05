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
  let transactionMock

  beforeEach(() => {
    jest.clearAllMocks()
<<<<<<< HEAD
    mockDb.builder.resolves([])
  })

  test('should claim unpublished outbox rows with a row lock', async () => {
    await getPendingStatements()

    expect(mockDb.tables.outbox).toHaveBeenCalledWith()
    expect(mockDb.builder.whereNull).toHaveBeenCalledWith('published')
    expect(mockDb.builder.limit).toHaveBeenCalledWith(500)
    expect(mockDb.builder.forUpdate).toHaveBeenCalledTimes(1)
=======

    transactionMock = { mock: 'transaction' }
    db.sequelize.transaction.mockImplementation(async (callback) => {
      return callback(transactionMock)
    })

    db.outbox.findAll.mockResolvedValue([])
  })

  test('should run within a transaction', async () => {
    await getPendingStatements()

    expect(db.sequelize.transaction).toHaveBeenCalledTimes(1)
  })

  test('should call findAll with correct parameters including transaction and lock', async () => {
    await getPendingStatements()

    expect(db.outbox.findAll).toHaveBeenCalledWith(expect.objectContaining({
      lock: true,
      transaction: transactionMock
    }))
>>>>>>> 3b4d595 (wrap lock in transaction (#117))
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

    expect(setStartProcessing).toHaveBeenCalledWith(mockStatements, transactionMock)
  })

<<<<<<< HEAD
  test('should return the pending statements', async () => {
=======
  test('should return pending statements', async () => {
>>>>>>> 3b4d595 (wrap lock in transaction (#117))
    const mockStatements = [{ outboxId: 1 }]
    mockDb.builder.resolves(mockStatements)

    const result = await getPendingStatements()

    expect(result).toEqual(mockStatements)
  })

  test('should rollback transaction when findAll throws', async () => {
    const error = new Error('findAll failed')
    db.outbox.findAll.mockRejectedValue(error)

    await expect(getPendingStatements()).rejects.toThrow('findAll failed')
  })
})
