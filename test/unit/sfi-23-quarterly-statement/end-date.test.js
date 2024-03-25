const getEndDate = require('../../../app/generator/content/sfi23-quarterly-statement/end-date.js')
const agreementEnd = '1st January 2026'

describe('get calculation date', () => {
  test('returns two columns', () => {
    const result = getEndDate(agreementEnd)
    expect(result.columns.length).toBe(2)
  })

  test('returns title column text', () => {
    const result = getEndDate(agreementEnd)
    expect(result.columns[0].text).toBe('End date:')
  })

  test('returns title column width', () => {
    const result = getEndDate(agreementEnd)
    expect(result.columns[0].width).toBe(200)
  })

  test('returns end date column text', () => {
    const result = getEndDate(agreementEnd)
    expect(result.columns[1].text).toBe('1st January 2026')
  })

  test('returns end date column width', () => {
    const result = getEndDate(agreementEnd)
    expect(result.columns[1].width).toBe('*')
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
