const toCurrencyString = require('../../../../../../app/generator/to-currency-string')
const { recoverySchedule } = require('../../../../../mocks/mock-schedule')

const getRecoverySummary = require('../../../../../../app/generator/content/schedule/part3/get-recovery-summary')

describe('Get recovery summary', () => {
  test('should return an object', () => {
    const result = getRecoverySummary(recoverySchedule)
    expect(result).toBeInstanceOf(Object)
  })

  test('should return an object with 1 key', () => {
    const result = getRecoverySummary(recoverySchedule)
    expect(Object.keys(result)).toHaveLength(1)
  })

  test('should return an object with keys ["stack"]', () => {
    const result = getRecoverySummary(recoverySchedule)
    expect(Object.keys(result)).toStrictEqual(['stack'])
  })

  test('should return an array for key stack', () => {
    const result = getRecoverySummary(recoverySchedule)
    expect(Array.isArray(result.stack)).toBe(true)
  })

  test('should return an array of length 2 for key stack', () => {
    const result = getRecoverySummary(recoverySchedule)
    expect(result.stack).toHaveLength(2)
  })

  test('should return "The table below shows your revised quarterly payments.\n\n" for key stack 1 entry', () => {
    const result = getRecoverySummary(recoverySchedule)
    expect(result.stack[0]).toBe('The table below shows your revised quarterly payments.\n\n')
  })

  test('should return an object for key stack 2 entry', () => {
    const result = getRecoverySummary(recoverySchedule)
    expect(result.stack[1]).toBeInstanceOf(Object)
  })

  test('should return an object with 2 keys for key stack 2 entry', () => {
    const result = getRecoverySummary(recoverySchedule)
    expect(Object.keys(result.stack[1])).toHaveLength(2)
  })

  test('should return an object with keys ["layout", "table"] for key stack 2 entry', () => {
    const result = getRecoverySummary(recoverySchedule)
    expect(Object.keys(result.stack[1])).toStrictEqual(['layout', 'table'])
  })

  test('should return an object for key stack[1].layout', () => {
    const result = getRecoverySummary(recoverySchedule)
    expect(result.stack[1].layout).toBeInstanceOf(Object)
  })

  test('should return an object with 2 keys for key stack[1].layout', () => {
    const result = getRecoverySummary(recoverySchedule)
    expect(Object.keys(result.stack[1].layout)).toHaveLength(2)
  })

  test('should return an object with keys ["hLineStyle", "vLineStyle"] for key stack[1].layout', () => {
    const result = getRecoverySummary(recoverySchedule)
    expect(Object.keys(result.stack[1].layout)).toStrictEqual(['hLineStyle', 'vLineStyle'])
  })

  test('should return a function for key stack[1].layout.hLineStyle', () => {
    const result = getRecoverySummary(recoverySchedule)
    expect(typeof result.stack[1].layout.hLineStyle).toBe('function')
  })

  test('should return "solid" for key stack[1].layout.hLineStyle()', () => {
    const result = getRecoverySummary(recoverySchedule)
    expect(result.stack[1].layout.hLineStyle()).toBe('solid')
  })

  test('should return a function for key stack[1].layout.vLineStyle', () => {
    const result = getRecoverySummary(recoverySchedule)
    expect(typeof result.stack[1].layout.vLineStyle).toBe('function')
  })

  test('should return "solid" for key stack[1].layout.vLineStyle()', () => {
    const result = getRecoverySummary(recoverySchedule)
    expect(result.stack[1].layout.vLineStyle()).toBe('solid')
  })

  test('should return an object for key stack[1].table', () => {
    const result = getRecoverySummary(recoverySchedule)
    expect(result.stack[1].table).toBeInstanceOf(Object)
  })

  test('should return an object with 2 keys for key stack[1].table', () => {
    const result = getRecoverySummary(recoverySchedule)
    expect(Object.keys(result.stack[1].table)).toHaveLength(2)
  })

  test('should return an object with keys ["widths", "body"] for key stack[1].table', () => {
    const result = getRecoverySummary(recoverySchedule)
    expect(Object.keys(result.stack[1].table)).toStrictEqual(['widths', 'body'])
  })

  test('should return an array for key stack[1].table.widths', () => {
    const result = getRecoverySummary(recoverySchedule)
    expect(Array.isArray(result.stack[1].table.widths)).toBe(true)
  })

  test('should return an array of length 1 for key stack[1].table.widths', () => {
    const result = getRecoverySummary(recoverySchedule)
    expect(result.stack[1].table.widths).toHaveLength(1)
  })

  test('should return "*" for key stack[1].table.widths 1 entry', () => {
    const result = getRecoverySummary(recoverySchedule)
    expect(result.stack[1].table.widths[0]).toBe('*')
  })

  test('should return an array for key stack[1].table.body', () => {
    const result = getRecoverySummary(recoverySchedule)
    expect(Array.isArray(result.stack[1].table.body)).toBe(true)
  })

  test('should return an array of length 1 for key stack[1].table.body', () => {
    const result = getRecoverySummary(recoverySchedule)
    expect(result.stack[1].table.body).toHaveLength(1)
  })

  test('should return an array for key stack[1].table.body 1 entry', () => {
    const result = getRecoverySummary(recoverySchedule)
    expect(Array.isArray(result.stack[1].table.body[0])).toBe(true)
  })

  test('should return an object for key stack[1].table.body[0] 1 entry', () => {
    const result = getRecoverySummary(recoverySchedule)
    expect(result.stack[1].table.body[0][0]).toBeInstanceOf(Object)
  })

  test('should return an object with 1 key for key stack[1].table.body[0] 1 entry', () => {
    const result = getRecoverySummary(recoverySchedule)
    expect(Object.keys(result.stack[1].table.body[0][0])).toHaveLength(1)
  })

  test('should return an object with keys ["stack"] for key stack[1].table.body[0] 1 entry', () => {
    const result = getRecoverySummary(recoverySchedule)
    expect(Object.keys(result.stack[1].table.body[0][0])).toStrictEqual(['stack'])
  })

  test('should return an array for key stack[1].table.body[0][0].stack', () => {
    const result = getRecoverySummary(recoverySchedule)
    expect(Array.isArray(result.stack[1].table.body[0][0].stack)).toBe(true)
  })

  test('should return an array of length  6 for key stack[1].table.body[0][0].stack', () => {
    const result = getRecoverySummary(recoverySchedule)
    expect(result.stack[1].table.body[0][0].stack).toHaveLength(6)
  })

  test('should return "Current agreement value: recoverySchedule.adjustment.currentValue\n" for key stack[1].table.body[0][0].stack line 1 entry', () => {
    const result = getRecoverySummary(recoverySchedule)
    expect(result.stack[1].table.body[0][0].stack[0]).toBe(`Current agreement value: ${toCurrencyString(recoverySchedule.adjustment.currentValue)}\n`)
  })

  test('should return "Reduction: recoverySchedule.adjustment.adjustmentValue" for key stack[1].table.body[0][0].stack line 2 entry', () => {
    const result = getRecoverySummary(recoverySchedule)
    expect(result.stack[1].table.body[0][0].stack[1]).toBe(`Reduction: ${toCurrencyString(String(Math.abs(recoverySchedule.adjustment.adjustmentValue)))}\n`)
  })

  test('should return "New agreement value: recoverySchedule.adjustment.newValue\n" for key stack[1].table.body[0][0].stack line 3 entry', () => {
    const result = getRecoverySummary(recoverySchedule)
    expect(result.stack[1].table.body[0][0].stack[2]).toBe(`New agreement value: ${toCurrencyString(recoverySchedule.adjustment.newValue)}\n`)
  })

  test('should return "Total payments recived: recoverySchedule.adjustment.newValue - recoverySchedule.remainingAmount" for key stack[1].table.body[0][0].stack line 4 entry', () => {
    const result = getRecoverySummary(recoverySchedule)
    expect(result.stack[1].table.body[0][0].stack[3]).toBe(`Total payments received: ${toCurrencyString(String(recoverySchedule.adjustment.newValue - recoverySchedule.remainingAmount))}\n`)
  })

  test('should return "Remaining Balance: recoverySchedule.remainingAmount" for key stack[1].table.body[0][0].stack line 5 entry', () => {
    const result = getRecoverySummary(recoverySchedule)
    expect(result.stack[1].table.body[0][0].stack[4]).toBe(`Recovery payment due: ${toCurrencyString(String(Math.abs(recoverySchedule.remainingAmount)))}`)
  })

  test('should return "\nAn invoice for recoverySchedule.remainingAmount is included with this email" for key stack[1].table.body[0][0].stack line 6 entry', () => {
    const result = getRecoverySummary(recoverySchedule)
    expect(result.stack[1].table.body[0][0].stack[5]).toBe(`\nAn invoice for ${toCurrencyString(String(Math.abs(recoverySchedule.remainingAmount)))} is included with this email`)
  })
})
