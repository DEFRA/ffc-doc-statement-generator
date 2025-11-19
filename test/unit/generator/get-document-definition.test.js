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

  const documentTypes = [
    { type: SFI23QUARTERLYSTATEMENT, name: 'SFI23QUARTERLYSTATEMENT' },
    { type: DELINKED, name: 'DELINKED' }
  ]

  test.each(documentTypes)(
    'returns correct pageSize for %s',
    async ({ type }) => {
      const result = await getDocumentDefinition(mockRequest, type)
      expect(result.pageSize).toBe(A4)
    }
  )

  test.each(documentTypes)(
    'returns correct content for %s',
    async ({ type }) => {
      const result = await getDocumentDefinition(mockRequest, type)
      expect(result.content).toBe(mockContent)
      expect(generateContent).toHaveBeenCalledWith(mockRequest, type)
    }
  )

  test.each(documentTypes)(
    'returns all defined styles for %s',
    async ({ type }) => {
      const result = await getDocumentDefinition(mockRequest, type)
      expect(result.styles).toStrictEqual(styles)
    }
  )

  test.each(documentTypes)(
    'sets default style for %s',
    async ({ type }) => {
      const result = await getDocumentDefinition(mockRequest, type)
      expect(result.defaultStyle).toBe(styles.default)
    }
  )

  test.each(documentTypes)(
    'sets correct page margins for %s',
    async ({ type }) => {
      const result = await getDocumentDefinition(mockRequest, type)
      expect(result.pageMargins).toEqual([
        millimetresToPoints(horizontalMargin),
        millimetresToPoints(verticalMargin),
        millimetresToPoints(horizontalMargin),
        millimetresToPoints(verticalMargin)
      ])
    }
  )

  test.each(documentTypes)(
    'returns object with correct structure for %s',
    async ({ type }) => {
      const result = await getDocumentDefinition(mockRequest, type)
      expect(result).toHaveProperty('content')
      expect(result).toHaveProperty('pageSize')
      expect(result).toHaveProperty('pageMargins')
      expect(result).toHaveProperty('styles')
      expect(result).toHaveProperty('defaultStyle')
    }
  )

  test('throws error if generateContent fails', async () => {
    const error = new Error('Test error')
    generateContent.mockRejectedValue(error)
    await expect(getDocumentDefinition(mockRequest, DELINKED)).rejects.toThrow('Test error')
  })
})
