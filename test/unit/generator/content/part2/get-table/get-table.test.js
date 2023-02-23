const getTable = require('../../../../../../app/generator/content/part2/get-table')
let mockStatement

describe('get table', () => {
  beforeEach(() => {
    mockStatement = JSON.parse(JSON.stringify(require('../../../../../mocks/statement-data')))
  })

  test('includes all table rows when five funding options and total row', () => {
    const result = getTable(mockStatement.funding)
    expect(result.table.body.length).toBe(6)
  })

  test('includes all table columns', () => {
    const result = getTable(mockStatement.funding)
    expect(result.table.body[0].length).toBe(8)
  })

  test('includes funding option', () => {
    const result = getTable(mockStatement.funding)
    expect(result.table.body[1][0]).toBe(mockStatement.funding[0].name)
  })

  test('includes funding level', () => {
    const result = getTable(mockStatement.funding)
    expect(result.table.body[1][1]).toBe(mockStatement.funding[0].level)
  })

  test('includes funding rate', () => {
    const result = getTable(mockStatement.funding)
    expect(result.table.body[1][2].text).toBe(mockStatement.funding[0].rate)
  })

  test('includes area', () => {
    const result = getTable(mockStatement.funding)
    expect(result.table.body[1][3].text).toBe(mockStatement.funding[0].area)
  })

  test('includes annual value', () => {
    const result = getTable(mockStatement.funding)
    expect(result.table.body[1][4].text).toBe(`£${mockStatement.funding[0].annualValue}`)
  })

  test('includes quarterly value', () => {
    const result = getTable(mockStatement.funding)
    expect(result.table.body[1][5].text).toBe(`£${mockStatement.funding[0].quarterlyValue}`)
  })

  test('includes quarterly reduction', () => {
    const result = getTable(mockStatement.funding)
    expect(result.table.body[1][6].text).toBe(`£${mockStatement.funding[0].quarterlyReduction}`)
  })

  test('includes quarterly payment', () => {
    const result = getTable(mockStatement.funding)
    expect(result.table.body[1][7].text).toBe(`£${mockStatement.funding[0].quarterlyPayment}`)
  })
})
