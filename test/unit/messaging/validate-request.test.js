const { STATEMENT, SCHEDULE, SFI23QUARTERLYSTATEMENT } = require('../../../app/constants/document-types')
const { VALIDATION } = require('../../../app/errors')

const { validateRequest } = require('../../../app/messaging/validate-request')

let sfi23QuarterlyStatement
let statement
let schedule

describe('validate SFI 23 quarterly statement', () => {
  describe('when SFI 23 quarterly statement is valid', () => {
    beforeEach(() => {
      sfi23QuarterlyStatement = JSON.parse(JSON.stringify(require('../../mocks/mock-statement-sfi23-quarterly')))
    })

    test('does not throw', async () => {
      expect(() => validateRequest(sfi23QuarterlyStatement, SFI23QUARTERLYSTATEMENT)).not.toThrow()
    })

    test('returns undefined', async () => {
      const result = validateRequest(sfi23QuarterlyStatement, SFI23QUARTERLYSTATEMENT)
      expect(result).toBeUndefined()
    })
  })
})

describe('when sfi 23 quarterly statement is undefined', () => {
  beforeEach(() => {
    sfi23QuarterlyStatement = undefined
  })

  test('throws', async () => {
    expect(() => validateRequest(undefined, SFI23QUARTERLYSTATEMENT)).toThrow()
  })

  test('throws Error', async () => {
    expect(() => validateRequest(sfi23QuarterlyStatement, SFI23QUARTERLYSTATEMENT)).toThrow(Error)
  })

  test('throws error with category key', async () => {
    try { validateRequest(sfi23QuarterlyStatement, SFI23QUARTERLYSTATEMENT) } catch (err) { expect(Object.keys(err)).toContain('category') }
  })

  test('throws error with VALIDATION value for category key', async () => {
    try { validateRequest(sfi23QuarterlyStatement, SFI23QUARTERLYSTATEMENT) } catch (err) { expect(err.category).toBe(VALIDATION) }
  })

  test('throws error which starts "Request content is invalid"', async () => {
    expect(() => validateRequest(sfi23QuarterlyStatement, SFI23QUARTERLYSTATEMENT)).toThrow(/^Request content is invalid/)
  })
})

describe('validate statement', () => {
  describe('when statement is valid', () => {
    beforeEach(() => {
      statement = JSON.parse(JSON.stringify(require('../../mocks/mock-statement')))
    })

    test('does not throw', async () => {
      expect(() => validateRequest(statement, STATEMENT)).not.toThrow()
    })

    test('returns undefined', async () => {
      const result = validateRequest(statement, STATEMENT)
      expect(result).toBeUndefined()
    })
  })

  describe('when statement has no documentReference key', () => {
    beforeEach(() => {
      statement = JSON.parse(JSON.stringify(require('../../mocks/mock-statement')))
      delete statement.documentReference
    })

    test('does not throw', async () => {
      expect(() => validateRequest(statement, STATEMENT)).not.toThrow()
    })

    test('returns undefined', async () => {
      const result = validateRequest(statement, STATEMENT)
      expect(result).toBeUndefined()
    })
  })

  describe('when statement is undefined', () => {
    beforeEach(() => {
      statement = undefined
    })

    test('throws', async () => {
      expect(() => validateRequest(undefined, STATEMENT)).toThrow()
    })

    test('throws Error', async () => {
      expect(() => validateRequest(statement, STATEMENT)).toThrow(Error)
    })

    test('throws error with category key', async () => {
      try { validateRequest(statement, STATEMENT) } catch (err) { expect(Object.keys(err)).toContain('category') }
    })

    test('throws error with VALIDATION value for category key', async () => {
      try { validateRequest(statement, STATEMENT) } catch (err) { expect(err.category).toBe(VALIDATION) }
    })

    test('throws error which starts "Request content is invalid"', async () => {
      expect(() => validateRequest(statement, STATEMENT)).toThrow(/^Request content is invalid/)
    })
  })

  describe('when statement is missing', () => {
    test('throws', async () => {
      expect(() => validateRequest(STATEMENT)).toThrow()
    })

    test('throws Error', async () => {
      expect(() => validateRequest(STATEMENT)).toThrow(Error)
    })

    test('throws error which starts "Unknown request type"', async () => {
      expect(() => validateRequest(STATEMENT)).toThrow(/^Unknown request type/)
    })
  })

  describe('when statement is {}', () => {
    beforeEach(() => {
      statement = {}
    })

    test('throws', async () => {
      expect(() => validateRequest(statement, STATEMENT)).toThrow()
    })

    test('throws Error', async () => {
      expect(() => validateRequest(statement, STATEMENT)).toThrow(Error)
    })

    test('throws error with category key', async () => {
      try { validateRequest(statement, STATEMENT) } catch (err) { expect(Object.keys(err)).toContain('category') }
    })

    test('throws error with VALIDATION value for category key', async () => {
      try { validateRequest(statement, STATEMENT) } catch (err) { expect(err.category).toBe(VALIDATION) }
    })

    test('throws error which starts "Request content is invalid"', async () => {
      expect(() => validateRequest(statement, STATEMENT)).toThrow(/^Request content is invalid/)
    })
  })

  describe('when statement is []', () => {
    beforeEach(() => {
      statement = []
    })

    test('throws', async () => {
      expect(() => validateRequest(statement, STATEMENT)).toThrow()
    })

    test('throws Error', async () => {
      expect(() => validateRequest(statement, STATEMENT)).toThrow(Error)
    })

    test('throws error with category key', async () => {
      try { validateRequest(statement, STATEMENT) } catch (err) { expect(Object.keys(err)).toContain('category') }
    })

    test('throws error with VALIDATION value for category key', async () => {
      try { validateRequest(statement, STATEMENT) } catch (err) { expect(err.category).toBe(VALIDATION) }
    })

    test('throws error which starts "Request content is invalid"', async () => {
      expect(() => validateRequest(statement, STATEMENT)).toThrow(/^Request content is invalid/)
    })
  })

  describe('when statement is true', () => {
    beforeEach(() => {
      statement = true
    })

    test('throws', async () => {
      expect(() => validateRequest(statement, STATEMENT)).toThrow()
    })

    test('throws Error', async () => {
      expect(() => validateRequest(statement, STATEMENT)).toThrow(Error)
    })

    test('throws error with category key', async () => {
      try { validateRequest(statement, STATEMENT) } catch (err) { expect(Object.keys(err)).toContain('category') }
    })

    test('throws error with VALIDATION value for category key', async () => {
      try { validateRequest(statement, STATEMENT) } catch (err) { expect(err.category).toBe(VALIDATION) }
    })

    test('throws error which starts "Request content is invalid"', async () => {
      expect(() => validateRequest(statement, STATEMENT)).toThrow(/^Request content is invalid/)
    })
  })

  describe('when statement is false', () => {
    beforeEach(() => {
      statement = false
    })

    test('throws', async () => {
      expect(() => validateRequest(statement, STATEMENT)).toThrow()
    })

    test('throws Error', async () => {
      expect(() => validateRequest(statement, STATEMENT)).toThrow(Error)
    })

    test('throws error with category key', async () => {
      try { validateRequest(statement, STATEMENT) } catch (err) { expect(Object.keys(err)).toContain('category') }
    })

    test('throws error with VALIDATION value for category key', async () => {
      try { validateRequest(statement, STATEMENT) } catch (err) { expect(err.category).toBe(VALIDATION) }
    })

    test('throws error which starts "Request content is invalid"', async () => {
      expect(() => validateRequest(statement, STATEMENT)).toThrow(/^Request content is invalid/)
    })
  })

  describe('when statement is 0', () => {
    beforeEach(() => {
      statement = 0
    })

    test('throws', async () => {
      expect(() => validateRequest(statement, STATEMENT)).toThrow()
    })

    test('throws Error', async () => {
      expect(() => validateRequest(statement, STATEMENT)).toThrow(Error)
    })

    test('throws error with category key', async () => {
      try { validateRequest(statement, STATEMENT) } catch (err) { expect(Object.keys(err)).toContain('category') }
    })

    test('throws error with VALIDATION value for category key', async () => {
      try { validateRequest(statement, STATEMENT) } catch (err) { expect(err.category).toBe(VALIDATION) }
    })

    test('throws error which starts "Request content is invalid"', async () => {
      expect(() => validateRequest(statement, STATEMENT)).toThrow(/^Request content is invalid/)
    })
  })

  describe('when statement is 1', () => {
    beforeEach(() => {
      statement = 1
    })

    test('throws', async () => {
      expect(() => validateRequest(statement, STATEMENT)).toThrow()
    })

    test('throws Error', async () => {
      expect(() => validateRequest(statement, STATEMENT)).toThrow(Error)
    })

    test('throws error with category key', async () => {
      try { validateRequest(statement, STATEMENT) } catch (err) { expect(Object.keys(err)).toContain('category') }
    })

    test('throws error with VALIDATION value for category key', async () => {
      try { validateRequest(statement, STATEMENT) } catch (err) { expect(err.category).toBe(VALIDATION) }
    })

    test('throws error which starts "Request content is invalid"', async () => {
      expect(() => validateRequest(statement, STATEMENT)).toThrow(/^Request content is invalid/)
    })
  })

  describe('when statement is ""', () => {
    beforeEach(() => {
      statement = ''
    })

    test('throws', async () => {
      expect(() => validateRequest(statement, STATEMENT)).toThrow()
    })

    test('throws Error', async () => {
      expect(() => validateRequest(statement, STATEMENT)).toThrow(Error)
    })

    test('throws error with category key', async () => {
      try { validateRequest(statement, STATEMENT) } catch (err) { expect(Object.keys(err)).toContain('category') }
    })

    test('throws error with VALIDATION value for category key', async () => {
      try { validateRequest(statement, STATEMENT) } catch (err) { expect(err.category).toBe(VALIDATION) }
    })

    test('throws error which starts "Request content is invalid"', async () => {
      expect(() => validateRequest(statement, STATEMENT)).toThrow(/^Request content is invalid/)
    })
  })

  describe('when statement is "statement"', () => {
    beforeEach(() => {
      statement = 'statement'
    })

    test('throws', async () => {
      expect(() => validateRequest(statement, STATEMENT)).toThrow()
    })

    test('throws Error', async () => {
      expect(() => validateRequest(statement, STATEMENT)).toThrow(Error)
    })

    test('throws error with category key', async () => {
      try { validateRequest(statement, STATEMENT) } catch (err) { expect(Object.keys(err)).toContain('category') }
    })

    test('throws error with VALIDATION value for category key', async () => {
      try { validateRequest(statement, STATEMENT) } catch (err) { expect(err.category).toBe(VALIDATION) }
    })

    test('throws error which starts "Request content is invalid"', async () => {
      expect(() => validateRequest(statement, STATEMENT)).toThrow(/^Request content is invalid/)
    })
  })
})

describe('validate schedule', () => {
  describe('when schedule is valid', () => {
    beforeEach(() => {
      schedule = JSON.parse(JSON.stringify(require('../../mocks/mock-schedule').topUpSchedule))
    })

    test('does not throw on valid schedule', async () => {
      expect(() => validateRequest(schedule, SCHEDULE)).not.toThrow()
    })

    test('returns undefined on valid schedule', async () => {
      const result = validateRequest(schedule, SCHEDULE)
      expect(result).toBeUndefined()
    })
  })

  describe('when schedule has no documentReference key', () => {
    beforeEach(() => {
      schedule = JSON.parse(JSON.stringify(require('../../mocks/mock-schedule').topUpSchedule))
      delete schedule.documentReference
    })

    test('does not throw', async () => {
      expect(() => validateRequest(schedule, SCHEDULE)).not.toThrow()
    })

    test('returns undefined', async () => {
      const result = validateRequest(schedule, SCHEDULE)
      expect(result).toBeUndefined()
    })
  })

  describe('when schedule is undefined', () => {
    beforeEach(() => {
      schedule = undefined
    })

    test('throws', async () => {
      expect(() => validateRequest(schedule, SCHEDULE)).toThrow()
    })

    test('throws Error', async () => {
      expect(() => validateRequest(schedule, SCHEDULE)).toThrow(Error)
    })

    test('throws error with category key', async () => {
      try { validateRequest(schedule, SCHEDULE) } catch (err) { expect(Object.keys(err)).toContain('category') }
    })

    test('throws error with VALIDATION value for category key', async () => {
      try { validateRequest(schedule, SCHEDULE) } catch (err) { expect(err.category).toBe(VALIDATION) }
    })

    test('throws error which starts "Request content is invalid"', async () => {
      expect(() => validateRequest(schedule, SCHEDULE)).toThrow(/^Request content is invalid/)
    })
  })

  describe('when schedule is missing', () => {
    test('throws', async () => {
      expect(() => validateRequest(SCHEDULE)).toThrow()
    })

    test('throws Error', async () => {
      expect(() => validateRequest(SCHEDULE)).toThrow(Error)
    })

    test('throws error which starts "Unknown request type"', async () => {
      expect(() => validateRequest(SCHEDULE)).toThrow(/^Unknown request type/)
    })
  })

  describe('when schedule is {}', () => {
    beforeEach(() => {
      schedule = {}
    })

    test('throws', async () => {
      expect(() => validateRequest(schedule, SCHEDULE)).toThrow()
    })

    test('throws Error', async () => {
      expect(() => validateRequest(schedule, SCHEDULE)).toThrow(Error)
    })

    test('throws error with category key', async () => {
      try { validateRequest(schedule, SCHEDULE) } catch (err) { expect(Object.keys(err)).toContain('category') }
    })

    test('throws error with VALIDATION value for category key', async () => {
      try { validateRequest(schedule, SCHEDULE) } catch (err) { expect(err.category).toBe(VALIDATION) }
    })

    test('throws error which starts "Request content is invalid"', async () => {
      expect(() => validateRequest(schedule, SCHEDULE)).toThrow(/^Request content is invalid/)
    })
  })

  describe('when schedule is []', () => {
    beforeEach(() => {
      schedule = []
    })

    test('throws', async () => {
      expect(() => validateRequest([], SCHEDULE)).toThrow()
    })

    test('throws Error', async () => {
      expect(() => validateRequest(schedule, SCHEDULE)).toThrow(Error)
    })

    test('throws error with category key', async () => {
      try { validateRequest(schedule, SCHEDULE) } catch (err) { expect(Object.keys(err)).toContain('category') }
    })

    test('throws error with VALIDATION value for category key', async () => {
      delete schedule.documentReference
      try { validateRequest(schedule, SCHEDULE) } catch (err) { expect(err.category).toBe(VALIDATION) }
    })

    test('throws error which starts "Request content is invalid"', async () => {
      delete schedule.documentReference
      expect(() => validateRequest(schedule, SCHEDULE)).toThrow(/^Request content is invalid/)
    })
  })

  describe('when schedule is true', () => {
    beforeEach(() => {
      schedule = true
    })

    test('throws', async () => {
      expect(() => validateRequest(true, SCHEDULE)).toThrow()
    })

    test('throws Error', async () => {
      delete schedule.documentReference
      expect(() => validateRequest(schedule, SCHEDULE)).toThrow(Error)
    })

    test('throws error with category key', async () => {
      delete schedule.documentReference
      try { validateRequest(schedule, SCHEDULE) } catch (err) { expect(Object.keys(err)).toContain('category') }
    })

    test('throws error with VALIDATION value for category key', async () => {
      delete schedule.documentReference
      try { validateRequest(schedule, SCHEDULE) } catch (err) { expect(err.category).toBe(VALIDATION) }
    })

    test('throws error which starts "Request content is invalid"', async () => {
      delete schedule.documentReference
      expect(() => validateRequest(schedule, SCHEDULE)).toThrow(/^Request content is invalid/)
    })
  })

  describe('when schedule is false', () => {
    beforeEach(() => {
      schedule = false
    })

    test('throws', async () => {
      expect(() => validateRequest(false, SCHEDULE)).toThrow()
    })

    test('throws Error', async () => {
      delete schedule.documentReference
      expect(() => validateRequest(schedule, SCHEDULE)).toThrow(Error)
    })

    test('throws error with category key', async () => {
      delete schedule.documentReference
      try { validateRequest(schedule, SCHEDULE) } catch (err) { expect(Object.keys(err)).toContain('category') }
    })

    test('throws error with VALIDATION value for category key', async () => {
      delete schedule.documentReference
      try { validateRequest(schedule, SCHEDULE) } catch (err) { expect(err.category).toBe(VALIDATION) }
    })

    test('throws error which starts "Request content is invalid"', async () => {
      delete schedule.documentReference
      expect(() => validateRequest(schedule, SCHEDULE)).toThrow(/^Request content is invalid/)
    })
  })

  describe('when schedule is 0', () => {
    beforeEach(() => {
      schedule = 0
    })

    test('throws', async () => {
      expect(() => validateRequest(0, SCHEDULE)).toThrow()
    })

    test('throws Error', async () => {
      delete schedule.documentReference
      expect(() => validateRequest(schedule, SCHEDULE)).toThrow(Error)
    })

    test('throws error with category key', async () => {
      delete schedule.documentReference
      try { validateRequest(schedule, SCHEDULE) } catch (err) { expect(Object.keys(err)).toContain('category') }
    })

    test('throws error with VALIDATION value for category key', async () => {
      delete schedule.documentReference
      try { validateRequest(schedule, SCHEDULE) } catch (err) { expect(err.category).toBe(VALIDATION) }
    })

    test('throws error which starts "Request content is invalid"', async () => {
      delete schedule.documentReference
      expect(() => validateRequest(schedule, SCHEDULE)).toThrow(/^Request content is invalid/)
    })
  })

  describe('when schedule is 1', () => {
    beforeEach(() => {
      schedule = 1
    })

    test('throws', async () => {
      expect(() => validateRequest(1, SCHEDULE)).toThrow()
    })

    test('throws Error', async () => {
      delete schedule.documentReference
      expect(() => validateRequest(schedule, SCHEDULE)).toThrow(Error)
    })

    test('throws error with category key', async () => {
      delete schedule.documentReference
      try { validateRequest(schedule, SCHEDULE) } catch (err) { expect(Object.keys(err)).toContain('category') }
    })

    test('throws error with VALIDATION value for category key', async () => {
      delete schedule.documentReference
      try { validateRequest(schedule, SCHEDULE) } catch (err) { expect(err.category).toBe(VALIDATION) }
    })

    test('throws error which starts "Request content is invalid"', async () => {
      delete schedule.documentReference
      expect(() => validateRequest(schedule, SCHEDULE)).toThrow(/^Request content is invalid/)
    })
  })

  describe('when schedule is ""', () => {
    beforeEach(() => {
      schedule = ''
    })

    test('throws', async () => {
      expect(() => validateRequest('', SCHEDULE)).toThrow()
    })

    test('throws Error', async () => {
      delete schedule.documentReference
      expect(() => validateRequest(schedule, SCHEDULE)).toThrow(Error)
    })

    test('throws error with category key', async () => {
      delete schedule.documentReference
      try { validateRequest(schedule, SCHEDULE) } catch (err) { expect(Object.keys(err)).toContain('category') }
    })

    test('throws error with VALIDATION value for category key', async () => {
      delete schedule.documentReference
      try { validateRequest(schedule, SCHEDULE) } catch (err) { expect(err.category).toBe(VALIDATION) }
    })

    test('throws error which starts "Request content is invalid"', async () => {
      delete schedule.documentReference
      expect(() => validateRequest(schedule, SCHEDULE)).toThrow(/^Request content is invalid/)
    })
  })

  describe('when schedule is "schedule"', () => {
    beforeEach(() => {
      schedule = 'schedule'
    })

    test('throws', async () => {
      expect(() => validateRequest('schedule', SCHEDULE)).toThrow()
    })

    test('throws Error', async () => {
      delete schedule.documentReference
      expect(() => validateRequest(schedule, SCHEDULE)).toThrow(Error)
    })

    test('throws error with category key', async () => {
      delete schedule.documentReference
      try { validateRequest(schedule, SCHEDULE) } catch (err) { expect(Object.keys(err)).toContain('category') }
    })

    test('throws error with VALIDATION value for category key', async () => {
      delete schedule.documentReference
      try { validateRequest(schedule, SCHEDULE) } catch (err) { expect(err.category).toBe(VALIDATION) }
    })

    test('throws error which starts "Request content is invalid"', async () => {
      delete schedule.documentReference
      expect(() => validateRequest(schedule, SCHEDULE)).toThrow(/^Request content is invalid/)
    })
  })
})
