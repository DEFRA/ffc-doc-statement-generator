const getRecoveryDescription = require('../../../../../../app/generator/content/schedule/part2/get-recovery-description')

const { recoverySchedule } = require('../../../../../mocks/mock-schedule')

describe('Get recovery description', () => {
  test('should return an object', () => {
    const result = getRecoveryDescription(recoverySchedule)
    expect(result).toBeInstanceOf(Object)
  })

  test('should return an object with 2 keys', () => {
    const result = getRecoveryDescription(recoverySchedule)
    expect(Object.keys(result)).toHaveLength(2)
  })

  test('should return an object with keys ["stack", "unbreakable"]', () => {
    const result = getRecoveryDescription(recoverySchedule)
    expect(Object.keys(result)).toStrictEqual(['stack', 'unbreakable'])
  })

  test('should return an true for key unbreakable', () => {
    const result = getRecoveryDescription(recoverySchedule)
    expect(result.unbreakable).toBe(true)
  })

  test('should return an array for key stack', () => {
    const result = getRecoveryDescription(recoverySchedule)
    expect(Array.isArray(result.stack)).toBe(true)
  })

  test('should return an array of length 2 for key stack', () => {
    const result = getRecoveryDescription(recoverySchedule)
    expect(result.stack).toHaveLength(2)
  })

  test('should return "\nThe annual value of your recoverySchedule.scheme.name (recoverySchedule.scheme.shortName) agreement has decreased." for key stack 1 entry', () => {
    const result = getRecoveryDescription(recoverySchedule)
    expect(result.stack[0]).toBe(`The annual value of your ${recoverySchedule.scheme.name} (${recoverySchedule.scheme.shortName}) agreement has decreased.`)
  })

  test('should return "\nYour payment schedule below has been revised to show the decrease. You have already received more money than the new agreement value. A recovery payment is now due.\n" for key stack 2 entry', () => {
    const result = getRecoveryDescription(recoverySchedule)
    expect(result.stack[1]).toBe('\nYour payment schedule below has been revised to show the decrease. You have already received more money than the new agreement value. A recovery payment is now due.\n')
  })
})
