const formatPaymentBand = (value, index) => {
  if (isNaN(value) || value < 0) {
    throw new Error(`Invalid payment band value: ${value}`)
  }
  const formattedValue = parseFloat(value).toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
  switch (index) {
    case 'BAND_UP_TO_30000': // paymentBand1
      return `Up to £${formattedValue}`
    case 'BAND_30000_TO_50000': // paymentBand2
      return `£30,000.01 to £${formattedValue}`
    case 'BAND_50000_TO_150000': // paymentBand3
      return `£50,000.01 to £${formattedValue}`
    case 'BAND_ABOVE_150000': // paymentBand4
      return 'Above £150,000'
    default:
      return `£${formattedValue}`
  }
}

const formatPercentage = (value) => {
  if (isNaN(value) || value < -100 || value > 100) {
    throw new Error(`Invalid percentage value: ${value}`)
  }
  return `${parseFloat(value)}%`
}

const formatProgressiveReduction = (value) => {
  const parsedValue = parseFloat(value)
  const formattedValue = parsedValue.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  return `£${formattedValue}`
}

const generateTableBody = (delinkedStatement) => {
  const columnSpan3 = 3
  return [
    [
      { colSpan: columnSpan3, text: 'Progressive reduction calculator', style: 'tableHeader', bold: true },
      { text: '' },
      { text: '' }
    ],
    [
      { text: 'Payment band', style: 'tableHeader' },
      { text: 'Percentage reduction', style: 'tableHeader' },
      { text: 'Progressive reduction', style: 'tableHeader' }
    ],
    [
      { text: formatPaymentBand(delinkedStatement.paymentBand1, 'BAND_UP_TO_30000') },
      { text: formatPercentage(delinkedStatement.percentageReduction1) },
      { text: formatProgressiveReduction(delinkedStatement.progressiveReductions1) }
    ],
    [
      { text: formatPaymentBand(delinkedStatement.paymentBand2, 'BAND_30000_TO_50000') },
      { text: formatPercentage(delinkedStatement.percentageReduction2) },
      { text: formatProgressiveReduction(delinkedStatement.progressiveReductions2) }
    ],
    [
      { text: formatPaymentBand(delinkedStatement.paymentBand3, 'BAND_50000_TO_150000') },
      { text: formatPercentage(delinkedStatement.percentageReduction3) },
      { text: formatProgressiveReduction(delinkedStatement.progressiveReductions3) }
    ],
    [
      { text: formatPaymentBand(delinkedStatement.paymentBand4, 'BAND_ABOVE_150000') },
      { text: formatPercentage(delinkedStatement.percentageReduction4) },
      { text: formatProgressiveReduction(delinkedStatement.progressiveReductions4) }
    ],
    [
      { text: '' },
      { text: 'Total progressive reduction', bold: true },
      { text: formatProgressiveReduction(delinkedStatement.totalProgressiveReduction), bold: true }
    ]
  ]
}

const getProgressiveReductionTable = (delinkedStatement) => {
  const progressiveReductionTable = {
    layout: {
      hLineStyle: () => 'solid',
      vLineStyle: () => 'solid'
    },
    style: 'table',
    table: {
      headerRows: 2,
      widths: ['*', '*', '*'],
      body: generateTableBody(delinkedStatement)
    }
  }

  return progressiveReductionTable
}

module.exports = getProgressiveReductionTable
