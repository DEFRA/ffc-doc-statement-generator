const toCurrencyString = require('../../../app/generator/to-currency-string')

describe('toCurrencyString', () => {
  const testCases = [
    { input: '0.00', expected: '£0.00' },
    { input: '0.01', expected: '£0.01' },
    { input: '0.12', expected: '£0.12' },
    { input: '1.23', expected: '£1.23' },
    { input: '12.34', expected: '£12.34' },
    { input: '123.45', expected: '£123.45' },
    { input: '1234', expected: '£1,234' },
    { input: '1234.5', expected: '£1,234.50' },
    { input: '1234.56', expected: '£1,234.56' },
    { input: '12345.67', expected: '£12,345.67' },
    { input: '123456.78', expected: '£123,456.78' },
    { input: '1234567.89', expected: '£1,234,567.89' },
    { input: '12345678.90', expected: '£12,345,678.90' },
    { input: '123456789.01', expected: '£123,456,789.01' },
    { input: '1234567890.12', expected: '£1,234,567,890.12' },
    { input: '12345678901.23', expected: '£12,345,678,901.23' },
    { input: '123456789012.34', expected: '£123,456,789,012.34' },
  ]

  testCases.forEach(({ input, expected }) => {
    test(`converts "${input}" to "${expected}"`, () => {
      expect(toCurrencyString(input)).toBe(expected)
    })
  })

  test('throws error when value is not a number', () => {
    expect(() => toCurrencyString('abc')).toThrow('Currency value is not a number')
  })
})
