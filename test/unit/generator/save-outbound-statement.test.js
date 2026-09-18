const { createKnexMock } = require('../../helpers/mock-knex')

const mockDb = createKnexMock(['outbox'])

jest.mock('../../../app/data', () => ({
  client: mockDb.knex,
  transaction: mockDb.transaction,
  close: mockDb.close,
  ...mockDb.tables
}))

const { saveOutboundStatement } = require('../../../app/generator/save-outbound-statement')

describe('save outbound statement', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockDb.builder.resolves([1])
  })

  test('should insert generationId and type into outbox', async () => {
    await saveOutboundStatement(1, 'statement')

    expect(mockDb.tables.outbox).toHaveBeenCalledWith()
    expect(mockDb.builder.insert).toHaveBeenCalledTimes(1)
    expect(mockDb.builder.insert).toHaveBeenCalledWith({
      generationId: 1,
      type: 'statement'
    })
  })

  test('should propagate errors from the insert', async () => {
    mockDb.builder.rejects(new Error('Insert failed'))

    await expect(saveOutboundStatement(1, 'statement')).rejects.toThrow('Insert failed')
  })
})
