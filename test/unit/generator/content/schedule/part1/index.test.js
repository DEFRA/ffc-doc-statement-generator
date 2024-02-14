const part1 = require('../../../../../../app/generator/content/schedule/part1')

const { topUpSchedule } = require('../../../../../mocks/mock-schedule')

describe('schedule Part 1', () => {
  test('header style is set to header3', () => {
    const result = part1(topUpSchedule)
    expect(result.stack[0].style).toBe('header3')
  })

  test('includes unbreakable instruction', () => {
    const result = part1(topUpSchedule)
    expect(result.unbreakable).toBeTruthy()
  })
})
