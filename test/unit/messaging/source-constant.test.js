const source = require('../../../app/constants/source')

describe('source constant', () => {
  test('exports SOURCE with correct value', () => {
    expect(source.SOURCE).toBe('ffc-doc-statement-generator')
  })
})
