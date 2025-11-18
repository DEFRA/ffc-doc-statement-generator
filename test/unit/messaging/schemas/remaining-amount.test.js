const { topUpRemainingAmount: REMAINING_AMOUNT } = require('../../../mocks/components/remaining-amount')
const schema = require('../../../../app/messaging/schemas/remaining-amount')

describe('remaining amount schema', () => {
  const validAmounts = [REMAINING_AMOUNT, String(REMAINING_AMOUNT)]
  const invalidAmounts = [null, undefined, '', '400a', {}, [], 'a']

  test.each(validAmounts)('validates success for remainingAmount: %s', (amount) => {
    const result = schema.validate(amount)
    expect(result.error).toBeUndefined()
    if (typeof amount === 'string') {
      expect(result.value).toBe(Number(amount))
    } else {
      expect(result.value).toBe(amount)
    }
  })

  test.each(invalidAmounts)('validates failure for remainingAmount: %s', (amount) => {
    const result = schema.validate(amount)
    expect(result.error).toBeDefined()
    expect(result.error).toBeInstanceOf(Error)
    const details = result.error.details[0]
    expect(details).toHaveProperty('type')
    expect(details).toHaveProperty('message')
    if (amount === undefined) {
      expect(details.type).toBe('any.required')
    } else {
      expect(details.type).toBe('number.base')
      expect(details.message).toBe('The remaining amount must be a number.')
    }
  })
})
