const { millimetresToPoints } = require('./conversion')

const zeroMargin = 0
const headerVerticalMargin = 5
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
    margin: [millimetresToPoints(zeroMargin), millimetresToPoints(topMargin), millimetresToPoints(zeroMargin), millimetresToPoints(headerVerticalMargin)]
  },
  header2: {
    fontSize: 19,
    lineHeight: 1.2,
    bold: true,
    margin: [millimetresToPoints(zeroMargin), millimetresToPoints(topMargin), millimetresToPoints(zeroMargin), millimetresToPoints(headerVerticalMargin)]
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
    margin: [millimetresToPoints(zeroMargin), millimetresToPoints(topMargin), millimetresToPoints(zeroMargin), millimetresToPoints(headerVerticalMargin)]
  },
  subTitle: {
    fontSize: 19,
    lineHeight: 1.2,
    margin: [millimetresToPoints(zeroMargin), millimetresToPoints(topMargin), millimetresToPoints(zeroMargin), millimetresToPoints(headerVerticalMargin)]
  },
  SFIAHeader: {
    fontSize: 20,
    lineHeight: 1.2,
    bold: true,
    margin: [millimetresToPoints(zeroMargin), millimetresToPoints(topMargin), millimetresToPoints(zeroMargin), millimetresToPoints(headerVerticalMargin)]
  },
  link: {
    decoration: 'underline',
    color: 'blue'
  },
  table: {
    fontSize: 10,
    margin: [zeroMargin, millimetresToPoints(headerVerticalMargin), zeroMargin, millimetresToPoints(headerVerticalMargin)]
  },
  tableHeader: {
    fontSize: 12,
    lineHeight: 1.2,
    bold: true,
    margin: [zeroMargin, zeroMargin, zeroMargin, millimetresToPoints(headerVerticalMargin)]
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
      zeroMargin,
      zeroMargin
    ],
    fontSize: 8.5,
    width: millimetresToPoints(addressPaneWidth),
    height: millimetresToPoints(addressPaneHeight),
    lineHeight: 1
  },
  notifyMargin: {
    margin: [zeroMargin, millimetresToPoints(notifyTopMargin), zeroMargin, zeroMargin]
  },
  separator: {
    margin: [zeroMargin, millimetresToPoints(topMargin), zeroMargin, zeroMargin]
  }
}
