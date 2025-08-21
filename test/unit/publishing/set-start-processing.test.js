const db = require('../../../app/data')
const { setStartProcessing } = require('../../../app/publishing/set-start-processing')

jest.mock('../../../app/data')

describe('set start processing date stamp', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should call db.publishedStatement.update with correct arguments', async () => {
    const now = new Date()
    jest.spyOn(global, 'Date').mockImplementation(() => now)

    const pendingStatements = [
      { publishedStatementId: 1 },
      { publishedStatementId: 2 },
      { publishedStatementId: 3 }
    ]

    const transactionMock = { id: 'transaction-object' }

    await setStartProcessing(pendingStatements, transactionMock)

    expect(db.publishedStatement.update).toHaveBeenCalledTimes(1)
    expect(db.publishedStatement.update).toHaveBeenCalledWith(
      { startProcessing: now },
      {
        where: {
          publishedStatementId: {
            [db.Sequelize.Op.in]: [1, 2, 3]
          }
        },
        transaction: transactionMock
      }
    )

    global.Date.mockRestore()
  })

  test('should call update with empty array if no pendingStatements', async () => {
    const transactionMock = {}

    await setStartProcessing([], transactionMock)

    expect(db.publishedStatement.update).toHaveBeenCalledWith(
      expect.any(Object),
      expect.objectContaining({
        where: {
          publishedStatementId: {
            [db.Sequelize.Op.in]: []
          }
        },
        transaction: transactionMock
      })
    )
  })

  test('should propagate errors from db.publishedStatement.update', async () => {
    const error = new Error('Update failed')
    db.publishedStatement.update.mockRejectedValue(error)

    const pendingStatements = [{ publishedStatementId: 1 }]
    const transactionMock = {}

    await expect(setStartProcessing(pendingStatements, transactionMock)).rejects.toThrow('Update failed')
  })
})
