const { millimetresToPoints } = require('../../conversion')

const getAddress = (businessName, address) => {
  let fullAddress = `${businessName}\n`
  const addressLines = Object.values(address)
  addressLines.filter(x => x !== undefined && x !== null && x !== '').forEach(x => {
    fullAddress += `${x}\n`
  })
  return { text: fullAddress, style: 'address', absolutePosition: { x: millimetresToPoints(10), y: millimetresToPoints(35) } }
}

module.exports = getAddress
