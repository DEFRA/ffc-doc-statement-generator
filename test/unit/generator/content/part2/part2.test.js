const part2 = require('../../../../../app/generator/content/part2')
let mockStatement

describe('generate part 2', () => {
  beforeEach(() => {
    mockStatement = JSON.parse(JSON.stringify(require('../../../../mocks/statement-data')))
  })

  test('includes header', () => {
    const result = part2(mockStatement)
    expect(result.stack[0].text).toBe('Part 2. Calculation')
  })

  test('includes header style', () => {
    const result = part2(mockStatement)
    expect(result.stack[0].style).toBe('header2')
  })

  test('includes introduction with scheme short name', () => {
    const result = part2(mockStatement)
    expect(result.stack[1].text).toBe(`We calculated the total ${mockStatement.scheme.shortName} payment amount by adding together payments for all the standards which are part of your agreement, as shown in this table.`)
  })

  test('includes all table rows with five funding options and total row', () => {
    const result = part2(mockStatement)
    expect(result.stack[2].table.body.length).toBe(6)
  })

  test('includes all table columns', () => {
    const result = part2(mockStatement)
    expect(result.stack[2].table.body[0].length).toBe(8)
  })

  test('includes funding option', () => {
    const result = part2(mockStatement)
    expect(result.stack[2].table.body[1][0]).toBe(mockStatement.funding[0].name)
  })

  test('includes funding level', () => {
    const result = part2(mockStatement)
    expect(result.stack[2].table.body[1][1]).toBe(mockStatement.funding[0].level)
  })

  test('includes funding rate', () => {
    const result = part2(mockStatement)
    expect(result.stack[2].table.body[1][2].text).toBe(mockStatement.funding[0].rate)
  })

  test('includes area', () => {
    const result = part2(mockStatement)
    expect(result.stack[2].table.body[1][3].text).toBe(mockStatement.funding[0].area)
  })

  test('includes annual value', () => {
    const result = part2(mockStatement)
    expect(result.stack[2].table.body[1][4].text).toBe(`£${mockStatement.funding[0].annualValue}`)
  })

  test('includes quarterly value', () => {
    const result = part2(mockStatement)
    expect(result.stack[2].table.body[1][5].text).toBe(`£${mockStatement.funding[0].quarterlyValue}`)
  })

  test('includes quarterly reduction', () => {
    const result = part2(mockStatement)
    expect(result.stack[2].table.body[1][6].text).toBe(`£${mockStatement.funding[0].quarterlyReduction}`)
  })

  test('includes quarterly payment', () => {
    const result = part2(mockStatement)
    expect(result.stack[2].table.body[1][7].text).toBe(`£${mockStatement.funding[0].quarterlyPayment}`)
  })

  test('includes all help text lines', () => {
    const result = part2(mockStatement)
    expect(result.stack[3].text.length).toBe(3)
  })

  test('includes help text introduction', () => {
    const result = part2(mockStatement)
    expect(result.stack[3].text[0]).toBe('You can check which land parcels are part of each standard in the Rural Payments service at ')
  })

  test('includes help text link', () => {
    const result = part2(mockStatement)
    expect(result.stack[3].text[1].link).toBe('https://www.gov.uk/claim-rural-payments')
    expect(result.stack[3].text[1].style).toBe('link')
  })

  test('includes help text full stop', () => {
    const result = part2(mockStatement)
    expect(result.stack[3].text[2]).toBe('.')
  })

  test('includes unbreakable instruction', () => {
    const result = part2(mockStatement)
    expect(result.unbreakable).toBeTruthy()
  })
})
