const summary = require('../../../app/generator/content/sfi23-quarterly-statement/summary')
const part1 = require('../../../app/generator/content/sfi23-quarterly-statement/part1')
const part2 = require('../../../app/generator/content/sfi23-quarterly-statement/part2')
const part3 = require('../../../app/generator/content/sfi23-quarterly-statement/part3')
const getHelpInfo = require('../../../app/generator/content/sfi23-quarterly-statement/get-help-info')
const { createContent } = require('../../../app/generator/content/sfi23-quarterly-statement/index')

jest.mock('../../../app/generator/content/sfi23-quarterly-statement/summary', () => jest.fn())
jest.mock('../../../app/generator/content/sfi23-quarterly-statement/part1', () => jest.fn())
jest.mock('../../../app/generator/content/sfi23-quarterly-statement/part2', () => jest.fn())
jest.mock('../../../app/generator/content/sfi23-quarterly-statement/part3', () => jest.fn())
jest.mock('../../../app/generator/content/sfi23-quarterly-statement/get-help-info', () => jest.fn())

describe('createContent', () => {
  test('should call all dependencies and combine their results into an array', () => {
    const mockSfi23QuarterlyStatement = {
      businessName: 'Test Business',
      address: 'Test Address',
      sbi: '123456789',
      transactionDate: '2024-01-01T00:00:00.000Z'
    }

    summary.mockReturnValue('summary')
    part1.mockReturnValue('part1')
    part2.mockReturnValue('part2')
    part3.mockReturnValue('part3')
    getHelpInfo.mockReturnValue('getHelpInfo')

    const result = createContent(mockSfi23QuarterlyStatement)

    expect(summary).toHaveBeenCalledWith(mockSfi23QuarterlyStatement)
    expect(part1).toHaveBeenCalledWith(mockSfi23QuarterlyStatement)
    expect(part2).toHaveBeenCalledWith(mockSfi23QuarterlyStatement)
    expect(part3).toHaveBeenCalledWith(mockSfi23QuarterlyStatement)
    expect(getHelpInfo).toHaveBeenCalledWith(mockSfi23QuarterlyStatement)
    expect(result).toEqual(['summary', 'part1', 'part2', 'part3', 'getHelpInfo'])
  })
})
