const part2 = require('../../../../../../app/generator/content/schedule/part2')

const { topUpSchedule, reductionSchedule } = require('../../../../../mocks/mock-schedule')

describe('schedule part 2', () => {
  describe('Get top-up description', () => {
    test('should include 1st paragraph', () => {
      const result = part2(topUpSchedule)
      expect(result.stack[0]).toEqual(`The annual value of your ${topUpSchedule.scheme.name} (${topUpSchedule.scheme.shortName}) agreement has increased.`)
    })

    test('should include 2nd paragraph', () => {
      const result = part2(topUpSchedule)
      expect(result.stack[1]).toEqual('\nThe payment schedule sets out the payments you\'ll receive for the rest of the current scheme year.\n')
    })

    test('should include 3rd paragraph', () => {
      const result = part2(topUpSchedule)
      expect(result.stack[2]).toEqual('\nThe new annual value of your agreement will be split equally between 4 quarterly payments for the year. You may receive either or both of the following:\n\n')
    })

    test('should be unbreakable', () => {
      const result = part2(topUpSchedule)
      expect(result.unbreakable).toBeTruthy()
    })
  })

  describe('Get reduction description', () => {
    test('should include 1st paragraph', () => {
      const result = part2(reductionSchedule)
      expect(result.stack[0]).toEqual(`The annual value of your ${reductionSchedule.scheme.name} (${reductionSchedule.scheme.shortName}) agreement has decreased.`)
    })

    test('should include 2nd paragraph', () => {
      const result = part2(reductionSchedule)
      expect(result.stack[1]).toEqual('\nThe payment schedule sets out the payments you\'ll receive for the rest of the current scheme year.\n')
    })

    test('should include 3rd paragraph', () => {
      const result = part2(reductionSchedule)
      expect(result.stack[2]).toEqual('\nPayments you\'ll receive will:\n\n')
    })

    test('should be unbreakable', () => {
      const result = part2(reductionSchedule)
      expect(result.unbreakable).toBeTruthy()
    })
  })
})
