const MAX_CHARACTERS_PER_LINE = 50
const addressLineAmount = 7
const getAddress = (businessName, address) => {
  let fullAddress = `${businessName.toUpperCase().substring(0, MAX_CHARACTERS_PER_LINE)}\n`
  const addressLines = Object.values(address)

  const sanitizedAddressLines = addressLines.filter(line => line !== null && line !== undefined && line !== '')

  // !!important - Ensure there are always 7 lines
  while (sanitizedAddressLines.length < addressLineAmount) {
    sanitizedAddressLines.push('')
  }

  sanitizedAddressLines.forEach((x) => {
    fullAddress += `${x.toUpperCase().substring(0, MAX_CHARACTERS_PER_LINE)}\n`
  })

  return {
    stack: [
      { text: fullAddress, style: 'address' }
    ]
  }
}

module.exports = getAddress
