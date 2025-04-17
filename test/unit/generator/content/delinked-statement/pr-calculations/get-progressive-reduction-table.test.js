const getProgressiveReductionTable = require('../../../../../../app/generator/content/delinked-statement/pr-calculations/get-progressive-reduction-table')

describe('getProgressiveReductionTable', () => {
  test('should return a correctly formatted table object', () => {
    const delinkedStatement = {
      paymentBand1: 30000,
      percentageReduction1: 50,
      progressiveReductions1: 1500,
      paymentBand2: 50000,
      percentageReduction2: 55,
      progressiveReductions2: 5000,
      paymentBand3: 150000,
      percentageReduction3: 65,
      progressiveReductions3: 22500,
      paymentBand4: 200000,
      percentageReduction4: 70,
      progressiveReductions4: 40000,
      totalProgressiveReduction: 69000
    }

    const expectedTable = {
      layout: {
        hLineStyle: expect.any(Function),
        vLineStyle: expect.any(Function)
      },
      style: 'table',
      table: {
        headerRows: 2,
        widths: ['*', '*', '*'],
        body: [
          [
            { colSpan: 3, text: 'Progressive reduction calculator', style: 'tableHeader', bold: true },
            { text: '' },
            { text: '' }
          ],
          [
            { text: 'Payment band', style: 'tableHeader' },
            { text: 'Percentage reduction', style: 'tableHeader' },
            { text: 'Progressive reduction', style: 'tableHeader' }
          ],
          [
            { text: 'Up to £30,000' },
            { text: '50%' },
            { text: '£1,500.00' }
          ],
          [
            { text: '£30,000.01 to £50,000' },
            { text: '55%' },
            { text: '£5,000.00' }
          ],
          [
            { text: '£50,000.01 to £150,000' },
            { text: '65%' },
            { text: '£22,500.00' }
          ],
          [
            { text: '' },
            { text: 'Total progressive reduction', bold: true },
            { text: '£69,000.00', bold: true }
          ]
        ]
      }
    }

    const result = getProgressiveReductionTable(delinkedStatement)
    expect(result).toEqual(expectedTable)
    expect(result.layout.hLineStyle()).toBe('solid')
    expect(result.layout.vLineStyle()).toBe('solid')
  })

  test('should throw an error for invalid payment band value', () => {
    const delinkedStatement = {
      paymentBand1: -30000,
      percentageReduction1: 50,
      progressiveReductions1: 1500,
      paymentBand2: 50000,
      percentageReduction2: 55,
      progressiveReductions2: 5000,
      paymentBand3: 150000,
      percentageReduction3: 65,
      progressiveReductions3: 22500,
      paymentBand4: 200000,
      percentageReduction4: 70,
      progressiveReductions4: 40000,
      totalProgressiveReduction: 69000
    }

    expect(() => getProgressiveReductionTable(delinkedStatement)).toThrow('Invalid payment band value: -30000')
  })

  test('should throw an error for invalid percentage value', () => {
    const delinkedStatement = {
      paymentBand1: 30000,
      percentageReduction1: 105,
      progressiveReductions1: 1500,
      paymentBand2: 50000,
      percentageReduction2: 55,
      progressiveReductions2: 5000,
      paymentBand3: 150000,
      percentageReduction3: 65,
      progressiveReductions3: 22500,
      paymentBand4: 200000,
      percentageReduction4: 70,
      progressiveReductions4: 40000,
      totalProgressiveReduction: 69000
    }

    expect(() => getProgressiveReductionTable(delinkedStatement)).toThrow('Invalid percentage value: 105')
  })

  test('should handle zero and negative progressive reduction values correctly', () => {
    const delinkedStatement = {
      paymentBand1: 30000,
      percentageReduction1: 0,
      progressiveReductions1: 0,
      paymentBand2: 50000,
      percentageReduction2: -10,
      progressiveReductions2: -5000,
      paymentBand3: 150000,
      percentageReduction3: 65,
      progressiveReductions3: 22500,
      paymentBand4: 200000,
      percentageReduction4: 70,
      progressiveReductions4: 40000,
      totalProgressiveReduction: 57500
    }

    const expectedTable = {
      layout: {
        hLineStyle: expect.any(Function),
        vLineStyle: expect.any(Function)
      },
      style: 'table',
      table: {
        headerRows: 2,
        widths: ['*', '*', '*'],
        body: [
          [
            { colSpan: 3, text: 'Progressive reduction calculator', style: 'tableHeader', bold: true },
            { text: '' },
            { text: '' }
          ],
          [
            { text: 'Payment band', style: 'tableHeader' },
            { text: 'Percentage reduction', style: 'tableHeader' },
            { text: 'Progressive reduction', style: 'tableHeader' }
          ],
          [
            { text: 'Up to £30,000' },
            { text: '0%' },
            { text: '£0.00' }
          ],
          [
            { text: '£30,000.01 to £50,000' },
            { text: '-10%' },
            { text: '£-5,000.00' }
          ],
          [
            { text: '£50,000.01 to £150,000' },
            { text: '65%' },
            { text: '£22,500.00' }
          ],
          [
            { text: '' },
            { text: 'Total progressive reduction', bold: true },
            { text: '£57,500.00', bold: true }
          ]
        ]
      }
    }

    const result = getProgressiveReductionTable(delinkedStatement)
    expect(result).toEqual(expectedTable)
  })
})
