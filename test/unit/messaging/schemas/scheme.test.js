const schema = require('../../../../app/messaging/schemas/scheme')
let mockScheme

describe('scheme schema', () => {
  beforeEach(() => {
    mockScheme = JSON.parse(JSON.stringify(require('../../../mocks/mock-statement-sfi23-quarterly').scheme))
  })

  test('validates success if all present', () => {
    const result = schema.validate(mockScheme)
    expect(result.error).toBeUndefined()
  })

  const requiredFields = ['name', 'shortName', 'year', 'frequency']

  test.each(requiredFields)('validates fail if %s is missing', (field) => {
    delete mockScheme[field]
    const result = schema.validate(mockScheme)
    expect(result.error).toBeDefined()
  })

  test.each(requiredFields)('validates fail if %s is empty', (field) => {
    mockScheme[field] = ''
    const result = schema.validate(mockScheme)
    expect(result.error).toBeDefined()
  })
})
