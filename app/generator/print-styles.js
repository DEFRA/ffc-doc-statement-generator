const { millimetresToPoints } = require('./conversion')

const zeroMillimeters = 0
const fiveMillimeters = 5
const tenMillimeters = 10
const twentyFiveMillimeters = 25
const thirtyFiveMillimeters = 35
const twoHundredMillimeters = 200
const addressPaneWidth = 95.4
const addressPaneHeight = 26.8
const addressPaneLeft = 20
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
    margin: [millimetresToPoints(zeroMillimeters), millimetresToPoints(tenMillimeters), millimetresToPoints(zeroMillimeters), millimetresToPoints(fiveMillimeters)]
  },
  header2: {
    fontSize: 19,
    lineHeight: 1.2,
    bold: true,
    margin: [millimetresToPoints(zeroMillimeters), millimetresToPoints(tenMillimeters), millimetresToPoints(zeroMillimeters), millimetresToPoints(fiveMillimeters)]
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
    margin: [millimetresToPoints(zeroMillimeters), millimetresToPoints(tenMillimeters), millimetresToPoints(zeroMillimeters), millimetresToPoints(fiveMillimeters)]
  },
  subTitle: {
    fontSize: 19,
    lineHeight: 1.2,
    margin: [millimetresToPoints(zeroMillimeters), millimetresToPoints(tenMillimeters), millimetresToPoints(zeroMillimeters), millimetresToPoints(fiveMillimeters)]
  },
  SFIAHeader: {
    fontSize: 20,
    lineHeight: 1.2,
    bold: true,
    margin: [millimetresToPoints(zeroMillimeters), millimetresToPoints(tenMillimeters), millimetresToPoints(zeroMillimeters), millimetresToPoints(fiveMillimeters)]
  },
  link: {
    decoration: 'underline',
    color: 'blue'
  },
  table: {
    fontSize: 10,
    margin: [zeroMillimeters, millimetresToPoints(fiveMillimeters), zeroMillimeters, millimetresToPoints(fiveMillimeters)]
  },
  tableHeader: {
    fontSize: 12,
    lineHeight: 1.2,
    bold: true,
    margin: [zeroMillimeters, zeroMillimeters, zeroMillimeters, millimetresToPoints(fiveMillimeters)]
  },
  tableNumber: {
    alignment: 'right'
  },
  logo: {
    width: millimetresToPoints(twoHundredMillimeters),
    height: millimetresToPoints(twentyFiveMillimeters)
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
    margin: [zeroMillimeters, millimetresToPoints(thirtyFiveMillimeters), zeroMillimeters, zeroMillimeters]
  },
  separator: {
    margin: [zeroMillimeters, millimetresToPoints(tenMillimeters), zeroMillimeters, zeroMillimeters]
  }
}
