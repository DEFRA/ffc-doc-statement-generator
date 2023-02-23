const toCurrencyString = require('../../../app/generator/to-currency-string')

describe('to currency string', () => {
  test('converts number to currency string', () => {
    expect(toCurrencyString('1234.56')).toBe('£1,234.56')
  })

  test('converts number to currency string with no decimal places', () => {
    expect(toCurrencyString('1234')).toBe('£1,234.00')
  })

  test('converts number to currency string with one decimal place', () => {
    expect(toCurrencyString('1234.5')).toBe('£1,234.50')
  })

  test('converts number to currency string when less than 1000', () => {
    expect(toCurrencyString('123.45')).toBe('£123.45')
  })

  test('converts number to currency string when less than 100', () => {
    expect(toCurrencyString('12.34')).toBe('£12.34')
  })

  test('converts number to currency string when less than 10', () => {
    expect(toCurrencyString('1.23')).toBe('£1.23')
  })

  test('converts number to currency string when less than 1', () => {
    expect(toCurrencyString('0.12')).toBe('£0.12')
  })

  test('converts number to currency string when less than 0.1', () => {
    expect(toCurrencyString('0.01')).toBe('£0.01')
  })

  test('converts number to currency string when 0', () => {
    expect(toCurrencyString('0.00')).toBe('£0.00')
  })

  test('converts number to currency string when greater than 10000', () => {
    expect(toCurrencyString('12345.67')).toBe('£12,345.67')
  })

  test('converts number to currency string when greater than 100000', () => {
    expect(toCurrencyString('123456.78')).toBe('£123,456.78')
  })

  test('converts number to currency string when greater than 1000000', () => {
    expect(toCurrencyString('1234567.89')).toBe('£1,234,567.89')
  })

  test('converts number to currency string when greater than 10000000', () => {
    expect(toCurrencyString('12345678.90')).toBe('£12,345,678.90')
  })

  test('converts number to currency string when greater than 100000000', () => {
    expect(toCurrencyString('123456789.01')).toBe('£123,456,789.01')
  })

  test('converts number to currency string when greater than 1000000000', () => {
    expect(toCurrencyString('1234567890.12')).toBe('£1,234,567,890.12')
  })

  test('converts number to currency string when greater than 10000000000', () => {
    expect(toCurrencyString('12345678901.23')).toBe('£12,345,678,901.23')
  })

  test('converts number to currency string when greater than 100000000000', () => {
    expect(toCurrencyString('123456789012.34')).toBe('£123,456,789,012.34')
  })
})
