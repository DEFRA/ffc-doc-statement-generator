const db = require('../../../app/data')
const { setStartProcessing } = require('../../../app/publishing/set-start-processing')

jest.mock('../../../app/data')

describe('set start processing date stamp', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should call db.outbox.update with correct arguments', async () => {
    const now = new Date()
    jest.spyOn(global, 'Date').mockImplementation(() => now)

    const pendingStatements = [
      { outboxId: 1 },
      { outboxId: 2 },
      { outboxId: 3 }
    ]

    await setStartProcessing(pendingStatements)

    expect(db.outbox.update).toHaveBeenCalledTimes(1)
    expect(db.outbox.update).toHaveBeenCalledWith(
      { startProcessing: now },
      {
        where: {
          outboxId: {
            [db.Sequelize.Op.in]: [1, 2, 3]
          }
        }
      }
    )

    global.Date.mockRestore()
  })

  test('should call update with empty array if no pendingStatements', async () => {
    await setStartProcessing([])

    expect(db.outbox.update).toHaveBeenCalledWith(
      expect.any(Object),
      expect.objectContaining({
        where: {
          outboxId: {
            [db.Sequelize.Op.in]: []
          }
        }
      })
    )
  })

  test('should propagate errors from db.outbox.update', async () => {
    const error = new Error('Update failed')
    db.outbox.update.mockRejectedValue(error)

    const pendingStatements = [{ outboxId: 1 }]
    const transactionMock = {}

    await expect(setStartProcessing(pendingStatements, transactionMock)).rejects.toThrow('Update failed')
  })
})
