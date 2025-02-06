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
  return {
    stack: [
      totalPaymentTable,
      { text: 'The payment amount in ‘What you’ve been paid’ may be different to the ‘Payment total’ amount. The payment amount in ‘What you’ve been paid’ is what you’ll receive.' }
    ],
    unbreakable: true
  }
}

module.exports = getTotalPaymentTable
