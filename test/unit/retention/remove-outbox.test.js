const db = require('../../../app/data')
const { removeOutbox } = require('../../../app/retention/remove-outbox')

jest.mock('../../../app/data', () => ({
  Sequelize: {
    Op: {
      in: 'in'
    }
  },
  outbox: {
    destroy: jest.fn()
  }
}))

describe('removeOutbox', () => {
  const generationIds = [101, 202, 303]
  const transaction = {}

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('calls db.outbox.destroy with correct parameters', async () => {
    db.outbox.destroy.mockResolvedValue(3)

    await removeOutbox(generationIds, transaction)

    expect(db.outbox.destroy).toHaveBeenCalledTimes(1)
    expect(db.outbox.destroy).toHaveBeenCalledWith({
      where: {
        generationId: {
          [db.Sequelize.Op.in]: generationIds
        }
      },
      transaction
    })
  })

  test('propagates error when db.outbox.destroy rejects', async () => {
    const error = new Error('DB error')
    db.outbox.destroy.mockRejectedValue(error)

    await expect(removeOutbox(generationIds, transaction)).rejects.toThrow('DB error')
  })
})
