const schema = require('../../../../app/messaging/schemas/address')
let mockAddress

describe('addressSchema', () => {
  const addressFields = ['postcode', 'line1', 'line2', 'line3', 'line4', 'line5']

  beforeEach(() => {
    mockAddress = JSON.parse(JSON.stringify(require('../../../mocks/mock-delinked-statement').address))
  })

  test('validates success if all present', () => {
    const result = schema.validate(mockAddress)
    expect(result.error).toBeUndefined()
  })

  test.each(addressFields)('validates success if missing %s', (field) => {
    delete mockAddress[field]
    const result = schema.validate(mockAddress)
    expect(result.error).toBeUndefined()
  })

  test.each(addressFields)('validates success if empty %s', (field) => {
    mockAddress[field] = ''
    const result = schema.validate(mockAddress)
    expect(result.error).toBeUndefined()
  })
})
