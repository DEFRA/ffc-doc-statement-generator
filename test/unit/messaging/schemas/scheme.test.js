const schema = require('../../../../app/messaging/schemas/scheme')
let mockScheme

describe('scheme schema', () => {
  beforeEach(() => {
    mockScheme = JSON.parse(JSON.stringify(require('../../../mocks/mock-statement').scheme))
  })

  test('validates success if all present', () => {
    const result = schema.validate(mockScheme)
    expect(result.error).toBeUndefined()
  })

  test('validates fail if missing name', () => {
    delete mockScheme.name
    const result = schema.validate(mockScheme)
    expect(result.error).toBeDefined()
  })

  test('validates fail if empty name', () => {
    mockScheme.name = ''
    const result = schema.validate(mockScheme)
    expect(result.error).toBeDefined()
  })

  test('validates fail if missing short name', () => {
    delete mockScheme.shortName
    const result = schema.validate(mockScheme)
    expect(result.error).toBeDefined()
  })

  test('validates fail if empty short name', () => {
    mockScheme.shortName = ''
    const result = schema.validate(mockScheme)
    expect(result.error).toBeDefined()
  })

  test('validates fail if missing year', () => {
    delete mockScheme.year
    const result = schema.validate(mockScheme)
    expect(result.error).toBeDefined()
  })

  test('validates fail if empty year', () => {
    mockScheme.year = ''
    const result = schema.validate(mockScheme)
    expect(result.error).toBeDefined()
  })

  test('validates fail if missing frequency', () => {
    delete mockScheme.frequency
    const result = schema.validate(mockScheme)
    expect(result.error).toBeDefined()
  })

  test('validates fail if empty frequency', () => {
    mockScheme.frequency = ''
    const result = schema.validate(mockScheme)
    expect(result.error).toBeDefined()
  })
})
