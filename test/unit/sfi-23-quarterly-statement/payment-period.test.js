const moment = require('moment')
const getPaymentPeriodsTable = require('../../../app/generator/content/sfi23-quarterly-statement/part3/get-payment-periods-table')
const paymentPeriod = '1st January to 31 March 2024'

jest.mock('../../../app/generator/content/sfi23-quarterly-statement/part3/get-payment-periods-from-payment-period-start', () => {
  return () => [
    { periodStart: '1 April', periodEnd: '30 June 2024', payDue: 'July 2024' },
    { periodStart: '1 July', periodEnd: '30 September 2024', payDue: 'October 2024' },
    { periodStart: '1 October', periodEnd: '31 December 2024', payDue: 'January 2025' }
  ]
})

describe('getPaymentPeriodsTable', () => {
  test('shouldReturnTableStyle', () => {
    const result = getPaymentPeriodsTable(paymentPeriod)
    expect(result.style).toBe('table')
  })

  test('should Correctly Populate Table Body With Payment Periods', () => {
    const paymentPeriodStart = '1 January'
    const agreementEnd = '30 December 2025'
    const result = getPaymentPeriodsTable(paymentPeriodStart, agreementEnd)

    expect(result.layout).toEqual({
      hLineStyle: expect.any(Function),
      vLineStyle: expect.any(Function)
    })
    expect(result.style).toBe('table')
    expect(result.table.headerRows).toBe(1)
    expect(result.table.widths).toEqual(['*', '*'])
    expect(result.table.body.length).toBe(4)

    const [headerRow, ...dataRows] = result.table.body

    expect(headerRow).toEqual([
      { text: 'Period', style: 'tableHeader' },
      { text: 'Estimated payment', style: 'tableHeader' }
    ])

    const expectedRows = [
      { periodStart: '1 April', periodEnd: '30 June 2024', payDue: 'July 2024' },
      { periodStart: '1 July', periodEnd: '30 September 2024', payDue: 'October 2024' },
      { periodStart: '1 October', periodEnd: '31 December 2024', payDue: 'January 2025' }
    ]

    dataRows.forEach((row, index) => {
      const { periodStart, periodEnd, payDue } = expectedRows[index]
      expect(row).toEqual([
        { text: `${moment(periodStart).format('LL')} to ${moment(periodEnd).format('LL')}` },
        { text: moment(payDue).format('MMMM YYYY') }
      ])
    })
  })
})
