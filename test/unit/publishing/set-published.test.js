const { createKnexMock } = require('../../helpers/mock-knex')

const mockDb = createKnexMock(['outbox'])

jest.mock('../../../app/data', () => ({
  client: mockDb.knex,
  transaction: mockDb.transaction,
  close: mockDb.close,
  ...mockDb.tables
}))

const { setPublished } = require('../../../app/publishing/set-published')

describe('set published timestamp post publishing', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockDb.builder.resolves(1)
  })

  test('should update the matching outbox row', async () => {
    const now = new Date()
    jest.spyOn(global, 'Date').mockImplementation(() => now)

    const outboxId = 123
    const sentToPublisher = true

    await setPublished(outboxId, sentToPublisher)

    expect(mockDb.tables.outbox).toHaveBeenCalledWith()
    expect(mockDb.builder.where).toHaveBeenCalledWith({ outboxId })
    expect(mockDb.builder.update).toHaveBeenCalledTimes(1)
    expect(mockDb.builder.update).toHaveBeenCalledWith({
      published: now,
      sentToPublisher,
      sentToCRM: undefined,
      receiverLink: undefined
    })

    global.Date.mockRestore()
  })

  test('should update with sentToPublisher = false correctly', async () => {
    const now = new Date()
    jest.spyOn(global, 'Date').mockImplementation(() => now)

    await setPublished(456, false, true, 'a-link')

    expect(mockDb.builder.where).toHaveBeenCalledWith({ outboxId: 456 })
    expect(mockDb.builder.update).toHaveBeenCalledWith({
      published: now,
      sentToPublisher: false,
      sentToCRM: true,
      receiverLink: 'a-link'
    })

    global.Date.mockRestore()
  })

  test('should propagate errors from the update', async () => {
    mockDb.builder.rejects(new Error('Update failed'))

    await expect(setPublished(789, true)).rejects.toThrow('Update failed')
  })
})
