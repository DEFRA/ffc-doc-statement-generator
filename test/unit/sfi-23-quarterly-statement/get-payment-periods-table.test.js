const getPaymentPeriods = require('../../../app/generator/content/sfi23-quarterly-statement/part3/get-payment-periods-table')
// const getPaymentPeriods = require('./getPaymentPeriods');

describe('getPaymentPeriods', () => {
  test('should correctly calculate the estimated payment dates and return the expected table structure', () => {
    const sfi23Statement = [
      { calculationId: 1, paymentPeriod: '1st January to 31 March 2024', estimatedPayment: 'April 2024' },
      { calculationId: 2, paymentPeriod: '1st April to 30 June 2024', estimatedPayment: 'July 2024' },
      { calculationId: 3, paymentPeriod: '1st July to 30 September 2024', estimatedPayment: 'October 2024' },
      { calculationId: 4, paymentPeriod: '1st October to 31 December 2024', estimatedPayment: 'January 2025' }
    ]

    const result = getPaymentPeriods(sfi23Statement)

    expect(result).toBe({
      layout: expect.objectContaining({
        hLineStyle: expect.any(Function),
        vLineStyle: expect.any(Function)
      }),
      style: 'table',
      table: expect.objectContaining({
        headerRows: 1,
        widths: ['*', '*'],
        body: [
          [
            { text: 'Period', style: 'tableHeader' },
            { text: 'Estimated Payment', style: 'tableHeader' }
          ],
          [
            { text: '1st January to 31 March 2024', style: 'tableNumber' },
            { text: 'April 2024', style: 'tableNumber' }
          ],
          [
            { text: '1st April to 30 June 2024', style: 'tableNumber' },
            { text: 'July 2024', style: 'tableNumber' }
          ],
          [
            { text: '1st July to 30 September 2024', style: 'tableNumber' },
            { text: 'October 2024', style: 'tableNumber' }
          ],
          [
            { text: '1st October to 31 December 2024', style: 'tableNumber' },
            { text: 'January 2025', style: 'tableNumber' }
          ]
        ]
      })
    })
  })
})
