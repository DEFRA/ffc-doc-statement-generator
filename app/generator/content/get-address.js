const { millimetresToPoints } = require('../conversion')

const getAddress = (businessName, address) => {
  let fullAddress = `${businessName}\n`
  const addressLines = Object.values(address)
  const topMargin = 45
  const leftMargin = 0
  addressLines.filter(x => x !== undefined && x !== null && x !== '').forEach(x => {
    fullAddress += `${x}\n`
  })
  return { text: fullAddress, style: 'address', absolutePosition: { x: millimetresToPoints(leftMargin), y: millimetresToPoints(topMargin) } }
}

module.exports = getAddress
