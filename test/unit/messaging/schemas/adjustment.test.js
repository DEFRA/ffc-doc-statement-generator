const schema = require('../../../../app/messaging/schemas/adjustment')

let mockAdjustment

describe('adjustment schema', () => {
  beforeEach(() => {
    mockAdjustment = JSON.parse(JSON.stringify(require('../../../mocks/objects/adjustment').topUpAdjustment))
  })

  test('validates success if all present', () => {
    const result = schema.validate(mockAdjustment)
    expect(result.error).toBeUndefined()
  })

  test('validates fail if missing current value', () => {
    delete mockAdjustment.currentValue
    const result = schema.validate(mockAdjustment)
    expect(result.error).toBeDefined()
  })

  test('validates fail if missing new value', () => {
    delete mockAdjustment.newValue
    const result = schema.validate(mockAdjustment)
    expect(result.error).toBeDefined()
  })

  test('validates fail if missing adjustment value', () => {
    delete mockAdjustment.adjustmentValue
    const result = schema.validate(mockAdjustment)
    expect(result.error).toBeDefined()
  })
})
