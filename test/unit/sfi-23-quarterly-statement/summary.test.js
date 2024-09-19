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

// Mock the rpaLogo module
jest.mock('../../../app/generator/content/rpa-logo', () => {
  return jest.fn().mockImplementation(() => {
    return 'Mocked RPA Logo'
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
    expect(summaryResult.stack).toContainEqual('Mocked RPA Logo')
    expect(summaryResult.stack).toContainEqual('Mocked Address')
    expect(summaryResult.stack).toContainEqual({ text: '', style: 'notifyMargin' })
    expect(summaryResult.stack).toContainEqual({ text: [{ text: 'Single Business Identifier (SBI): ', bold: true, style: 'letterSeparator' }, `${mockSfi23QuarterlyStatement.sbi}`] })
    expect(summaryResult.stack).toContainEqual({ text: [{ text: 'Business name: ', bold: true }, `${mockSfi23QuarterlyStatement.businessName}`] })
    expect(summaryResult.stack).toContainEqual({ text: [{ text: 'Statement date: ', bold: true }, `${moment(mockSfi23QuarterlyStatement.transactionDate).format('LL')}`] })
  })
})
