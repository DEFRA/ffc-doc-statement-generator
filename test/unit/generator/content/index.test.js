
const { generateContent } = require('../../../../app/generator/content')
const { STATEMENT, SFI23ADVANCEDSTATEMENT, SFI23QUARTERLYSTATEMENT, SCHEDULE } = require('../../../../app/constants/document-types')
const { createContent: createStatementContent } = require('../../../../app/generator/content/statement/SFI')
const { createContent: createSFI23AdvancedStatementContent } = require('../../../../app/generator/content/statement/SFIA')
const { createContent: createScheduleContent } = require('../../../../app/generator/content/schedule')
const { createContent: createSFI23Content } = require('../../../../app/generator/content/sfi23-quarterly-statement')

jest.mock('../../../../app/generator/content/statement/SFI', () => ({
  createContent: jest.fn()
}))

jest.mock('../../../../app/generator/content/statement/SFIA', () => ({
  createContent: jest.fn()
}))

jest.mock('../../../../app/generator/content/schedule', () => ({
  createContent: jest.fn()
}))

jest.mock('../../../../app/generator/content/sfi23-quarterly-statement', () => ({
  createContent: jest.fn()
}))

const request = {}

describe('createContent', () => {
  test('should call createStatementContent when  documentType is STATEMENT', () => {
    generateContent(request, STATEMENT)
    expect(createStatementContent).toHaveBeenCalledWith(request)
  })

  test('should call createSFI23AdvancedStatementContent when  documentType is SFI23ADVANCEDSTATEMENT', () => {
    generateContent(request, SFI23ADVANCEDSTATEMENT)
    expect(createSFI23AdvancedStatementContent).toHaveBeenCalledWith(request)
  })

  test('should call createSFI23Content when  documentType is SFI23QUARTERLYSTATEMENT', () => {
    generateContent(request, SFI23QUARTERLYSTATEMENT)
    expect(createSFI23Content).toHaveBeenCalledWith(request)
  })

  test('should call createScheduleContent when  documentType is SCHEDULE', () => {
    generateContent(request, SCHEDULE)
    expect(createScheduleContent).toHaveBeenCalledWith(request)
  })

  test('should throw an error when an unknown document-type is selected', () => {
    const UNKNOWN_TYPE = 'unknown'

    expect(() => generateContent(request, UNKNOWN_TYPE)).toThrow(`Unknown request type: ${UNKNOWN_TYPE}`)
  })
})
