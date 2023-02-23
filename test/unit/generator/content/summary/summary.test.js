const summary = require('../../../../../app/generator/content/summary')
const mockStatement = require('../../../../mocks/statement-data')

describe('generate summary', () => {
  test('includes RPA logo', () => {
    const result = summary(mockStatement)
    console.log(result)
    expect(result.stack[0].image.endsWith('rpa-logo.jfif')).toBeTruthy()
  })

  test('includes address', () => {
    const result = summary(mockStatement)
    expect(result.stack[1].text).toMatch('Mr A Farmer\nA Farm\nNear a field\nNewcastle Upon Tyne\nTyne & Wear\nNE1 1AA')
  })

  test('includes header with both scheme name and year for SFI 22', () => {
    const result = summary(mockStatement)
    expect(result.stack[2].text).toBe('Sustainable Farming Incentive 2022')
  })

  test('includes subtitle', () => {
    const result = summary(mockStatement)
    expect(result.stack[3].text).toBe('Payment statement')
  })

  test('includes business name title', () => {
    const result = summary(mockStatement)
    expect(result.stack[4].columns[0].text).toBe('Business name:')
  })

  test('includes business name', () => {
    const result = summary(mockStatement)
    expect(result.stack[4].columns[1].text).toBe('Mr A Farmer')
  })

  test('includes SBI title', () => {
    const result = summary(mockStatement)
    expect(result.stack[5].columns[0].text).toBe('Single business identifier (SBI):')
  })

  test('includes SBI', () => {
    const result = summary(mockStatement)
    expect(result.stack[5].columns[1].text).toBe(123456789)
  })

  test('includes summary text introduction', () => {
    const result = summary(mockStatement)
    expect(result.stack[6]).toMatch('\n\nThis statement explains your payment for the Sustainable Farming Incentive (SFI). It is made up of 3 parts.')
  })

  test('includes summary text for part 1', () => {
    const result = summary(mockStatement)
    expect(result.stack[7]).toMatch('\nPart 1 provides a summary of the most recent payment.')
  })

  test('includes summary text for part 2', () => {
    const result = summary(mockStatement)
    expect(result.stack[8]).toMatch('Part 2 explains how we calculated the payment.')
  })

  test('includes summary text for part 3', () => {
    const result = summary(mockStatement)
    expect(result.stack[9]).toMatch('Part 3 highlights where to go for more support.')
  })
})
