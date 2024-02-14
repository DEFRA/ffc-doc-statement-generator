const summary = require('../../../../../../app/generator/content/summary')
const mockStatement = require('../../../../../mocks/mock-statement')

describe('generate summary', () => {
  test('includes address', () => {
    const result = summary(mockStatement)
    expect(result.stack[1].text).toMatch('Mr A Farmer\nA Farm\nNear a field\nNewcastle Upon Tyne\nTyne & Wear\nNE1 1AA')
  })

  test('includes SBI title', () => {
    const result = summary(mockStatement)
    expect(result.stack[2].columns[0].text).toBe('Single Business Identifier (SBI):')
  })

  test('includes SBI', () => {
    const result = summary(mockStatement)
    expect(result.stack[2].columns[1].text).toBe(123456789)
  })

  test('includes business name title', () => {
    const result = summary(mockStatement)
    expect(result.stack[3].columns[0].text).toBe('Business name:')
  })

  test('includes business name', () => {
    const result = summary(mockStatement)
    expect(result.stack[3].columns[1].text).toBe('Mr A Farmer')
  })

  test('includes agreement number title', () => {
    const result = summary(mockStatement)
    expect(result.stack[4].columns[0].text).toBe('Agreement number:')
  })

  test('includes agreement number value', () => {
    const result = summary(mockStatement)
    expect(result.stack[4].columns[1].text).toBe('SFI1234567')
  })
})
