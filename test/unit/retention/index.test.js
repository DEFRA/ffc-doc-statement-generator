const db = require('../../../app/data')
const { removeAgreementData } = require('../../../app/retention')
const { DELINKED } = require('../../../app/constants/scheme-ids')

jest.mock('../../../app/data', () => ({
  sequelize: {
    transaction: jest.fn()
  }
}))

jest.mock('../../../app/retention/remove-no-notifys', () => ({
  removeNoNotifys: jest.fn()
}))

jest.mock('../../../app/retention/find-generations', () => ({
  findGenerations: jest.fn()
}))

jest.mock('../../../app/retention/remove-outbox', () => ({
  removeOutbox: jest.fn()
}))

jest.mock('../../../app/retention/remove-generations', () => ({
  removeGenerations: jest.fn()
}))

const { removeNoNotifys } = require('../../../app/retention/remove-no-notifys')
const { findGenerations } = require('../../../app/retention/find-generations')
const { removeOutbox } = require('../../../app/retention/remove-outbox')
const { removeGenerations } = require('../../../app/retention/remove-generations')

describe('removeAgreementData', () => {
  const retentionDataDelinked = {
    simplifiedAgreementNumber: 'AGR-001',
    frn: 123456,
    schemeId: DELINKED
  }
  const retentionDataNotDelinked = {
    simplifiedAgreementNumber: 'AGR-002',
    frn: 654321,
    schemeId: 1
  }
  let transaction

  beforeEach(() => {
    jest.clearAllMocks()

    transaction = {
      commit: jest.fn().mockResolvedValue(),
      rollback: jest.fn().mockResolvedValue()
    }
    db.sequelize.transaction.mockResolvedValue(transaction)
  })

  test('commits and returns early if schemeId is not DELINKED', async () => {
    await removeAgreementData(retentionDataNotDelinked)

    expect(db.sequelize.transaction).toHaveBeenCalledTimes(1)
    expect(transaction.commit).toHaveBeenCalledTimes(1)
    expect(transaction.rollback).not.toHaveBeenCalled()
    expect(removeNoNotifys).not.toHaveBeenCalled()
    expect(findGenerations).not.toHaveBeenCalled()
    expect(removeOutbox).not.toHaveBeenCalled()
    expect(removeGenerations).not.toHaveBeenCalled()
  })

  test('commits and returns early if no generations found', async () => {
    findGenerations.mockResolvedValue([])

    await removeAgreementData(retentionDataDelinked)

    expect(db.sequelize.transaction).toHaveBeenCalledTimes(1)
    expect(removeNoNotifys).toHaveBeenCalledWith(
      retentionDataDelinked.simplifiedAgreementNumber,
      retentionDataDelinked.frn,
      transaction
    )
    expect(findGenerations).toHaveBeenCalledWith(
      retentionDataDelinked.simplifiedAgreementNumber,
      retentionDataDelinked.frn,
      transaction
    )
    expect(transaction.commit).toHaveBeenCalledTimes(1)
    expect(transaction.rollback).not.toHaveBeenCalled()
    expect(removeOutbox).not.toHaveBeenCalled()
    expect(removeGenerations).not.toHaveBeenCalled()
  })

  test('removes outbox and generations when generations found', async () => {
    const generations = [
      { generationId: 101 },
      { generationId: 102 }
    ]
    const generationIds = generations.map(g => g.generationId)

    findGenerations.mockResolvedValue(generations)
    removeNoNotifys.mockResolvedValue()
    removeOutbox.mockResolvedValue()
    removeGenerations.mockResolvedValue()

    await removeAgreementData(retentionDataDelinked)

    expect(db.sequelize.transaction).toHaveBeenCalledTimes(1)

    expect(removeNoNotifys).toHaveBeenCalledWith(
      retentionDataDelinked.simplifiedAgreementNumber,
      retentionDataDelinked.frn,
      transaction
    )

    expect(findGenerations).toHaveBeenCalledWith(
      retentionDataDelinked.simplifiedAgreementNumber,
      retentionDataDelinked.frn,
      transaction
    )

    expect(removeOutbox).toHaveBeenCalledWith(
      generationIds,
      transaction
    )

    expect(removeGenerations).toHaveBeenCalledWith(
      generationIds,
      transaction
    )

    expect(transaction.commit).toHaveBeenCalledTimes(1)
    expect(transaction.rollback).not.toHaveBeenCalled()
  })

  test('rolls back transaction and throws if an error occurs', async () => {
    const generations = [
      { generationId: 1 }
    ]
    findGenerations.mockResolvedValue(generations)
    removeNoNotifys.mockResolvedValue()
    removeOutbox.mockResolvedValue()

    const error = new Error('Failure in removeGenerations')
    removeGenerations.mockRejectedValue(error)

    await expect(removeAgreementData(retentionDataDelinked)).rejects.toThrow('Failure in removeGenerations')

    expect(transaction.rollback).toHaveBeenCalledTimes(1)
    expect(transaction.commit).not.toHaveBeenCalled()
  })
})
