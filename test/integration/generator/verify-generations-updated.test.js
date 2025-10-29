const db = require('../../../app/data')

describe('Liquibase migration populates columns from statementData', () => {
  let inserted

  beforeAll(async () => {
    inserted = await db.generation.findOne({
      where: {
        statementData: {
          [db.Sequelize.Op.ne]: null
        }
      }
    })

    // Sanitize BigInt fields for safe test usage
    if (inserted) {
      inserted = {
        ...inserted.toJSON(),
        frn: inserted.frn?.toString()
      }
    }
  })

  afterAll(async () => {
    await db.sequelize.close()
  })

  test('should populate businessName from statementData', () => {
    expect(inserted.businessName).toBe(inserted.statementData.businessName)
  })

  test('should populate frn and sbi from statementData', () => {
    expect(inserted.frn).toBe(inserted.statementData.frn.toString())
    expect(inserted.sbi).toBe(parseInt(inserted.statementData.sbi))
  })

  test('should populate address fields from statementData', () => {
    expect(inserted.addressLine1).toBe(inserted.statementData.addressLine1)
  })

  test('should populate scheme fields from statementData', () => {
    expect(inserted.schemeName).toBe(inserted.statementData.schemeName)
    expect(inserted.schemeShortName).toBe(inserted.statementData.schemeShortName)
    expect(inserted.schemeYear).toBe(inserted.statementData.schemeYear)
    expect(inserted.schemeFrequency).toBe(inserted.statementData.schemeFrequency)
  })

  test('should populate email and postcode from statementData', () => {
    expect(inserted.email).toBe(inserted.statementData.email)
    expect(inserted.postcode).toBe(inserted.statementData.postcode)
  })
})
