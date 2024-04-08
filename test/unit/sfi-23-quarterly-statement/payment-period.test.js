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

describe('get payment period date', () => {
  test('returns table style', () => {
    const result = getPaymentPeriodsTable(paymentPeriod)
    expect(result.style).toBe('table')
  })

  describe('getPaymentPeriodsTable', () => {
    test('should correctly populate the table body with payment periods', () => {
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

      const [headerRow, firstRow, secondRow, thirdRow] = result.table.body

      expect(headerRow).toEqual([
        { text: 'Period', style: 'tableHeader' },
        { text: 'Estimated payment', style: 'tableHeader' }
      ])

      expect(firstRow).toEqual([
        { text: `${moment('1 April').format('LL')} to ${moment('30 June 2024').format('LL')}` },
        { text: moment('July 2024').format('MMMM YYYY') }
      ])

      expect(secondRow).toEqual([
        { text: `${moment('1 July').format('LL')} to ${moment('30 September 2024').format('LL')}` },
        { text: moment('October 2024').format('MMMM YYYY') }
      ])

      expect(thirdRow).toEqual([
        { text: `${moment('1 October').format('LL')} to ${moment('31 December 2024').format('LL')}` },
        { text: moment('January 2025').format('MMMM YYYY') }
      ])
    })
  })
})
