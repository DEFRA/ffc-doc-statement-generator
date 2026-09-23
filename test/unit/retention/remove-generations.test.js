const { createKnexMock } = require('../../helpers/mock-knex')

const mockDb = createKnexMock(['generations'])

jest.mock('../../../app/database', () => ({
  client: mockDb.knex,
  transaction: mockDb.transaction,
  close: mockDb.close,
  ...mockDb.tables
}))

const { removeGenerations } = require('../../../app/retention/remove-generations')

describe('removeGenerations', () => {
  const generationIds = [101, 202, 303]
  const queryable = mockDb.trx

  beforeEach(() => {
    jest.clearAllMocks()
    mockDb.builder.resolves(3)
  })

  test('deletes the matching generations against the supplied queryable', async () => {
    await removeGenerations(queryable, generationIds)

    expect(mockDb.tables.generations).toHaveBeenCalledWith(queryable)
    expect(mockDb.builder.whereIn).toHaveBeenCalledWith('generationId', generationIds)
    expect(mockDb.builder.del).toHaveBeenCalledTimes(1)
  })

  test('propagates error when the delete rejects', async () => {
    mockDb.builder.rejects(new Error('DB error'))

    await expect(removeGenerations(queryable, generationIds)).rejects.toThrow('DB error')
  })
})
