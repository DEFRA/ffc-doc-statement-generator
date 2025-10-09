const styles = require('../../../app/generator/print-styles')
const getDocumentDefinition = require('../../../app/generator/get-document-definition')
const { generateContent } = require('../../../app/generator/content')
const { A4 } = require('../../../app/generator/page-sizes')
const { millimetresToPoints } = require('../../../app/generator/conversion')
const { SFI23QUARTERLYSTATEMENT, DELINKED } = require('../../../app/constants/document-types')

jest.mock('../../../app/generator/content')

describe('getDocumentDefinition', () => {
  const mockRequest = {}
  const mockContent = {}

  const horizontalMargin = 15
  const verticalMargin = 5

  beforeEach(() => {
    generateContent.mockResolvedValue(mockContent)
  })

  const documentTypes = [SFI23QUARTERLYSTATEMENT, DELINKED]

  documentTypes.forEach(type => {
    test(`returns correct pageSize for type: ${type.id}`, async () => {
      const result = await getDocumentDefinition(mockRequest, type)
      expect(result.pageSize).toBe(A4)
    })

    test(`returns correct content for type: ${type.id}`, async () => {
      const result = await getDocumentDefinition(mockRequest, type)
      expect(result.content).toBe(mockContent)
      expect(generateContent).toHaveBeenCalledWith(mockRequest, type)
    })

    test(`returns all defined styles for type: ${type.id}`, async () => {
      const result = await getDocumentDefinition(mockRequest, type)
      expect(result.styles).toStrictEqual(styles)
    })

    test(`sets default style as default style for type: ${type.id}`, async () => {
      const result = await getDocumentDefinition(mockRequest, type)
      expect(result.defaultStyle).toBe(styles.default)
    })

    test(`sets the left margin for ${type.name}`, async () => {
      const result = await getDocumentDefinition(mockRequest, type)
      expect(result.pageMargins[0]).toBe(millimetresToPoints(horizontalMargin))
    })

    test(`sets the top margin for ${type.name}`, async () => {
      const result = await getDocumentDefinition(mockRequest, type)
      expect(result.pageMargins[1]).toBe(millimetresToPoints(verticalMargin))
    })

    test(`sets the right margin for ${type.name}`, async () => {
      const result = await getDocumentDefinition(mockRequest, type)
      expect(result.pageMargins[2]).toBe(millimetresToPoints(horizontalMargin))
    })

    test(`sets the bottom margin for ${type.name}`, async () => {
      const result = await getDocumentDefinition(mockRequest, type)
      expect(result.pageMargins[3]).toBe(millimetresToPoints(verticalMargin))
    })

    test(`returns an object with the correct structure for type: ${type.id}`, async () => {
      const result = await getDocumentDefinition(mockRequest, type)
      expect(result).toHaveProperty('content')
      expect(result).toHaveProperty('pageSize')
      expect(result).toHaveProperty('pageMargins')
      expect(result).toHaveProperty('styles')
      expect(result).toHaveProperty('defaultStyle')
    })
  })

  test('throws error if generateContent fails', async () => {
    const error = new Error('Test error')
    generateContent.mockRejectedValue(error)
    await expect(getDocumentDefinition(mockRequest, DELINKED)).rejects.toThrow('Test error')
  })
})
