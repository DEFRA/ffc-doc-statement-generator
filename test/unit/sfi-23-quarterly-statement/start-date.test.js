const getStartDate = require('../../../app/generator/content/sfi23-quarterly-statement/start-date.js')
const agreementStart = '1st January 2024'

describe('get calculation date', () => {
  test('returns two columns', () => {
    const result = getStartDate(agreementStart)
    expect(result.columns.length).toBe(2)
  })

  test('returns title column text', () => {
    const result = getStartDate(agreementStart)
    expect(result.columns[0].text).toBe('Start date:')
  })

  test('returns title column width', () => {
    const result = getStartDate(agreementStart)
    expect(result.columns[0].width).toBe(200)
  })

  test('returns start date column text', () => {
    const result = getStartDate(agreementStart)
    expect(result.columns[1].text).toBe('1st January 2024')
  })

  test('returns start date column width', () => {
    const result = getStartDate(agreementStart)
    expect(result.columns[1].width).toBe('*')
  })

  test('returns column style', () => {
    const result = getStartDate(agreementStart)
    expect(result.style).toBe('column')
  })

  test('returns column gap', () => {
    const result = getStartDate(agreementStart)
    expect(result.columnGap).toBe(10)
  })
})
