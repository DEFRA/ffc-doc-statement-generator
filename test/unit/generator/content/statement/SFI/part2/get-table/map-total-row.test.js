const mapTotalRow = require('../../../../../../../../app/generator/content/statement/SFI/part3/get-table/map-total-row')
let totalRow
let reductions

describe('map total row', () => {
  beforeEach(() => {
    totalRow = JSON.parse(JSON.stringify(require('../../../../../../../mocks/mock-statement').funding.find(x => x.name === 'Total')))
    reductions = require('../../../../../../../mocks/reductions')
  })

  test('includes all table columns', () => {
    const result = mapTotalRow(totalRow, reductions)
    expect(result.length).toBe(8)
  })

  test('includes funding option', () => {
    const result = mapTotalRow(totalRow, reductions)
    expect(result[0].text).toBe(totalRow.name)
  })

  test('includes funding option in bold', () => {
    const result = mapTotalRow(totalRow, reductions)
    expect(result[0].bold).toBeTruthy()
  })

  test('includes funding level', () => {
    const result = mapTotalRow(totalRow, reductions)
    expect(result[1].text).toBe(totalRow.level)
  })

  test('includes funding level in bold', () => {
    const result = mapTotalRow(totalRow, reductions)
    expect(result[1].bold).toBeTruthy()
  })

  test('includes funding rate', () => {
    const result = mapTotalRow(totalRow, reductions)
    expect(result[2].text).toBe(totalRow.rate)
  })

  test('includes funding rate in bold', () => {
    const result = mapTotalRow(totalRow, reductions)
    expect(result[2].bold).toBeTruthy()
  })

  test('includes funding rate style', () => {
    const result = mapTotalRow(totalRow, reductions)
    expect(result[2].style).toBe('tableNumber')
  })

  test('includes area', () => {
    const result = mapTotalRow(totalRow, reductions)
    expect(result[3].text).toBe(totalRow.area)
  })

  test('includes area in bold', () => {
    const result = mapTotalRow(totalRow, reductions)
    expect(result[3].bold).toBeTruthy()
  })

  test('includes area with style number', () => {
    const result = mapTotalRow(totalRow, reductions)
    expect(result[3].style).toBe('tableNumber')
  })

  test('includes annual value', () => {
    const result = mapTotalRow(totalRow, reductions)
    expect(result[4].text).toBe('£1,318.60')
  })

  test('includes annual value in bold', () => {
    const result = mapTotalRow(totalRow, reductions)
    expect(result[4].bold).toBeTruthy()
  })

  test('includes annual value with style number', () => {
    const result = mapTotalRow(totalRow, reductions)
    expect(result[4].style).toBe('tableNumber')
  })

  test('includes quarterly value', () => {
    const result = mapTotalRow(totalRow, reductions)
    expect(result[5].text).toBe(`£${totalRow.quarterlyValue}`)
  })

  test('includes quarterly value in bold', () => {
    const result = mapTotalRow(totalRow, reductions)
    expect(result[5].bold).toBeTruthy()
  })

  test('includes quarterly value with style number', () => {
    const result = mapTotalRow(totalRow, reductions)
    expect(result[5].style).toBe('tableNumber')
  })

  test('includes quarterly reduction', () => {
    const result = mapTotalRow(totalRow, reductions)
    expect(result[6].text).toBe(`£${totalRow.quarterlyReduction}`)
  })

  test('includes quarterly reduction in bold', () => {
    const result = mapTotalRow(totalRow, reductions)
    expect(result[6].bold).toBeTruthy()
  })

  test('includes quarterly reduction with style number', () => {
    const result = mapTotalRow(totalRow, reductions)
    expect(result[6].style).toBe('tableNumber')
  })

  test('includes quarterly payment', () => {
    const result = mapTotalRow(totalRow, reductions)
    expect(result[7].text).toBe(`£${totalRow.quarterlyPayment}`)
  })

  test('includes quarterly payment in bold', () => {
    const result = mapTotalRow(totalRow, reductions)
    expect(result[7].bold).toBeTruthy()
  })

  test('includes quarterly payment with style number', () => {
    const result = mapTotalRow(totalRow, reductions)
    expect(result[7].style).toBe('tableNumber')
  })
})
