const getTopUpDescription = require('../../../../../../app/generator/content/schedule/part2/get-top-up-description')

const { topUpSchedule } = require('../../../../../mocks/mock-schedule')

describe('Get top-up description', () => {
  test('should return an object', () => {
    const result = getTopUpDescription(topUpSchedule)
    expect(result).toBeInstanceOf(Object)
  })

  test('should return an object with 2 keys', () => {
    const result = getTopUpDescription(topUpSchedule)
    expect(Object.keys(result)).toHaveLength(2)
  })

  test('should return an object with keys ["stack", "unbreakable"]', () => {
    const result = getTopUpDescription(topUpSchedule)
    expect(Object.keys(result)).toStrictEqual(['stack', 'unbreakable'])
  })

  test('should return an true for key unbreakable', () => {
    const result = getTopUpDescription(topUpSchedule)
    expect(result.unbreakable).toBe(true)
  })

  test('should return an array for key stack', () => {
    const result = getTopUpDescription(topUpSchedule)
    expect(Array.isArray(result.stack)).toBe(true)
  })

  test('should return an array of length 4 for key stack', () => {
    const result = getTopUpDescription(topUpSchedule)
    expect(result.stack).toHaveLength(4)
  })

  test('should return "The annual value of your topUpSchedule.scheme.name} (topUpSchedule.scheme.shortName) agreement has increased." for key stack 1 entry', () => {
    const result = getTopUpDescription(topUpSchedule)
    expect(result.stack[0]).toBe(`The annual value of your ${topUpSchedule.scheme.name} (${topUpSchedule.scheme.shortName}) agreement has increased.`)
  })

  test('should return "\nThe payment schedule sets out the payments youll receive for the rest of the current scheme year.\n" for key stack 2 entry', () => {
    const result = getTopUpDescription(topUpSchedule)
    expect(result.stack[1]).toBe('\nThe payment schedule sets out the payments you\'ll receive for the rest of the current scheme year.\n')
  })

  test('should return "\nThe new annual value of your agreement will be split equally between 4 quarterly payments for the year. You may receive either or both of the following:\n\n" for key stack 3 entry', () => {
    const result = getTopUpDescription(topUpSchedule)
    expect(result.stack[2]).toBe('\nThe new annual value of your agreement will be split equally between 4 quarterly payments for the year. You may receive either or both of the following:\n\n')
  })

  test('should return "{ ul: ["an immediate payment - this is a one-off amount which will be a top-up to any quarterly payments youve already received for this scheme year", "an increase to quarterly payments youve not yet received"], listStyle: "square" }" for key stack 4 entry', () => {
    const result = getTopUpDescription(topUpSchedule)
    expect(result.stack[3]).toStrictEqual({ ul: ['an immediate payment - this is a one-off amount which will be a top-up to any quarterly payments you\'ve already received for this scheme year', 'an increase to quarterly payments you\'ve not yet received'], listStyle: 'square' })
  })
})
