const moment = require('moment')
const getFilename = require('../../../app/generator/create-filename')
const { STATEMENT } = require('../../../app/constants/document-types')
const mockStatement = require('../../mocks/mock-statement')

let timestamp

describe('Validation functions', () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date(2022, 7, 5, 15, 30, 10, 120))
    timestamp = moment(new Date()).format('YYYYMMDDHHmmssSS')
    mockStatement.scheme.shortName = 'SFI'
    mockStatement.scheme.year = '2022'
    mockStatement.frn = 1234567890
    // mockStatement.scheme.shortName = 'SFI'
  })

  test('checks error message on incorrect scheme', () => {
    mockStatement.scheme.shortName = 'invalid'
    expect(() => getFilename(mockStatement, timestamp, STATEMENT)).toThrow('invalid short name')
  })

  test('checks error message on incorrect scheme year', () => {
    mockStatement.scheme.year = '20220'
    expect(() => getFilename(mockStatement, timestamp, STATEMENT)).toThrow('invalid scheme year')
  })

  test('checks error message on incorrect frn', () => {
    mockStatement.frn = '123456789012'
    expect(() => getFilename(mockStatement, timestamp, STATEMENT)).toThrow('invalid frn number')
  })

  test('checks error message on incorrect timestamp', () => {
    timestamp = '202208051530'
    expect(() => getFilename(mockStatement, timestamp, STATEMENT)).toThrow('invalid timestamp')
  })
})
