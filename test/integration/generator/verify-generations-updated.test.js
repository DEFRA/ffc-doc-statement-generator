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

  test('should populate address fields from statementData.address', () => {
    expect(inserted.addressLine1).toBe(inserted.statementData.address.line1)
    expect(inserted.addressLine2).toBe(inserted.statementData.address.line2)
    expect(inserted.addressLine3).toBe(inserted.statementData.address.line3)
    expect(inserted.addressLine4).toBe(inserted.statementData.address.line4)
    expect(inserted.addressLine5).toBe(inserted.statementData.address.line5)
    expect(inserted.postcode).toBe(inserted.statementData.address.postcode)
  })

  test('should populate scheme fields from statementData.scheme', () => {
    expect(inserted.schemeName).toBe(inserted.statementData.scheme.name)
    expect(inserted.schemeShortName).toBe(inserted.statementData.scheme.shortName)
    expect(inserted.schemeYear).toBe(inserted.statementData.scheme.year)
    expect(inserted.schemeFrequency).toBe(inserted.statementData.scheme.frequency)
  })

  test('should populate email from statementData', () => {
    expect(inserted.email).toBe(inserted.statementData.email)
  })
})
