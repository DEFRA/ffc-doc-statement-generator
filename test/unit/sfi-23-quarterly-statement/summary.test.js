const moment = require('moment')
const summary = require('../../../app/generator/content/sfi23-quarterly-statement/summary')

jest.mock('moment', () => {
  const originalMoment = jest.requireActual('moment')
  const mockMoment = jest.fn().mockImplementation((date, format) => {
    const momentObject = originalMoment(date, format)
    return momentObject
  })
  mockMoment.locale = jest.fn()
  return mockMoment
})

// Mock the entire getAddress module
jest.mock('../../../app/generator/content/get-address', () => {
  return jest.fn().mockImplementation(() => {
    return 'Mocked Address'
  })
})

describe('summary', () => {
  test('should correctly generate the summary', () => {
    const mockSfi23QuarterlyStatement = {
      businessName: 'Test Business',
      address: 'Test Address',
      sbi: '123456789',
      transactionDate: '2024-01-01T00:00:00.000Z'
    }

    const summaryResult = summary(mockSfi23QuarterlyStatement)

    expect(moment.locale).toHaveBeenCalledWith('en-gb')
    expect(summaryResult.stack).toContainEqual({ text: [{ text: 'Single Business Identifier (SBI): ', bold: true, lineBreak: false }, `${mockSfi23QuarterlyStatement.sbi}`] })
    expect(summaryResult.stack).toContainEqual({ text: [{ text: 'Business name: ', bold: true, lineBreak: false }, `${mockSfi23QuarterlyStatement.businessName}`] })
    expect(summaryResult.stack).toContainEqual({ text: [{ text: 'Statement date: ', bold: true, lineBreak: false }, `${moment(mockSfi23QuarterlyStatement.transactionDate).format('LL')}`] })
  })
})
