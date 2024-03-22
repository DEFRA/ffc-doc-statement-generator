const getPaymentPeriods = require('../../../app/generator/content/sfi23-quarterly-statement/part3/get-payment-periods-table')

jest.mock('../../../app/generator/content/sfi23-quarterly-statement/part3/get-payment-periods-table', () => {
  return jest.fn().mockReturnValue({
    layout: {
      hLineStyle: () => 'solid',
      vLineStyle: () => 'solid'
    },
    style: 'table',
    table: {
      headerRows: 1,
      widths: ['*', '*'],
      body: [
        [
          { text: 'Period', style: 'tableHeader' },
          { text: 'Estimated Payment', style: 'tableHeader' }
        ],
        [
          { text: 'January 2022 to February 2022', style: 'tableNumber' },
          { text: 'March 2022', style: 'tableNumber' }
        ],
        [
          { text: 'March 2022 to April 2022', style: 'tableNumber' },
          { text: 'May 2022', style: 'tableNumber' }
        ]
      ]
    }
  })
})
describe('getPaymentPeriods', () => {
  test('processes sfi23Statement array correctly', () => {
    const sfi23Statement = [
      {
        paymentPeriod: 'January 2022 to February 2022',
        estimatedPayment: 'March 2022'
      },
      {
        paymentPeriod: 'March 2022 to April 2022',
        estimatedPayment: 'May 2022'
      }
    ]
    const result = getPaymentPeriods(sfi23Statement)
    expect(result.table.body.length).toBe(3)
    expect(result.table.body[1][0]).toHaveProperty('text', 'January 2022 to February 2022')
    expect(result.table.body[1][1]).toHaveProperty('text', 'March 2022')
    expect(result.table.body[2][0]).toHaveProperty('text', 'March 2022 to April 2022')
    expect(result.table.body[2][1]).toHaveProperty('text', 'May 2022')
  })
})
