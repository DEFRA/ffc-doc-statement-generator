const getCalculationDate = require('../../../../../app/generator/content/part1/get-calculation-date')
const calculated = '1 July 2022'

describe('get calculation date', () => {
  test('returns two columns', () => {
    const result = getCalculationDate(calculated)
    expect(result.columns.length).toBe(2)
  })

  test('returns title column text', () => {
    const result = getCalculationDate(calculated)
    expect(result.columns[0].text).toBe('Calculation date:')
  })

  test('returns title column width', () => {
    const result = getCalculationDate(calculated)
    expect(result.columns[0].width).toBe(200)
  })

  test('returns business name column text', () => {
    const result = getCalculationDate(calculated)
    expect(result.columns[1].text).toBe('1 July 2022')
  })

  test('returns business name column width', () => {
    const result = getCalculationDate(calculated)
    expect(result.columns[1].width).toBe('*')
  })

  test('returns column style', () => {
    const result = getCalculationDate(calculated)
    expect(result.style).toBe('column')
  })

  test('returns column gap', () => {
    const result = getCalculationDate(calculated)
    expect(result.columnGap).toBe(10)
  })
})
