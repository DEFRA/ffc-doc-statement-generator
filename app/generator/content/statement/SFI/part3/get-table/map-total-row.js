const toCurrencyString = require('../../../../../to-currency-string')

const mapTotalRow = (row) => {
  return [
    { text: row.name, bold: true },
    { text: row.level, bold: true },
    { text: row.rate, style: 'tableNumber', bold: true },
    { text: row.area, style: 'tableNumber', bold: true },
    { text: `${toCurrencyString(row.annualValue)}`, style: 'tableNumber', bold: true },
    { text: `${toCurrencyString(row.quarterlyValue)}`, style: 'tableNumber', bold: true },
    { text: `${toCurrencyString(row.quarterlyReduction)}`, style: 'tableNumber', bold: true },
    { text: `${toCurrencyString(row.quarterlyPayment)}`, style: 'tableNumber', bold: true }
  ]
}

module.exports = mapTotalRow
