const { generateContent } = require('../../../../app/generator/content/index')
const { createContent: createStatementContent } = require('../../../../app/generator/content/statement')
const { createContent: createScheduleContent } = require('../../../../app/generator/content/schedule')
const { createContent: createSFI23Content } = require('../../../../app/generator/content/sfi23-quarterly-statement')
const { SCHEDULE, STATEMENT, SFI23QUARTERLYSTATEMENT } = require('../../../../app/constants/document-types')

jest.mock('../../../../app/generator/content/statement')
jest.mock('../../../../app/generator/content/schedule')
jest.mock('../../../../app/generator/content/sfi23-quarterly-statement')

describe('generateContent', () => {
  const mockRequest = {}

  test('should call createStatementContent for STATEMENT type', () => {
    generateContent(mockRequest, STATEMENT)
    expect(createStatementContent).toHaveBeenCalledWith(mockRequest)
  })

  test('should call createScheduleContent for SCHEDULE type', () => {
    generateContent(mockRequest, SCHEDULE)
    expect(createScheduleContent).toHaveBeenCalledWith(mockRequest)
  })

  test('should call createSFI23Content for SFI23QUARTERLYSTATEMENT type', () => {
    generateContent(mockRequest, SFI23QUARTERLYSTATEMENT)
    expect(createSFI23Content).toHaveBeenCalledWith(mockRequest)
  })

  test('should throw an error for unknown type', () => {
    expect(() => generateContent(mockRequest, 'UNKNOWN')).toThrow('Unknown request type: UNKNOWN')
  })
})
