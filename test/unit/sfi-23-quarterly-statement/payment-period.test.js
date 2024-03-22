const getPaymentPeriod = require('../../../app/generator/content/sfi23-quarterly-statement/part2/get-payment-period')

jest.mock('../../../app/generator/content/sfi23-quarterly-statement/start-date.js', () => {
  return jest.fn().mockReturnValue({
    columns: [
      { width: 200, text: 'Period: ' },
      { width: '*', text: '1st Jan 2024 to 1st March 2024' }
    ],
    style: 'column',
    columnGap: 10
  })
})

describe('get payment period', () => {
  test('processes payment period correctly', () => {
    const agreementStart = '1st Jan 2024 to 1st March 2024'
    const result = getPaymentPeriod(agreementStart)
    expect(result.columns.length).toBe(2)
    expect(result.columns[0]).toHaveProperty('text', 'Period: ')
    expect(result.columns[1]).toHaveProperty('text', '1st Jan 2024 to 1st March 2024')
  })
})
