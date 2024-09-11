const getAddress = require('../../../../app/generator/content/get-address')

const businessName = require('../../../mocks/components/business-name')
const fullAddress = require('../../../mocks/components/address')

let address

describe('get address', () => {
  describe('when address is empty', () => {
    beforeEach(() => {
      address = {}
    })

    test('should return business name in uppercase and new line', () => {
      const result = getAddress(businessName, address)
      expect(result.stack[0].text).toBe(`${businessName.toUpperCase()}\n`)
    })

    test('should return style as address', () => {
      const result = getAddress(businessName, address)
      expect(result.stack[0].style).toBe('address')
    })
  })

  describe('when full address is given', () => {
    beforeEach(() => {
      address = fullAddress
    })

    test('should return business name and each address value in uppercase and truncated to 50 characters, separated by new lines', () => {
      const result = getAddress(businessName, address)
      const expectedAddress = `${businessName.toUpperCase()}\n${address.line1.toUpperCase().substring(0, 50)}\n${address.line2.toUpperCase().substring(0, 50)}\n${address.line3.toUpperCase().substring(0, 50)}\n${address.line4.toUpperCase().substring(0, 50)}\n${address.line5.toUpperCase().substring(0, 50)}\n${address.postcode.toUpperCase().substring(0, 50)}\n`
      expect(result.stack[0].text).toBe(expectedAddress)
    })

    test('should return style as address', () => {
      const result = getAddress(businessName, address)
      expect(result.stack[0].style).toBe('address')
    })
  })

  describe('when address values have undefined', () => {
    beforeEach(() => {
      address = {
        ...fullAddress,
        line1: undefined,
        line4: undefined,
        postcode: undefined
      }
    })

    test('should return business name and each address value in uppercase and truncated to 50 characters, separated by new lines ignoring those which are undefined', () => {
      const result = getAddress(businessName, address)
      const expectedAddress = `${businessName.toUpperCase()}\n${address.line2.toUpperCase().substring(0, 50)}\n${address.line3.toUpperCase().substring(0, 50)}\n${address.line5.toUpperCase().substring(0, 50)}\n`
      expect(result.stack[0].text).toBe(expectedAddress)
    })

    test('should return style as address', () => {
      const result = getAddress(businessName, address)
      expect(result.stack[0].style).toBe('address')
    })
  })

  describe('when address values have null', () => {
    beforeEach(() => {
      address = {
        ...fullAddress,
        line1: null,
        line4: null,
        postcode: null
      }
    })

    test('should return business name and each address value in uppercase and truncated to 50 characters, separated by new lines ignoring those which are null', () => {
      const result = getAddress(businessName, address)
      const expectedAddress = `${businessName.toUpperCase()}\n${address.line2.toUpperCase().substring(0, 50)}\n${address.line3.toUpperCase().substring(0, 50)}\n${address.line5.toUpperCase().substring(0, 50)}\n`
      expect(result.stack[0].text).toBe(expectedAddress)
    })

    test('should return style as address', () => {
      const result = getAddress(businessName, address)
      expect(result.stack[0].style).toBe('address')
    })
  })

  describe('when address values have empty', () => {
    beforeEach(() => {
      address = {
        ...fullAddress,
        line1: '',
        line4: '',
        postcode: ''
      }
    })

    test('should return business name and each address value in uppercase and truncated to 50 characters, separated by new lines ignoring those which are empty', () => {
      const result = getAddress(businessName, address)
      const expectedAddress = `${businessName.toUpperCase()}\n${address.line2.toUpperCase().substring(0, 50)}\n${address.line3.toUpperCase().substring(0, 50)}\n${address.line5.toUpperCase().substring(0, 50)}\n`
      expect(result.stack[0].text).toBe(expectedAddress)
    })

    test('should return style as address', () => {
      const result = getAddress(businessName, address)
      expect(result.stack[0].style).toBe('address')
    })
  })
})
