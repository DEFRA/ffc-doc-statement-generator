const getReductionsCalculationsTable = (delinkedStatement) => {
  const formatCalculationAmount = (value) => {
    const parsedValue = parseFloat(value)
    return parsedValue > 0 ? `£${parsedValue.toFixed(2)}` : `£${parsedValue.toFixed(0)}`
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
      body: [
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
        ],
        [
          { text: 'Total annual delinked payment' },
          { text: formatCalculationAmount(delinkedStatement.totalDelinkedPayment) }
        ],
        [
          { text: 'Payment amount' },
          { text: formatCalculationAmount(delinkedStatement.paymentAmountCalculated) }
        ]
      ]
    }
  }

  return reductionsCalculationsTable
}

module.exports = getReductionsCalculationsTable
