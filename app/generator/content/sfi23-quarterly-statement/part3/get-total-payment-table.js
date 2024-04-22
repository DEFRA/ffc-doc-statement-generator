
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
          { text: `£${new Intl.NumberFormat().format(Number(totalpayment)).toString()}`, bold: true }
        ]
      ]
    }
  }
  return totalPaymentTable
}

module.exports = getTotalPaymentTable
