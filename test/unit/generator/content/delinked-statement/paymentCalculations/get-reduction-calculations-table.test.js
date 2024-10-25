const getReductionsCalculationsTable = require('../../../../../../app/generator/content/delinked-statement/paymentCalculations/get-reduction-calculations-table')

const formatCalculationAmount = (value) => {
  const parsedValue = parseFloat(value)
  const formattedValue = parsedValue > 0
    ? parsedValue.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : parsedValue.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
  return `£${formattedValue}`
}

describe('getReductionsCalculationsTable', () => {
  test('should correctly format calculation amounts', () => {
    expect(formatCalculationAmount(100000)).toBe('£100,000.00')
    expect(formatCalculationAmount(20000)).toBe('£20,000.00')
    expect(formatCalculationAmount(0)).toBe('£0')
    expect(formatCalculationAmount(-100)).toBe('£-100')
    expect(formatCalculationAmount('100000')).toBe('£100,000.00')
    expect(formatCalculationAmount('0')).toBe('£0')
    expect(formatCalculationAmount('-100')).toBe('£-100')
  })

  test('should correctly generate the reductions calculations table', () => {
    const delinkedStatement = {
      referenceAmount: 100000,
      totalProgressiveReduction: 20000,
      totalDelinkedPayment: 80000,
      paymentAmountCalculated: 80000
    }

    const expectedTable = {
      layout: {
        hLineStyle: expect.any(Function),
        vLineStyle: expect.any(Function)
      },
      style: 'table',
      table: {
        headerRows: 2,
        widths: ['*', '*'],
        body: [
          [
            { colSpan: 2, text: 'Payment amount calculation', style: 'tableHeader', bold: true },
            { text: '' }
          ],
          [
            { text: '', style: 'tableHeader' },
            { text: 'Amount', style: 'tableHeader' }
          ],
          [
            { text: 'Reference amount' },
            { text: '£100,000.00' }
          ],
          [
            { text: 'Progressive reduction' },
            { text: '£20,000.00' }
          ],
          [
            { text: 'Total annual delinked payment' },
            { text: '£80,000.00' }
          ],
          [
            { text: 'Payment amount' },
            { text: '£80,000.00' }
          ]
        ]
      }
    }

    const result = getReductionsCalculationsTable(delinkedStatement)

    expect(result).toEqual(expectedTable)
    expect(result.layout.hLineStyle()).toBe('solid')
    expect(result.layout.vLineStyle()).toBe('solid')
  })

  test('should handle negative and zero values correctly', () => {
    const delinkedStatement = {
      referenceAmount: -100000,
      totalProgressiveReduction: 0,
      totalDelinkedPayment: -80000,
      paymentAmountCalculated: 0
    }

    const expectedTable = {
      layout: {
        hLineStyle: expect.any(Function),
        vLineStyle: expect.any(Function)
      },
      style: 'table',
      table: {
        headerRows: 2,
        widths: ['*', '*'],
        body: [
          [
            { colSpan: 2, text: 'Payment amount calculation', style: 'tableHeader', bold: true },
            { text: '' }
          ],
          [
            { text: '', style: 'tableHeader' },
            { text: 'Amount', style: 'tableHeader' }
          ],
          [
            { text: 'Reference amount' },
            { text: '£-100,000' }
          ],
          [
            { text: 'Progressive reduction' },
            { text: '£0' }
          ],
          [
            { text: 'Total annual delinked payment' },
            { text: '£-80,000' }
          ],
          [
            { text: 'Payment amount' },
            { text: '£0' }
          ]
        ]
      }
    }

    const result = getReductionsCalculationsTable(delinkedStatement)

    expect(result).toEqual(expectedTable)
    expect(result.layout.hLineStyle()).toBe('solid')
    expect(result.layout.vLineStyle()).toBe('solid')
  })
})
