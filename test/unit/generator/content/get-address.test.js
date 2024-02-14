const getAddress = require('../../../../app/generator/content/get-address')

const businessName = require('../../../mocks/components/business-name')
const fullAddress = require('../../../mocks/components/address')

let address

describe('get address', () => {
  describe('when address is empty', () => {
    beforeEach(() => {
      address = {}
    })

    test('should return business name and new line', () => {
      const result = getAddress(businessName, address)
      expect(result.text).toMatch(`${businessName}\n`)
    })

    test('should return style as address', () => {
      const result = getAddress(businessName, address)
      expect(result.style).toMatch('address')
    })

    test('should return correct x-axis location', () => {
      const result = getAddress(businessName, address)
      expect(result.absolutePosition.x).toBe(0)
    })

    test('should return correct y-axis location', () => {
      const result = getAddress(businessName, address)
      expect(result.absolutePosition.y).toBe(127.575)
    })
  })

  describe('when full address is given', () => {
    beforeEach(() => {
      address = fullAddress
    })

    test('should return business name and each address value in order separated by new lines', () => {
      const result = getAddress(businessName, address)
      expect(result.text).toMatch(`${businessName}\n${address.line1}\n${address.line2}\n${address.line3}\n${address.line4}\n${address.line5}\n${address.postcode}\n`)
    })

    test('should return style as address', () => {
      const result = getAddress(businessName, address)
      expect(result.style).toMatch('address')
    })

    test('should return correct x-axis location', () => {
      const result = getAddress(businessName, address)
      expect(result.absolutePosition.x).toBe(0)
    })

    test('should return correct y-axis location', () => {
      const result = getAddress(businessName, address)
      expect(result.absolutePosition.y).toBe(127.575)
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

    test('should return business name and each address value in order separated by new lines ignoring those which are undefined', () => {
      const result = getAddress(businessName, address)
      expect(result.text).toMatch(`${businessName}\n${address.line2}\n${address.line3}\n${address.line5}\n`)
    })

    test('should return style as address', () => {
      const result = getAddress(businessName, address)
      expect(result.style).toMatch('address')
    })

    test('should return correct x-axis location', () => {
      const result = getAddress(businessName, address)
      expect(result.absolutePosition.x).toBe(0)
    })

    test('should return correct y-axis location', () => {
      const result = getAddress(businessName, address)
      expect(result.absolutePosition.y).toBe(127.575)
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

    test('should return business name and each address value in order separated by new lines ignoring those which are null', () => {
      const result = getAddress(businessName, address)
      expect(result.text).toMatch(`${businessName}\n${address.line2}\n${address.line3}\n${address.line5}\n`)
    })

    test('should return style as address', () => {
      const result = getAddress(businessName, address)
      expect(result.style).toMatch('address')
    })

    test('should return correct x-axis location', () => {
      const result = getAddress(businessName, address)
      expect(result.absolutePosition.x).toBe(0)
    })

    test('should return correct y-axis location', () => {
      const result = getAddress(businessName, address)
      expect(result.absolutePosition.y).toBe(127.575)
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

    test('should return business name and each address value in order separated by new lines ignoring those which are empty', () => {
      const result = getAddress(businessName, address)
      expect(result.text).toMatch(`${businessName}\n${address.line2}\n${address.line3}\n${address.line5}\n`)
    })

    test('should return style as address', () => {
      const result = getAddress(businessName, address)
      expect(result.style).toMatch('address')
    })

    test('should return correct x-axis location', () => {
      const result = getAddress(businessName, address)
      expect(result.absolutePosition.x).toBe(0)
    })

    test('should return correct y-axis location', () => {
      const result = getAddress(businessName, address)
      expect(result.absolutePosition.y).toBe(127.575)
    })
  })
})
