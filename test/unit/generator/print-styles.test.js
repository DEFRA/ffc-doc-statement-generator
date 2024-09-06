const styles = require('../../../app/generator/print-styles')
const { millimetresToPoints } = require('../../../app/generator/conversion')

describe('Print Valid Styles - to pass through Notify Letter validation', () => {
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
        millimetresToPoints(0),
        millimetresToPoints(10),
        millimetresToPoints(0),
        millimetresToPoints(5)
      ]
    })
  })

  test('header2 style', () => {
    expect(styles.header2).toEqual({
      fontSize: 19,
      lineHeight: 1.2,
      bold: true,
      margin: [
        millimetresToPoints(0),
        millimetresToPoints(10),
        millimetresToPoints(0),
        millimetresToPoints(5)
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
        millimetresToPoints(0),
        millimetresToPoints(10),
        millimetresToPoints(0),
        millimetresToPoints(5)
      ]
    })
  })

  test('subTitle style', () => {
    expect(styles.subTitle).toEqual({
      fontSize: 19,
      lineHeight: 1.2,
      margin: [
        millimetresToPoints(0),
        millimetresToPoints(10),
        millimetresToPoints(0),
        millimetresToPoints(5)
      ]
    })
  })

  test('SFIAHeader style', () => {
    expect(styles.SFIAHeader).toEqual({
      fontSize: 20,
      lineHeight: 1.2,
      bold: true,
      margin: [
        millimetresToPoints(0),
        millimetresToPoints(10),
        millimetresToPoints(0),
        millimetresToPoints(5)
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
        millimetresToPoints(0),
        millimetresToPoints(5),
        millimetresToPoints(0),
        millimetresToPoints(5)
      ]
    })
  })

  test('tableHeader style', () => {
    expect(styles.tableHeader).toEqual({
      fontSize: 12,
      lineHeight: 1.2,
      bold: true,
      margin: [
        millimetresToPoints(0),
        millimetresToPoints(0),
        millimetresToPoints(0),
        millimetresToPoints(5)
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
      width: millimetresToPoints(200),
      height: millimetresToPoints(25)
    })
  })

  test('address style', () => {
    expect(styles.address).toEqual({
      margin: [
        millimetresToPoints(20),
        millimetresToPoints(10),
        millimetresToPoints(0),
        millimetresToPoints(0)
      ],
      fontSize: 8.5,
      width: millimetresToPoints(95.4),
      height: millimetresToPoints(26.8),
      lineHeight: 1
    })
  })

  test('notifyMargin style', () => {
    expect(styles.notifyMargin).toEqual({
      margin: [
        millimetresToPoints(0),
        millimetresToPoints(35),
        millimetresToPoints(0),
        millimetresToPoints(0)
      ]
    })
  })

  test('separator style', () => {
    expect(styles.separator).toEqual({
      margin: [
        millimetresToPoints(0),
        millimetresToPoints(10),
        millimetresToPoints(0),
        millimetresToPoints(0)
      ]
    })
  })
})
