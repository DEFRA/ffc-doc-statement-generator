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

jest.mock('../../../../app/messaging/processing-alerts', () => ({
  dataProcessingAlert: jest.fn()
}))

const request = {}

describe('generateContent', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should call createStatementContent when documentType is STATEMENT', async () => {
    const mockResult = 'statement content'
    createStatementContent.mockResolvedValue(mockResult)

    const result = await generateContent(request, STATEMENT)
    expect(createStatementContent).toHaveBeenCalledWith(request)
    expect(result).toBe(mockResult)
  })

  test('should call createSFI23AdvancedStatementContent when documentType is SFI23ADVANCEDSTATEMENT', async () => {
    const mockResult = 'sfi23 advanced content'
    createSFI23AdvancedStatementContent.mockResolvedValue(mockResult)

    const result = await generateContent(request, SFI23ADVANCEDSTATEMENT)
    expect(createSFI23AdvancedStatementContent).toHaveBeenCalledWith(request)
    expect(result).toBe(mockResult)
  })

  test('should call createSFI23Content when documentType is SFI23QUARTERLYSTATEMENT', async () => {
    const mockResult = 'sfi23 quarterly content'
    createSFI23Content.mockResolvedValue(mockResult)

    const result = await generateContent(request, SFI23QUARTERLYSTATEMENT)
    expect(createSFI23Content).toHaveBeenCalledWith(request)
    expect(result).toBe(mockResult)
  })

  test('should call createScheduleContent when documentType is SCHEDULE', async () => {
    const mockResult = 'schedule content'
    createScheduleContent.mockResolvedValue(mockResult)

    const result = await generateContent(request, SCHEDULE)
    expect(createScheduleContent).toHaveBeenCalledWith(request)
    expect(result).toBe(mockResult)
  })

  test('should throw an error when an unknown document-type is selected', async () => {
    const UNKNOWN_TYPE = 'unknown'

    await expect(generateContent(request, UNKNOWN_TYPE)).rejects.toThrow(`Unknown request type: ${UNKNOWN_TYPE}`)
  })
})
