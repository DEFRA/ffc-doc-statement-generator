const { createKnexMock } = require('../../helpers/mock-knex')

const mockDb = createKnexMock(['generations'])

jest.mock('../../../app/database', () => ({
  client: mockDb.knex,
  transaction: mockDb.transaction,
  close: mockDb.close,
  ...mockDb.tables
}))

const getGenerationById = require('../../../app/publishing/get-generation-by-id')

describe('get generation by id', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should query generations by generationId and return the first match', async () => {
    const generation = { generationId: 1, filename: 'statement.pdf' }
    mockDb.builder.resolves(generation)

    const result = await getGenerationById(1)

    expect(mockDb.tables.generations).toHaveBeenCalledWith()
    expect(mockDb.builder.where).toHaveBeenCalledWith({ generationId: 1 })
    expect(mockDb.builder.first).toHaveBeenCalledTimes(1)
    expect(result).toEqual(generation)
  })

  test('should return null when no generation is found', async () => {
    mockDb.builder.resolves(undefined)

    const result = await getGenerationById(999)

    expect(result).toBeNull()
  })

  test('should propagate errors from the query', async () => {
    mockDb.builder.rejects(new Error('Query failed'))

    await expect(getGenerationById(1)).rejects.toThrow('Query failed')
  })
})
