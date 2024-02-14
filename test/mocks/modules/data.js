const mockCommit = jest.fn()
const mockRollback = jest.fn()

const mockTransaction = jest.fn().mockImplementation(() => {
  return {
    commit: mockCommit,
    rollback: mockRollback
  }
})

const mockSequelize = {
  transaction: mockTransaction
}

const mockCreate = jest.fn()

const mockGeneration = {
  create: mockCreate
}

jest.mock('../../../app/data', () => {
  return {
    sequelize: mockSequelize,
    generation: mockGeneration
  }
})

module.exports = {
  mockTransaction,
  mockGeneration
}
