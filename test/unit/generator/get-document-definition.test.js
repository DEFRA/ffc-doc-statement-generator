const styles = require('../../../app/generator/styles')
const getDocumentDefinition = require('../../../app/generator/get-document-definition')
const mockStatement = require('../../mocks/mock-statement')
const { A4 } = require('../../../app/generator/page-sizes')
const { STATEMENT } = require('../../../app/constants/document-types')

describe('get document definition', () => {
  test('includes A4 paper size', () => {
    const result = getDocumentDefinition(mockStatement, STATEMENT)
    expect(result.pageSize).toBe(A4)
  })

  test('includes all defined styles', () => {
    const result = getDocumentDefinition(mockStatement, STATEMENT)
    expect(result.styles).toStrictEqual(styles)
  })

  test('sets default style as default style', () => {
    const result = getDocumentDefinition(mockStatement, STATEMENT)
    expect(result.defaultStyle).toBe(styles.default)
  })

  test('sets left margin', () => {
    const result = getDocumentDefinition(mockStatement, STATEMENT)
    expect(result.pageMargins[0]).toBe(42.525)
  })

  test('sets top margin', () => {
    const result = getDocumentDefinition(mockStatement, STATEMENT)
    expect(result.pageMargins[1]).toBe(14.175)
  })

  test('sets right margin', () => {
    const result = getDocumentDefinition(mockStatement, STATEMENT)
    expect(result.pageMargins[2]).toBe(42.525)
  })

  test('sets bottom margin', () => {
    const result = getDocumentDefinition(mockStatement, STATEMENT)
    expect(result.pageMargins[3]).toBe(14.175)
  })
})
