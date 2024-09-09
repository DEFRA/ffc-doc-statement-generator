const styles = require('../../../app/generator/print-styles')
const { millimetresToPoints } = require('../../../app/generator/conversion')

describe('Print Styles', () => {
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

  test('default style', () => {
    expect(styles.default).toEqual({
      font: 'Arial',
      fontSize: 12,
      lineHeight: 1.3
    })
  })

  test('header1 style', () => {
    expect(styles.header1).toEqual({
      fontSize: 20,
      lineHeight: 1.2,
      bold: true,
      margin: [
        millimetresToPoints(zeroMillimeters),
        millimetresToPoints(tenMillimeters),
        millimetresToPoints(zeroMillimeters),
        millimetresToPoints(fiveMillimeters)
      ]
    })
  })

  test('header2 style', () => {
    expect(styles.header2).toEqual({
      fontSize: 19,
      lineHeight: 1.2,
      bold: true,
      margin: [
        millimetresToPoints(zeroMillimeters),
        millimetresToPoints(tenMillimeters),
        millimetresToPoints(zeroMillimeters),
        millimetresToPoints(fiveMillimeters)
      ]
    })
  })

  test('tableHeader2 style', () => {
    expect(styles.tableHeader2).toEqual({
      fontSize: 14,
      lineHeight: 1.2,
      bold: true
    })
  })

  test('header3 style', () => {
    expect(styles.header3).toEqual({
      fontSize: 14,
      lineHeight: 1.2,
      bold: true,
      margin: [
        millimetresToPoints(zeroMillimeters),
        millimetresToPoints(tenMillimeters),
        millimetresToPoints(zeroMillimeters),
        millimetresToPoints(fiveMillimeters)
      ]
    })
  })

  test('subTitle style', () => {
    expect(styles.subTitle).toEqual({
      fontSize: 19,
      lineHeight: 1.2,
      margin: [
        millimetresToPoints(zeroMillimeters),
        millimetresToPoints(tenMillimeters),
        millimetresToPoints(zeroMillimeters),
        millimetresToPoints(fiveMillimeters)
      ]
    })
  })

  test('SFIAHeader style', () => {
    expect(styles.SFIAHeader).toEqual({
      fontSize: 20,
      lineHeight: 1.2,
      bold: true,
      margin: [
        millimetresToPoints(zeroMillimeters),
        millimetresToPoints(tenMillimeters),
        millimetresToPoints(zeroMillimeters),
        millimetresToPoints(fiveMillimeters)
      ]
    })
  })

  test('link style', () => {
    expect(styles.link).toEqual({
      decoration: 'underline',
      color: 'blue'
    })
  })

  test('table style', () => {
    expect(styles.table).toEqual({
      fontSize: 10,
      margin: [
        zeroMillimeters,
        millimetresToPoints(fiveMillimeters),
        zeroMillimeters,
        millimetresToPoints(fiveMillimeters)
      ]
    })
  })

  test('tableHeader style', () => {
    expect(styles.tableHeader).toEqual({
      fontSize: 12,
      lineHeight: 1.2,
      bold: true,
      margin: [
        zeroMillimeters,
        zeroMillimeters,
        zeroMillimeters,
        millimetresToPoints(fiveMillimeters)
      ]
    })
  })

  test('tableNumber style', () => {
    expect(styles.tableNumber).toEqual({
      alignment: 'right'
    })
  })

  test('logo style', () => {
    expect(styles.logo).toEqual({
      width: millimetresToPoints(twoHundredMillimeters),
      height: millimetresToPoints(twentyFiveMillimeters)
    })
  })

  test('address style', () => {
    expect(styles.address).toEqual({
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
    })
  })

  test('notifyMargin style', () => {
    expect(styles.notifyMargin).toEqual({
      margin: [
        zeroMillimeters,
        millimetresToPoints(thirtyFiveMillimeters),
        zeroMillimeters,
        zeroMillimeters
      ]
    })
  })

  test('separator style', () => {
    expect(styles.separator).toEqual({
      margin: [
        zeroMillimeters,
        millimetresToPoints(tenMillimeters),
        zeroMillimeters,
        zeroMillimeters
      ]
    })
  })

  test('module.exports object structure', () => {
    expect(styles).toEqual({
      default: {
        font: 'Arial',
        fontSize: 12,
        lineHeight: 1.3
      },
      header1: {
        fontSize: 20,
        lineHeight: 1.2,
        bold: true,
        margin: [
          millimetresToPoints(zeroMillimeters),
          millimetresToPoints(tenMillimeters),
          millimetresToPoints(zeroMillimeters),
          millimetresToPoints(fiveMillimeters)
        ]
      },
      header2: {
        fontSize: 19,
        lineHeight: 1.2,
        bold: true,
        margin: [
          millimetresToPoints(zeroMillimeters),
          millimetresToPoints(tenMillimeters),
          millimetresToPoints(zeroMillimeters),
          millimetresToPoints(fiveMillimeters)
        ]
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
        margin: [
          millimetresToPoints(zeroMillimeters),
          millimetresToPoints(tenMillimeters),
          millimetresToPoints(zeroMillimeters),
          millimetresToPoints(fiveMillimeters)
        ]
      },
      subTitle: {
        fontSize: 19,
        lineHeight: 1.2,
        margin: [
          millimetresToPoints(zeroMillimeters),
          millimetresToPoints(tenMillimeters),
          millimetresToPoints(zeroMillimeters),
          millimetresToPoints(fiveMillimeters)
        ]
      },
      SFIAHeader: {
        fontSize: 20,
        lineHeight: 1.2,
        bold: true,
        margin: [
          millimetresToPoints(zeroMillimeters),
          millimetresToPoints(tenMillimeters),
          millimetresToPoints(zeroMillimeters),
          millimetresToPoints(fiveMillimeters)
        ]
      },
      link: {
        decoration: 'underline',
        color: 'blue'
      },
      table: {
        fontSize: 10,
        margin: [
          zeroMillimeters,
          millimetresToPoints(fiveMillimeters),
          zeroMillimeters,
          millimetresToPoints(fiveMillimeters)
        ]
      },
      tableHeader: {
        fontSize: 12,
        lineHeight: 1.2,
        bold: true,
        margin: [
          zeroMillimeters,
          zeroMillimeters,
          zeroMillimeters,
          millimetresToPoints(fiveMillimeters)
        ]
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
        margin: [
          zeroMillimeters,
          millimetresToPoints(thirtyFiveMillimeters),
          zeroMillimeters,
          zeroMillimeters
        ]
      },
      separator: {
        margin: [
          zeroMillimeters,
          millimetresToPoints(tenMillimeters),
          zeroMillimeters,
          zeroMillimeters
        ]
      }
    })
  })
})
