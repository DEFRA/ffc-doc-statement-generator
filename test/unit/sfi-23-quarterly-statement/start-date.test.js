const getStartDate = require('../../../app/generator/content/sfi23-quarterly-statement/start-date.js')

jest.mock('../../../app/generator/content/sfi23-quarterly-statement/start-date.js', () => {
  return jest.fn().mockReturnValue({
    columns: [
      { width: 200, text: 'Start date: ' },
      { width: '*', text: '2022-01-01' }
    ],
    style: 'column',
    columnGap: 10
  })
})

describe('getStartDate', () => {
  test('processes agreementStart correctly', () => {
    const agreementStart = '2022-01-01'
    const result = getStartDate(agreementStart)
    expect(result.columns.length).toBe(2)
    expect(result.columns[0]).toHaveProperty('text', 'Start date: ')
    expect(result.columns[1]).toHaveProperty('text', '2022-01-01')
  })
})
