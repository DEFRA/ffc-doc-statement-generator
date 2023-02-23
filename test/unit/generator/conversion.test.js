const { millimetresToPoints } = require('../../../app/generator/conversion')

describe('millimetresToPoints', () => {
  test('converts millimetres to points when 1', () => {
    const result = millimetresToPoints(1)
    expect(result).toBe(2.835)
  })

  test('converts millimetres to points when integer', () => {
    const result = millimetresToPoints(50)
    expect(result).toBe(141.75)
  })

  test('converts millimetres to points when 1 decimal place', () => {
    const result = millimetresToPoints(50.1)
    expect(result).toBe(142.0335)
  })

  test('converts millimetres to points when 2 decimal places', () => {
    const result = millimetresToPoints(50.14)
    expect(result).toBe(142.1469)
  })

  test('converts millimetres to points when 3 decimal places', () => {
    const result = millimetresToPoints(50.148)
    expect(result).toBe(142.16958)
  })

  test('converts millimetres to points when 10 decimal places', () => {
    const result = millimetresToPoints(50.1489438273)
    expect(result).toBe(142.1722557503955)
  })

  test('converts millimetres to points when less than 1', () => {
    const result = millimetresToPoints(0.5)
    expect(result).toBe(1.4175)
  })

  test('converts millimetres to points when 0', () => {
    const result = millimetresToPoints(0)
    expect(result).toBe(0)
  })

  test('converts millimetres to points when -1', () => {
    const result = millimetresToPoints(-1)
    expect(result).toBe(-2.835)
  })

  test('returns NaN when not a number', () => {
    const result = millimetresToPoints('text')
    expect(result).toBe(NaN)
  })

  test('converts millimetres to points when number passed as text', () => {
    const result = millimetresToPoints('1')
    expect(result).toBe(2.835)
  })

  test('converts millimetres to points when large number', () => {
    const result = millimetresToPoints(1000000000)
    expect(result).toBe(2835000000)
  })
})
