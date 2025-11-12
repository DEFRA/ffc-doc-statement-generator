const schema = require('../../../../app/messaging/schemas/adjustment')

let mockAdjustment

describe('adjustmentSchema', () => {
  const requiredFields = ['currentValue', 'newValue', 'adjustmentValue']

  beforeEach(() => {
    mockAdjustment = JSON.parse(JSON.stringify(require('../../../mocks/objects/adjustment').topUpAdjustment))
  })

  test('validates success if all present', () => {
    const result = schema.validate(mockAdjustment)
    expect(result.error).toBeUndefined()
  })

  test.each(requiredFields)('validates fail if missing %s', (field) => {
    delete mockAdjustment[field]
    const result = schema.validate(mockAdjustment)
    expect(result.error).toBeDefined()
  })
})
