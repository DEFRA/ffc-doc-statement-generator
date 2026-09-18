const { createKnexMock } = require('../../helpers/mock-knex')

const mockDb = createKnexMock(['generations'])

jest.mock('../../../app/data', () => ({
  client: mockDb.knex,
  transaction: mockDb.transaction,
  close: mockDb.close,
  ...mockDb.tables
}))

const { findGenerations } = require('../../../app/retention/find-generations')

describe('findGenerations', () => {
  const agreementNumber = 'AGR-789'
  const frn = 123456
  const queryable = mockDb.trx

  beforeEach(() => {
    jest.clearAllMocks()
    mockDb.builder.resolves([])
  })

  test('selects the retention columns against the supplied queryable', async () => {
    await findGenerations(queryable, agreementNumber, frn)

    expect(mockDb.tables.generations).toHaveBeenCalledWith(queryable)
    expect(mockDb.builder.select).toHaveBeenCalledWith('generationId', 'documentReference', 'filename')
  })

  // #>> yields text, so both operands must be bound as text. The Sequelize
  // version inlined frn as a bare number, which PostgreSQL rejects.
  test('matches the JSON fields as text', async () => {
    await findGenerations(queryable, agreementNumber, frn)

    expect(mockDb.builder.whereRaw).toHaveBeenCalledWith(
      '"statementData" #>> \'{applicationId}\' = ?',
      ['AGR-789']
    )
    expect(mockDb.builder.whereRaw).toHaveBeenCalledWith(
      '"statementData" #>> \'{frn}\' = ?',
      ['123456']
    )
  })

  test('returns the matching generations', async () => {
    const mockResult = [{ generationId: 101 }, { generationId: 202 }]
    mockDb.builder.resolves(mockResult)

    await expect(findGenerations(queryable, agreementNumber, frn)).resolves.toBe(mockResult)
  })

  test('returns empty array when no records found', async () => {
    await expect(findGenerations(queryable, agreementNumber, frn)).resolves.toEqual([])
  })

  test('propagates error when the query rejects', async () => {
    mockDb.builder.rejects(new Error('DB error'))

    await expect(findGenerations(queryable, agreementNumber, frn)).rejects.toThrow('DB error')
  })
})
