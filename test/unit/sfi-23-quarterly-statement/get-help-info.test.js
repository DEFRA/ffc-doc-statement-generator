const getHelpInfo = require('../../../app/generator/content/sfi23-quarterly-statement/get-help-info')
const getPeriodStartDateFromPeriod = require('../../../app/generator/content/sfi23-quarterly-statement/get-period-start-date-from-period')
const getPaymentPeriodsTable = require('../../../app/generator/content/sfi23-quarterly-statement/part3/get-payment-periods-table')
const config = require('../../../app/config')

jest.mock('../../../app/generator/content/sfi23-quarterly-statement/get-period-start-date-from-period')
jest.mock('../../../app/generator/content/sfi23-quarterly-statement/part3/get-payment-periods-table')

describe('getHelpInfo', () => {
  test('should correctly generate the help info with payment period table when config.showSfi23PaymentPeriod = true', () => {
    config.showSfi23PaymentPeriod = true
    const mockPaymentPeriod = '1 January to 31 December 2024'
    const mockAgreementEnd = '31 December 2024'
    const mockPeriodStart = new Date('2024-01-01T00:00:00.000Z')
    const mockPaymentPeriodsTable = [{ text: 'Payment periods table' }]

    getPeriodStartDateFromPeriod.mockReturnValue(mockPeriodStart)
    getPaymentPeriodsTable.mockReturnValue(mockPaymentPeriodsTable)

    const helpInfo = getHelpInfo({ paymentPeriod: mockPaymentPeriod, agreementEnd: mockAgreementEnd })

    expect(getPeriodStartDateFromPeriod).toHaveBeenCalledWith(mockPaymentPeriod)
    expect(getPaymentPeriodsTable).toHaveBeenCalledWith(mockPeriodStart, mockAgreementEnd)
    expect(helpInfo).toHaveProperty('stack')
    expect(helpInfo.stack).toContainEqual({ text: 'If you think your payments are wrong', style: 'header2' })
    expect(helpInfo.stack).toContainEqual({ text: 'When your next payments will be paid', style: 'header2' })
    expect(helpInfo.stack).toContainEqual({ text: 'If you\'ve any questions about this statement', style: 'header2' })
    expect(helpInfo.stack).toContainEqual(mockPaymentPeriodsTable)
  })

  test('should correctly generate the help info with no payment period table when config.showSfi23PaymentPeriod = false', () => {
    config.showSfi23PaymentPeriod = false
    const mockPaymentPeriod = '1 January to 31 December 2024'
    const mockAgreementEnd = '31 December 2024'
    const mockPeriodStart = new Date('2024-01-01T00:00:00.000Z')
    const mockPaymentPeriodsTable = [{ text: 'Payment periods table' }]

    getPeriodStartDateFromPeriod.mockReturnValue(mockPeriodStart)
    getPaymentPeriodsTable.mockReturnValue(mockPaymentPeriodsTable)

    const helpInfo = getHelpInfo({ paymentPeriod: mockPaymentPeriod, agreementEnd: mockAgreementEnd })

    expect(getPeriodStartDateFromPeriod).toHaveBeenCalledWith(mockPaymentPeriod)
    expect(getPaymentPeriodsTable).toHaveBeenCalledWith(mockPeriodStart, mockAgreementEnd)
    expect(helpInfo).toHaveProperty('stack')
    expect(helpInfo.stack).toContainEqual({ text: 'If you think your payments are wrong', style: 'header2' })
    expect(helpInfo.stack).not.toContainEqual({ text: 'When your next payments will be paid', style: 'header2' })
    expect(helpInfo.stack).toContainEqual({ text: 'If you\'ve any questions about this statement', style: 'header2' })
    expect(helpInfo.stack).not.toContainEqual(mockPaymentPeriodsTable)
  })
})
