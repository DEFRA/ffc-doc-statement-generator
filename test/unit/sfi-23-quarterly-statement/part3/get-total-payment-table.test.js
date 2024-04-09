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
    expect(result).toEqual(expectedTable)
    expect(result.layout.hLineStyle()).toBe('solid')
    expect(result.layout.vLineStyle()).toBe('solid')
  })
})
