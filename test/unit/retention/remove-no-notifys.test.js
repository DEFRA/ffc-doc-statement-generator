const { createKnexMock } = require('../../helpers/mock-knex')

const mockDb = createKnexMock(['noNotifys'])

jest.mock('../../../app/data', () => ({
  client: mockDb.knex,
  transaction: mockDb.transaction,
  close: mockDb.close,
  ...mockDb.tables
}))

const { removeNoNotifys } = require('../../../app/retention/remove-no-notifys')

describe('removeNoNotifys', () => {
  const agreementNumber = 'AGR-789'
  const frn = 123456
  const queryable = mockDb.trx

  beforeEach(() => {
    jest.clearAllMocks()
    mockDb.builder.resolves(1)
  })

  test('deletes the matching exclusions against the supplied queryable', async () => {
    await removeNoNotifys(queryable, agreementNumber, frn)

    expect(mockDb.tables.noNotifys).toHaveBeenCalledWith(queryable)
    expect(mockDb.builder.where).toHaveBeenCalledWith({ agreementNumber, frn })
    expect(mockDb.builder.del).toHaveBeenCalledTimes(1)
  })

  test('propagates error when the delete rejects', async () => {
    mockDb.builder.rejects(new Error('DB error'))

    await expect(removeNoNotifys(queryable, agreementNumber, frn)).rejects.toThrow('DB error')
  })
})
