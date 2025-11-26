const schema = require('../../../../app/messaging/schemas/sbi')

describe('sbi schema', () => {
  const validSbis = [105000000, '105000000']
  const invalidSbis = [null, undefined, '', 100, 10000000000, '105000000a']

  test.each(validSbis)('validates success for sbi: %s', (sbi) => {
    const result = schema.validate(sbi)
    expect(result.error).toBeUndefined()
    if (typeof sbi === 'string') {
      expect(result.value).toBe(Number(sbi))
    } else {
      expect(result.value).toBe(sbi)
    }
  })

  test.each(invalidSbis)('validates failure for sbi: %s', (sbi) => {
    const result = schema.validate(sbi)
    expect(result.error).toBeDefined()
  })
})
