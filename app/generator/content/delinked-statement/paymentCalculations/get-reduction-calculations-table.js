const formatCalculationAmount = (value) => {
  const parsedValue = parseFloat(value)
  const formattedValue = parsedValue > 0
    ? parsedValue.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : parsedValue.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
  return `£${formattedValue}`
}

const getReductionsCalculationsTable = (delinkedStatement) => {
  const tableBody = [
    [
      { colSpan: 2, text: 'Payment amount calculation', style: 'tableHeader', bold: true },
      { text: '' }
    ],
    [
      { text: '', style: 'tableHeader' },
      { text: 'Amount', style: 'tableHeader' }
    ],
    [
      { text: 'Reference amount' },
      { text: formatCalculationAmount(delinkedStatement.referenceAmount) }
    ],
    [
      { text: 'Progressive reduction' },
      { text: formatCalculationAmount(delinkedStatement.totalProgressiveReduction) }
    ]
  ]

  if (delinkedStatement.scheme.year === 2024 || delinkedStatement.paymentPeriod === 2024) {
    tableBody.push([
      { text: 'Total annual delinked payment' },
      { text: formatCalculationAmount(delinkedStatement.totalDelinkedPayment) }
    ])

    tableBody.push([
      { text: 'Payment amount', bold: true },
      { text: formatCalculationAmount(delinkedStatement.paymentAmountCalculated), bold: true }
    ])
  } else {
    tableBody.push([
      { text: 'Total annual delinked payment', bold: true },
      { text: formatCalculationAmount(delinkedStatement.totalDelinkedPayment), bold: true }
    ])
  }

  const reductionsCalculationsTable = {
    layout: {
      hLineStyle: () => 'solid',
      vLineStyle: () => 'solid'
    },
    style: 'table',
    table: {
      headerRows: 2,
      widths: ['*', '*'],
      body: tableBody
    }
  }

  return reductionsCalculationsTable
}

module.exports = getReductionsCalculationsTable
