const getAddress = require('../../../../app/generator/content/get-address')

const businessNameMock = require('../../../mocks/components/business-name')
const fullAddressMock = require('../../../mocks/components/address')

describe('getAddress', () => {
  const scenarios = [
    {
      name: 'empty address',
      businessName: '',
      address: {},
      expectedLines: Array(8).fill('')
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
      address: {
        ...fullAddressMock,
        line1: undefined,
        line4: undefined,
        postcode: undefined
      },
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
      address: {
        ...fullAddressMock,
        line1: null,
        line4: null,
        postcode: null
      },
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
      address: {
        ...fullAddressMock,
        line1: '',
        line4: '',
        postcode: ''
      },
      expectedLines: [
        businessNameMock,
        fullAddressMock.line2,
        fullAddressMock.line3,
        fullAddressMock.line5,
        '', '', '', ''
      ]
    },
    {
      name: 'special characters in address',
      address: {
        ...fullAddressMock,
        line1: 'Farm @ Hill',
        line2: 'Flat (2)',
        line3: 'Building [A]',
        line4: '12/14 High Street',
        line5: 'County ~ North'
      },
      expectedLines: [
        businessNameMock,
        'Farm  Hill',
        'Flat 2',
        'Building A',
        '1214 High Street',
        'County  North',
        fullAddressMock.postcode,
        ''
      ]
    },
    {
      name: 'special characters in business name',
      businessName: 'Farm (North) @ Hill',
      address: fullAddressMock,
      expectedLines: [
        'Farm North  Hill',
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
      name: 'all prohibited special characters',
      businessName: '',
      address: {
        line1: '@()=[]”\\/\'<>~',
        line2: 'Valid Address',
        line3: null
      },
      expectedLines: [
        '',
        '',
        'Valid Address',
        '', '', '', '', ''
      ]
    },
    {
      name: 'ordinary punctuation',
      address: {
        line1: 'St. Marys Farm, North-East',
        postcode: 'NE1 1AA'
      },
      expectedLines: [
        businessNameMock,
        'St. Marys Farm, North-East',
        'NE1 1AA',
        '', '', '', '', ''
      ]
    }
  ]

  test.each(scenarios)(
    'should correctly format $name',
    ({ businessName = businessNameMock, address, expectedLines }) => {
      const result = getAddress(businessName, address)

      const expectedText = expectedLines
        .map(line => line?.toUpperCase().substring(0, 50) || '')
        .join('\n') + '\n'

      expect(result.stack[0].text).toBe(expectedText)
      expect(result.stack[0].style).toBe('address')
    }
  )
})
