const getSBI = require('../../../../../../app/generator/content/summary/get-sbi')
const sbi = 123456789

describe('get SBI', () => {
  test('returns two columns', () => {
    const result = getSBI(sbi)
    expect(result.columns.length).toBe(2)
  })

  test('returns title column text', () => {
    const result = getSBI(sbi)
    expect(result.columns[0].text).toBe('Single Business Identifier (SBI):')
  })

  test('returns title column width', () => {
    const result = getSBI(sbi)
    expect(result.columns[0].width).toBe(200)
  })

  test('returns SBI column text', () => {
    const result = getSBI(sbi)
    expect(result.columns[1].text).toBe(123456789)
  })

  test('returns SBI column width', () => {
    const result = getSBI(sbi)
    expect(result.columns[1].width).toBe('*')
  })

  test('returns column style', () => {
    const result = getSBI(sbi)
    expect(result.style).toBe('column')
  })

  test('returns column gap', () => {
    const result = getSBI(sbi)
    expect(result.columnGap).toBe(10)
  })
})
