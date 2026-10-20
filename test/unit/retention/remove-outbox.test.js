const { createKnexMock } = require('../../helpers/mock-knex')

const mockDb = createKnexMock(['outbox'])

jest.mock('../../../app/database', () => ({
  client: mockDb.knex,
  transaction: mockDb.transaction,
  close: mockDb.close,
  ...mockDb.tables
}))

const { removeOutbox } = require('../../../app/retention/remove-outbox')

describe('removeOutbox', () => {
  const generationIds = [101, 202, 303]
  const queryable = mockDb.trx

  beforeEach(() => {
    jest.clearAllMocks()
    mockDb.builder.resolves(3)
  })

  test('deletes the matching outbox rows against the supplied queryable', async () => {
    await removeOutbox(queryable, generationIds)

    expect(mockDb.tables.outbox).toHaveBeenCalledWith(queryable)
    expect(mockDb.builder.whereIn).toHaveBeenCalledWith('generationId', generationIds)
    expect(mockDb.builder.del).toHaveBeenCalledTimes(1)
  })

  test('propagates error when the delete rejects', async () => {
    mockDb.builder.rejects(new Error('DB error'))

    await expect(removeOutbox(queryable, generationIds)).rejects.toThrow('DB error')
  })
})
