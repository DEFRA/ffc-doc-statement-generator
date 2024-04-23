const getTotalPaymentTable = require('../../../../app/generator/content/sfi23-quarterly-statement/part3/get-total-payment-table')

describe('getTotalPaymentTable', () => {
  test('should return a correctly formatted table object', () => {
    const totalpayment = 123456.78
    const expectedTable = {
      layout: {
        hLineStyle: expect.any(Function),
        vLineStyle: expect.any(Function)
      },
      style: 'table',
      table: {
        headerRows: 1,
        widths: ['*', '*', '*', '*', '*', '*'],
        body: [
          [
            { colSpan: 5, text: 'Payment total', style: 'tableNumber', bold: true },
            { text: '' },
            { text: '' },
            { text: '' },
            { text: '' },
            { text: `£${new Intl.NumberFormat().format(Number(totalpayment)).toString()}`, bold: true }
          ]
        ]
      }
    }

    const result = getTotalPaymentTable(totalpayment)
    expect(result.stack[0]).toEqual(expectedTable)
    expect(result.stack[0].layout.hLineStyle()).toBe('solid')
    expect(result.stack[0].layout.vLineStyle()).toBe('solid')
    expect(result.stack[1]).toEqual({ text: 'The payment amount in ‘What you’ve been paid’ may be different to the ‘Payment total’ amount. The payment amount in ‘What you’ve been paid’ is what you’ll receive.' })
    expect(result.unbreakable).toBeTruthy()
  })
})
