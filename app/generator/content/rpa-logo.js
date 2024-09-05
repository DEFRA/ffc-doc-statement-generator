const path = require('path')
const imagePath = path.join(__dirname, '..', 'images')
const { millimetresToPoints } = require('../conversion')

const rpaLogo = () => {
  const width = 200
  const height = 25
  return {
    stack: [
      {
        image: `${imagePath}/v2/rpa-logo.png`,
        fit: [millimetresToPoints(width), millimetresToPoints(height)],
        style: 'logo'
      }
    ]
  }
}

module.exports = rpaLogo
