const { createKnexMock } = require('../../helpers/mock-knex')
const { DELINKED } = require('../../../app/constants/scheme-ids')

const mockDb = createKnexMock()

jest.mock('../../../app/database', () => ({
  client: mockDb.knex,
  transaction: mockDb.transaction,
  close: mockDb.close
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

jest.mock('../../../app/messaging/publish/send-retention-messages', () => jest.fn())

const { removeAgreementData } = require('../../../app/retention')
const { removeNoNotifys } = require('../../../app/retention/remove-no-notifys')
const { findGenerations } = require('../../../app/retention/find-generations')
const { removeOutbox } = require('../../../app/retention/remove-outbox')
const { removeGenerations } = require('../../../app/retention/remove-generations')
const sendRetentionMessages = require('../../../app/messaging/publish/send-retention-messages')

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

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('returns without opening a transaction if schemeId is not DELINKED', async () => {
    await removeAgreementData(retentionDataNotDelinked)

    expect(mockDb.transaction).not.toHaveBeenCalled()
    expect(removeNoNotifys).not.toHaveBeenCalled()
    expect(findGenerations).not.toHaveBeenCalled()
    expect(removeOutbox).not.toHaveBeenCalled()
    expect(removeGenerations).not.toHaveBeenCalled()
    expect(sendRetentionMessages).not.toHaveBeenCalled()
  })

  test('returns early if no generations found', async () => {
    findGenerations.mockResolvedValue([])

    await removeAgreementData(retentionDataDelinked)

    expect(mockDb.transaction).toHaveBeenCalledTimes(1)
    expect(removeNoNotifys).toHaveBeenCalledWith(
      mockDb.trx,
      retentionDataDelinked.simplifiedAgreementNumber,
      retentionDataDelinked.frn
    )
    expect(findGenerations).toHaveBeenCalledWith(
      mockDb.trx,
      retentionDataDelinked.simplifiedAgreementNumber,
      retentionDataDelinked.frn
    )
    expect(removeOutbox).not.toHaveBeenCalled()
    expect(removeGenerations).not.toHaveBeenCalled()
    expect(sendRetentionMessages).not.toHaveBeenCalled()
  })

  test('removes outbox, generations and sends retention messages when generations found', async () => {
    const generations = [
      { generationId: 101 },
      { generationId: 102 }
    ]
    const generationIds = generations.map(g => g.generationId)

    findGenerations.mockResolvedValue(generations)
    removeNoNotifys.mockResolvedValue()
    removeOutbox.mockResolvedValue()
    removeGenerations.mockResolvedValue()
    sendRetentionMessages.mockResolvedValue()

    await removeAgreementData(retentionDataDelinked)

    expect(mockDb.transaction).toHaveBeenCalledTimes(1)
    expect(removeOutbox).toHaveBeenCalledWith(mockDb.trx, generationIds)
    expect(removeGenerations).toHaveBeenCalledWith(mockDb.trx, generationIds)
    expect(sendRetentionMessages).toHaveBeenCalledTimes(1)
    expect(sendRetentionMessages).toHaveBeenCalledWith(generations)
  })

  // Every step runs against the transaction queryable, so nothing escapes the
  // rollback. The rollback itself is Knex's job and is covered against a real
  // database rather than mocked here.
  test('runs every step against the transaction', async () => {
    findGenerations.mockResolvedValue([{ generationId: 1 }])

    await removeAgreementData(retentionDataDelinked)

    for (const step of [removeNoNotifys, findGenerations, removeOutbox, removeGenerations]) {
      expect(step.mock.calls[0][0]).toBe(mockDb.trx)
    }
  })

  test('propagates the error and does not send retention messages if a step fails', async () => {
    findGenerations.mockResolvedValue([{ generationId: 1 }])
    removeNoNotifys.mockResolvedValue()
    removeOutbox.mockResolvedValue()
    removeGenerations.mockRejectedValue(new Error('Failure in removeGenerations'))

    await expect(removeAgreementData(retentionDataDelinked)).rejects.toThrow('Failure in removeGenerations')

    expect(sendRetentionMessages).not.toHaveBeenCalled()
  })
})
