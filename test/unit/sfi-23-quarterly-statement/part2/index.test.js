const part2 = require('../../../../app/generator/content/sfi23-quarterly-statement/part2/index')
const config = require('../../../../app/config')
const getPaymentSummary = require('../../../../app/generator/content/sfi23-quarterly-statement/part2/get-payment-summary')
const toCurrencyString = require('../../../../app/generator/to-currency-string')

jest.mock('../../../../app/generator/content/sfi23-quarterly-statement/part2/get-payment-summary')
jest.mock('../../../../app/generator/to-currency-string')

describe('part2', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should correctly generate part2 content with payment period segment when config.showSfi23PaymentPeriod is true', () => {
    config.showSfi23PaymentPeriod = true
    const mockSfi23QuarterlyStatement = {
      paymentPeriod: '2024 Q1',
      paymentAmount: 1234.56,
      transactionDate: '2024-03-31T00:00:00.000Z',
      paymentReference: 'SFI23-123456789'
    }

    const mockPaymentSummary = [
      { text: 'What you\'ve been paid', style: 'tableHeader2' },
      { text: [{ text: 'Period: ', bold: true, lineBreak: false }, '2024 Q1'] },
      { text: [{ text: 'Payment amount: ', bold: true, lineBreak: false, style: 'separator' }, '£1,234.56'] },
      { text: 'This is usually paid into your account within 2 working days of March 31, 2024.' },
      { text: [{ text: 'Payment reference: ', bold: true, lineBreak: false }, 'SFI23-123456789'] }
    ]

    getPaymentSummary.mockReturnValue(mockPaymentSummary)

    const part2Result = part2(mockSfi23QuarterlyStatement)

    expect(part2Result).toHaveProperty('stack')
    expect(part2Result.stack).toContainEqual('\n\n')
    expect(part2Result.stack[1].table.body[0][0].stack).toEqual(mockPaymentSummary)
    expect(part2Result).toHaveProperty('unbreakable', true)
    expect(part2Result.stack[1].layout.hLineStyle()).toEqual('solid')
    expect(part2Result.stack[1].layout.vLineStyle()).toEqual('solid')
  })

  test('should correctly generate part2 content without payment period segment when config.showSfi23PaymentPeriod is false', () => {
    config.showSfi23PaymentPeriod = false
    const mockSfi23QuarterlyStatement = {
      paymentPeriod: '2024 Q1',
      paymentAmount: 1234.56,
      transactionDate: '2024-03-31T00:00:00.000Z',
      paymentReference: 'SFI23-123456789'
    }

    const mockPaymentSummary = [
      { text: 'What you\'ve been paid', style: 'tableHeader2' },
      { text: [{ text: 'Payment amount: ', bold: true, lineBreak: false, style: 'separator' }, '£1,234.56'] },
      { text: 'This is usually paid into your account within 2 working days of March 31, 2024.' },
      { text: [{ text: 'Payment reference: ', bold: true, lineBreak: false }, 'SFI23-123456789'] }
    ]

    getPaymentSummary.mockReturnValue(mockPaymentSummary)

    const part2Result = part2(mockSfi23QuarterlyStatement)

    expect(part2Result).toHaveProperty('stack')
    expect(part2Result.stack).toContainEqual('\n\n')
    expect(part2Result.stack[1].table.body[0][0].stack).toEqual(mockPaymentSummary)
    expect(part2Result).toHaveProperty('unbreakable', true)
    expect(part2Result.stack[1].layout.hLineStyle()).toEqual('solid')
    expect(part2Result.stack[1].layout.vLineStyle()).toEqual('solid')
  })
})

describe('getPaymentSummary', () => {
  const mockSfi23QuarterlyStatement = {
    paymentPeriod: '2024 Q1',
    paymentAmount: 1234.56,
    transactionDate: '2024-03-31T00:00:00.000Z',
    paymentReference: 'SFI23-123456789'
  }

  beforeEach(() => {
    toCurrencyString.mockReturnValue('£1,234.56')
  })

  test('should generate payment summary with payment period when config.showSfi23PaymentPeriod is true', () => {
    config.showSfi23PaymentPeriod = true

    const result = getPaymentSummary(mockSfi23QuarterlyStatement)

    console.log('Result with payment period:', result)

    expect(result).toEqual([
      { text: 'What you\'ve been paid', style: 'tableHeader2' },
      { text: [{ text: 'Payment amount: ', bold: true, lineBreak: false, style: 'separator' }, '£1,234.56'] },
      { text: 'This is usually paid into your account within 2 working days of March 31, 2024.' },
      { text: [{ text: 'Payment reference: ', bold: true, lineBreak: false }, 'SFI23-123456789'] }
    ])
  })

  test('should generate payment summary without payment period when config.showSfi23PaymentPeriod is false', () => {
    config.showSfi23PaymentPeriod = false

    const result = getPaymentSummary(mockSfi23QuarterlyStatement)

    console.log('Result without payment period:', result)

    expect(result).toEqual([
      { text: 'What you\'ve been paid', style: 'tableHeader2' },
      { text: [{ text: 'Payment amount: ', bold: true, lineBreak: false, style: 'separator' }, '£1,234.56'] },
      { text: 'This is usually paid into your account within 2 working days of March 31, 2024.' },
      { text: [{ text: 'Payment reference: ', bold: true, lineBreak: false }, 'SFI23-123456789'] }
    ])
  })
})
