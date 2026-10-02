const { getPendingStatements } = require('../../../app/publishing/get-pending-statements')
const db = require('../../../app/data')
const { setStartProcessing } = require('../../../app/publishing/set-start-processing')

jest.mock('../../../app/data')
jest.mock('../../../app/publishing/set-start-processing')

describe('getPendingStatements', () => {
  let transactionMock

  beforeEach(() => {
    jest.clearAllMocks()

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
  })

  test('should call setStartProcessing with pending statements and transaction', async () => {
    const mockStatements = [{ outboxId: 1 }, { outboxId: 2 }]
    db.outbox.findAll.mockResolvedValue(mockStatements)

    await getPendingStatements()

    expect(setStartProcessing).toHaveBeenCalledWith(mockStatements, transactionMock)
  })

  test('should return pending statements', async () => {
    const mockStatements = [{ outboxId: 1 }]
    db.outbox.findAll.mockResolvedValue(mockStatements)

    const result = await getPendingStatements()

    expect(result).toEqual(mockStatements)
  })

  test('should rollback transaction when findAll throws', async () => {
    const error = new Error('findAll failed')
    db.outbox.findAll.mockRejectedValue(error)

    await expect(getPendingStatements()).rejects.toThrow('findAll failed')
  })
})
