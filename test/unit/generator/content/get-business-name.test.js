const getBusinessName = require('../../../../app/generator/content/get-business-name')
const businessName = require('../../../mocks/components/business-name')

describe('getBusinessName', () => {
  let result

  beforeEach(() => {
    result = getBusinessName(businessName)
  })

  test.each([
    ['has 2 columns', () => expect(result.columns.length).toBe(2)],
    ['title column text', () => expect(result.columns[0].text).toBe('Business name:')],
    ['title column width', () => expect(result.columns[0].width).toBe(200)],
    ['business name column text', () => expect(result.columns[1].text).toBe(businessName)],
    ['business name column width', () => expect(result.columns[1].width).toBe('*')],
    ['column style', () => expect(result.style).toBe('column')],
    ['column gap', () => expect(result.columnGap).toBe(10)]
  ])('should return correct %s', (_, assertion) => {
    assertion()
  })
})
