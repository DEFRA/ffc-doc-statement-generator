const { millimetresToPoints } = require('./conversion')
const zeroPoint = 0
const fivePoints = 5
const tenPoints = 10
const fifteenPoints = 15
const twentyPoints = 20
const twentyfivePoints = 25
const thirtyPoints = 30

module.exports = {
  default: {
    font: 'Arial',
    fontSize: 12,
    lineHeight: 1.5
  },
  header1: {
    fontSize: 16,
    bold: true,
    margin: [zeroPoint, tenPoints, zeroPoint, tenPoints]
  },
  header2: {
    fontSize: 14,
    bold: true,
    margin: [zeroPoint, twentyPoints, zeroPoint, tenPoints]
  },
  tableHeader2: {
    fontSize: 14,
    bold: true,
    margin: [zeroPoint, zeroPoint, zeroPoint, fivePoints]
  },
  header3: {
    fontSize: 12,
    bold: true,
    margin: [zeroPoint, fivePoints, zeroPoint, fivePoints]
  },
  subTitle: {
    fontSize: 18,
    margin: [zeroPoint, zeroPoint, zeroPoint, thirtyPoints]
  },
  SFIAHeader: {
    fontSize: 16,
    bold: true,
    margin: [zeroPoint, twentyPoints, zeroPoint, tenPoints]
  },
  link: {
    decoration: 'underline',
    color: 'blue'
  },
  table: {
    fontSize: tenPoints,
    margin: [zeroPoint, tenPoints, zeroPoint, tenPoints]
  },
  tableHeader: {
    fontSize: 12,
    bold: true,
    margin: [zeroPoint, zeroPoint, zeroPoint, fivePoints]
  },
  tableNumber: {
    alignment: 'right'
  },
  logo: {
    margin: [zeroPoint, twentyPoints, zeroPoint, millimetresToPoints(fifteenPoints)]
  },
  address: {
    margin: [zeroPoint, fivePoints, zeroPoint, millimetresToPoints(twentyfivePoints)],
    fontSize: 9.5,
    lineHeight: 1.5
  },
  style: {
    margin: [zeroPoint, zeroPoint, zeroPoint, fivePoints]
  }
}
