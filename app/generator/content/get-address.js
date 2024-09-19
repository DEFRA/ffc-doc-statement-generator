const getAddress = (businessName, address) => {
  let fullAddress = `${businessName}\n`
  const addressLines = Object.values(address)

  // Filter out null, undefined, and empty values
  const sanitizedAddressLines = addressLines.filter(line => line !== null && line !== undefined && line !== '')

  // Ensure there are always 7 lines
  while (sanitizedAddressLines.length < 7) {
    sanitizedAddressLines.push('')
  }

  sanitizedAddressLines.forEach((x, index) => {
    fullAddress += `${x}`
    if (index < sanitizedAddressLines.length - 1) {
      fullAddress += '\n'
    }
  })

  return {
    stack: [
      { text: fullAddress, style: 'address' }
    ]
  }
}

module.exports = getAddress
