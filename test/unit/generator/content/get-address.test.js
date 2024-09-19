const getAddress = require('../../../../app/generator/content/get-address')

const businessName = require('../../../mocks/components/business-name')
const fullAddress = require('../../../mocks/components/address')

let address

describe('get address', () => {
  describe('when address is empty', () => {
    beforeEach(() => {
      address = {}
    })

    test('should return business name and six new lines', () => {
      const result = getAddress(businessName, address)
      expect(result.stack[0].text).toBe(`${businessName}\n\n\n\n\n\n\n`)
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

    test('should return business name and each address value in order separated by new lines', () => {
      const result = getAddress(businessName, address)
      expect(result.stack[0].text).toBe(`${businessName}\n${address.line1}\n${address.line2}\n${address.line3}\n${address.line4}\n${address.line5}\n${address.postcode}\n`)
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

    test('should return business name and each address value in order separated by new lines with blank lines for undefined values', () => {
      const result = getAddress(businessName, address)
      expect(result.stack[0].text).toBe(`${businessName}\n${address.line2}\n${address.line3}\n${address.line5}\n\n\n\n`)
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

    test('should return business name and each address value in order separated by new lines with blank lines for null values', () => {
      const result = getAddress(businessName, address)
      expect(result.stack[0].text).toBe(`${businessName}\n${address.line2}\n${address.line3}\n${address.line5}\n\n\n\n`)
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

    test('should return business name and each address value in order separated by new lines with blank lines for empty values', () => {
      const result = getAddress(businessName, address)
      expect(result.stack[0].text).toBe(`${businessName}\n${address.line2}\n${address.line3}\n${address.line5}\n\n\n\n`)
    })

    test('should return style as address', () => {
      const result = getAddress(businessName, address)
      expect(result.stack[0].style).toBe('address')
    })
  })
})
