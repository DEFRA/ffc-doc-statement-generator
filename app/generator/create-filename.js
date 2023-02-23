const createFilename = (statement, timestamp) => {
  return `FFC_PaymentStatement_${statement.scheme.shortName}_${statement.scheme.year}_${statement.frn}_${timestamp}.pdf`.replace(/\s/g, '')
}

module.exports = createFilename
