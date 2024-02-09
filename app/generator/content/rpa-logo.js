const path = require('path')
const imagePath = path.join(__dirname, '..', 'images')
const { millimetresToPoints } = require('../conversion')

const rpaLogo = () => {
  return {
    stack: [
      { image: `${imagePath}/v2/rpa-logo.png`, fit: [millimetresToPoints(200), millimetresToPoints(25)], style: 'logo' }
    ]
  }
}

module.exports = rpaLogo
