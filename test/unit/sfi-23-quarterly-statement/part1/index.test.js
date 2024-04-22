const moment = require('moment')
const part1 = require('../../../../app/generator/content/sfi23-quarterly-statement/part1/index')

jest.mock('moment', () => {
  const originalMoment = jest.requireActual('moment')
  const mockMoment = jest.fn().mockImplementation((date, format) => {
    const momentObject = originalMoment(date, format)
    return momentObject
  })
  mockMoment.locale = jest.fn()
  return mockMoment
})

describe('part1', () => {
  test('should correctly generate part1 content', () => {
    const mockSfi23QuarterlyStatement = {
      scheme: {
        name: 'SFI 23 Quarterly Statement',
        shortName: 'SFI23',
        year: '2024'
      },
      agreementNumber: '123456789',
      agreementStart: '2024-01-01T00:00:00.000Z',
      agreementEnd: '2024-12-31T00:00:00.000Z'
    }

    const part1Result = part1(mockSfi23QuarterlyStatement)

    expect(moment.locale).toHaveBeenCalledWith('en-gb')
    expect(part1Result).toHaveProperty('stack')
    expect(part1Result.stack).toContainEqual({ text: `${mockSfi23QuarterlyStatement.scheme.name} (${mockSfi23QuarterlyStatement.scheme.shortName}) ${mockSfi23QuarterlyStatement.scheme.year} agreement: quarterly payment statement `, style: 'header1' })
    expect(part1Result.stack).toContainEqual({ text: `This statement explains your quarterly payment for your ${mockSfi23QuarterlyStatement.scheme.shortName} ${mockSfi23QuarterlyStatement.scheme.year} agreement.` })
    expect(part1Result.stack).toContainEqual({ text: `Your ${mockSfi23QuarterlyStatement.scheme.shortName} ${mockSfi23QuarterlyStatement.scheme.year} agreement`, style: 'header2' })
    expect(part1Result.stack).toContainEqual({ text: [{ text: 'Agreement number: ', bold: true, lineBreak: false }, `${mockSfi23QuarterlyStatement.agreementNumber}`] })
    expect(part1Result.stack).toContainEqual({ text: [{ text: 'Start date: ', bold: true, lineBreak: false }, `${moment(mockSfi23QuarterlyStatement.agreementStart).format('LL')}`] })
    expect(part1Result.stack).toContainEqual({ text: [{ text: 'End date: ', bold: true, lineBreak: false }, `${moment(mockSfi23QuarterlyStatement.agreementEnd).format('LL')}`] })
    expect(part1Result).toHaveProperty('unbreakable', true)
  })
})
