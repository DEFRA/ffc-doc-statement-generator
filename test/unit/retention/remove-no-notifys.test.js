const db = require('../../../app/data')
const { removeNoNotifys } = require('../../../app/retention/remove-no-notifys')

jest.mock('../../../app/data', () => ({
  noNotify: {
    destroy: jest.fn()
  }
}))

describe('removeNoNotifys', () => {
  const agreementNumber = 'AGR-789'
  const frn = 123456
  const transaction = {}

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('calls db.noNotify.destroy with correct parameters', async () => {
    db.noNotify.destroy.mockResolvedValue(1)

    await removeNoNotifys(agreementNumber, frn, transaction)

    expect(db.noNotify.destroy).toHaveBeenCalledTimes(1)
    expect(db.noNotify.destroy).toHaveBeenCalledWith({
      where: { agreementNumber, frn },
      transaction
    })
  })

  test('propagates error when db.noNotify.destroy rejects', async () => {
    const error = new Error('DB error')
    db.noNotify.destroy.mockRejectedValue(error)

    await expect(removeNoNotifys(agreementNumber, frn, transaction)).rejects.toThrow('DB error')
  })
})
