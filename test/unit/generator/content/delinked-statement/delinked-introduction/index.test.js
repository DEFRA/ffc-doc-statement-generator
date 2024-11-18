const moment = require('moment')
const delinkedIntroduction = require('../../../../../../app/generator/content/delinked-statement/delinked-introduction/index')

jest.mock('moment', () => {
  const originalMoment = jest.requireActual('moment')
  const mockMoment = jest.fn().mockImplementation((date, format) => {
    const momentObject = originalMoment(date, format)
    return momentObject
  })
  mockMoment.locale = jest.fn()
  return mockMoment
})

describe('delinkedIntroduction', () => {
  test('should correctly generate delinkedIntroduction content', () => {
    const mockDelinkedStatement = {
      scheme: {
        year: '2024'
      }
    }

    const delinkedIntroductionResult = delinkedIntroduction(mockDelinkedStatement)

    expect(moment.locale).toHaveBeenCalledWith('en-gb')
    expect(delinkedIntroductionResult).toHaveProperty('stack')
    expect(delinkedIntroductionResult.stack).toContainEqual({ text: `Delinked payments ${mockDelinkedStatement.scheme.year}: payment statement `, style: 'header2' })
    expect(delinkedIntroductionResult.stack).toContainEqual({ text: 'Delinked payments have replaced Basic Payment Scheme (BPS) payments in England. They are being made each year from 2024 to 2027.' })
    expect(delinkedIntroductionResult.stack).toContainEqual('\n')
    expect(delinkedIntroductionResult.stack).toContainEqual({ text: 'This statement explains the latest payment of your annual delinked payment, including your reference amount and progressive reduction.' })
    expect(delinkedIntroductionResult).toHaveProperty('unbreakable', true)
  })
})
