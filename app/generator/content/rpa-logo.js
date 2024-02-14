const path = require('path')
const imagePath = path.join(__dirname, '..', 'images')
const { millimetresToPoints } = require('../conversion')

const rpaLogo = () => {
  const leftMargin = 200
  const topMargin = 25
  return {
    stack: [
      { image: `${imagePath}/v2/rpa-logo.png`, fit: [millimetresToPoints(leftMargin), millimetresToPoints(topMargin)], style: 'logo' }
    ]
  }
}

module.exports = rpaLogo
