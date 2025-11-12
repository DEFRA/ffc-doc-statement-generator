const part2 = require('../../../../app/generator/content/sfi23-quarterly-statement/part2/index')
const config = require('../../../../app/config')
const toCurrencyString = require('../../../../app/generator/to-currency-string')

jest.mock('../../../../app/generator/to-currency-string')
jest.mock('../../../../app/generator/content/sfi23-quarterly-statement/part2/get-payment-summary')

const getPaymentSummary = require('../../../../app/generator/content/sfi23-quarterly-statement/part2/get-payment-summary')

describe('part2', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const mockStatement = {
    paymentPeriod: '2024 Q1',
    paymentAmount: 1234.56,
    transactionDate: '2024-03-31T00:00:00.000Z',
    paymentReference: 'SFI23-123456789'
  }

  test.each([true, false])('should generate part2 content with showSfi23PaymentPeriod=%p', (showPeriod) => {
    config.showSfi23PaymentPeriod = showPeriod

    const mockPaymentSummary = [
      { text: 'What you\'ve been paid', style: 'tableHeader2' },
      ...(showPeriod ? [{ text: [{ text: 'Period: ', bold: true, lineBreak: false }, '2024 Q1'] }] : []),
      { text: [{ text: 'Payment amount: ', bold: true, lineBreak: false, style: 'separator' }, '£1,234.56'] },
      { text: 'This is usually paid into your account within 2 working days of 31 March 2024.' },
      { text: [{ text: 'Payment reference: ', bold: true, lineBreak: false }, 'SFI23-123456789'] }
    ]

    getPaymentSummary.mockReturnValue(mockPaymentSummary)

    const result = part2(mockStatement)

    expect(result).toHaveProperty('stack')
    expect(result.stack[1].table.body[0][0].stack).toEqual(mockPaymentSummary)
    expect(result).toHaveProperty('unbreakable', true)
    expect(result.stack[1].layout.hLineStyle()).toEqual('solid')
    expect(result.stack[1].layout.vLineStyle()).toEqual('solid')
  })
})

describe('getPaymentSummary', () => {
  const mockStatement = {
    paymentPeriod: '2024 Q1',
    paymentAmount: 1234.56,
    transactionDate: '2024-03-31T00:00:00.000Z',
    paymentReference: 'SFI23-123456789'
  }

  beforeEach(() => {
    jest.clearAllMocks()
    toCurrencyString.mockReturnValue('£1,234.56')
  })

  test.each([true, false])('should generate payment summary with showSfi23PaymentPeriod=%p', (showPeriod) => {
    config.showSfi23PaymentPeriod = showPeriod

    jest.unmock('../../../../app/generator/content/sfi23-quarterly-statement/part2/get-payment-summary')

    const getPaymentSummaryOriginal = require('../../../../app/generator/content/sfi23-quarterly-statement/part2/get-payment-summary')

    const expected = [
      { text: 'What you\'ve been paid', style: 'tableHeader2' },
      ...(showPeriod ? [{ text: [{ text: 'Period: ', bold: true, lineBreak: false }, '2024 Q1'] }] : []),
      { text: [{ text: 'Payment amount: ', bold: true, lineBreak: false, style: 'separator' }, '£1,234.56'] },
      { text: 'This is usually paid into your account within 2 working days of 31 March 2024.' },
      { text: [{ text: 'Payment reference: ', bold: true, lineBreak: false }, 'SFI23-123456789'] }
    ]

    const result = getPaymentSummaryOriginal(mockStatement)

    expect(result).toEqual(expected)
  })
})
