const toCurrencyString = require('../../../../generator/to-currency-string')

const getTotalPaymentTable = (totalpayment) => {
  const totalPaymentTable = {
    layout: {
      hLineStyle: () => 'solid',
      vLineStyle: () => 'solid'
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
          { text: toCurrencyString(totalpayment), bold: true }
        ]
      ]
    }
  }
  return totalPaymentTable
}

module.exports = getTotalPaymentTable
