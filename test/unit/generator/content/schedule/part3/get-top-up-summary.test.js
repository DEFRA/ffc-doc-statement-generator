const toCurrencyString = require('../../../../../../app/generator/to-currency-string')
const getTopUpSummary = require('../../../../../../app/generator/content/schedule/part3/get-top-up-summary')
const { topUpAdjustment } = require('../../../../../mocks/objects/adjustment')

describe('Get top-up summary', () => {
  test('should return "The table below shows your revised payments." for key stack 1 entry', () => {
    const result = getTopUpSummary(topUpAdjustment)
    expect(result.stack[0]).toBe('The table below shows your revised payments.\n\n')
  })

  test('should use solid line style for grid', () => {
    const result = getTopUpSummary(topUpAdjustment)
    expect(result.stack[1].layout.hLineStyle()).toBe('solid')
    expect(result.stack[1].layout.vLineStyle()).toBe('solid')
  })

  test('should return "Current agreement value: topUpAdjustment.currentValue\n" for key stack 2 line 1` entry', () => {
    const result = getTopUpSummary(topUpAdjustment)
    expect(result.stack[1].table.body[0][0].stack[0]).toEqual(`Current agreement value: ${toCurrencyString(topUpAdjustment.currentValue)}\n`)
  })

  test('should return "New agreement value: topUpAdjustment.newValue\n" for key stack 2 line 2 entry', () => {
    const result = getTopUpSummary(topUpAdjustment)
    expect(result.stack[1].table.body[0][0].stack[1]).toEqual(`New agreement value: ${toCurrencyString(topUpAdjustment.newValue)}\n`)
  })

  test('should return "Top up amount: topUpAdjustment.adjustmentValue\n" for key stack 2 line 3 entry', () => {
    const result = getTopUpSummary(topUpAdjustment)
    expect(result.stack[1].table.body[0][0].stack[2]).toEqual(`Top up amount: ${toCurrencyString(topUpAdjustment.adjustmentValue)}\n`)
  })
})
