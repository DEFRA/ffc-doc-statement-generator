const toCurrencyString = require('../../../../generator/to-currency-string')
const getPaymentTypeRowSpan = require('./get-payment-type-row-span')

const getTable = (schedule) => {
  const rowsCount = schedule.length + 1
  const table = {
    layout: {
      hLineStyle: () => 'solid',
      vLineStyle: () => 'solid'
    },
    style: 'table',
    table: {
      headerRows: 1,
      widths: ['*', '*', '*'],
      body: [
        [
          { text: 'Payment type', style: 'tableHeader' },
          { text: 'Payment period', style: 'tableHeader' },
          { text: 'Amount', style: 'tableHeader' }
        ],
        ...schedule.map(x => ([
          { rowSpan: getPaymentTypeRowSpan(x.paymentType, rowsCount, x.order), text: x.paymentType, style: 'tableNumber' },
          { text: x.period, style: 'tableNumber' },
          { text: toCurrencyString(x.value), style: 'tableNumber' }
        ]))
      ]
    }
  }

  return table
}

module.exports = {
  getTable
}
