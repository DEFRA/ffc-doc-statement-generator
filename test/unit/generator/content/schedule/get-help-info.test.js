const getHelpInfo = require('../../../../../app/generator/content/get-help-info')
const helpInfoBlock = ''

describe('get help info', () => {
  const result = getHelpInfo(helpInfoBlock)

  test('First segment header style is set to header2', () => {
    expect(result.stack[0].style).toBe('header2')
  })
  test('First segment title text is "More information"', () => {
    expect(result.stack[0].text).toBe('More information')
  })

  test('First segment line 1 text to be "If you think your payments are wrong, you should:\n"', () => {
    expect(result.stack[1]).toBe('If you think your payments are wrong, you should:\n')
  })

  test('First segment line 2 text to be "If you think your payments are wrong, you should:\n"', () => {
    expect(result.stack[2].ul[0].text[0]).toBe('log into the Rural Payments service ')
  })

  test('First segment line 2 link text to be "www.gov.uk/claim-rural-payments"', () => {
    expect(result.stack[2].ul[0].text[1].text).toBe('www.gov.uk/claim-rural-payments')
  })

  test('First segment line 2 hyperlink to be "https://www.gov.uk/claim-rural-payments"', () => {
    expect(result.stack[2].ul[0].text[1].link).toBe('https://www.gov.uk/claim-rural-payments')
  })

  test('First segment line 2 hyperlink decoration to be underline', () => {
    expect(result.stack[2].ul[0].text[1].decoration).toBe('underline')
  })

  test('should be unbreakable', () => {
    expect(result.unbreakable).toBeTruthy()
  })
})
