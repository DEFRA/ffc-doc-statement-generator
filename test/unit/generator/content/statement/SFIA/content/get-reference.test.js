const getReference = require('../../../../../../../app/generator/content/statement/SFIA/content/get-reference')
const reference = 'PY1234567'

describe('get reference', () => {
  test('returns two columns', () => {
    const result = getReference(reference)
    expect(result.columns.length).toBe(2)
  })

  test('returns title column text', () => {
    const result = getReference(reference)
    expect(result.columns[0].text).toBe('Payment reference number:')
  })

  test('returns title column width', () => {
    const result = getReference(reference)
    expect(result.columns[0].width).toBe(200)
  })

  test('returns business name column text', () => {
    const result = getReference(reference)
    expect(result.columns[1].text).toBe('PY1234567')
  })

  test('returns business name column width', () => {
    const result = getReference(reference)
    expect(result.columns[1].width).toBe('*')
  })

  test('returns column style', () => {
    const result = getReference(reference)
    expect(result.style).toBe('column')
  })

  test('returns column gap', () => {
    const result = getReference(reference)
    expect(result.columnGap).toBe(10)
  })
})
