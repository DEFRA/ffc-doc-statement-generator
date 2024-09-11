const MAX_CHARACTERS_PER_LINE = 50

const getAddress = (businessName, address) => {
  let fullAddress = `${businessName.toUpperCase()}\n`
  const addressLines = Object.values(address)
  addressLines.filter(x => x !== undefined && x !== null && x !== '').forEach(x => {
    fullAddress += `${x.toUpperCase().substring(0, MAX_CHARACTERS_PER_LINE)}\n`
  })
  return {
    stack: [
      { text: fullAddress, style: 'address' }
    ]
  }
}

module.exports = getAddress
