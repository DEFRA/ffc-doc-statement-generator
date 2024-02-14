const schema = require('../../../../app/messaging/schemas/funding')
let mockFunding

describe('payment schema', () => {
  beforeEach(() => {
    mockFunding = JSON.parse(JSON.stringify(require('../../../mocks/mock-statement').funding[2]))
  })
  test('validates success if all present', () => {
    const result = schema.validate(mockFunding)
    expect(result.error).toBeUndefined()
  })

  test('validates fail if missing name', () => {
    delete mockFunding.name
    const result = schema.validate(mockFunding)
    expect(result.error).toBeDefined()
  })

  test('validates fail if empty name', () => {
    mockFunding.name = ''
    const result = schema.validate(mockFunding)
    expect(result.error).toBeDefined()
  })

  test('validates success if missing level', () => {
    delete mockFunding.level
    const result = schema.validate(mockFunding)
    expect(result.error).toBeUndefined()
  })

  test('validates success if empty level', () => {
    mockFunding.level = ''
    const result = schema.validate(mockFunding)
    expect(result.error).toBeUndefined()
  })

  test('validates success if missing area', () => {
    delete mockFunding.area
    const result = schema.validate(mockFunding)
    expect(result.error).toBeUndefined()
  })

  test('validates success if empty area', () => {
    mockFunding.area = ''
    const result = schema.validate(mockFunding)
    expect(result.error).toBeUndefined()
  })

  test('validates success if missing rate', () => {
    delete mockFunding.rate
    const result = schema.validate(mockFunding)
    expect(result.error).toBeUndefined()
  })

  test('validates success if empty rate', () => {
    mockFunding.rate = ''
    const result = schema.validate(mockFunding)
    expect(result.error).toBeUndefined()
  })

  test('validates fail if missing annual value', () => {
    delete mockFunding.annualValue
    const result = schema.validate(mockFunding)
    expect(result.error).toBeDefined()
  })

  test('validates fail if empty annual value', () => {
    mockFunding.annualValue = ''
    const result = schema.validate(mockFunding)
    expect(result.error).toBeDefined()
  })

  test('validates fail if missing quarterly value', () => {
    delete mockFunding.quarterlyValue
    const result = schema.validate(mockFunding)
    expect(result.error).toBeDefined()
  })

  test('validates fail if empty quarterly value', () => {
    mockFunding.quarterlyValue = ''
    const result = schema.validate(mockFunding)
    expect(result.error).toBeDefined()
  })

  test('validates fail if missing quarterly reduction', () => {
    delete mockFunding.quarterlyReduction
    const result = schema.validate(mockFunding)
    expect(result.error).toBeDefined()
  })

  test('validates fail if empty quarterly reduction', () => {
    mockFunding.quarterlyReduction = ''
    const result = schema.validate(mockFunding)
    expect(result.error).toBeDefined()
  })

  test('validates fail if missing quarterly payment', () => {
    delete mockFunding.quarterlyPayment
    const result = schema.validate(mockFunding)
    expect(result.error).toBeDefined()
  })

  test('validates fail if empty quarterly payment', () => {
    mockFunding.quarterlyPayment = ''
    const result = schema.validate(mockFunding)
    expect(result.error).toBeDefined()
  })

  test('validates success if missing reductions', () => {
    delete mockFunding.reductions
    const result = schema.validate(mockFunding)
    expect(result.error).toBeUndefined()
  })

  test('validates success if empty reductions', () => {
    mockFunding.reductions = []
    const result = schema.validate(mockFunding)
    expect(result.error).toBeUndefined()
  })

  test('validates fail if reductions object', () => {
    mockFunding.reductions = {}
    const result = schema.validate(mockFunding)
    expect(result.error).toBeDefined()
  })

  test('validates fail if reductions string', () => {
    mockFunding.reductions = 'reductions'
    const result = schema.validate(mockFunding)
    expect(result.error).toBeDefined()
  })

  test('validates fail if reductions empty string', () => {
    mockFunding.reductions = ''
    const result = schema.validate(mockFunding)
    expect(result.error).toBeDefined()
  })

  test('validates fail if reductions true', () => {
    mockFunding.reductions = true
    const result = schema.validate(mockFunding)
    expect(result.error).toBeDefined()
  })

  test('validates fail if reductions false', () => {
    mockFunding.reductions = false
    const result = schema.validate(mockFunding)
    expect(result.error).toBeDefined()
  })

  test('validates fail if reductions 0', () => {
    mockFunding.reductions = 0
    const result = schema.validate(mockFunding)
    expect(result.error).toBeDefined()
  })

  test('validates fail if reductions 1', () => {
    mockFunding.reductions = 1
    const result = schema.validate(mockFunding)
    expect(result.error).toBeDefined()
  })

  test('validates fail if reduction missing reason', () => {
    delete mockFunding.reductions[0].reason
    const result = schema.validate(mockFunding)
    expect(result.error).toBeDefined()
  })

  test('validates fail if reduction empty reason', () => {
    mockFunding.reductions[0].reason = ''
    const result = schema.validate(mockFunding)
    expect(result.error).toBeDefined()
  })

  test('validates fail if reduction missing value', () => {
    delete mockFunding.reductions[0].value
    const result = schema.validate(mockFunding)
    expect(result.error).toBeDefined()
  })

  test('validates fail if reduction empty value', () => {
    mockFunding.reductions[0].value = ''
    const result = schema.validate(mockFunding)
    expect(result.error).toBeDefined()
  })
})
