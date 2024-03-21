const getPaymentPeriods = (sfi23Statement) => {
  const paymentPeriodTable = {
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
        ]
      ]
    }
  }

  sfi23Statement.forEach(x => {
    if (x.calculationId) {
      const paymentDatePeriod = new Date(x.paymentPeriod)
      paymentDatePeriod.setMonth(paymentDatePeriod.getMonth() + 1)
      const estimatedPayment = paymentDatePeriod.toLocaleString('default', { month: 'long', year: 'numeric' })
      paymentPeriodTable.table.body.push([
        { text: x.paymentPeriod, style: 'tableNumber' },
        { text: estimatedPayment, style: 'tableNumber' }
      ])
    }
  })

  return paymentPeriodTable
}

module.exports = getPaymentPeriods
