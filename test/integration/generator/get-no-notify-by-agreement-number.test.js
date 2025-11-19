const db = require('../../../app/data')
const getNoNotifyByAgreementNumber = require('../../../app/publishing/get-no-notify-by-agreement-number')
const mockNoNotify = require('../../mocks/objects/mock-no-notify')

describe('getNoNotifyByAgreementNumber', () => {
  beforeAll(async () => {
    await db.sequelize.truncate({ cascade: true, restartIdentity: true })
  })

  beforeEach(async () => {
    await db.noNotify.bulkCreate(mockNoNotify)
  })

  afterEach(async () => {
    await db.sequelize.truncate({ cascade: true, restartIdentity: true })
  })

  afterAll(async () => {
    await db.sequelize.close()
  })

  test('returns record with matching agreement number when it exists', async () => {
    const target = mockNoNotify[0]
    const result = await getNoNotifyByAgreementNumber(target.agreementNumber)

    expect(result).not.toBeNull()
    expect(result.agreementNumber).toBe(target.agreementNumber)
  })

  test('returns null when agreement number does not exist', async () => {
    const result = await getNoNotifyByAgreementNumber('NON_EXISTENT_AGREEMENT')
    expect(result).toBeNull()
  })
})
