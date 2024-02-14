const schema = require('../../../../app/messaging/schemas/address')
let mockAddress

describe('address schema', () => {
  beforeEach(() => {
    mockAddress = JSON.parse(JSON.stringify(require('../../../mocks/mock-statement').address))
  })
  test('validates success if all present', () => {
    const result = schema.validate(mockAddress)
    expect(result.error).toBeUndefined()
  })

  test('validates success if missing postcode', () => {
    delete mockAddress.postcode
    const result = schema.validate(mockAddress)
    expect(result.error).toBeUndefined()
  })

  test('validates success if empty postcode', () => {
    mockAddress.postcode = ''
    const result = schema.validate(mockAddress)
    expect(result.error).toBeUndefined()
  })

  test('validates success if missing line 1', () => {
    delete mockAddress.line1
    const result = schema.validate(mockAddress)
    expect(result.error).toBeUndefined()
  })

  test('validates success if empty line 1', () => {
    mockAddress.line1 = ''
    const result = schema.validate(mockAddress)
    expect(result.error).toBeUndefined()
  })

  test('validates success if missing line 2', () => {
    delete mockAddress.line2
    const result = schema.validate(mockAddress)
    expect(result.error).toBeUndefined()
  })

  test('validates success if empty line 2', () => {
    mockAddress.line2 = ''
    const result = schema.validate(mockAddress)
    expect(result.error).toBeUndefined()
  })

  test('validates success if missing line 3', () => {
    delete mockAddress.line3
    const result = schema.validate(mockAddress)
    expect(result.error).toBeUndefined()
  })

  test('validates success if empty line 3', () => {
    mockAddress.line3 = ''
    const result = schema.validate(mockAddress)
    expect(result.error).toBeUndefined()
  })

  test('validates success if missing line 4', () => {
    delete mockAddress.line4
    const result = schema.validate(mockAddress)
    expect(result.error).toBeUndefined()
  })

  test('validates success if empty line 4', () => {
    mockAddress.line4 = ''
    const result = schema.validate(mockAddress)
    expect(result.error).toBeUndefined()
  })

  test('validates success if missing line 5', () => {
    delete mockAddress.line5
    const result = schema.validate(mockAddress)
    expect(result.error).toBeUndefined()
  })

  test('validates success if empty line 5', () => {
    mockAddress.line5 = ''
    const result = schema.validate(mockAddress)
    expect(result.error).toBeUndefined()
  })
})
