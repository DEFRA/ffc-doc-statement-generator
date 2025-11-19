const { millimetresToPoints } = require('../../../app/generator/conversion')

describe('millimetresToPoints', () => {
  test.each([
    [1, 2.835],
    [50, 141.75],
    [50.1, 142.0335],
    [50.14, 142.1469],
    [50.148, 142.16958],
    [50.1489438273, 142.1722557503955],
    [0.5, 1.4175],
    [0, 0],
    [-1, -2.835],
    ['1', 2.835],
    [1000000000, 2835000000],
    ['text', NaN]
  ])('converts %p millimetres to %p points', (input, expected) => {
    const result = millimetresToPoints(input)
    if (Number.isNaN(expected)) {
      expect(result).toBeNaN()
    } else {
      expect(result).toBe(expected)
    }
  })
})
