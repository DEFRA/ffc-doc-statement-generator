const { getPendingStatements } = require('../../../app/publishing/get-pending-statements')
const db = require('../../../app/data')

jest.mock('../../../app/data')

describe('getPendingStatements', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should call db.publishedStatement.findAll with correct parameters', async () => {
    await getPendingStatements()

    expect(db.publishedStatement.findAll).toHaveBeenCalledWith({
      where: {
        published: null
      }
    })
  })

  test('should return the result of db.publishedStatement.findAll', async () => {
    const mockStatements = [{ id: 1, title: 'Statement 1' }, { id: 2, title: 'Statement 2' }]
    db.publishedStatement.findAll.mockResolvedValue(mockStatements)

    const result = await getPendingStatements()

    expect(result).toEqual(mockStatements)
  })

  test('should handle errors thrown by db.publishedStatement.findAll', async () => {
    const mockError = new Error('Database error')
    db.publishedStatement.findAll.mockRejectedValue(mockError)

    await expect(getPendingStatements()).rejects.toThrow('Database error')
  })
})
