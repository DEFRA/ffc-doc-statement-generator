const getReductionsCalculationsTable = require('../../../../../../app/generator/content/delinked-statement/paymentCalculations/get-reduction-calculations-table')

describe('getReductionsCalculationsTable', () => {
  test('should return the correct table structure', () => {
    const delinkedStatement = {
      referenceAmount: '-100000',
      totalProgressiveReduction: '0',
      totalDelinkedPayment: '-80000',
      paymentAmountCalculated: '80000'
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
            { text: 'Payment amount', bold: true },
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
})
