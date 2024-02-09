const getReductionDescription = require('../../../../../../app/generator/content/schedule/part2/get-reduction-description')

const { reductionSchedule } = require('../../../../../mocks/mock-schedule')

describe('Get reduction description', () => {
  test('should return an object', () => {
    const result = getReductionDescription(reductionSchedule)
    expect(result).toBeInstanceOf(Object)
  })

  test('should return an object with 2 keys', () => {
    const result = getReductionDescription(reductionSchedule)
    expect(Object.keys(result)).toHaveLength(2)
  })

  test('should return an object with keys ["stack", "unbreakable"]', () => {
    const result = getReductionDescription(reductionSchedule)
    expect(Object.keys(result)).toStrictEqual(['stack', 'unbreakable'])
  })

  test('should return an true for key unbreakable', () => {
    const result = getReductionDescription(reductionSchedule)
    expect(result.unbreakable).toBe(true)
  })

  test('should return an array for key stack', () => {
    const result = getReductionDescription(reductionSchedule)
    expect(Array.isArray(result.stack)).toBe(true)
  })

  test('should return an array of length 4 for key stack', () => {
    const result = getReductionDescription(reductionSchedule)
    expect(result.stack).toHaveLength(4)
  })

  test('should return "\n\nWe recently sent you a letter to tell you the annual value of your reductionSchedule.scheme.name reductionSchedule.scheme.shortName agreement has decreased." for key stack 1 entry', () => {
    const result = getReductionDescription(reductionSchedule)
    expect(result.stack[0]).toBe(`The annual value of your ${reductionSchedule.scheme.name} (${reductionSchedule.scheme.shortName}) agreement has decreased.`)
  })

  test('should return "\nThe payment schedule sets out the payments you\'ll receive for the rest of the current scheme year.\n" for key stack 2 entry', () => {
    const result = getReductionDescription(reductionSchedule)
    expect(result.stack[1]).toBe('\nThe payment schedule sets out the payments you\'ll receive for the rest of the current scheme year.\n')
  })

  test('should return "\nPayments you\'ll receive will:\n\n" for key stack 3 entry', () => {
    const result = getReductionDescription(reductionSchedule)
    expect(result.stack[2]).toBe('\nPayments you\'ll receive will:\n\n')
  })

  test('should return "{ ul: ["take account of money you\'ve already been paid", "be paid to you in equal amounts over the remaining quarters for this scheme year"], listStyle: "square" }" for key stack 4 entry', () => {
    const result = getReductionDescription(reductionSchedule)
    expect(result.stack[3]).toStrictEqual({ ul: ['take account of money you\'ve already been paid', 'be paid to you in equal amounts over the remaining quarters for this scheme year'], listStyle: 'square' })
  })
})
