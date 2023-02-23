const getBusinessName = require('../../../../../app/generator/content/summary/get-business-name')
const businessName = 'Mr A Farmer'

describe('get business name', () => {
  test('returns two columns', () => {
    const result = getBusinessName(businessName)
    expect(result.columns.length).toBe(2)
  })

  test('returns title column text', () => {
    const result = getBusinessName(businessName)
    expect(result.columns[0].text).toBe('Business name:')
  })

  test('returns title column width', () => {
    const result = getBusinessName(businessName)
    expect(result.columns[0].width).toBe(200)
  })

  test('returns business name column text', () => {
    const result = getBusinessName(businessName)
    expect(result.columns[1].text).toBe('Mr A Farmer')
  })

  test('returns business name column width', () => {
    const result = getBusinessName(businessName)
    expect(result.columns[1].width).toBe('*')
  })

  test('returns column style', () => {
    const result = getBusinessName(businessName)
    expect(result.style).toBe('column')
  })

  test('returns column gap', () => {
    const result = getBusinessName(businessName)
    expect(result.columnGap).toBe(10)
  })
})
