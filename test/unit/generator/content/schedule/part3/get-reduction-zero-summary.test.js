const toCurrencyString = require('../../../../../../app/generator/to-currency-string')
const getReductionZeroSummary = require('../../../../../../app/generator/content/schedule/part3/get-reduction-zero-summary')

const { reductionZeroSchedule } = require('../../../../../mocks/mock-schedule')

describe('Get reduction zero summary', () => {
  test('should return "The table below shows your revised quarterly payments.\n\n" for key stack 1 entry', () => {
    const result = getReductionZeroSummary(reductionZeroSchedule)
    expect(result.stack[0]).toBe('The table below shows your revised quarterly payments.\n\n')
  })

  test('should use solid line style for grid', () => {
    const result = getReductionZeroSummary(reductionZeroSchedule)
    expect(result.stack[1].layout.hLineStyle()).toBe('solid')
    expect(result.stack[1].layout.vLineStyle()).toBe('solid')
  })

  test('should return "Current agreement value: reductionZeroSchedule.adjustment.currentValue\n" for key stack 2 line 1` entry', () => {
    const result = getReductionZeroSummary(reductionZeroSchedule)
    expect(result.stack[1].table.body[0][0].stack[0]).toBe(`Current agreement value: ${toCurrencyString(reductionZeroSchedule.adjustment.currentValue)}\n`)
  })

  test('should return "Reduction: reductionZeroSchedule.adjustment.adjustmentValue" for key stack 2 line 2 entry', () => {
    const result = getReductionZeroSummary(reductionZeroSchedule)
    expect(result.stack[1].table.body[0][0].stack[1]).toBe(`Reduction: ${toCurrencyString(String(Math.abs(reductionZeroSchedule.adjustment.adjustmentValue)))}\n`)
  })

  test('should return "New agreement value: reductionZeroSchedule.adjustment.newValue\n" for key stack 2 line 3 entry', () => {
    const result = getReductionZeroSummary(reductionZeroSchedule)
    expect(result.stack[1].table.body[0][0].stack[2]).toBe(`New agreement value: ${toCurrencyString(reductionZeroSchedule.adjustment.newValue)}\n`)
  })

  test('should return "Total payments recived: reductionZeroSchedule.adjustment.adjustmentValue" for key stack 2 line 4 entry', () => {
    const result = getReductionZeroSummary(reductionZeroSchedule)
    expect(result.stack[1].table.body[0][0].stack[3]).toBe(`Total payments recived: ${toCurrencyString(reductionZeroSchedule.adjustment.newValue)}\n`)
  })

  test('should return "Remaining Balance: reductionZeroSchedule.remainingAmount" for key stack 2 line 5 entry', () => {
    const result = getReductionZeroSummary(reductionZeroSchedule)
    expect(result.stack[1].table.body[0][0].stack[4]).toBe(`Remaining balance: ${toCurrencyString(String(reductionZeroSchedule.remainingAmount))}`)
  })
})
