const db = require('../../../app/data')
const { removeGenerations } = require('../../../app/retention/remove-generations')

jest.mock('../../../app/data', () => ({
  Sequelize: {
    Op: {
      in: 'in'
    }
  },
  generation: {
    destroy: jest.fn()
  }
}))

describe('removeGenerations', () => {
  const generationIds = [101, 202, 303]
  const transaction = {}

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('calls db.generation.destroy with correct parameters', async () => {
    db.generation.destroy.mockResolvedValue(3)

    await removeGenerations(generationIds, transaction)

    expect(db.generation.destroy).toHaveBeenCalledTimes(1)
    expect(db.generation.destroy).toHaveBeenCalledWith({
      where: {
        generationId: {
          [db.Sequelize.Op.in]: generationIds
        }
      },
      transaction
    })
  })

  test('propagates error when db.generation.destroy rejects', async () => {
    const error = new Error('DB error')
    db.generation.destroy.mockRejectedValue(error)

    await expect(removeGenerations(generationIds, transaction)).rejects.toThrow('DB error')
  })
})
