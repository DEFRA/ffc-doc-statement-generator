const moment = require('moment')
const getFilename = require('../../../app/generator/create-filename')
const { SFI23QUARTERLYSTATEMENT } = require('../../../app/constants/document-types')
const mockStatement = require('../../mocks/mock-statement-sfi23-quarterly')

let timestamp

describe('Validation functions', () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date(2022, 7, 5, 15, 30, 10, 120))
    timestamp = moment(new Date()).format('YYYYMMDDHHmmssSS')
    mockStatement.scheme.shortName = 'SFI'
    mockStatement.scheme.year = '2022'
    mockStatement.frn = 1234567890
  })

  test('checks error message on incorrect scheme', () => {
    mockStatement.scheme.shortName = 'invalid'
    expect(() => getFilename(mockStatement, timestamp, SFI23QUARTERLYSTATEMENT)).toThrow('invalid short name')
  })

  test('checks error message on incorrect scheme year', () => {
    mockStatement.scheme.year = '20220'
    expect(() => getFilename(mockStatement, timestamp, SFI23QUARTERLYSTATEMENT)).toThrow('invalid scheme year')
  })

  test('checks error message on incorrect frn', () => {
    mockStatement.frn = '123456789012'
    expect(() => getFilename(mockStatement, timestamp, SFI23QUARTERLYSTATEMENT)).toThrow('invalid frn number')
  })

  test('checks error message on incorrect timestamp', () => {
    timestamp = '202208051530'
    expect(() => getFilename(mockStatement, timestamp, SFI23QUARTERLYSTATEMENT)).toThrow('invalid timestamp')
  })
})
