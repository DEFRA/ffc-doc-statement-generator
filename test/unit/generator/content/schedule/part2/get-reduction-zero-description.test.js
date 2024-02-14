const getReductionZeroDescription = require('../../../../../../app/generator/content/schedule/part2/get-reduction-zero-description')

const { reductionZeroSchedule } = require('../../../../../mocks/mock-schedule')

describe('Get reduction zero description', () => {
  test('should return an object', () => {
    const result = getReductionZeroDescription(reductionZeroSchedule)
    expect(result).toBeInstanceOf(Object)
  })

  test('should return an object with 2 keys', () => {
    const result = getReductionZeroDescription(reductionZeroSchedule)
    expect(Object.keys(result)).toHaveLength(2)
  })

  test('should return an object with keys ["stack", "unbreakable"]', () => {
    const result = getReductionZeroDescription(reductionZeroSchedule)
    expect(Object.keys(result)).toStrictEqual(['stack', 'unbreakable'])
  })

  test('should return an true for key unbreakable', () => {
    const result = getReductionZeroDescription(reductionZeroSchedule)
    expect(result.unbreakable).toBe(true)
  })

  test('should return an array for key stack', () => {
    const result = getReductionZeroDescription(reductionZeroSchedule)
    expect(Array.isArray(result.stack)).toBe(true)
  })

  test('should return an array of length 4 for key stack', () => {
    const result = getReductionZeroDescription(reductionZeroSchedule)
    expect(result.stack).toHaveLength(2)
  })

  test('should return "\n\nWe recently sent you a letter to tell you the annual value of your reductionZeroSchedule.scheme.name reductionZeroSchedule.scheme.shortName agreement has decreased." for key stack 1 entry', () => {
    const result = getReductionZeroDescription(reductionZeroSchedule)
    expect(result.stack[0]).toBe(`The annual value of your ${reductionZeroSchedule.scheme.name} (${reductionZeroSchedule.scheme.shortName}) agreement has decreased.`)
  })

  test('should return "\nYour payment schedule below has been revised to show the decrease. You have already been paid the full amount for the new agreement. You\'ll not receive a payment for the remaining quarter(s)." for key stack 2 entry', () => {
    const result = getReductionZeroDescription(reductionZeroSchedule)
    expect(result.stack[1]).toBe('\nYour payment schedule below has been revised to show the decrease. You have already been paid the full amount for the new agreement. You\'ll not receive a payment for the remaining quarter(s).')
  })
})
