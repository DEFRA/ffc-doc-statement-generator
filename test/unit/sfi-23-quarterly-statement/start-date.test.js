const getStartDate = require('../../../app/generator/content/sfi23-quarterly-statement/start-date.js')
const agreementStart = '1st January 2024'

describe('getCalculationDate', () => {
  test('returns column style', () => {
    const result = getStartDate(agreementStart)
    expect(result.style).toBe('column')
  })

  test('returns column gap', () => {
    const result = getStartDate(agreementStart)
    expect(result.columnGap).toBe(10)
  })

  test('returns two columns', () => {
    const result = getStartDate(agreementStart)
    expect(result.columns.length).toBe(2)
  })

  const columnTests = [
    { index: 0, prop: 'text', expected: 'Start date:' },
    { index: 0, prop: 'width', expected: 200 },
    { index: 1, prop: 'text', expected: '1st January 2024' },
    { index: 1, prop: 'width', expected: '*' }
  ]

  test.each(columnTests)('column %i should have %s = %p', ({ index, prop, expected }) => {
    const result = getStartDate(agreementStart)
    expect(result.columns[index][prop]).toBe(expected)
  })
})
