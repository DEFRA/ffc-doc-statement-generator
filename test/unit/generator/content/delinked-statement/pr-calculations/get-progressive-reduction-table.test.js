const { getProgressiveReductionTable, formatPaymentBand, formatProgressiveReduction } = require('../../../../../../app/generator/content/delinked-statement/pr-calculations/get-progressive-reduction-table')

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
            { text: 'Above £150,000' },
            { text: '70%' },
            { text: '£40,000.00' }
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

  test('should format payment band 3 correctly', () => {
    const result = formatPaymentBand(150000, 'BAND_50000_TO_150000')
    expect(result).toBe('£50,000.01 to £150,000')
  })

  test('should format payment band 4 correctly', () => {
    const result = formatPaymentBand(200000, 'BAND_ABOVE_150000')
    expect(result).toBe('Above £150,000')
  })

  test('should format progressive reduction correctly', () => {
    const result = formatProgressiveReduction('1234.56')
    expect(result).toBe('£1,234.56')
  })

  test('should format payment band with default case', () => {
    const result = formatPaymentBand(1000, 'UNKNOWN_BAND')
    expect(result).toBe('Up to £1,000')
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

  test('should filter out zero progressive reduction values', () => {
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
      totalProgressiveReduction: 17500
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
            { text: 'Above £150,000' },
            { text: '70%' },
            { text: '£40,000.00' }
          ],
          [
            { text: '' },
            { text: 'Total progressive reduction', bold: true },
            { text: '£17,500.00', bold: true }
          ]
        ]
      }
    }

    const result = getProgressiveReductionTable(delinkedStatement)
    expect(result).toEqual(expectedTable)
  })

  test('should show only non-zero reduction bands', () => {
    const delinkedStatement = {
      paymentBand1: 30000,
      percentageReduction1: 0,
      progressiveReductions1: 0,
      paymentBand2: 50000,
      percentageReduction2: 0,
      progressiveReductions2: 0,
      paymentBand3: 150000,
      percentageReduction3: 65,
      progressiveReductions3: 22500,
      paymentBand4: 200000,
      percentageReduction4: 70,
      progressiveReductions4: 40000,
      totalProgressiveReduction: 22500
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
            { text: '£50,000.01 to £150,000' },
            { text: '65%' },
            { text: '£22,500.00' }
          ],
          [
            { text: 'Above £150,000' },
            { text: '70%' },
            { text: '£40,000.00' }
          ],
          [
            { text: '' },
            { text: 'Total progressive reduction', bold: true },
            { text: '£22,500.00', bold: true }
          ]
        ]
      }
    }

    const result = getProgressiveReductionTable(delinkedStatement)
    expect(result).toEqual(expectedTable)
  })

  test('should hide total row when totalProgressiveReduction is zero', () => {
    const delinkedStatement = {
      paymentBand1: 30000,
      percentageReduction1: 5,
      progressiveReductions1: 1500,
      paymentBand2: 50000,
      percentageReduction2: 10,
      progressiveReductions2: 2000,
      paymentBand3: 150000,
      percentageReduction3: -20,
      progressiveReductions3: -3500,
      paymentBand4: 200000,
      percentageReduction4: 70,
      progressiveReductions4: 40000,
      totalProgressiveReduction: 0 // Zero total reduction
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
            { text: '5%' },
            { text: '£1,500.00' }
          ],
          [
            { text: '£30,000.01 to £50,000' },
            { text: '10%' },
            { text: '£2,000.00' }
          ],
          [
            { text: '£50,000.01 to £150,000' },
            { text: '-20%' },
            { text: '£-3,500.00' }
          ],
          [
            { text: 'Above £150,000' },
            { text: '70%' },
            { text: '£40,000.00' }
          ]
          // Note: No total row should be present
        ]
      }
    }

    const result = getProgressiveReductionTable(delinkedStatement)
    expect(result).toEqual(expectedTable)

    expect(result.table.body.length).toBe(6) // 2 header rows + 4 data rows, no total row
  })
  test('should specifically test formatPercentage function', () => {
    const { formatPercentage } = require('../../../../../../app/generator/content/delinked-statement/pr-calculations/get-progressive-reduction-table')
    expect(formatPercentage(25)).toBe('25%')
    expect(formatPercentage(0)).toBe('0%')
    expect(formatPercentage(-50)).toBe('-50%')

    expect(() => formatPercentage(101)).toThrow('Invalid percentage value: 101')
    expect(() => formatPercentage(-101)).toThrow('Invalid percentage value: -101')
    expect(() => formatPercentage('not-a-number')).toThrow('Invalid percentage value: not-a-number')
  })

  test('should test all payment band cases individually', () => {
    const delinkedStatement = {
      paymentBand1: 30000,
      percentageReduction1: 5,
      progressiveReductions1: 1500,
      paymentBand2: 50000,
      percentageReduction2: 10,
      progressiveReductions2: 2000,
      paymentBand3: 150000,
      percentageReduction3: 15,
      progressiveReductions3: 15000,
      paymentBand4: 200000,
      percentageReduction4: 20,
      progressiveReductions4: 10000,
      totalProgressiveReduction: 28500
    }

    const onlyBand4Statement = {
      ...delinkedStatement,
      progressiveReductions1: 0,
      progressiveReductions2: 0,
      progressiveReductions3: 0
    }

    const result = getProgressiveReductionTable(onlyBand4Statement)

    // Should only have headers (2) + band 4 (1) + total (1) = 4 rows
    expect(result.table.body.length).toBe(4)
    expect(result.table.body[2][0].text).toBe('Above £150,000')
    expect(result.table.body[2][1].text).toBe('20%')
    expect(result.table.body[2][2].text).toBe('£10,000.00')
  })

  test('should test edge case with only band 3 showing', () => {
    const delinkedStatement = {
      paymentBand1: 30000,
      percentageReduction1: 5,
      progressiveReductions1: 0,
      paymentBand2: 50000,
      percentageReduction2: 10,
      progressiveReductions2: 0,
      paymentBand3: 150000,
      percentageReduction3: 15,
      progressiveReductions3: 15000,
      paymentBand4: 200000,
      percentageReduction4: 20,
      progressiveReductions4: 0,
      totalProgressiveReduction: 15000
    }

    const result = getProgressiveReductionTable(delinkedStatement)

    expect(result.table.body.length).toBe(4)
    expect(result.table.body[2][0].text).toBe('£50,000.01 to £150,000')
  })

  test('should handle NaN values properly', () => {
    const { formatPaymentBand, formatPercentage, formatProgressiveReduction } = require('../../../../../../app/generator/content/delinked-statement/pr-calculations/get-progressive-reduction-table')

    expect(() => formatPaymentBand(NaN, 'BAND_UP_TO_30000')).toThrow('Invalid payment band value: NaN')
    expect(() => formatPercentage(NaN)).toThrow('Invalid percentage value: NaN')

    const result = formatProgressiveReduction('abc')
    expect(result).toBe('£NaN')
  })
})
