const getAddress = (businessName, address) => {
  let fullAddress = `${businessName}\n`
  const addressLines = Object.values(address)
  addressLines.filter(x => x !== undefined && x !== null && x !== '').forEach(x => {
    fullAddress += `${x}\n`
  })
  return {
    stack: [
      { text: fullAddress, style: 'address' }
    ]
  }
}

module.exports = getAddress
