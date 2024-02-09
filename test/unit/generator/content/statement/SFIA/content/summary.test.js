const advanceSummary = require('../../../../../../../app/generator/content/statement/SFIA/content/advance-summary')

describe('advanceSummary', () => {
  const document = {
    sbi: '12345678',
    businessName: 'Example Business',
    scheme: {
      agreementNumber: 'ABC123'
    }
  }

  test('should return the correct summary object', () => {
    const result = advanceSummary(document)

    expect(result.stack).toHaveLength(7)
    expect(result.stack[4]).toHaveProperty('text', 'Our ref: SFI 23 Accelerated payment v1.0')
    expect(result.stack[6]).toHaveProperty('text', 'Dear Sir / Madam')
  })
})
