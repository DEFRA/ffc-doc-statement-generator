const getEndDate = require('../../../app/generator/content/sfi23-quarterly-statement/end-date.js')
const agreementEnd = '1st January 2026'

describe('getCalculationDate', () => {
  test('returns two columns', () => {
    const result = getEndDate(agreementEnd)
    expect(result.columns.length).toBe(2)
  })

  test('columns have correct properties', () => {
    const result = getEndDate(agreementEnd)
    const columnTests = [
      { index: 0, prop: 'text', expected: 'End date:' },
      { index: 0, prop: 'width', expected: 200 },
      { index: 1, prop: 'text', expected: '1st January 2026' },
      { index: 1, prop: 'width', expected: '*' }
    ]

    columnTests.forEach(({ index, prop, expected }) => {
      expect(result.columns[index][prop]).toBe(expected)
    })
  })

  test('returns column style', () => {
    const result = getEndDate(agreementEnd)
    expect(result.style).toBe('column')
  })

  test('returns column gap', () => {
    const result = getEndDate(agreementEnd)
    expect(result.columnGap).toBe(10)
  })
})
