const { generateContent } = require('../../../../app/generator/content')
const { SFI23QUARTERLYSTATEMENT, DELINKED } = require('../../../../app/constants/document-types')
const { createContent: createSFI23Content } = require('../../../../app/generator/content/sfi23-quarterly-statement')
const { createContent: createDelinkedContent } = require('../../../../app/generator/content/delinked-statement')

jest.mock('../../../../app/generator/content/sfi23-quarterly-statement', () => ({
  createContent: jest.fn()
}))

jest.mock('../../../../app/generator/content/delinked-statement', () => ({
  createContent: jest.fn()
}))

jest.mock('ffc-alerting-utils', () => ({
  dataProcessingAlert: jest.fn()
}))

const request = {}

describe('generateContent', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should call createSFI23Content when documentType is SFI23QUARTERLYSTATEMENT', async () => {
    const mockResult = 'sfi23 quarterly content'
    createSFI23Content.mockResolvedValue(mockResult)

    const result = await generateContent(request, SFI23QUARTERLYSTATEMENT)
    expect(createSFI23Content).toHaveBeenCalledWith(request)
    expect(result).toBe(mockResult)
  })

  test('should call createDelinkedContent when documentType is DELINKED', async () => {
    const mockResult = 'delinked content'
    createDelinkedContent.mockResolvedValue(mockResult)

    const result = await generateContent(request, DELINKED)
    expect(createDelinkedContent).toHaveBeenCalledWith(request)
    expect(result).toBe(mockResult)
  })

  test('should throw an error when an unknown document-type is selected', async () => {
    const UNKNOWN_TYPE = 'unknown'

    await expect(generateContent(request, UNKNOWN_TYPE)).rejects.toThrow(`Unknown request type: ${UNKNOWN_TYPE}`)
  })
})
