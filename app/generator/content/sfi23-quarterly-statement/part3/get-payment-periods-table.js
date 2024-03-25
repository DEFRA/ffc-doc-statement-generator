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

  sfi23Statement.forEach((item) => {
    if (item.calculationId) {
      const paymentPeriodParts = item.paymentPeriod.split(' to ')[1].split(' ')
      const year = parseInt(paymentPeriodParts[paymentPeriodParts.length - 1])
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      const month = monthNames.indexOf(paymentPeriodParts[paymentPeriodParts.length - 2]) + 1
      const paymentDatePeriod = new Date(year, month - 1)
      paymentDatePeriod.setMonth(paymentDatePeriod.getMonth() + 1)
      const estimatedPayment = paymentDatePeriod.toLocaleString('default', { month: 'long', year: 'numeric' })
      paymentPeriodTable.table.body.push([
        { text: item.paymentPeriod, style: 'tableNumber' },
        { text: estimatedPayment, style: 'tableNumber' }
      ])
    }
  })

  return paymentPeriodTable
}

module.exports = getPaymentPeriods
