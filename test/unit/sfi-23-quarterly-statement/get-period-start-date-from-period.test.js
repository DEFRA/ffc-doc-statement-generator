const moment = require('moment')
const getPeriodStartDateFromPeriod = require('../../../app/generator/content/sfi23-quarterly-statement/get-period-start-date-from-period')

jest.mock('moment', () => {
  const originalMoment = jest.requireActual('moment')
  const mockMoment = jest.fn().mockImplementation((date, format) => {
    const momentObject = originalMoment(date, format)
    return momentObject
  })
  mockMoment.locale = jest.fn()
  return mockMoment
})

describe('getPeriodStartDateFromPeriod', () => {
  test('should correctly parse the start date from a period string', () => {
    const period = '1 January to 31 December 2025'
    const expectedStartDate = new Date('2025-01-01T00:00:00.000Z')

    const startDate = getPeriodStartDateFromPeriod(period)

    expect(moment).toHaveBeenCalledWith('1 January ', 'LL')
    expect(moment.locale).toHaveBeenCalledWith('en-gb')
    expect(startDate).toEqual(expectedStartDate)
  })

  test('should return Invalid Date when the period string is not in the correct format', () => {
    const period = 'Invalid period string'

    const startDate = getPeriodStartDateFromPeriod(period)

    expect(moment).toHaveBeenCalledWith('Invalid period string', 'LL')
    expect(moment.locale).toHaveBeenCalledWith('en-gb')
    expect(isNaN(startDate.getTime())).toBeTruthy()
  })
})
