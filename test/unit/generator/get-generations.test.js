const { createKnexMock } = require('../../helpers/mock-knex')

const mockDb = createKnexMock(['generations'])

jest.mock('../../../app/database', () => ({
  client: mockDb.knex,
  transaction: mockDb.transaction,
  close: mockDb.close,
  ...mockDb.tables
}))

const getGenerations = require('../../../app/generator/get-generations')

describe('get generations', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should query generations by documentReference and return the first match', async () => {
    const generation = { generationId: 1, documentReference: 123 }
    mockDb.builder.resolves(generation)

    const result = await getGenerations(123)

    expect(mockDb.tables.generations).toHaveBeenCalledWith()
    expect(mockDb.builder.where).toHaveBeenCalledWith({ documentReference: 123 })
    expect(mockDb.builder.whereNotNull).toHaveBeenCalledWith('documentReference')
    expect(mockDb.builder.first).toHaveBeenCalledTimes(1)
    expect(result).toEqual(generation)
  })

  test('should return undefined when no generation is found', async () => {
    mockDb.builder.resolves(undefined)

    const result = await getGenerations(999)

    expect(result).toBeUndefined()
  })

  test('should propagate errors from the query', async () => {
    mockDb.builder.rejects(new Error('Query failed'))

    await expect(getGenerations(123)).rejects.toThrow('Query failed')
  })
})
