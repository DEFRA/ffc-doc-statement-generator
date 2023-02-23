const path = require('path')
const { millimetresToPoints } = require('../../conversion')
const getAddress = require('./get-address')
const getBusinessName = require('./get-business-name')
const getSBI = require('./get-sbi')
const imagePath = path.join(__dirname, '../..', 'images')

const summary = (statement) => {
  return {
    stack: [
      { image: `${imagePath}/rpa-logo.jfif`, fit: [millimetresToPoints(200), millimetresToPoints(25)], style: 'logo' },
      getAddress(statement.businessName, statement.address),
      { text: `${statement.scheme.name} ${statement.scheme.year}`, style: 'header1' },
      { text: 'Payment statement', style: 'subTitle' },
      getBusinessName(statement.businessName),
      getSBI(statement.sbi),
      `\n\nThis statement explains your payment for the ${statement.scheme.name} (${statement.scheme.shortName}). It is made up of 3 parts.`,
      '\nPart 1 provides a summary of the most recent payment.',
      'Part 2 explains how we calculated the payment.',
      'Part 3 highlights where to go for more support.'
    ],
    unbreakable: true
  }
}

module.exports = summary
