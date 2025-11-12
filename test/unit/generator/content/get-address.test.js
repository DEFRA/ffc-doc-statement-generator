const getAddress = require('../../../../app/generator/content/get-address')

const businessName = require('../../../mocks/components/business-name')
const fullAddress = require('../../../mocks/components/address')

describe('getAddress', () => {
  const scenarios = [
    {
      name: 'empty address',
      address: {},
      expectedLines: Array(8).fill('') // 8 empty lines
    },
    {
      name: 'full address',
      address: fullAddress,
      expectedLines: [
        businessName,
        fullAddress.line1,
        fullAddress.line2,
        fullAddress.line3,
        fullAddress.line4,
        fullAddress.line5,
        fullAddress.postcode,
        ''
      ]
    },
    {
      name: 'address with undefined values',
      address: { ...fullAddress, line1: undefined, line4: undefined, postcode: undefined },
      expectedLines: [
        businessName,
        fullAddress.line2,
        fullAddress.line3,
        fullAddress.line5,
        '', '', '', ''
      ]
    },
    {
      name: 'address with null values',
      address: { ...fullAddress, line1: null, line4: null, postcode: null },
      expectedLines: [
        businessName,
        fullAddress.line2,
        fullAddress.line3,
        fullAddress.line5,
        '', '', '', ''
      ]
    },
    {
      name: 'address with empty string values',
      address: { ...fullAddress, line1: '', line4: '', postcode: '' },
      expectedLines: [
        businessName,
        fullAddress.line2,
        fullAddress.line3,
        fullAddress.line5,
        '', '', '', ''
      ]
    }
  ]

  test.each(scenarios)('should correctly format $name', ({ address, expectedLines }) => {
    const result = getAddress(businessName, address)

    const expectedText = expectedLines.map(line => line?.toUpperCase().substring(0, 50) || '').join('\n') + '\n'
    expect(result.stack[0].text).toBe(expectedText)
    expect(result.stack[0].style).toBe('address')
  })
})
