const db = require('../../../app/data')
let noNotify

const getNoNotifyByAgreementNumber = require('../../../app/generator/get-no-notify-by-agreement-number')

describe('process get no-notify by agreementNumber object', () => {
  beforeAll(async () => {
    await db.sequelize.truncate({
      cascade: true,
      restartIdentity: true
    })
  })

  beforeEach(async () => {
    noNotify = JSON.parse(JSON.stringify(require('../../mocks/objects/mock-no-notify')))
    await db.noNotify.bulkCreate(noNotify)
  })

  afterEach(async () => {
    await db.sequelize.truncate({
      cascade: true,
      restartIdentity: true
    })
  })

  afterAll(async () => {
    await db.sequelize.close()
  })

  test('should return record with corresponding agreement number when claimId exists', async () => {
    const result = await getNoNotifyByAgreementNumber(noNotify[0].agreementNumber)
    expect(result.agreementNumber).toBe(noNotify[0].agreementNumber)
  })
})
