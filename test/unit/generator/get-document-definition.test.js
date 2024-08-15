const styles = require('../../../app/generator/styles')
const getDocumentDefinition = require('../../../app/generator/get-document-definition')
const { generateContent } = require('../../../app/generator/content')
const { A4 } = require('../../../app/generator/page-sizes')
const { STATEMENT, SCHEDULE, SFI23QUARTERLYSTATEMENT, SFI23ADVANCEDSTATEMENT } = require('../../../app/constants/document-types')

jest.mock('../../../app/generator/content')

describe('getDocumentDefinition', () => {
  const mockRequest = {}
  const mockContent = {}

  beforeEach(() => {
    generateContent.mockReturnValue(mockContent)
    console.log(mockContent)
  })

  const documentTypes = [STATEMENT, SCHEDULE, SFI23QUARTERLYSTATEMENT, SFI23ADVANCEDSTATEMENT]

  documentTypes.forEach(type => {
    test(`returns correct pageSize for type: ${type.id}`, () => {
      const result = getDocumentDefinition(mockRequest, type)
      expect(result.pageSize).toBe(A4)
    })

    test(`returns correct content for type: ${type.id}`, () => {
      const result = getDocumentDefinition(mockRequest, type)
      expect(result.content).toBe(mockContent)
      expect(generateContent).toHaveBeenCalledWith(mockRequest, type)
    })

    test(`returns all defined styles for type: ${type.id}`, () => {
      const result = getDocumentDefinition(mockRequest, type)
      expect(result.styles).toStrictEqual(styles)
    })

    test(`sets default style as default style for type: ${type.id}`, () => {
      const result = getDocumentDefinition(mockRequest, type)
      expect(result.defaultStyle).toBe(styles.default)
    })

    test(`sets the left margin for ${type}`, () => {
      const result = getDocumentDefinition(mockRequest, type)
      expect(result.pageMargins[0]).toBe(70.875)
    })

    test(`sets the top margin for ${type}`, () => {
      const result = getDocumentDefinition(mockRequest, type)
      expect(result.pageMargins[1]).toBe(14.175)
    })

    test(`sets the right margin for ${type}`, () => {
      const result = getDocumentDefinition(mockRequest, type)
      expect(result.pageMargins[2]).toBe(70.875)
    })

    test(`sets the bottom margin for ${type}`, () => {
      const result = getDocumentDefinition(mockRequest, type)
      expect(result.pageMargins[3]).toBe(14.175)
    })
  })
})

describe('generateContent', () => {
  test('handles STATEMENT type', () => {
    expect(() => generateContent({}, STATEMENT)).not.toThrow()
  })

  test('handles SCHEDULE type', () => {
    expect(() => generateContent({}, SCHEDULE)).not.toThrow()
  })

  test('handles SFI23QUARTERLYSTATEMENT type', () => {
    expect(() => generateContent({}, SFI23QUARTERLYSTATEMENT)).not.toThrow()
  })
})
