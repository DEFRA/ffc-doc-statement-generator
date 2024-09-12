const { millimetresToPoints } = require('../conversion')
const MAX_CHARACTERS_PER_LINE = 50

const getAddress = (businessName, address) => {
  let fullAddress = `${businessName.toUpperCase().substring(0, MAX_CHARACTERS_PER_LINE)}\n`
  const addressLines = Object.values(address)
  const topMargin = 45
  const leftMargin = 0
  addressLines.filter(x => x !== undefined && x !== null && x !== '').forEach(x => {
    fullAddress += `${x.toUpperCase().substring(0, MAX_CHARACTERS_PER_LINE)}\n`
  })
  return {
    stack: [
      { text: fullAddress, style: 'address', absolutePosition: { x: millimetresToPoints(leftMargin), y: millimetresToPoints(topMargin) } }
    ]
  }
}

module.exports = getAddress
