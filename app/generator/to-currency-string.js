const toCurrencyString = (value) => {
  const numParts = value.split('.')
  numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  numParts[1] = numParts[1] ? numParts[1].padEnd(2, '0') : '00'
  return `£${numParts.join('.')}`
}

module.exports = toCurrencyString
