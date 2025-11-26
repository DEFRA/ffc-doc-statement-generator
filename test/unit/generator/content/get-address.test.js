const getAddress = require('../../../../app/generator/content/get-address')

const businessNameMock = require('../../../mocks/components/business-name')
const fullAddressMock = require('../../../mocks/components/address')

describe('getAddress', () => {
  const scenarios = [
    {
      name: 'empty address',
      businessName: '',
      address: {},
      expectedLines: Array(8).fill('') // 8 empty lines
    },
    {
      name: 'full address',
      address: fullAddressMock,
      expectedLines: [
        businessNameMock,
        fullAddressMock.line1,
        fullAddressMock.line2,
        fullAddressMock.line3,
        fullAddressMock.line4,
        fullAddressMock.line5,
        fullAddressMock.postcode,
        ''
      ]
    },
    {
      name: 'address with undefined values',
      address: { ...fullAddressMock, line1: undefined, line4: undefined, postcode: undefined },
      expectedLines: [
        businessNameMock,
        fullAddressMock.line2,
        fullAddressMock.line3,
        fullAddressMock.line5,
        '', '', '', ''
      ]
    },
    {
      name: 'address with null values',
      address: { ...fullAddressMock, line1: null, line4: null, postcode: null },
      expectedLines: [
        businessNameMock,
        fullAddressMock.line2,
        fullAddressMock.line3,
        fullAddressMock.line5,
        '', '', '', ''
      ]
    },
    {
      name: 'address with empty string values',
      address: { ...fullAddressMock, line1: '', line4: '', postcode: '' },
      expectedLines: [
        businessNameMock,
        fullAddressMock.line2,
        fullAddressMock.line3,
        fullAddressMock.line5,
        '', '', '', ''
      ]
    }
  ]

  test.each(scenarios)('should correctly format $name', ({ businessName = businessNameMock, address, expectedLines }) => {
    const result = getAddress(businessName, address)

    const expectedText = expectedLines.map(line => line?.toUpperCase().substring(0, 50) || '').join('\n') + '\n'
    expect(result.stack[0].text).toBe(expectedText)
    expect(result.stack[0].style).toBe('address')
  })
})
