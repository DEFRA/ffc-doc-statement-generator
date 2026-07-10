const { getPendingStatements } = require('../../../app/publishing/get-pending-statements')
const db = require('../../../app/data')
const { setStartProcessing } = require('../../../app/publishing/set-start-processing')

jest.mock('../../../app/data')
jest.mock('../../../app/publishing/set-start-processing')

describe('getPendingStatements', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    db.outbox.findAll.mockResolvedValue([])
  })

  test('should call findAll with correct parameters including transaction and lock', async () => {
    await getPendingStatements()

    expect(db.outbox.findAll).toHaveBeenCalledWith(expect.objectContaining({
      lock: true
    }))
  })

  test('should call setStartProcessing with pending statements and transaction', async () => {
    const mockStatements = [{ outboxId: 1 }, { outboxId: 2 }]
    db.outbox.findAll.mockResolvedValue(mockStatements)

    await getPendingStatements()

    expect(setStartProcessing).toHaveBeenCalledWith(mockStatements)
  })

  test('should commit transaction on success and return pending statements', async () => {
    const mockStatements = [{ outboxId: 1 }]
    db.outbox.findAll.mockResolvedValue(mockStatements)

    const result = await getPendingStatements()

    expect(result).toEqual(mockStatements)
  })
})
