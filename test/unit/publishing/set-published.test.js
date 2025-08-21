const db = require('../../../app/data')
const { setPublished } = require('../../../app/publishing/set-published')

jest.mock('../../../app/data')

describe('set published timestamp post publishing', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should call db.publishedStatement.update with correct arguments', async () => {
    const now = new Date()
    jest.spyOn(global, 'Date').mockImplementation(() => now)

    const publishedStatementId = 123
    const sentToNotify = true

    await setPublished(publishedStatementId, sentToNotify)

    expect(db.publishedStatement.update).toHaveBeenCalledTimes(1)
    expect(db.publishedStatement.update).toHaveBeenCalledWith(
      {
        published: now,
        sentToNotify
      },
      {
        where: { publishedStatementId }
      }
    )

    global.Date.mockRestore()
  })

  test('should call update with sentToNotify = false correctly', async () => {
    const now = new Date()
    jest.spyOn(global, 'Date').mockImplementation(() => now)

    const publishedStatementId = 456
    const sentToNotify = false

    await setPublished(publishedStatementId, sentToNotify)

    expect(db.publishedStatement.update).toHaveBeenCalledWith(
      {
        published: now,
        sentToNotify
      },
      {
        where: { publishedStatementId }
      }
    )

    global.Date.mockRestore()
  })

  test('should propagate errors from db.publishedStatement.update', async () => {
    const error = new Error('Update failed')
    db.publishedStatement.update.mockRejectedValue(error)

    await expect(setPublished(789, true)).rejects.toThrow('Update failed')
  })
})
