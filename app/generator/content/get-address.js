const MAX_CHARACTERS_PER_LINE = 50

const addressLineAmount = 7

const sanitiseAddressLine = (line) => {
  return line.replace(/[@()=[\]”\\/'<>~]/g, '')
}

const getAddress = (businessName, address) => {
  let fullAddress = `${sanitiseAddressLine(businessName).toUpperCase().substring(0, MAX_CHARACTERS_PER_LINE)}\n`

  const addressLines = Object.values(address)

  const sanitizedAddressLines = addressLines
    .filter(line => line !== null && line !== undefined && line !== '')
    .map(line => sanitiseAddressLine(line))

  // !!important - Ensure there are always 7 lines
  while (sanitizedAddressLines.length < addressLineAmount) {
    sanitizedAddressLines.push('')
  }

  sanitizedAddressLines.forEach((line) => {
    fullAddress += `${line.toUpperCase().substring(0, MAX_CHARACTERS_PER_LINE)}\n`
  })

  return {
    stack: [
      { text: fullAddress, style: 'address' }
    ]
  }
}

module.exports = getAddress
