const styles = require('../../../app/generator/print-styles')
const { millimetresToPoints } = require('../../../app/generator/conversion')

describe('Print Styles', () => {
  const zeroMillimeters = 0
  const topBottomMargin = 5
  const topMargin = 10
  const logoHeight = 25
  const notifyTopMargin = 35
  const logoWidth = 200
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
        millimetresToPoints(topMargin),
        millimetresToPoints(zeroMillimeters),
        millimetresToPoints(topBottomMargin)
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
        millimetresToPoints(topMargin),
        millimetresToPoints(zeroMillimeters),
        millimetresToPoints(topBottomMargin)
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
        millimetresToPoints(topMargin),
        millimetresToPoints(zeroMillimeters),
        millimetresToPoints(topBottomMargin)
      ]
    })
  })

  test('subTitle style', () => {
    expect(styles.subTitle).toEqual({
      fontSize: 19,
      lineHeight: 1.2,
      margin: [
        millimetresToPoints(zeroMillimeters),
        millimetresToPoints(topMargin),
        millimetresToPoints(zeroMillimeters),
        millimetresToPoints(topBottomMargin)
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
        millimetresToPoints(topMargin),
        millimetresToPoints(zeroMillimeters),
        millimetresToPoints(topBottomMargin)
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
        millimetresToPoints(topBottomMargin),
        zeroMillimeters,
        millimetresToPoints(topBottomMargin)
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
        millimetresToPoints(topBottomMargin)
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
      width: millimetresToPoints(logoWidth),
      height: millimetresToPoints(logoHeight)
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
        millimetresToPoints(notifyTopMargin),
        zeroMillimeters,
        zeroMillimeters
      ]
    })
  })

  test('separator style', () => {
    expect(styles.separator).toEqual({
      margin: [
        zeroMillimeters,
        millimetresToPoints(topMargin),
        zeroMillimeters,
        zeroMillimeters
      ]
    })
  })
})
