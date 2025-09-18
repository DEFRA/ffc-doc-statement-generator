const BAND_UP_TO_30000 = 30000
const BAND_30000_TO_50000 = 50000
const BAND_50000_TO_150000 = 150000

const formatPaymentBand = (value) => {
  let numericValue = value
  if (typeof value === 'string') {
    numericValue = value.replace(/[£,+]/g, '')
  }

  numericValue = parseFloat(numericValue)
  if (isNaN(numericValue) || numericValue < 0) {
    throw new Error(`Invalid payment band value: ${value}`)
  }

  const formattedValue = numericValue.toLocaleString('en-GB', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })

  if (numericValue <= BAND_UP_TO_30000) {
    return `Up to £${formattedValue}`
  } else if (numericValue <= BAND_30000_TO_50000) {
    return `£30,000.01 to £${formattedValue}`
  } else if (numericValue <= BAND_50000_TO_150000) {
    return `£50,000.01 to £${formattedValue}`
  } else {
    return 'Above £150,000'
  }
}

const formatPercentage = (value) => {
  const minMaxPercent = 100
  if (isNaN(value) || value < -minMaxPercent || value > minMaxPercent) {
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
  const tableBody = [
    [
      { colSpan: columnSpan3, text: 'Progressive reduction calculator', style: 'tableHeader', bold: true },
      { text: '' },
      { text: '' }
    ],
    [
      { text: 'Payment band', style: 'tableHeader' },
      { text: 'Percentage reduction', style: 'tableHeader' },
      { text: 'Progressive reduction', style: 'tableHeader' }
    ]
  ]

  if (parseFloat(delinkedStatement.progressiveReductions1) !== 0) {
    tableBody.push([
      { text: formatPaymentBand(delinkedStatement.paymentBand1) },
      { text: formatPercentage(delinkedStatement.percentageReduction1) },
      { text: formatProgressiveReduction(delinkedStatement.progressiveReductions1) }
    ])
  }

  if (parseFloat(delinkedStatement.progressiveReductions2) !== 0) {
    tableBody.push([
      { text: formatPaymentBand(delinkedStatement.paymentBand2) },
      { text: formatPercentage(delinkedStatement.percentageReduction2) },
      { text: formatProgressiveReduction(delinkedStatement.progressiveReductions2) }
    ])
  }

  if (parseFloat(delinkedStatement.progressiveReductions3) !== 0) {
    tableBody.push([
      { text: formatPaymentBand(delinkedStatement.paymentBand3) },
      { text: formatPercentage(delinkedStatement.percentageReduction3) },
      { text: formatProgressiveReduction(delinkedStatement.progressiveReductions3) }
    ])
  }

  if (parseFloat(delinkedStatement.progressiveReductions4) !== 0) {
    tableBody.push([
      { text: formatPaymentBand(delinkedStatement.paymentBand4) },
      { text: formatPercentage(delinkedStatement.percentageReduction4) },
      { text: formatProgressiveReduction(delinkedStatement.progressiveReductions4) }
    ])
  }

  if (parseFloat(delinkedStatement.totalProgressiveReduction) !== 0) {
    tableBody.push([
      { text: '' },
      { text: 'Total progressive reduction', bold: true },
      { text: formatProgressiveReduction(delinkedStatement.totalProgressiveReduction), bold: true }
    ])
  }

  return tableBody
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

module.exports = {
  getProgressiveReductionTable,
  formatPaymentBand,
  formatPercentage,
  formatProgressiveReduction
}
