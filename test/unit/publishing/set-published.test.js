const db = require('../../../app/data')
const { setPublished } = require('../../../app/publishing/set-published')

jest.mock('../../../app/data')

describe('set published timestamp post publishing', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should call db.outbox.update with correct arguments', async () => {
    const now = new Date()
    jest.spyOn(global, 'Date').mockImplementation(() => now)

    const outboxId = 123
    const sentToPublisher = true

    await setPublished(outboxId, sentToPublisher)

    expect(db.outbox.update).toHaveBeenCalledTimes(1)
    expect(db.outbox.update).toHaveBeenCalledWith(
      {
        published: now,
        sentToPublisher
      },
      {
        where: { outboxId }
      }
    )

    global.Date.mockRestore()
  })

  test('should call update with sentToPublisher = false correctly', async () => {
    const now = new Date()
    jest.spyOn(global, 'Date').mockImplementation(() => now)

    const outboxId = 456
    const sentToPublisher = false

    await setPublished(outboxId, sentToPublisher)

    expect(db.outbox.update).toHaveBeenCalledWith(
      {
        published: now,
        sentToPublisher
      },
      {
        where: { outboxId }
      }
    )

    global.Date.mockRestore()
  })

  test('should propagate errors from db.outbox.update', async () => {
    const error = new Error('Update failed')
    db.outbox.update.mockRejectedValue(error)

    await expect(setPublished(789, true)).rejects.toThrow('Update failed')
  })
})
