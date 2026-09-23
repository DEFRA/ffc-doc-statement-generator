const { createKnexMock } = require('../../helpers/mock-knex')

const mockDb = createKnexMock(['outbox'])

jest.mock('../../../app/database', () => ({
  client: mockDb.knex,
  transaction: mockDb.transaction,
  close: mockDb.close,
  ...mockDb.tables
}))

const { setStartProcessing } = require('../../../app/publishing/set-start-processing')

describe('set start processing date stamp', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockDb.builder.resolves(0)
  })

  test('should stamp every pending outbox id', async () => {
    const now = new Date()
    jest.spyOn(global, 'Date').mockImplementation(() => now)

    await setStartProcessing([{ outboxId: 1 }, { outboxId: 2 }, { outboxId: 3 }])

    expect(mockDb.tables.outbox).toHaveBeenCalledWith()
    expect(mockDb.builder.whereIn).toHaveBeenCalledWith('outboxId', [1, 2, 3])
    expect(mockDb.builder.update).toHaveBeenCalledTimes(1)
    expect(mockDb.builder.update).toHaveBeenCalledWith({ startProcessing: now })

    global.Date.mockRestore()
  })

  test('should pass an empty array if there are no pending statements', async () => {
    await setStartProcessing([])

    expect(mockDb.builder.whereIn).toHaveBeenCalledWith('outboxId', [])
  })

  test('should propagate errors from the update', async () => {
    mockDb.builder.rejects(new Error('Update failed'))

    await expect(setStartProcessing([{ outboxId: 1 }])).rejects.toThrow('Update failed')
  })
})
