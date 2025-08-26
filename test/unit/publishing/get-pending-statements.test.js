const { getPendingStatements } = require('../../../app/publishing/get-pending-statements')
const db = require('../../../app/data')
const { setStartProcessing } = require('../../../app/publishing/set-start-processing')

jest.mock('../../../app/data')
jest.mock('../../../app/publishing/set-start-processing')

describe('getPendingStatements', () => {
  let transactionMock

  beforeEach(() => {
    jest.clearAllMocks()

    transactionMock = {
      commit: jest.fn().mockResolvedValue(),
      rollback: jest.fn().mockResolvedValue(),
      LOCK: {
        UPDATE: 'UPDATE'
      }
    }

    db.sequelize.transaction.mockResolvedValue(transactionMock)

    db.outbox.findAll.mockResolvedValue([])
  })

  test('should start a transaction with SERIALIZABLE isolation level', async () => {
    await getPendingStatements()

    expect(db.sequelize.transaction).toHaveBeenCalledWith({
      isolationLevel: expect.stringContaining('SERIALIZABLE')
    })
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

  test('should commit transaction on success and return pending statements', async () => {
    const mockStatements = [{ outboxId: 1 }]
    db.outbox.findAll.mockResolvedValue(mockStatements)

    const result = await getPendingStatements()

    expect(transactionMock.commit).toHaveBeenCalled()
    expect(transactionMock.rollback).not.toHaveBeenCalled()
    expect(result).toEqual(mockStatements)
  })

  test('should rollback transaction if error occurs and rethrow', async () => {
    const mockError = new Error('DB error')
    db.outbox.findAll.mockRejectedValue(mockError)

    await expect(getPendingStatements()).rejects.toThrow('DB error')

    expect(transactionMock.rollback).toHaveBeenCalled()
    expect(transactionMock.commit).not.toHaveBeenCalled()
  })
})
