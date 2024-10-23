const getProgressiveReductionTable = (delinkedStatement) => {
  const formatPaymentBand = (value, index) => {
    if (isNaN(value) || value < 0) {
      throw new Error(`Invalid payment band value: ${value}`)
    }
    const formattedValue = parseFloat(value).toFixed(2).toLocaleString()
    switch (index) {
      case 0: // paymentBand1 = 30000
        return `Up to £${formattedValue}`
      case 1: // paymentBand2 = 50000
        return `£30,000.01 to £${formattedValue}`
      case 2: // paymentBand3 = 150000
        return `£50,000.01 to £${formattedValue}`
      case 3: // paymentBand4 = 99999999.9900000000
        return 'Above £150,000'
      default:
        return `£${formattedValue}`
    }
  }

  const formatPercentage = (value) => {
    if (isNaN(value) || value < 0 || value > 100) {
      throw new Error(`Invalid percentage value: ${value}`)
    }
    return `${parseFloat(value)}%`
  }

  const formatProgressiveReduction = (value) => {
    const parsedValue = parseFloat(value)
    return parsedValue > 0 ? `£${parsedValue.toFixed(2)}` : `£${parsedValue.toFixed(0)}`
  }

  const progressiveReductionTable = {
    layout: {
      hLineStyle: () => 'solid',
      vLineStyle: () => 'solid'
    },
    style: 'table',
    table: {
      headerRows: 2,
      widths: ['*', '*', '*'],
      body: [
        [
          { colSpan: 3, text: 'Progressive reduction calculator', style: 'tableHeader', bold: true },
          { text: '' },
          { text: '' }
        ],
        [
          { text: 'Payment band', style: 'tableHeader' },
          { text: 'Percentage reduction', style: 'tableHeader' },
          { text: 'Progressive reduction', style: 'tableHeader' }
        ],
        [
          { text: formatPaymentBand(delinkedStatement.paymentBand1, 0) },
          { text: formatPercentage(delinkedStatement.percentageReduction1) },
          { text: formatProgressiveReduction(delinkedStatement.progressiveReductions1) }
        ],
        [
          { text: formatPaymentBand(delinkedStatement.paymentBand2, 1) },
          { text: formatPercentage(delinkedStatement.percentageReduction2) },
          { text: formatProgressiveReduction(delinkedStatement.progressiveReductions2) }
        ],
        [
          { text: formatPaymentBand(delinkedStatement.paymentBand3, 2) },
          { text: formatPercentage(delinkedStatement.percentageReduction3) },
          { text: formatProgressiveReduction(delinkedStatement.progressiveReductions3) }
        ],
        [
          { text: formatPaymentBand(delinkedStatement.paymentBand4, 3) },
          { text: formatPercentage(delinkedStatement.percentageReduction4) },
          { text: formatProgressiveReduction(delinkedStatement.progressiveReductions4) }
        ],
        [
          { text: '' },
          { text: 'Total progressive reduction', bold: true },
          { text: parseFloat(delinkedStatement.totalProgressiveReduction).toFixed(2), bold: true }
        ]
      ]
    }
  }

  return progressiveReductionTable
}

module.exports = getProgressiveReductionTable
