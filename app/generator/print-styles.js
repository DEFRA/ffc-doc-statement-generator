const { millimetresToPoints } = require('./conversion')

const zeroMillimeters = 0
const topBottomMargin = 5
const topMargin = 10
const logoHeight = 25
const notifyTopMargin = 35
const logoWidth = 200
const addressPaneWidth = 95.4
const addressPaneHeight = 26.8
const addressPaneLeft = 10
const addressPaneTop = 10

module.exports = {
  default: {
    font: 'Arial',
    fontSize: 12,
    lineHeight: 1.3
  },
  header1: {
    fontSize: 20,
    lineHeight: 1.2,
    bold: true,
    margin: [millimetresToPoints(zeroMillimeters), millimetresToPoints(topMargin), millimetresToPoints(zeroMillimeters), millimetresToPoints(topBottomMargin)]
  },
  header2: {
    fontSize: 19,
    lineHeight: 1.2,
    bold: true,
    margin: [millimetresToPoints(zeroMillimeters), millimetresToPoints(topMargin), millimetresToPoints(zeroMillimeters), millimetresToPoints(topBottomMargin)]
  },
  tableHeader2: {
    fontSize: 14,
    lineHeight: 1.2,
    bold: true
  },
  header3: {
    fontSize: 14,
    lineHeight: 1.2,
    bold: true,
    margin: [millimetresToPoints(zeroMillimeters), millimetresToPoints(topMargin), millimetresToPoints(zeroMillimeters), millimetresToPoints(topBottomMargin)]
  },
  subTitle: {
    fontSize: 19,
    lineHeight: 1.2,
    margin: [millimetresToPoints(zeroMillimeters), millimetresToPoints(topMargin), millimetresToPoints(zeroMillimeters), millimetresToPoints(topBottomMargin)]
  },
  SFIAHeader: {
    fontSize: 20,
    lineHeight: 1.2,
    bold: true,
    margin: [millimetresToPoints(zeroMillimeters), millimetresToPoints(topMargin), millimetresToPoints(zeroMillimeters), millimetresToPoints(topBottomMargin)]
  },
  link: {
    decoration: 'underline',
    color: 'blue'
  },
  table: {
    fontSize: 10,
    margin: [zeroMillimeters, millimetresToPoints(topBottomMargin), zeroMillimeters, millimetresToPoints(topBottomMargin)]
  },
  tableHeader: {
    fontSize: 12,
    lineHeight: 1.2,
    bold: true,
    margin: [zeroMillimeters, zeroMillimeters, zeroMillimeters, millimetresToPoints(topBottomMargin)]
  },
  tableNumber: {
    alignment: 'right'
  },
  logo: {
    width: millimetresToPoints(logoWidth),
    height: millimetresToPoints(logoHeight)
  },
  address: {
    margin: [
      millimetresToPoints(addressPaneLeft),
      millimetresToPoints(addressPaneTop),
      zeroMillimeters,
      zeroMillimeters
    ],
    fontSize: 8.5,
    width: millimetresToPoints(addressPaneWidth),
    height: millimetresToPoints(addressPaneHeight),
    lineHeight: 1
  },
  notifyMargin: {
    margin: [zeroMillimeters, millimetresToPoints(notifyTopMargin), zeroMillimeters, zeroMillimeters]
  },
  separator: {
    margin: [zeroMillimeters, millimetresToPoints(topMargin), zeroMillimeters, zeroMillimeters]
  }
}
