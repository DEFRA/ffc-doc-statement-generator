const summary = require('../../../../../../app/generator/content/summary')
const mockStatement = require('../../../../../mocks/mock-statement')
const getAddress = require('../../../../../../app/generator/content/get-address')
const getSBI = require('../../../../../../app/generator/content/summary/get-sbi')
const getBusinessName = require('../../../../../../app/generator/content/get-business-name')
const getAgreementNumber = require('../../../../../../app/generator/content/summary/get-agreement-number')

jest.mock('../../../../../../app/generator/content/get-address')
jest.mock('../../../../../../app/generator/content/summary/get-sbi')
jest.mock('../../../../../../app/generator/content/get-business-name')
jest.mock('../../../../../../app/generator/content/summary/get-agreement-number')

describe('generate summary', () => {
  beforeEach(() => {
    getAddress.mockReturnValue({ stack: [{ text: 'Mr A Farmer\nA Farm\nNear a field\nNewcastle Upon Tyne\nTyne & Wear\nNE1 1AA', style: 'address' }] })
    getSBI.mockReturnValue({ columns: [{ text: 'Single Business Identifier (SBI):' }, { text: 123456789 }] })
    getBusinessName.mockReturnValue({ columns: [{ text: 'Business name:' }, { text: 'Mr A Farmer' }] })
    getAgreementNumber.mockReturnValue({ columns: [{ text: 'Agreement number:' }, { text: 'SFI1234567' }] })
  })

  test('includes logo', () => {
    const result = summary(mockStatement)
    const logo = result.stack[0].stack[0]
    expect(logo).toEqual(expect.objectContaining({
      image: expect.stringContaining('v2/rpa-logo.png'),
      fit: expect.any(Array),
      style: 'logo'
    }))
  })

  test('includes address', () => {
    const result = summary(mockStatement)
    expect(result.stack[1].stack[0].text).toMatch('Mr A Farmer\nA Farm\nNear a field\nNewcastle Upon Tyne\nTyne & Wear\nNE1 1AA')
  })

  test('includes \n\n\n between address and SBI component', () => {
    const result = summary(mockStatement)
    expect(result.stack[2]).toBe('\n\n\n')
  })

  test('includes SBI title', () => {
    const result = summary(mockStatement)
    expect(result.stack[3].columns[0].text).toBe('Single Business Identifier (SBI):')
  })

  test('includes SBI', () => {
    const result = summary(mockStatement)
    expect(result.stack[3].columns[1].text).toBe(123456789)
  })

  test('includes business name title', () => {
    const result = summary(mockStatement)
    expect(result.stack[4].columns[0].text).toBe('Business name:')
  })

  test('includes business name', () => {
    const result = summary(mockStatement)
    expect(result.stack[4].columns[1].text).toBe('Mr A Farmer')
  })

  test('includes agreement number title', () => {
    const result = summary(mockStatement)
    expect(result.stack[5].columns[0].text).toBe('Agreement number:')
  })

  test('includes agreement number value', () => {
    const result = summary(mockStatement)
    expect(result.stack[5].columns[1].text).toBe('SFI1234567')
  })
})
