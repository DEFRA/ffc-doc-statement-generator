const toCurrencyString = (value) => {
  if (isNaN(value)) throw new Error("Currency value is not a number")
  let currencyString = value.toString()
  if (!currencyString.includes('.')) return currencyString.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  const numParts = currencyString.split('.')
  numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  numParts[1] = numParts[1] ? numParts[1].padEnd(2, '0') : '00'
  return `${numParts.join('.')}`
}

module.exports = toCurrencyString
