const db = require('../../../app/data')
const { findGenerations } = require('../../../app/retention/find-generations')

jest.mock('../../../app/data', () => ({
  generation: {
    findAll: jest.fn()
  },
  sequelize: {
    Op: {
      and: 'and'
    },
    where: jest.fn(),
    json: jest.fn()
  }
}))

describe('findGenerations', () => {
  const agreementNumber = 'AGR-789'
  const frn = 123456
  const transaction = {}

  beforeEach(() => {
    jest.clearAllMocks()
    db.sequelize.where.mockImplementation((col, val) => ({ col, val }))
    db.sequelize.json.mockImplementation((path) => `json_path:${path}`)
  })

  test('calls db.generation.findAll with correct parameters', async () => {
    const mockResult = [
      { generationId: 101 },
      { generationId: 202 }
    ]
    db.generation.findAll.mockResolvedValue(mockResult)

    const result = await findGenerations(agreementNumber, frn, transaction)

    expect(db.sequelize.json).toHaveBeenCalledTimes(2)
    expect(db.sequelize.json).toHaveBeenCalledWith('statementData.applicationId')
    expect(db.sequelize.json).toHaveBeenCalledWith('statementData.frn')

    expect(db.sequelize.where).toHaveBeenCalledTimes(2)
    expect(db.sequelize.where).toHaveBeenCalledWith('json_path:statementData.applicationId', agreementNumber)
    expect(db.sequelize.where).toHaveBeenCalledWith('json_path:statementData.frn', frn)

    expect(db.generation.findAll).toHaveBeenCalledTimes(1)
    expect(db.generation.findAll).toHaveBeenCalledWith({
      attributes: ['generationId'],
      where: {
        [db.sequelize.Op.and]: [
          { col: 'json_path:statementData.applicationId', val: agreementNumber },
          { col: 'json_path:statementData.frn', val: frn }
        ]
      },
      transaction
    })
    expect(result).toBe(mockResult)
  })

  test('returns empty array when no records found', async () => {
    db.generation.findAll.mockResolvedValue([])

    const result = await findGenerations(agreementNumber, frn, transaction)

    expect(db.generation.findAll).toHaveBeenCalledTimes(1)
    expect(result).toEqual([])
  })

  test('propagates error when db.generation.findAll rejects', async () => {
    const error = new Error('DB error')
    db.generation.findAll.mockRejectedValue(error)

    await expect(findGenerations(agreementNumber, frn, transaction)).rejects.toThrow('DB error')
  })
})
