const { createKnexMock } = require('../../helpers/mock-knex')

const mockDb = createKnexMock(['generations', 'noNotifys', 'outbox'])

jest.mock('../../../app/database', () => ({
  client: mockDb.knex,
  transaction: mockDb.transaction,
  close: mockDb.close,
  ...mockDb.tables
}))

module.exports = mockDb
