const moment = require('moment')
const part2 = require('../../../../app/generator/content/sfi23-quarterly-statement/part2/index')

jest.mock('moment', () => {
  const originalMoment = jest.requireActual('moment')
  const mockMoment = jest.fn().mockImplementation((date, format) => {
    const momentObject = originalMoment(date, format)
    return momentObject
  })
  mockMoment.locale = jest.fn()
  return mockMoment
})

describe('part2', () => {
  test('should correctly generate part2 content', () => {
    const mockSfi23QuarterlyStatement = {
      paymentPeriod: '2024 Q1',
      paymentAmount: 1234.56,
      transactionDate: '2024-03-31T00:00:00.000Z',
      paymentReference: 'SFI23-123456789'
    }

    const part2Result = part2(mockSfi23QuarterlyStatement)

    expect(moment.locale).toHaveBeenCalledWith('en-gb')
    expect(part2Result).toHaveProperty('stack')
    expect(part2Result.stack).toContainEqual({ text: 'What you\'ve been paid', style: 'header2' })
    expect(part2Result.stack[1].table.body[0][0].stack).toContainEqual({ text: [{ text: 'Period: ', bold: true, lineBreak: false }, `${mockSfi23QuarterlyStatement.paymentPeriod}`] })
    expect(part2Result.stack[1].table.body[0][0].stack).toContainEqual({ text: [{ text: 'Payment: ', bold: true, lineBreak: false }, `£${new Intl.NumberFormat().format(Number(mockSfi23QuarterlyStatement.paymentAmount)).toString()}`] })
    expect(part2Result.stack[1].table.body[0][0].stack).toContainEqual({ text: `This is usually paid into your account within 2 working days of ${moment(mockSfi23QuarterlyStatement.transactionDate).format('LL')}.` })
    expect(part2Result.stack[1].table.body[0][0].stack).toContainEqual({ text: [{ text: 'Payment reference: ', bold: true, lineBreak: false }, `${mockSfi23QuarterlyStatement.paymentReference}`] })
    expect(part2Result).toHaveProperty('unbreakable', true)
    expect(part2Result.stack[1].layout.hLineStyle()).toEqual('solid')
    expect(part2Result.stack[1].layout.vLineStyle()).toEqual('solid')
  })
})
