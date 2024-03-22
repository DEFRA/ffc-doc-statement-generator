const getEndDate = require('../../../app/generator/content/sfi23-quarterly-statement/end-date.js')

jest.mock('../../../app/generator/content/sfi23-quarterly-statement/end-date.js', () => {
  return jest.fn().mockReturnValue({
    columns: [
      { width: 200, text: 'End date: ' },
      { width: '*', text: '2022-01-01' }
    ],
    style: 'column',
    columnGap: 10
  })
})

describe('getEndDate', () => {
  test('processes agreementEnd correctly', () => {
    const agreementEnd = '2022-01-01'
    const result = getEndDate(agreementEnd)
    expect(result.columns.length).toBe(2)
    expect(result.columns[0]).toHaveProperty('text', 'End date: ')
    expect(result.columns[1]).toHaveProperty('text', '2022-01-01')
  })
})
